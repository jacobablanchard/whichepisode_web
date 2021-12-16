import requests
import os
import copy
import logging
import whichepisode_web.settings as settings

moviedb_url_base = "https://api.themoviedb.org/3"

logger = logging.getLogger(__name__)

def make_remote_api_call(endpoint, params = {}):
    current_directory = os.path.split(__file__)[0]
    project_directory = os.path.split(current_directory)[0]
    backend_folder = os.path.split(project_directory)[0]
    if settings.DEBUG:
        api_key_file = open(os.path.join(backend_folder, "apikey.txt"))
        api_key = api_key_file.read().strip()
        api_key_file.close()
    else:
        api_key = os.environ["API_KEY"]
    queryparams = copy.deepcopy(params)
    queryparams["api_key"] = api_key
    logger.info("Making request to {}".format(endpoint))
    return(requests.get(moviedb_url_base + endpoint, params=queryparams))