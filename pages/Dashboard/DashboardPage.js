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

    async navigateToSearchAndApply() {
        await this.dashboardLocators.searchAndApplyMenu.click();
    }
}

module.exports = { DashboardPage };
