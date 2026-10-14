import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Doctors } from "@/components/Doctors";
import { Experience } from "@/components/Experience";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Trust } from "@/components/Trust";
import { getDict } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Trust dict={dict} />
      <Services lang={lang} dict={dict} />
      <About lang={lang} dict={dict} />
      <Doctors lang={lang} dict={dict} />
      <Experience dict={dict} />
      <Gallery dict={dict} />
      <Testimonials dict={dict} />
      <Faq dict={dict} />
      <CtaBand lang={lang} dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
