"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

export function Nav({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const other: Locale = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)/, `/${other}`) || `/${other}`;
  const { common, contact, topbar, nav } = dict;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const seg = "flex h-9 min-w-[2.75rem] items-center justify-center rounded-full px-3 text-[0.8125rem] font-bold transition-colors";
  const langSwitch = (
    <div role="group" aria-label={common.switchLabel} className="flex items-center rounded-full border border-navy/20 bg-mist p-0.5" dir="ltr">
      {(["en", "ar"] as Locale[]).map((l) => {
        const active = l === lang;
        const label = l === "en" ? "EN" : "عربي";
        return active ? (
          <span key={l} lang={l} aria-current="true" className={`${seg} bg-navy text-white`}>
            {label}
          </span>
        ) : (
          <Link key={l} href={switchHref} hrefLang={l} lang={l} aria-label={common.switchLabel} className={`${seg} text-navy hover:bg-white`}>
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_16px_rgba(16,43,78,0.08)]" : "shadow-[0_1px_0_var(--color-line)]"}`}>
        {/* Utility bar: existing contact placeholders */}
        <div className="on-dark hidden bg-navy text-[0.8125rem] text-white/85 md:block">
          <div className="container-x flex h-9 items-center justify-between gap-6">
            <p className="truncate">{contact.address}</p>
            <p className="flex shrink-0 items-center gap-6">
              <span>{contact.phone}</span>
              <span aria-hidden className="h-3 w-px bg-white/25" />
              <span>
                {topbar.monFri} <bdi dir="ltr">{contact.hours[0][1]}</bdi>
              </span>
            </p>
          </div>
        </div>

        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link href={href(lang, "#top")} aria-label={common.homeLabel} onClick={() => setOpen(false)}>
            <Wordmark label={common.clinic} />
          </Link>

          <nav aria-label={common.primaryNav} className="hidden items-center gap-7 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={href(lang, item.href)}
                className="text-[0.875rem] font-semibold text-ink/80 transition-colors hover:text-teal-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {langSwitch}
            <Link
              href={href(lang, "#book")}
              className="hidden h-11 items-center rounded-[4px] bg-teal-deep px-6 text-[0.875rem] font-semibold text-white transition-colors hover:bg-navy sm:inline-flex"
            >
              {common.bookAppointment}
            </Link>
            <button
              type="button"
              className="-me-2 flex h-11 w-11 items-center justify-center xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? common.closeMenu : common.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute start-0 h-0.5 w-6 bg-navy transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute start-0 h-0.5 w-6 bg-navy transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white md:top-[108px] xl:hidden"
      >
        <nav aria-label={common.mobileNav} className="container-x flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={href(lang, item.href)}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-xl font-bold text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={href(lang, "#book")}
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[4px] bg-teal-deep text-[0.9375rem] font-semibold text-white"
          >
            {common.bookAppointment}
          </Link>
        </nav>
      </div>
    </>
  );
}
