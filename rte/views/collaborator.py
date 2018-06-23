from ..models import Collaborator
from ..serializers import CollaboratorSerializer
from pmm.views import MemberViewSet, PersonFilter


class CollaboratorFilter(PersonFilter):
    class Meta(PersonFilter.Meta):
        model = Collaborator
        fields = PersonFilter.Meta.fields + ('route', 'ministry', 'route_captain',)


class CollaboratorViewSet(MemberViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
    filter_class = CollaboratorFilter
    search_fields = MemberViewSet.search_fields + ('route__name', 'ministry__name', 'route_captain',)
