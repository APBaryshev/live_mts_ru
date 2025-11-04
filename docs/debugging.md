# 🐛 Методы отладки и troubleshooting

> [!TIP]
> Этот файл содержит общие методики отладки для проекта MTS Live Autotests.

## 🚀 Быстрый старт отладки

### 1. Playwright Inspector

```bash
# Запуск теста с дебаггером
npx playwright test --debug

# UI режим для визуальной отладки
npx playwright test --ui

# Дебаг конкретного файла
npx playwright test example.spec.ts --debug
```

### 2. Trace Viewer

```bash
# Просмотр trace после падения теста
npx playwright show-trace trace.zip

# Включение trace в конфиге
export default defineConfig({
  use: {
    trace: 'on-first-retry',
  },
});
```

## 🔍 Диагностика распространенных проблем

### Timeout Errors

**Симптомы**: Timeout 30000ms exceeded  

**Решение**:

```typescript
// Явные ожидания вместо глобальных таймаутов
await page.waitForSelector('.selector', { 
  timeout: 10000,
  state: 'visible'
});

// Ожидание загрузки DOM
await page.waitForLoadState('domcontentloaded');

// Кастомные ожидания для конкретных элементов
await expect(page.locator('[data-testid="event-card"]')).toBeVisible();
```

### Element Not Found

**Симптомы**: Error: Element not found  

**Решение**:

```typescript
// Использовать стабильные data-атрибуты
await page.locator('[data-testid="event-card"]').click();
await page.locator('[data-role="buy-button"]').click();

// Поиск по тексту с точным match
await page.locator('button:has-text("Купить билет")').click();

// Поиск внутри конкретного контейнера
await page.locator('.events-list [data-testid="event-card"]').first().click();

// Сделать скриншот для отладки
await page.screenshot({ path: 'debug-element.png' });
```

### Flaky Tests (нестабильные тесты)

**Симптомы**: Тест то проходит, то нет  

**Решение**:

```typescript
// Ретрии для нестабильных операций
async function clickWithRetry(locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await locator.click();
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(1000);
    }
  }
}

// Ожидание стабильного состояния
await page.waitForFunction(() => {
  return document.readyState === 'complete';
});
```

### API Testing Issues

**Симптомы**: Проблемы с API запросами  

**Решение**:

```typescript
// Mock данных для стабильности
await page.route('**/api/events', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ events: mockEvents })
  });
});

// Проверка API ответов
const response = await page.waitForResponse('**/api/events');
expect(response.status()).toBe(200);
const events = await response.json();
expect(events).toHaveLength(10);
```

## 📊 Инструменты мониторинга

### Allure Reports

```bash
# Генерация отчетов
allure generate allure-results --clean

# Локальный просмотр
allure serve allure-results
```

### Performance Metrics

```typescript
// Замер времени загрузки
test('page load performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // Меньше 3 секунд
});
```

## 🛠️ Продвинутая отладка

### Console Logging

```typescript
// Логирование network запросов
page.on('request', request => {
  console.log('>>', request.method(), request.url());
});

page.on('response', response => {
  console.log('<<', response.status(), response.url());
});

// Логирование ошибок браузера
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('Browser Error:', msg.text());
  }
});
```

### Custom Wait Helpers

```typescript
// Кастомные helper функции
async function waitForElementVisible(selector, timeout = 10000) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  return element;
}

async function waitForNetworkIdleCustom(timeout = 5000) {
  await page.waitForTimeout(timeout);
}
```

### Visual Testing

```typescript
// Визуальная проверка элементов
await expect(page.locator('.hero-section')).toHaveScreenshot('hero.png');

// Проверка всего экрана
await expect(page).toHaveScreenshot('homepage.png');
```

## 🆘 Экстренные случаи

### Тесты постоянно падают

```bash
# Запустить только smoke тесты
npx playwright test tests/smoke/

# Запуск с подробным логированием
npx playwright test --verbose

# Запуск с замедлением для отладки
npx playwright test --slowMo=1000
```

### Проблемы с селекторами

```typescript
// Временное решение - поиск по разным селекторам
const element = page.locator('[data-testid="buy-button"], .buy-btn, button:has-text("Купить")').first();
await element.click();
```

### Проблемы с окружением

```bash
# Очистка кэша Playwright
npx playwright clear-cache

# Переустановка браузеров
npx playwright install
```

## 📋 Чеклист отладки

- Проверить актуальность селекторов через DevTools

- Запустить тесты с --headed для визуальной проверки

- Проверить логи в браузере через page.on('console')

- Убедиться что данные на сайте не изменились

- Проверить network запросы через Trace Viewer

- Использовать data-testid атрибуты вместо CSS классов

- Проверить наличие элементов перед действиями

>[!NOTE]
>Основные принципы проекта:
>
>- Используем domcontentloaded вместо networkidle
>
>- Явные ожидания элементов вместо глобальных таймаутов
>
>- Стабильные data-атрибуты вместо CSS селекторов
>
>- Retry только для нестабильных операций
