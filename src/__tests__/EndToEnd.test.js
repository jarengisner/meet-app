/* const puppeteer = require('puppeteer'); */
/* import puppeteer from 'puppeteer-core'; */
const puppeteer = require('puppeteer');

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
  });
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.eventContainer .event__Details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .detailsButton');
    const eventDetails = await page.$('.eventContainer .event__Details');
    expect(eventDetails).toBeDefined();
  });
});
