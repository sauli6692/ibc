from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import LookupTableMixin


class IntegrationLevel(LookupTableMixin):
    class Meta:
        verbose_name = _('Integration Level')
        verbose_name_plural = _('Integration Levels')
        permissions = (
            ('read_integrationlevel', 'Can read ' + ugettext('Integration Level')),
        )


class Occupation(LookupTableMixin):
    class Meta:
        verbose_name = _('Occupation')
        verbose_name_plural = _('Occupations')
        permissions = (
            ('read_occupation', 'Can read ' + ugettext('Occupation')),
        )


class CivilStatus(LookupTableMixin):
    class Meta:
        verbose_name = _('Civil Status')
        verbose_name_plural = _('Civil Status')
        permissions = (
            ('read_civilstatus', 'Can read ' + ugettext('Civil Status')),
        )


class FamilyRelationship(LookupTableMixin):
    class Meta:
        verbose_name = _('Family Relationship')
        verbose_name_plural = _('Family Relationships')
        permissions = (
            ('read_familyrelationship', 'Can read ' + ugettext('Family Relationship')),
        )
