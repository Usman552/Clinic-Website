import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDict } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { legal } = getDict(lang);
  return (
    <LegalPage brand={legal.brand} notice={legal.notice} title={legal.privacy.title}>
      {legal.privacy.paras.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </LegalPage>
  );
}
