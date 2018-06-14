from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from ..models import Ministry, MinistryObjective
from ..serializers import MinistrySerializer, MinistryObjectiveSerializer
from pmm.serializers import MemberSerializer
from pmm.views import PersonFilter
from core.views.mixins import CreateListMixin


class MinistryViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer
    filter_fields = ('name', 'description',)
    search_fields = ('name', 'description',)


class MinistryObjectiveViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = MinistryObjective.objects.all()
    serializer_class = MinistryObjectiveSerializer
    filter_fields = ('objective',)
    search_fields = ('objective',)

    def get_queryset(self):
        return MinistryObjective.objects.filter(ministry_id=self.kwargs['ministry'])

    def create(self, request, ministry):
        if isinstance(request.data, list):
            for row in request.data:
                row['ministry'] = ministry
        else:
            request.data['ministry'] = ministry

        return super().create(request)


class MinistryMemberView(ListAPIView):
    serializer_class = MemberSerializer
    filter_class = PersonFilter
    search_fields = (
        'first_name',
        'last_name',
        'gender',
        'integration_level__value',
        'occupation__value',
        'civil_status__value',
    )

    def get_queryset(self):
        ministry = get_object_or_404(Ministry, pk=self.kwargs['ministry'])
        return ministry.members


class MinistryLeaderView(MinistryMemberView):
    def get_queryset(self):
        ministry = get_object_or_404(Ministry, pk=self.kwargs['ministry'])
        return ministry.leaders
