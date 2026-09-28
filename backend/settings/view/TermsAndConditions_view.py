from rest_framework.generics import  ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from settings.serializer.TermsAndConditions_serializer import TermsAndConditionSerializer
from settings.model.TermsAndConditions_model import TermsAndConditionsModel


class TermsAndConditionsListView(ListAPIView):
    queryset = TermsAndConditionsModel.objects.all()
    serializer_class = TermsAndConditionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    