from django.urls import path
from dj_web.views.settings.getinfo import getinfo

urlpatterns = [
    path("getinfo/" , getinfo,name="settings_getinfo"),
]