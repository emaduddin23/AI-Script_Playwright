const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');

// This file only tests the Login feature
test.describe('Login Tests', () => {
  
  test.use({ ignoreHTTPSErrors: true });

  test('Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');
    
    // Using your test password
    await loginPage.enterPasswordAndLogin('Admin1212@');

    // Verify we reached the dashboard
    await dashboardPage.verifyGreeting('Afsana Alam!');
  });

});
