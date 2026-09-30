import { ExternalLink, Mail, Phone } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const ReachOutPage = () => {
  const locale = useLocale();
  return (
    <div className="contact-page section-pad">
      <header><p className="meta-label">06 — CONTACT</p><h1>{locale === "en" ? "Have a useful problem to solve?" : "Un problème utile à résoudre ?"}</h1><p>{locale === "en" ? "Share the context, audience, constraints, and intended outcome. Ryan will respond through the channel you choose." : "Partagez le contexte, le public, les contraintes et le résultat attendu. Ryan répondra par le canal choisi."}</p><Link className="outline-action" to={paths.cv[locale]}>{locale === "en" ? "VIEW OR DOWNLOAD CV" : "VOIR OU TÉLÉCHARGER LE CV"} →</Link></header>
      <div className="contact-channels"><a href={`mailto:${profile.email}`}><Mail /><span><small>EMAIL</small><strong>{profile.email}</strong></span><ExternalLink /></a>{profile.phones.map((phone) => <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" key={phone}><Phone /><span><small>WHATSAPP</small><strong>{phone}</strong></span><ExternalLink /></a>)}<a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span className="contact-letter">in</span><span><small>LINKEDIN</small><strong>Ryan Erick</strong></span><ExternalLink /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><span className="contact-letter">GH</span><span><small>GITHUB</small><strong>@Ryane23</strong></span><ExternalLink /></a></div>
      <aside className="contact-status"><span className="status-dot" /><div><span className="meta-label">{locale === "en" ? "CURRENT STATUS" : "STATUT ACTUEL"}</span><strong>{locale === "en" ? "Available for select freelance and collaborative projects." : "Disponible pour certains projets freelance et collaboratifs."}</strong></div></aside>
    </div>
  );
};

export default ReachOutPage;
