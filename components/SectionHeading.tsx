import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <p className={`eyebrow ${light ? "!text-teal-soft" : ""}`}>{eyebrow}</p>
      <h2 className={`h2 mt-4 max-w-[22ch] text-balance ${center ? "mx-auto" : ""} ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {children && (
        <p className={`lead mt-5 max-w-[56ch] ${center ? "mx-auto" : ""} ${light ? "!text-white/75" : ""}`}>{children}</p>
      )}
    </div>
  );
}
