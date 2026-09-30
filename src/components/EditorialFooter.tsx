import { Link } from "react-router-dom";
import RyanMark from "@/components/RyanMark";
import { profile } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";

const EditorialFooter = () => {
  const locale = useLocale();
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="meta-label">{locale === "en" ? "AVAILABLE FOR SELECT PROJECTS" : "DISPONIBLE POUR DES PROJETS SÉLECTIONNÉS"}</p>
        <Link to={paths.contact[locale]}>{locale === "en" ? "LET’S BUILD SOMETHING USEFUL." : "CRÉONS QUELQUE CHOSE D’UTILE."}<span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-grid">
        <div className="footer-identity"><RyanMark className="footer-mark" /><div><strong>{profile.shortName}</strong><span>{profile.location}</span></div></div>
        <div><span className="meta-label">EMAIL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div><span className="meta-label">NETWORK</span><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div>
        <div><span className="meta-label">LOCAL TIME</span><span>Africa / Douala</span><span>© {new Date().getFullYear()}</span></div>
      </div>
    </footer>
  );
};

export default EditorialFooter;
