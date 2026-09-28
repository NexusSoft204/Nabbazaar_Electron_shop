from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer


# _________ Register ___  
class RegisterAPIView(APIView):
    permission_classes = [AllowAny] # همه دسترسی دارند

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() # ذخیره کاربر در دیتابیس
            
            # تولید خودکار توکن برای کاربر جدید جهت ورود خودکار
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'message': 'ثبت نام با موفقیت انجام شد.',
                'token': token.key,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        
        # اگر اطلاعات نامعتبر بود (مثلاً فرمت ایمیل غلط بود یا تکراری بود) خطاها را برمی‌گرداند
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# ==============
# Login
# ==================

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # بررسی و تایید اطلاعات با مدل پیش‌فرض جنگو
        user = authenticate(username=username, password=password)

        if user is not None:
            # اگر کاربر تایید شد، توکن او را ساخته یا واکشی می‌کنیم
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        
        else:
            return Response({
                'error': 'نام کاربری یا رمز عبور اشتباه است.'
            }, status=status.HTTP_400_BAD_REQUEST)






# ===================
# Logout
# ==================
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({'message': 'با موفقیت خارج شدید.'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'خطایی رخ داده است.'}, status=status.HTTP_400_BAD_REQUEST)
