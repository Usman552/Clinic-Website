"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import type { Dict } from "@/lib/dictionaries";

type Values = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "done";

const empty: Values = { name: "", email: "", phone: "", service: "", date: "", time: "", message: "" };
const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function validate(v: Values, e: Dict["form"]["errors"]): Errors {
  const out: Errors = {};
  if (v.name.trim().length < 2) out.name = e.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) out.email = e.email;
  if (v.phone.replace(/\D/g, "").length < 7) out.phone = e.phone;
  if (!v.service) out.service = e.service;
  if (!v.date) out.date = e.date;
  else if (v.date < new Date().toISOString().slice(0, 10)) out.date = e.datePast;
  if (!v.time) out.time = e.time;
  return out;
}

const field =
  "w-full rounded-[4px] border border-line bg-white px-4 h-[52px] text-[0.9375rem] text-ink placeholder:text-slate/60 transition-colors focus:border-teal-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40";

export function BookingForm({ dict }: { dict: Dict }) {
  const { form: t, services } = dict;
  const params = useSearchParams();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const s = params.get("service");
    const d = params.get("date");
    setValues((v) => ({
      ...v,
      ...(s && services.some((x) => x.id === s) ? { service: s } : {}),
      ...(d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? { date: d } : {}),
    }));
  }, [params, services]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values, t.errors);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    // Demonstration only: no backend. Nothing is transmitted or stored.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-line bg-white p-8 md:p-10">
        <p className="eyebrow">{t.done.eyebrow}</p>
        <h3 className="h3 mt-4 text-navy">{t.done.title.replace("{name}", values.name.trim().split(" ")[0])}</h3>
        <p className="mt-4 text-[0.9375rem] text-slate">{t.done.body}</p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
          className="mt-8 text-[0.875rem] font-semibold text-teal-deep underline underline-offset-4 hover:text-navy"
        >
          {t.done.again}
        </button>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm text-[#9b2c2c]">
        {errors[k]}
      </p>
    ) : null;
  const a = (k: keyof Values) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const label = "mb-2 block text-[0.75rem] font-bold uppercase tracking-[0.12em] text-navy";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 border border-line bg-white p-6 sm:grid-cols-2 md:p-10">
      <div className="sm:col-span-2">
        <label htmlFor="f-name" className={label}>{t.name}</label>
        <input {...a("name")} type="text" autoComplete="name" className={field} />
        <Err k="name" />
      </div>
      <div>
        <label htmlFor="f-email" className={label}>{t.email}</label>
        <input {...a("email")} type="email" autoComplete="email" dir="ltr" className={`${field} text-start`} />
        <Err k="email" />
      </div>
      <div>
        <label htmlFor="f-phone" className={label}>{t.phone}</label>
        <input {...a("phone")} type="tel" autoComplete="tel" dir="ltr" className={`${field} text-start`} />
        <Err k="phone" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-service" className={label}>{t.service}</label>
        <select {...a("service")} className={field}>
          <option value="">{t.selectService}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <Err k="service" />
      </div>
      <div>
        <label htmlFor="f-date" className={label}>{t.date}</label>
        <input {...a("date")} type="date" min={new Date().toISOString().slice(0, 10)} className={field} />
        <Err k="date" />
      </div>
      <div>
        <label htmlFor="f-time" className={label}>{t.time}</label>
        <select {...a("time")} className={field}>
          <option value="">{t.selectTime}</option>
          {times.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
        <Err k="time" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className={label}>
          {t.message} <span className="font-normal normal-case tracking-normal text-slate">{t.optional}</span>
        </label>
        <textarea {...a("message")} rows={4} maxLength={500} placeholder={t.placeholder} className={`${field} h-auto py-3`} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[52px] w-full items-center justify-center rounded-[4px] bg-teal-deep px-8 text-[0.875rem] font-semibold text-white transition-colors hover:bg-navy disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? t.sending : t.submit}
        </button>
        <p className="mt-4 text-xs text-slate">{t.demoNote}</p>
      </div>
    </form>
  );
}
