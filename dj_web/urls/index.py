from django.urls import path,include
from dj_work.dj_web.views.index import index

urlpatterns = [
    path("" , index , name="index"),
    path("menu/" , include("dj_web.urls.menu.index")),
    path("playground/" , include("dj_web.urls.playground.index")),
    path("settings/" , include("dj_web.urls.settings.index")),
]
