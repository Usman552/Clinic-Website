import type { Dict } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience({ dict }: { dict: Dict }) {
  const { experience: e, steps } = dict;
  return (
    <section id="experience" className="on-dark section-y bg-navy">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={e.eyebrow} title={e.title} light center>
            {e.text}
          </SectionHeading>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute inset-x-[16.6%] top-7 hidden h-px bg-white/20 md:block" />
          {steps.map((s, i) => (
            <li key={s.n} className="relative text-center">
              <Reveal delay={i * 100}>
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-deep text-lg font-bold text-white ring-8 ring-navy">
                  {s.n}
                </span>
                <h3 className="h3 mt-6 text-white">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-[34ch] text-[0.9375rem] text-white/75">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
