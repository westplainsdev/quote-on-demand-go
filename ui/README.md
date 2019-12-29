# Vue User Interface

This application does not need to use the VueCLI, Webpack or any other build system to be runable. 

All dependecies are brought in via CDN links so an internet connection is a must when the index page 
is served to the browser.  

Simply place this folder in a location where a web server will be able to find the `index.html` file.

For best use of the application, the api server should be running so data can be processed by the application.

## What can it do?

The application has the ability to display a complete list of quotes. Allows you to choose a single author from a list and view their quote. You can add a new quote to the list. You can select and edit 
a quote from the list. You can select and delete a quote from the list. 

As long as the API server is running you can manipulate all of the data up to and including deleting all of it. If you would like to refresh the application's data, simply kill the API server and start it again. 
