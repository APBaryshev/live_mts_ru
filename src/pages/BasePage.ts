import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator("footer");
    }

    async navigateTo(url: string = "/"): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState("networkidle");
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
    }
}
