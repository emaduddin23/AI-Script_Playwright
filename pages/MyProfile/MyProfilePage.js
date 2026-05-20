const { expect } = require('@playwright/test');
const { MyProfilePageLocators } = require('./MyProfilePageLocators');

class MyProfilePage {
    constructor(page) {
        this.page = page;
        this.profileLocators = new MyProfilePageLocators(page);
    }

    async navigateToMyProfile() {
        await this.page.click('a:has-text("My Profile")');
        await this.page.waitForURL('**/profile**');
        await this.page.waitForTimeout(2000);
    }

    async verifyPageTitle() {
        await this.profileLocators.pageTitle.waitFor();
        return await this.profileLocators.pageTitle.textContent();
    }

    async verifyUserName() {
        await this.profileLocators.userName.waitFor();
        return await this.profileLocators.userName.textContent();
    }

    async verifyAdmissionManagerDetailsSection() {
        await this.profileLocators.admissionManagerDetails.waitFor();
        return await this.profileLocators.admissionManagerDetails.textContent();
    }

    async verifyUappSection() {
        await this.profileLocators.uappSection.waitFor();
        return await this.profileLocators.uappSection.textContent();
    }

    async verifyAssignedAdmissionOfficerSection() {
        await this.profileLocators.assignedAdmissionOfficerSection.waitFor();
        return await this.profileLocators.assignedAdmissionOfficerSection.textContent();
    }

    async getAssignedOfficerNames() {
        await this.profileLocators.assignedOfficerNames.first().waitFor();
        return await this.profileLocators.assignedOfficerNames.allInnerTexts();
    }

    async clickApplicationsTab() {
        await this.profileLocators.applicationsTab.click();
        await this.page.waitForTimeout(2000);
    }

    async clickOfficersTab() {
        await this.profileLocators.officersTab.click();
        await this.page.waitForTimeout(2000);
    }

    async getOfficerFirstRowData() {
        await this.profileLocators.officersFirstRow.waitFor({ state: 'visible' });
        
        // Grab text from first two columns: UAPP ID and Name
        const uappId = await this.profileLocators.officersFirstRow.locator('td').nth(0).textContent();
        const name = await this.profileLocators.officersFirstRow.locator('td').nth(1).textContent();
        
        return { 
            uappId: uappId.trim(), 
            name: name.trim() 
        };
    }
}

module.exports = { MyProfilePage };
