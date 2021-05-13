import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { filterPage } from './filter.page';
import { navBar } from './navbar.component';
import { userProfile } from './userprofile.page';
import { venuesPage } from './venues.page';
import { addUserPage } from './adduser.page';
import { adminPage } from './admin.page';
import { todaysMenuPage } from './todaysmenu.page';
import { vendorSignupPage } from './vendorSignup.page';
import { addVendorPage } from './addvendor.page';
import { editUserPage } from './edituser.page';
import { editVendorPage } from './editvendor.page';
import { byCategoryPage } from './bycategory.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that venues page displays', async (testController) => {
  await navBar.gotoVenuesPage(testController);
  await venuesPage.isDisplayed(testController);
  await venuesPage.hasDefaultVendors(testController);
});

test('Test that By Category page displays', async (testController) => {
  await navBar.gotoByCategoryPage(testController);
  await byCategoryPage.isDisplayed(testController);
  await byCategoryPage.hasDefaultCards(testController);
});

test('Test that TodaysMenu page displays', async (testController) => {
  await navBar.gotoTodaysMenuPage(testController);
  await todaysMenuPage.isDisplayed(testController);
  await todaysMenuPage.hasDefaultMenus(testController);
});

test('Test that filter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFilterPage(testController);
  await filterPage.isDisplayed(testController);
  await filterPage.filter(testController);
});

// TESTS for User's pages.

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that addUser page works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // enters user data
  await addUserPage.isDisplayed(testController);
  await addUserPage.addUser(testController);
});

test('Test that UserPage page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfile.isDisplayed(testController);
});

test('Test that editUser page works', async (testController) => {
  // Sign in as default user
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfile.gotoEditUser(testController);
  // enters user data
  await editUserPage.isDisplayed(testController);
  await editUserPage.editUser(testController);
});

// TESTS for Vendor's Pages
test('Test that signinVendor and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinVendor(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that SignUpVendor and addVendor page works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newVendor = `vendor-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupVendorPage(testController);
  await vendorSignupPage.isDisplayed(testController);
  await vendorSignupPage.signupVendor(testController, newVendor, credentials.password);
  // enters user data
  await addVendorPage.isDisplayed(testController);
  await addVendorPage.addVendor(testController);
});

test('Test that editVendor page works', async (testController) => {
  // Sign in as default user
  await navBar.gotoSigninPage(testController);
  await signinPage.signinVendor(testController, credentials.username, credentials.password);
  await navBar.gotoVendorPage(testController);
  // enters user data
  await editVendorPage.isDisplayed(testController);
  await editVendorPage.editVendor(testController);
});

// Tests for Admin
test('Test that admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.hasDefaultProfiles(testController);
});
