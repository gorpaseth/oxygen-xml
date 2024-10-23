@echo off

cd %~dp0

rem Configure JAVA 17 specific start-up parameters
set "JDK_JAVA_OPTIONS=%JDK_JAVA_OPTIONS% --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.net=ALL-UNNAMED"

if not "%JRE_HOME%" == "" goto gotJRE
if not "%JAVA_HOME%" == "" goto gotJava

  echo Neither the JAVA_HOME nor the JRE_HOME environment variable is defined
  echo At least one of these environment variable is needed to run this program
goto end

:gotJRE
set "OXY_JAVA=%JRE_HOME%\bin\java.exe"
set "OXY_JAVAW=%JRE_HOME%\bin\javaw.exe"
echo Using JRE_HOME %JRE_HOME%
goto testJava

:gotJava
set "OXY_JAVA=%JAVA_HOME%\bin\java.exe"
set "OXY_JAVAW=%JAVA_HOME%\bin\javaw.exe"
echo Using JAVA_HOME %JAVA_HOME%
goto testJava

:testJava
if exist "%OXY_JAVA%" goto testJavaW
echo Could not find %OXY_JAVA%
pause

:testJavaW
if exist "%OXY_JAVAW%" goto okJava
echo Could not find %OXY_JAVAW%
pause
goto end

:okJava
"%OXY_JAVA%" -cp lib\all-platforms-custom-code.jar;lib\web-author-shiro-hasher.jar com.oxygenxml.webapp.allplatforms.EntryPoint
if %ERRORLEVEL% == 0 goto startServer
if %ERRORLEVEL% == 1 echo   ERROR: Java 11 or newer is required to run oXygen XML Web Author.
echo   Install a suitable Java version and try again
goto end

:startServer

set "CURRENT_DIR=%cd%"
set "CATALINA_HOME=%CURRENT_DIR%\tomcat"
set "EXECUTABLE=%CATALINA_HOME%\bin\catalina.bat"

echo Starting oXygen XML Web Author...
REM load the vmoptions file.
SETLOCAL ENABLEDELAYEDEXPANSION
for /F "tokens=*" %%A in (oXygenXmlWebAuthor.vmoptions) do (
	SET "options=!options! %%A"
)

REM start the app with options params and others.
START "" "%OXY_JAVAW%" -Doxygen.data.dir="%CATALINA_HOME%\work\Catalina\localhost\oxygen-xml-web-author" %options% -Djava.security.policy=="%CATALINA_HOME%\conf\catalina.policy" -Dcom.oxygenxml.webapp.product=true -Djava.util.logging.config.file="%CATALINA_HOME%\conf\logging.properties" -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -classpath "%CATALINA_HOME%\bin\bootstrap.jar;%CATALINA_HOME%\bin\tomcat-juli.jar" -Dcatalina.base="%CATALINA_HOME%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_HOME%\temp" org.apache.catalina.startup.Bootstrap  start

ENDLOCAL
echo Please go to http://localhost:8080/config (or https://localhost:8443/config) in order to configure oXygen XML Web Author.
pause

:end
