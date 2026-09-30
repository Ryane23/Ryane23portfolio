import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EditorialNavigation from "@/components/EditorialNavigation";
import EditorialFooter from "@/components/EditorialFooter";
import MusicPlayer from "@/components/EditorialMusicPlayer";

const EditorialLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [pathname]);
  return <div className="site-shell"><EditorialNavigation /><main id="main-content"><Outlet /></main><EditorialFooter /><MusicPlayer /></div>;
};

export default EditorialLayout;
