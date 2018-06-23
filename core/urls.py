from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from core import views


urlpatterns = [
    url(r'^auth/login/$', obtain_jwt_token),
    url(r'^auth/token-refresh/$', refresh_jwt_token),
    url(r'^auth/token-verify/$', verify_jwt_token),
    url(r'^auth/singup/$', views.SingupView.as_view()),
    url(r'^auth/ui-routes/$', views.UIRouteView.as_view()),
]
