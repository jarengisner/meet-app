// src/Event.js

import React, { Component } from 'react';
import './event-card.styles.css';

class Event extends Component {
  state = {
    hidden: true,
  };
  render() {
    const handleHidden = () => {
      this.setState({
        hidden: true,
      });
    };

    const closeHandler = () => {
      this.setState({
        hidden: true,
      });
    };
    //Need to add something along the lines of events.forEach produce a div etc.//
    //Check if we can use the filtered data, to make sure that once data is filtered we only see those items//

    return this.state.hidden === true ? (
      <div>
        <h1 className='eventCardTitle'>{this.props.event.summary}</h1>
        <p className='eventCardStartTime'>{this.props.event.start.dateTime}</p>
        <p className='eventCardTimeZone'>{this.props.event.start.timeZone}</p>
        <button onClick={handleHidden} className='detailsButton'>
          See Details
        </button>
      </div>
    ) : (
      <div>
        <h1 className='eventCardTitle'>{this.props.event.summary}</h1>
        <p className='eventCardStartTime'>{this.props.event.start.dateTime}</p>
        <p className='eventCardTimeZone'>{this.props.event.start.timeZone}</p>
        <h2 className='eventCardDetails hidden'>About this Event</h2>
        <a href={this.props.event.htmlLink} className='eventCardDetails hidden'>
          Click to view in Google Calendar
        </a>
        <p className='eventCardDetails hidden'>
          {this.props.event.description}
        </p>
        <button onClick={closeHandler} className='detailsButton'>
          Close Details
        </button>
      </div>
    );
  }
}
export default Event;
