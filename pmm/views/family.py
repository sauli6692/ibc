from rest_framework import viewsets

from pmm.models import Family
from pmm.serializers import FamilySerializer
from core.views.mixins import CreateListMixin


class FamilyViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer
    filter_fields = (
        'person__first_name',
        'person__last_name',
        'family__first_name',
        'family__last_name',
        'relationship__value',
    )
    search_fields = (
        'person__first_name',
        'person__last_name',
        'family__first_name',
        'family__last_name',
        'relationship__value',
    )
