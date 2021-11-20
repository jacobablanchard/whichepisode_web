from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from . import remote_api_caller
from .models import TheMovieDBConfiguration as TheMovieDBConfiguration
from datetime import datetime, timezone
import logging

# Create your views here.

logger = logging.getLogger(__name__)

def create_new_config():
    """
        Creates a new config entry, saves it to the database, and returns the new entry
    """
    resp = remote_api_caller.make_remote_api_call("/configuration")
    the_data = resp.json()
    base_url = the_data["images"]["secure_base_url"]
    prefered_width = the_data["images"]["poster_sizes"][4]
    backdrop_size = the_data["images"]["backdrop_sizes"][1]
    config = TheMovieDBConfiguration(bestPosterSize=backdrop_size, smallestImageSize=prefered_width, baseURL=base_url, dateRetrieved=datetime.now(timezone.utc))
    config.save()
    return config

def update_config(old_config_entry):
    """
        Updates a config entry in place, and saves to database
    """
    resp = remote_api_caller.make_remote_api_call("/configuration")
    the_data = resp.json()
    base_url = the_data["images"]["secure_base_url"]
    prefered_width = the_data["images"]["poster_sizes"][4]
    backdrop_size = the_data["images"]["backdrop_sizes"][1]
    old_config_entry.dateRetrieved=datetime.now(timezone.utc)
    old_config_entry.baseURL = base_url
    old_config_entry.smallestImageSize = prefered_width
    old_config_entry.bestPosterSize = backdrop_size
    old_config_entry.save()

def get_config():
    config = TheMovieDBConfiguration.objects.all()
    if len(config) == 0:
        logger.info("No entry in database for TheMovieDB config. Creating one")
        configObj = create_new_config()
    else:
        configObj = config[0]
        delta = datetime.now(timezone.utc) - configObj.dateRetrieved
        if delta.total_seconds() > 60*60: # refresh config after 1 hour
            logger.info("Config entry expired, refreshing")
            update_config(configObj)
        else:
            logger.debug("config entry found")
    return configObj

@api_view(["GET"])
def lookup_poster_url(request, lookup_base_path=""):
    configObj = get_config()
    return JsonResponse({"resolvedURL" : "{}{}/{}".format(configObj.baseURL, configObj.smallestImageSize, lookup_base_path)})

@api_view(["GET"])
def lookup_backdrop_url(request, lookup_base_path=""):
    configObj = get_config()
    return JsonResponse({"resolvedURL" : "{}{}/{}".format(configObj.baseURL, configObj.bestPosterSize, lookup_base_path)})

@api_view(["GET"])
def lookup_tv_series_info(request, id):
    resp = remote_api_caller.make_remote_api_call("/tv/{}".format(id))
    the_data = resp.json()
    return JsonResponse(the_data)