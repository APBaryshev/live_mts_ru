import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { SELECTORS } from '../../src/constants/Selectors';

test.describe("Header Functionality Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should open login modal when clicking login button", async ({ page }) => {
        // 💡 Шаг 1: Кликаем на кнопку "Войти"
        await homePage.header.openLoginModal();
        
        // 💡 Шаг 2: Проверяем что открылась модалка авторизации
        // Используем разные стратегии для надежности
        const authModal = page.locator(SELECTORS.AUTH_MODAL);
        const isModalVisible = await authModal.isVisible().catch(() => false);
        
        // 💡 Шаг 3: Или проверяем появление формы входа
        const phoneInput = page.locator('input[type="tel"], input[placeholder*="телефон"]');
        const hasAuthForm = await phoneInput.isVisible().catch(() => false);
        
        expect(isModalVisible || hasAuthForm).toBe(true);
    });

    test("should navigate to concerts category", async ({ page }) => {
        // 💡 Шаг 1: Переходим в категорию "Концерты"
        await homePage.header.navigateToCategory("Концерты");
        
        // 💡 Шаг 2: Проверяем навигацию
        await expect(page).toHaveURL(/\/concerts/);
        
        // 💡 Шаг 3: Проверяем что загрузилась страница концертов
        await expect(page.locator('h1:has-text("Концерты")')).toBeVisible();
    });

    test("should search for events", async ({ page }) => {
        const searchQuery = "концерт";
        
        // 💡 Шаг 1: Вводим поисковый запрос
        await homePage.header.searchFor(searchQuery);
        
        // 💡 Шаг 2: Проверяем что перешли на страницу поиска
        await expect(page).toHaveURL(/\?search=/);
        
        // 💡 Шаг 3: Проверяем что есть результаты
        const results = page.locator(SELECTORS.EVENT_CARD);
        const resultsCount = await results.count();
        
        expect(resultsCount).toBeGreaterThan(0);
    });

    test("should display location selector", async () => {
        // 💡 Шаг 1: Проверяем кнопку выбора региона
        await expect(homePage.header.location).toBeVisible();
        
        // 💡 Шаг 2: Проверяем что отображается текущий город
        const locationText = await homePage.header.location.textContent();
        expect(locationText).toContain("Москва");
    });

    test("should maintain header state during navigation", async ({ page }) => {
        // 💡 Шаг 1: Запоминаем состояние хедера на главной
        const initialHeaderState = await homePage.header.getHeaderState();
        
        // 💡 Шаг 2: Переходим в другую категорию
        await homePage.header.navigateToCategory("Спектакли");
        
        // 💡 Шаг 3: Проверяем что хедер сохранил основные элементы
        await expect(homePage.header.container).toBeVisible();
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.loginButton).toBeVisible();
        
        // 💡 Шаг 4: Проверяем что навигация все еще работает
        await homePage.header.navigateToCategory("Концерты");
        await expect(page).toHaveURL(/\/concerts/);
    });
});