const { test, expect } = require('./fixtures');

test.describe('Dashboard Statistics Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ ignoreHTTPSErrors: true });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Should verify dashboard statistics cards', async ({ dashboardPage }) => {
    test.setTimeout(120000);

    await test.step('Verify greeting and fetch dashboard stats', async () => {
      await dashboardPage.verifyGreeting('Afsana Alam');
    });

    const stats = await test.step('Collect all dashboard card values', async () => {
      const totalApplications = await dashboardPage.getTotalApplicationsCount();
      const totalStudents = await dashboardPage.getTotalStudentsCount();
      const newApplications = await dashboardPage.getNewApplicationsCount();
      const submittedToUniversity = await dashboardPage.getSubmittedToUniversityCount();
      const conditionalOfferLetter = await dashboardPage.getConditionalOfferLetterCount();
      const unconditionalOfferLetter = await dashboardPage.getUnconditionalOfferLetterCount();
      const applicationCancelled = await dashboardPage.getApplicationCancelledCount();
      const registered = await dashboardPage.getRegisteredCount();
      const conversionRate = await dashboardPage.getConversionRate();

      return {
        totalApplications,
        totalStudents,
        newApplications,
        submittedToUniversity,
        conditionalOfferLetter,
        unconditionalOfferLetter,
        applicationCancelled,
        registered,
        conversionRate,
      };
    });

    await test.step('Log and validate collected dashboard stats', async () => {
      console.log(`Total Applications: ${stats.totalApplications}`);
      console.log(`Total Students: ${stats.totalStudents}`);
      console.log(`New Applications: ${stats.newApplications}`);
      console.log(`Submitted to University: ${stats.submittedToUniversity}`);
      console.log(`Conditional Offer Letter: ${stats.conditionalOfferLetter}`);
      console.log(`Unconditional Offer Letter: ${stats.unconditionalOfferLetter}`);
      console.log(`Application Cancelled: ${stats.applicationCancelled}`);
      console.log(`Registered: ${stats.registered}`);
      console.log(`Conversion Rate: ${stats.conversionRate}`);

      expect(stats.totalApplications).toBeTruthy();
      expect(stats.totalStudents).toBeTruthy();
      expect(stats.newApplications).toBeTruthy();
      expect(stats.submittedToUniversity).toBeTruthy();
      expect(stats.conditionalOfferLetter).toBeTruthy();
      expect(stats.unconditionalOfferLetter).toBeTruthy();
      expect(stats.applicationCancelled).toBeTruthy();
      expect(stats.registered).toBeTruthy();
      expect(stats.conversionRate).toBeTruthy();
    });
  });

  test('Should click dashboard statistics cards and verify counts', async ({ dashboardPage }) => {
    test.setTimeout(180000);

    await test.step('Verify Total Applications card navigation', async () => {
      await dashboardPage.verifyTotalApplicationsNavigation();
    });

    await test.step('Verify New Applications card navigation', async () => {
      await dashboardPage.verifyNewApplicationsNavigation();
    });

    await test.step('Verify Submitted to University card navigation', async () => {
      await dashboardPage.verifySubmittedToUniversityNavigation();
    });

    await test.step('Verify Conditional Offer Letter card navigation', async () => {
      await dashboardPage.verifyConditionalOfferLetterNavigation();
    });

    await test.step('Verify Unconditional Offer Letter card navigation', async () => {
      await dashboardPage.verifyUnconditionalOfferLetterNavigation();
    });

    await test.step('Verify Application Cancelled card navigation', async () => {
      await dashboardPage.verifyApplicationCancelledNavigation();
    });

    await test.step('Verify Registered card navigation', async () => {
      await dashboardPage.verifyRegisteredNavigation();
    });
  });

  test('Should verify first row of New Applications table', async ({ dashboardPage }) => {
    test.setTimeout(60000);

    const firstRow = await test.step('Collect first row values from New Applications table', async () => {
      const appId = await dashboardPage.getFirstRowAppId();
      const student = await dashboardPage.getFirstRowStudent();
      const university = await dashboardPage.getFirstRowUniversity();
      const consultant = await dashboardPage.getFirstRowConsultant();
      const admissionOfficer = await dashboardPage.getFirstRowAdmissionOfficer();
      const assessment = await dashboardPage.getFirstRowAssessment();
      const date = await dashboardPage.getFirstRowDate();

      return { appId, student, university, consultant, admissionOfficer, assessment, date };
    });

    await test.step('Validate first row values from New Applications table', async () => {
      console.log(`First Row Table Data:
      APP ID: ${firstRow.appId}
      Student: ${firstRow.student}
      University: ${firstRow.university}
      Consultant: ${firstRow.consultant}
      Admission Officer: ${firstRow.admissionOfficer}
      Assessment: ${firstRow.assessment}
      Date: ${firstRow.date}`);

      expect(firstRow.appId).toBeTruthy();
      expect(firstRow.student).toBeTruthy();
      expect(firstRow.university).toBeTruthy();
      expect(firstRow.consultant).toBeTruthy();
      expect(firstRow.admissionOfficer).toBeTruthy();
      expect(firstRow.assessment).toBeTruthy();
      expect(firstRow.date).toBeTruthy();
      expect(firstRow.appId.trim()).toMatch(/^APP\d+/);
    });
  });

  test('Should verify Ready to Apply count', async ({ dashboardPage }) => {
    test.setTimeout(60000);

    const readyToApply = await test.step('Get Ready to Apply count from dashboard', async () => {
      return await dashboardPage.getReadyToApplyCount();
    });

    await test.step('Validate Ready to Apply count format', async () => {
      console.log(`Ready to Apply Count: ${readyToApply}`);
      if(readyToApply === 'N/A') {
        expect(readyToApply).toBe('N/A');
        return;
      }
      // expect(readyToApply).toBeNull();
      expect(readyToApply.trim()).toMatch(/^\d*$/);
    });
  });

  test('Should verify first row of Admission Officer table', async ({ dashboardPage }) => {
    test.setTimeout(60000);

    const admOfficer = await test.step('Collect first row from Admission Officer table', async () => {
      const id = await dashboardPage.getAdmOfficerFirstRowId();
      const name = await dashboardPage.getAdmOfficerFirstRowName();
      const email = await dashboardPage.getAdmOfficerFirstRowEmail();
      const applications = await dashboardPage.getAdmOfficerFirstRowApplications();
      return { id, name, email, applications };
    });

    await test.step('Validate first row data from Admission Officer table', async () => {
      console.log(`Admission Officer First Row:
      UAPP ID: ${admOfficer.id}
      Name: ${admOfficer.name}
      Email: ${admOfficer.email}
      Applications: ${admOfficer.applications}`);

      expect(admOfficer.id.trim()).toMatch(/^ADO\d+/);
      expect(admOfficer.name).toBeTruthy();
      expect(admOfficer.email).toContain('@');
      expect(admOfficer.applications).toBeTruthy();
    });
  });

});

