import type { Dict } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";

const icons = [
  "M12 3v18M3 12h18",
  "M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z",
  "M4 20V9l8-5 8 5v11M9 20v-6h6v6",
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
];

export function Trust({ dict }: { dict: Dict }) {
  return (
    <section aria-labelledby="trust-title" className="bg-white pt-4 md:pt-[140px] lg:pt-24">
      <h2 id="trust-title" className="sr-only">
        {dict.highlightsTitle}
      </h2>
      <div className="container-x pb-16 pt-8 lg:pb-20 lg:pt-14">
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.highlights.map((h, i) => (
            <li key={h.title}>
              <Reveal delay={i * 90}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal-deep">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={icons[i % icons.length]} />
                  </svg>
                </span>
                <h3 className="h3 mt-5 text-navy">{h.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{h.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
