from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin


class Ministry(ContentMixin):
    class Meta:
        verbose_name = _('Ministry')
        verbose_name_plural = _('Ministries')
        permissions = (
            ('read_ministry', 'Can read ' + ugettext('Ministries')),
        )

    leaders = models.ManyToManyField(
        'pmm.Member',
        verbose_name=_('Leaders'),
        related_name='leading_ministries'
    )

    members = models.ManyToManyField(
        'pmm.Member',
        verbose_name=_('Members'),
        related_name='ministries'
    )


class MinistryObjective(models.Model):
    class Meta:
        verbose_name = _('Ministry Objective')
        verbose_name_plural = _('Ministry Objectives')
        permissions = (
            ('read_ministryobjective', 'Can read ' + ugettext('Ministry Objective')),
        )

    objective = models.CharField(_('Objective'), max_length=255)

    ministry = models.ForeignKey(
        'min.Ministry',
        on_delete=models.CASCADE,
        verbose_name=_('Ministry'),
        null=True,
    )
