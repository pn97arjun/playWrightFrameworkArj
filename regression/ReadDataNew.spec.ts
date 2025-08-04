import {test, expect,Locator} from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { HomePage } from '../pages/homePage.spec';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import dotenv from 'dotenv';
import { decryptData } from '../Utility/commonUtil';
interface TestDataRecord {
    id: string;
    username: string;
    password: string;
    encryption_key: string;
    // add other fields as needed based on your CSV columns
}

const records = parse(fs.readFileSync('testdata/testdata.csv'), {
    columns: true,
    skip_empty_lines: true,
}) as TestDataRecord[];

for(const recorde of records){

test(`Get Data from CSV - ${recorde.id}`, async ({page}) => {
     const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
   
      //step 1: login into application
       dotenv.config();
       console.log('Username:', recorde.username)
       console.log('Password:', recorde.password) 
       await loginPage.loginIntoApplication(
           process .env.URL2 as string,
           recorde.username,
           recorde.password,
           process.env.ENCRYPTION_KEY as string
       );
});

};


