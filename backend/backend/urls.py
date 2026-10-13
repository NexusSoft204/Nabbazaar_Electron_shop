"""
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView



admin.site.site_header = "Nabbazaar Admin Panel"     
admin.site.site_title = "My Site Admin Portal"   
admin.site.index_title = "Welcome to the Dashboard"


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/settings/', include('settings.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/product/', include('products.urls')),
    path('', include('accounts.urls')),
    path('api/', include('basket.urls')),

    path(
        'password-reset-confirm/<uidb64>/<token>/', 
        TemplateView.as_view(), 
        name='password_reset_confirm'
    ),
    path('api/auth/', include('dj_rest_auth.urls')),
    path(
        "api/friday-bazaar/",
        include("friday_bazaar.urls")
    ),
]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)