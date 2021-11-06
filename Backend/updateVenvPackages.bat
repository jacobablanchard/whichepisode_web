@echo off

if defined VIRTUAL_ENV ( 
    python -m pip install -r requirements.txt
    
) else ( echo ERROR: Not in virtual environment. Run startVenv.bat before running)