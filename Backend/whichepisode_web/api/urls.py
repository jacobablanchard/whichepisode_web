from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView
from . import views
from . import search


urlpatterns = [
  path('welcome', views.welcome),
  path('schema', SpectacularAPIView.as_view(), name='schema'),
  path('search/<slug:searchString>', search.search),
  path('search/<slug:searchString>/<int:pageNum>', search.search),
]