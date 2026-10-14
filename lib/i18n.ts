export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** Locale-prefixed internal link, e.g. href("ar", "#book") -> "/ar#book" */
export const href = (l: Locale, path = "") => `/${l}${path}`;
