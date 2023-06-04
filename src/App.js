import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    eventLocation: '',
  };
  updateEvents = (location, numberOfEvents) => {
    if (!numberOfEvents) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'All'
            ? events
            : events.filter((event) => event.location === location);
        const visibleEvents = locationEvents.slice(
          0,
          this.state.numberOfEvents
        );
        this.setState({
          events: visibleEvents,
          eventLocation: location,
        });
      });
    } else if (numberOfEvents && !location) {
      //CHECK HERE IF ERROR//
      getEvents().then((events) => {
        const locationEvents = events;
        const visibleEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: visibleEvents,
          numberOfEvents: numberOfEvents,
        });
      });
    } else if (location === 'All') {
      getEvents().then((events) => {
        const locationEvents = events;
        const visibleEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: visibleEvents,
          numberOfEvents: numberOfEvents,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = events;
        const visibleEvents = locationEvents.slice(
          0,
          this.state.numberOfEvents
        );
        this.setState({
          events: locationEvents,
          numberOfEvents: this.state.numberOfEvents,
        });
      });
    }
  };
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          numberOfEvents: 32,
        });
      }
    });
  }
  z;

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return (
      <div className='App'>
        <CitySearch
          updateEvents={this.updateEvents}
          locations={this.state.locations}
        />
        <NumberOfEvents
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
