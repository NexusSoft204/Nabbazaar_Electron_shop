from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from settings.serializer.ReturnPolicy_serializer import ReturnPolicySerializer
from settings.model.ReturnPolicy_model import ReturnPolicyModel


class ReturnPolicyListView(ListAPIView):
    queryset = ReturnPolicyModel.objects.all()
    serializer_class = ReturnPolicySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    