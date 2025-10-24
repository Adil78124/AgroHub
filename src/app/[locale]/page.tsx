"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card } from "@/shared/components/ui";
import { Link } from "@/shared/configs/i18/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <SolutionsBlock />
      <RegionStats />
      <AnalyticsSection />
      {/* <ImageSection /> */}
      <PartnersSection />
    </div>
  );
}

function HeroSlider() {
  const t = useTranslations();

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      slidesPerView={1}
      spaceBetween={16}
      initialSlide={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className="w-full"
    >
      <SwiperSlide>
        <ServiceBlock
          img="/main/field.png"
          title={t("service.title")}
          text={t("service.text")}
          primary={t("service.primary")}
          secondary={t("service.secondary")}
        />
      </SwiperSlide>

      <SwiperSlide>
        <HeroBlock
          title={t("hero.title")}
          text={t("hero.text")}
          img="/main/map.png"
          btnStats={t("hero.btnStats")}
          btnService={t("hero.btnService")}
        />
      </SwiperSlide>

      {/* <SwiperSlide>
        <MarketBlock
          title={t("market.title")}
          subtitle={t("market.subtitle")}
          text={t("market.text")}
          primary={t("market.primary")}
          secondary={t("market.secondary")}
        />
      </SwiperSlide> */}
    </Swiper>
  );
}

