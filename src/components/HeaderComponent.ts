import { Page, Locator } from "@playwright/test";
import { SELECTORS } from "../constants/Selectors";

export class HeaderComponent {
    readonly page: Page;
    readonly container: Locator;
    readonly logo: Locator;
    readonly search: Locator;
    readonly searchButton: Locator;
    readonly location: Locator;
    readonly loginButton: Locator;
    readonly userMenu: Locator;
    readonly navigation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator(SELECTORS.HEADER);
        this.logo = this.container.locator(SELECTORS.LOGO);
        this.search = this.container.locator(SELECTORS.SEARCH);
        this.searchButton = this.container.locator(SELECTORS.SEARCH_BUTTON);
        this.location = this.container.locator(SELECTORS.LOCATION);
        this.loginButton = this.container.locator(SELECTORS.LOGIN_BUTTON);
        this.userMenu = this.container.locator(SELECTORS.USER_MENU);
        this.navigation = page.locator("SELECTORS.NAVIGATION");
    }

    // Публичные методы - API для работы с header

    async clickLogo(): Promise<void> {
        await this.logo.click();
        await this.page.waitForLoadState("networkidle");
    }

    async searchFor(query: string): Promise<void> {
        await this.search.fill(query);
        await this.search.press("Enter");
        await this.page.waitForLoadState("networkidle");
    }

    async navigateToCategory(categoryName: string): Promise<void> {
        const categoryLink = this.navigation.locator(`a:has-text("${categoryName}")`);
        await categoryLink.click();
        await this.page.waitForLoadState("networkidle");
    }

    async openLoginModal(): Promise<void> {
        await this.loginButton.click();
        await this.page.waitForTimeout(1000);
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.userMenu.isVisible();
    }

    async getUserName(): Promise<string> {
        return (await this.userMenu.textContent()) || "";
    }

    async logout(): Promise<void> {
        if (await this.isUserLoggedIn()) {
            await this.userMenu.click();
            const logoutButton = this.page.locator('button:has-text("Выйти")');
            await logoutButton.click();
            await this.page.waitForLoadState("networkidle");
        }
    }
}
