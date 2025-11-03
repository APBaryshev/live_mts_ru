export const SELECTORS = {
    // Header based on actual HTML
    HEADER: 'header',
    LOGO: 'header a[title="MTC LIVE"] img',
    SEARCH_INPUT: 'header input[placeholder="Событие, персона, площадка"]',
    SEARCH_BUTTON: 'header [aria-label="Поиск"]',
    LOCATION_BUTTON: 'header button[title="Выбор региона"]',
    LOGIN_BUTTON: 'header button:has-text("Войти")',
    USER_MENU: '[data-testid="user-menu"]',
    
    // Navigation
    NAVIGATION: 'header nav',
    NAV_ITEM: 'header nav a',
    NAV_ALL_EVENTS: 'header a[href="/moscow"]',
    NAV_CONCERTS: 'header a[href*="/concerts"]',
    NAV_THEATER: 'header a[href*="/theater"]',
    NAV_STANDUP: 'header a[href*="/standup"]',
    
    // Footer
    FOOTER: 'footer',
    
    // Common
    HERO_BANNER: '.hero-banner, [data-testid="hero-banner"]',
    EVENT_CARD: '[data-testid="event-card"], .event-card',
    EVENT_TITLE: '[data-testid="event-title"], .event-title',
    EVENT_DATE: '[data-testid="event-date"], .event-date',
    EVENT_PRICE: '[data-testid="event-price"], .event-price',
    
    // Modals
    AUTH_MODAL: '[data-testid="auth-modal"], .auth-modal',
    BOOKING_MODAL: '[data-testid="booking-modal"], .booking-modal'
} as const;