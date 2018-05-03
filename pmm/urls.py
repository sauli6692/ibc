from rest_framework import routers

from pmm.views import rest as views

app_name = 'pmm'

router = routers.DefaultRouter()
router.register(r'discipleships', views.DiscipleshipViewSet)
router.register(r'lessons', views.LessonViewSet)

urlpatterns = router.urls
