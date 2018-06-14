from rest_framework import viewsets
from django_filters import CharFilter, rest_framework as filters

from pmm.models import Person
from pmm.serializers import PersonSerializer
from core.views.mixins import CreateListMixin
from core.models.custom_fields import FixedCharField


class PersonFilter(filters.FilterSet):
    class Meta:
        model = Person
        fields = (
            'first_name',
            'last_name',
            'gender',
            'baptized',
            'integration_level',
            'occupation',
            'civil_status',
        )
        filter_overrides = {
             FixedCharField: {
                 'filter_class': CharFilter,
                 'extra': lambda f: {
                     'lookup_expr': 'exact',
                 },
             }
         }


class PersonViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    filter_class = PersonFilter
    search_fields = (
        'first_name',
        'last_name',
        'gender',
        'integration_level__value',
        'occupation__value',
        'civil_status__value',
    )
