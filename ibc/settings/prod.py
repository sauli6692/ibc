import os

from .common import * # noqa

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

if 'DB' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['DB_NAME'],
            'USER': os.environ['USERNAME'],
            'PASSWORD': os.environ['PASSWORD'],
            'HOST': os.environ['HOSTNAME'],
            'PORT': os.environ['PORT'],
        }
    }
