/**
 * Prefixes public-folder paths with the deploy base path (e.g. "/Clinic-Website"
 * on GitHub Pages, where image optimisation is off and next/image does not add it).
 * Empty in local dev and normal builds.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
