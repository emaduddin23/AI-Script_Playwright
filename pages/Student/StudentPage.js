const { expect } = require('@playwright/test');
const { StudentPageLocators } = require('./StudentPageLocators');

class StudentPage {
    constructor(page) {
        this.page = page;
        this.studentLocators = new StudentPageLocators(page);
    }

    async navigateToStudentMenu() {
        console.log('Navigating to Student Menu...');
        await this.studentLocators.studentMenuLink.click();
        await this.page.waitForLoadState('load');
    }

    async addStudent(firstName, lastName, email, phone, country = 'United Kingdom') {
        console.log('Clicking Add Student button...');
        await this.studentLocators.addStudentButton.click();
        await this.page.waitForTimeout(2000);

        console.log('Filling out student details...');
        if (await this.studentLocators.firstNameInput.isVisible()) {
            await this.studentLocators.firstNameInput.fill(firstName);
        }
        if (await this.studentLocators.lastNameInput.isVisible()) {
            await this.studentLocators.lastNameInput.fill(lastName);
        }
        if (await this.studentLocators.emailInput.isVisible()) {
            await this.studentLocators.emailInput.fill(email);
        }
        if (await this.studentLocators.phoneInput.isVisible()) {
            await this.studentLocators.phoneInput.fill(phone);
        }

        // Fill Preferred Country Dropdown
        console.log('Selecting a random Country...');
        if (await this.studentLocators.countryDropdown.isVisible()) {
            await this.studentLocators.countryDropdown.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Wait for options to render
            const optionsLocator = this.page.locator('div[id*="-option-"]');

            // Wait for at least one option to be visible
            await optionsLocator.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });

            // Get count of options and pick a random one
            const count = await optionsLocator.count();
            if (count > 0) {
                const randomIndex = Math.floor(Math.random() * count);
                console.log(`Found ${count} countries, selecting index ${randomIndex}`);
                await optionsLocator.nth(randomIndex).click({ force: true });
            } else {
                console.log('No country options found after opening dropdown.');
            }
            await this.page.waitForTimeout(1000);
        } else {
            console.log('Country dropdown not visible, skipping.');
        }

        console.log('Clicking Save...');
        await this.studentLocators.saveButton.click();
        await this.page.waitForTimeout(2000);
    }

    // async searchStudent(searchTerm) {
    //     console.log(`Searching for student: ${searchTerm}`);
    //     await this.studentLocators.searchStudentInput.fill(searchTerm);
    //     await this.page.keyboard.press('Enter');
    //     await this.page.waitForTimeout(2000); // Wait for results to load
    // }

    // async verifyStudentInList(expectedName) {
    //     console.log('Verifying student in the list...');
    //     const firstRowText = await this.studentLocators.firstStudentRow.innerText();
    //     expect(firstRowText).toContain(expectedName);
    // }

    // async deleteFirstStudent() {
    //     console.log('Deleting the first student from the list...');
    //     await this.studentLocators.deleteButton.click();
    //     await this.page.waitForTimeout(1000);

    //     if (await this.studentLocators.confirmDeleteButton.isVisible()) {
    //         await this.studentLocators.confirmDeleteButton.click();
    //         await this.page.waitForTimeout(2000);
    //     }
    // }
}

module.exports = { StudentPage };
