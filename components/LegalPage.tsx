import type { ReactNode } from "react";

export function LegalPage({ brand, notice, title, children }: { brand: string; notice: string; title: string; children: ReactNode }) {
  return (
    <section className="section-y pt-44 md:pt-52">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">{brand}</p>
        <h1 className="h2 mt-5 text-navy">{title}</h1>
        <p className="mt-6 border-s-2 border-teal ps-4 text-sm text-slate">{notice}</p>
        <div className="mt-10 space-y-5 text-slate">{children}</div>
      </div>
    </section>
  );
}
