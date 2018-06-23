from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from .person import Person


class Member(Person):
    person_id = models.OneToOneField(
        Person,
        on_delete=models.CASCADE,
        parent_link=True,
        verbose_name=_('Person reference'),
        db_column='person_id',
    )

    class Meta:
        verbose_name = _('Member')
        verbose_name_plural = _('Members')
        permissions = (
            ('read_member', 'Can read ' + ugettext('Member')),
        )
