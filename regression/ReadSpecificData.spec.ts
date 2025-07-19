import { test, expect,Locator,Page } from '@playwright/test';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync'; // or your preferred CSV parser
import { title } from 'process';

// Read and parse the CSV data
const csvData = readFileSync('testdata/testdata.csv', 'utf8');
interface TestRecord {
  id: string;
  username: string;
  description: string;
  // add other fields as needed
}

const records: TestRecord[] = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Assuming you want to run a specific test_id, e.g., '123'
let specificTestId = '1';
let testToRun = records.find(record => record.id === specificTestId);


  if (testToRun) {
    test(`Test first: ${testToRun.id} `, async ({ page }) => {
      // Your test logic here, potentially using data from testToRun
      console.log(testToRun.description)
      await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
      const title = await page.title();
      await expect(title).toEqual('Account Login')
      const emailInput:Locator=page.locator('#input-email');
      const passwordInput:Locator=page.locator('#input-password');
      const loginButton:Locator=page.locator("xpath=//input[@value='Login']");
      await emailInput.fill(testToRun.username);
      await passwordInput.fill('Auto@12345');
      await loginButton.click();
      
      const title2 = await page.title();
     await expect(title2).toEqual('My Account');
      
    });
  } else {
    test.skip('Test first: test data not found', async () => {});
  }


specificTestId = '2';
let testToRun2 = records.find(record => record.id === specificTestId);

if (testToRun2) {
  test(`Test second: ${testToRun2.id} `, async ({ page }) => {
    // Your test logic here, potentially using data from testToRun2
    console.log(testToRun2.description)
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const title = await page.title();
    await expect(title).toEqual('Account Login')
    const emailInput: Locator = page.locator('#input-email');
    const passwordInput: Locator = page.locator('#input-password');
    const loginButton: Locator = page.locator("xpath=//input[@value='Login']");
    await emailInput.fill(testToRun2.username);
    await passwordInput.fill('Auto@12345');
    await loginButton.click();

    const title2 = await page.title();
    await expect(title2).toEqual('My Account');
  });
} else {
  test.skip('Test second: test data not found', async () => {});
}

