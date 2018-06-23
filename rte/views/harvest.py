from ..models import Harvest
from ..serializers import HarvestSerializer
from pmm.views import PersonViewSet, PersonFilter


class HarvestFilter(PersonFilter):
    class Meta(PersonFilter.Meta):
        model = Harvest
        fields = PersonFilter.Meta.fields + ('route', 'discarded',)


class HarvestViewSet(PersonViewSet):
    queryset = Harvest.objects.all()
    filter_class = HarvestFilter
    serializer_class = HarvestSerializer
    search_fields = PersonViewSet.search_fields + ('route__name', 'discarded_reason',)
