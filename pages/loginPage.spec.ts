import {expect,type Locator,type Page,test} from '@playwright/test';
import dotenv from 'dotenv';
import { encryptData,decryptData } from '../tests/secureData.spec';



export class LoginPage {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;


    constructor(page: Page) {
    
        this.page = page;

        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator("xpath=//input[@value='Login']");
    }

    async loginIntoApplication(urlcart,username, password, encryptionKey) {

        await this.page.goto(urlcart);
        await this.emailInput.fill(username);
        const decryptPassword = decryptData(password, encryptionKey);
         await test.step('Fill password input (masked)', async () => {
                await this.passwordInput.fill(decryptPassword);
                // Optionally, attach a masked value for reporting
                await test.info().attach('Password Input (masked)', {
                    body: Buffer.from('********'),
                    contentType: 'text/plain'
                });
            });
        await this.loginButton.click();
        const title = await this.page.title();

    await this.page.screenshot({ path: 'playwright-report/login.png' });
    await test.info().attach('Login Page Screenshot', {
        body: await this.page.screenshot(),
        contentType: 'image/png'
    });
    await expect(title).toEqual('My Account');
    }
}
