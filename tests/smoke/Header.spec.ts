import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Header Smoke Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should display header with main elements", async () => {
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.search).toBeVisible();
        await expect(homePage.header.loginButton).toBeVisible();
        await expect(homePage.header.logo).toHaveAttribute("alt", "MTC LIVE");
    });

    test("should have working logo that navigates to home", async ({ page }) => {
        // Переходим на другую страницу и возвращаемся по логотипу
        await homePage.openConcerts();
        await expect(page).toHaveURL(/concerts/);

        await homePage.header.clickLogo();
        // Исправляем URL - сайт использует /moscow для главной
        await expect(page).toHaveURL("https://live.mts.ru/moscow");
    });

    test("should display login button with correct text", async () => {
        const loginButtonText = await homePage.header.getLoginButtonText();
        expect(loginButtonText).toBe("Войти");
        await expect(homePage.header.loginButton).toBeEnabled();
    });

    test("should have working navigation to main categories", async ({ page }) => {
        const categories = [
            { name: "Концерты", url: /concerts/ },
            { name: "Спектакли", url: /theater/ },
            { name: "Стендап", url: /standup/ },
        ];

        for (const category of categories) {
            await homePage.open();
            await homePage.header.navigateToCategory(category.name);
            await expect(page).toHaveURL(category.url);

            // Проверяем что страница загрузилась
            await expect(page.locator('h1, [data-testid*="title"]').first()).toBeVisible();
        }
    });

    test("should have working search field", async () => {
        // Просто проверяем базовую функциональность поискового поля
        await expect(homePage.header.search).toBeVisible();
        await expect(homePage.header.search).toBeEnabled();

        // Проверяем placeholder
        await expect(homePage.header.search).toHaveAttribute("placeholder", "Событие, персона, площадка");

        // Проверяем что можно вводить текст
        await homePage.header.search.fill("test");
        const value = await homePage.header.search.inputValue();
        expect(value).toBe("test");

        // Проверяем что можно очистить
        await homePage.header.search.clear();
        const clearedValue = await homePage.header.search.inputValue();
        expect(clearedValue).toBe("");
    });
});
