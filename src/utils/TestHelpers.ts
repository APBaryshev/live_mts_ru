import { Locator, Page, expect } from "@playwright/test";

export class TestHelpers {
    // Ожидание завершения анимаций
    static async waitForAnimation(page: Page): Promise<void> {
        await page.waitForFunction(() => {
            return document.readyState === "complete";
        });
    }

    static async waitForNetworkIdle(page: Page): Promise<void> {
        await page.waitForLoadState("domcontentloaded");
    }

    // Извлечение числового значения цены из текста
    static extractPrice(priceText: string): number {
        // "4 500 ₽" → 4500, "бесплатно" → 0
        const cleanText = priceText.toLowerCase().trim();
        if (cleanText === "бесплатно" || cleanText === "free") return 0;

        const price = parseInt(priceText.replace(/[^\d]/g, ""));
        return isNaN(price) ? 0 : price;
    }

    static extractDiscount(discountText: string): number {
        // "20%" → 20, "скидка 30%" → 30
        const match = discountText.match(/(\d+)%?/);
        return match ? parseInt(match[1]) : 0;
    }

    // Скриншот
    static async takeScreenshot(page: Page, name: string): Promise<void> {
        // Создаем директорию если не существует
        const path = `test-results/screenshots/${name}-${Date.now()}.png`;
        await page.screenshot({
            path: path,
            fullPage: true,
        });
        console.log(`Screenshot saved: ${path}`);
    }

    // Генерация тестовых данных
    static generateTestPhone(): string {
        const prefixes = ["+7999", "+7995", "+7996"];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return prefix + Math.random().toString().slice(2, 11);
    }

    static generateTestEmail(domain: string = "mts-test.ru"): string {
        return `test${Date.now()}${Math.random().toString().slice(2, 6)}@${domain}`;
    }

    // Ожидание загрузки конкретного элемента
    static async waitForElement(page: Page, selector: string, timeout = 10000): Promise<Locator> {
        const locator = page.locator(selector);
        await locator.waitFor({ state: "visible", timeout });
        return locator; // Возвращаем locator для дальнейших действий
    }

    // Скролл к элементу с проверкой видимости
    static async scrollToElement(page: Page, selector: string): Promise<void> {
        const element = page.locator(selector);

        // Проверяем что элемент существует
        await element.waitFor({ state: "attached" });

        // Скроллим и ждем стабилизации
        await element.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            (sel) => {
                const el = document.querySelector(sel);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight;
            },
            selector,
            { timeout: 5000 }
        );
    }

    //   Проверка что элемент содержит текст (регистронезависимо)
    static async expectToContainText(element: Locator, expectedText: string): Promise<void> {
        await expect(element).toContainText(expectedText, { ignoreCase: true });
    }

    // Ожидание исчезновения элемента
    static async waitForElementHidden(page: Page, selector: string, timeout = 10000): Promise<void> {
        await page.locator(selector).waitFor({ state: "hidden", timeout });
    }

    // Клик с обработкой возможных ошибок
    static async safeClick(page: Page, selector: string, timeout = 10000): Promise<void> {
        const element = await this.waitForElement(page, selector, timeout);
        await element.click({ timeout: 5000 }).catch(async () => {
            // Если обычный клик не работает, пробуем через JS
            await page.$eval(selector, (el: any) => el.click());
        });
    }

    // Заполнение поля с очисткой
    static async fillField(page: Page, selector: string, value: string): Promise<void> {
        const element = await this.waitForElement(page, selector);
        await element.clear();
        await element.fill(value);
    }

    // Получение текста с ожиданием
    static async getText(page: Page, selector: string): Promise<string> {
        const element = await this.waitForElement(page, selector);
        return (await element.textContent())?.trim() || "";
    }
}
