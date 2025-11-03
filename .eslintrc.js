module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "playwright"],
    extends: ["eslint:recommended", "@typescript-eslint/recommended"],
    env: {
        node: true,
        es2022: true,
    },
    rules: {
        // TypeScript правила
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",

        // Playwright правила
        "playwright/no-wait-for-timeout": "error",
        "playwright/no-networkidle": "error",
        "playwright/prefer-web-first-assertions": "error",
        "playwright/no-element-handle": "error",

        // Общие правила
        "prefer-const": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-template": "error",
    },
    overrides: [
        {
            files: ["tests/**/*.ts"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
    ],
};
