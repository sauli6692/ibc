from django.db import models
from django.utils.translation import ugettext_lazy as _


class ContentMixin(models.Model):
    """
    Adds name and description fields.
    """
    class Meta:
        abstract = True

    name = models.CharField(_('Nombre'), max_length=150)
    description = models.CharField(_('Descripción'), max_length=255, blank=True,)

    def __str__(self):
        return self.name
