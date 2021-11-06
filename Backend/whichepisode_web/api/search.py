from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from . import remote_api_caller

# Create your views here.

@api_view(["GET"])
def search(request, searchString="", pageNum=1):
    params={
        "query": searchString
    }
    resp = remote_api_caller.make_remote_api_call("/search/tv", params=params)
    print(resp)
    return JsonResponse(resp.json())

