class DashboardPageLocators {
    constructor(page) {
        this.page = page;
        this.dashboardLink = page.locator(".std-dashboard-style1");
        this.tapprofile = page.locator(':text-is("Afsana Alam")');
        this.logoutButton = page.locator("//span[normalize-space()='Log Out']");
        this.searchAndApplyMenu = page.locator('a:has-text("Search & Apply")');
        
        // Dashboard Statistics Cards
        this.totalApplicationsCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Total Application$/i }) }).locator('p.dashboard-count-value');
        this.totalStudentsCount = this.totalApplicationsCount.locator('span');
        this.newApplicationsCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^New Application$/i }) }).locator('p.dashboard-count-value');

        this.submittedToUniversityCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Submitted to University$/i }) }).locator('p.dashboard-count-value');
        this.conditionalOfferLetterCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Conditional Offer Letter$/i }) }).locator('p.dashboard-count-value');
        this.unconditionalOfferLetterCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Unconditional Offer Letter$/i }) }).locator('p.dashboard-count-value');
        this.applicationCancelledCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Application Cancelled$/i }) }).locator('p.dashboard-count-value');
        this.registeredCount = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Registered$/i }) }).locator('p.dashboard-count-value');
        this.conversionRate = page.locator('div.dashboard-count-card').filter({ has: page.locator('p.dashboard-count-title', { hasText: /^Conversion Rate$/i }) }).locator('p.dashboard-count-value');
    }
}

module.exports = { DashboardPageLocators };




