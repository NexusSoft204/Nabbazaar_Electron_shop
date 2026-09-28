from django.db import models
from django.utils.text import slugify
from products.model.Brand_model import Brand
from products.model.Category_model import Category


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products', verbose_name='دسته‌بندی')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True, related_name='products', verbose_name='برند')
    
    product_name = models.CharField(max_length=200, verbose_name='نام محصول')
    slug = models.SlugField(max_length=250, unique=True, allow_unicode=True, verbose_name=' (Slug)')
    image = models.ImageField(upload_to='products/%Y/%m/', verbose_name='current image product')
    
    # فیلدهای مالی حیاتی برای فروشگاه
    price = models.DecimalField(max_digits=12, decimal_places=0, default=0, verbose_name='pirce product')
    discount_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True, verbose_name='discout price')
    
    stock = models.PositiveIntegerField(default=0, verbose_name='stock inventory')
    is_active = models.BooleanField(default=True, verbose_name='status active/inactive')
    is_special_offer = models.BooleanField(default=False, verbose_name='Special Offer')
    is_suggested = models.BooleanField(default=False, verbose_name='suggested system')
    
    # آمارها
    sales_count = models.PositiveIntegerField(default=0, verbose_name='count price')
    visited_count = models.PositiveIntegerField(default=0, verbose_name='count visited')
    
    # توضیحات
    short_description = models.TextField(verbose_name='short description')
    full_description = models.TextField(verbose_name='full description')
    whats_in_the_box = models.TextField(null=True, blank=True, verbose_name='whats_in_the_box')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=' create at')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='update at')

    class Meta:
        verbose_name = "product"
        verbose_name_plural = "products"
        ordering = ['-created_at']

    def __str__(self):
        return self.product_name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.product_name, allow_unicode=True)
        super().save(*args, **kwargs)

    # متد کاربردی برای محاسبه اینکه آیا محصول تخفیف دارد یا خیر
    @property
    def has_discount(self):
        return self.discount_price is not None and self.discount_price < self.price





class ProductColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='colors')
    color_name = models.CharField(max_length=50) # مثل: مشکی، سفید
    color_code = models.CharField(max_length=7) # کد هگز جهت نمایش رنگ در سایت مثل #000000

    def __str__(self):
        return f"{self.product.product_name} - {self.color_name}"

# ۶. ویژگی‌های فنی و مشخصات (جدول توسعه یافته برای فیلتر راحت‌تر)
class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')
    title = models.CharField(max_length=150) # مثل: حافظه رام، کیفیت دوربین
    value = models.CharField(max_length=250) # مثل: 8 گیگابایت، 64 مگاپیکسل

    def __str__(self):
        return f"{self.product.product_name} -> {self.title}: {self.value}"