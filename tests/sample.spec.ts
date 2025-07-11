import { test, expect } from '@playwright/test';

test('open Google URL', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveURL('https://www.google.com/');
    await expect(page).toHaveTitle(/Google/);
    await page.click('//textarea[@title="Search"]');
    await page.fill('textarea[title="Search"]', 'playwright');
    await page.keyboard.press('Enter');
    //await page.waitForSelector('ul[role="listbox"] li', { state: 'visible' });
    const screenshot = await page.screenshot({ path: 'playwright-report/playwright-reportgoogle_search.png' });
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