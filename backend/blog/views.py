from rest_framework.viewsets import ModelViewSet
from .serializers import BlogSerializer
from .models import Blog
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.filter(is_active=True)
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
