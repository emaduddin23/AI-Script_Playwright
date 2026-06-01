const { expect } = require('@playwright/test');
const { ApplicationsPageLocators } = require('./ApplicationsPageLocators');

class ApplicationsPage {
    constructor(page) {
        this.page = page;
        this.locators = new ApplicationsPageLocators(page);
    }

    async goto() {
        // prefer clicking nav so auth redirects are handled; fallback to direct URL if needed
        if (await this.locators.applicationsNav.count() > 0) {
            await this.locators.applicationsNav.click();
        } else {
            await this.page.goto('https://portal-test.uapp.uk/applications');
        }
    }

    async search(term) {
        if (await this.locators.moreFiltersButton.count() > 0) {
            await this.locators.moreFiltersButton.click();
            await this.page.waitForTimeout(1000); // wait for filters panel to expand
        }
        await this.locators.searchInput.fill(term);
        await this.locators.searchInput.press('Enter');
    }

    async filterByStatus(status) {
        await this.locators.filterStatus.selectOption({ label: status });
    }

    async getTotalItemsText() {
        await this.locators.totalItemsText.waitFor();
        return await this.locators.totalItemsText.textContent();
    }

    async openFirstApplication() {
        await this.locators.firstRowAppId.waitFor();
        await this.locators.firstRowAppId.click();
    }

    async getFirstRowAppId() {
        await this.locators.firstRowAppId.waitFor();
        return await this.locators.firstRowAppId.textContent();
    }

    async getFirstRowStudent() {
        await this.locators.firstRowStudent.waitFor();
        return await this.locators.firstRowStudent.textContent();
    }

    async getFirstRowUniversity() {
        await this.locators.firstRowUniversity.waitFor();
        return await this.locators.firstRowUniversity.textContent();
    }

    async getFirstRowStatus() {
        await this.locators.firstRowStatus.waitFor();
        return await this.locators.firstRowStatus.textContent();
    }

    async getFirstRowDate() {
        await this.locators.firstRowDate.waitFor();
        return await this.locators.firstRowDate.textContent();
    }

    // `getFirstRowSummary` removed — use individual getters: getFirstRowAppId(), getFirstRowStudent(), etc.

    async goToNextPage() {
        await this.locators.nextPage.click();
    }
}

module.exports = { ApplicationsPage };