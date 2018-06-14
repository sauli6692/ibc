from rest_framework import viewsets

from .mixins import CreateListMixin


class LookupTableViewSet(CreateListMixin, viewsets.ModelViewSet):
    class Meta:
        abstract = True

    filter_fields = ('id', 'value',)
    search_fields = ('id', 'value',)
