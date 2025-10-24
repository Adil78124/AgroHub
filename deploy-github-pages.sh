#!/bin/bash

# Скрипт для деплоя на GitHub Pages

echo "🚀 Начинаем деплой на GitHub Pages..."

# Сборка проекта
echo "📦 Собираем проект..."
npm run build

# Проверяем, что сборка прошла успешно
if [ ! -d "out" ]; then
    echo "❌ Ошибка: папка out не создана"
    exit 1
fi

echo "✅ Сборка завершена успешно"

# Копируем содержимое папки out в корень для GitHub Pages
echo "📁 Копируем файлы для GitHub Pages..."

# Создаем временную папку
mkdir -p temp-deploy

# Копируем все файлы из out в temp-deploy
cp -r out/* temp-deploy/

# Перемещаем файлы из temp-deploy в корень
cp -r temp-deploy/* ./

# Удаляем временную папку
rm -rf temp-deploy

echo "✅ Файлы скопированы в корень проекта"

# Создаем .nojekyll файл для GitHub Pages
touch .nojekyll

echo "✅ Создан .nojekyll файл"

echo "🎉 Готово! Теперь можно коммитить и пушить изменения:"
echo "git add ."
echo "git commit -m 'Deploy to GitHub Pages'"
echo "git push origin master"
