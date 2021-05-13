import { Selector } from 'testcafe';

class EditVendorPage {
  constructor() {
    this.pageId = '#add-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async editVendor(testController) {
    const vendorName = ' at UH Manoa';
    const campusLocation = 'Athletic Complex';
    const vendorHours = 'Closed';
    const description = 'Currently close because of the Pandemic. We will be back soon!';
    const picture = 'https://image.shutterstock.com/image-vector/food-icon-design-template-260nw-1042503748.jpg';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#vendorName', vendorName);
    await testController
      .click('#campusLocation')
      .pressKey('ctrl+a delete');
    await testController.typeText('#campusLocation', campusLocation);
    await testController
      .click('#vendorHours')
      .pressKey('ctrl+a delete');
    await testController.typeText('#vendorHours', vendorHours);
    await testController
      .click('#description')
      .pressKey('ctrl+a delete');
    await testController.typeText('#description', description);
    await testController
      .click('#picture')
      .pressKey('ctrl+a delete');
    await testController.typeText('#picture', picture);

    // Select two interests.
    const typeSelector = Selector('#vendorType');
    const localOption = typeSelector.find('#Local');
    const veganOption = typeSelector.find('#Vegan');
    await testController.click(typeSelector);
    await testController.click(localOption);
    await testController.click(veganOption);
    await testController.click(typeSelector);

    await testController.click('#AddVendor-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editVendorPage = new EditVendorPage();
