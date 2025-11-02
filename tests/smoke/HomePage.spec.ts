import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

// smoke тесты - должны всегда проходить

test.describe("Home Page Smoke Tests", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test("should load home page successfully", async ({ page }) => {
        // Check page title
        const title = await homePage.getPageTitle();
        expect(title).toBeTruthy();

        // Check URL
        await expect(page).toHaveURL("https://live.mts.ru/");

        // Check main components are visible
        await expect(homePage.header.container).toBeVisible();
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.footer).toBeVisible();
    });

    test("should display navigation menu", async () => {
        await expect(homePage.header.navigation).toBeVisible();

        // Check some main navigation items
        const navItems = ["Концерты", "Спектакли", "Стендап"];
        for (const item of navItems) {
            const navItem = homePage.header.navigation.locator(`a:has-text("${item}")`);
            await expect(navItem).toBeVisible();
        }
    });

    test("should display event cards", async () => {
        const cardsCount = await homePage.eventCards.getCardsCount();
        expect(cardsCount).toBeGreaterThan(0);

        // Check that cards have basic information
        const firstCard = await homePage.eventCards.getCardByIndex(0);
        expect(await firstCard.getTitle()).toBeTruthy();
        expect(await firstCard.getDate()).toBeTruthy();
    });
});
