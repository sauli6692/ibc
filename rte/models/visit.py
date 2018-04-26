from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now


class Visit(models.Model):
    class Meta:
        verbose_name = _('Visita Realizada')
        verbose_name_plural = _('Visitas Realizadas')
        unique_together = ('collaborator', 'harvest')

    collaborator = models.ForeignKey(
        'rte.Collaborator',
        on_delete=models.CASCADE,
        verbose_name=_('Colaborador'),
    )

    harvest = models.ForeignKey(
        'rte.Harvest',
        on_delete=models.CASCADE,
        verbose_name=_('Mies'),
    )

    date = models.DateField(
        _('Fecha de Visita'),
        default=now
    )
