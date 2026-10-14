import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function CtaBand({ lang, dict }: { lang: Locale; dict: Dict }) {
  const { cta, common } = dict;
  return (
    <section className="on-dark bg-navy py-24 text-center md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow !text-teal-soft">{cta.eyebrow}</p>
          <h2 className="h2 mx-auto mt-6 max-w-[20ch] text-balance text-white">{cta.title}</h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-white/75">{cta.text}</p>
          <div className="mt-10 flex justify-center">
            <Button href={href(lang, "#book")} variant="teal">
              {common.bookAnAppointment}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
