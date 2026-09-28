from django.db import models
from products.model.Product_model import Product

class ProductGallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery', verbose_name="product")
    image = models.ImageField(upload_to='products/image', verbose_name='product image')

    class Meta:
        verbose_name = "Product Image"
        verbose_name_plural = "Product Gallery"

    def __str__(self):
        return f"Image for {self.product.product_name}"
