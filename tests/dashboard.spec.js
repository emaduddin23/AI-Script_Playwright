const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/Login/LoginPage');
const { DashboardPage } = require('../pages/Dashboard/DashboardPage');

test.describe('Dashboard Statistics Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ ignoreHTTPSErrors: true });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterEmailAndContinue('afsana.alam@uapp.uk');
    await loginPage.enterPasswordAndLogin('Admin1212@');
  });

  test('Should verify dashboard statistics cards', async ({ page }) => {
    test.setTimeout(120000);
    const dashboardPage = new DashboardPage(page);

    // Verify Greeting
    await dashboardPage.verifyGreeting('Afsana Alam');

    // Get statistics values
    const totalApplications = await dashboardPage.getTotalApplicationsCount();
    const totalStudents = await dashboardPage.getTotalStudentsCount();
    const newApplications = await dashboardPage.getNewApplicationsCount();

    const submittedToUniversity = await dashboardPage.getSubmittedToUniversityCount();
    const conditionalOfferLetter = await dashboardPage.getConditionalOfferLetterCount();
    const unconditionalOfferLetter = await dashboardPage.getUnconditionalOfferLetterCount();
    const applicationCancelled = await dashboardPage.getApplicationCancelledCount();
    const registered = await dashboardPage.getRegisteredCount();
    const conversionRate = await dashboardPage.getConversionRate();

    console.log(`Total Applications: ${totalApplications}`);
    console.log(`Total Students: ${totalStudents}`);
    console.log(`New Applications: ${newApplications}`);
    console.log(`Submitted to University: ${submittedToUniversity}`);
    console.log(`Conditional Offer Letter: ${conditionalOfferLetter}`);
    console.log(`Unconditional Offer Letter: ${unconditionalOfferLetter}`);
    console.log(`Application Cancelled: ${applicationCancelled}`);
    console.log(`Registered: ${registered}`);
    console.log(`Conversion Rate: ${conversionRate}`);

    // Assertions - Verify they are not null or undefined
    expect(totalApplications).toBeTruthy();
    expect(totalStudents).toBeTruthy();

    expect(newApplications).toBeTruthy();
    expect(submittedToUniversity).toBeTruthy();
    expect(conditionalOfferLetter).toBeTruthy();
    expect(unconditionalOfferLetter).toBeTruthy();
    expect(applicationCancelled).toBeTruthy();
    expect(registered).toBeTruthy();
    expect(conversionRate).toBeTruthy();
  });

  test('Should click dashboard statistics cards and verify counts', async ({ page }) => {
    test.setTimeout(180000);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyTotalApplicationsNavigation();
    await dashboardPage.verifyNewApplicationsNavigation();
    await dashboardPage.verifySubmittedToUniversityNavigation();
    await dashboardPage.verifyConditionalOfferLetterNavigation();
    await dashboardPage.verifyUnconditionalOfferLetterNavigation();
    await dashboardPage.verifyApplicationCancelledNavigation();
    await dashboardPage.verifyRegisteredNavigation();
  });

  test('Should verify first row of New Applications table', async ({ page }) => {
    test.setTimeout(60000);
    const dashboardPage = new DashboardPage(page);

    const appId = await dashboardPage.getFirstRowAppId();
    const student = await dashboardPage.getFirstRowStudent();
    const university = await dashboardPage.getFirstRowUniversity();
    const consultant = await dashboardPage.getFirstRowConsultant();
    const admissionOfficer = await dashboardPage.getFirstRowAdmissionOfficer();
    const assessment = await dashboardPage.getFirstRowAssessment();
    const date = await dashboardPage.getFirstRowDate();

    console.log(`First Row Table Data:
      APP ID: ${appId}
      Student: ${student}
      University: ${university}
      Consultant: ${consultant}
      Admission Officer: ${admissionOfficer}
      Assessment: ${assessment}
      Date: ${date}`);

    expect(appId).toBeTruthy();
    expect(student).toBeTruthy();
    expect(university).toBeTruthy();
    expect(consultant).toBeTruthy();
    expect(admissionOfficer).toBeTruthy();
    expect(assessment).toBeTruthy();
    expect(date).toBeTruthy();
    
    expect(appId.trim()).toMatch(/^APP\d+/);
  });

});

