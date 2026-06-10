const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const path = require('path');

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.enterEmailAndContinue(process.env.TEST_USER_EMAIL);
  await loginPage.enterPasswordAndLogin(process.env.TEST_USER_PASSWORD);

  // // Verify login succeeded before caching state
  // await dashboardPage.verifyGreeting('Afsana Alam!');

  // Save storage state
  await page.context().storageState({ path: authFile });
});
