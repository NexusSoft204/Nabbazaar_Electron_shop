from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class BlogCategory(models.Model):
    name = models.CharField(verbose_name='Category Name', max_length=200)
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug Field', allow_unicode=True)

    class Meta:
        verbose_name = 'Blog Category'
        verbose_name_plural = 'Blog Categories'

    def __str__(self):
        return f"{self.name}"


class Blog(models.Model):
    category = models.ForeignKey(BlogCategory, on_delete=models.PROTECT, related_name='blogs', verbose_name='Category')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts', verbose_name='Author')
    
    title = models.CharField(max_length=200, verbose_name='Title')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug Field', allow_unicode=True)
    image = models.ImageField(upload_to='blog/', verbose_name='Blog Cover Image')
    description = models.TextField(verbose_name='Content / Description')
    
    is_active = models.BooleanField(default=True, verbose_name='Is Published')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated')

    class Meta:
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title}"
