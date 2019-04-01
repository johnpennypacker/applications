# What's this?

A primitive script that logs the name of the front-most application on your Mac to a file.

## Why?

At the end of some amount of time, you can analyze your application use.

# Install

`cd` into this project directory

`cp app-logger.plist.example app-logger.plist`

modify app-logger.plist to taste.

* change the application Label to something like com.example.app-logger
* change the application program to point to the app-logger.sh script
* StartInterval is how many seconds between each recorded application


Add a symlink to your plist in your LaunchAgents directory:

`ln -s PATH/TO/FILE/app-logger.plist ~/Library/LaunchAgents/app-logger.plist`

Give the Application Logger script permission to do its thing.
* Open System Preferences -> Security & Privacy -> Privacy
* Go to the "Full Disk Access" pane
* add app-logger.sh to the list


Launch the agent

`launchctl load -w ~/Library/LaunchAgents/app-logger.plist`

Note: you'll be prompted to allow the logger application to control System Events.

# Uninstall

`launchctl unload -w ~/Library/LaunchAgents/app-logger.plist`

`rm ~/Library/LaunchAgents/app-logger.plist`

delete the project directory

# What does it log?

The script writes a new line to a file every X seconds (default is 30).  It records the name of the application, a time stamp, and a number in seconds that represents how long the Mac believes that the current user has been idle.