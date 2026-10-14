import type { Dict } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Testimonials({ dict }: { dict: Dict }) {
  const t = dict.testimonials;
  const [lead, ...rest] = t.items;
  return (
    <section className="section-y bg-mist/60">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading eyebrow={t.eyebrow} title={t.title} />
            <p className="mt-8 inline-block border border-teal/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-deep">
              {t.badge}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <figure>
              <blockquote className="text-[1.75rem] font-bold leading-[1.3] text-navy md:text-[2.25rem]">
                <span aria-hidden className="me-1 text-teal">“</span>
                {lead.quote}
                <span aria-hidden className="text-teal">”</span>
              </blockquote>
              <figcaption className="mt-6 text-sm text-slate">{lead.by}</figcaption>
            </figure>
          </Reveal>

          <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {rest.map((item, i) => (
              <Reveal key={item.by} delay={i * 100}>
                <figure>
                  <blockquote className="text-[0.9375rem] leading-relaxed text-ink/85">“{item.quote}”</blockquote>
                  <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate">{item.by}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
