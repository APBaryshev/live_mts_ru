# 🔌 API документация

## Базовый URL

Пример: `https://live.mts.ru/api`

```text
## Endpoints

### Авторизация
**POST** `/auth/login`

```typescript
// Request
{
  "phone": "+79991112233",
  "password": "password"
}

// Response
{
  "token": "jwt_token",
  "user": { ... }
}
```

## Получение мероприятий

GET `/events`

Параметры:

- `category` - категория мероприятия

- `city` - город

- `date` - дата проведения

- `limit` - лимит результатов

## Поиск мероприятий

GET `/events/search`

Параметры:

- `query` - поисковый запрос

- `filters` - дополнительные фильтры

## Примеры использования

### TypeScript

```typescript
import { test } from '@playwright/test';

test('API авторизация', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: {
      phone: process.env.TEST_USER_PHONE,
      password: process.env.TEST_USER_PASSWORD
    }
  });
  
  expect(response.status()).toBe(200);
});
```

### JavaScript

```javascript
const { test } = require('@playwright/test');

test('Получение списка мероприятий', async ({ request }) => {
  const response = await request.get('/api/events');
  expect(response.status()).toBe(200);
  
  const events = await response.json();
  expect(events.length).toBeGreaterThan(0);
});
```

### Ошибки API

|Код| Описание|
|---|---|
|400|Неверный запрос|
|401|Неавторизован|
|403|Доступ запрещен|
|404|Ресурс не найден|
|429|Слишком много запросов|
|500|Внутренняя ошибка сервера|

>[!CAUTION]
>Ограничения API:
>
>- Максимум 100 запросов в минуту
>
>- Используйте корректные тестовые данные
