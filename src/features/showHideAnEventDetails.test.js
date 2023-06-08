import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('When the user has  not clicked the details button, the event details should be hidden.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('that the user has not clicked the details button', () => {});

    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('Event details should be hidden by default', () => {
      expect(AppWrapper.find('.event__Details')).toEqual({});
    });
  });

  test('When the user clicks on the details button, event details are displayed.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('that the user has the application open', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user clicks the show details button on an event', () => {
      AppWrapper.update();
      AppWrapper.find('.detailsButton').at([0]).simulate('click');
    });

    then("that event will have it's details displayed", () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event__Details')).not.toBe(null);
    });
  });

  test('When the user clicks close details button, the details of that event will close.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('that the user has an events details expanded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.detailsButton').at([0]).simulate('click');
    });

    when('the user clicks the close details button', () => {
      AppWrapper.update();
      AppWrapper.find('.detailsButton').at([0]).simulate('click');
      expect(AppWrapper.find('.event__Details')).toEqual({});
    });

    then('the details of the event will be collapsed.', () => {});
  });
});
