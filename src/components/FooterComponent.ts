import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../constants/Selectors";

export class FooterComponent {
    readonly page: Page;
    readonly container: Locator;
    readonly downloadSection: Locator;
    readonly menuSection: Locator;
    readonly socialSection: Locator;
    readonly appsSection: Locator;
    readonly copyright: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator(SELECTORS.FOOTER);
        this.downloadSection = this.container.locator("text=Скачать приложение").first().locator("..");
        this.menuSection = this.container.locator("text=Все события").first().locator("..");
        this.socialSection = this.container.locator("text=VK").first().locator("..");
        this.appsSection = this.container.locator("text=МТС Live").first().locator("..");
        this.copyright = this.container.locator("text=Copyright");
    }

    async scrollToFooter(): Promise<void> {
        await this.container.scrollIntoViewIfNeeded();
    }

    async clickAppStore(): Promise<void> {
        const appStoreLink = this.downloadSection.locator('a[href*="apps.apple.com"]');
        await appStoreLink.click();
    }

    async clickGooglePlay(): Promise<void> {
        const googlePlayLink = this.downloadSection.locator('a[href*="play.google.com"]');
        await googlePlayLink.click();
    }

    async navigateToSection(sectionName: string): Promise<void> {
        const sectionLink = this.menuSection.locator(`a:has-text("${sectionName}")`);
        await sectionLink.click();
        await expect(this.page.locator('h1:has-text("${sectionName}")')).toBeVisible();
    }

    async clickSocialLink(networkName: string): Promise<void> {
        const socialLink = this.socialSection.locator(`a:has-text("${networkName}")`);
        const [newPage] = await Promise.all([this.page.context().waitForEvent("page"), socialLink.click()]);
        await newPage.waitForLoadState("domcontentloaded");
    }

    async clickMTSLiveApp(): Promise<void> {
        const mtsLiveLink = this.appsSection.locator('a:has-text("МТС Live")');
        await mtsLiveLink.click();
    }

    async isCopyrightVisible(): Promise<boolean> {
        return await this.copyright.isVisible();
    }

    async getCopyrightText(): Promise<string> {
        return (await this.copyright.textContent())?.trim() || "";
    }

    async getAllMenuItems(): Promise<string[]> {
        const menuItems = this.menuSection.locator("a");
        const count = await menuItems.count();
        const items: string[] = [];

        for (let i = 0; i < count; i++) {
            const text = await menuItems.nth(i).textContent();
            if (text) items.push(text.trim());
        }

        return items;
    }
}
