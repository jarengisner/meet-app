// src/__tests__/App.test.js

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App /> component', () => {
  //creates AppWrapper variable, allowing us to only write it once//
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    //tests to see that our app is displaying events//
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    //tests to see if our search component is rendered in our app//
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});
