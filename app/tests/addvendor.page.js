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
  async addVendor(testController) {
    const email = 'brokedamouth@foo.com';
    const vendorName = 'Broke Da Mouth LLC';
    const campusLocation = 'Paradise Palms Café';
    const vendorHours = 'Monday – Friday: 8:00am – 5:00pm';
    const description = 'Our foods so delicious it will literally break your mouth!';
    const picture = 'https://image.shutterstock.com/image-vector/food-icon-design-template-260nw-1042503748.jpg';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#email', email);
    await testController.typeText('#vendorName', vendorName);
    await testController.typeText('#campusLocation', campusLocation);
    await testController.typeText('#vendorHours', vendorHours);
    await testController.typeText('#description', description);
    await testController.typeText('#picture', picture);

    // Select two interests.
    const typeSelector = Selector('#vendorType');
    const localOption = typeSelector.find('#Local');
    const hawaiianOption = typeSelector.find('#Hawaiian');
    await testController.click(typeSelector);
    await testController.click(localOption);
    await testController.click(hawaiianOption);
    await testController.click(typeSelector);

    await testController.click('#AddVendor-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addVendorPage = new AddVendorPage();
