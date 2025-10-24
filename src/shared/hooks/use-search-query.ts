"use client";

import { useEffect, useMemo, useState } from "react";
import { useUrlFilter } from "@/shared/hooks/use-url-filter";

interface UseSearchQuery {
  delay?: number;
  searchKey: string;
  deleteKeys?: string[];
}

export const useSearchQuery = ({
  delay = 500,
  searchKey = "query",
  deleteKeys,
}: UseSearchQuery) => {
  const keys = useMemo(
    () => [searchKey, ...(deleteKeys ?? [])],
    [searchKey, deleteKeys]
  );

  const { getParam, setMany } = useUrlFilter(keys, {
    resetPageOnChange: true,
    mode: "replace",
  });

  const initialQuery = getParam(searchKey) ?? "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed) {
        const entries: Record<string, string | null | undefined> = {
          [searchKey]: trimmed,
        };
        if (deleteKeys && deleteKeys.length > 0) {
          for (const key of deleteKeys) {
            entries[key] = undefined; // удаляем сопряжённые ключи при поиске
          }
        }
        setMany(entries);
      } else {
        setMany({ [searchKey]: undefined });
      }
      setDebouncedQuery(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, setMany, searchKey, deleteKeys]);

  return {
    inputValue,
    setInputValue,
    debouncedQuery,
  };
};
