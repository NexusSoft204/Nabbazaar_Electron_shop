from django.db import models
from django.db.models import Min, Sum
from products.model.Product_model import Product , ProductColor


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE)
    storage = models.CharField(max_length=50) # مثل: 128GB, 256GB
    ram = models.CharField(max_length=50, blank=True, null=True) # مثل: 8GB, 128GB
    price = models.IntegerField() # قیمت مخصوص این ترکیب
    discount_price = models.IntegerField(null=True, blank=True) # قیمت تخفیف خورده این ترکیب
    stock = models.IntegerField(default=0) # موجودی انبار این ترکیب خاص



    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # بعد از ذخیره شدن این تنوع، اطلاعات محصول اصلی را بروزرسانی میکنیم
        product = self.product
        
        # ۱. پیدا کردن کمترین قیمت بین تمام تنوع‌های این محصول
        min_prices = product.variants.aggregate(
            min_p=Min('price'), 
            min_d=Min('discount_price')
        )
        
        # ۲. محاسبه مجموع موجودی تمام تنوع‌ها
        total_stock = product.variants.aggregate(total=Sum('stock'))['total'] or 0

        # ۳. اعمال روی محصول اصلی
        product.price = min_prices['min_p'] or 0
        product.discount_price = min_prices['min_d']
        product.stock = total_stock
        product.save()
