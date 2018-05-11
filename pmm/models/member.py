from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class Member(models.Model):
    class Meta:
        verbose_name = _('Miembro Pleno')
        verbose_name_plural = _('Miembros Plenos')
        permissions = (
            ('read_member', 'Can read ' + ugettext('Miembro Pleno')),
        )

    information = models.OneToOneField(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Información'),
        db_column='person_id',
        primary_key=True,
    )

    def __str__(self):
        return str(self.information)
