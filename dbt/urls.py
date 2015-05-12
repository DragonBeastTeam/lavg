from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url('', include('dbtapp.urls', namespace="dbtappindex")),
    url(r'^app/', include('dbtapp.urls', namespace="dbtapp")),
    url(r'^admin/', include(admin.site.urls)),
)
