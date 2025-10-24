"use client";

import { Lock,Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

/**
 * Страница входа для специалистов экологического мониторинга
 * Простой доступ по кнопке без регистрации
 */
export default function RadiationLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Имитация задержки входа
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Сохраняем состояние авторизации в localStorage
    localStorage.setItem("radiation_access", "granted");
    localStorage.setItem("radiation_user", "Специалист");
    
    // Перенаправляем на страницу мониторинга
    router.push("/ru/radiation");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-3 sm:py-12 sm:px-4 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Ограниченный доступ
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Данный раздел доступен только авторизованным специалистам службы экологического мониторинга
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-4 sm:p-6">
            <Button 
              onClick={handleLogin} 
              className="w-full bg-red-600 hover:bg-red-700 text-sm sm:text-base"
              disabled={isLoading}
            >
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {isLoading ? "Вход..." : "Войти как специалист"}
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
