import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Arrow } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { servicesSection: s, services } = dict;
  return (
    <section id="services" className="section-y bg-mist">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} center>
            {s.text}
          </SectionHeading>
        </Reveal>

        {/* 6-col grid: three across, then two wider items to complete the row */}
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {services.map((svc, i) => (
            <li key={svc.id} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <Link
                  href={`${href(lang)}?service=${svc.id}#book`}
                  className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-colors hover:border-teal"
                >
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-line">
                    <Image
                      src={asset(svc.image)}
                      alt={svc.alt}
                      fill
                      sizes={i < 3 ? "(min-width: 1024px) 400px, 50vw" : "(min-width: 1024px) 600px, 50vw"}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="h3 text-navy">{svc.name}</h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate">{svc.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-teal-deep">
                      {s.book}
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
