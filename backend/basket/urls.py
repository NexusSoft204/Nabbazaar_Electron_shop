from django.urls import path

from .views import (
    CreateOrderView,
    OrderSuccessView,
    OrderTrackingView,
)


urlpatterns = [

    # Create Order
    path(
        "order/create/",
        CreateOrderView.as_view(),
        name="create-order"
    ),

    # Order Success
    path(
        "order/success/<str:order_number>/",
        OrderSuccessView.as_view(),
        name="order-success"
    ),

    # Order Tracking
    path(
        "order/track/<str:order_number>/",
        OrderTrackingView.as_view(),
        name="order-track",
    ),
]