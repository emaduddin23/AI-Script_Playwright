class LoginPageLocators {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'name@email.com' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }
}

module.exports = { LoginPageLocators };
