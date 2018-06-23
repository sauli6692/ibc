from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from pmm.models import Person


class Harvest(Person):
    class Meta:
        verbose_name = _('Harvest')
        verbose_name_plural = _('Harvests')
        permissions = (
            ('read_harvest', 'Can read ' + ugettext('Harvest')),
        )

    person_id = models.OneToOneField(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Person reference'),
        db_column='person_id',
        parent_link=True,
    )

    route = models.ForeignKey(
        'rte.Route',
        on_delete=models.CASCADE,
        verbose_name=_('Route'),
    )

    discarded = models.BooleanField(_('Discarded'), default=False)

    discarded_reason = models.CharField(
        _('Discarded Reason'),
        max_length=255,
        null=True,
    )

    visits = models.ManyToManyField(
        'rte.Collaborator',
        through='rte.Visit',
        verbose_name=_('Visits'),
    )
