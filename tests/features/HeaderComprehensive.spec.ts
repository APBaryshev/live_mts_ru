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
        const headerState = await homePage.header.getHeaderState();

        if (isLoggedIn) {
            // Пользователь залогинен - проверяем user menu
            const userName = await homePage.header.getUserName();
            expect(userName).toBeTruthy();
            expect(headerState.userMenuVisible).toBe(true);
            expect(headerState.loginVisible).toBe(false);
        } else {
            // Пользователь не залогинен - проверяем кнопку входа
            const loginText = await homePage.header.getLoginButtonText();
            expect(loginText).toBe("Войти");
            expect(headerState.userMenuVisible).toBe(false);
            expect(headerState.loginVisible).toBe(true);
        }
    });

    test("should navigate using all header methods", async ({ page }) => {
        // 💡 Получаем навигацию через новый метод
        const navItems = await homePage.header.getNavigationItems();
        expect(navItems.length).toBeGreaterThan(0);

        // 💡 Находим категорию "Концерты"
        const concertsNav = navItems.find((item) => item.name.includes("Концерты"));
        if (concertsNav) {
            // 💡 Используем старый метод для навигации
            await homePage.header.navigateToCategory("Концерты");

            // Проверяем навигацию
            await expect(page).toHaveURL(/concerts/);
            await expect(page.locator("h1")).toBeVisible();
        }
    });

    test("should handle login modal properly", async () => {
        // Комплексная проверка логина
        if (!(await homePage.header.isUserLoggedIn())) {
            await homePage.header.openLoginModal();

            // Проверяем что состояние изменилось
            const loginText = await homePage.header.getLoginButtonText();
            const isButtonChanged = loginText !== "Войти";

            // Или появилась форма авторизации
            const authForm = homePage.page.locator('input[type="tel"], input[type="password"]');
            const hasAuthForm = await authForm
                .first()
                .isVisible()
                .catch(() => false);

            expect(isButtonChanged || hasAuthForm).toBe(true);
        }
    });
});
