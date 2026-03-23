import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly getStartedLink: Locator;
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.getStartedLink = this.page.getByRole('link', { name: 'Get Started' });
    this.signInLink = this.page.getByRole('link', { name: 'Sign in' });
    this.usernameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async gotoLogin() {
    await this.page.goto('/');
    await this.getStartedLink.click();
    await this.signInLink.click();
  }

  private resolveCreds( username?: string | null,password?: string | null ): { username: string; password: string } {
    const envUsername = process.env.DSALGO_USERNAME ?? '';
    const envPassword = process.env.DSALGO_PASSWORD ?? '';

return {
  username: username !== undefined && username !== null ? username : envUsername,
  password: password !== undefined && password !== null ? password : envPassword
};
  }

  

  async fillCredentials(username?: string | null, password?: string | null) {
    const { username: envUsername, password: envPassword } =
      this.resolveCreds(username, password);

    await this.usernameInput.fill(envUsername);
    await this.passwordInput.fill(envPassword);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(username?: string | null, password?: string | null) {
    await this.gotoLogin();
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async invalidLogin(username?: string | null, password?: string | null) {
    await this.login(username, password);
   
    
  }
}

