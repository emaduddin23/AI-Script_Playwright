const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');
const { SearchPage } = require('../pages/Search/SearchPage');

test('UAPP Portal exact flow match', async ({ page }) => {
  // Give this test 2 full minutes to run, so our student loop doesn't run out of time!
  test.setTimeout(120000);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const searchPage = new SearchPage(page);

  // 1. goto to portal-test.uapp.uk
  await loginPage.goto();

  // 2. Enter the email and 3. click the continue button
  await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');

  // 4. enter the password and 5. click the log in button
  // ⚠️ ACTION REQUIRED: Put your real password below! ⚠️
  const password = 'Admin1212@';
  await loginPage.enterPasswordAndLogin(password);

  // 6. verify the dashboard message 'Hello, Afsana Alam!'
  await dashboardPage.verifyGreeting('Afsana Alam!');

  // 7. click the 'search and apply' menu
  await dashboardPage.navigateToSearchAndApply();

  // Wait for the page to load completely after clicking Search & Apply
  // (networkidle can sometimes freeze the test, so we use a simple sleep here for safety)
  await page.waitForTimeout(3000);

  // 8. click the 'all student' dropdown
  await searchPage.clickAllStudentDropdown();

  // 9. click any student
  await searchPage.clickAnyStudent();

  // 10. then click available 'apply now' button
  await searchPage.clickApplyNow();
});
