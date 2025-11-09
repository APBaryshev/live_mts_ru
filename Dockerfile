FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Установка Java для Allure
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
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
COPY . .

# Команда по умолчанию - ТОЛЬКО тесты
CMD ["npx", "playwright", "test", "--reporter=line,allure-playwright,html"]