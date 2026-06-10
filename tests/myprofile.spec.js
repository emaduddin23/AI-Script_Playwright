const { test, expect } = require('./fixtures');

test.describe('My Profile Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ ignoreHTTPSErrors: true });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Should navigate to My Profile page', async ({ page, myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();
    await expect(page).toHaveURL(/.*profile.*/);

    const title = await myProfilePage.verifyPageTitle();
    console.log(`Page Title: ${title}`);
    expect(title.trim()).toBe('Profile');
  });

  test('Should verify user name on profile page', async ({ myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();

    const userName = await myProfilePage.verifyUserName();
    console.log(`User Name: ${userName}`);
    expect(userName).toContain('Afsana Alam');
  });

  test('Should verify Admission Manager Details section', async ({ myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();

    const section = await myProfilePage.verifyAdmissionManagerDetailsSection();
    console.log(`Section: ${section}`);
    expect(section.trim()).toBe('Admission Manager Details');
  });

  test('Should verify UAPP section is visible', async ({ myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();

    const uapp = await myProfilePage.verifyUappSection();
    console.log(`UAPP Section: ${uapp}`);
    expect(uapp.trim()).toBe('UAPP');
  });

  test('Should verify Assigned Admission Officer section', async ({ myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();

    const section = await myProfilePage.verifyAssignedAdmissionOfficerSection();
    console.log(`Assigned Admission Officer Section: ${section}`);
    expect(section.trim()).toBe('Assigned Admission Officer');

    // Print all assigned officer names
    const officerNames = await myProfilePage.getAssignedOfficerNames();
    console.log('Assigned Officers:', officerNames);

    expect(officerNames.length).toBeGreaterThan(0);
  });

  test('Should click Applications tab and verify content loads', async ({ page, myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();
    await myProfilePage.clickApplicationsTab();

    // Verify a table or content appears
    const table = page.locator('table').first();
    await expect(table).toBeVisible({ timeout: 10000 });
    console.log('Applications tab content loaded successfully.');
  });

  test('Should click Officers tab and verify content loads', async ({ page, myProfilePage }) => {
    test.setTimeout(60000);

    await myProfilePage.navigateToMyProfile();
    await myProfilePage.clickOfficersTab();

    // Verify a table or content appears
    const table = page.locator('table').last();
    await expect(table).toBeVisible({ timeout: 10000 });
    
    // Get and print the first row data
    const firstRowData = await myProfilePage.getOfficerFirstRowData();
    console.log('Officers Tab - First Row Data:');
    console.log(`  UAPP ID: ${firstRowData.uappId}`);
    console.log(`  Name: ${firstRowData.name}`);

    expect(firstRowData.uappId).toContain('ADO');
    expect(firstRowData.name).toBeTruthy();
  });

});
