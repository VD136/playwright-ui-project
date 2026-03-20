import { Page } from  '@playwright/test';

export class RegisterPage{
    
    private readonly userameInput;
    private readonly passwordInput;
    private readonly passwordConfirmationInput;
    private readonly registerButton;
    
    constructor(private page: Page) {
        this.userameInput = this.page.getByRole('textbox', { name: 'Username:' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password:' });
        this.passwordConfirmationInput = this.page.getByRole('textbox', { name: 'Password confirmation:' });
        this.registerButton = this.page.getByRole('button', { name: 'Register' });

    }

    async navigateToRegistrationPage() {
        await this.page.goto('/register');
    }

    async fillUsername(username: string) {
      await this.userameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillPasswordConfirmation(password: string) {
        await this.passwordConfirmationInput.fill(password);
    }

    async clickRegister() {
        await this.registerButton.click();
    }

    async registerUser(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.fillPasswordConfirmation(password);
        await this.clickRegister();
    }

}





