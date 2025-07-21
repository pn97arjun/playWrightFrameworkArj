import {test,expect,Locator} from '@playwright/test'


test('Aria Role Locator test',async({page})=>{
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register')

    await expect(page.getByRole('heading',{ name:'Register Account'})).toBeVisible()

    await expect(page.getByRole('link',{ name:'Forgotten Password'})).toBeVisible()

     await expect(page.getByRole('radio',{ name:'Yes'})).toBeVisible()

     await expect(page.getByRole('checkbox')).toBeVisible()
        await page.getByRole('checkbox').click()

     await expect(page.getByRole('button',{ name:'Continue'})).toBeVisible()
   await page.getByRole('button',{ name:'Continue'}).click()
   

});