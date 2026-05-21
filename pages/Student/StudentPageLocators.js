class StudentPageLocators {
    constructor(page) {
        this.page = page;

        // Student Menu Link (from the sidebar)
        this.studentMenuLink = page.locator('a.sidemenu:has-text("Student")').first();

        // Add Student Button
        this.addStudentButton = page.locator('button:has-text("Add Student")');
        
        // Add Student Form Locators (These might need adjustment based on the actual form/modal)
        this.firstNameInput = page.locator('input[name="firstName"], input[placeholder*="First Name"]');
        this.lastNameInput = page.locator('input[name="lastName"], input[placeholder*="Last Name"]');
        this.emailInput = page.locator('input[name="email"], input[placeholder*="Email"]');
        this.phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"]');
        
        // Dropdowns
        this.countryDropdown = page.locator('text="Select Preferred Country"').first();

        this.saveButton = page.locator('button:has-text("Create Student")');

        // Student List / Grid Locators
        this.searchStudentInput = page.locator('input[placeholder*="UAPP ID, Name, Email"]');
        this.studentTable = page.locator('table#table-to-xls');
        this.firstStudentRow = this.studentTable.locator('tbody tr').first();
        
        // Actions
        this.editButton = page.locator('button[aria-label="Edit"], a[title="Edit"]').first();
        this.deleteButton = page.locator('button[aria-label="Delete"], a[title="Delete"]').first();
        this.confirmDeleteButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")');
    }
}

module.exports = { StudentPageLocators };
