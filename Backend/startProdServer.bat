@echo off

if defined VIRTUAL_ENV ( 
    python ".\whichepisode_web\manage.py" runserver --nostatic
    
) else ( echo ERROR: Not in virtual environment. Run startVenv.bat before running)
