const { LoginPageLocators } = require('./LoginPageLocators');

class LoginPage {
  constructor(page) {
    this.page = page;
    // Initialize the locators class
    this.loginLocators = new LoginPageLocators(page);
  }

  async goto() {
    await this.page.goto('http://portal-test.uapp.uk/');
  }

  async enterEmailAndContinue(email) {
    await this.loginLocators.emailInput.fill(email);
  }

  async enterPasswordAndLogin(password) {
    await this.loginLocators.passwordInput.fill(password);
    await this.loginLocators.loginButton.click();
    // Wait for the login to finish and the dashboard to load
    await this.page.waitForTimeout(3000); 
  }
}

module.exports = { LoginPage };
