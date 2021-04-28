import { Selector } from 'testcafe';

class AddUserPage {
  constructor() {
    this.pageId = '#add-user-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addUser(testController) {
    const firstName = 'Elodie';
    const lastName = 'Sliva';
    const bio = 'Very hungry I could eat a horse';
    const title = 'Student';
    const picture = 'https://www.centraltrials.com/wp-content/uploads/2016/11/User-Default.jpg';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#firstName', firstName);
    await testController.typeText('#lastName', lastName);
    await testController.typeText('#bio', bio);
    await testController.typeText('#title', title);
    await testController.typeText('#picture', picture);

    // Select two interests.
    const interestsSelector = Selector('#interests');
    const chineseOption = interestsSelector.find('#Chinese');
    const dessertOption = interestsSelector.find('#Dessert');
    await testController.click(interestsSelector);
    await testController.click(chineseOption);
    await testController.click(dessertOption);
    await testController.click(interestsSelector);

    await testController.click('#AddUser-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addUserPage = new AddUserPage();
