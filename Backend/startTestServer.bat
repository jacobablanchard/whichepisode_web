@echo off

if defined VIRTUAL_ENV ( 
    set DJANGO_DEBUG=1
    python ".\whichepisode_web\manage.py" runserver
    
) else ( echo ERROR: Not in virtual environment. Run startVenv.bat before running)
