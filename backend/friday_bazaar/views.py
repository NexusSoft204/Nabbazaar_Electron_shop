from django.utils import timezone
from django.db.models import Prefetch

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import (
    FridayBazaarCampaign,
    FridayBazaarItem,
)

from .serializers import (
    FridayBazaarCampaignSerializer,
    FridayBazaarItemSerializer,
)


class ActiveFridayBazaarCampaignView(
    generics.ListAPIView
):
    """
    دریافت کمپاین‌های فعال و در حال اجرا
    """

    serializer_class = FridayBazaarCampaignSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        now = timezone.now()

        return (
            FridayBazaarCampaign.objects
            .filter(
                is_active=True,
                start_date__lte=now,
                end_date__gt=now,
            )
            .prefetch_related(
                Prefetch(
                    "items",
                    queryset=(
                        FridayBazaarItem.objects
                        .filter(
                            is_active=True,
                            product__is_active=True,
                            product__stock__gt=0,
                            stock_limit__gt=0,
                        )
                        .select_related(
                            "product",
                            "product__category",
                            "product__brand",
                        )
                        .order_by("campaign_price")
                    )
                )
            )
            .order_by("-start_date")
        )


class FridayBazaarCampaignDetailView(
    generics.RetrieveAPIView
):
    """
    دریافت جزئیات یک کمپاین از طریق slug
    """

    serializer_class = FridayBazaarCampaignSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        now = timezone.now()

        return (
            FridayBazaarCampaign.objects
            .filter(
                is_active=True,
                start_date__lte=now,
                end_date__gt=now,
            )
            .prefetch_related(
                Prefetch(
                    "items",
                    queryset=(
                        FridayBazaarItem.objects
                        .filter(
                            is_active=True,
                            product__is_active=True,
                            product__stock__gt=0,
                            stock_limit__gt=0,
                        )
                        .select_related(
                            "product",
                            "product__category",
                            "product__brand",
                        )
                        .order_by("campaign_price")
                    )
                )
            )
        )


class FridayBazaarProductListView(
    generics.ListAPIView
):
    """
    دریافت مستقیم محصولات کمپاین فعال
    """

    serializer_class = FridayBazaarItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        now = timezone.now()

        queryset = (
            FridayBazaarItem.objects
            .filter(
                is_active=True,
                campaign__is_active=True,
                campaign__start_date__lte=now,
                campaign__end_date__gt=now,
                product__is_active=True,
                product__stock__gt=0,
                stock_limit__gt=0,
            )
            .select_related(
                "campaign",
                "product",
                "product__category",
                "product__brand",
            )
            .order_by("campaign_price")
        )

        campaign_slug = self.request.query_params.get(
            "campaign"
        )

        if campaign_slug:
            queryset = queryset.filter(
                campaign__slug=campaign_slug
            )

        return queryset