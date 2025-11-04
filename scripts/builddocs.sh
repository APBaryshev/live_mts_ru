#!/bin/bash

echo "Building MTS Live documentation..."

# Создаем виртуальное окружение
python3 -m venv venv
source venv/bin/activate

# Устанавливаем зависимости
pip install --upgrade pip
pip install mkdocs mkdocs-material pymdown-extensions

# Собираем документацию
mkdocs build --site-dir public/docs

# Копируем landing page (теперь без отдельного CSS)
cp docs/landing.html public/index.html

echo "Documentation built successfully!"