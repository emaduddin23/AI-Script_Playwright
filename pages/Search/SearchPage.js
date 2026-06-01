const { expect } = require('@playwright/test');
const { SearchPageLocators } = require('./SearchPageLocators');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchLocators = new SearchPageLocators(page);
    }

    async goto() {
        if (await this.page.locator('a:has-text("Search & Apply")').count() > 0) {
            await this.page.locator('a:has-text("Search & Apply")').click();
        } else {
            await this.page.goto('https://portal-test.uapp.uk/search-and-apply');
        }
    }

    async clickAllStudentDropdown() {
        await this.searchLocators.allStudentDropdown.click({ force: true });
        await this.page.waitForTimeout(1000);
    }

    async selectStudentAndClickApply() {
        for (let i = 1; i <= 10; i++) {
            console.log(`Checking student #${i}...`);

            // Pick student number 'i'
            await this.searchLocators.studentListOption.nth(i).dispatchEvent('click');
            await this.page.waitForTimeout(2000);

            // Smart Apply Now detection logic (integrating user approach)
            const applyButtons = this.page.getByRole('button', { name: 'Apply Now' });
            const buttonCount = await applyButtons.count();
            console.log(`Found ${buttonCount} 'Apply Now' buttons for this student`);

            for (let j = 0; j < buttonCount; j++) {
                const btn = applyButtons.nth(j);
                if (await btn.isEnabled()) {
                    console.log(`Success! Found an enabled Apply button at index ${j}.`);
                    console.log('Clicking Apply Now...');
                    await btn.click();
                    await this.page.waitForLoadState('load');
                    console.log('Apply Now clicked. Waiting for modal content...');
                    await this.page.waitForTimeout(4000);
                    return true;
                } else {
                    console.log(`Button at index ${j} is not enabled, skipping...`);
                }
            }

            console.log("No enabled Apply button for this student. Trying next one...");
            await this.searchLocators.allStudentDropdown.click({ force: true });
            await this.page.waitForTimeout(1000);
        }
        console.log("Could not find any student with an active Apply Now button after 10 attempts.");
        return false;
    }


    async applycard() {
        let firstIntake = this.searchLocators.intakeButton;
        console.log('Waiting for intake button to be visible...');

        try {
            await firstIntake.waitFor({ state: 'visible', timeout: 15000 });
        } catch (e) {
            console.log('span.filter-button not found, trying generic .filter-button...');
            firstIntake = this.page.locator('.filter-button').first();
            await firstIntake.waitFor({ state: 'visible', timeout: 15000 });
        }

        const intakeText = await firstIntake.innerText();
        console.log('Found intake:', intakeText);

        if (await firstIntake.isEnabled()) {
            console.log('Intake button enabled â€” clicking (forced)');
            await firstIntake.click({ force: true });
            console.log('clicked intake button');
            await this.page.waitForTimeout(2000);
        }
    }

    async campusselect() {
        console.log('Waiting for Campus City section...');

        // Target the specific React-Select control under the Campus City label
        const dropdown = this.page.locator('div:has-text("Campus City")').locator('[class*="-control"]').first();

        try {
            await dropdown.waitFor({ state: 'visible', timeout: 10000 });
            console.log('Campus dropdown found. Clicking to open...');
            await dropdown.click({ force: true });
            await this.page.waitForTimeout(1000);

            console.log('Typing "London" to filter options...');
            await this.page.keyboard.type('London');
            await this.page.waitForTimeout(1000);

            console.log('Pressing Enter to select...');
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(1000);

            console.log('Campus selection completed.');
        } catch (e) {
            console.log('Standard React-Select interaction failed, trying fallback click...');
            await dropdown.click({ force: true });
            await this.page.locator('div[id*="-option-"]').filter({ hasText: /London/i }).first().click({ force: true }).catch(() => { });
        }

        await this.page.waitForTimeout(2000);
    }

    async deliverApplication() {
        console.log('Waiting for final application screen...');

        // Wait for ANY proceed button or checkbox to signify the modal is ready
        const finalIndicator = this.page.locator('button:has-text("Apply"), button:has-text("Submit"), input[type="checkbox"]').first();
        await finalIndicator.waitFor({ state: 'visible', timeout: 20000 }).catch(() => console.log('Final screen indicator wait timed out'));

        console.log('Final screen reached. Selecting options...');
        await this.page.waitForTimeout(2000);

        // 1. Study Mode - Click the visible text label
        const studyMode = this.page.getByText('Full Time (4 Years)').first();
        if (await studyMode.isVisible()) {
            console.log('Selecting Study Mode: Full Time (4 Years)...');
            await studyMode.click({ force: true }).catch(() => studyMode.dispatchEvent('click'));
            await this.page.waitForTimeout(1000);
        }

        // 2. Delivery Mode - Click by text label
        const deliveryMode = this.page.getByText(/Standard|Campus/i).first();
        if (await deliveryMode.isVisible()) {
            console.log('Selecting Delivery Mode...');
            await deliveryMode.click({ force: true }).catch(() => deliveryMode.dispatchEvent('click'));
            await this.page.waitForTimeout(1000);
        }

        // 3. Attendance - Click by text label
        const attendance = this.page.getByText(/Standard|Face to Face/i).first();
        if (await attendance.isVisible()) {
            console.log('Selecting Attendance...');
            await attendance.click({ force: true }).catch(() => attendance.dispatchEvent('click'));
            await this.page.waitForTimeout(1000);
        }

        // 4. Confirm Checkbox
        const confirm = this.page.locator('label:has-text("Are you sure"), input[type="checkbox"]').first();
        if (await confirm.isVisible()) {
            console.log('Checking confirmation...');
            await confirm.click({ force: true }).catch(() => confirm.dispatchEvent('click'));
        }

        // 5. Final Apply
        const applyBtn = this.page.locator('button.apply-btn, button:has-text("Apply")').first();
        if (await applyBtn.isEnabled()) {
            console.log('Submitting final application...');
            await applyBtn.click({ force: true });
            await this.page.waitForTimeout(3000);
        }
    }
}

module.exports = { SearchPage };
