# from rest_framework import serializers

from ..models import Member
from .person import PersonSerializer


class MemberSerializer(PersonSerializer):
    class Meta(PersonSerializer.Meta):
        model = Member
