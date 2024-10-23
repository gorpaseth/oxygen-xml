#!/bin/sh

# resolve links - $0 may be a softlink
CWD=`pwd`
cd `dirname $0`
PRGDIR=`pwd -P`

# Tomcat location
export CATALINA_HOME="$PRGDIR/tomcat"
export CATALINA_BASE="$PRGDIR/tomcat"

#create the logs dir if it does not exist.
if [ ! -d "$DIRECTORY" ]; then
  mkdir -p $PRGDIR/logs
fi

echo Stopping oXygen XML Web Author...
# start tomcat
sh "$PRGDIR/tomcat/bin/shutdown.sh" > $PRGDIR/logs/webapp-stop.log

cd $CWD