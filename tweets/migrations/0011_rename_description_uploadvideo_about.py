# Generated by Django 3.2.15 on 2022-09-26 21:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0010_commentimage_commentvideo_uploadvideo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uploadvideo',
            old_name='description',
            new_name='about',
        ),
    ]
