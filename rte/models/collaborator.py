from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class Collaborator(models.Model):
    class Meta:
        verbose_name = _('Colaborador')
        verbose_name_plural = _('Colaboradores')
        permissions = (
            ('read_collaborator', 'Can read ' + ugettext('Colaborador')),
        )

    member_information = models.OneToOneField(
        'pmm.Member',
        on_delete=models.CASCADE,
        verbose_name=_('Información de Colaborador'),
        db_column='member_id',
        primary_key=True,
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
