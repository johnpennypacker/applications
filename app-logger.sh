#!/bin/sh

TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

APPLICATION=$(osascript -e 'tell application "System Events" to set app_name to name of first process whose frontmost is true')

CURRENTPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mkdir -p $CURRENTPATH/application-logs
#logger -s "Error Message"

echo "$APPLICATION, $TIMESTAMP" >> $CURRENTPATH/application-logs/process-`date +"%Y%m%d"`.txt
