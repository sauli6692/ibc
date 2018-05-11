from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class MinistryObjectives(models.Model):
    class Meta:
        verbose_name = _('Objetivo del Ministerio')
        verbose_name_plural = _('Objetivos del Ministerio')
        permissions = (
            ('read_ministryobjectives', 'Can read ' + ugettext('Objetivo del Ministerio')),
        )

    objective = models.CharField(_('Objetivo'), max_length=255)

    ministry = models.ForeignKey(
        'min.Ministry',
        on_delete=models.CASCADE,
        verbose_name=_('Ministerio'),
        null=True,
    )
