import {test,expect,Locator} from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { HomePage } from '../pages/homePage.spec';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
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
// Read and parse the CSV data
const csvData = readFileSync('testdata/testdata.csv', 'utf8');
interface TestRecord {
  id: string;
  username: string;
  partname: string;
  description: string;
  // add other fields as needed
}

const records: TestRecord[] = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Assuming you want to run a specific test_id, e.g., '123'
let specificTestId = 'TC23451';
let TC23451 = records.find(record => record.id === specificTestId);
import { encryptData,decryptData } from '../tests/secureData.spec';
 if (TC23451) {
test(`${TC23451.id} ${TC23451.description}`, async ({page}) => {
   console.log(TC23451.partname)
   const loginPage = new LoginPage(page);
   const homePage = new HomePage(page);

    // Step 1: Validate left links on the home page
    await homePage.validateLeftLinks();

   
});
 }
 else
 {
    test.skip('test data not found', async () => {});
 }

specificTestId = 'TC12345';
let TC12345 = records.find(record => record.id === specificTestId);

if (TC12345) {
test(`${TC12345.id} ${TC12345.description}`, async ({page}) => {
      
    const homePage = new HomePage(page);

    // Step 1: Perform search
    await homePage.performSearch(TC12345.partname);

    // Step 2: Verify search results
    await homePage.verifySearchResults();
});

}
else{
    test.skip('test data not found', async () => {});
}