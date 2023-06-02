import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<EventList /> Component', () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });
  //test for title component//
  test('render in title correctly', () => {
    const eventTitle = EventWrapper.find('h1');
    expect(eventTitle.text()).toBe(event.summary);
  });
  //tests for correct start time//
  test('start time rendered correctly', () => {
    const eventStartTime = EventWrapper.find('.eventCardStartTime');
    expect(eventStartTime).toHaveLength(1);
    expect(eventStartTime.text()).toBe(event.start.dateTime);
  });
  //test for timezone//
  test('render TimeZone correctly', () => {
    const timeZone = EventWrapper.find('.eventCardTimeZone');
    expect(timeZone).toHaveLength(1);
    expect(timeZone.text()).toBe(event.start.timeZone);
  });
  //test for button and h2//
  test('details click to show h2', () => {
    const clickMe = EventWrapper.find('.detailsButton');
    clickMe.simulate('click');
    expect(EventWrapper.find('h2').text()).toBe('About this Event');
  });
  //test for button and link//
  test('details click to show link', () => {
    /* const clickMe = EventWrapper.find('.detailsButton');
    clickMe.simulate('click'); */
    expect(EventWrapper.find('a.eventCardDetails')).toHaveLength(1);
  });
  //test for button and description//
  test('details click to show description', () => {
    /* const clickMe = EventWrapper.find('.detailsButton');
    clickMe.simulate('click'); */
    expect(EventWrapper.find('p.eventCardDetails').text()).toBe(
      event.description
    );
  });
  test('closing details button functions', () => {
    const clickMe = EventWrapper.find('.detailsButton');
    clickMe.simulate('click');

    expect(EventWrapper.state('hidden')).toBe(true);
  });
});
