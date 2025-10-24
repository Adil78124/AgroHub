# Инструкции по деплою

## Варианты деплоя

### 1. Vercel (Рекомендуется)
Для деплоя на Vercel:

1. Создайте аккаунт на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub репозиторий
3. Добавьте секреты в GitHub:
   - `VERCEL_TOKEN` - токен из Vercel
   - `VERCEL_ORG_ID` - ID организации
   - `VERCEL_PROJECT_ID` - ID проекта
4. Используйте workflow `.github/workflows/vercel-deploy.yml`

### 2. GitHub Pages
Для деплоя на GitHub Pages:

1. Включите GitHub Pages в настройках репозитория
2. Выберите источник "GitHub Actions"
3. Используйте workflow `.github/workflows/nextjs-deploy.yml`

### 3. Netlify
Для деплоя на Netlify:

1. Создайте аккаунт на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий
3. Настройте:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

## Настройка секретов в GitHub

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте необходимые секреты для выбранного провайдера

## Текущие workflow'ы

- `main-deploy.yml` - базовая сборка и тестирование
- `vercel-deploy.yml` - деплой на Vercel
- `nextjs-deploy.yml` - деплой на GitHub Pages
- `ci.yml` - непрерывная интеграция
- `docker.yml` - сборка Docker образа
