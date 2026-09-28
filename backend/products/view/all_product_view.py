from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from products.serializer.proudct_serializer import ProductSerializer
from products.model.Product_model import Product


class AllProductsListView(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field='slug'
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description'] 
