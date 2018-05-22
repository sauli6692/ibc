from pmm.models import Member
from pmm.serializers import MemberSerializer
from .person import PersonViewSet


class MemberViewSet(PersonViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
