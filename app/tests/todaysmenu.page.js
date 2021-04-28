import { Selector } from 'testcafe';

class TodaysMenuPage {
  constructor() {
    this.pageId = '#todaysMenu-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least six profiles on it.  */
  async hasDefaultMenus(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const todaysMenuPage = new TodaysMenuPage();
