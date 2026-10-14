import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { getDict } from "@/lib/dictionaries";
import { href, isLocale, locales } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getDict(lang).doctors.map((d) => ({ lang, slug: d.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang).doctors.find((x) => x.slug === slug);
  return d ? { title: `${d.name} — ${getDict(lang).common.clinic} Aurelle`, description: d.bio } : {};
}

export default async function DoctorPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);
  const d = dict.doctors.find((x) => x.slug === slug);
  if (!d) notFound();
  const s = dict.doctorsSection;

  return (
    <section className="bg-mist pb-24 pt-44 md:pt-52">
      <div className="container-x">
        <Link href={href(lang, "#doctors")} className="group inline-flex items-center gap-2 text-[0.875rem] font-semibold text-teal-deep hover:text-navy">
          <span aria-hidden className="rtl:-scale-x-100">←</span> {s.back}
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-line lg:col-span-5">
            <Image
              src={d.image}
              alt={d.alt}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              style={{ objectPosition: d.position }}
            />
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="eyebrow">{d.role}</p>
            <h1 className="display mt-4 text-navy">{d.name}</h1>
            <h2 className="mt-10 text-lg font-bold text-navy">{s.aboutDoctor}</h2>
            <p className="lead mt-3 max-w-[56ch]">{d.bio}</p>
            <p className="mt-8 max-w-[56ch] border-s-2 border-teal ps-4 text-sm text-slate">{s.notice}</p>
            <div className="mt-10">
              <Button href={href(lang, "#book")}>{s.request}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
