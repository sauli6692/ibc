from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from .person import Person


class Member(Person):
    person_id = models.OneToOneField(
        Person,
        on_delete=models.CASCADE,
        parent_link=True,
        verbose_name=_('Id de persona'),
        db_column='person_id',
    )

    class Meta:
        verbose_name = _('Miembro Pleno')
        verbose_name_plural = _('Miembros Plenos')
        permissions = (
            ('read_member', 'Can read ' + ugettext('Miembro Pleno')),
        )
