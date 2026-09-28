from django.db import models
from django.contrib.auth.models import User

from products.model.Product_model import Product
from products.model.ProductVariant_model import ProductVariant


# =========================================================
# CART
# =========================================================

class Cart(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="cart"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Cart - {self.user.username}"


class CartItem(models.Model):

    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    def __str__(self):
        return f"{self.product.product_name} - {self.quantity}"


# =========================================================
# CUSTOMER
# =========================================================

class Customer(models.Model):

    PROVINCE_CUSTOMER = [
        ("kabul", "Kabul"),
        ("herat", "Herat"),
        ("mazar", "Mazar"),
        ("balkh", "Balkh"),
        ("kandahar", "Kandahar"),
        ("nangarhar", "Nangarhar"),
        ("kunduz", "Kunduz"),
        ("takhar", "Takhar"),
        ("bamyan", "Bamyan"),
        ("ghazni", "Ghazni"),
        ("paktia", "Paktia"),
        ("other", "Other"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="customer",
        null=True,
        blank=True,
    )

    full_name = models.CharField(
        max_length=150
    )

    phone = models.CharField(
        max_length=30
    )

    province = models.CharField(
        max_length=100,
        choices=PROVINCE_CUSTOMER,
        default="kabul"
    )

    city = models.CharField(
        max_length=100
    )

    address = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.full_name} - {self.phone}"


# =========================================================
# ORDER
# =========================================================

class Order(models.Model):

    SHIPPING_METHODS = [
        ("normal", "Standard Delivery"),
        ("express", "Express Delivery"),
        ("pickup", "Store Pickup"),
    ]

    PAYMENT_METHODS = [
        ("cod", "Cash on Delivery"),
        ("online", "Online Payment"),
        ("bank", "Bank Transfer"),
        ("other", "Other Payment Method"),
    ]

    ORDER_STATUS = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    PAYMENT_STATUS = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    ]

    # -----------------------------------------------------
    # Order Number
    # -----------------------------------------------------

    order_number = models.CharField(
        max_length=30,
        unique=True,
        editable=False,
    )

    # -----------------------------------------------------
    # Customer
    # -----------------------------------------------------

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name="orders",
    )

    # -----------------------------------------------------
    # Shipping
    # -----------------------------------------------------

    shipping_method = models.CharField(
        max_length=20,
        choices=SHIPPING_METHODS,
        default="normal",
    )

    shipping_cost = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
    )

    # -----------------------------------------------------
    # Payment
    # -----------------------------------------------------

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS,
        default="cod",
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="pending",
    )

    # -----------------------------------------------------
    # Order Status
    # -----------------------------------------------------

    status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS,
        default="pending",
    )

    # -----------------------------------------------------
    # Prices
    # -----------------------------------------------------

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
    )

    total = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
    )

    # -----------------------------------------------------
    # Notes
    # -----------------------------------------------------

    notes = models.TextField(
        blank=True,
        null=True,
    )

    # -----------------------------------------------------
    # Dates
    # -----------------------------------------------------

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    # -----------------------------------------------------
    # Generate Order Number
    # -----------------------------------------------------

    def save(self, *args, **kwargs):

        if not self.order_number:

            last_order = Order.objects.order_by("-id").first()

            if last_order:
                last_id = last_order.id + 1
            else:
                last_id = 1

            self.order_number = f"ORD-{last_id:06d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_number


# =========================================================
# ORDER ITEM
# =========================================================

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="order_items",
    )

    # Snapshot of product name
    product_name = models.CharField(
        max_length=200
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    # Snapshot of product price
    price = models.DecimalField(
        max_digits=12,
        decimal_places=0,
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        self.subtotal = self.price * self.quantity

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_name} - {self.quantity}"