from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin


class Ministry(ContentMixin):
    class Meta:
        verbose_name = _('Ministerio')
        verbose_name_plural = _('Ministerios')
        permissions = (
            ('read_ministry', 'Can read ' + ugettext('Ministerios')),
        )

    leaders = models.ManyToManyField(
        'pmm.Member',
        verbose_name=_('Lideres'),
        related_name='leading_ministries'
    )

    members = models.ManyToManyField(
        'pmm.Member',
        verbose_name=_('Miembros'),
        related_name='ministries'
    )


class MinistryObjective(models.Model):
    class Meta:
        verbose_name = _('Objetivo del Ministerio')
        verbose_name_plural = _('Objetivos del Ministerio')
        permissions = (
            ('read_ministryobjective', 'Can read ' + ugettext('Objetivo del Ministerio')),
        )

    objective = models.CharField(_('Objetivo'), max_length=255)

    ministry = models.ForeignKey(
        'min.Ministry',
        on_delete=models.CASCADE,
        verbose_name=_('Ministerio'),
        null=True,
    )
