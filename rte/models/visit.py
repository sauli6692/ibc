from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _
from django.utils.timezone import now


class Visit(models.Model):
    class Meta:
        verbose_name = _('Visit')
        verbose_name_plural = _('Visits')
        unique_together = ('collaborator', 'harvest')
        permissions = (
            ('read_visit', 'Can read ' + ugettext('Visit')),
        )

    collaborator = models.ForeignKey(
        'rte.Collaborator',
        on_delete=models.CASCADE,
        verbose_name=_('Collaborator'),
    )

    harvest = models.ForeignKey(
        'rte.Harvest',
        on_delete=models.CASCADE,
        verbose_name=_('Harvest'),
    )

    date = models.DateField(
        _('Visit date'),
        default=now
    )
