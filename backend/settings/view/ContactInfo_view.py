from rest_framework.generics import ListAPIView
from settings.serializer.ContactInfo_serializer import ContactInfoSerializer
from settings.model.ContactInfo_model import ContactInfoModel
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ContactInfoView(ListAPIView):
    queryset = ContactInfoModel.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes= [IsAuthenticatedOrReadOnly]