import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegistrationPage";

test.describe('User Registration Tests', () => {

    let register: RegisterPage;
    let uniqueUser: string;
    const password = process.env.REGISTRATION_PASSWORD!;

    test.beforeEach(async ({ page }) => {
        register = new RegisterPage(page);
        await register.navigateToRegistrationPage();
        await expect(page).toHaveURL(/.*register/);
        
    });
test('should register a new user successfully', async ({ page }) => {

    uniqueUser = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
   await  register.registerUser(uniqueUser, password);
    //assertions 
    await expect(page.getByRole('alert')).toContainText('New Account Created. You are');

});

test('should show error for existing username', async ({ page }) => {

    await register.registerUser(process.env.EXISTING_USERNAME!, password);
    await expect(page.getByRole('alert')).toContainText('password_mismatch:The two password fields didn’t match.');

});
});

