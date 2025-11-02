// src/constants/Selectors.ts
export const SELECTORS = {
    // Header
    HEADER: 'header, [data-testid="header"]',
    LOGO: '[data-testid="logo"], .logo',
    SEARCH: '[data-testid="search"], input[type="search"]',
    SEARCH_BUTTON: '[data-testid="search-button"], button[type="submit"]',
    LOCATION: '[data-testid="location"], .location-selector',
    LOGIN_BUTTON: 'button:has-text("Войти"), [data-testid="login-btn"]',
    USER_MENU: '[data-testid="user-menu"], .user-menu',
    USER_AVATAR: '[data-testid="user-avatar"], .user-avatar',

    // Navigation
    NAVIGATION: 'nav, [data-testid="navigation"]',
    NAV_ITEM: '[data-testid="nav-item"], .nav-item',
    ALL_EVENTS: 'a:has-text("Все события")',
    WITH_CASHBACK: 'a:has-text("С кешбеком")',
    CONCERTS: 'a:has-text("Концерты")',
    THEATER: 'a:has-text("Спектакли")',
    STANDUP: 'a:has-text("Стендап")',
    KIDS: 'a:has-text("Детям")',

    // Event Cards
    EVENT_CARD: '[data-testid="event-card"], .event-card',
    EVENT_TITLE: '[data-testid="event-title"], .event-title',
    EVENT_DATE: '[data-testid="event-date"], .event-date',
    EVENT_VENUE: '[data-testid="event-venue"], .event-venue',
    EVENT_PRICE: '[data-testid="event-price"], .event-price',
    EVENT_DISCOUNT: '[data-testid="event-discount"], .discount',
    EVENT_IMAGE: '[data-testid="event-image"] img, .event-card img',
    BOOK_BUTTON: 'button:has-text("Купить"), [data-testid="book-button"]',

    // Carousels
    CAROUSEL: '[data-testid="carousel"], .carousel',
    CAROUSEL_TITLE: '[data-testid="carousel-title"], .carousel-title',
    CAROUSEL_NEXT: '[data-testid="carousel-next"], .carousel-next',
    CAROUSEL_PREV: '[data-testid="carousel-prev"], .carousel-prev',

    // Footer
    FOOTER: 'footer, [data-testid="footer"]',
    FOOTER_MENU: '[data-testid="footer-menu"], .footer-menu',
    FOOTER_SOCIAL: '[data-testid="footer-social"], .social-links',
    FOOTER_APPS: '[data-testid="footer-apps"], .app-links',

    // Auth Modal
    AUTH_MODAL: '[data-testid="auth-modal"], .auth-modal',
    PHONE_INPUT: 'input[type="tel"], [data-testid="phone-input"]',
    PASSWORD_INPUT: 'input[type="password"], [data-testid="password-input"]',
    LOGIN_SUBMIT: 'button[type="submit"], [data-testid="login-submit"]',
    AUTH_ERROR: '[data-testid="auth-error"], .error-message',

    // Booking
    BOOKING_MODAL: '[data-testid="booking-modal"], .booking-modal',
    SEAT_SELECTOR: '[data-testid="seat-selector"], .seat-selector',
    BOOKING_SUBMIT: 'button:has-text("Забронировать"), [data-testid="booking-submit"]',

    // Common
    LOADING: '[data-testid="loading"], .loading-spinner',
    ERROR_MESSAGE: '[data-testid="error"], .error-message',
    SUCCESS_MESSAGE: '[data-testid="success"], .success-message',
} as const;
