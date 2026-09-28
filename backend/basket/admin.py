from django.contrib import admin
from .models import Cart, CartItem, Customer, Order, OrderItem


# =========================================================
# Cart
# =========================================================

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    raw_id_fields = ['product', 'variant']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'user',
        'created_at',
        'get_items_count',
    ]

    list_filter = [
        'created_at',
    ]

    search_fields = [
        'user__username',
        'user__email',
    ]

    inlines = [
        CartItemInline,
    ]

    @admin.display(description='تعداد آیتم‌ها')
    def get_items_count(self, obj):
        return obj.items.count()


# =========================================================
# Customer
# =========================================================

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'full_name',
        'phone',
        'province',
        'city',
        'created_at',
    ]

    search_fields = [
        'full_name',
        'phone',
        'city',
    ]

    list_filter = [
        'province',
        'created_at',
    ]


# =========================================================
# Order Items
# =========================================================

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    raw_id_fields = ['product']


# =========================================================
# Orders
# =========================================================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = [
        'order_number',
        'customer',
        'status',
        'payment_status',
        'subtotal',
        'shipping_cost',
        'total',
        'created_at',
    ]

    list_filter = [
        'status',
        'payment_status',
        'shipping_method',
        'payment_method',
        'created_at',
    ]

    search_fields = [
        'order_number',
        'customer__full_name',
        'customer__phone',
        'customer__city',
    ]

    inlines = [
        OrderItemInline,
    ]

    ordering = [
        '-created_at',
    ]

    readonly_fields = [
        'order_number',
        'subtotal',
        'shipping_cost',
        'total',
        'created_at',
        'updated_at',
    ]


# =========================================================
# Order Items
# =========================================================

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'order',
        'product',
        'product_name',
        'quantity',
        'price',
        'subtotal',
        'created_at',
    ]

    search_fields = [
        'product_name',
        'order__order_number',
    ]

    list_filter = [
        'created_at',
    ]

    readonly_fields = [
        'subtotal',
        'created_at',
    ]