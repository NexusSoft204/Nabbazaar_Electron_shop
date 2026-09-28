from rest_framework.viewsets import ReadOnlyModelViewSet
from settings.serializer.hero_serializer import HeroSliderSerializer
from settings.model.hero_model import HeroSlider

class HeroSliderView(ReadOnlyModelViewSet):
    queryset = HeroSlider.objects.all()
    serializer_class = HeroSliderSerializer

