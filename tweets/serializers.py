from pyexpat import model
from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import Tweet, UploadVideo, CommentVideo, CommentTweet, User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken,TokenError

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip() # "Like " -> "like"
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweets")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Tweet
        fields = ['user', 'likes', 'image', 'video', 'content']
    
    def get_likes(self, obj):
        return obj.likes.count()
    
    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

    # def get_user(self, obj):
    #     return obj.user.id


class TweetSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
    class Meta:
        model = Tweet
        fields = [
                'user', 
                'id', 
                'content',
                'likes',
                'is_retweet',
                'parent',
                'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()


class CommentTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentVideo
        fields = [
            'user', 
            'tweet', 
            'body',
            ]

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadVideo
        fields = [
            'user', 
            'videoname', 
            'video',
            'about',
            ]

class CommentVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentVideo
        fields = [
            'user', 
            'uploadedvideo', 
            'comment',
            ]

class RegisterSerializer(serializers.ModelSerializer):

    """
    Serializers registration requests and creates a new user.
    """

    password=serializers.CharField(max_length=50, min_length=8, write_only=True)

    # Ensure passwords are at least 8 characters long, no longer than 50
    # characters, and can not be read by the client.

    class Meta:
        model=User
        # List all the fields that could possibly be included in a request
        # or response, including fields specified explicitly below.
        fields=['id','name', 'email', 'phone_number', 'location', 'password']
    
    def validate(self, attrs):
        email=attrs.get('email', '')
        username=attrs.get('username', '')

        if not username.isalnum:
            raise serializers.ValidationError('The username should only contain alphanumeric characters')

        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=50, min_length=8, write_only=True)
    email=serializers.EmailField(max_length=60, min_length=5)
    name=serializers.CharField(max_length=30, min_length=3, read_only=True)

    tokens=serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user=User.objects.get(email=obj['email'])

        return {
            'refresh_key':user.tokens()['refresh'],
            'access_key':user.tokens()['access'],
        }
        
    class Meta:
        model=User
        fields=['email', 'password', 'name', 'tokens']

    def validate(self, attrs):
        email=attrs.get('email','')
        password=attrs.get('password','')
        user=auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled')

        return {
            'email':user.email,
            'name':user.name,
            'tokens':user.tokens,

        }

class LogoutSerializer(serializers.Serializer):
    refresh=serializers.CharField()
    default_error_messages={
        'bad_token':'Your token has expired or is no longer valid.'
    }

    def validate(self, attrs):
        self.token=attrs['refresh']
        return attrs


    def save(self, **kwargs):
       
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')


class ResetPasswordSerializer(serializers.Serializer):
    email=serializers.EmailField(min_length=4)
    class Meta:
   
        fields=['email']