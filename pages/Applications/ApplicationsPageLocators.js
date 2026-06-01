class ApplicationsPageLocators {
    constructor(page) {
        this.page = page;
        // Primary navigation/link to Applications (adjust selector if different)
        this.applicationsNav = page.locator('a:has-text("Applications")');

        // Search and filters
        this.searchInput = page.locator('input[placeholder="Search"]');
        this.filterStatus = page.locator('select[name="status"]');
        this.filterIntake = page.locator('select[name="intake"]');

        // Applications table and first-row cells
        this.applicationsTable = page.locator('table').first();
        this.firstRow = this.applicationsTable.locator('tbody tr').first();
        this.firstRowAppId = this.firstRow.locator('td').nth(0);
        this.firstRowStudent = this.firstRow.locator('td').nth(1);
        this.firstRowUniversity = this.firstRow.locator('td').nth(2);
        this.firstRowStatus = this.firstRow.locator('td').nth(3);
        this.firstRowDate = this.firstRow.locator('td').nth(4);

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