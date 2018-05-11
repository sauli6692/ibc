from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class Family(models.Model):
    class Meta:
        verbose_name = _('Familar')
        verbose_name_plural = _('Familiares')
        unique_together = ('person', 'family')
        permissions = (
            ('read_family', 'Can read ' + ugettext('Familar')),
        )

    person = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Persona'),
        related_name='relative',
    )

    family = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Familiar'),
        related_name='relatives',
    )

    relationship = models.ForeignKey(
        'pmm.FamilyRelationship',
        on_delete=models.CASCADE,
        verbose_name=_('Parentezco'),
    )
