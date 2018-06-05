from rest_framework import viewsets

from pmm.models import PersonDiscipleship
from pmm.serializers import PersonDiscipleshipSerializer
from core.views.mixins import CreateListMixin


class PersonDiscipleshipViewSet(CreateListMixin, viewsets.ModelViewSet):
    serializer_class = PersonDiscipleshipSerializer
    lookup_field = 'discipleship'
    filter_fields = (
        'start_date',
        'end_date',
        'teacher',
        'last_lesson',
        'discipleship',
    )
    search_fields = (
        'start_date',
        'end_date',
        'teacher__first_name',
        'teacher__last_name',
        'last_lesson__name',
        'last_lesson__description',
        'discipleship__name',
    )

    def get_queryset(self):
        return PersonDiscipleship.objects.filter(disciple_id=self.kwargs['disciple'])

    def create(self, request, disciple):
        if isinstance(request.data, list):
            for row in request.data:
                row['disciple'] = disciple
        else:
            request.data['disciple'] = disciple

        return super().create(request)


class DiscipleshipPersonViewSet(PersonDiscipleshipViewSet):
    lookup_field = 'disciple'

    def get_queryset(self):
        return PersonDiscipleship.objects.filter(discipleship_id=self.kwargs['discipleship'])

    def create(self, request, discipleship):
        if isinstance(request.data, list):
            for row in request.data:
                row['discipleship'] = discipleship
        else:
            request.data['discipleship'] = discipleship

        return super().create(request)
