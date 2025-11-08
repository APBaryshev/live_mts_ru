export const SELECTORS = {
    HEADER: "header",
    LOGO: 'header a[title="MTC LIVE"] img',
    SEARCH_INPUT: 'header input[placeholder="Событие, персона, площадка"]',
    SEARCH_BUTTON: 'button[data-testid="search-button"]',
    LOCATION_BUTTON: 'button[data-testid="location-button"]',
    LOGIN_BUTTON: 'header button:has-text("Войти")',
    USER_MENU: '[data-testid="user-menu"], .user-menu',

    PHONE_INPUT: "",
    PASSWORD_INPUT: "",
    LOGIN_SUBMIT: "",
    AUTH_ERROR: "",

    NAVIGATION: "header nav",
    NAV_ITEM: "header nav a",
    NAV_ALL_EVENTS: 'a[data-testid="nav-all-events"]',
    NAV_CONCERTS: 'a[data-testid="nav-concerts"]',
    NAV_THEATER: 'header a[href*="/theater"]',
    NAV_STANDUP: 'header a[href*="/standup"]',

    FOOTER: "footer",

    HERO_BANNER: '.hero-banner, [data-testid="hero-banner"]',
    EVENT_CARD: '[data-testid="event-card"], .event-card',
    EVENT_TITLE: '[data-testid="event-title"], .event-title',
    EVENT_DATE: '[data-testid="event-date"], .event-date',
    EVENT_PRICE: '[data-testid="event-price"], .event-price',
    EVENT_DETAILS: '[data-testid="event-details"], .event-details',
    SEAT_SELECTOR: "",
    BOOKING_SUBMIT: "",

    AUTH_MODAL: '[data-testid="auth-modal"], .auth-modal, form',
    BOOKING_MODAL: '[data-testid="booking-modal"], .booking-modal',
} as const;
