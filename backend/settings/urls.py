from django.urls import path, include
from rest_framework.routers import DefaultRouter
from settings.view.hero_slider_view import HeroSliderView
from settings.view.Store_Benefits_view import Store_BenefitsListView
from settings.view.about_us_view import AboutUsDetailAPIView
from settings.view.faq_view import FAQListApiView
from settings.view.ContactMessage_view import ContactMessageCreateAPIView
from settings.view.ContactInfo_view import ContactInfoView
from settings.view.TermsAndConditions_view import TermsAndConditionsListView
from settings.view.ReturnPolicy_view import ReturnPolicyListView



router = DefaultRouter()
router.register(r'hero-sliders', HeroSliderView, basename='heroslider')
from settings.view.info_view import DashboardStatisticsAPIView

urlpatterns = [
    path('', include(router.urls)),
    path('benefit/', Store_BenefitsListView.as_view()),
    path('aboutus/', AboutUsDetailAPIView.as_view()),
    path('faq/', FAQListApiView.as_view()),
     path('contact/send/', ContactMessageCreateAPIView.as_view(), name='contact-send'),
     path('contact/info/', ContactInfoView.as_view(), name='contact-info'),
     path('termsandcondition/', TermsAndConditionsListView.as_view(), name='TermsAndConditions'),
     path('ReturnPolicy/', ReturnPolicyListView.as_view(), name='ReturnPolicy'),
     path('infosite/', DashboardStatisticsAPIView.as_view()),
]




