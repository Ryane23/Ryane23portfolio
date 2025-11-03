import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import NowDoing from "@/components/NowDoing";
import Education from "@/components/Education";
import NGOGallery from "@/components/NGOGallery";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Blog from "@/components/Blog";
import CaseStudies from "@/components/CaseStudies";
import Guestbook from "@/components/Guestbook";
import GitHubProfile from "@/components/GitHubProfile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import AIAssistant from "@/components/AIAssistant";
// import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <NowDoing />
      <Education />
      <NGOGallery />
      <Projects />
      <TechStack />
      <CaseStudies />
      <Blog />
      <GitHubProfile />
      <Guestbook />
      <Contact />
      <Footer />
      <MusicPlayer />
      <AIAssistant />
      {/* <SpotifyNowPlaying /> */}
    </div>
  );
};

export default Index;
