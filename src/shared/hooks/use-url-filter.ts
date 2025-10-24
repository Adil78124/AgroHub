"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Режим навигации при изменении URL-параметров.
 *
 * - "replace": заменяет текущую запись истории (не добавляет новый шаг назад/вперёд).
 *   Подходит для фильтров/поиска с частыми обновлениями (дебаунс), чтобы не засорять историю.
 * - "push": добавляет новую запись в историю.
 *   Удобно, когда важно, чтобы пользователь мог вернуться к предыдущему состоянию по Back.
 */
type NavMode = "replace" | "push";

interface UseUrlFilterOptions {
  /**
   * Ключ пагинации.
   * По умолчанию: "page"
   */
  pageKey?: string;
  /**
   * Сбрасывать ли пагинацию при изменении параметров, отличных от pageKey.
   * По умолчанию: true
   */
  resetPageOnChange?: boolean;
  /**
   * Режим навигации при применении изменений к строке запроса.
   *
   * - "replace": обновляет текущий URL без добавления записи в историю браузера
   * - "push": создаёт новую запись в истории (кнопка Back вернёт предыдущее состояние)
   *
   * По умолчанию используется "replace".
   */
  mode?: NavMode;
  /**
   * Управлять скроллом при навигации.
   * По умолчанию: false
   */
  scroll?: boolean;
  /**
   * Значения по умолчанию для отсутствующих параметров (не записываются в URL)
   */
  defaults?: Record<string, string>;
  /**
   * Кастомная нормализация значений. Если вернёт undefined/пустую строку — параметр удаляется из URL
   */
  normalize?: (value: string | null | undefined) => string | null | undefined;
}

type UseUrlFilterMethods = {
  getParam: (key: string) => string | null;
  setParam: (key: string, value: string | null | undefined) => void;
  setMany: (entries: Record<string, string | null | undefined>) => void;
  /**
   * If called without arguments, removes all tracked keys.
   * If array of keys is provided, removes only those keys.
   */
  clearAll: (keysToDelete?: string[]) => void;
};

type UseUrlFilterReturn = UseUrlFilterMethods & Record<string, string | null>;

/**
 * Управляет URL-параметрами фильтров в Next.js App Router:
 * - Читает tracked-ключи и возвращает по ним `selected*`-значения.
 * - Обновляет один/несколько параметров (`setParam`, `setMany`).
 * - Очищает все отслеживаемые параметры (`clearAll`).
 * - Опционально сбрасывает пагинацию при изменении не-пагинационных параметров.
 *
 * @param keys - Ключи параметров, которые нужно отслеживать в URL (например, ["query", "role", "page"])
 * @param options - Опции поведения хука
 * @param options.pageKey - Ключ пагинации (по умолчанию "page")
 * @param options.resetPageOnChange - Сбрасывать ли пагинацию при изменении параметров, отличных от pageKey (по умолчанию true)
 * @param options.mode - Режим навигации при изменении параметров: "replace" или "push" (по умолчанию "replace")
 * @param options.scroll - Управлять скроллом при навигации (по умолчанию false)
 * @param options.defaults - Значения по умолчанию для отсутствующих параметров (не записываются в URL)
 * @param options.normalize - Кастомная нормализация значений. Если вернёт undefined/пустую строку — параметр удаляется из URL
 *
 * @returns Объект:
 * - selected* поля для каждого ключа из `keys` (например, selectedQuery, selectedRole, selectedPage)
 * - getParam(key): читает значение любого параметра из URL
 * - setParam(key, value): задаёт/удаляет один параметр
 * - setMany(entries): задаёт/удаляет несколько параметров за один проход
 * - clearAll(preserveKeys?): очищает все отслеживаемые параметры, кроме указанных в preserveKeys
 *
 * @example
 * // Базовое использование: поиск + роль + пагинация
 * const { selectedQuery, selectedRole, selectedPage, setParam, setMany, clearAll } =
 *   useUrlFilter(["query", "role", "page"], {
 *     defaults: { role: "all", page: "1" },
 *     resetPageOnChange: true, // изменение query/role сбрасывает page
 *     mode: "replace",
 *   });
 *
 * // Управление
 * setParam("query", "john");           // ?query=john
 * setParam("role", "admin");           // ?query=john&role=admin
 * setMany({ page: "2" });              // ?query=john&role=admin&page=2
 * clearAll();                          // удалит query/role/page
 *
 * @example
 * // Кастомная нормализация: не удалять "all", но удалять пустые строки
 * const filter = useUrlFilter(["status"], {
 *   normalize: (v) => {
 *     if (v == null) return undefined;
 *     const s = String(v).trim();
 *     return s === "" ? undefined : s; // пустые удалим, "all" оставим
 *   },
 * });
 *
 * @example
 * // Фильтрация товаров с сортировкой и категориями
 * const { selectedCategory, selectedSort, selectedPriceMin, selectedPriceMax, setParam, setMany } =
 *   useUrlFilter(["category", "sort", "priceMin", "priceMax"], {
 *     defaults: { sort: "name", category: "all" },
 *     resetPageOnChange: false, // не сбрасываем пагинацию при фильтрации
 *     mode: "push", // добавляем в историю браузера
 *   });
 *
 * // Применение фильтров
 * setParam("category", "electronics");     // ?category=electronics&sort=name
 * setMany({
 *   priceMin: "100",
 *   priceMax: "500",
 *   sort: "price"
 * });                                      // ?category=electronics&sort=price&priceMin=100&priceMax=500
 *
 * @example
 * // Управление состоянием таблицы с множественными фильтрами
 * const {
 *   selectedStatus,
 *   selectedDateFrom,
 *   selectedDateTo,
 *   selectedAssignee,
 *   clearAll
 * } = useUrlFilter(["status", "dateFrom", "dateTo", "assignee"], {
 *   pageKey: "offset", // кастомный ключ пагинации
 *   resetPageOnChange: true,
 *   defaults: { status: "active" },
 *   normalize: (value) => {
 *     // Кастомная логика: даты в формате YYYY-MM-DD, пустые значения удаляем
 *     if (!value || value === "all") return undefined;
 *     if (value.includes("-") && value.length === 10) return value; // валидная дата
 *     return value.trim() || undefined;
 *   },
 * });
 *
 * // Сброс всех фильтров кроме статуса
 * clearAll(["status"]); // оставит только ?status=active
 *
 * @example
 * // Поиск с автокомплитом и историей
 * const { selectedQ, selectedType, setParam } = useUrlFilter(["q", "type"], {
 *   mode: "push", // каждый поиск добавляется в историю
 *   scroll: true, // скроллим к началу при поиске
 *   defaults: { type: "users" },
 *   normalize: (value) => {
 *     // Минимум 2 символа для поиска, иначе удаляем параметр
 *     if (!value || typeof value !== "string") return undefined;
 *     const trimmed = value.trim();
 *     return trimmed.length >= 2 ? trimmed : undefined;
 *   },
 * });
 *
 * // Поиск с дебаунсом
 * const handleSearch = useDeferredValue(selectedQ);
 * useEffect(() => {
 *   if (handleSearch) {
 *     // выполняем поиск только когда есть минимум 2 символа
 *   }
 * }, [handleSearch]);
 */
