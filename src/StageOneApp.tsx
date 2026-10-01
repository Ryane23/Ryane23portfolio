import { lazy, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/EditorialThemeContext";
import EditorialLayout from "@/components/EditorialLayout";
import LoadingScreen from "@/components/LoadingScreen";
import EditorialHome from "@/pages/EditorialHome";
import { preloadAllRoutes, routeModules } from "@/lib/routeModules";

const WorkIndex = lazy(routeModules.work);
const ProjectCaseStudy = lazy(routeModules.project);
const ProfilePage = lazy(routeModules.profile);
const RecordPage = lazy(routeModules.record);
const CertificationsPage = lazy(routeModules.certifications);
const LibraryPage = lazy(routeModules.library);
const ArticlePage = lazy(routeModules.article);
const AnimePage = lazy(routeModules.anime);
const FootballPage = lazy(routeModules.football);
const BeyondWorkPage = lazy(routeModules.beyond);
const CvPage = lazy(routeModules.cv);
const NetworkPage = lazy(routeModules.network);
const ReachOutPage = lazy(routeModules.contact);
const EditorialNotFound = lazy(routeModules.notFound);

const LocaleRedirect = () => <Navigate replace to={navigator.language.toLowerCase().startsWith("fr") ? "/fr" : "/en"} />;
const StageOneApp = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const finishIntro = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const idleId = idleWindow.requestIdleCallback?.(preloadAllRoutes, { timeout: 1200 });
    const timer = idleId === undefined ? window.setTimeout(preloadAllRoutes, 500) : undefined;
    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <LoadingScreen onComplete={finishIntro} />
        <div data-intro-complete={introComplete}>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<LocaleRedirect />} />
                <Route element={<EditorialLayout />}>
                  <Route path="/en" element={<EditorialHome />} /><Route path="/fr" element={<EditorialHome />} />
                  <Route path="/en/work" element={<WorkIndex />} /><Route path="/fr/projets" element={<WorkIndex />} />
                  <Route path="/en/work/:slug" element={<ProjectCaseStudy />} /><Route path="/fr/projets/:slug" element={<ProjectCaseStudy />} />
                  <Route path="/en/about" element={<ProfilePage />} /><Route path="/fr/a-propos" element={<ProfilePage />} />
                  <Route path="/en/experience" element={<RecordPage />} /><Route path="/fr/parcours" element={<RecordPage />} />
                  <Route path="/en/certifications" element={<CertificationsPage />} /><Route path="/fr/certifications" element={<CertificationsPage />} />
                  <Route path="/en/library" element={<LibraryPage />} /><Route path="/fr/bibliotheque" element={<LibraryPage />} />
                  <Route path="/en/library/:slug" element={<ArticlePage />} /><Route path="/fr/bibliotheque/:slug" element={<ArticlePage />} />
                  <Route path="/en/anime" element={<AnimePage />} /><Route path="/fr/anime" element={<AnimePage />} />
                  <Route path="/en/football" element={<FootballPage />} /><Route path="/fr/football" element={<FootballPage />} />
                  <Route path="/en/beyond-work" element={<BeyondWorkPage />} /><Route path="/fr/hors-travail" element={<BeyondWorkPage />} />
                  <Route path="/en/cv" element={<CvPage />} /><Route path="/fr/cv" element={<CvPage />} />
                  <Route path="/en/network" element={<NetworkPage />} /><Route path="/fr/reseau" element={<NetworkPage />} />
                  <Route path="/en/contact" element={<ReachOutPage />} /><Route path="/fr/contact" element={<ReachOutPage />} />
                  <Route path="/about" element={<Navigate replace to="/en/about" />} /><Route path="/projects" element={<Navigate replace to="/en/work" />} />
                  <Route path="/experience" element={<Navigate replace to="/en/experience" />} /><Route path="/resume" element={<Navigate replace to="/en/cv" />} />
                  <Route path="/contact" element={<Navigate replace to="/en/contact" />} /><Route path="*" element={<EditorialNotFound />} />
                </Route>
              </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default StageOneApp;
