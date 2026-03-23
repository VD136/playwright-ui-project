import { Locator, Page } from '@playwright/test';

export class Dashboard {
    readonly DS_link: Locator;
    readonly Time_link: Locator;
    readonly getStarted: Locator;
    readonly dropdownnMenuList: Locator;
    readonly heading_DataStructures: Locator;
    readonly heading_TimeComplexity: Locator;
    constructor(private page: Page) {
        this.DS_link = this.page.getByRole('link', { name: 'Data Structures' });
        this.Time_link = this.page.getByRole('link', { name: 'Time Complexity' });
        this.getStarted = this.page.getByRole('link', { name: 'Get Started' }).first();
        this.dropdownnMenuList = this.page.locator('.dropdown-menu a');
        this.heading_DataStructures=this.page.getByRole('heading', { name: 'Data Structures-Introduction' });
        this.heading_TimeComplexity= this.page.getByRole('paragraph').filter({ hasText: /^Time Complexity$/ });
    }

    async expand_dropdownmenu() {
        await this.DS_link.click();
    }
    getTitle(text: string) {
        return this.page.getByText(text);
    }
    async validateDashboard_DS() {
        await this.getStarted.click();
    }
    async navigateToTimeComplexity() {
        await this.getStarted.click();
        await this.Time_link.click();

    }
}
