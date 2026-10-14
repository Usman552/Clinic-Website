import Image from "next/image";
import type { Dict } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const frame = "img-zoom relative overflow-hidden rounded-[4px] bg-line";

export function Gallery({ dict }: { dict: Dict }) {
  const g = dict.gallery;
  return (
    <section aria-labelledby="gallery-title" className="section-y">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={g.eyebrow} title={<span id="gallery-title">{g.title}</span>} center />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
          <Reveal className="md:col-span-8 md:row-span-2">
            <figure className={`${frame} aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]`}>
              <Image src="/images/gallery-lounge.jpg" alt={g.lounge} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
            </figure>
          </Reveal>
          <Reveal className="md:col-span-4">
            <figure className={`${frame} aspect-[4/3] md:aspect-auto md:h-full`}>
              <Image src="/images/gallery-waiting.jpg" alt={g.waiting} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[50%_70%]" />
            </figure>
          </Reveal>
          <Reveal className="md:col-span-4" delay={100}>
            <figure className={`${frame} aspect-[4/3] md:aspect-auto md:h-full`}>
              <Image src="/images/gallery-room.jpg" alt={g.room} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
