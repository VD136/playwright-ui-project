import { Page } from '@playwright/test';

export class Dashboard {

    constructor(private page: Page) { }

    async expand_dropdownmenu() : Promise<String[]> {

        await this.page.getByRole('link', { name: 'Data Structures' }).click();
        const dropdownnMenuList = this.page.locator('.dropdown-menu a');
        const textList = await dropdownnMenuList.allTextContents();
        console.log(textList);
        return textList;

    }

    async validateDashboard_DS() : Promise<{heading : String | null; url : String}>{

        await this.page.getByRole('link', { name: 'Get Started' }).first().click();
        
      const heading = await this.page.getByRole('heading', { name: 'Data Structures-Introduction' }).textContent();
      const url = this.page.url();
      return {heading , url};
    }
   
}
