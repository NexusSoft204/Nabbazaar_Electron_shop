from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from settings.serializer.info_serializer import DashboardStatisticsSerializer


class DashboardStatisticsAPIView(APIView):

    def get(self, request):
        serializer = DashboardStatisticsSerializer({})
        
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )