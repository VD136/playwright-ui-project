import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const { DSALGO_USERNAME, DSALGO_PASSWORD, BASE_URL } = process.env;

test.describe('Login Functionality', () => {
  test.beforeAll(() => {
    if (!BASE_URL) {
      throw new Error(
        'BASE_URL is not set. Please set the BASE_URL environment variable to the base URL of the application under test.'
      );
    }
  });
/*
  test.beforeEach(async ({ page }) => {
    // Ensure we start from the configured baseURL for every test.
    await page.goto('/');
  });*/

  test('should successfully log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform login (pulls credentials from environment when not explicitly provided).
    await loginPage.login(DSALGO_USERNAME, DSALGO_PASSWORD);

    await expect(page).toHaveURL(/.*home/);
  });

  test('should display error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.invalidLogin('invaliduser', 'invalidpass');

    await expect(page.getByText('Invalid Username and Password')).toBeVisible();
    await expect(page).not.toHaveURL(/.*home/);
  });

  test('should display login form elements correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLogin();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
