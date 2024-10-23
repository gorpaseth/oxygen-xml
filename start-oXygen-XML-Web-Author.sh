#!/bin/sh

# resolve links - $0 may be a softlink
CWD=`pwd`
cd `dirname $0`
PRGDIR=`pwd -P`
cd $CWD

# Add the JAVA 17 specific start-up parameters required by Tomcat
JDK_JAVA_OPTIONS="$JDK_JAVA_OPTIONS --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.net=ALL-UNNAMED"
export JDK_JAVA_OPTIONS

# On Mac we set the JAVA_HOME it is not defined.
if [ ! -n "$JAVA_HOME" ] && [ ! -n "$JRE_HOME" ] && [ "$(uname)" = "Darwin" ]; then
  export JAVA_HOME=$(/usr/libexec/java_home)
fi

#load properties from oXygenXmlWebAuthor.vmoptions file
export VMOPTIONS="`cat $PRGDIR/oXygenXmlWebAuthor.vmoptions | tr '\r\n' '  '`"
export CATALINA_OPTS="$CATALINA_OPTS -Doxygen.data.dir=$PRGDIR/tomcat/work/Catalina/localhost/oxygen-xml-web-author $VMOPTIONS"

export CATALINA_OPTS="$CATALINA_OPTS -Dcom.oxygenxml.webapp.product=true -Djava.security.policy==\"$PRGDIR/tomcat/conf/catalina.policy\""

# Tomcat location
export CATALINA_HOME="$PRGDIR/tomcat"
export CATALINA_BASE="$PRGDIR/tomcat"

#create the logs dir if it does not exist.
if [ ! -d "$DIRECTORY" ]; then
  mkdir -p $PRGDIR/logs
fi

if [ -n "$JAVA_HOME" ] || [ -n "$JRE_HOME" ]; then
  if [ -n "$JRE_HOME" ];then
  OXY_JAVA="${JRE_HOME}/bin/java"
                if [ -f "$OXY_JAVA" ];then
                        echo Using JRE_HOME $JRE_HOME
                else
                        echo Error: Could not find $OXY_JAVA
                        exit 1
                fi
  else
        OXY_JAVA="${JAVA_HOME}/bin/java"
                if [ -f "$OXY_JAVA" ];then
                        echo Using JAVA_HOME $JAVA_HOME
                else
                        echo Error: Could not find $OXY_JAVA
                        exit 1
                fi
  fi

  # The Java code wants the current folder to be the folder of the script
  cd $PRGDIR
  
  # Give all .sh files execution permissions.
  ls $PRGDIR/tomcat/bin/*.sh | xargs chmod a+x
  
  "$OXY_JAVA" -cp "$PRGDIR/lib/all-platforms-custom-code.jar:$PRGDIR/lib/web-author-shiro-hasher.jar" com.oxygenxml.webapp.allplatforms.EntryPoint
  status=$?

  if [ "$status" = "0" ];then
    # start tomcat
    echo Starting oXygen XML Web Author...
    echo "Please go to http://localhost:8080/config (or https://localhost:8443/config) in order to configure oXygen XML Web Author."

    # Go to the initial current directory before running tomcat.

    sh $PRGDIR/tomcat/bin/startup.sh > $PRGDIR/logs/webapp-start.log
  else
    echo   ERROR: Java 11 or newer is required to run oXygen XML Web Author.
    echo   Install a suitable Java version and restart
  fi
  
  cd $CWD
else
  echo Neither the JAVA_HOME nor the JRE_HOME environment variable is defined
  echo At least one of these environment variable is needed to run this program
fi
