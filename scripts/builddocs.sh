#!/bin/bash

echo "🔨 Building MTS Live documentation..."

# Устанавливаем зависимости
pip install mkdocs mkdocs-material pymdown-extensions

# Собираем документацию
mkdocs build --site-dir public

echo "✅ Documentation built successfully!"