import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Event Cards Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should display event cards with required information", async () => {
        const cardsCount = await homePage.eventCards.getCardsCount();
        expect(cardsCount).toBeGreaterThan(0);

        // Проверяем первую карточку
        const firstCard = await homePage.eventCards.getCardByIndex(0);

        const title = await firstCard.getTitle();
        const date = await firstCard.getDate();
        const price = await firstCard.getPrice();

        expect(title).toBeTruthy();
        expect(date).toBeTruthy();
        expect(price).toBeTruthy();

        console.log(`First event: "${title}" on ${date} for ${price}`);
    });

    test("should navigate to event details when clicking card", async ({ page }) => {
        const firstCard = await homePage.eventCards.getCardByIndex(0);
        const eventTitle = await firstCard.getTitle();

        await firstCard.clickCard();

        // Проверяем что перешли на страницу события
        await expect(page).not.toHaveURL("https://live.mts.ru/");
        await expect(page.locator("h1")).toContainText(eventTitle, { ignoreCase: true });
    });

    test("should display cashback events section", async () => {
        const cashbackEvents = await homePage.eventCards.getCashbackEvents();
        expect(cashbackEvents.length).toBeGreaterThan(0);

        for (const event of cashbackEvents) {
            const hasDiscount = await event.isDiscountAvailable();
            expect(hasDiscount).toBe(true);
        }
    });

    test('should open booking flow when clicking "Купить"', async ({ page }) => {
        const firstCard = await homePage.eventCards.getCardByIndex(0);

        await firstCard.clickBook();

        // Проверяем что открылся процесс бронирования
        const bookingModal = page.locator('[data-testid="booking-modal"], .booking-modal');
        const isModalOpened = await bookingModal.isVisible().catch(() => false);

        // Или перенаправило на страницу бронирования
        const isBookingPage = page.url().includes("/booking") || page.url().includes("/order");

        expect(isModalOpened || isBookingPage).toBe(true);
    });
});
