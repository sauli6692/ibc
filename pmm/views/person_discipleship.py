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
        'teacher__first_name',
        'teacher__last_name',
        'last_lesson__name',
        'last_lesson__description',
        'discipleship__name',
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
        request.data['disciple'] = disciple
        return super().create(request)
