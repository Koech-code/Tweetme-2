from django.urls import path

from .views import (
    tweet_action_view,
    tweet_delete_view,
    tweet_detail_view,
    tweet_feed_view,
    tweet_list_view,
    tweet_create_view,
    create_tweet_view,
    get_tweet_view,
    upload_video_view,
    get_videos_view,
    comment_tweet_view,
    comment_video_view,
    see_all_video_comments,
    see_all_tweet_comments,
)

from . import views

'''
CLIENT
Base ENDPOINT /api/tweets/
'''
urlpatterns = [
    path('createtweet/', create_tweet_view),
    path('getweet/', get_tweet_view),
    path('uploadvideos/', upload_video_view),
    path('getvideos/', get_videos_view),
    path('commentweet/', comment_tweet_view),
    path('videocomments/<int:pk>/', see_all_video_comments),
    path('commentvideo/', comment_video_view),
    path('tweetcomments/<int:id>/', see_all_tweet_comments),
    path('', tweet_list_view),
    path('feed/', tweet_feed_view),
    path('action/', tweet_action_view),
    path('create/', tweet_create_view),
    path('<int:tweet_id>/', tweet_detail_view),
    path('<int:tweet_id>/delete/', tweet_delete_view),
]
