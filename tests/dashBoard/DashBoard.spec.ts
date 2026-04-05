import { test, expect } from "../../fixtures/baseTest";
import { Dashboard } from "../../pages/DashBoardPage";


test.describe('Dashboard Functionality', () => {
    let dp: Dashboard;

    test.beforeEach(async ({ page }) => {
        dp = new Dashboard(page);
        await page.goto('/home');
    });

    test('dashboard Page validation', async ({ page }) => {

        await dp.expand_dropdownmenu();
        await page.pause();
        await expect(dp.dropdownnMenuList).toHaveText(['Arrays', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph']);
        await dp.validateDashboard_DS();
        await expect(page).toHaveURL(/.*data-structures/);
       await expect(dp.heading_DataStructures).toHaveText('Data Structures-Introduction');

    });

    test('Time Complexity Page validation', async ({ page }) => {

        await dp.navigateToTimeComplexity();
        await expect(page).toHaveURL(/.*time-complexity/);
        await expect(dp.heading_TimeComplexity).toHaveText('Time Complexity');
    });
});