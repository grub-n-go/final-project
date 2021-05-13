import { Selector } from 'testcafe';

class EditUserPage {
  constructor() {
    this.pageId = '#edit-user-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async editUser(testController) {
    const firstName = 'Paul';
    const lastName = 'Jr';
    const bio = 'I like to go hiking.';
    const title = ' & Mentor';
    const picture = 'https://www.centraltrials.com/wp-content/uploads/2016/11/User-Default.jpg';
    await this.isDisplayed(testController);
    // Define the new project
    await testController
      .click('#firstName')
      .pressKey('ctrl+a delete');
    await testController.typeText('#firstName', firstName);
    await testController
      .click('#lastName')
      .pressKey('ctrl+a delete');
    await testController.typeText('#lastName', lastName);
    await testController
      .click('#bio')
      .pressKey('ctrl+a delete');
    await testController.typeText('#bio', bio);
    await testController.typeText('#title', title);
    await testController
      .click('#picture')
      .pressKey('ctrl+a delete');
    await testController.typeText('#picture', picture);

    // Select two interests.
    const interestsSelector = Selector('#interests');
    const localOption = interestsSelector.find('#Local');
    const dessertOption = interestsSelector.find('#Dessert');
    await testController.click(interestsSelector);
    await testController.click(localOption);
    await testController.click(dessertOption);
    await testController.click(interestsSelector);

    await testController.click('#editUser-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editUserPage = new EditUserPage();
