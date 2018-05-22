from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from pmm.models import Member


class Collaborator(Member):
    class Meta:
        verbose_name = _('Colaborador')
        verbose_name_plural = _('Colaboradores')
        permissions = (
            ('read_collaborator', 'Can read ' + ugettext('Colaborador')),
        )

    member_id = models.OneToOneField(
        'pmm.Member',
        on_delete=models.CASCADE,
        verbose_name=_('Id de miembro'),
        db_column='member_id',
        parent_link=True,
    )

    route = models.ForeignKey(
        'rte.Route',
        on_delete=models.CASCADE,
        verbose_name=_('Ruta'),
    )

    ministry = models.OneToOneField(
        'min.Ministry',
        on_delete=models.CASCADE,
        verbose_name=_('Ministerio'),
        null=True
    )

    route_captain = models.BooleanField(_('Es Capitan'), default=False)
