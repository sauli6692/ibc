from rest_framework import routers

from rte import views

app_name = 'rte'

router = routers.DefaultRouter()
router.register(r'routes', views.RouteViewSet)

urlpatterns = router.urls
