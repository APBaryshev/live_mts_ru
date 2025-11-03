import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { NavigationItem } from "../../src/types/common";

test.describe("Header Smoke Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should display header with all main elements", async () => {
        // 💡 Шаг 1: Проверяем что хедер загрузился
        await expect(homePage.header.container).toBeVisible();
        
        // 💡 Шаг 2: Проверяем основные элементы хедера
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.search).toBeVisible();
        await expect(homePage.header.location).toBeVisible();
        await expect(homePage.header.loginButton).toBeVisible();
        await expect(homePage.header.navigation).toBeVisible();

        // 💡 Шаг 3: Проверяем специфические атрибуты
        const logo = homePage.header.logo;
        await expect(logo).toHaveAttribute('alt', 'MTC LIVE');
        await expect(logo).toHaveAttribute('src', /Logo.svg/);
        
        // 💡 Шаг 4: Проверяем плейсхолдер поиска
        await expect(homePage.header.search).toHaveAttribute(
            'placeholder', 
            'Событие, персона, площадка'
        );
    });

    test("should display correct navigation menu items", async () => {
        // 💡 Используем интерфейс из common.ts
        const expectedNavItems: NavigationItem[] = [
            { name: "Все события", testId: "nav-all-events", url: "/moscow" },
            { name: "С кешбэком", testId: "nav-cashback", url: "/moscow/collections/events_with_cashback" },
            { name: "Концерты", testId: "nav-concerts", url: "/moscow/collections/concerts" },
            { name: "Спектакли", testId: "nav-theater", url: "/moscow/collections/theater" },
            { name: "Стендап", testId: "nav-standup", url: "/moscow/collections/standup" }
        ];

        // 💡 Шаг 1: Получаем все элементы навигации
        const navItems = homePage.header.navigation.locator('a');
        const count = await navItems.count();
        
        expect(count).toBeGreaterThan(0);

        // 💡 Шаг 2: Проверяем основные пункты меню
        for (const expectedItem of expectedNavItems.slice(0, 3)) {
            const navItem = homePage.header.navigation.locator(`a:has-text("${expectedItem.name}")`);
            await expect(navItem).toBeVisible();
            
            // 💡 Шаг 3: Проверяем ссылки
            if (expectedItem.url) {
                await expect(navItem).toHaveAttribute('href', expectedItem.url);
            }
        }
    });

    test("should have functional logo that navigates to home", async ({ page }) => {
        // 💡 Шаг 1: Кликаем на логотип
        await homePage.header.clickLogo();
        
        // 💡 Шаг 2: Проверяем что остались на главной странице
        await expect(page).toHaveURL(/https:\/\/live\.mts\.ru/);
        
        // 💡 Шаг 3: Проверяем что основные элементы все еще видны
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.navigation).toBeVisible();
    });

    test("should display login button with correct text", async () => {
        // 💡 Шаг 1: Проверяем текст кнопки
        const loginButtonText = await homePage.header.getLoginButtonText();
        expect(loginButtonText).toBe("Войти");
        
        // 💡 Шаг 2: Проверяем что кнопка кликабельна
        await expect(homePage.header.loginButton).toBeEnabled();
    });
});