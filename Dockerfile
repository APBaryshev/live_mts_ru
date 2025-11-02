# Используем официальный образ Playwright для Node.js
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Установка Java для Allure
RUN apt-get update && \
    apt-get install -y openjdk-17-jre && \
    rm -rf /var/lib/apt/lists/*

# Установка Allure CLI
RUN npm install -g allure-commandline

# Рабочая директория
WORKDIR /app

# Копируем package files
COPY package*.json ./
COPY playwright.config.ts ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY src/ ./src/
COPY tests/ ./tests/

# Создание директорий для отчетов
RUN mkdir -p allure-results allure-report playwright-report test-results

# Команда по умолчанию
CMD ["sh", "-c", "\
    echo 'Running tests...' && \
    npx playwright test --reporter=line,allure-playwright && \
    echo 'Generating Allure report...' && \
    allure generate allure-results -o allure-report --clean && \
    echo 'Allure report generated in ./allure-report'"]