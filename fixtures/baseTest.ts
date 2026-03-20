import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend({
  page: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.login();
    await use(page);
  }
});

export { expect } from '@playwright/test';