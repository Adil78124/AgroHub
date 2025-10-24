# GitHub Pages Setup Guide

## 🚀 Настройка автоматического деплоя на GitHub Pages

### 1. Настройки репозитория

1. Перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Сохраните настройки

### 2. Workflow файлы

- **`.github/workflows/github-pages.yml`** - автоматический деплой на GitHub Pages
- **`.github/workflows/ci.yml`** - проверки кода
- **`.github/workflows/deploy.yml`** - деплой на Vercel
- **`.github/workflows/docker.yml`** - Docker сборка

### 3. Автоматические действия

#### При push в master:
- ✅ **Сборка** Next.js приложения
- ✅ **Экспорт** статических файлов
- ✅ **Деплой** на GitHub Pages
- ✅ **URL**: `https://adil78124.github.io/AgroHub/`

#### При создании Pull Request:
- ✅ **Проверка кода** (ESLint, Prettier, TypeScript)
- ✅ **Тестирование** (Unit, E2E)
- ✅ **Сборка** для проверки

### 4. Настройки Next.js

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",           // Статический экспорт
  trailingSlash: true,        // Трейлинг слэши
  images: {
    unoptimized: true         // Неоптимизированные изображения
  },
  basePath: '/AgroHub',       // Базовый путь для GitHub Pages
  assetPrefix: '/AgroHub/',   // Префикс для ассетов
};
```

### 5. Структура деплоя

```
.github/
├── workflows/
│   ├── github-pages.yml     # GitHub Pages деплой
│   ├── ci.yml              # CI/CD проверки
│   ├── deploy.yml          # Vercel деплой
│   └── docker.yml          # Docker сборка
└── ISSUE_TEMPLATE/
    └── github-pages-setup.md # Этот файл
```

### 6. Мониторинг

- **GitHub Actions** - статус сборки и деплоя
- **GitHub Pages** - статус публикации сайта
- **URL сайта**: https://adil78124.github.io/AgroHub/

### 7. Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Экспорт статических файлов
npm run export
```

### 8. Требования

- Node.js 18+
- Next.js 13+ (App Router)
- GitHub Actions
- GitHub Pages

### 9. Поддержка

При возникновении проблем:
- ✅ Проверьте статус в разделе **Actions**
- ✅ Убедитесь, что настройки **Pages** корректны
- ✅ Проверьте логи выполнения workflow
- ✅ Убедитесь, что все тесты проходят