export function useUrlFilter(
  keys: readonly string[],
  options: UseUrlFilterOptions = {}
): UseUrlFilterReturn {
  const {
    pageKey = "page",
    resetPageOnChange = true,
    mode = "replace",
    scroll = false,
    defaults = {},
    normalize = (v) => {
      const trimmed = typeof v === "string" ? v.trim() : v;
      if (!trimmed || trimmed === "all") return undefined;
      return trimmed;
    },
  } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: string): string | null => {
      const raw = searchParams.get(key);
      if (raw == null || raw === "") {
        const fallback = defaults[key];
        return fallback != null ? fallback : null;
      }
      return raw;
    },
    [searchParams, defaults]
  );

  const selectedValues = useMemo(() => {
    return keys.reduce((acc, key) => {
      const value = searchParams.get(key);
      acc[`selected${key.charAt(0).toUpperCase()}${key.slice(1)}`] =
        value == null || value === "" ? defaults[key] ?? null : value;
      return acc;
    }, {} as Record<string, string | null>);
  }, [keys, searchParams, defaults]);

  const commit = useCallback(
    (params: URLSearchParams) => {
      const nextQs = params.toString();
      const currentQs = searchParams.toString();
      if (nextQs === currentQs) return; // avoid redundant navigation triggering rerenders
      if (mode === "push") {
        router.push(nextQs ? `?${nextQs}` : "?", { scroll });
      } else {
        router.replace(nextQs ? `?${nextQs}` : "?", { scroll });
      }
    },
    [router, mode, scroll, searchParams]
  );

  const applyEntriesToParams = useCallback(
    (
      params: URLSearchParams,
      entries: Record<string, string | null | undefined>
    ): boolean => {
      let changedNonPage = false;
      for (const key of Object.keys(entries)) {
        const next = normalize(entries[key]);
        const isNonPage = key !== pageKey;
        if (next == null || next === "") {
          if (params.has(key)) {
            params.delete(key);
            if (isNonPage) changedNonPage = true;
          }
        } else if (params.get(key) !== next) {
          params.set(key, next);
          if (isNonPage) changedNonPage = true;
        }
      }
      return changedNonPage;
    },
    [normalize, pageKey]
  );

  const setMany = useCallback(
    (entries: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      const changedNonPage = applyEntriesToParams(params, entries);

      if (resetPageOnChange && changedNonPage && params.has(pageKey)) {
        params.delete(pageKey);
      }

      commit(params);
    },
    [searchParams, applyEntriesToParams, resetPageOnChange, pageKey, commit]
  );

  const setParam = useCallback(
    (key: string, value: string | null | undefined) =>
      setMany({ [key]: value }),
    [setMany]
  );

  const clearAll = useCallback(
    (keysToDelete?: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(keysToDelete) && keysToDelete.length > 0) {
        // Delete only listed keys
        for (const key of keysToDelete) {
          params.delete(key);
        }
      } else {
        // Delete all tracked keys
        for (const key of keys) {
          params.delete(key);
        }
      }
      if (resetPageOnChange && params.has(pageKey)) {
        params.delete(pageKey);
      }
      commit(params);
    },
    [keys, searchParams, pageKey, resetPageOnChange, commit]
  );

  return {
    ...selectedValues,
    getParam,
    setParam,
    setMany,
    clearAll,
  } as UseUrlFilterReturn;
}
