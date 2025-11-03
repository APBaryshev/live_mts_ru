const BASE_URLS = {
    BASE: process.env.BASE_URL || "https://live.mts.ru",
    API_BASE: process.env.API_BASE_URL || "https://live.mts.ru/api",
} as const;

export const URLS = {
    ...BASE_URLS,
    // Конкретные страницы
    HOME: BASE_URLS.BASE,
    CASHBACK: "${BASE_URLS.BASE}/moscow/collections/events_with_cashback",
    ELKI: "${BASE_URLS.BASE}/moscow/collections/elki",
    CONCERTS: "${BASE_URLS.BASE}/moscow/collections/concerts",
    MUSICALS: "${BASE_URLS.BASE}/moscow/collections/musicals",
    THEATER: "${BASE_URLS.BASE}/moscow/collections/theater",
    STANDUP: "${BASE_URLS.BASE}/moscow/collections/standup",
    KIDS: "${BASE_URLS.BASE}/moscow/collections/children",
    CINEMA: "${BASE_URLS.BASE}/kino/?productName=lkino&phoneNumber=mts_guest&cityName=moscow",
    MTS_LIVE_HALL: "${BASE_URLS.BASE}/moscow/venues/concert-hall/mts-live-kholl-moskva",
    PUSKINCARD: "${BASE_URLS.BASE}/moscow/collections/pushkin_card",
    GIFTCARD: "${BASE_URLS.BASE}/giftcard",
    SHOW: "${BASE_URLS.BASE}/moscow/collections/show",
    FESTIVALS: "${BASE_URLS.BASE}/moscow/collections/festivals",
    SPORT: "${BASE_URLS.BASE}/moscow/collections/sport",
    EXHIBITIONS: "${BASE_URLS.BASE}/moscow/collections/exhibitions",
    EXCURSIONS: "${BASE_URLS.BASE}/moscow/collections/excursions",
    LIFESTYLE: "${BASE_URLS.BASE}/lifestyle",
    LOGIN: "https://login.mts.ru",
    getCityUrl: (city: string = "moscow") => `${BASE_URLS.BASE}/${city}`,
    getCategoryUrl: (category: string, city: string = "moscow") => `${BASE_URLS.BASE}/${city}/collections/${category}`,
} as const;
