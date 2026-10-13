from django.urls import path

from .views import (
    ActiveFridayBazaarCampaignView,
    FridayBazaarCampaignDetailView,
    FridayBazaarProductListView,
)


urlpatterns = [
    path(
        "campaigns/",
        ActiveFridayBazaarCampaignView.as_view(),
        name="friday-bazaar-campaigns",
    ),

    path(
        "campaigns/<slug:slug>/",
        FridayBazaarCampaignDetailView.as_view(),
        name="friday-bazaar-campaign-detail",
    ),

    path(
        "products/",
        FridayBazaarProductListView.as_view(),
        name="friday-bazaar-products",
    ),
]