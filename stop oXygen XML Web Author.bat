@echo off

cd %~dp0

set "CURRENT_DIR=%cd%"
set "CATALINA_HOME=%CURRENT_DIR%\tomcat"

echo Stopping oXygen XML Web Author...

"%CATALINA_HOME%\bin\shutdown.bat" > tomcat-stop.log

pause