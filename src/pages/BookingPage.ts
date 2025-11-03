import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SELECTORS } from "../constants/Selectors";

export class BookingPage extends BasePage {
    readonly bookingModal: Locator;
    readonly seatSelector: Locator;
    readonly submitButton: Locator;
    readonly eventTitle: Locator;
    readonly eventDate: Locator;
    readonly totalPrice: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.bookingModal = page.locator(SELECTORS.BOOKING_MODAL);
        this.seatSelector = this.bookingModal.locator(SELECTORS.SEAT_SELECTOR);
        this.submitButton = this.bookingModal.locator(SELECTORS.BOOKING_SUBMIT);
        this.eventTitle = this.bookingModal.locator(SELECTORS.EVENT_TITLE);
        this.eventDate = this.bookingModal.locator(SELECTORS.EVENT_DATE);
        this.totalPrice = this.bookingModal.locator('.total-price, [data-testid="total-price"]');
        this.successMessage = page.locator('[data-testid="booking-success"]');
    }

    async selectSeat(seatNumber: string): Promise<void> {
        const seat = this.seatSelector.locator(`[data-seat="${seatNumber}"]`);
        await seat.click();
        await expect(seat).toHaveClass(/selected/);
    }

    async bookTickets(): Promise<void> {
        await this.submitButton.click();
        await this.waitForBookingCompletion();
    }

    private async waitForBookingCompletion(): Promise<void> {
        // Ожидаем конкретный результат бронирования
        await Promise.race([
            expect(this.successMessage).toBeVisible({ timeout: 15000 }),
            expect(this.page.locator('[data-testid="booking-error"]')).toBeVisible(),
        ]);
    }

    async getEventInfo(): Promise<{ title: string; date: string; price: string }> {
        return {
            title: await this.getTrimmedText(this.eventTitle),
            date: await this.getTrimmedText(this.eventDate),
            price: await this.getTrimmedText(this.totalPrice),
        };
    }

    private async getTrimmedText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() || "";
    }

    async isBookingModalVisible(): Promise<boolean> {
        return await this.bookingModal.isVisible();
    }
}
