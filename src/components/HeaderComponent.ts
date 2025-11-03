import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../constants/Selectors";
import { NavigationItem } from "../types/common";

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
        this.search = this.container.locator(SELECTORS.SEARCH_INPUT);
        this.searchButton = this.container.locator(SELECTORS.SEARCH_BUTTON);
        this.location = this.container.locator(SELECTORS.LOCATION_BUTTON);
        this.loginButton = this.container.locator(SELECTORS.LOGIN_BUTTON);
        this.userMenu = this.container.locator(SELECTORS.USER_MENU);
        this.navigation = this.container.locator(SELECTORS.NAVIGATION);
    }

    // Публичные методы - API для работы с header

    async clickLogo(): Promise<void> {
        await this.logo.click();
        await expect(this.page.locator(SELECTORS.HERO_BANNER)).toBeVisible();
    }

    async searchFor(query: string): Promise<void> {
        await this.search.fill(query);
        await this.search.press("Enter");
        await expect(this.page.locator(SELECTORS.EVENT_CARD)).toBeVisible();
    }

    async navigateToCategory(categoryName: string): Promise<void> {
        const categoryLink = this.navigation.locator(`a:has-text("${categoryName}")`);
        await categoryLink.click();
        await expect(this.page.locator(`h1`)).toBeVisible();
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
            await expect(this.loginButton).toBeVisible({ timeout: 10000 });
        }
    }

    async getLoginButtonText(): Promise<string> {
        return (await this.loginButton.textContent())?.trim() || "";
    }

    async getHeaderState(): Promise<{
        logoVisible: boolean;
        searchVisible: boolean;
        loginVisible: boolean;
        userMenuVisible: boolean;
        navigationVisible: boolean;
    }> {
        return {
            logoVisible: await this.logo.isVisible(),
            searchVisible: await this.search.isVisible(),
            loginVisible: await this.loginButton.isVisible(),
            userMenuVisible: await this.userMenu.isVisible(),
            navigationVisible: await this.navigation.isVisible(),
        };
    }

    async getNavigationItems(): Promise<NavigationItem[]> {
        const items: NavigationItem[] = [];
        const navLinks = this.navigation.locator("a");
        const count = await navLinks.count();

        for (let i = 0; i < count; i++) {
            const link = navLinks.nth(i);
            const name = (await link.textContent())?.trim() || "";
            const url = (await link.getAttribute("href")) || "";

            items.push({
                name,
                testId: `nav-${name.toLowerCase().replace(/\s+/g, "-")}`,
                url,
            });
        }

        return items;
    }

    async openLoginModal(): Promise<void> {
        await this.loginButton.click();

        // Стратегия 1: Ждем появление модалки (если она есть)
        const authModal = this.page.locator(SELECTORS.AUTH_MODAL);
        const isModal = await authModal.isVisible().catch(() => false);

        if (isModal) {
            await expect(authModal).toBeVisible();
        } else {
            // Стратегия 2: Ждем редирект или появление формы
            await this.page.waitForTimeout(1000); // Краткая задержка для стабилизации

            // Стратегия 3: Проверяем что кнопка изменила состояние
            const buttonText = await this.getLoginButtonText();
            if (buttonText !== "Войти") {
                // Кнопка изменилась - вероятно открылась форма
                return;
            }

            // Стратегия 4: Ждем появление полей ввода
            const phoneInput = this.page.locator('input[type="tel"]');
            await phoneInput.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
                /* Игнорируем если нет полей */
            });
        }
    }

    // async openLoginModal(): Promise<void> {
    //     await this.loginButton.click();
    //     await expect(this.page.locator(SELECTORS.AUTH_MODAL)).toBeVisible();
    //     await this.page.waitForTimeout(500); // Небольшая задержка для анимации
    // }
}
