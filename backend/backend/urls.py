"""
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/settings/', include('settings.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/product/', include('products.urls')),
    path('', include('accounts.urls')),
    path('api/', include('basket.urls')),
]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)