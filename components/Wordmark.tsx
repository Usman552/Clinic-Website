export function Wordmark({ light = false, label = "Clinic" }: { light?: boolean; label?: string }) {
  return (
    <span className="flex flex-col leading-none" dir="ltr">
      <span className={`font-brand text-[1.75rem] font-semibold tracking-[0.2em] ${light ? "text-white" : "text-navy"}`}>AURELLE</span>
      <span className={`mt-1.5 text-[0.625rem] font-bold uppercase tracking-[0.5em] ${light ? "text-teal-soft" : "text-teal-deep"}`}>
        {label === "Clinic" ? "Clinic" : <span className="tracking-normal">{label}</span>}
      </span>
    </span>
  );
}
