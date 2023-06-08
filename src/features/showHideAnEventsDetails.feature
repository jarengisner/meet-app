Feature: Showing/Hiding an events details

Scenario: When the user has  not clicked the details button, the event details should be hidden.
Given that the user has not clicked the 'See details button'
When the user opens the app
Event details should be hidden by default

Scenario: When the user clicks on the details button, event details are displayed.
Given that the user has the application open
When the user clicks the show details button on an event
Then that event will have it's details displayed

Scenario: When the user clicks close details button, the details of that event will close.
Given that the user has an events details expanded
When the user clicks the close details button
Then the details of the event will be collapsed.
