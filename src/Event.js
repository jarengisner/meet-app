// src/Event.js

import React, { Component } from 'react';
const moment = require('moment');

class Event extends Component {
  state = {
    hidden: true,
  };
  render() {
    const handleHidden = () => {
      this.setState({
        hidden: false,
      });
    };

    const closeHandler = () => {
      this.setState({
        hidden: true,
      });
    };

    const DateHandler = (day) => {
      let currentDateString = day;
      const formattedDateTime = moment(currentDateString).format(
        'MM/DD/YYYY HH:mm:ss'
      );
      return formattedDateTime;
    };
    //Need to add something along the lines of events.forEach produce a div etc.//
    //Check if we can use the filtered data, to make sure that once data is filtered we only see those items//

    return this.state.hidden === true ? (
      <div className='eventContainer'>
        <h1 className='eventCardTitle'>{this.props.event.summary}</h1>
        <p className='eventCardStartTime'>
          {DateHandler(this.props.event.start.dateTime)}
        </p>
        <p className='eventCardTimeZone'>{this.props.event.start.timeZone}</p>
        <button onClick={handleHidden} className='detailsButton'>
          See Details
        </button>
      </div>
    ) : (
      <div className='eventContainer'>
        <h1 className='event__Details'>{this.props.event.summary}</h1>
        <p className='event__Details'>
          {DateHandler(this.props.event.start.dateTime)}
        </p>
        <p className='event__Details'>{this.props.event.start.timeZone}</p>
        <h2 className='event__Details'>About this Event</h2>
        <a href={this.props.event.htmlLink} className='eventCardDetails'>
          Click to view in Google Calendar
        </a>
        <p className='eventCardDetails'>{this.props.event.description}</p>
        <button onClick={closeHandler} className='detailsButton'>
          Close Details
        </button>
      </div>
    );
  }
}
export default Event;
