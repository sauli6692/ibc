from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
from django.conf import settings


class LogFieldsMixin(models.Model):
    """
    Adds creation_date, creation_user, modification_date, modification_user.
    """
    class Meta:
        abstract = True

    creation_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='%(app_label)s_%(class)s_user_crea',
        null=True,
        editable=False
    )
    creation_date = models.DateTimeField(_('Fecha de Creación'), default=now, editable=False)
    modification_date = models.DateTimeField(_('Fecha de Modificación'), null=True, editable=False)
    modification_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='%(app_label)s_%(class)s_user_mod',
        null=True,
        editable=False
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            self.creation_date = now()
        else:
            if not self.creation_date:
                self.creation_date = now()
            self.modification_date = now()
        super().save(*args, **kwargs)
    save.alters_data = True
