image.pngl Architecture для Next.js 13+ (App Router)

Этот репозиторий — эталон реализации «Crystal Architecture» для Next.js 13+ с App Router. Архитектура делает проект модульным, предсказуемым и масштабируемым: каждая функциональность изолирована в собственном модуле внутри `src/modules/`, общие части — в `src/shared/`.

### Оглавление

- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Как создать новый модуль](#как-создать-новый-модуль)
- [Импорты и код-стайл](#импорты-и-код-стайл)
- [Тестирование (Vitest, RTL, Playwright)](#тестирование-vitest-rtl-playwright)
- [Работа с API (orval, axios, react-query)](#работа-с-api-orval-axios-react-query)
- [Локализация](#локализация)
- [UI: shadcn/ui](#ui-shadcnui)
- [Баррели (barrelsby)](#баррели-barrelsby)
- [Storybook](#storybook)
- [Пример использования модуля](#пример-использования-модуля)
- [Требования к качеству](#требования-к-качеству)
- [Полезные ссылки](#полезные-ссылки)

### Ключевые принципы

- **Модульность**: всё, что относится к фиче, живёт в её модуле.
- **Изоляция слоёв**: UI-компоненты (тупые), виджеты (умные), схемы/типы, хуки, стейт, утилиты — раздельно.
- **Переиспользуемость**: общие блоки — в `src/shared/`.
- **Тестируемость**: тесты рядом с кодом, e2e — в `tests/e2e`.
- **Соблюдение правил качества**: ESLint + Prettier, импорт-ордера, JSDoc для публичных API.

---

## Быстрый старт

1. Установить зависимости и запустить дев-сервер

```bash
pnpm install
pnpm dev
# Откройте http://localhost:3000
```

Полезные скрипты:

```bash
# Линтер
pnpm lint

# Тесты (Vitest)
pnpm test           # интерактивно
pnpm test:run       # один прогон
pnpm test:coverage  # покрытие

# E2E (Playwright)
pnpm test:e2e
pnpm test:e2e:ui

# Storybook
pnpm storybook
pnpm build-storybook

# Генерация API-клиента (orval)
pnpm orval
```

---

## Структура проекта

```
src/
├── app/                     # Next.js App Router
├── modules/                 # Модули (фичи)
│   └── {moduleName}/
│       ├── ui/
│       │   ├── components/  # Тупые компоненты (только пропсы)
│       │   └── widgets/     # Умные компоненты (связь с логикой)
│       ├── schemas/         # Zod-схемы, DTO, типы
│       ├── utils/           # Утилиты модуля
│       ├── hooks/           # Кастомные хуки модуля
│       ├── constants/       # Константы, словари, enum’ы
│       ├── model/           # Состояние (zustand/jotai/redux)
│       └── index.ts         # Публичный API модуля
├── shared/                  # Общие части
│   ├── ui/                  # Шердовые UI-компоненты
│   ├── utils/               # Утилиты
│   ├── hooks/               # Общие хуки
│   ├── constants/           # Глобальные константы
│   ├── config/              # Глобальные конфиги (env, api)
│   └── lib/                 # Адаптеры библиотек (axios, react-query и т.п.)
└── styles/                  # Глобальные стили

tests/
└── e2e/                     # End-to-End тесты (Playwright)
```

Посмотреть полноценный пример можно в модуле `src/modules/users/`.

---

## Как создать новый модуль

1. Создайте структуру каталога:

```
src/modules/profile/
├── ui/
│   ├── components/
│   └── widgets/
├── schemas/
├── utils/
├── hooks/
├── constants/
├── model/
└── index.ts
```

2. Экспортируйте публичный API в `index.ts` модуля:

```ts
// src/modules/profile/index.ts
export * from "./ui/components/ProfileCard/ProfileCard";
export * from "./ui/widgets/ProfileWidget/ProfileWidget";
export * from "./hooks/useProfile";
export * from "./schemas/profile.schema";
```

3. Следуйте правилам слоёв:

- **components/**: только представление, принимают пропсы, могут иметь локальный стейт/эффекты, но без бизнес-логики.
- **widgets/**: связывают UI с логикой: обращения к API, использование хранилищ/хуков.
- **hooks/**: переиспользуемая логика, асинхронные операции, работа с API и кешем.
- **utils/**: чистые функции без побочных эффектов.
- **schemas/**: Zod-схемы валидации, DTO, типы, экспортируемые наружу.
- **model/**: состояние модуля (zustand/jotai/redux), не экспортируйте детали реализации напрямую.

4. Тесты кладите рядом с кодом в `__tests__/`:

```
src/modules/profile/ui/components/ProfileCard/__tests__/ProfileCard.test.tsx
src/modules/profile/hooks/__tests__/useProfile.test.ts
src/modules/profile/utils/__tests__/formatName.test.ts
```

Названия `describe/it/test` — только на русском.

---

## Импорты и код-стайл

Порядок импортов (ESLint):

1. Внешние библиотеки (React, Next.js и т.п.)
2. Внутренние алиасы (`@/shared`, `@/modules`)
3. Относительные импорты (`./`, `../`)
4. Типы — отдельными импортами

Пример:

```ts
import React from "react";
import { NextRequest } from "next/server";
import { z } from "zod";

import { Button } from "@/shared/ui";
import { useUser } from "@/modules/users/hooks";

import { UserCard } from "./UserCard";
import type { UserCardProps } from "./types";
```

### JSDoc (обязательно для публичных функций/хуков и сложных утилит)

```ts
/**
 * Короткое описание функции
 *
 * @param paramName - Описание параметра
 * @returns Описание результата
 * @throws {ErrorType} Когда возникает ошибка
 * @example
 * const result = fn(param);
 */
```

---

## Тестирование (Vitest, RTL, Playwright)

- Unit/Component/Integration-тесты — рядом с кодом в `__tests__/`, имя файла `*.test.ts(x)`.
- E2E — в `tests/e2e` (Playwright).
- Инструменты: Vitest, React Testing Library, Playwright.
- Все названия в тестах — на русском.

Скрипты:

```bash
pnpm test           # интерактивные тесты (Vitest)
pnpm test:run       # один прогон
pnpm test:coverage  # покрытие
pnpm test:e2e       # e2e-тесты
```

### TDD

1. Сначала пишем тесты (ожидаемое поведение).
2. Реализуем код до «зелёного» состояния.
3. Запускаем всё (включая линтер), чиним замечания.
4. Повторяем при добавлении новой функциональности.

---

## Работа с API (orval, axios, react-query)

- Генерация типов и клиента: `pnpm orval` — конфигурация в `orval.config.js`.
- HTTP-клиент и инстансы — в `src/shared/lib/client/`.
- Рекомендуем выносить запросы в хуки модуля (например, `useUser`).

Пример использования (из модуля `users`):

```ts
import { UserCard, useUser } from "@/modules/users";

const { updateUser, isUpdating } = useUser(userId);
```

---

## Локализация

Проект использует `next-intl`. Настройки маршрутизации/локалей лежат в `src/shared/configs/i18/`. Добавляйте новые ключи в соответствующие файлы `messages/*.json`.

---

## Storybook

Запуск: `pnpm storybook`. Компоненты в `ui/components` должны иметь сториз. Это помогает документировать API и упростить визуальное тестирование.

---

## Пример использования модуля

```tsx
// Импорт из публичного API модуля
import { UserCard, useUser, User } from "@/modules/users";

// Компонент
<UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />;

// Хук
const { updateUser, isUpdating } = useUser(userId);
```

---

## Требования к качеству

- ESLint + Prettier обязательны, не допускаются неиспользуемые импорты/переменные.
- Типизация без `any`, используйте конкретные типы/встроенные типы из Zod.
- Асинхронные операции с обработкой ошибок.
- Доступность (A11y) для UI-компонентов: семантические теги, aria-атрибуты.

---

## Полезные ссылки

- Next.js — `https://nextjs.org/docs`
- Vitest — `https://vitest.dev/`
- React Testing Library — `https://testing-library.com/docs/react-testing-library/intro/`
- Playwright — `https://playwright.dev/`
- Zod — `https://zod.dev/`
- Orval — `https://orval.dev/`

---

## UI: shadcn/ui

Проект использует библиотеку компонентов shadcn/ui на базе Tailwind CSS v4.

- **Инициализация (уже выполнено):**

  - Конфигурация хранится в `components.json`.
  - Tailwind подключён в `src/styles/globals.css`.
  - Алиасы настроены на `src/shared`.

- **Пути и алиасы (components.json):**

  - `components`: `@/shared/components`
  - `ui`: `@/shared/components/ui`
  - `utils`: `@/shared/lib/utils`

- **Где лежат компоненты:** `src/shared/components/ui/*`

- **Добавление компонентов:**

  - Командой:
    ```bash
    pnpx shadcn@latest add {component}
    ```
  - Примеры:
    ```bash
    pnpx shadcn@latest add input label card
    pnpx shadcn@latest add dialog dropdown-menu select
    ```

- **Уже добавлено:** `button`, `accordion` и набор базовых компонентов (form, input/label, card, dialog, dropdown-menu, select, табы и др.). Если потребуется — добавляйте точечно любой недостающий компонент той же командой.

- **Импорт в коде:**

  ```tsx
  import { Button } from "@/shared/components/ui/button";
  import { Accordion, AccordionItem } from "@/shared/components/ui/accordion";
  ```

- **Замечание по toast:** компонент `toast` помечен как устаревший у shadcn/ui. Рекомендуется использовать `sonner`.

- **ESLint для shared:** правило сортировки импортов `simple-import-sort/imports` отключено для `src/shared/**/*.{ts,tsx}`.

- **Документация:** `https://ui.shadcn.com/`

---

## Баррели (barrelsby)

Для автоматической генерации файла с реэкспортами компонентов (`index.tsx`) используем `barrelsby`.

- **Где генерируем:** `src/shared/components/ui/index.tsx`
- **Команда:**
  ```bash
  pnpx barrelsby \
    --directory src/shared/components/ui \
    --delete \
    --barrelName index.tsx \
    --structure flat \
    --exclude index
  ```

Пояснения:

- **--delete**: удаляет старые баррели перед генерацией
- **--barrelName index.tsx**: имя файла-барреля
- **--structure flat**: плоская структура реэкспортов из текущей директории
- **--exclude index**: не реэкспортировать сам файл `index.*`

После генерации можно импортировать компоненты так:

```ts
import { Button, Card } from "@/shared/components/ui";
```

### Примеры команд

- Сгенерировать точь‑в‑точь как текущий `@index.ts` (только именованные экспорты, без default):

  ```bash
  pnpx barrelsby \
    --directory src/shared/components/ui \
    --delete \
    --barrelName index.ts \
    --structure flat \
    --exclude index \
    --no-default-exports
  ```

- Сгенерировать `index.tsx` с default‑экспортами ПЛЮС именованными:

  ```bash
  pnpx barrelsby \
    --directory src/shared/components/ui \
    --delete \
    --barrelName index.tsx \
    --structure flat \
    --exclude index \
    --exportDefault
  ```

- Иерархическая структура по подпапкам (filesystem):

  ```bash
  pnpx barrelsby \
    --directory src/shared/components \
    --delete \
    --barrelName index.ts \
    --structure filesystem \
    --exclude index
  ```

- Для другого каталога (например, компоненты модуля users):

  ```bash
  pnpx barrelsby \
    --directory src/modules/users/ui/components \
    --delete \
    --barrelName index.ts \
    --structure flat \
    --exclude index
  ```

- Исключить сториз и тесты:

  ```bash
  pnpx barrelsby \
    --directory src/shared/components/ui \
    --delete \
    --barrelName index.ts \
    --structure flat \
    --exclude "**/*.stories.*" "**/__tests__/**" index
  ```

- Удобный npm‑скрипт:
  Добавьте в `package.json`:
  ```json
  {
    "scripts": {
      "barrels:ui": "barrelsby --directory src/shared/components/ui --delete --barrelName index.ts --structure flat --exclude index --no-default-exports"
    }
  }
  ```
  И запускайте:
  ```bash
  pnpm barrels:ui
  ```
