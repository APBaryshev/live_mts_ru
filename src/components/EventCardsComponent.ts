import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../constants/Selectors";
import { EventCard } from "../types/common";

// Класс отвечает за коллекцию карточек
export class EventCardsComponent {
    readonly page: Page;
    readonly container: Locator;
    readonly cards: Locator;
    readonly mtsLiveHallEvents: Locator;
    readonly cashbackEvents: Locator;
    readonly theaterHits: Locator;
    readonly standupEvents: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('[data-testid="events-container"], .events-container');
        this.cards = page.locator(SELECTORS.EVENT_CARD);

        // Инициализируем карусели
        this.mtsLiveHallEvents = page.locator("text=События в МТС Live Холл").first().locator("..");
        this.cashbackEvents = page.locator("text=Мероприятия с кешбэком").first().locator("..");
        this.theaterHits = page.locator("text=Театральные хиты").first().locator("..");
        this.standupEvents = page.locator("text=Билеты на стендап в Москве").first().locator("..");
    }

    async getCardsCount(): Promise<number> {
        return await this.cards.count();
    }

    async getCardByIndex(index: number): Promise<EventCardElement> {
        const cardLocator = this.cards.nth(index);
        return new EventCardElement(this.page, cardLocator);
    }

    async getCardByTitle(title: string): Promise<EventCardElement> {
        const cardLocator = this.cards.filter({ hasText: title }).first();
        await expect(cardLocator).toBeVisible();
        return new EventCardElement(this.page, cardLocator);
    }

    async getAllCardsInfo(): Promise<EventCard[]> {
        const count = await this.getCardsCount();
        const events: EventCard[] = [];

        for (let i = 0; i < count; i++) {
            const card = await this.getCardByIndex(i);
            events.push({
                title: await card.getTitle(),
                date: await card.getDate(),
                venue: await card.getVenue(),
                price: await card.getPrice(),
                discount: await card.getDiscount(),
            });
        }

        return events;
    }

    // Работа с конкретными каруселями
    async getMTSLiveHallEvents(): Promise<EventCardElement[]> {
        return this.getEventsFromSection(this.mtsLiveHallEvents);
    }

    async getCashbackEvents(): Promise<EventCardElement[]> {
        return this.getEventsFromSection(this.cashbackEvents);
    }

    private async getEventsFromSection(section: Locator): Promise<EventCardElement[]> {
        const cards = section.locator(SELECTORS.EVENT_CARD);
        const count = await cards.count();
        const eventCards: EventCardElement[] = [];

        for (let i = 0; i < count; i++) {
            eventCards.push(new EventCardElement(this.page, cards.nth(i)));
        }

        return eventCards;
    }
}

// Внутренний класс для работы с отдельной карточкой
class EventCardElement {
    readonly page: Page;
    readonly container: Locator;
    readonly title: Locator;
    readonly date: Locator;
    readonly venue: Locator;
    readonly price: Locator;
    readonly discount: Locator;
    readonly image: Locator;
    readonly bookButton: Locator;

    constructor(page: Page, container: Locator) {
        this.page = page;
        this.container = container;
        this.title = container.locator(SELECTORS.EVENT_TITLE);
        this.date = container.locator(SELECTORS.EVENT_DATE);
        this.venue = container.locator('[data-testid="event-venue"], .event-venue');
        this.price = container.locator(SELECTORS.EVENT_PRICE);
        this.discount = container.locator('[data-testid="event-discount"], .discount');
        this.image = container.locator("img");
        this.bookButton = container.locator('button:has-text("Купить"), [data-testid="book-button"]');
    }

    async getTitle(): Promise<string> {
        return (await this.title.textContent())?.trim() || "";
    }

    async getDate(): Promise<string> {
        return (await this.date.textContent())?.trim() || "";
    }

    async getVenue(): Promise<string> {
        return (await this.venue.textContent())?.trim() || "";
    }

    async getPrice(): Promise<string> {
        return (await this.price.textContent())?.trim() || "";
    }

    async getDiscount(): Promise<string | undefined> {
        const discount = await this.discount.textContent();
        return discount?.trim() || undefined;
    }

    async clickBook(): Promise<void> {
        await this.bookButton.click();
        await expect(this.page.locator(SELECTORS.BOOKING_MODAL)).toBeVisible();
    }

    async clickCard(): Promise<void> {
        await this.container.click();
        await expect(this.page.locator(SELECTORS.EVENT_DETAILS)).toBeVisible();
    }

    async isDiscountAvailable(): Promise<boolean> {
        return await this.discount.isVisible();
    }

    async getImageSrc(): Promise<string | null> {
        return await this.image.getAttribute("src");
    }
}
