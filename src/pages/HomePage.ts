import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { EventCardsComponent } from "../components/EventCardsComponent";
import { SELECTORS } from "../constants/Selectors";

// Конкретная страница - наследует общую логику
export class HomePage extends BasePage {
    readonly header: HeaderComponent;
    readonly eventCards: EventCardsComponent;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.eventCards = new EventCardsComponent(page);
    }

    async open(): Promise<void> {
        await this.navigateTo("https://live.mts.ru");
        await this.waitForPageLoad();
        // Добавляем ожидание ключевых элементов
        await this.waitForHomePageReady();
    }

    private async waitForHomePageReady(): Promise<void> {
        await Promise.all([
            expect(this.header.logo).toBeVisible(),
            expect(this.page.locator(SELECTORS.HERO_BANNER)).toBeVisible(),
        ]);
    }

    // Быстрый доступ к популярным категориям
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
