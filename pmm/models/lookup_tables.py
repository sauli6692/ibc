from django.utils.translation import ugettext_lazy as _

from core.models.mixins import LookupTableMixin


class IntegrationLevel(LookupTableMixin):
    class Meta:
        verbose_name = _('Nivel de integración')
        verbose_name_plural = _('Niveles de integración')


class Occupation(LookupTableMixin):
    class Meta:
        verbose_name = _('Ocupación')
        verbose_name_plural = _('Ocupaciones')


class CivilStatus(LookupTableMixin):
    class Meta:
        verbose_name = _('Estado Civil')
        verbose_name_plural = _('Estados Civiles')


class FamilyRelationship(LookupTableMixin):
    class Meta:
        verbose_name = _('Relación familiar')
        verbose_name_plural = _('Relaciones familiares')
