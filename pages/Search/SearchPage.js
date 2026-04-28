const { SearchPageLocators } = require('./SearchPageLocators');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchLocators = new SearchPageLocators(page);
        this.maxStudentsToCheck = 10;
    }

    async clickAllStudentDropdown() {
        await this.searchLocators.allStudentDropdown.click({ force: true });
        await this.wait(1000);
    }

    async selectStudentAndClickApply() {
        for (let studentNumber = 1; studentNumber <= this.maxStudentsToCheck; studentNumber++) {
            console.log(`Checking student #${studentNumber}...`);

            await this.chooseStudent(studentNumber);

            const applyButtonWasClicked = await this.clickFirstEnabledApplyNowButton();
            if (applyButtonWasClicked) {
                return;
            }

            console.log('No enabled Apply button for this student. Trying next one...');
            await this.clickAllStudentDropdown();
        }

        throw new Error(`Could not find any student with an active Apply Now button after ${this.maxStudentsToCheck} attempts.`);
    }

    async chooseStudent(studentNumber) {
        await this.searchLocators.studentListOption.nth(studentNumber).dispatchEvent('click');
        await this.wait(2000);
    }

    async clickFirstEnabledApplyNowButton() {
        const applyButtons = this.page.getByRole('button', { name: 'Apply Now' });
        const buttonCount = await applyButtons.count();

        console.log(`Found ${buttonCount} 'Apply Now' buttons for this student`);

        for (let index = 0; index < buttonCount; index++) {
            const applyButton = applyButtons.nth(index);

            if (!(await applyButton.isEnabled())) {
                console.log(`Button at index ${index} is not enabled, skipping...`);
                continue;
            }

            console.log(`Success! Found an enabled Apply button at index ${index}.`);
            console.log('Clicking Apply Now...');

            await applyButton.click();
            await this.page.waitForLoadState('load');
            await this.wait(4000);

            return true;
        }

        return false;
    }

    async applycard() {
        const intakeButton = await this.findIntakeButton();
        const intakeText = await intakeButton.innerText();

        console.log('Found intake:', intakeText);

        if (await intakeButton.isEnabled()) {
            console.log('Intake button enabled - clicking');
            await intakeButton.click({ force: true });
            await this.wait(2000);
        }
    }

    async findIntakeButton() {
        console.log('Waiting for intake button to be visible...');

        try {
            await this.searchLocators.intakeButton.waitFor({ state: 'visible', timeout: 15000 });
            return this.searchLocators.intakeButton;
        } catch (error) {
            console.log('span.filter-button not found, trying generic .filter-button...');

            const fallbackIntakeButton = this.page.locator('.filter-button').first();
            await fallbackIntakeButton.waitFor({ state: 'visible', timeout: 15000 });

            return fallbackIntakeButton;
        }
    }

    async campusselect() {
        console.log('Waiting for Campus City section...');

        const dropdown = this.campusDropdown();

        try {
            await dropdown.waitFor({ state: 'visible', timeout: 10000 });
            await this.selectCampusByTyping(dropdown, 'London');
            console.log('Campus selection completed.');
        } catch (error) {
            console.log('Standard React-Select interaction failed, trying fallback click...');
            await this.selectCampusFallback(dropdown, 'London');
        }

        await this.wait(2000);
    }

    campusDropdown() {
        return this.page
            .locator('div:has-text("Campus City")')
            .locator('[class*="-control"]')
            .first();
    }

    async selectCampusByTyping(dropdown, campusName) {
        console.log('Campus dropdown found. Clicking to open...');
        await dropdown.click({ force: true });
        await this.wait(1000);

        console.log(`Typing "${campusName}" to filter options...`);
        await this.page.keyboard.type(campusName);
        await this.wait(1000);

        console.log('Pressing Enter to select...');
        await this.page.keyboard.press('Enter');
        await this.wait(1000);
    }

    async selectCampusFallback(dropdown, campusName) {
        await dropdown.click({ force: true });

        await this.page
            .locator('div[id*="-option-"]')
            .filter({ hasText: new RegExp(campusName, 'i') })
            .first()
            .click({ force: true })
            .catch(() => {});
    }

    async deliverApplication() {
        console.log('Waiting for final application screen...');

        await this.waitForApplicationForm();

        console.log('Final screen reached. Selecting options...');
        await this.wait(2000);

        await this.clickOptionIfVisible(
            this.page.getByText('Full Time (4 Years)').first(),
            'Selecting Study Mode: Full Time (4 Years)...'
        );

        await this.clickOptionIfVisible(
            this.page.getByText(/Standard|Campus/i).first(),
            'Selecting Delivery Mode...'
        );

        await this.clickOptionIfVisible(
            this.page.getByText(/Standard|Face to Face/i).first(),
            'Selecting Attendance...'
        );

        await this.clickOptionIfVisible(
            this.page.locator('label:has-text("Are you sure"), input[type="checkbox"]').first(),
            'Checking confirmation...'
        );

        await this.submitFinalApplication();
    }

    async waitForApplicationForm() {
        const finalIndicator = this.page
            .locator('button:has-text("Apply"), button:has-text("Submit"), input[type="checkbox"]')
            .first();

        await finalIndicator
            .waitFor({ state: 'visible', timeout: 20000 })
            .catch(() => console.log('Final screen indicator wait timed out'));
    }

    async clickOptionIfVisible(locator, message) {
        if (!(await locator.isVisible())) {
            return;
        }

        console.log(message);
        await locator.click({ force: true }).catch(() => locator.dispatchEvent('click'));
        await this.wait(1000);
    }

    async submitFinalApplication() {
        const applyButton = this.page.locator('button.apply-btn, button:has-text("Apply")').first();

        if (await applyButton.isEnabled()) {
            console.log('Submitting final application...');
            await applyButton.click({ force: true });
            await this.wait(3000);
        }
    }

    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }
}

module.exports = { SearchPage };
