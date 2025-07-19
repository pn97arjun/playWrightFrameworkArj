import {test, expect, Locator} from '@playwright/test';
import dotenv from 'dotenv';
import { encryptData,decryptData } from './secureData.spec';

test('Login Auto Lab', async ({page}) => {
    dotenv.config();
    await page.goto(process.env.URL2 as string);
    const emailInput:Locator=page.locator('#input-email');
    const passwordInput:Locator=page.locator('#input-password');
    const loginButton:Locator=page.locator("xpath=//input[@value='Login']");
    await emailInput.fill(process.env.USERNAMEAUTO as string);
    const decryptPassword=decryptData(process.env.PASSWORD as string, process.env.ENCRYPTION_KEY as string);
    // Fill the password input with the decrypted password, but mask it in logs
    await test.step('Fill password input (masked)', async () => {
        await passwordInput.fill(decryptPassword);
        // Optionally, attach a masked value for reporting
        await test.info().attach('Password Input (masked)', {
            body: Buffer.from('********'),
            contentType: 'text/plain'
        });
    });

    // Mask the password in the report
   // await test.info().attach('Decrypted Password (masked)', {
   //     body: Buffer.from('********'),
   //     contentType: 'text/plain'
   // });
    await loginButton.click();

    const title = await page.title();

    await page.screenshot({ path: 'playwright-report/login.png' });
    await test.info().attach('Login Page Screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png'
    });
    await expect(title).toEqual('My Account');
   

});