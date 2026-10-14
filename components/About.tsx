import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { TextLink } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { about, principles } = dict;
  return (
    <section id="about" className="section-y">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[4px] bg-line lg:aspect-[5/4]">
              <Image
                src={asset("/images/about-consult.jpg")}
                alt={about.imgAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[40%_50%]"
              />
            </div>
            <div aria-hidden className="absolute -bottom-3 -end-3 -z-10 hidden h-2/3 w-2/3 bg-teal/15 sm:block" />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} title={about.title}>
              {about.text}
            </SectionHeading>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 80} className="flex gap-4">
                  <span aria-hidden className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-deep text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-slate">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <TextLink href={href(lang, "#experience")}>{about.link}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
