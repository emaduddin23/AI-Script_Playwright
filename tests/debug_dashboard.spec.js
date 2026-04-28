const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');

test('Debug Dashboard DOM', async ({ page }) => {
  test.setTimeout(120000);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');
  await loginPage.enterPasswordAndLogin('Admin1212@');

  // Wait for dashboard to load
  await page.waitForTimeout(5000);

  // Take a screenshot to verify state
  await page.screenshot({ path: 'dashboard_debug.png', fullPage: true });

  // Find all cards or elements that might be the statistics
  // Let's look for elements containing "Total Application"
  const totalAppLocators = page.locator(':text("Total Application")');
  const count = await totalAppLocators.count();
  console.log(`Found ${count} elements with text "Total Application"`);

  for (let i = 0; i < count; i++) {
    const loc = totalAppLocators.nth(i);
    const html = await loc.evaluate(el => el.outerHTML);
    console.log(`Element ${i} HTML: ${html}`);
    
    // Print parent HTML
    const parentHtml = await loc.evaluate(el => el.parentElement.outerHTML);
    console.log(`Element ${i} Parent HTML: ${parentHtml}`);
    
    // Print grand parent HTML
    const grandParentHtml = await loc.evaluate(el => el.parentElement.parentElement.outerHTML);
    console.log(`Element ${i} GrandParent HTML: ${grandParentHtml}`);
  }

  // Let's also print all text content of elements with class that looks like a card
  // Or just print all text on the page to see what's there
  const textContent = await page.innerText('body');
  console.log(`Page Text Content snippet:\n${textContent.substring(0, 1000)}`);
});
