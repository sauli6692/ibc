from ..models import Member
from .person import PersonSerializer


class MemberSerializer(PersonSerializer):
    class Meta(PersonSerializer.Meta):
        model = Member
