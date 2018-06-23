from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import Group


class UIRoute(models.Model):
    class Meta:
        verbose_name = _('UI Route')
        verbose_name_plural = _('UI Routes')

    slug = models.CharField(_('Route'), max_length=50)
    groups = models.ManyToManyField(
        Group,
        related_name='uiroutes',
        verbose_name=_('Group'),
        blank=True
    )

    def __str__(self):
        return self.slug
