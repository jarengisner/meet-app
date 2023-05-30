// src/__tests__/App.test.js

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';

describe('<App /> component', () => {
  test('render list of events', () => {
    //imports our app as a shallow merge//
    const AppWrapper = shallow(<App />);
    //tests to see that our app is displaying events//
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
