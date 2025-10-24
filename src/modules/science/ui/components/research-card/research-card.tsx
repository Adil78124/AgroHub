"use client";

import { BarChart3, Clock, FileText, Lock, Mountain, Star } from "lucide-react";
import React from "react";

import { Button } from "@/shared/components/ui";
import { Badge } from "@/shared/components/ui";

import type { Research } from "../../../schemas/research.schema";

/**
 * Иконки для категорий исследований
 */
const categoryIcons = {
  Растениеводство: Mountain,
  Животноводство: BarChart3,
  Маркетинг: Clock,
  Аналитика: FileText,
} as const;

/**
 * Пропсы компонента ResearchCard
 */
export interface ResearchCardProps {
  research: Research;
  onPurchase?: (research: Research) => void;
  className?: string;
}

/**
 * Компонент карточки исследования для каталога
 *
 * @param root0 - Пропсы компонента
 * @param root0.research - Данные исследования для отображения
 * @param root0.onPurchase - Обработчик покупки исследования
 * @param root0.className - Дополнительные CSS классы
 * @returns JSX элемент карточки исследования
 */
export const ResearchCard: React.FC<ResearchCardProps> = ({
  research,
  onPurchase,
  className = "",
}) => {
  const CategoryIcon =
    categoryIcons[research.category as keyof typeof categoryIcons] || FileText;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "KZT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePurchase = () => {
    onPurchase?.(research);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow ${className}`}
    >
      {/* Заголовок карточки */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CategoryIcon className="w-3 h-3" />
            {research.category}
          </Badge>
        </div>
        {research.isPremium && (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-orange-100 text-orange-800 border-orange-200"
          >
            <Star className="w-3 h-3" />
            Премиум
          </Badge>
        )}
      </div>

      {/* Цена и количество страниц */}
      <div className="mb-3">
        <div className="text-2xl font-semibold text-green-600 mb-1">
          {formatPrice(research.price)}
        </div>
        <div className="text-sm text-gray-500">{research.pages} страниц</div>
      </div>

      {/* Заголовок исследования */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
        {research.title}
      </h3>

      {/* Описание */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {research.description}
      </p>

      {/* Дата публикации */}
      <div className="text-sm text-gray-500 mb-4">
        Опубликовано: {research.publishedAt}
      </div>

      {/* Статус покупки */}
      {research.requiresPurchases && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Lock className="w-4 h-4" />
          Требует покупки
        </div>
      )}

      {/* Кнопка покупки */}
      <Button
        onClick={handlePurchase}
        className="w-full flex items-center justify-center gap-2"
        disabled={!research.requiresPurchases}
      >
        <Lock className="w-4 h-4" />
        Купить исследование за {formatPrice(research.price)}
      </Button>
    </div>
  );
};
