import { Page } from 'playwright';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getTitle() {
    return await this.page.title();
  }
}
