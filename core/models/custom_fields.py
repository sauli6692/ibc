from django.db import models


class FixedCharField(models.Field):
    def __init__(self, verbose_name=None, name=None, *args, **kwargs):
        self.max_length = kwargs['max_length']
        super(FixedCharField, self).__init__(verbose_name, name, *args, **kwargs)

    def db_type(self, connection):
        return 'char(%s)' % self.max_length
