from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.text import slugify

from products.model.Product_model import Product


class FridayBazaarCampaign(models.Model):
    title = models.CharField(
        max_length=200,
        verbose_name="نام کمپاین"
    )

    slug = models.SlugField(
        max_length=250,
        unique=True,
        allow_unicode=True,
        verbose_name="آدرس کمپاین"
    )

    description = models.TextField(
        blank=True,
        verbose_name="توضیحات کمپاین"
    )

    banner = models.ImageField(
        upload_to="friday_bazaar/banners/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="بنر کمپاین"
    )

    start_date = models.DateTimeField(
        verbose_name="تاریخ شروع"
    )

    end_date = models.DateTimeField(
        verbose_name="تاریخ پایان"
    )

    is_active = models.BooleanField(
        default=False,
        verbose_name="فعال بودن کمپاین"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "کمپاین جمعه‌بازار"
        verbose_name_plural = "کمپاین‌های جمعه‌بازار"
        ordering = ["-start_date"]

    def clean(self):
        if self.end_date and self.start_date:
            if self.end_date <= self.start_date:
                raise ValidationError({
                    "end_date": "تاریخ پایان باید بعد از تاریخ شروع باشد."
                })

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(
                self.title,
                allow_unicode=True
            )

        super().save(*args, **kwargs)

    @property
    def is_running(self):
        now = timezone.now()

        return (
            self.is_active
            and self.start_date <= now < self.end_date
        )

    def __str__(self):
        return self.title


class FridayBazaarItem(models.Model):
    campaign = models.ForeignKey(
        FridayBazaarCampaign,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name="کمپاین"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="friday_bazaar_items",
        verbose_name="محصول"
    )

    campaign_price = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        verbose_name="قیمت جمعه‌بازار"
    )

    stock_limit = models.PositiveIntegerField(
        default=0,
        verbose_name="سهمیه فروش کمپاین"
    )

    sold_count = models.PositiveIntegerField(
        default=0,
        verbose_name="تعداد فروخته‌شده در کمپاین"
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال بودن محصول در کمپاین"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "محصول جمعه‌بازار"
        verbose_name_plural = "محصولات جمعه‌بازار"

        ordering = ["campaign_price"]

        constraints = [
            models.UniqueConstraint(
                fields=["campaign", "product"],
                name="unique_friday_bazaar_product"
            ),
            models.CheckConstraint(
                condition=models.Q(campaign_price__gt=0),
                name="friday_bazaar_price_positive"
            ),
        ]

    def clean(self):
        errors = {}

        if self.campaign_price is not None:
            if self.campaign_price <= 0:
                errors["campaign_price"] = (
                    "قیمت کمپاین باید بیشتر از صفر باشد."
                )

            if self.product_id:
                # قیمت اصلی محصول را به‌عنوان مرجع در نظر می‌گیریم.
                if self.campaign_price > self.product.price:
                    errors["campaign_price"] = (
                        "قیمت جمعه‌بازار نباید از قیمت اصلی محصول بیشتر باشد."
                    )

        if self.sold_count > self.stock_limit:
            errors["sold_count"] = (
                "تعداد فروخته‌شده نمی‌تواند از سهمیه کمپاین بیشتر باشد."
            )

        if errors:
            raise ValidationError(errors)

    @property
    def remaining_stock(self):
        return max(
            self.stock_limit - self.sold_count,
            0
        )

    @property
    def discount_percentage(self):
        if not self.product.price:
            return 0

        discount = (
            (self.product.price - self.campaign_price)
            / self.product.price
        ) * 100

        return round(discount)

    @property
    def is_available(self):
        return (
            self.is_active
            and self.campaign.is_running
            and self.product.is_active
            and self.product.stock > 0
            and self.remaining_stock > 0
        )

    def __str__(self):
        return (
            f"{self.product.product_name} - "
            f"{self.campaign.title}"
        )