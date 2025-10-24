# GitHub Actions Setup Guide

## 🔧 Настройка GitHub Actions для AgroHub

### 1. Секреты GitHub (Secrets)

Перейдите в настройки репозитория → Secrets and variables → Actions и добавьте следующие секреты:

#### Vercel Deployment
```
VERCEL_TOKEN - токен Vercel
VERCEL_ORG_ID - ID организации Vercel  
VERCEL_PROJECT_ID - ID проекта Vercel
```

#### Docker Hub
```
DOCKER_USERNAME - имя пользователя Docker Hub
DOCKER_PASSWORD - пароль Docker Hub
```

#### Production Server
```
PRODUCTION_HOST - IP адрес сервера
PRODUCTION_USER - имя пользователя сервера
PRODUCTION_SSH_KEY - приватный SSH ключ
```

#### Security & Coverage
```
SNYK_TOKEN - токен Snyk для сканирования безопасности
CODECOV_TOKEN - токен Codecov для покрытия кода
```

### 2. Workflow файлы

- **`.github/workflows/ci.yml`** - Continuous Integration
- **`.github/workflows/deploy.yml`** - Production Deployment  
- **`.github/workflows/docker.yml`** - Docker Build & Deploy

### 3. Автоматические действия

#### При push в master/main:
- ✅ Запуск тестов и линтинга
- ✅ Сборка Docker образа
- ✅ Деплой на Vercel
- ✅ Деплой на production сервер

#### При создании Pull Request:
- ✅ Проверка кода (ESLint, Prettier)
- ✅ TypeScript проверка
- ✅ Unit тесты с покрытием
- ✅ E2E тесты с Playwright
- ✅ Сканирование безопасности

### 4. Мониторинг

- **GitHub Actions** - статус CI/CD
- **Vercel Dashboard** - деплой статус
- **Docker Hub** - образы контейнеров
- **Codecov** - покрытие кода

### 5. Команды для локальной разработки

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Линтинг
npm run lint
npm run lint:fix

# Форматирование
npm run format
npm run format:check

# Тестирование
npm run test
npm run test:coverage
npm run test:e2e

# Сборка
npm run build

# Docker
npm run docker:build
npm run docker:run
```

### 6. Структура проекта

```
.github/
├── workflows/
│   ├── ci.yml          # CI/CD pipeline
│   ├── deploy.yml      # Production deployment
│   └── docker.yml      # Docker build & deploy
├── SETUP.md           # Этот файл
└── environment.yml    # Пример переменных окружения
```

### 7. Требования

- Node.js 18+
- Docker
- Vercel аккаунт
- Docker Hub аккаунт
- Production сервер с SSH доступом

### 8. Поддержка

При возникновении проблем проверьте:
- ✅ Все секреты настроены правильно
- ✅ Права доступа к репозиторию
- ✅ Статус GitHub Actions в разделе Actions
- ✅ Логи выполнения workflow
