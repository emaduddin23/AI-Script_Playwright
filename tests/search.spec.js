const { test, expect } = require('./fixtures');

// This file only tests the Search & Apply feature
test.describe('Search & Apply Tests', () => {
  
  test.use({ ignoreHTTPSErrors: true });

  // This "beforeEach" runs BEFORE every test in this file
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Should find a student and click Apply Now', async ({ page, searchPage }) => {
    // Give this test 3 full minutes to run!
    test.setTimeout(180000);

    // 1. Navigate to Search & Apply
    await searchPage.goto();
    await page.waitForTimeout(3000); // Wait for page load

    // 2. Open dropdown
    await searchPage.clickAllStudentDropdown();

    // 3. Find student and click Apply Now directly
    const hasApplied = await searchPage.selectStudentAndClickApply();

    if (hasApplied) {
      // 5. Complete the application modal
      await searchPage.applycard();
      await searchPage.campusselect();
      await searchPage.deliverApplication();
    } else {
      console.log('Skipping final steps since no student had an active Apply Now button.');
    }
  });

});
