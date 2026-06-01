class ApplicationsPageLocators {
    constructor(page) {
        this.page = page;
        this.applicationsNav = page.locator('a[href="/applications"]');

        // Search and filters
        this.moreFiltersButton = page.locator('button:has-text("More Filters"), button:has-text("More Filter"), [class*="filter"]').first();
        this.searchInput = page.locator('input[placeholder*="Application Name" i], input[placeholder*="Name" i], input[placeholder*="Search" i], input[type="text"]').first();
        this.filterStatus = page.locator('select[name="status"]');
        this.filterIntake = page.locator('select[name="intake"]');

        // Applications table and first-row cells
        this.applicationsTable = page.locator('table').first();
        this.firstRow = this.applicationsTable.locator('tbody tr').first();
        this.firstRowAppId = this.firstRow.locator('td').nth(0);
        this.firstRowStudent = this.firstRow.locator('td').nth(1);
        this.firstRowUniversity = this.firstRow.locator('td').nth(2);
        this.firstRowStatus = this.firstRow.locator('td').nth(12);
        this.firstRowDate = this.firstRow.locator('td').nth(11);

        // Table-level helpers
        this.totalItemsText = page.locator('text=/Total \\d+ items/').first();
        this.nextPage = page.locator('button[aria-label="Next"]');
        this.prevPage = page.locator('button[aria-label="Previous"]');
        this.pageSize = page.locator('select.page-size');

        // Bulk actions
        this.bulkSelectAll = page.locator('thead input[type="checkbox"]');
        this.bulkActionButton = page.locator('button:has-text("Bulk")');
    }
}

module.exports = { ApplicationsPageLocators };