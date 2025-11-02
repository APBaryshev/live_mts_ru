import { Page, expect } from "@playwright/test";

export class TestHelpers {
    // Ожидание завершения анимаций
    static async waitForAnimation(page: Page): Promise<void> {
        await page.waitForTimeout(300);
    }

    static async waitForNetworkIdle(page: Page): Promise<void> {
        await page.waitForLoadState("networkidle");
    }

    // Извлечение числового значения цены из текста
    static extractPrice(priceText: string): number {
        // "4 500 ₽" → 4500
        return parseInt(priceText.replace(/[^\d]/g, ""));
    }

    static extractDiscount(discountText: string): number {
        // "20%" → 20
        return parseInt(discountText.replace(/[^\d]/g, ""));
    }

    // Скриншот
    static async takeScreenshot(page: Page, name: string): Promise<void> {
        await page.screenshot({
            path: `test-results/screenshots/${name}-${Date.now()}.png`,
            fullPage: true,
        });
    }

    // Генерация тестового номера
    static generateTestPhone(): string {
        return "+7999" + Math.random().toString().slice(2, 11);
    }

    // Генерация случайного email для тестов
    static generateTestEmail(): string {
        return `test${Date.now()}@mts-test.ru`;
    }

    // Ожидание загрузки конкретного элемента
    static async waitForElement(page: Page, selector: string, timeout = 10000): Promise<void> {
        await page.waitForSelector(selector, { timeout, state: "visible" });
    }

    // Скролл к элементу с проверкой видимости
    static async scrollToElement(page: Page, selector: string): Promise<void> {
        const element = page.locator(selector);
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200); // Небольшая пауза после скролла
    }

    //   Проверка что элемент содержит текст (регистронезависимо)
    static async expectToContainText(element: any, expectedText: string): Promise<void> {
        const actualText = await element.textContent();
        expect(actualText?.toLowerCase()).toContain(expectedText.toLowerCase());
    }
}
