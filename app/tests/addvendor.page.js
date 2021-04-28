import { Selector } from 'testcafe';

class AddVendorPage {
  constructor() {
    this.pageId = '#add-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addProject(testController) {
    const vendorName = `radgrad-${new Date().getTime()}`;
    const campusLocation = '...';
    const vendorHours = '...';
    const description = 'Growing awesome computer scientists, one graduate at a time.';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#name', vendorName);
    await testController.typeText('#campusLocation', campusLocation);
    await testController.typeText('#vendorHours', vendorHours);
    await testController.typeText('#description', description);

    // Select two interests.
    const interestsSelector = Selector('#interests');
    const chineseOption = interestsSelector.find('#Chinese');
    const dessertOption = interestsSelector.find('#Dessert');
    await testController.click(interestsSelector);
    await testController.click(chineseOption);
    await testController.click(dessertOption);
    await testController.click(interestsSelector);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addVendorPage = new AddVendorPage();
