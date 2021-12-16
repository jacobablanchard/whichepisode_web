@echo off

if defined VIRTUAL_ENV ( 
    set DJANGO_DEBUG_PROD=1
    python ".\whichepisode_web\manage.py" runserver --nostatic
    
) else ( echo ERROR: Not in virtual environment. Run startVenv.bat before running)
