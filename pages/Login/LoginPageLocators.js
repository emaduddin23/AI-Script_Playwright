class LoginPageLocators {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[type="email"], input[name="email"], input[autocomplete="username"]').first();
        this.passwordInput = page.locator('input[type="password"], input[name="password"], input[autocomplete="current-password"]').first();
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }
}

module.exports = { LoginPageLocators };
