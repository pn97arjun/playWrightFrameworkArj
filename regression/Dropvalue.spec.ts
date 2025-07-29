import {test,expect,Locator} from '@playwright/test';
import { HomePage } from '../pages/homePage.spec';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
// Read and parse the CSV data
const csvData = readFileSync('testdata/dropdata.csv', 'utf8');
interface TestRecord {
  id: string;
  country:string;
  // add other fields as needed
}

const records: TestRecord[] = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Assuming you want to run a specific test_id, e.g., '123'
const specificTestId = '1';
const TC1 = records.find(record => record.id === specificTestId);

 if (TC1) {
 
test(`select dropdown`, async ({page}) => {
   dotenv.config();
    console.log(TC1.country)
    const homePage = new HomePage(page);
   await page.goto(process.env.URL3 as string)
   const acceptcookie:Locator=page.locator('xpath=//div[contains(text(),"Accept All")]')
  // const droplocator:Locator=page.locator('css=select#Contact_CountryCode')
   await acceptcookie.waitFor({ state: 'visible' });
   await acceptcookie.click()
   //await droplocator.selectOption(TC1.country);
   await homePage.validatdrpdownCountry(TC1.country)
 

});
 }
 else
 {
    test.skip('test data not found', async () => {});
 }