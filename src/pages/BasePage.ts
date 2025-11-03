import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator("footer");
    }

    async navigateTo(url: string = "/"): Promise<void> {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded",
        });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
    }

    // Дополнительные методы для надежности

    async waitForElementVisible(selector: string | Locator, timeout: number = 10000): Promise<void> {
        const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: "visible", timeout });
    }

    async waitForElementHidden(selector: string | Locator, timeout: number = 10000): Promise<void> {
        const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: "hidden", timeout });
    }

    async isElementVisible(selector: string | Locator): Promise<boolean> {
        try {
            const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
            await locator.waitFor({ state: "visible", timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}
