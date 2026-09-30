import { lazy, Suspense, useCallback, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/EditorialThemeContext";
import EditorialLayout from "@/components/EditorialLayout";
import LoadingScreen from "@/components/LoadingScreen";
import EditorialHome from "@/pages/EditorialHome";

const WorkIndex = lazy(() => import("@/pages/WorkIndex"));
const ProjectCaseStudy = lazy(() => import("@/pages/ProjectCaseStudy"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const RecordPage = lazy(() => import("@/pages/RecordPage"));
const LibraryPage = lazy(() => import("@/pages/LibraryPage"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const AnimePage = lazy(() => import("@/pages/AnimePage"));
const FootballPage = lazy(() => import("@/pages/FootballPage"));
const CvPage = lazy(() => import("@/pages/CvPage"));
const ReachOutPage = lazy(() => import("@/pages/ReachOutPage"));
const EditorialNotFound = lazy(() => import("@/pages/EditorialNotFound"));

const LocaleRedirect = () => <Navigate replace to={navigator.language.toLowerCase().startsWith("fr") ? "/fr" : "/en"} />;
const RouteFallback = () => <div className="route-fallback meta-label" role="status">OPENING ROOM…</div>;

const StageOneApp = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const finishIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <LoadingScreen onComplete={finishIntro} />
        <div data-intro-complete={introComplete}>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<LocaleRedirect />} />
                <Route element={<EditorialLayout />}>
                  <Route path="/en" element={<EditorialHome />} /><Route path="/fr" element={<EditorialHome />} />
                  <Route path="/en/work" element={<WorkIndex />} /><Route path="/fr/projets" element={<WorkIndex />} />
                  <Route path="/en/work/:slug" element={<ProjectCaseStudy />} /><Route path="/fr/projets/:slug" element={<ProjectCaseStudy />} />
                  <Route path="/en/about" element={<ProfilePage />} /><Route path="/fr/a-propos" element={<ProfilePage />} />
                  <Route path="/en/experience" element={<RecordPage />} /><Route path="/fr/parcours" element={<RecordPage />} />
                  <Route path="/en/library" element={<LibraryPage />} /><Route path="/fr/bibliotheque" element={<LibraryPage />} />
                  <Route path="/en/library/:slug" element={<ArticlePage />} /><Route path="/fr/bibliotheque/:slug" element={<ArticlePage />} />
                  <Route path="/en/anime" element={<AnimePage />} /><Route path="/fr/anime" element={<AnimePage />} />
                  <Route path="/en/football" element={<FootballPage />} /><Route path="/fr/football" element={<FootballPage />} />
                  <Route path="/en/cv" element={<CvPage />} /><Route path="/fr/cv" element={<CvPage />} />
                  <Route path="/en/contact" element={<ReachOutPage />} /><Route path="/fr/contact" element={<ReachOutPage />} />
                  <Route path="/about" element={<Navigate replace to="/en/about" />} /><Route path="/projects" element={<Navigate replace to="/en/work" />} />
                  <Route path="/experience" element={<Navigate replace to="/en/experience" />} /><Route path="/resume" element={<Navigate replace to="/en/cv" />} />
                  <Route path="/contact" element={<Navigate replace to="/en/contact" />} /><Route path="*" element={<EditorialNotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default StageOneApp;
