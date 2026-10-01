import { Link } from "react-router-dom";
import RyanMark from "@/components/RyanMark";
import { profile } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";

const EditorialFooter = () => {
  const locale = useLocale();
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="meta-label">{locale === "en" ? "CONTACT" : "CONTACT"}</p>
        <Link to={paths.contact[locale]}>{locale === "en" ? "START A CONVERSATION." : "COMMENÇONS UNE CONVERSATION."}<span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-grid">
        <div className="footer-identity"><RyanMark className="footer-mark" /><div><strong>{profile.shortName}</strong><span>{profile.location}</span></div></div>
        <div><span className="meta-label">EMAIL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div><span className="meta-label">PROFILES</span><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href={profile.x} target="_blank" rel="noopener noreferrer">X ↗</a></div>
        <div><span className="meta-label">DIRECT</span><a href={`https://wa.me/${profile.phones[0].replace(/\D/g, "")}`}>WHATSAPP ↗</a><a href={`tel:${profile.phones[0].replace(/[^\d+]/g, "")}`}>CALL ↗</a><Link to={paths.cv[locale]}>CV ↗</Link><span>© {new Date().getFullYear()}</span></div>
      </div>
    </footer>
  );
};

export default EditorialFooter;
