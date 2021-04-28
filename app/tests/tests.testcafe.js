import { landingPage } from './landing.page';

import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilesPage } from './profiles.page';
import { projectsPage } from './projects.page';
import { interestsPage } from './interests.page';
import { homePage } from './home.page';
import { addProjectPage } from './addproject.page';
import { filterPage } from './filter.page';
import { navBar } from './navbar.component';
import { userProfile } from './userprofile.page';
import { venuesPage } from './venues.page';
import { addUserPage } from './adduser.page';
import { adminPage } from './admin.page';
import { todaysMenuPage } from './todaysmenu.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that UserPage page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfile.isDisplayed(testController);
});

test('Test that venues page displays', async (testController) => {
  await navBar.gotoVenuesPage(testController);
  await venuesPage.isDisplayed(testController);
  await venuesPage.hasDefaultVendors(testController);
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

test('Test that admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.hasDefaultProfiles(testController);
});

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

test.only('Test that TodaysMenu page displays', async (testController) => {
  await navBar.gotoTodaysMenuPage(testController);
  await todaysMenuPage.isDisplayed(testController);
  await todaysMenuPage.hasDefaultMenus(testController);
});

// Profiles page is unused
test.skip('Test that profiles page displays', async (testController) => {
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  await profilesPage.hasDefaultProfiles(testController);
});

// Interests page is unused
test.skip('Test that interests page displays', async (testController) => {
  await navBar.gotoInterestsPage(testController);
  await interestsPage.isDisplayed(testController);
  await interestsPage.hasDefaultInterests(testController);
});

// Projects page is unused
test.skip('Test that projects page displays', async (testController) => {
  await navBar.gotoProjectsPage(testController);
  await projectsPage.isDisplayed(testController);
  await projectsPage.hasDefaultProjects(testController);
});

// Home page is unused
test.skip('Test that Home page display and profile modification works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await homePage.isDisplayed(testController);
  await homePage.updateProfile(testController, credentials.firstName);
  await navBar.ensureLogout(testController);
});

test('Test that addProject page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddProjectPage(testController);
  await addProjectPage.isDisplayed(testController);
  await addProjectPage.addProject(testController);
});

// Filter page not used
test('Test that filter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFilterPage(testController);
  await filterPage.isDisplayed(testController);
  await filterPage.filter(testController);
});
