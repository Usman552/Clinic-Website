import { Suspense } from "react";
import type { Dict } from "@/lib/dictionaries";
import { BookingForm } from "./BookingForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact({ dict }: { dict: Dict }) {
  const { contactSection: s, contact } = dict;
  const row = "grid gap-1 py-5 sm:grid-cols-[8rem_1fr]";
  return (
    <section id="contact" className="section-y bg-mist">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading eyebrow={s.eyebrow} title={s.title} />
            <p className="mt-6 text-sm text-slate">{s.note}</p>

            <dl className="mt-10 divide-y divide-line border-y border-line text-[0.9375rem]">
              <div className={row}>
                <dt className="eyebrow">{s.address}</dt>
                <dd>{contact.address}</dd>
              </div>
              <div className={row}>
                <dt className="eyebrow">{s.phone}</dt>
                <dd dir="auto">{contact.phone}</dd>
              </div>
              <div className={row}>
                <dt className="eyebrow">{s.email}</dt>
                <dd><bdi dir="ltr">{contact.email}</bdi></dd>
              </div>
              <div className={row}>
                <dt className="eyebrow">{s.hours}</dt>
                <dd>
                  <ul className="space-y-1">
                    {contact.hours.map(([d, h]) => (
                      <li key={d} className="flex justify-between gap-4">
                        <span>{d}</span>
                        <bdi dir="ltr" className="text-slate">{h}</bdi>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-teal-deep hover:text-navy"
            >
              {s.directions} <span aria-hidden className="rtl:-scale-x-100">↗</span>
            </a>
          </Reveal>
        </div>

        <div id="book" className="scroll-mt-28 lg:col-span-7 md:scroll-mt-36">
          <Reveal>
            <p className="eyebrow">{s.bookEyebrow}</p>
            <h2 className="h3 mb-8 mt-4 text-navy">{s.bookTitle}</h2>
            <Suspense fallback={null}>
              <BookingForm dict={dict} />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
