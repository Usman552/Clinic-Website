import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Button } from "./Button";
import { QuickBook } from "./QuickBook";

export function Hero({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { hero, common } = dict;
  return (
    <section id="top" className="relative bg-mist pt-[72px] md:pt-[108px]">
      <div className="container-x grid items-center gap-10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="eyebrow rise" style={{ "--d": "0ms" } as React.CSSProperties}>
            {hero.eyebrow}
          </p>
          <h1 className="display rise mt-5 text-navy" style={{ "--d": "100ms" } as React.CSSProperties}>
            {hero.line1}
            <br />
            <span className="block text-balance text-teal-deep">{hero.line2}</span>
          </h1>
          <p className="lead rise mt-6 max-w-[46ch]" style={{ "--d": "220ms" } as React.CSSProperties}>
            {hero.text}
          </p>
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--d": "340ms" } as React.CSSProperties}>
            <Button href={href(lang, "#book")}>{common.bookAnAppointment}</Button>
            <Button href={href(lang, "#services")} variant="outline">
              {hero.explore}
            </Button>
          </div>
          <p
            className="rise mt-8 flex items-center gap-3 text-sm font-medium text-slate"
            style={{ "--d": "460ms" } as React.CSSProperties}
          >
            <span aria-hidden className="h-0.5 w-8 bg-teal" />
            {hero.note}
          </p>
        </div>

        <div className="rise relative lg:col-span-6" style={{ "--d": "250ms" } as React.CSSProperties}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-line lg:aspect-[5/4]">
            <Image
              src={asset("/images/hero-consult.jpg")}
              alt={hero.imgAlt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div aria-hidden className="absolute -bottom-3 -start-3 -z-10 hidden h-1/2 w-1/2 bg-teal/20 sm:block" />
        </div>
      </div>

      {/* Booking strip straddles the hero's lower edge on tablet and up */}
      <div className="container-x relative z-10 mb-10 mt-10 md:mb-0 md:translate-y-1/2">
        <QuickBook lang={lang} dict={dict} />
      </div>
    </section>
  );
}
