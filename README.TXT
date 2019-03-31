Installation:

cd into this directory

cp app-logger.plist.example app-logger.plist

modify app-logger.plist to taste.
	- change the application Label to something like com.example.app-logger
	- change the application program to point to the app-logger.sh script
	- StartInterval is how many seconds between each recorded application


Copy the plist to your LaunchAgents directory:

cp app-logger.plist ~/Library/LaunchAgents/app-logger.plist


Launch the agent

launchctl load -w ~/Library/LaunchAgents/app-logger.plist


Uninstall:

launchctl unload -w ~/Library/LaunchAgents/app-logger.plist
rm ~/Library/LaunchAgents/app-logger.plist

delete this directory
