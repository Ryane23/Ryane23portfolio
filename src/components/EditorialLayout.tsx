import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EditorialNavigation from "@/components/EditorialNavigation";
import EditorialFooter from "@/components/EditorialFooter";
import MusicPlayer from "@/components/EditorialMusicPlayer";
import RoomScene from "@/components/RoomScene";

const EditorialLayout = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return <div className="site-shell"><RoomScene /><EditorialNavigation /><main id="main-content"><Suspense fallback={<div className="route-fallback meta-label" role="status">OPENING ROOM…</div>}><Outlet /></Suspense></main><EditorialFooter /><MusicPlayer /></div>;
};

export default EditorialLayout;
