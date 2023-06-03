import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { extractLocations } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
  };
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'All'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

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
        <EventList events={this.state.events} />
        <NumberOfEvents locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
