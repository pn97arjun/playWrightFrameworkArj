import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
test.beforeEach(async ({ page }) => {
    dotenv.config();
    await page.goto(process.env.URL1 as string);
});
test('open Google URL', async ({ page }) => {
    await test.step('Step1 : test Case started', async () => {});
    await expect(page).toHaveURL(process.env.URL1 as string);
    await expect(page).toHaveTitle(/Google/);
    await page.click('//textarea[@title="Search"]');
    let searchValue= process.env.TEXT1 as string;
    await page.fill('textarea[title="Search"]', searchValue);
    await page.locator('textarea[title="Search"]').press('Enter');
    //await page.waitForSelector('ul[role="listbox"] li', { state: 'visible' });
    const screenshot = await page.screenshot({ path: 'playwright-report/google_search.png' });
    await test.info().attach('Google Search Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });
    await page.waitForSelector('(//a[@class="zReHs"]//./h3)[1]', { state: 'visible' });
    const resultsScreenshot = await page.screenshot({ path: 'playwright-report/google_search_results.png' });
    await test.info().attach('Google Search Results Screenshot', {
        body: resultsScreenshot,
        contentType: 'image/png'
    });  
});