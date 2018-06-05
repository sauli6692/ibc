from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from pmm.models import Member


class Collaborator(Member):
    class Meta:
        verbose_name = _('Collaborator')
        verbose_name_plural = _('Collaborators')
        permissions = (
            ('read_collaborator', 'Can read ' + ugettext('Collaborator')),
        )

    member_id = models.OneToOneField(
        'pmm.Member',
        on_delete=models.CASCADE,
        verbose_name=_('Member reference'),
        db_column='member_id',
        parent_link=True,
    )

    route = models.ForeignKey(
        'rte.Route',
        on_delete=models.CASCADE,
        verbose_name=_('Route'),
    )

    ministry = models.OneToOneField(
        'min.Ministry',
        on_delete=models.CASCADE,
        verbose_name=_('Ministry'),
        null=True
    )

    route_captain = models.BooleanField(_('Is captain'), default=False)
