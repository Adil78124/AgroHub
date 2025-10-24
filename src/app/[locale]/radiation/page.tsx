"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Shield, LogOut, User, Settings, Database, Users, MapPin, ShieldCheck, Calendar, AlertTriangle, Zap, Leaf, Package } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart, Cell } from 'recharts';

/**
 * Страница радиационного фона
 * Отображает данные о радиационном фоне в различных регионах
 * Требует авторизации для доступа
 */
export default function RadiationPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [activeTab, setActiveTab] = useState("ecological");
  const [selectedCity, setSelectedCity] = useState(null); // Selected city for chart updates
  const router = useRouter();

  // Данные для графиков по умолчанию
  const defaultMonthlyData = [
    { month: 'Янв', base: 0.12, middle: 0.05, top: 0.02 },
    { month: 'Фев', base: 0.11, middle: 0.04, top: 0.03 },
    { month: 'Мар', base: 0.10, middle: 0.06, top: 0.04 },
    { month: 'Апр', base: 0.13, middle: 0.05, top: 0.05 },
    { month: 'Май', base: 0.14, middle: 0.06, top: 0.06 },
    { month: 'Июн', base: 0.15, middle: 0.07, top: 0.07 },
    { month: 'Июл', base: 0.15, middle: 0.06, top: 0.08 },
    { month: 'Авг', base: 0.14, middle: 0.07, top: 0.08 },
    { month: 'Сен', base: 0.13, middle: 0.06, top: 0.07 },
    { month: 'Окт', base: 0.12, middle: 0.05, top: 0.06 },
    { month: 'Ноя', base: 0.11, middle: 0.04, top: 0.05 },
    { month: 'Дек', base: 0.10, middle: 0.05, top: 0.04 }
  ];

  const regionsComparisonData = [
    { region: 'Алматинская область', level: 0.45, color: '#10b981', status: 'Норма' },
    { region: 'Актюбинская область', level: 0.62, color: '#f59e0b', status: 'Повышенный' },
    { region: 'Карагандинская область', level: 0.78, color: '#ef4444', status: 'Внимание' },
    { region: 'Павлодарская область', level: 0.35, color: '#06b6d4', status: 'Норма' },
    { region: 'Абайская область', level: 0.58, color: '#8b5cf6', status: 'Повышенный' }
  ];

  // Данные городов с индивидуальными графиками
  const citiesData = {
    semey: {
      name: "Семей",
      currentLevel: 0.22,
      status: "attention",
      color: "orange",
      monthlyChartData: [
        { month: 'Янв', base: 0.15, middle: 0.05, top: 0.03 },
        { month: 'Фев', base: 0.16, middle: 0.06, top: 0.04 },
        { month: 'Мар', base: 0.17, middle: 0.07, top: 0.05 },
        { month: 'Апр', base: 0.18, middle: 0.08, top: 0.06 },
        { month: 'Май', base: 0.19, middle: 0.09, top: 0.07 },
        { month: 'Июн', base: 0.20, middle: 0.10, top: 0.08 },
        { month: 'Июл', base: 0.20, middle: 0.10, top: 0.08 },
        { month: 'Авг', base: 0.19, middle: 0.09, top: 0.07 },
        { month: 'Сен', base: 0.18, middle: 0.08, top: 0.06 },
        { month: 'Окт', base: 0.17, middle: 0.07, top: 0.05 },
        { month: 'Ноя', base: 0.16, middle: 0.06, top: 0.04 },
        { month: 'Дек', base: 0.15, middle: 0.05, top: 0.03 }
      ]
    },
    abay: {
      name: "Абай",
      currentLevel: 0.12,
      status: "normal",
      color: "green",
      monthlyChartData: [
        { month: 'Янв', base: 0.08, middle: 0.03, top: 0.01 },
        { month: 'Фев', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Мар', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Апр', base: 0.11, middle: 0.04, top: 0.02 },
        { month: 'Май', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Июн', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Июл', base: 0.11, middle: 0.04, top: 0.02 },
        { month: 'Авг', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Сен', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Окт', base: 0.08, middle: 0.03, top: 0.01 },
        { month: 'Ноя', base: 0.07, middle: 0.02, top: 0.01 },
        { month: 'Дек', base: 0.07, middle: 0.02, top: 0.01 }
      ]
    },
    aksuat: {
      name: "Аксуат",
      currentLevel: 0.11,
      status: "normal",
      color: "green",
      monthlyChartData: [
        { month: 'Янв', base: 0.07, middle: 0.02, top: 0.01 },
        { month: 'Фев', base: 0.08, middle: 0.03, top: 0.01 },
        { month: 'Мар', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Апр', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Май', base: 0.11, middle: 0.04, top: 0.02 },
        { month: 'Июн', base: 0.11, middle: 0.04, top: 0.02 },
        { month: 'Июл', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Авг', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Сен', base: 0.08, middle: 0.03, top: 0.01 },
        { month: 'Окт', base: 0.07, middle: 0.02, top: 0.01 },
        { month: 'Ноя', base: 0.06, middle: 0.02, top: 0.01 },
        { month: 'Дек', base: 0.06, middle: 0.02, top: 0.01 }
      ]
    },
    ayagoz: {
      name: "Аягоз",
      currentLevel: 0.13,
      status: "normal",
      color: "green",
      monthlyChartData: [
        { month: 'Янв', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Фев', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Мар', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Апр', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Май', base: 0.13, middle: 0.05, top: 0.04 },
        { month: 'Июн', base: 0.13, middle: 0.05, top: 0.04 },
        { month: 'Июл', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Авг', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Сен', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Окт', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Ноя', base: 0.08, middle: 0.03, top: 0.01 },
        { month: 'Дек', base: 0.08, middle: 0.03, top: 0.01 }
      ]
    },
    zharma: {
      name: "Жарма",
      currentLevel: 0.14,
      status: "normal",
      color: "green",
      monthlyChartData: [
        { month: 'Янв', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Фев', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Мар', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Апр', base: 0.13, middle: 0.06, top: 0.04 },
        { month: 'Май', base: 0.14, middle: 0.07, top: 0.05 },
        { month: 'Июн', base: 0.14, middle: 0.07, top: 0.05 },
        { month: 'Июл', base: 0.13, middle: 0.06, top: 0.04 },
        { month: 'Авг', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Сен', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Окт', base: 0.10, middle: 0.04, top: 0.02 },
        { month: 'Ноя', base: 0.09, middle: 0.03, top: 0.02 },
        { month: 'Дек', base: 0.09, middle: 0.03, top: 0.02 }
      ]
    },
    kokpekty: {
      name: "Кокпекты",
      currentLevel: 0.18,
      status: "elevated",
      color: "yellow",
      monthlyChartData: [
        { month: 'Янв', base: 0.13, middle: 0.05, top: 0.03 },
        { month: 'Фев', base: 0.14, middle: 0.06, top: 0.04 },
        { month: 'Мар', base: 0.15, middle: 0.07, top: 0.05 },
        { month: 'Апр', base: 0.16, middle: 0.08, top: 0.06 },
        { month: 'Май', base: 0.17, middle: 0.09, top: 0.07 },
        { month: 'Июн', base: 0.18, middle: 0.10, top: 0.08 },
        { month: 'Июл', base: 0.18, middle: 0.10, top: 0.08 },
        { month: 'Авг', base: 0.17, middle: 0.09, top: 0.07 },
        { month: 'Сен', base: 0.16, middle: 0.08, top: 0.06 },
        { month: 'Окт', base: 0.15, middle: 0.07, top: 0.05 },
        { month: 'Ноя', base: 0.14, middle: 0.06, top: 0.04 },
        { month: 'Дек', base: 0.13, middle: 0.05, top: 0.03 }
      ]
    },
    urdzhar: {
      name: "Урджар",
      currentLevel: 0.15,
      status: "normal",
      color: "green",
      monthlyChartData: [
        { month: 'Янв', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Фев', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Мар', base: 0.13, middle: 0.05, top: 0.04 },
        { month: 'Апр', base: 0.14, middle: 0.06, top: 0.04 },
        { month: 'Май', base: 0.15, middle: 0.07, top: 0.05 },
        { month: 'Июн', base: 0.15, middle: 0.07, top: 0.05 },
        { month: 'Июл', base: 0.14, middle: 0.06, top: 0.04 },
        { month: 'Авг', base: 0.13, middle: 0.05, top: 0.04 },
        { month: 'Сен', base: 0.12, middle: 0.05, top: 0.03 },
        { month: 'Окт', base: 0.11, middle: 0.04, top: 0.03 },
        { month: 'Ноя', base: 0.10, middle: 0.03, top: 0.02 },
        { month: 'Дек', base: 0.10, middle: 0.03, top: 0.02 }
      ]
    }
  };


  useEffect(() => {
    // Проверяем авторизацию при загрузке страницы
    const access = localStorage.getItem("radiation_access");
    const currentUser = localStorage.getItem("radiation_user");
    
    if (access === "granted" && currentUser) {
      setIsAuthorized(true);
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("radiation_access");
    localStorage.removeItem("radiation_user");
    setIsAuthorized(false);
    setUser("");
    router.push("/ru/radiation/login");
  };

  const handleLogin = () => {
    router.push("/ru/radiation/login");
  };

  const handleCityClick = (cityKey) => {
    setSelectedCity(citiesData[cityKey]);
  };

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  // Показываем форму авторизации если не авторизован
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Ограниченный доступ
              </CardTitle>
              <CardDescription>
                Данный раздел доступен только авторизованным специалистам службы экологического мониторинга
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700">
                Войти как специалист
              </Button>
              <p className="mt-4 text-xs text-gray-500">
                * Демонстрационный доступ для показа функционала
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-gray-50">
          {/* Предупреждение */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-2 sm:p-3 md:p-4">
            <div className="flex items-start sm:items-center">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-500 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
              <p className="text-yellow-800 text-xs sm:text-sm md:text-base">
                Внимание: Представленные ниже данные носят исключительно примерный и демонстрационный характер.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto">
          {/* Заголовок с кнопкой выхода */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Радиационный мониторинг
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
                {activeTab === "ecological" 
                  ? "Система контроля радиационного фона Республики Казахстан"
                  : "Контроль радиации в сельскохозяйственной продукции"
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
                <Badge variant="destructive" className="flex items-center gap-1 text-xs px-2 py-1">
                  <User className="h-3 w-3" />
                  <span className="hidden md:inline">Только для специалистов</span>
                  <span className="md:hidden">Специалисты</span>
                </Badge>
                <Badge variant="default" className="bg-green-600 flex items-center gap-1 text-xs px-2 py-1">
                  <Zap className="h-3 w-3" />
                  <span className="hidden md:inline">Онлайн мониторинг</span>
                  <span className="md:hidden">Онлайн</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate max-w-20 sm:max-w-24 md:max-w-none">{user}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Выйти</span>
                <span className="sm:hidden">Выход</span>
              </Button>
            </div>
          </div>

          {/* Вкладки */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 md:mb-6 h-10 sm:h-12">
              <TabsTrigger value="ecological" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base px-2 sm:px-4">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="hidden md:inline">Экологический мониторинг</span>
                <span className="md:hidden">Экология</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base px-2 sm:px-4">
                <Database className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="hidden md:inline">Мониторинг продукции</span>
                <span className="md:hidden">Продукция</span>
              </TabsTrigger>
            </TabsList>

            {/* Экологический мониторинг */}
            <TabsContent value="ecological" className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Ключевые показатели */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Средний уровень</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-600">0.16 мР/ч</p>
                      </div>
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Станций мониторинга</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-green-600">15</p>
                      </div>
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Районов в норме</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-emerald-600">3/5</p>
                      </div>
                      <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Последнее обновление</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-600">14:30</p>
                      </div>
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Карта радиационного фона */}
              <Card>
                <CardHeader className="pb-2 sm:pb-3 md:pb-6">
                  <CardTitle className="text-sm sm:text-lg md:text-xl">Карта радиационного фона Абайской области</CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 md:p-6">
                  <div className="bg-white rounded-lg h-48 sm:h-64 md:h-96 flex items-center justify-center relative border-2 border-gray-200 overflow-hidden">
                    {/* Google Maps iframe как фон */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d80.089859!3d48.716673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQzJzAwLjAiTiA4MMKwMDUnMjMuNSJF!5e0!3m2!1sru!2skz!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Карта радиационного мониторинга Абайской области"
                    ></iframe>
                    
                        {/* НАМЕРТВО прикрепленные маркеры к Google Maps */}
                        <div className="absolute inset-0">
                          {/* Семей (Семипалатинск) - 50.4111°N, 80.2275°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '45%', left: '65%' }} onClick={() => handleCityClick('semey')}>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.22
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-4 border-r-2 sm:border-r-3 md:border-r-4 border-t-2 sm:border-t-3 md:border-t-4 border-transparent border-t-orange-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Семей</div>
                          </div>
                          
                          {/* Абай - 49.6333°N, 72.8667°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '55%', left: '35%' }} onClick={() => handleCityClick('abay')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.12
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-green-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Абай</div>
                          </div>
                          
                          {/* Аксуат - 47.9167°N, 80.2500°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '40%', left: '60%' }} onClick={() => handleCityClick('aksuat')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.11
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-green-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Аксуат</div>
                          </div>
                          
                          {/* Аягоз - 47.9667°N, 80.4333°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '35%', left: '70%' }} onClick={() => handleCityClick('ayagoz')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.13
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-green-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Аягоз</div>
                          </div>
                          
                          {/* Жарма - 48.5000°N, 81.0000°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '50%', left: '75%' }} onClick={() => handleCityClick('zharma')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.14
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-green-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Жарма</div>
                          </div>
                          
                          {/* Кокпекты - 48.7500°N, 82.4000°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '42%', left: '85%' }} onClick={() => handleCityClick('kokpekty')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.18
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-yellow-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Кокпекты</div>
                          </div>
                          
                          {/* Урджар - 47.0833°N, 81.6167°E - НАМЕРТВО прикреплен */}
                          <div className="absolute cursor-pointer touch-manipulation" style={{ top: '30%', left: '80%' }} onClick={() => handleCityClick('urdzhar')}>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white relative transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform">
                              0.15
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 sm:border-l-3 md:border-l-3 border-r-2 sm:border-r-3 md:border-r-3 border-t-2 sm:border-t-3 md:border-t-3 border-transparent border-t-green-500"></div>
                            </div>
                            <div className="text-xs text-center mt-1 font-medium bg-white/90 px-1 rounded shadow-sm transform -translate-x-1/2">Урджар</div>
                          </div>
                        </div>
                    
                    {/* Информационные панели */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-4 md:left-4 text-xs text-gray-600 bg-white/90 px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-sm">
                      <div className="font-medium text-xs">Масштаб: 1:10M</div>
                    </div>
                    
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 text-xs text-gray-600 bg-white/90 px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-sm">
                      <div className="text-xs">Обновлено: 14:30</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 sm:mt-4 md:mt-6">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 md:mb-3">Уровни радиации (мР/ч)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 md:gap-3 text-xs">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs">0.10-0.15 (норма)</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs">0.16-0.20 (повышенный)</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-xs">0.21-0.25 (внимание)</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs">&gt;0.25 (критический)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="text-xs sm:text-sm font-medium text-blue-800 mb-2">Мониторинг Абайской области</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs text-blue-700">
                      <div>
                        <span className="font-medium">Населенные пункты:</span> 7
                      </div>
                      <div>
                        <span className="font-medium">Станций мониторинга:</span> 12
                      </div>
                      <div>
                        <span className="font-medium">В норме:</span> 6 из 7
                      </div>
                      <div>
                        <span className="font-medium">Последнее обновление:</span> 14:30
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Нижние графики */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <Card>
                  <CardHeader className="pb-2 sm:pb-3 md:pb-6">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-xs sm:text-sm md:text-base">
                        Динамика по месяцам
                        {selectedCity && (
                          <span className="text-xs sm:text-sm font-normal text-gray-600 ml-1 sm:ml-2">
                            - {selectedCity.name}
                          </span>
                        )}
                      </span>
                      {selectedCity && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedCity(null)}
                          className="text-xs w-full sm:w-auto"
                        >
                          Сбросить выбор
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="h-40 sm:h-48 md:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedCity ? selectedCity.monthlyChartData : defaultMonthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[-0.02, 0.26]} />
                          <Tooltip 
                            formatter={(value, name) => [`${value} мР/ч`, name]}
                            labelFormatter={(label) => `Месяц: ${label}`}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="base" 
                            stackId="1"
                            stroke="#14b8a6" 
                            fill="#14b8a6"
                            name="Базовый уровень"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="middle" 
                            stackId="1"
                            stroke="#3b82f6" 
                            fill="#3b82f6"
                            name="Средний уровень"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="top" 
                            stackId="1"
                            stroke="#ef4444" 
                            fill="#ef4444"
                            name="Пиковый уровень"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 sm:pb-3 md:pb-6">
                    <CardTitle className="text-xs sm:text-sm md:text-base">Сравнение с другими областями</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="h-40 sm:h-48 md:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionsComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="region" 
                            tick={{ fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis 
                            domain={[0, 1]} 
                            tickFormatter={(value) => `${value} мР/ч`}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value} мР/ч`, 'Уровень радиации']}
                            labelFormatter={(label) => `Область: ${label}`}
                          />
                          <Bar dataKey="level" fill="#8884d8">
                            {regionsComparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Легенда */}
                    <div className="mt-4">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Статусы радиации</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Норма (0.3-0.5 мР/ч)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span>Повышенный (0.5-0.7 мР/ч)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>Внимание (&gt;0.7 мР/ч)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Мониторинг продукции */}
            <TabsContent value="products" className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Ключевые показатели */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Всего проб</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-600">662</p>
                      </div>
                      <Package className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Безопасные пробы</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-green-600">660</p>
                      </div>
                      <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Превышения нормы</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-red-600">2</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-2 sm:p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Уровень безопасности</p>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-green-600">99.7%</p>
                      </div>
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Рейтинг безопасности районов */}
              <Card>
                <CardHeader className="pb-2 sm:pb-3 md:pb-6">
                  <CardTitle className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                    <Leaf className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">Рейтинг безопасности районов по продукции</span>
                    <span className="md:hidden">Рейтинг безопасности</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 md:p-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 md:p-4 bg-green-50 rounded-lg gap-2">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm md:text-base">1. Аксуский район</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Средний уровень: 18.4 Бк/кг</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs w-fit">98.2% Безопасность</Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 md:p-4 bg-green-50 rounded-lg gap-2">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm md:text-base">2. Абайский район</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Средний уровень: 22.4 Бк/кг</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs w-fit">95.8% Безопасность</Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-green-50 rounded-lg gap-2">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">3. Шетский район</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Средний уровень: 29 Бк/кг</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs w-fit">92.1% Безопасность</Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-yellow-50 rounded-lg gap-2">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">4. Карагандинский район</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Средний уровень: 66 Бк/кг</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs w-fit">78.5% Безопасность</Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-orange-50 rounded-lg gap-2">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">5. Темиртауский район</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Средний уровень: 99.8 Бк/кг</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 text-xs w-fit">65.2% Безопасность</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  );
}
