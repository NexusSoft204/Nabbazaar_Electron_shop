from django.contrib import admin
from products.model.ProductGallery_model import ProductGallery


class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 3
    max_num = 10

