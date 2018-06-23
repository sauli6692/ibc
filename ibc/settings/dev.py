from .common import * # noqa

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ibc',
        'USER': 'ibc',
        'PASSWORD': 'asd.123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Sorl Thumbnail
THUMBNAIL_DEBUG = True
