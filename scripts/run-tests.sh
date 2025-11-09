#!/bin/bash

echo "🚀 Building and running MTS Live tests in Docker..."

# Сборка образа
docker build -t mts-live-tests:latest .

# Запуск тестов
echo "📊 Running tests..."
docker run --rm \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  mts-live-tests:latest

# Генерация отчета Allure
echo "📈 Generating Allure report..."
docker run --rm \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  mts-live-tests:latest \
  allure generate allure-results -o allure-report --clean

echo "✅ Tests completed!"
echo "📊 Allure report: file://$(pwd)/allure-report/index.html"
echo "🎭 Playwright report: file://$(pwd)/playwright-report/index.html"