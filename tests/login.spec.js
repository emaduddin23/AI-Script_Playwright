const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');

// This file only tests the Login feature
test.describe('Login Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  
 test('Should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await test.step('Navigate to login page', async () => {
    await loginPage.goto();
  });

  await test.step('Enter email', async () => {
    await loginPage.enterEmailAndContinue(process.env.TEST_USER_EMAIL);
  });

  await test.step('Enter password and login', async () => {
    await loginPage.enterPasswordAndLogin(process.env.TEST_USER_PASSWORD);
  });

  await test.step('Verify dashboard greeting', async () => {
    await dashboardPage.verifyGreeting('Afsana Alam!');
  });
});

});
