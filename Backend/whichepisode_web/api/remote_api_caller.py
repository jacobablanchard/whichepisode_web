import requests
import os
import copy

moviedb_url_base = "https://api.themoviedb.org/3"

def make_remote_api_call(endpoint, params):
    current_directory = os.path.split(__file__)[0]
    project_directory = os.path.split(current_directory)[0]
    backend_folder = os.path.split(project_directory)[0]
    api_key_file = open(os.path.join(backend_folder, "apikey.txt"))
    api_key = api_key_file.read().strip()
    api_key_file.close()
    
    queryparams = copy.deepcopy(params)
    queryparams["api_key"] = api_key
    return(requests.get(moviedb_url_base + endpoint, params=queryparams))