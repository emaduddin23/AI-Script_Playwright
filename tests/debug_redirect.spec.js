const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');

test('Debug Redirect Page', async ({ page }) => {
  test.setTimeout(120000);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');
  await loginPage.enterPasswordAndLogin('Admin1212@');

  // Click Total Applications
  await dashboardPage.clickTotalApplications();

  // Wait for navigation and load
  await page.waitForTimeout(5000);

  // Take a screenshot
  await page.screenshot({ path: 'redirect_debug.png', fullPage: true });

  // Print all text content to find "Total Items" or similar
  const textContent = await page.innerText('body');
  console.log(`Page Text Content snippet:\n${textContent.substring(0, 2000)}`);

  // Look for elements containing "Total" or numbers
  // Often pagination says "Total: 16" or "1-10 of 16"
  const potentialElements = page.locator(':text-matches("Total|items|Showing", "i")');
  const count = await potentialElements.count();
  console.log(`Found ${count} potential elements related to counts`);

  for (let i = 0; i < Math.min(count, 10); i++) {
    const loc = potentialElements.nth(i);
    const text = await loc.innerText();
    console.log(`Element ${i} Text: ${text}`);
  }
});