function HeroBlock({
  title,
  text,
  img,
  btnStats,
  btnService,
}: {
  title: string;
  text: string;
  img: string;
  btnStats: string;
  btnService: string;
}) {
  return (
    <section className="py-8 sm:py-12 bg-gray-50 min-h-[56vh] sm:min-h-[64vh] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            {text}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              aria-label={btnStats}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-gray-800 text-white hover:opacity-90 active:opacity-100 transition"
            >
              {btnStats}
            </button>
            {/* <button
              type="button"
              aria-label={btnService}
              className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-800 text-gray-800 hover:bg-gray-100 transition"
            >
              {btnService}
            </button> */}
          </div>
        </div>

        <div className="relative w-full h-56 sm:h-72 lg:h-[420px]">
          <Image
            src={img}
            alt=""
            fill
            priority
            className="object-contain"
            sizes="(min-width:1024px) 520px, (min-width:640px) 60vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({
  img,
  title,
  text,
  primary,
  secondary,
  reverse = false,
}: {
  img: string;
  title: string;
  text: string;
  primary: string;
  secondary?: string;
  reverse?: boolean;
}) {
  // Привязка кнопки к целевой странице по заголовку блока
  // Если соответствие не найдено — ведем на главную
  const primaryHref = title.includes("Инвест")
    ? "/investments"
    : title.includes("Фермер")
    ? "/recomendation"
    : "/";
  return (
    <section className="bg-gray-50 py-6 sm:py-10">
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch gap-6 sm:gap-8 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full h-48 sm:h-64 lg:h-[420px]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover rounded-md"
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
          />
        </div>

        <div className="bg-white flex flex-col justify-center px-4 sm:px-8 py-6 lg:py-10 rounded-md shadow-sm">
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
            {title}
          </h3>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            {text}
          </p>

          <div className="mt-5 sm:mt-6 mb-5 sm:mb-6 h-px bg-gray-200" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={primaryHref}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-gray-900 text-white hover:opacity-90 transition"
            >
              {primary}
            </Link>
            {secondary && (
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-100 transition"
              >
                {secondary}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketBlock({
  title,
  subtitle,
  text,
  primary,
  secondary,
}: {
  title: string;
  subtitle: string;
  text: string;
  primary: string;
  secondary?: string;
}) {
  const images = ["/main/market.png", "/main/map.png"];

  return (
    <section className="bg-gray-50 py-8 sm:py-12">
      <div
        className={`
                  max-w-6xl mx-auto px-4 sm:px-6
                  grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8
                `}
      >
        <div className="relative order-1 lg:order-2 w-full h-56 sm:h-72 lg:h-[420px]">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            navigation
            loop
            className="h-full w-full rounded-md overflow-hidden shadow-sm"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={src}
                  alt={`${title} ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="order-2 lg:order-1 flex flex-col">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          <h3 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-bold text-[#6D758F]">
            {subtitle}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            {text}
          </p>

          <div className="mt-5 sm:mt-6 mb-5 sm:mb-6 h-px bg-gray-200" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-gray-900 text-white hover:opacity-90 transition">
              {primary}
            </button>
            {secondary && (
              <button className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-100 transition">
                {secondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsBlock() {
  const t = useTranslations();

  const items = [
    {
      icon: "/main/scientist.png",
      title: t("solutions.cards.scientists.title"),
      desc: t("solutions.cards.scientists.desc"),
      href: "/science",
      list: [
        t("solutions.cards.scientists.item1"),
        t("solutions.cards.scientists.item2"),
        t("solutions.cards.scientists.item3"),
      ],
    },
    {
      icon: "/main/investor.png",
      title: t("solutions.cards.investors.title"),
      desc: t("solutions.cards.investors.desc"),
      href: "/investments",
      list: [
        t("solutions.cards.investors.item1"),
        t("solutions.cards.investors.item2"),
        t("solutions.cards.investors.item3"),
      ],
    },
    {
      icon: "/main/farmer.png",
      title: t("solutions.cards.farmers.title"),
      desc: t("solutions.cards.farmers.desc"),
      href: "/recomendation",
      list: [
        t("solutions.cards.farmers.item1"),
        t("solutions.cards.farmers.item2"),
        t("solutions.cards.farmers.item3"),
      ],
    },
    {
      icon: "/main/producer.png",
      title: t("solutions.cards.producers.title"),
      desc: t("solutions.cards.producers.desc"),
      href: "/",
      list: [
        t("solutions.cards.producers.item1"),
        t("solutions.cards.producers.item2"),
        t("solutions.cards.producers.item3"),
      ],
    },
  ];

  return (
    <section className="text-center py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6D758F] mb-3 sm:mb-4">
          {t("solutions.title")}
        </h2>
        <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 whitespace-pre-line">
          {t("solutions.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((card, i) => {
            return (
              <div
                key={i}
                className="border rounded-lg p-5 sm:p-6 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition
                            lg:min-h-[360px]"
              >
                <div className="mb-4">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={40}
                    height={40}
                  />
                </div>

                <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {card.desc}
                </p>

                <div className="mt-4 sm:mt-6 space-y-1 text-sm text-gray-700 w-full flex-grow">
                  {card.list.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>

                <Link
                  href={card.href}
                  className="mt-6 w-full sm:w-auto px-6 py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
                  style={{ backgroundColor: "#486284" }}
                >
                  {t("solutions.more")}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RegionStats() {
  const t = useTranslations();

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-xl">
          {/* <div className="mb-4">
            <Image
              src="/main/image.png"
              alt="Region stats icon"
              width={40}
              height={40}
            />
          </div> */}

          <h2 className="text-2xl sm:text-3xl font-bold text-[#6D758F] mb-4 whitespace-pre-line">
            {t("region.title")}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
            {t("region.text")}
          </p>

          <div className="flex justify-center lg:justify-end">
            <button
              className="px-6 py-3 rounded-md text-white font-medium"
              style={{ backgroundColor: "#486284" }}
            >
              {t("region.cta")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 lg:mt-16">
            <div className="bg-[#6D758F] text-white rounded-md p-6 shadow-md text-center">
              <p className="text-xl sm:text-2xl font-bold">
                {t("region.yield.value")}
              </p>
              <p className="font-semibold">{t("region.yield.title")}</p>
              <p className="text-sm opacity-90">{t("region.yield.desc")}</p>
            </div>

            <div className="bg-white text-gray-800 rounded-md p-6 shadow-md text-center">
              <p className="text-xl sm:text-2xl font-bold">
                {t("region.herd.value")}
              </p>
              <p className="font-semibold">{t("region.herd.title")}</p>
              <p className="text-sm opacity-80">{t("region.herd.desc")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:-mt-16">
            <div className="bg-white text-gray-800 rounded-md p-6 shadow-md text-center">
              <p className="text-xl sm:text-2xl font-bold">
                {t("region.export.value")}
              </p>
              <p className="font-semibold">{t("region.export.title")}</p>
              <p className="text-sm opacity-80">{t("region.export.desc")}</p>
            </div>

            <div className="bg-white text-gray-800 rounded-md p-6 shadow-md text-center">
              <p className="text-xl sm:text-2xl font-bold">
                {t("region.vacc.value")}
              </p>
              <p className="font-semibold">{t("region.vacc.title")}</p>
              <p className="text-sm opacity-80">{t("region.vacc.desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsSection() {
  // Константы
  const CARD_CLASSES = "p-6 hover:shadow-lg transition-all duration-200";
  const ICON_BASE_CLASSES =
    "w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center";
  const SVG_ICON_CLASSES = "w-4 h-4 text-white";
  const PROGRESS_BAR_CLASSES =
    "w-24 h-2 bg-gray-200 rounded-full overflow-hidden";
  const VALUE_CLASSES = "text-sm font-semibold text-gray-900 w-16 text-right";
  const LABEL_CLASSES = "text-sm font-medium text-gray-700";
  const COLOR_DOT_CLASSES = "w-3 h-3 rounded-full";
  const FLEX_SPACE_CLASSES = "flex items-center space-x-3";
  const HEADER_MB_CLASSES = "flex items-center space-x-3 mb-4";
  const ITEMS_SPACE_CLASSES = "space-y-4";

  // Данные (оставлены для будущего использования)
  const productionData = [
    { name: "Зерновые культуры", value: 37.9, color: "#8b5cf6" },
    { name: "Масличные культуры", value: 43.4, color: "#10b981" },
    { name: "Картофель", value: 1.0, color: "#f59e0b" },
    { name: "Овощи и бахчевые", value: 1.0, color: "#eab308" },
    { name: "Кормовые культуры", value: 17.2, color: "#6b7280" },
  ];

  const harvestData = [
    { name: "Бородулихинский", value: 2416045, color: "#1f2937" },
    { name: "Урджарский", value: 903293, color: "#4b5563" },
    { name: "Кокпектинский", value: 741251, color: "#6b7280" },
    { name: "Бескарагайский", value: 141527, color: "#9ca3af" },
    { name: "Ақсуат", value: 11865, color: "#d1d5db" },
  ];

  const meatSales = 67;
  const yieldByCropsData = [
    { name: "Пшеница", value: 153.6, color: "#8b5cf6" },
    { name: "Картофель", value: 53.9, color: "#10b981" },
    { name: "Овощи и бахчевые", value: 66.0, color: "#f59e0b" },
    { name: "Масличные культуры", value: 0.5, color: "#eab308" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-900 to-teal-600 bg-clip-text text-transparent mb-4">
            Аналитика производства
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Комплексный анализ структуры производства, урожайности и реализации
            продукции
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Структура производства */}
          <Card className={CARD_CLASSES}>
            <div className={HEADER_MB_CLASSES}>
              <div
                className={`${ICON_BASE_CLASSES} from-purple-500 to-violet-500`}
              >
                <svg
                  className={SVG_ICON_CLASSES}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Структура производства
                </h3>
                <p className="text-sm text-gray-600">
                  Распределение культур по площадям
                </p>
              </div>
            </div>

            <div className={ITEMS_SPACE_CLASSES}>
              {productionData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className={FLEX_SPACE_CLASSES}>
                    <div
                      className={COLOR_DOT_CLASSES}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={LABEL_CLASSES}>{item.name}</span>
                  </div>
                  <div className={FLEX_SPACE_CLASSES}>
                    <div className={PROGRESS_BAR_CLASSES}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className={VALUE_CLASSES}>{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Урожайность по культурам */}
          <Card className={CARD_CLASSES}>
            <div className={HEADER_MB_CLASSES}>
              <div
                className={`${ICON_BASE_CLASSES} from-green-500 to-emerald-500`}
              >
                <svg
                  className={SVG_ICON_CLASSES}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Урожайность по культурам
                </h3>
                <p className="text-sm text-gray-600">
                  Сбор по видам культур (тысячи тонн)
                </p>
              </div>
            </div>

            <div className={ITEMS_SPACE_CLASSES}>
              {yieldByCropsData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className={FLEX_SPACE_CLASSES}>
                    <div
                      className={COLOR_DOT_CLASSES}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={LABEL_CLASSES}>{item.name}</span>
                  </div>
                  <div className={FLEX_SPACE_CLASSES}>
                    <div className={PROGRESS_BAR_CLASSES}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(item.value / 160) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className={VALUE_CLASSES}>{item.value}к т</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Реализация мяса (донат pie + сводка) */}
          <Card className={CARD_CLASSES}>
            <div className={HEADER_MB_CLASSES}>
              <div className={`${ICON_BASE_CLASSES} from-red-500 to-rose-500`}>
                <svg
                  className={SVG_ICON_CLASSES}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Реализация мяса
                </h3>
                <p className="text-sm text-gray-600">
                  Процент от общего объема
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3 items-center -mt-4">
              <div className="h-48">
                <ResponsiveContainer>
                  <PieChart>
                    {/* Внутреннее кольцо: Реализовано vs Остаток */}
                    <Pie
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      data={[
                        {
                          name: "Реализовано",
                          value: meatSales,
                          color: "#22c55e",
                        },
                        {
                          name: "Остаток",
                          value: 100 - meatSales,
                          color: "#e5e7eb",
                        },
                      ]}
                      strokeWidth={0}
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Pie
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={2}
                      data={[
                        { name: "Курица", value: 40, color: "#fb7185" },
                        { name: "Говядина", value: 30, color: "#f43f5e" },
                        { name: "Свинина", value: 20, color: "#f97316" },
                        { name: "Баранина", value: 10, color: "#f59e0b" },
                      ]}
                    >
                      <Cell fill="#fb7185" />
                      <Cell fill="#f43f5e" />
                      <Cell fill="#f97316" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">67%</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#22c55e" }}
                    />
                    Реализовано: 67%
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#e5e7eb" }}
                    />
                    Остаток: 33%
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#fb7185" }}
                    />
                    Курица
                  </div>
                  <div className="text-right font-semibold">40%</div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#f43f5e" }}
                    />
                    Говядина
                  </div>
                  <div className="text-right font-semibold">30%</div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#f97316" }}
                    />
                    Свинина
                  </div>
                  <div className="text-right font-semibold">20%</div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#f59e0b" }}
                    />
                    Баранина
                  </div>
                  <div className="text-right font-semibold">10%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Валовый сбор */}
          <Card className={CARD_CLASSES}>
            <div className={HEADER_MB_CLASSES}>
              <div
                className={`${ICON_BASE_CLASSES} from-amber-500 to-orange-500`}
              >
                <svg
                  className={SVG_ICON_CLASSES}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Валовый сбор
                </h3>
                <p className="text-sm text-gray-600">Сбор по районам (тонны)</p>
              </div>
            </div>

            <div className={ITEMS_SPACE_CLASSES}>
              {harvestData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className={FLEX_SPACE_CLASSES}>
                    <div
                      className={COLOR_DOT_CLASSES}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={LABEL_CLASSES}>{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {(item.value / 1000).toFixed(0)}к т
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ImageSection() {
  const t = useTranslations();

  const featured = {
    title: t("news.featured.title"),
    excerpt: t("news.featured.excerpt"),
    author: "Unknown",
    date: "15.08.2025",
    image: "/main/image1.png",
  };

  const items = [
    {
      title: t("news.items.0.title"),
      author: "Unknown",
      date: "16.08.2025",
      // eslint-disable-next-line sonarjs/no-duplicate-string
      image: "/main/image2.png",
    },
    {
      title: t("news.items.1.title"),
      author: "Unknown",
      date: "17.08.2025",
      image: "/main/image2.png",
    },
    {
      title: t("news.items.2.title"),
      author: "Unknown",
      date: "18.08.2025",
      image: "/main/image2.png",
    },
  ];

  return (
    <section className="bg-[#F6F7FA] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6D758F] text-center">
          {t("news.title")}
        </h2>
        <p className="text-gray-500 text-center mt-3 mb-8 sm:mb-12">
          {t("news.subtitle")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-56 sm:h-72 lg:h-80">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width:1024px) 66vw, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#6D758F] line-clamp-2">
                {featured.title}
              </h3>
              <p className="mt-3 text-gray-600 line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-start gap-4 text-xs sm:text-sm font-semibold text-gray-500">
                <div className="flex items-center gap-2">
                  <Image
                    src="/main/user.png"
                    alt="Автор"
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  <span>{featured.author}</span>
                </div>
                <span>{featured.date}</span>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-6">
            {items.map((n, i) => (
              <article
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-[110px_1fr] sm:grid-cols-[120px_1fr] min-h-[110px]"
              >
                <div className="relative">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(min-width:640px) 120px, 110px"
                    className="object-cover"
                  />
                </div>

                <div className="p-4 sm:p-5 border-l border-gray-100">
                  <h4 className="font-medium text-gray-800 leading-snug line-clamp-2">
                    {n.title}
                  </h4>

                  <div className="mt-3 flex items-center gap-4 text-xs sm:text-[13px] text-gray-500 font-semibold">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/main/user.png"
                        alt="Автор"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <span>{n.author}</span>
                    </div>
                    <span>{n.date}</span>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex justify-center lg:justify-end">
              <button
                className="mt-2 sm:mt-0 px-6 py-3 rounded-full bg-[#2F3A4A] text-white hover:opacity-90 transition"
                onClick={() => {}}
              >
                {t("news.more")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const t = useTranslations();

  // const partners = [
  //   { name: "Tesla", logo: "/main/tesla.png", width: 200, height: 100 },
  //   { name: "Amazon", logo: "/main/amazon.png", width: 180, height: 180 },
  //   {
  //     name: "AliExpress",
  //     logo: "/main/aliexpress.png",
  //     width: 250,
  //     height: 250,
  //   },
  //   {
  //     name: "Fly Emirates",
  //     logo: "/main/emirates.png",
  //     width: 250,
  //     height: 250,
  //   },
  // ];

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6D758F] text-center mb-8 sm:mb-10">
          {t("partners.title")}
        </h2>

        {/* Закомментированный блок с логотипами партнеров */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center w-full h-20 sm:h-24"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="object-contain max-h-16 sm:max-h-20 max-w-full"
              />
            </div>
          ))}
        </div> */}

        {/* Новый контент */}
        <div className="text-center py-4 ">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Мы ждем ваших предложений
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Готовы к сотрудничеству и открыты для новых партнерских отношений.
            Свяжитесь с нами, чтобы обсудить возможности совместной работы.
          </p>
          <button
            type="button"
            className="px-8 py-3 rounded-md bg-[#486284] text-white font-medium hover:opacity-90 transition"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </section>
  );
}
