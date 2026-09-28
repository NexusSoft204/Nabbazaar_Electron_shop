from rest_framework import generics
from rest_framework.filters import SearchFilter
from products.model.Product_model import Product
from products.serializer.proudct_serializer import ProductSerializer

class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['product_name', 'short_description'] 
