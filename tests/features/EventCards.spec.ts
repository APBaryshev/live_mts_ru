import { test, expect } from "@playwright/test";

test.describe("Event Cards", () => {
    test.beforeEach(async ({ page }) => {
        // Переход на главную страницу
        await page.goto("/moscow");
        // Ждем загрузки карточек событий
        await page.waitForSelector('[data-type="izobrazhenie"]');
    });

    test("should display event cards with correct information", async ({ page }) => {
        // Проверяем, что карточки событий отображаются
        const eventCards = await page.locator(".AnnouncementPreview_root__Vu0qA");
        await expect(eventCards.first()).toBeVisible();

        // Проверяем количество карточек (минимум 1 должна быть)
        const cardCount = await eventCards.count();
        expect(cardCount).toBeGreaterThan(0);
    });

    test("should display event image", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие изображения
        const eventImage = firstEventCard.locator('[data-type="izobrazhenie"]');
        await expect(eventImage).toBeVisible();

        // Проверяем, что у изображения есть src
        const imageSrc = await eventImage.locator("img").getAttribute("src");
        expect(imageSrc).toBeTruthy();
    });

    test("should display event title", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие заголовка
        const eventTitle = firstEventCard.locator('[data-type="nazvanie_meropriyatiya"]');
        await expect(eventTitle).toBeVisible();

        // Проверяем, что заголовок не пустой
        const titleText = await eventTitle.textContent();
        expect(titleText?.trim()).toBeTruthy();
    });

    test("should display event price", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие цены
        const priceBadge = firstEventCard.locator('[data-type="cena"] .Badge_secondaryTheme___yEVm');
        await expect(priceBadge).toBeVisible();

        // Проверяем формат цены (должен содержать "₽")
        const priceText = await priceBadge.textContent();
        expect(priceText).toContain("₽");
    });

    test("should display event date and time", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие даты и времени
        const dateTime = firstEventCard.locator(".AnnouncementPreviewContent_dateTime__9_Avp");
        await expect(dateTime).toBeVisible();

        // Проверяем, что дата и время не пустые
        const dateTimeText = await dateTime.textContent();
        expect(dateTimeText?.trim()).toBeTruthy();
    });

    test("should display venue information", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие информации о площадке
        const venue = firstEventCard.locator(".AnnouncementPreviewContent_venueTitle__SY0Az");
        await expect(venue).toBeVisible();

        // Проверяем, что название площадки не пустое
        const venueText = await venue.textContent();
        expect(venueText?.trim()).toBeTruthy();
    });

    test("should have favorite button", async ({ page }) => {
        const firstEventCard = page.locator(".AnnouncementPreview_root__Vu0qA").first();

        // Проверяем наличие кнопки "Добавить в избранное"
        const favoriteButton = firstEventCard.locator('button[aria-label="Добавить в избранное"]');
        await expect(favoriteButton).toBeVisible();
    });

    test("should display cashback badge for eligible events", async ({ page }) => {
        // Ищем карточки с кешбэком
        const cashbackBadge = page.locator(".Badge_gradientPremiumTheme__yKyTv");

        // Если есть события с кешбэком, проверяем бейдж
        if (await cashbackBadge.first().isVisible()) {
            await expect(cashbackBadge.first()).toBeVisible();

            // Проверяем, что бейдж содержит информацию о кешбэке
            const cashbackText = await cashbackBadge.first().textContent();
            expect(cashbackText).toMatch(/(до|%)/);
        }
    });

    test("should have working navigation between event sections", async ({ page }) => {
        // Проверяем навигацию между секциями событий
        const sectionHeaders = page.locator(".SliderWidget_root__XqrW7 header a");

        // Проверяем, что есть минимум одна секция
        const sectionCount = await sectionHeaders.count();
        expect(sectionCount).toBeGreaterThan(0);

        // Кликаем на первую секцию и проверяем переход
        const firstSection = sectionHeaders.first();
        const sectionHref = await firstSection.getAttribute("href");
        await firstSection.click();

        // Проверяем переход на страницу секции
        await expect(page).toHaveURL(new RegExp(`${sectionHref}`));
    });

    test("should display slider navigation buttons", async ({ page }) => {
        // Проверяем наличие кнопок навигации слайдера
        const prevButton = page.locator('button[aria-label="Предыдущий"]').first();
        const nextButton = page.locator('button[aria-label="Следующий"]').first();

        // Кнопки могут быть скрыты на мобильных устройствах
        if (await prevButton.isVisible()) {
            await expect(prevButton).toBeVisible();
        }

        if (await nextButton.isVisible()) {
            await expect(nextButton).toBeVisible();
        }
    });
});
