from django.contrib import admin

from .models import (
    FridayBazaarCampaign,
    FridayBazaarItem,
)


class FridayBazaarItemInline(admin.TabularInline):
    model = FridayBazaarItem

    extra = 1

    fields = (
        "product",
        "campaign_price",
        "stock_limit",
        "sold_count",
        "is_active",
    )

    readonly_fields = (
        "sold_count",
    )


@admin.register(FridayBazaarCampaign)
class FridayBazaarCampaignAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "start_date",
        "end_date",
        "is_active",
    )

    list_filter = (
        "is_active",
        "start_date",
        "end_date",
    )

    search_fields = (
        "title",
        "slug",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    inlines = [
        FridayBazaarItemInline,
    ]


@admin.register(FridayBazaarItem)
class FridayBazaarItemAdmin(admin.ModelAdmin):
    list_display = (
        "product",
        "campaign",
        "campaign_price",
        "stock_limit",
        "sold_count",
        "is_active",
    )

    list_filter = (
        "is_active",
        "campaign",
    )

    search_fields = (
        "product__product_name",
        "campaign__title",
    )

    readonly_fields = (
        "sold_count",
    )