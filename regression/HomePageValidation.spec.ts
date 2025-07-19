import {test,expect,Locator} from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { HomePage } from '../pages/homePage.spec';
import dotenv from 'dotenv';
test.beforeEach(async ({ page }) => {
     dotenv.config();
    const loginPage = new LoginPage(page);
    
    console.log('Username:', process.env.USERNAMEAUTO)
    console.log('Password:', process.env.PASSWORD)
    console.log('Encryption Key:', process.env.ENCRYPTION_KEY)

    // : Login into the application
    await loginPage.loginIntoApplication(
        process .env.URL2 as string,
        process.env.USERNAMEAUTO as string,
        process.env.PASSWORD as string,
        process.env.ENCRYPTION_KEY as string
    );
});
import { encryptData,decryptData } from '../tests/secureData.spec';
test('Login and validate home page links', async ({page}) => {
   dotenv.config();
   const loginPage = new LoginPage(page);
   const homePage = new HomePage(page);

    // Step 1: Validate left links on the home page
    await homePage.validateLeftLinks();

   
});
test('Search and verify results', async ({page}) => {
      
    const homePage = new HomePage(page);

    // Step 1: Perform search
    await homePage.performSearch(process.env.TEXT2 as string);

    // Step 2: Verify search results
    await homePage.verifySearchResults();
});

