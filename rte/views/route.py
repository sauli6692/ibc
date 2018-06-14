from rest_framework import viewsets

from ..models import Route
from ..serializers import RouteSerializer
from core.views.mixins import CreateListMixin


class RouteViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    filter_fields = ('name', 'description', 'direction_main', 'direction_extra',)
    search_fields = ('name', 'description', 'direction_main', 'direction_extra',)
