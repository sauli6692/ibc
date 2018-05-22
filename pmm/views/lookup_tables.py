from pmm.models import (
    IntegrationLevel,
    Occupation,
    CivilStatus,
    FamilyRelationship,
)
from pmm.serializers import (
    IntegrationLevelSerializer,
    OccupationSerializer,
    CivilStatusSerializer,
    FamilyRelationshipSerializer,
)
from core.views import LookupTableViewSet


class IntegrationLevelViewSet(LookupTableViewSet):
    queryset = IntegrationLevel.objects.all()
    serializer_class = IntegrationLevelSerializer


class OccupationViewSet(LookupTableViewSet):
    queryset = Occupation.objects.all()
    serializer_class = OccupationSerializer


class CivilStatusViewSet(LookupTableViewSet):
    queryset = CivilStatus.objects.all()
    serializer_class = CivilStatusSerializer


class FamilyRelationshipViewSet(LookupTableViewSet):
    queryset = FamilyRelationship.objects.all()
    serializer_class = FamilyRelationshipSerializer
