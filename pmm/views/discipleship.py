from rest_framework import viewsets

from pmm.models import Discipleship
from pmm.serializers import DiscipleshipSerializer
from core.views.mixins import CreateListMixin


class DiscipleshipViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Discipleship.objects.all()
    serializer_class = DiscipleshipSerializer
    filter_fields = ('name', 'description', 'lessons__name', 'lessons__description',)
    search_fields = ('name', 'description', 'lessons__name', 'lessons__description',)
