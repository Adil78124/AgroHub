import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names with intelligent deduplication.
 *
 * @param inputs - Список значений классов (строки, объекты, массивы)
 * @returns Объединённая строка классов без конфликтов
 * @example
 * cn("p-2", { hidden: true }, ["text-sm", false && "text-lg"]) // => "p-2 hidden text-sm"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
