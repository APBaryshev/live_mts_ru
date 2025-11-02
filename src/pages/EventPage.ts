import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EventPage extends BasePage {
    readonly bookButton: Locator;

    constructor(page: Page) {
        super(page);
        this.bookButton = page.locator('button:has-text("Купить билет")');
    }

    async bookTicket(): Promise<void> {
        await this.bookButton.click();
    }
}
