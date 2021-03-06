from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView
from . import views
from . import search
from . import lookup


urlpatterns = [
  path('welcome', views.welcome),
  path('schema', SpectacularAPIView.as_view(), name='schema'),
  path('search/<searchString>', search.search),
  path('search/<searchString>/<int:pageNum>', search.search),
  path('lookup/poster_url/<lookup_base_path>', lookup.lookup_poster_url),
  path('lookup/backdrop_url/<lookup_base_path>', lookup.lookup_backdrop_url),
  path('lookup/still_url/<lookup_base_path>', lookup.lookup_episode_still_url),
  path('lookup/tv_series_info/<int:id>', lookup.lookup_tv_series_info),
  path('lookup/tv_season_info/<int:id>/season/<int:seasonNum>', lookup.lookup_tv_season_info),
  
]