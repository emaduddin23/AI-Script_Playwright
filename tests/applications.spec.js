const { test, expect } = require('./fixtures');

test.describe('Applications Page Smoke Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ ignoreHTTPSErrors: true });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Open Applications and verify main UI elements', async ({ page, applicationsPage }) => {
    test.setTimeout(120000);

    await test.step('Navigate and wait for table', async () => {
      await applicationsPage.goto();
      await applicationsPage.locators.applicationsTable.waitFor({ state: 'visible', timeout: 10000 });
    });

    const firstRow = await test.step('Collect first row values from Applications table', async () => {
      const totalText = await applicationsPage.getTotalItemsText();
      const appId = await applicationsPage.getFirstRowAppId();
      const student = await applicationsPage.getFirstRowStudent();
      const university = await applicationsPage.getFirstRowUniversity();
      const status = await applicationsPage.getFirstRowStatus();
      const date = await applicationsPage.getFirstRowDate();

      return { totalText, appId, student, university, status, date };
    });

    await test.step('Validate first row values from Applications table', async () => {
      console.log(`Total Items: ${firstRow.totalText}`);
      console.log(`First Row Table Data:
      APP ID: ${firstRow.appId}
      Student: ${firstRow.student}
      University: ${firstRow.university}
      Status: ${firstRow.status}
      Date: ${firstRow.date}`);

      expect(await applicationsPage.locators.applicationsTable.count()).toBeGreaterThan(0);
      expect(firstRow.appId).toBeTruthy();
      expect(firstRow.student).toBeTruthy();
      expect(firstRow.university).toBeTruthy();
      expect(firstRow.status).toBeTruthy();
      expect(firstRow.date).toBeTruthy();
      expect(firstRow.appId.trim()).toMatch(/^APP\d+/);
    });

    await test.step('Search for collected Application ID and verify search result', async () => {
      const searchId = firstRow.appId.trim();
      await applicationsPage.search(searchId);
      await page.waitForTimeout(3000); // Wait for the table to refresh with search results

      const resultAppId = await applicationsPage.getFirstRowAppId();
      const resultStudent = await applicationsPage.getFirstRowStudent();
      const resultUniversity = await applicationsPage.getFirstRowUniversity();
      const resultStatus = await applicationsPage.getFirstRowStatus();
      const resultDate = await applicationsPage.getFirstRowDate();

      console.log(`
      ================ SEARCH RESULTS ================
      Searched ID: ${searchId}
      Result APP ID: ${resultAppId.trim()}
      Result Student: ${resultStudent.trim()}
      Result University: ${resultUniversity.trim()}
      Result Status: ${resultStatus.trim()}
      Result Date: ${resultDate.trim()}
      ================================================
      `);

      expect(resultAppId.trim()).toBe(searchId);
    });
  });
});
