import type { Dict } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Native <details> keeps this accessible and JavaScript-free.
export function Faq({ dict }: { dict: Dict }) {
  const f = dict.faq;
  return (
    <section id="faq" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading eyebrow={f.eyebrow} title={f.title}>
              {f.text}
            </SectionHeading>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <div className="divide-y divide-line border-y border-line">
              {f.items.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold text-navy [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xl leading-none text-teal-deep transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-[0.9375rem] leading-relaxed text-slate">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
