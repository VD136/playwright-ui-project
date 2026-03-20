import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly getStartedLink: Locator;
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.getStartedLink = this.page.getByRole('link', { name: 'Get Started' });
    this.signInLink = this.page.getByRole('link', { name: 'Sign in' });
    this.usernameInput = this.page.getByLabel('Username');
    this.passwordInput = this.page.getByLabel('Password:');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async gotoLogin() {
    await this.page.goto('/');
    await this.getStartedLink.click();
    await this.signInLink.click();
  }

  private resolveCreds( username?: string | null,password?: string | null ): { username: string; password: string } {
    const envUsername = process.env.DSALGO_USERNAME;
    const envPassword = process.env.DSALGO_PASSWORD;

    const finalUsername = username?.trim() || envUsername;
    const finalPassword = password?.trim() || envPassword;

    if (!finalUsername || !finalPassword) {
      throw new Error(
        'Missing credentials. Provide username/password or set DSALGO_USERNAME and DSALGO_PASSWORD.'
      );
    }

    return { username: finalUsername, password: finalPassword };
  }

  async fillCredentials(username?: string | null, password?: string | null) {
    const { username: finalUsername, password: finalPassword } =
      this.resolveCreds(username, password);

    await this.usernameInput.fill(finalUsername);
    await this.passwordInput.fill(finalPassword);
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