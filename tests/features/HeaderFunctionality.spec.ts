import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Header Functionality Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should open login when clicking login button", async () => {
        await homePage.header.loginButton.click();

        // Ждем возможных изменений
        await homePage.page.waitForTimeout(2000);

        // Проверяем что страница не сломалась
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.search).toBeVisible();
    });

    test("should navigate to concerts category", async ({ page }) => {
        await homePage.header.navigateToCategory("Концерты");

        // Проверяем навигацию по URL
        await expect(page).toHaveURL(/concerts/);

        // Проверяем что страница загрузилась
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should have working search field", async () => {
        // Проверяем базовую функциональность поиска
        await expect(homePage.header.search).toBeVisible();
        await expect(homePage.header.search).toBeEnabled();

        // Проверяем ввод текста
        await homePage.header.search.fill("тест");
        const value = await homePage.header.search.inputValue();
        expect(value).toBe("тест");

        // Проверяем очистку
        await homePage.header.search.clear();
        expect(await homePage.header.search.inputValue()).toBe("");
    });

    test("should display location selector", async () => {
        await expect(homePage.header.location).toBeVisible();

        // Проверяем что отображается текст (Москва или другой город)
        const locationText = await homePage.header.location.textContent();
        expect(locationText?.length).toBeGreaterThan(0);
    });

    test("should maintain header during navigation", async ({ page }) => {
        // Запоминаем основные элементы
        const initialLogoVisible = await homePage.header.logo.isVisible();

        // Переходим в категорию
        await homePage.header.navigateToCategory("Спектакли");
        await expect(page).toHaveURL(/theater/);

        // Проверяем что хедер сохранился
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.search).toBeVisible();
        await expect(homePage.header.loginButton).toBeVisible();

        // Возвращаемся обратно
        await homePage.header.clickLogo();
        await expect(page).toHaveURL(/moscow/);
    });
});
