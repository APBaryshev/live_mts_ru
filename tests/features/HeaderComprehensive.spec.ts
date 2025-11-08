import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Header Comprehensive Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should handle user authentication state", async () => {
        const isLoggedIn = await homePage.header.isUserLoggedIn();

        if (isLoggedIn) {
            // Простая проверка что user menu виден
            await expect(homePage.header.userMenu).toBeVisible();
        } else {
            // Простая проверка что кнопка входа видна
            await expect(homePage.header.loginButton).toBeVisible();
            const loginText = await homePage.header.getLoginButtonText();
            expect(loginText).toBe("Войти");
        }
    });

    test("should navigate using header navigation", async ({ page }) => {
        // Простая навигация без сложных методов
        await homePage.header.navigateToCategory("Концерты");
        await expect(page).toHaveURL(/concerts/);
        await expect(page.locator("h1")).toBeVisible();
    });

    test("should have working login button", async () => {
        await expect(homePage.header.loginButton).toBeVisible();
        await expect(homePage.header.loginButton).toBeEnabled();

        const loginText = await homePage.header.getLoginButtonText();
        expect(loginText).toBe("Войти");

        // Кликаем и проверяем базовую функциональность
        await homePage.header.loginButton.click();
        await homePage.page.waitForLoadState("domcontentloaded");

        // Убеждаемся что страница не сломалась
        await expect(homePage.header.logo).toBeVisible();
    });
});
