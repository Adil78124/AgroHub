"use client";

import Image from "next/image";
import { Link } from "../configs/i18/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#eeefcf] text-[#2F3A4A] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="flex items-start">
            <Image
              src="/logo.svg"
              alt="Agrosector"
              width={180}
              height={40}
              className="h-auto w-[160px] sm:w-[180px]"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-[#878680]">
              {t("solutions.title")}
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <Link href="/science" className="hover:underline">
                  {t("solutions.scientists")}
                </Link>
              </li>
              <li>
                <Link href="/investments" className="hover:underline">
                  {t("solutions.investors")}
                </Link>
              </li>
              <li>
                <Link href="/farmer" className="hover:underline">
                  {t("solutions.farmers")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-[#878680]">
                {t("info.title")}
              </h4>
              <ul className="space-y-2 text-sm font-bold">
                <li>
                  <Link href="#" className="hover:underline">
                    {t("info.faq")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("info.blog")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("info.courses")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#878680]">
                {t("contacts.title")}
              </h4>
              <ul className="space-y-2 text-sm font-bold">
                <li>{t("contacts.phone")}</li>
                <li>{t("contacts.email")}</li>
                <li>{t("contacts.address")}</li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("contacts.about")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("contacts.partners")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-8 pt-4 text-center text-xs sm:text-sm font-bold">
          © {new Date().getFullYear()} Agrosector. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
