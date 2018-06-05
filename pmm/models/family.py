from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class Family(models.Model):
    class Meta:
        verbose_name = _('Family')
        verbose_name_plural = _('Relatives')
        unique_together = ('person', 'family')
        permissions = (
            ('read_family', 'Can read ' + ugettext('Family')),
        )

    person = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Person'),
        related_name='relative',
    )

    family = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Relative'),
        related_name='relatives',
    )

    relationship = models.ForeignKey(
        'pmm.FamilyRelationship',
        on_delete=models.CASCADE,
        verbose_name=_('Relationship'),
    )
