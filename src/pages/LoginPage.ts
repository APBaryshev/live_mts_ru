import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SELECTORS } from "../constants/Selectors";

export class LoginPage extends BasePage {
    readonly authModal: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly successIndicator: Locator;

    constructor(page: Page) {
        super(page);
        this.authModal = page.locator(SELECTORS.AUTH_MODAL);
        this.phoneInput = this.authModal.locator(SELECTORS.PHONE_INPUT);
        this.passwordInput = this.authModal.locator(SELECTORS.PASSWORD_INPUT);
        this.submitButton = this.authModal.locator(SELECTORS.LOGIN_SUBMIT);
        this.errorMessage = this.authModal.locator(SELECTORS.AUTH_ERROR);
        this.successIndicator = page.locator(SELECTORS.USER_MENU);
    }

    async openAuthModal(): Promise<void> {
        // Если модалка уже открыта на странице
        await expect(this.authModal).toBeVisible();
    }

    async login(phone: string, password: string): Promise<void> {
        await this.phoneInput.fill(phone);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.waitForLoginResult();
    }

    private async waitForLoginResult(): Promise<void> {
        // Ожидаем либо успешный вход, либо ошибку
        await Promise.race([
            expect(this.successIndicator).toBeVisible({ timeout: 10000 }),
            expect(this.errorMessage).toBeVisible({ timeout: 10000 }),
        ]);
    }

    async isLoginSuccessful(): Promise<boolean> {
        const userMenu = this.page.locator(SELECTORS.USER_MENU);
        return await userMenu.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        // обрезаем пробелы (если текст есть), если текст null/undefined, возвращаем пустую строку
        return (await this.errorMessage.textContent())?.trim() || "";
    }

    async isAuthModalVisible(): Promise<boolean> {
        return await this.authModal.isVisible();
    }
}
