class LoginPageLocators {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('name@email.com');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }
}

module.exports = { LoginPageLocators };
