export const CONFIG = {
    // URL configuration
    BASE_URL: process.env.BASE_URL || "https://live.mts.ru",

    // Test user credentials
    TEST_USER: {
        PHONE: process.env.TEST_USER_PHONE || "+79991112233",
        PASSWORD: process.env.TEST_USER_PASSWORD || "test123",
    },

    // Playwright settings
    HEADLESS: process.env.HEADLESS !== "false", // true если не явно "false"
    SLOW_MO: parseInt(process.env.SLOW_MO || "0"),
    TIMEOUT: parseInt(process.env.TIMEOUT || "30000"),

    // CI settings
    CI: process.env.CI === "true",
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
} as const;
