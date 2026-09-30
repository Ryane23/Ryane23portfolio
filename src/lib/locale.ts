import { useLocation } from "react-router-dom";
import type { Locale } from "@/data/portfolio";

export const useLocale = (): Locale => {
  const { pathname } = useLocation();
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
};

export const paths = {
  home: { en: "/en", fr: "/fr" },
  work: { en: "/en/work", fr: "/fr/projets" },
  about: { en: "/en/about", fr: "/fr/a-propos" },
  experience: { en: "/en/experience", fr: "/fr/parcours" },
  anime: { en: "/en/anime", fr: "/fr/anime" },
  football: { en: "/en/football", fr: "/fr/football" },
  library: { en: "/en/library", fr: "/fr/bibliotheque" },
  network: { en: "/en/network", fr: "/fr/reseau" },
  cv: { en: "/en/cv", fr: "/fr/cv" },
  contact: { en: "/en/contact", fr: "/fr/contact" },
} as const;

export const projectPath = (locale: Locale, slug: string) =>
  locale === "fr" ? `/fr/projets/${slug}` : `/en/work/${slug}`;

export const articlePath = (locale: Locale, slug: string) =>
  locale === "fr" ? `/fr/bibliotheque/${slug}` : `/en/library/${slug}`;
