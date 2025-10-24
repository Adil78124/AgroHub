@echo off
echo 🚀 Деплой на GitHub Pages...

echo 📦 Собираем проект...
call npm run build

if not exist "out" (
    echo ❌ Ошибка: папка out не создана
    pause
    exit /b 1
)

echo ✅ Сборка завершена успешно

echo 📁 Копируем файлы для GitHub Pages...

REM Создаем временную папку
if not exist "temp-deploy" mkdir temp-deploy

REM Копируем все файлы из out в temp-deploy
xcopy /E /I /Y out\* temp-deploy\

REM Перемещаем файлы из temp-deploy в корень
xcopy /E /I /Y temp-deploy\* .\

REM Удаляем временную папку
rmdir /S /Q temp-deploy

echo ✅ Файлы скопированы в корень проекта

REM Создаем .nojekyll файл для GitHub Pages
echo. > .nojekyll

echo ✅ Создан .nojekyll файл

echo 🎉 Готово! Теперь можно коммитить и пушить изменения:
echo git add .
echo git commit -m "Deploy to GitHub Pages"
echo git push origin master

pause
