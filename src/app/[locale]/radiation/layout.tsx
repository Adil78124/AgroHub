import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Радиационный фон",
  description: "Мониторинг радиационного фона в сельскохозяйственных регионах",
};

export default function RadiationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
