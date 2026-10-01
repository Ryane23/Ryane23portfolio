import type { ComponentType } from "react";

type RouteModule = { default: ComponentType };

const cached = (loader: () => Promise<RouteModule>) => {
  let promise: Promise<RouteModule> | undefined;
  return () => (promise ??= loader());
};

export const routeModules = {
  work: cached(() => import("@/pages/WorkIndex")),
  project: cached(() => import("@/pages/ProjectCaseStudy")),
  profile: cached(() => import("@/pages/ProfilePage")),
  record: cached(() => import("@/pages/RecordPage")),
  certifications: cached(() => import("@/pages/CertificationsPage")),
  library: cached(() => import("@/pages/LibraryPage")),
  article: cached(() => import("@/pages/ArticlePage")),
  anime: cached(() => import("@/pages/AnimePage")),
  football: cached(() => import("@/pages/FootballPage")),
  cv: cached(() => import("@/pages/CvPage")),
  network: cached(() => import("@/pages/NetworkPage")),
  contact: cached(() => import("@/pages/ReachOutPage")),
  notFound: cached(() => import("@/pages/EditorialNotFound")),
};

export type RouteModuleKey = keyof typeof routeModules;

export const preloadRoute = (key: RouteModuleKey) => {
  void routeModules[key]();
};

export const preloadAllRoutes = () => {
  (["work", "project", "profile", "record", "certifications", "library", "article", "anime", "football", "cv", "network", "contact"] as RouteModuleKey[]).forEach(preloadRoute);
};
