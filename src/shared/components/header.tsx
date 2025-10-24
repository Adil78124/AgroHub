import Image from "next/image";

import { Menu } from "lucide-react";
import { Link } from "../configs/i18/navigation";
import { cn } from "../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Header = () => {
  return (
    <header className="">
      <section className="py-6 flex  max-w-[1200px] mx-auto items-center px-4 xl:px-0   justify-between  xl:justify-around">
        <Image src="/logo.svg" alt="logo" width={235} height={54} />

        <BurgerMenu />
        <section className="xl:flex gap-4 hidden">
          <SocialLinkList />
          <ContactUsList dir="row" />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
const navlinks = [
  {
    name: "Главная",
    href: "/",
  },
  {
    name: "Науке",
    href: "/science",
  },
  {
    name: "Инвестору",
    href: "/investments",
  },
  {
    name: "Фермеру",
    href: "/farmer",
  },
  {
    name: "Радиационный фон",
    href: "/radiation/login",
  },
  // {
  //   name: "О нас",
  //   href: "/about",
  // },
  // {
  //   name: "Контакты",
  //   href: "/contacts",
  // },
];
export const Navbar = () => {
  return (
    <nav className="bg-slate-200 h-15  items-center hidden xl:flex">
      <section className="max-w-[1200px]  mx-auto flex gap-5  items-center justify-center">
        {navlinks.map((l) => (
          <Link key={l.name} href={l.href}>
            {l.name}
          </Link>
        ))}
      </section>
    </nav>
  );
};

const BurgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="xl:hidden flex items-center justify-center rounded-md w-10 h-10 bg-slate-100  ">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="opacity-0 h-0">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <section className="flex flex-col gap-4 px-2 h-full">
          <h1 className="text-2xl font-semibold">Меню</h1>
          <div>
            <h2 className="text-lg font-semibold mb-5">Навигация</h2>
            <div className="flex flex-col gap-2">
              {navlinks.map((l) => (
                <Link key={l.name} href={l.href} className="text-gray-500">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2 mt-20">
            <h2>Социальные сети</h2>
            <SocialLinkList />
          </div>
          <div className="space-y-2">
            <h2>Контакты</h2>
            <ContactUsList dir="column" />
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};
const socialLinks = [
  { icon: "/header/twitter.svg", name: "Twitter", url: "https://www.x.com" },
  {
    icon: "/header/whatsapp.svg",
    name: "WhatsApp",
    url: "https://www.whatsapp.com",
  },
  {
    icon: "/header/instagram.svg",
    name: "Instagram",
    url: "https://www.instagram.com",
  },
  {
    icon: "/header/facebook.svg",
    name: "Facebook",
    url: "https://www.facebook.com",
  },
];
const SocialLinkList = () => {
  return (
    <section className="flex items-center gap-2">
      {socialLinks.map((l) => (
        <div
          key={l.name}
          className="flex items-center  justify-center bg-slate-200 rounded-full w-12 h-12"
        >
          <Image src={l.icon} alt={l.name} width={24} height={24} />
        </div>
      ))}
    </section>
  );
};
const ContactUsList = ({ dir }: { dir: "row" | "column" }) => {
  return (
    <section
      className={cn("flex gap-3", dir === "column" ? "flex-col" : "flex-row")}
    >
      <div className="flex gap-2">
        <Image src="/header/phone.svg" alt="phone" width={24} height={24} />
        <div className="flex flex-col gap-.5">
          <span className="text-xs text-gray-400">Контакты</span>
          <a href="tel:+77476219861" className="text-sm whitespace-nowrap">
            +7 747 621 98 61
          </a>
        </div>
      </div>
      <div className="flex gap-2">
        <Image src="/header/mail.svg" alt="phone" width={24} height={24} />
        <div className="flex flex-col gap-.5">
          <span className="text-xs text-gray-400">Почта</span>
          <a
            href="mailto:innovation@shakarim.kz"
            className="text-sm whitespace-nowrap"
          >
            innovation@shakarim.kz
          </a>
        </div>
      </div>
      <div className="flex gap-2">
        <Image src="/header/geo.svg" alt="phone" width={28} height={28} />
        <div className="flex flex-col gap-.5">
          <span className="text-xs text-gray-400">Адрес</span>
          <div className="text-sm leading-tight">
            <p>г. Семей, ул.Глинки 20А</p>
            <p>Кабинет 504</p>
          </div>
        </div>
      </div>
    </section>
  );
};
