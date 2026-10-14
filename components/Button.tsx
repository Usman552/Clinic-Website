import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "teal" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-navy text-white border border-navy hover:bg-navy-deep hover:border-navy-deep",
  outline: "bg-white text-navy border border-navy/25 hover:border-navy hover:bg-navy hover:text-white",
  teal: "bg-teal-deep text-white border border-teal-deep hover:bg-white hover:text-navy hover:border-white",
  "ghost-light": "bg-transparent text-white border border-white/40 hover:bg-white hover:text-navy",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-[4px] px-8 text-[0.875rem] font-semibold tracking-[0.01em] transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Direction-aware arrow: points "forward" in both LTR and RTL. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 ${className}`}
    >
      →
    </span>
  );
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.875rem] font-semibold transition-colors ${
        light ? "text-white hover:text-teal-soft" : "text-teal-deep hover:text-navy"
      }`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
