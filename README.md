This is a basic calendar web app with the ability to manage events within each day, using node.js/express, backbone.js, require.js, dust.js, and bootstrap for css. 


Installation
============

1. Go to nodejs.org to install the appropriate distribution of node.js for your system.
2. In a command shell, navigate to the project root directory and enter the command, "node app.js" to start the server.
3. Open http://localhost:3000/ in a browser.


Usage
=====

Use the sidebar to create new events. Click events to edit or delete them. Hover over events to see their details in the sidebar.


Issues
======

Please submit issues on this Github repository: https://github.com/granmoe/easycalendar


Known Issues
============

After changing times for an event, the old times still display in the sidebar.
When address is updated, it shows as blank in the sidebar.
An event stays highlighted for editing if you click on a different event while editing the original one. (Simple fix)

To Do
=====

Make this app executable.
Add ability to move event to a different day/month/year. Drag and drop ability within month.
Click in a day to add an event.
