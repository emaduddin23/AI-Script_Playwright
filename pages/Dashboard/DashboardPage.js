const { expect } = require('@playwright/test');
const { DashboardPageLocators } = require('./DashboardPageLocators');


class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardLocators = new DashboardPageLocators(page);
    }

    async verifyGreeting(name) {
        // Using the profile locator to verify the greeting name
        await this.page.waitForSelector(`text=Hello, ${name}`);
    }


    async getTotalApplicationsCount() {
        await this.dashboardLocators.totalApplicationsCount.waitFor();
        const fullText = await this.dashboardLocators.totalApplicationsCount.textContent();
        const studentText = await this.getTotalStudentsCount();
        return fullText.replace(studentText, '').trim();
    }


    async getTotalStudentsCount() {
        await this.dashboardLocators.totalStudentsCount.waitFor();
        return await this.dashboardLocators.totalStudentsCount.textContent();
    }


    async getNewApplicationsCount() {
        await this.dashboardLocators.newApplicationsCount.waitFor();
        return await this.dashboardLocators.newApplicationsCount.textContent();
    }

    async getSubmittedToUniversityCount() {
        await this.dashboardLocators.submittedToUniversityCount.waitFor();
        return await this.dashboardLocators.submittedToUniversityCount.textContent();
    }

    async getConditionalOfferLetterCount() {
        await this.dashboardLocators.conditionalOfferLetterCount.waitFor();
        return await this.dashboardLocators.conditionalOfferLetterCount.textContent();
    }

    async getUnconditionalOfferLetterCount() {
        await this.dashboardLocators.unconditionalOfferLetterCount.waitFor();
        return await this.dashboardLocators.unconditionalOfferLetterCount.textContent();
    }

    async getApplicationCancelledCount() {
        await this.dashboardLocators.applicationCancelledCount.waitFor();
        return await this.dashboardLocators.applicationCancelledCount.textContent();
    }

    async getRegisteredCount() {
        await this.dashboardLocators.registeredCount.waitFor();
        return await this.dashboardLocators.registeredCount.textContent();
    }

    async getConversionRate() {
        await this.dashboardLocators.conversionRate.waitFor();
        return await this.dashboardLocators.conversionRate.textContent();
    }


    async clickTotalApplications() {
        await this.dashboardLocators.totalApplicationsCount.click();
    }

    async clickNewApplications() {
        await this.dashboardLocators.newApplicationsCount.click();
    }

    async clickSubmittedToUniversity() {
        await this.dashboardLocators.submittedToUniversityCount.click();
    }

    async clickConditionalOfferLetter() {
        await this.dashboardLocators.conditionalOfferLetterCount.click();
    }

    async clickUnconditionalOfferLetter() {
        await this.dashboardLocators.unconditionalOfferLetterCount.click();
    }

    async clickApplicationCancelled() {
        await this.dashboardLocators.applicationCancelledCount.click();
    }

    async clickRegistered() {
        await this.dashboardLocators.registeredCount.click();
    }

    async clickConversionRate() {
        await this.dashboardLocators.conversionRate.click();
    }

    async verifyTotalApplicationsNavigation() {
        console.log('Clicking Total Applications card...');
        const cardValue = await this.getTotalApplicationsCount();
        await this.clickTotalApplications();
        await expect(this.page).toHaveURL(/.*applicationsbyintake.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Total Applications - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Total Applications navigation!');
        await this.page.goBack();
    }

    async verifyNewApplicationsNavigation() {
        console.log('Clicking New Applications card...');
        const cardValue = await this.getNewApplicationsCount();
        await this.clickNewApplications();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`New Applications - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified New Applications navigation!');
        await this.page.goBack();
    }

    async verifySubmittedToUniversityNavigation() {
        console.log('Clicking Submitted to University card...');
        const cardValue = await this.getSubmittedToUniversityCount();
        await this.clickSubmittedToUniversity();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Submitted to University - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Submitted to University navigation!');
        await this.page.goBack();
    }

    async verifyConditionalOfferLetterNavigation() {
        console.log('Clicking Conditional Offer Letter card...');
        const cardValue = await this.getConditionalOfferLetterCount();
        await this.clickConditionalOfferLetter();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Conditional Offer Letter - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Conditional Offer Letter navigation!');
        await this.page.goBack();
    }

    async verifyUnconditionalOfferLetterNavigation() {
        console.log('Clicking Unconditional Offer Letter card...');
        const cardValue = await this.getUnconditionalOfferLetterCount();
        await this.clickUnconditionalOfferLetter();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Unconditional Offer Letter - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Unconditional Offer Letter navigation!');
        await this.page.goBack();
    }

    async verifyApplicationCancelledNavigation() {
        console.log('Clicking Application Cancelled card...');
        const cardValue = await this.getApplicationCancelledCount();
        await this.clickApplicationCancelled();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Application Cancelled - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Application Cancelled navigation!');
        await this.page.goBack();
    }

    async verifyRegisteredNavigation() {
        console.log('Clicking Registered card...');
        const cardValue = await this.getRegisteredCount();
        await this.clickRegistered();
        await expect(this.page).toHaveURL(/.*applications.*/);
        await expect(this.page.locator('text=/Total \\d+ items/').first()).toContainText(`Total ${cardValue} items`);
        console.log(`Registered - Card: ${cardValue}, Verified on page.`);
        console.log('Successfully verified Registered navigation!');
        await this.page.goBack();
    }

    async getFirstRowAppId() {

        await this.dashboardLocators.firstRowAppId.waitFor();
        return await this.dashboardLocators.firstRowAppId.textContent();
    }

    async getFirstRowStudent() {
        await this.dashboardLocators.firstRowStudent.waitFor();
        return await this.dashboardLocators.firstRowStudent.textContent();
    }

    async getFirstRowUniversity() {
        await this.dashboardLocators.firstRowUniversity.waitFor();
        return await this.dashboardLocators.firstRowUniversity.textContent();
    }

    async getFirstRowConsultant() {
        await this.dashboardLocators.firstRowConsultant.waitFor();
        return await this.dashboardLocators.firstRowConsultant.textContent();
    }

    async getFirstRowAdmissionOfficer() {
        await this.dashboardLocators.firstRowAdmissionOfficer.waitFor();
        return await this.dashboardLocators.firstRowAdmissionOfficer.textContent();
    }

    async getFirstRowAssessment() {
        await this.dashboardLocators.firstRowAssessment.waitFor();
        return await this.dashboardLocators.firstRowAssessment.textContent();
    }

    async getFirstRowDate() {
        await this.dashboardLocators.firstRowDate.waitFor();
        return await this.dashboardLocators.firstRowDate.textContent();
    }

    // Ready to Apply Section
    async getReadyToApplyCount() {
        await this.dashboardLocators.readyToApplyCount.waitFor();
        return await this.dashboardLocators.readyToApplyCount.textContent();
    }

    // Admission Officer Table
    async getAdmOfficerFirstRowId() {
        await this.dashboardLocators.admOfficerFirstRowId.waitFor();
        return await this.dashboardLocators.admOfficerFirstRowId.textContent();
    }

    async getAdmOfficerFirstRowName() {
        await this.dashboardLocators.admOfficerFirstRowName.waitFor();
        return await this.dashboardLocators.admOfficerFirstRowName.textContent();
    }

    async getAdmOfficerFirstRowEmail() {
        await this.dashboardLocators.admOfficerFirstRowEmail.waitFor();
        return await this.dashboardLocators.admOfficerFirstRowEmail.textContent();
    }

    async getAdmOfficerFirstRowApplications() {
        await this.dashboardLocators.admOfficerFirstRowApplications.waitFor();
        return await this.dashboardLocators.admOfficerFirstRowApplications.textContent();
    }
}






module.exports = { DashboardPage };
