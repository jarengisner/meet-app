// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';
import './App.css';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className='EventList'>
        {events.map((event) => (
          <li key={event.id} className='event'>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
