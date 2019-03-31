#!/bin/sh

TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

IDLENESS=$((`ioreg -c IOHIDSystem | sed -e '/HIDIdleTime/ !{ d' -e 't' -e '}' -e 's/.* = //g' -e 'q'` / 1000000000))

APPLICATION=$(osascript -e 'tell application "System Events" to set app_name to name of first process whose frontmost is true')

CURRENTPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mkdir -p $CURRENTPATH/application-logs
#logger -s "Error Message"

echo "$APPLICATION, $TIMESTAMP, $IDLENESS" >> $CURRENTPATH/application-logs/process-`date +"%Y%m%d"`.txt
