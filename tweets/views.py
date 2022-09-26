import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from .models import UploadVideo, PostImage, CommentImage, CommentVideo
from .serializers import VideoSerializer, ImageSerializer, CommentImageSerializer, CommentVideoSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "pages/feed.html")

def tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})

class Videos(APIView):
    def get(self, request):
        if request.method == 'GET':
            
            uploadedvideos = UploadVideo.objects.all()
            serializer = VideoSerializer(uploadedvideos, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        
        serializers = VideoSerializer(data=request.data)
 
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,
            status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, 
            status=status.HTTP_400_BAD_REQUEST)