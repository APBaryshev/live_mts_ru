import { Page, Locator } from "@playwright/test";

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
        this.container = page.locator('header');
        this.logo = page.getByAltText('MTC LIVE');
        this.search = page.getByPlaceholder('Событие, персона, площадка');
        this.searchButton = page.locator('button[type="submit"]').first();
        this.location = page.getByTitle('Выбор региона');
        this.loginButton = page.getByRole('button', { name: 'Войти' });
        this.userMenu = page.locator('[data-testid="user-menu"]');
        this.navigation = page.locator('header nav');
    }

    async clickLogo(): Promise<void> {
        await this.logo.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchFor(query: string): Promise<void> {
        await this.search.fill(query);
        await this.search.press("Enter");
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToCategory(categoryName: string): Promise<void> {
        const categoryLink = this.navigation.getByRole('link', { name: categoryName });
        await categoryLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.userMenu.isVisible();
    }

    async openLoginModal(): Promise<void> {
        await this.loginButton.click();
        await this.page.waitForTimeout(1000); // Краткая пауза для анимации
    }

    // Упрощенные методы для smoke тестов
    async getLoginButtonText(): Promise<string> {
        return (await this.loginButton.textContent())?.trim() || "";
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    async isSearchVisible(): Promise<boolean> {
        return await this.search.isVisible();
    }
}