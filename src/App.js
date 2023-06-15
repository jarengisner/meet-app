import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { checkToken } from './api';
import { getAccessToken } from './api';
class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    eventLocation: '',
    warningText: '',
    showWelcomeScreen: undefined,
  };

  updateWarningText = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText:
          'The application is offline, you may experience trouble loading some content',
      });
    }
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
        /* const visibleEvents = locationEvents.slice(
          0,
          this.state.numberOfEvents
        ); */
        this.setState({
          events: locationEvents,
          numberOfEvents: this.state.numberOfEvents,
        });
      });
    }
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  /* render() {
    return (
      <div className='App'>
        <CitySearch
          updateEvents={this.updateEvents}
          locations={this.state.locations}
        />
        <NumberOfEvents
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          eventLocation={this.eventLocation}
        />
        <InfoAlert text={this.state.warningText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
} */

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;
    return (
      <div className='App'>
        <CitySearch
          updateEvents={this.updateEvents}
          locations={this.state.locations}
        />
        <NumberOfEvents
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          eventLocation={this.eventLocation}
        />
        <InfoAlert text={this.state.warningText} />
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
