from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from dbtapp import views

urlpatterns = [
     url(r'^$', views.index, name='index'),
     url(r'^video/list/$', views.videoList, name='videoList'),
     url(r'^video/new/$', views.newVideo, name='videoNew'),
     url(r'^video/(?P<pk>\d+)/$', views.videoEdit, name='videoEdit'),
     url(r'^video/remove/(?P<pk>\d+)/$', views.videoRemove, name='videoRemove'),
     url(r'^phantomjs/$', views.phantomjs, name='phantomjs'),
     url(r'^phantomjs/(?P<pk>\d+)/$', views.phantomjswithpk, name='phantomjspk'),
     url(r'^video/(?P<pk>\d+)/logoPost$', views.logoPost, name='logoPost'),
     #url(r'^riktigIndex/$', views.riktigIndex, name='riktigIndex')
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)