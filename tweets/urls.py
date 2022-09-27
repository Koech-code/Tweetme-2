from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns=[
    path('videos/', views.Videos.as_view(), name='videos'),
    path('images/', views.Images.as_view(), name='images'),
    path('commentvideo/<int:pk>/', views.CommentOnAVideo.as_view(), name='commentvideo'),
    path('commentimage/<int:id>/', views.CommentOnAnImage.as_view(), name='commentvideo'),
    path('global/', views.tweets_list_view),
]

if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)