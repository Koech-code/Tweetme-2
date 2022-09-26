import random
from unicodedata import name
from django.conf import settings
from django.db import models
from django.db.models import Q

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact=username)

    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_users_id = []
        if profiles_exist:
            followed_users_id = user.following.values_list("user__id", flat=True) # [x.user.id for x in profiles]
        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp")

class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)

class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    # parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets") # many users can many tweets
    likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, through=TweetLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()
    # def __str__(self):
    #     return self.content
    
    class Meta:
        ordering = ['-id']
    
    @property
    def is_retweet(self):
        return self.parent != None
    
    def serialize(self):
        '''
        Feel free to delete!
        '''
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 200)
        }

class PostImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    imagename = models.CharField(max_length=50)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    description = models.TextField(max_length=500, null=True)

    def __str__(self):
        return self.imagename


class UploadVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    videoname = models.CharField(max_length=50)
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    about = models.TextField(max_length=500, null=True)

    def __str__(self):
        return self.videoname


class CommentImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    postedimage = models.ForeignKey(PostImage, on_delete=models.CASCADE, related_name="postedimage")
    comment = models.TextField(max_length=1000, null=False)


class CommentVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uploadedvideo = models.ForeignKey(PostImage, on_delete=models.CASCADE, related_name="uploadedvideo")
    comment = models.TextField(max_length=1000, null=False)

  