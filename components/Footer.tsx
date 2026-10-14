import Link from "next/link";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

const col = "mb-5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-teal-soft";
const link = "text-[0.9375rem] text-white/75 transition-colors hover:text-white";

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { footer: f, nav, services, contact, common } = dict;
  return (
    <footer className="on-dark bg-navy-deep pt-20 text-white">
      <div className="container-x grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Wordmark light label={common.clinic} />
          <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/70">{f.tagline}</p>
        </div>
        <nav aria-label={common.footerNav} className="lg:col-span-2">
          <h2 className={col}>{f.navigate}</h2>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.href}><Link href={href(lang, n.href)} className={link}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className={col}>{f.services}</h2>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.id}><Link href={`${href(lang)}?service=${s.id}#book`} className={link}>{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className={col}>{f.contact}</h2>
          <ul className="space-y-3 text-[0.9375rem] text-white/75">
            <li>{contact.address}</li>
            <li dir="auto">{contact.phone}</li>
            <li><bdi dir="ltr">{contact.email}</bdi></li>
          </ul>
          <p className="mt-6 text-sm text-white/50">{f.social}</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.8125rem] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>{f.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <p>
            {f.photoBy}{" "}
            <a href="https://unsplash.com" className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </p>
          <ul className="flex gap-6">
            <li><Link href={href(lang, "/privacy")} className="hover:text-white">{f.privacy}</Link></li>
            <li><Link href={href(lang, "/terms")} className="hover:text-white">{f.terms}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
