import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    num: 32,
    errTxt: '',
  };
  //New handleNumChange//
  handleNumChange = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 32) {
      this.setState({
        num: value,
        errTxt: '',
      });

      /* this.props.updateEvents(this.props.selectedCity, value); */
      this.props.updateEvents(this.props.eventLocation, value);
    }
    if (value < 1 || value > 32) {
      this.setState({
        num: value,
        errTxt: 'Please enter a valid number',
      });
    }
  };

  render() {
    return (
      <div>
        <p>Number of events to show</p>
        <input
          type='number'
          className='numOfEvents'
          onChange={(event) => {
            this.handleNumChange(event);
          }}
          placeholder='32'
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
