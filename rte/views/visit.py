from rest_framework import viewsets

from ..models import Visit
from ..serializers import VisitSerializer
from core.views.mixins import CreateListMixin


class HarvestVisitViewSet(CreateListMixin, viewsets.ModelViewSet):
    serializer_class = VisitSerializer
    lookup_field = 'collaborator'
    filter_fields = (
        'collaborator',
        'harvest',
        'date',
    )
    search_fields = (
        'collaborator_value',
        'harvest_value',
        'date',
    )

    def get_queryset(self):
        return Visit.objects.filter(harvest_id=self.kwargs['harvest'])

    def create(self, request, harvest):
        if isinstance(request.data, list):
            for row in request.data:
                row['harvest'] = harvest
        else:
            request.data['harvest'] = harvest

        return super().create(request)


class CollaboratorVisitViewSet(HarvestVisitViewSet):
    lookup_field = 'harvest'

    def get_queryset(self):
        return Visit.objects.filter(collaborator_id=self.kwargs['collaborator'])

    def create(self, request, collaborator):
        if isinstance(request.data, list):
            for row in request.data:
                row['collaborator'] = collaborator
        else:
            request.data['collaborator'] = collaborator

        return super().create(request)
