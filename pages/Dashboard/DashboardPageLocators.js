class DashboardPageLocators {
    constructor(page) {
        this.page = page;
        this.dashboardLink = page.locator(".std-dashboard-style1");
        this.tapprofile = page.locator(':text-is("Afsana Alam")');
        this.logoutButton = page.locator("//span[normalize-space()='Log Out']");
        this.searchAndApplyMenu = page.locator('a:has-text("Search & Apply")');
    }
}

module.exports = { DashboardPageLocators };
