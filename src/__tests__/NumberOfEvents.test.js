import React from 'react';
import NumberOfEvents from '../NumberOfEvents';
import { shallow } from 'enzyme';
import EventList from '../EventList';

describe('<NumberOfEvents /> component', () => {
  let numberOfEventsWrapper, numberSelector;
  beforeAll(() => {
    numberOfEventsWrapper = shallow(<NumberOfEvents eventNum={32} />);
    numberSelector = numberOfEventsWrapper.find('.numOfEvents');
  });
  test('<NumberOfEvents /> and noe-input are both rendered', () => {
    expect(numberOfEventsWrapper).toBeDefined();
    expect(numberSelector).toBeDefined();
  });
  test('Changing number of events to render', () => {
    const eventObject = { target: { value: 20 } };
    numberSelector.simulate('change', eventObject);
    expect(numberOfEventsWrapper.state('num')).toBe(20);
  });
});

//having trouble don't know what to do jesus fucking christ//
