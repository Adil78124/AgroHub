# Инструкции по деплою AgroHub

## GitHub Pages

Для деплоя на GitHub Pages используется статический экспорт Next.js.

### Настройка

1. Убедитесь, что в `next.config.ts` включен `output: "export"`
2. Middleware временно отключен для статического экспорта
3. Используется `basePath` и `assetPrefix` для правильных путей

### Автоматический деплой

Проект автоматически деплоится при пуше в ветку `master` через GitHub Actions workflow `.github/workflows/github-pages-deploy.yml`.

### Ручной деплой

```bash
npm run build
# Файлы будут в папке ./out
```

## Vercel

Для деплоя на Vercel используется обычная сборка Next.js без статического экспорта.

### Настройка

1. Используйте `next.config.vercel.ts` для Vercel
2. Middleware включен для правильной работы интернационализации
3. Без `basePath` и `assetPrefix`

### Ручной деплой

```bash
npm run build:vercel
```

## Проблемы и решения

### GitHub Pages не открывается

1. Проверьте, что создан файл `.nojekyll` в корне
2. Убедитесь, что используется правильный `basePath`
3. Проверьте, что все ресурсы загружаются с правильными путями

### Vercel не работает

1. Убедитесь, что middleware включен
2. Проверьте конфигурацию интернационализации
3. Убедитесь, что не используется статический экспорт

## Структура файлов

- `next.config.ts` - конфигурация для GitHub Pages (статический экспорт)
- `next.config.vercel.ts` - конфигурация для Vercel (обычная сборка)
- `vercel.json` - конфигурация Vercel
- `.github/workflows/github-pages-deploy.yml` - GitHub Actions для GitHub Pages