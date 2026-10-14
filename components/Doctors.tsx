import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Arrow } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Doctors({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { doctorsSection: s, doctors } = dict;
  return (
    <section id="doctors" className="section-y bg-mist">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} center>
            {s.text}
          </SectionHeading>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <li key={d.slug}>
              <Reveal delay={i * 100} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white">
                  <Link href={href(lang, `/doctors/${d.slug}`)} tabIndex={-1} aria-hidden className="img-zoom relative block aspect-[4/5] overflow-hidden bg-line">
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: d.position }}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col border-t-[3px] border-teal p-6">
                    <h3 className="h3 text-navy">{d.name}</h3>
                    <p className="eyebrow mt-2">{d.role}</p>
                    <p className="mt-3 flex-1 text-[0.9375rem] text-slate">{d.bio}</p>
                    <Link
                      href={href(lang, `/doctors/${d.slug}`)}
                      className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-teal-deep hover:text-navy"
                    >
                      <span className="sr-only">{d.name} · </span>
                      {s.profile} <Arrow />
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
