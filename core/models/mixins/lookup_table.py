from django.db import models
from django.utils.translation import ugettext_lazy as _


class LookupTableMixin(models.Model):
    """
    Adds value field.
    """
    class Meta:
        abstract = True

    value = models.CharField(_('Valor'), max_length=50)
