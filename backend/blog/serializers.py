from rest_framework import serializers
from .models import Blog, BlogCategory
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'  # فیلدی از مدل کتگوری که می‌خواهید نمایش داده شود
    )
    
    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'  # فیلدی از مدل یوزر که می‌خواهید نمایش داده شود
    )
    

    class Meta:
        model = Blog
        
        fields = [
            'id', 'title', 'slug', 'image', 'description', 
            'is_active', 'created_at', 'updated_at', 
            'category', 
            'author'
        ]

    def get_author_full_name(self, obj):
        full_name = obj.author.get_full_name()
        return full_name if full_name else obj.author.username
