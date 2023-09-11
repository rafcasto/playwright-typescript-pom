import { chromium, Browser, Page } from 'playwright';
import HomePage from '../pages/HomePage';

describe('Home Page Test', () => {
  let browser: Browser;
  let page: Page;
  let homePage: HomePage;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    homePage = new HomePage(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should navigate to example.com', async () => {
    await homePage.navigateTo('https://example.com');
    const title = await homePage.getTitle();
    expect(title).toBe('Example Domain');
  });
});
