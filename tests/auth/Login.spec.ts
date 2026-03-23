import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const DSALGO_USERNAME = process.env.DSALGO_USERNAME!;
const DSALGO_PASSWORD = process.env.DSALGO_PASSWORD!;
const BASE_URL = process.env.BASE_URL!;

test.describe('Login Functionality', () => {

  let loginPage: LoginPage;
  test.beforeAll(() => {
    if (!BASE_URL) throw new Error('BASE_URL is not set');
    if (!DSALGO_USERNAME) throw new Error('DSALGO_USERNAME is not set');
    if (!DSALGO_PASSWORD) throw new Error('DSALGO_PASSWORD is not set');

  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

  });

  test('should successfully log in with valid credentials', async ({ page }) => {

    // Perform login (pulls credentials from environment when not explicitly provided).
    await loginPage.login(DSALGO_USERNAME, DSALGO_PASSWORD);
    await expect(page).toHaveURL(/.*home/);
  });

  test('should display error message for invalid credentials', async ({ page }) => {

    await loginPage.invalidLogin('invaliduser', 'invalidpass');
    await expect(page.getByText('Invalid Username and Password')).toBeVisible();
    await expect(page).not.toHaveURL(/.*home/);
  });

  test('should display login form elements correctly', async ({ page }) => {

    await loginPage.gotoLogin();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should display error for correct username wrong password', async ({ page }) => {
    await loginPage.invalidLogin(DSALGO_USERNAME, 'wrongpassword123');
    await expect(page.getByText('Invalid Username and Password')).toBeVisible();
    await expect(page).not.toHaveURL(/.*home/);
  });

  test('should display error for wrong username correct password', async ({ page }) => {
    await loginPage.invalidLogin('wronguser123', DSALGO_PASSWORD);
    await expect(page.getByText('Invalid Username and Password')).toBeVisible();
    await expect(page).not.toHaveURL(/.*home/);
  });

  // Empty Fields validation
  test('should display error when both fields are empty', async ({ page }) => {
    await loginPage.gotoLogin();
    await loginPage.fillCredentials('', '');
    await loginPage.submit();
    // should stay on login page
    await expect(page).not.toHaveURL(/.*home/);
  });
  test('should display error when username is empty', async ({ page }) => {
    await loginPage.gotoLogin();
    await loginPage.fillCredentials('', DSALGO_PASSWORD);
    await loginPage.submit();
    await expect(page).not.toHaveURL(/.*home/);
    //browser native validation message.
    const usernameValidationMessage = await loginPage.usernameInput.evaluate((input: HTMLInputElement) => input.validationMessage);
     expect(
  usernameValidationMessage.toLowerCase().includes("fill out this field")
).toBeTruthy();
  });

  test('should display error when password is empty', async ({ page }) => {
    await loginPage.gotoLogin();
    await loginPage.fillCredentials(DSALGO_USERNAME, '');
    await loginPage.submit();
    await expect(page).not.toHaveURL(/.*home/);
    const passwordValidationMessage = await loginPage.passwordInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    expect(
  passwordValidationMessage.toLowerCase().includes("fill out this field")
).toBeTruthy();
  });

  test('should have correct page title', async ({ page }) => {
    await loginPage.gotoLogin();
    await expect(page).toHaveTitle(/.*login.*/i);
  });
  test('should mask password field', async ({ page }) => {
    await loginPage.gotoLogin();
    // password field should be type=password not type=text
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
  test('should have Get Started link on home page', async ({ page }) => {
    await page.goto('/');
    await expect(loginPage.getStartedLink).toBeVisible();
  });

  test('should have Sign in link after Get Started', async ({ page }) => {
    await page.goto('/');
    await loginPage.getStartedLink.click();
    await expect(loginPage.signInLink).toBeVisible();
  });

  test('should navigate to login page via Get Started and Sign in', async ({ page }) => {
    await loginPage.gotoLogin();
    await expect(page).toHaveURL(/.*login/);
  });
  test('should stay on login page after failed login', async ({ page }) => {
    await loginPage.invalidLogin('baduser', 'badpass');
    await expect(page).toHaveURL(/.*login/);
  });
  test('should show username on dashboard after login', async ({ page }) => {
    await loginPage.login(DSALGO_USERNAME, DSALGO_PASSWORD);
    await expect(page).toHaveURL(/.*home/);
    // verify logged in username is visible on page
    await expect(page.getByText(DSALGO_USERNAME)).toBeVisible();
  });
});
