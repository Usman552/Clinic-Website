import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getDict } from "@/lib/dictionaries";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDict(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${cormorant.variable} ${manrope.variable} ${cairo.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
        >
          {dict.common.skip}
        </a>
        <Nav lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
