from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from settings.model.AboutUs_model import AboutUsModel
from settings.serializer.about_us_serializer import AboutUsSerializer

class AboutUsDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly] 

    def get(self, request):
        
        about_us_data = AboutUsModel.objects.first()
        
        if not about_us_data:
            return Response(
                {"message": "About Us content has not been created yet in the admin panel."}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        serializer = AboutUsSerializer(about_us_data, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
