from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from pmm.models import Person


class Harvest(Person):
    class Meta:
        verbose_name = _('Mies')
        verbose_name_plural = _('Mies')
        permissions = (
            ('read_harvest', 'Can read ' + ugettext('Mies')),
        )

    person_id = models.OneToOneField(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Id persona'),
        db_column='person_id',
        parent_link=True,
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
