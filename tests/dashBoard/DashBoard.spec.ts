import { test, expect } from "../../fixtures/baseTest";
import { Dashboard } from "../../pages/DashBoardPage";


test('dashboard Page validation' , async({page}) =>{

    const dp = new Dashboard(page);
   
    await page.goto('/home');

   const dropdownlist = await dp.expand_dropdownmenu();
   expect(dropdownlist).toEqual(['Arrays','Linked List','Stack','Queue','Tree','Graph']);

   const details = await dp.validateDashboard_DS();
   console.log(details.url);
   expect(details.heading).toContain('Data Structures-Introduction');
   
    

});


