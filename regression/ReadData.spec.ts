import {test, expect,Locator} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import dotenv from 'dotenv';
import { decryptData } from '../Utility/commonUtil';
interface TestDataRecord {
    id: string;
    username: string;
    password: string;
    // add other fields as needed based on your CSV columns
}

const records = parse(fs.readFileSync('testdata/testdata.csv'), {
    columns: true,
    skip_empty_lines: true,
}) as TestDataRecord[];

for(const recorde of records){

test(`Get Data from CSV - ${recorde.id}`, async ({page}) => {
    console.log(records);
    dotenv.config();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailInput:Locator=page.locator('#input-email');
    const passwordInput:Locator=page.locator('#input-password');
    const loginButton:Locator=page.locator("xpath=//input[@value='Login']");
    await emailInput.fill(recorde.username);
    let encryptionkey=process.env.ENCRYPTION_KEY as string;
    console.log("Encryption key",encryptionkey)
    const decryptPassword = decryptData(recorde.password, encryptionkey);
            console.log("Password: ",decryptPassword)
             await test.step('Fill password input (masked)', async () => {
                    await passwordInput.fill(decryptPassword);
                    // Optionally, attach a masked value for reporting
                    await test.info().attach('Password Input (masked)', {
                        body: Buffer.from('********'),
                        contentType: 'text/plain'
                    });
                });
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


