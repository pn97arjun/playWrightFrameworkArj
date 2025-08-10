import {test,expect,Locator} from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { HomePage } from '../pages/homePage.spec';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
test.beforeEach(async ({ page }) => {
     

    // : Login into the application
    
});
// Read and parse the CSV data
const csvData = readFileSync('testdata/testdata.csv', 'utf8');
interface TestRecord {
  id: string;
  username: string;
  password: string;
  encryption_key: string;
  partname: string;
  description: string;
  // add other fields as needed
}

const records: TestRecord[] = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Assuming you want to run a specific test_id, e.g., '123'
const specificTestId = 'TC23451';
const TC23451 = records.find(record => record.id === specificTestId);
import { encryptData,decryptData } from '../tests/secureData.spec';
 if (TC23451) {
test(`Login and validate links}`, async ({page}) => {
   console.log(TC23451.partname)
   const loginPage = new LoginPage(page);
   const homePage = new HomePage(page);

   //step 1: login into application
    dotenv.config();
    console.log('Username:', TC23451.username)
    //console.log('Password:', TC23451.password) 
    await loginPage.loginIntoApplication(
        process .env.URL2 as string,
        TC23451.username,
        TC23451.password,
        process.env.ENCRYPTION_KEY as string
    );
    // Step 2: Validate left links on the home page
    await homePage.validateLeftLinks();

   
});
 }
 else
 {
    test.skip('test data not found', async () => {});
 }

const specificTestId2 = 'TC12345';
const TC12345 = records.find(record => record.id === specificTestId2);

if (TC12345) {
test(`${TC12345.id} ${TC12345.description}`, async ({page}) => {
    const loginPage = new LoginPage(page);  
    const homePage = new HomePage(page);
    //step 1: login into application
    dotenv.config();
    console.log('Username:', TC12345.username)
    //console.log('Password:', TC12345.password)
    await loginPage.loginIntoApplication(
        process .env.URL2 as string,
        TC12345.username,
        TC12345.password,
        process.env.ENCRYPTION_KEY as string
    );
    // Step 1: Perform search
    await homePage.performSearch(TC12345.partname);

    // Step 2: Verify search results
    await homePage.verifySearchResults();
});

}
else{
    test.skip('test data not found', async () => {});
}