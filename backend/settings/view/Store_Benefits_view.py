from rest_framework.generics import ListAPIView
from settings.serializer.Store_Benefits_serializer import Store_BenefitsSerializer
from settings.model.Store_Benefits import Store_Benefits
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class Store_BenefitsListView(ListAPIView):
    queryset = Store_Benefits.objects.all()
    serializer_class = Store_BenefitsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]