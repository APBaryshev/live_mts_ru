// import { test, expect } from "@playwright/test";
// import { URLS } from "../../src/constants/urls";

// test.describe("Auth API Tests", () => {
//     test("should authenticate user with valid credentials", async ({ request }) => {
//         const response = await request.post(`${URLS.API_BASE}/auth/login`, {
//             data: {
//                 phone: "+79991112233",
//                 password: "test123",
//             },
//         });

//         expect(response.status()).toBe(200);

//         const responseBody = await response.json();
//         expect(responseBody).toHaveProperty("token");
//         expect(responseBody).toHaveProperty("user");
//         expect(responseBody.user).toHaveProperty("phone", "+79991112233");
//     });

//     test("should return error with invalid credentials", async ({ request }) => {
//         const response = await request.post(`${URLS.API_BASE}/auth/login`, {
//             data: {
//                 phone: "+79991112233",
//                 password: "wrongpassword",
//             },
//         });

//         expect(response.status()).toBe(401);

//         const responseBody = await response.json();
//         expect(responseBody).toHaveProperty("error");
//         expect(responseBody.error).toContain("Неверные учетные данные");
//     });

//     test("should return error with invalid phone format", async ({ request }) => {
//         const response = await request.post(`${URLS.API_BASE}/auth/login`, {
//             data: {
//                 phone: "invalid-phone",
//                 password: "test123",
//             },
//         });

//         expect(response.status()).toBe(400);
//     });

//     test("should refresh token successfully", async ({ request }) => {
//         // First login to get refresh token
//         const loginResponse = await request.post(`${URLS.API_BASE}/auth/login`, {
//             data: {
//                 phone: "+79991112233",
//                 password: "test123",
//             },
//         });

//         const { refreshToken } = await loginResponse.json();

//         // Refresh token
//         const refreshResponse = await request.post(`${URLS.API_BASE}/auth/refresh`, {
//             data: {
//                 refreshToken,
//             },
//         });

//         expect(refreshResponse.status()).toBe(200);
//         expect(await refreshResponse.json()).toHaveProperty("token");
//     });
// });

// test.describe("Events API Tests", () => {
//     test("should fetch events list", async ({ request }) => {
//         const response = await request.get(`${URLS.API_BASE}/events`);

//         expect(response.status()).toBe(200);

//         const events = await response.json();
//         expect(Array.isArray(events)).toBe(true);

//         if (events.length > 0) {
//             const event = events[0];
//             expect(event).toHaveProperty("id");
//             expect(event).toHaveProperty("title");
//             expect(event).toHaveProperty("date");
//             expect(event).toHaveProperty("price");
//         }
//     });

//     test("should fetch event by id", async ({ request }) => {
//         const response = await request.get(`${URLS.API_BASE}/events/123`);

//         // Event might not exist, but API should respond properly
//         expect([200, 404]).toContain(response.status());

//         if (response.status() === 200) {
//             const event = await response.json();
//             expect(event).toHaveProperty("id", 123);
//         }
//     });

//     test("should search events by query", async ({ request }) => {
//         const response = await request.get(`${URLS.API_BASE}/events?search=концерт`);

//         expect(response.status()).toBe(200);

//         const events = await response.json();
//         expect(Array.isArray(events)).toBe(true);
//     });
// });
