const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');
const { SearchPage } = require('../pages/Search/SearchPage');

// This file only tests the Search & Apply feature
test.describe('Search & Apply Tests', () => {
  
  test.use({ ignoreHTTPSErrors: true });

  // This "beforeEach" runs BEFORE every test in this file
  // It logs in automatically so we are ready to search!
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');
    await loginPage.enterPasswordAndLogin('Admin1212@');
  });

  test('Should find a student and click Apply Now', async ({ page }) => {
    // Give this test 3 full minutes to run!
    test.setTimeout(180000);
    const dashboardPage = new DashboardPage(page);
    const searchPage = new SearchPage(page);

    // 1. Navigate to Search & Apply
    await dashboardPage.navigateToSearchAndApply();
    await page.waitForTimeout(3000); // Wait for page load

    // 2. Open dropdown
    await searchPage.clickAllStudentDropdown();

    // 3. Find student and click Apply Now directly
    await searchPage.selectStudentAndClickApply();

    // 5. Complete the application modal
    await searchPage.applycard();
    await searchPage.campusselect();
    await searchPage.deliverApplication();
  });

});
