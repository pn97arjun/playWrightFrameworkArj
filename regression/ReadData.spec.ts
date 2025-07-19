import {test, expect,Locator} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

interface TestDataRecord {
    id: string;
    username: string;
    // add other fields as needed based on your CSV columns
}

const records = parse(fs.readFileSync('testdata/testdata.csv'), {
    columns: true,
    skip_empty_lines: true,
}) as TestDataRecord[];

for(const recorde of records){

test(`Get Data from CSV - ${recorde.id}`, async ({page}) => {
    console.log(records);
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailInput:Locator=page.locator('#input-email');
    const passwordInput:Locator=page.locator('#input-password');
    const loginButton:Locator=page.locator("xpath=//input[@value='Login']");
    await emailInput.fill(recorde.username);
    await passwordInput.fill('Auto@12345');
    await loginButton.click();

    const title = await page.title();

    await page.screenshot({ path: 'playwright-report/login.png' });
    await test.info().attach('Login Page Screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png'


    });
    await expect(title).toEqual('My Account');
});

};


