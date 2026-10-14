"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Dict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";

// Hands the visitor's choices to the full appointment form below. Nothing is sent anywhere.
export function QuickBook({ lang, dict }: { lang: Locale; dict: Dict }) {
  const router = useRouter();
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const { quick, services, common } = dict;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (service) q.set("service", service);
    if (date) q.set("date", date);
    const qs = q.toString();
    router.push(`${href(lang)}${qs ? `?${qs}` : ""}#book`);
  }

  const label = "mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.12em] text-navy";
  const control =
    "h-[52px] w-full rounded-[4px] border border-line bg-mist px-4 text-[0.9375rem] text-ink focus:border-teal-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40";

  return (
    <form
      onSubmit={onSubmit}
      aria-label={quick.aria}
      className="grid gap-4 bg-white p-5 shadow-[0_16px_48px_rgba(16,43,78,0.14)] sm:grid-cols-2 md:p-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-end"
    >
      <div>
        <label htmlFor="qb-service" className={label}>{quick.service}</label>
        <select id="qb-service" value={service} onChange={(e) => setService(e.target.value)} className={control}>
          <option value="">{quick.choose}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qb-date" className={label}>{quick.date}</label>
        <input
          id="qb-date"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={control}
        />
      </div>
      <button
        type="submit"
        className="h-[52px] rounded-[4px] bg-teal-deep px-8 text-[0.875rem] font-semibold text-white transition-colors hover:bg-navy sm:col-span-2 lg:col-span-1"
      >
        {common.bookAnAppointment}
      </button>
    </form>
  );
}
