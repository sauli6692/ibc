from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import LookupTableMixin


class IntegrationLevel(LookupTableMixin):
    class Meta:
        verbose_name = _('Nivel de integración')
        verbose_name_plural = _('Niveles de integración')
        permissions = (
            ('read_integrationlevel', 'Can read ' + ugettext('Nivel de integración')),
        )


class Occupation(LookupTableMixin):
    class Meta:
        verbose_name = _('Ocupación')
        verbose_name_plural = _('Ocupaciones')
        permissions = (
            ('read_occupation', 'Can read ' + ugettext('Ocupación')),
        )


class CivilStatus(LookupTableMixin):
    class Meta:
        verbose_name = _('Estado Civil')
        verbose_name_plural = _('Estados Civiles')
        permissions = (
            ('read_civilstatus', 'Can read ' + ugettext('Estado Civil')),
        )


class FamilyRelationship(LookupTableMixin):
    class Meta:
        verbose_name = _('Relación familiar')
        verbose_name_plural = _('Relaciones familiares')
        permissions = (
            ('read_familyrelationship', 'Can read ' + ugettext('Relación familiar')),
        )
