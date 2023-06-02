import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    num: 32,
  };

  handleNumChange = (event) => {
    const newNum = event.target.value;
    this.setState({ num: newNum });
  };
  render() {
    return (
      <div>
        <p>Number of events to show</p>
        <input
          type='number'
          className='numOfEvents'
          onChange={() => {
            this.handleNumChange();
          }}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
