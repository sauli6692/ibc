from django.db import models
from django.utils.translation import ugettext_lazy as _


class Harvest(models.Model):
    class Meta:
        verbose_name = _('Mies')
        verbose_name_plural = _('Mies')

    information = models.OneToOneField(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Información'),
        db_column='person_id',
        primary_key=True,
    )

    route = models.ForeignKey(
        'rte.Route',
        on_delete=models.CASCADE,
        verbose_name=_('Ruta'),
    )

    discarded = models.BooleanField(_('Descartado'), default=False)

    discarded_reason = models.CharField(
        _('¿Por qué fue descartado?'),
        max_length=255,
        null=True,
    )

    visits = models.ManyToManyField(
        'rte.Collaborator',
        through='rte.Visit',
        verbose_name=_('Visitas'),
    )
