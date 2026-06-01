const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { ApplicationsPage } = require('../pages/Applications/ApplicationsPage');

test.describe('Applications Page Smoke Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ ignoreHTTPSErrors: true });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmailAndContinue(process.env.TEST_USER_EMAIL);
    await loginPage.enterPasswordAndLogin(process.env.TEST_USER_PASSWORD);
  });

  test('Open Applications and verify main UI elements', async ({ page }) => {
    test.setTimeout(120000);
    const applicationsPage = new ApplicationsPage(page);

    await test.step('Navigate to Applications page', async () => {
      await applicationsPage.goto();
      await applicationsPage.locators.applicationsTable.waitFor({ state: 'visible', timeout: 10000 });
    });

    await test.step('Verify total items text and table presence', async () => {
      const totalText = await applicationsPage.getTotalItemsText().catch(() => null);
      console.log(`Total Items: ${totalText?.trim() || 'nai'}`);
      expect(await applicationsPage.locators.applicationsTable.count()).toBeGreaterThan(0);
    });

    await test.step('Fetch and validate first row fields', async () => {
      const appId = await applicationsPage.getFirstRowAppId();
      const student = await applicationsPage.getFirstRowStudent();
      const university = await applicationsPage.getFirstRowUniversity();
      const status = await applicationsPage.getFirstRowStatus();
      const date = await applicationsPage.getFirstRowDate();

     console.log(`APP ID: ${appId || 'nai'}`);
console.log(`Student: ${student || 'nai'}`);
console.log(`University: ${university || 'nai'}`);
console.log(`Status: ${status || 'nai'}`);
console.log(`Date: ${date || 'nai'}`);

      expect(appId).toBeTruthy();
    });
  });

});
