from rest_framework.generics import ListAPIView
from settings.serializer.faq_serializer import FAQSerializer
from settings.model.faq_model import FAQModel
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class FAQListApiView(ListAPIView):
    queryset = FAQModel.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

