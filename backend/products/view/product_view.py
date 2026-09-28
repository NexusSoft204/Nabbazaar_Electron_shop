from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from products.model.Product_model import Product
from products.serializer.proudct_serializer import ProductSerializer

class HomePageProductsAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        # ۱. محصولات جدید (مثلاً ۸ محصولی که اخیراً اضافه شده‌اند)
        new_products = Product.objects.all().order_by('-created_at')[:12]
        
        # ۲. محصولات پرفروش (مثلاً ۸ محصولی که بیشترین تعداد فروش را داشته‌اند)
        best_selling_products = Product.objects.all().order_by('-sales_count')[:12]
        
        # ۳. تخفیف‌های ویژه (محصولاتی که قیمت تخفیف خورده دارند و بزرگتر از صفر است)
        special_discounts = Product.objects.filter(discount_price__isnull=False, discount_price__gt=0)[:8]
        
        # ۴. پیشنهادهای ویژه (محصولاتی که تیک پیشنهاد ویژه دارند)
        special_offers = Product.objects.filter(is_special_offer=True)[:12]
        
        # ۵. محصولات پیشنهادی (محصولاتی که تیک پیشنهادی دارند)
        suggested_products = Product.objects.filter(is_suggested=True)[:12]

        # تبدیل اطلاعات هر بخش به JSON به کمک سریالایزر واحد
        context = {
            'new_products': ProductSerializer(new_products, many=True).data,
            'best_selling': ProductSerializer(best_selling_products, many=True).data,
            'special_discounts': ProductSerializer(special_discounts, many=True).data,
            'special_offers': ProductSerializer(special_offers, many=True).data,
            'suggested_products': ProductSerializer(suggested_products, many=True).data,
        }

        # فرستادن اطلاعات نهایی به فرانت‌اند
        return Response(context, status=status.HTTP_200_OK)
