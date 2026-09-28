from rest_framework.routers import DefaultRouter
from products.view.product_view import HomePageProductsAPIView
from products.view.all_product_view import AllProductsListView
from products.view.brand_view import BrandViewSet
from products.view.product_search import ProductSearchView
from django.urls import path,include

router = DefaultRouter()
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'all', AllProductsListView, basename='allprodcuts')


urlpatterns = [
    path('', HomePageProductsAPIView.as_view()),
    path('', include(router.urls)),
    path('search/', ProductSearchView.as_view(),name='product-search'),
]
