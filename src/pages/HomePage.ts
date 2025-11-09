import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { EventCardsComponent } from "../components/EventCardsComponent";

export class HomePage extends BasePage {
    readonly header: HeaderComponent;
    readonly eventCards: EventCardsComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.eventCards = new EventCardsComponent(page);
    }

    async open(): Promise<void> {
        await this.navigateTo("https://live.mts.ru/moscow");
        await this.waitForPageLoad();
        // Закрываем баннер с cookies, если он появился
        await this.closeCookieBanner();
        await this.waitForHomePageReady();
    }

    private async closeCookieBanner(): Promise<void> {
        // Ищем кнопку "OK" в баннере cookies (можно уточнить селектор)
        const cookieAcceptButton = this.page.locator("text=OK").first();

        // Проверяем видимость с небольшим таймаутом (баннер может появиться не сразу)
        if (await cookieAcceptButton.isVisible({ timeout: 3000 })) {
            await cookieAcceptButton.click();
            // Дополнительно: ждём, пока баннер исчезнет
            await cookieAcceptButton.waitFor({ state: "hidden", timeout: 5000 });
        }
    }

    private async waitForHomePageReady(): Promise<void> {
        // Только самая важная проверка + ждем загрузку
        await this.page.waitForLoadState("domcontentloaded");
        await this.header.logo.waitFor({ state: "visible", timeout: 10000 });
    }

    // Быстрый доступ к категориям
    async openConcerts(): Promise<void> {
        await this.header.navigateToCategory("Концерты");
    }

    async openTheater(): Promise<void> {
        await this.header.navigateToCategory("Спектакли");
    }

    async openStandup(): Promise<void> {
        await this.header.navigateToCategory("Стендап");
    }
}
