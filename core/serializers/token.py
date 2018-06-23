from datetime import datetime
from calendar import timegm

from rest_framework_jwt.settings import api_settings


def jwt_payload_handler(user):
    payload = {
        'id': user.pk,
        'username': user.username,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA,
        'isActive': user.is_active,
        'roles': [group['pk'] for group in user.groups.all().values('pk')],
        'owner': user.get_full_name()
    }

    if user.is_superuser:
        payload['isSuperuser'] = user.is_superuser

    # Include original issued at time for a brand new token,
    # to allow token refresh
    if api_settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = timegm(
            datetime.utcnow().utctimetuple()
        )

    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload
