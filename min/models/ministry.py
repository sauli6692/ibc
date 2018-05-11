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
    )
