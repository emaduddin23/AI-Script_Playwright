class SearchPageLocators {
    constructor(page) {
        this.page = page;
        this.allStudentDropdown = page.locator('[role="combobox"]').first();
        this.applyNowButton = page.locator('button:has-text("Apply Now"), a:has-text("Apply Now")');
        this.studentListOption = page.locator('li, [role="option"], .ant-select-item, .MuiMenuItem-root, [class*="option"]');
        
        // Modal Locators
        this.intakeButton = page.locator('span.filter-button').first();
        this.campusCityText = page.getByText('Campus City');
        this.campusDropdown = page.locator('[class*="-control"], .ant-select-selector').first();
        this.londonOption = page.getByRole('option', { name: 'London' }).or(page.locator('text=London').first());
        this.studyModeText = page.getByText('Study Mode');
        this.studyModeRadio = page.locator('input[type="radio"]').first();
        this.deliveryModeRadio = page.locator('input[name="deliveryPattern"]').first();
        this.attendanceRadio = page.locator('input[name="deliverySchedule"]').first();
        this.confirmCheckbox = page.locator('input[type="checkbox"], .ant-checkbox-input').first();
        this.finalApplyButton = page.locator('button.apply-btn, button:has-text("Apply"), button:has-text("Submit")').first();
        this.errorToast = page.locator('.Toastify__toast--error');
        this.closeToastButton = page.locator("path[d='M18 6L6 18M6 6L18 18']");
        this.cancelButton = page.getByRole('button', { name: 'Cancel'});
    }
}

module.exports = { SearchPageLocators };
