from django.contrib import admin

# Register your models here.
from .models import Tweet, TweetLike, PostImage, CommentImage, UploadVideo, CommentVideo


admin.site.register(Tweet)
admin.site.register(TweetLike)
admin.site.register(PostImage)
admin.site.register(UploadVideo)
admin.site.register(CommentImage)
admin.site.register(CommentVideo)


# class TweetLikeAdmin(admin.TabularInline):
#     model = TweetLike, PostImage, UploadVideo, CommentImage, CommentVideo

# class TweetAdmin(admin.ModelAdmin):
#     inlines = [TweetLikeAdmin]
#     list_display = ['__str__', 'user']
#     search_fields = ['content', 'user__username', 'user__email']
#     class Meta:
#         model = Tweet