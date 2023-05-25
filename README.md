# Meet-App

## Summary

The meet application will be a full-stack application using React for the front end, and AWS lambda serverless functions for the back-end. The application will display meet-up events across multiple cities, with a user being able to search for specific cities or events. The data for events in cities will be presented in cards, as well as with data visualization graphs, and charts.

## Technology

- React
- Axios
- AWS Lambda
- 0Auth

## User Stories

Feature 1: Show/Hide event details
As a user I should be able to collapse and expand events so that I can view more details about them if I am interested.

Given that an event is collapsed, when I click to expand it, then it will expand to show me more details about the event.

Given that an event is expanded, when I click to collapse it, then it will collapse, hiding the event’s details.

Feature 2: Number of events shown
As a user I should be able to choose the number of events that I would like to view at any given time, more, less, or default.

Given that the default number of events shown is 32, when the user doesn’t change the number of events shown, then the event count should be 32.

Given that the user has increased the default number of events, when the user views events, then the increased number of events should be shown to the user.

Given that the user has decreased the number of events to be shown, when the user views events, then the decreased number of events should be shown to the user.

Feature 3: Use App when offline
As a user, I should be able to use the application when I am offline or in an area that has bad internet connection, so that the app is accessible to me under almost any condition.

Given that the user has good internet connection, and is online, when the user uses the application, then the application will have full functionality.

Given that the user has bad internet connection, but is still online, when the user uses the application, then the application will still have full functionality.

Given that the user has no internet connection at all, when the user uses the application, the app will function using cached data.

Given that the user has no internet connection at all, when the user attempts to change the city and the time range of events, then the application will throw an error, otherwise being functional with cached data.

Feature 4: Data Visualization
As a user, I should be able to view some form of data visualization, representing the number of events in any given city, so that I can see popular cities for meetups, and view the data in a different way.

Given that the user is viewing a city and that city’s events, when the user wants to access the data in a visual format, then they will be presented with a chart, showing data for meets across multiple different cities.

## How this application will use Serverless

This application will use Serverless functions to authorize users for our external Google Calendar API. We will use AWS Lambda to give access tokens to the user granting them access to the API and allowing them to view events that are programmed into our Google Calendar.

![Image showing simple architecure for the application]('img/meet-architecture.png')
