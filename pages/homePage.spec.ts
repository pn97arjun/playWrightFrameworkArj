import {expect,type Locator,type Page,test} from '@playwright/test';

export class HomePage {
    private page: Page;
    private searchInput: Locator;
    private searchResult: Locator;
    private searchHeading: Locator;
    private listofLeftLinks: Locator;
    private droplocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('css=input[name="search"]');
        this.listofLeftLinks = page.locator('xpath=//div[@id="content"]//ul[@class="list-unstyled"]/li/a');
        this.searchResult = page.locator('xpath=//div[@class="caption"]/h4/a');
        this.searchHeading = page.locator('xpath=//h2[contains(text(),"Products meeting the search")]');
        this.droplocator=page.locator('css=select#Contact_CountryCode');
    }

    async validateLeftLinks() {
        await this.page.screenshot({ path: 'playwright-report/home_page_links.png' });
        await expect(this.listofLeftLinks).toHaveText([
            'Edit your account information',
            'Change your password',
            'Modify your address book entries',
            'Modify your wish list',
            'View your order history',
            'Downloads',
            'Your Reward Points',
            'View your return requests',
            'Your Transactions',
            'Recurring payments',
            'Register for an affiliate account',
            'Subscribe / unsubscribe to newsletter'
        ]);
        await this.page.screenshot({ path: 'playwright-report/home_page_links.png' });
    }

    async performSearch(searchValue: string) {
        await this.searchInput.fill(searchValue);
        await this.searchInput.press('Enter');
    }

    async verifySearchResults() {
        await this.searchHeading.waitFor({ state: 'visible' });
        await expect(this.searchHeading).toHaveText('Products meeting the search criteria');
        await this.page.screenshot({ path: 'playwright-report/search_results.png' });
        await test.info().attach('Search Results Screenshot', {
            body: await this.page.screenshot(),
            contentType: 'image/png'
        });
        await expect(this.searchResult).toHaveText([
            'Samsung SyncMaster 941BW',
            'Samsung Galaxy Tab 10.1'
        ]);

    }
    async validatdrpdownCountry(dropValue: string){
        await this.droplocator.selectOption(dropValue)
    }
}