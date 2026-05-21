class MyProfilePageLocators {
    constructor(page) {
        this.page = page;

        // Page Header
        this.pageTitle = page.locator('h5.page-header-left-title', { hasText: 'Profile' });

        // Profile Info
        this.userName = page.locator('h4', { hasText: 'Afsana Alam' });
        this.admissionManagerDetails = page.locator('h5.mb-4', { hasText: 'Admission Manager Details' });

        // Sections
        this.uappSection = page.locator('h5', { hasText: 'UAPP' });
        this.assignedAdmissionOfficerSection = page.locator('h5', { hasText: 'Assigned Admission Officer' }).first();

        // Assigned Admission Officer Names (p tag after each h5)
        this.assignedOfficerNames = page.locator('div.d-flex.justify-between-start p');

        // Tabs / Buttons
        this.applicationsTab = page.locator('button.consultant-profile-redesign-style', { hasText: 'Applications' });
        this.officersTab = page.locator('button.consultant-profile-redesign-style', { hasText: 'Officers' });

        // Officers Table Data
        this.officersTable = page.locator('table#table-to-xls, table.table').last();
        this.officersFirstRow = this.officersTable.locator('tbody tr').first();
    }
}

module.exports = { MyProfilePageLocators };
