import { ExternalLink, Github, Linkedin, Mail, MessageCircle, PhoneCall } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const ReachOutPage = () => {
  const locale = useLocale();
  return (
    <div className="contact-page section-pad">
      <header><p className="meta-label">06 — CONTACT</p><h1>{locale === "en" ? "Let’s discuss your project." : "Parlons de votre projet."}</h1><p>{locale === "en" ? "Call, send a WhatsApp message, or email Ryan directly." : "Appelez Ryan ou contactez-le directement par WhatsApp ou par e-mail."}</p><Link className="outline-action" to={paths.cv[locale]}>{locale === "en" ? "VIEW CV" : "VOIR LE CV"} →</Link></header>
      <div className="contact-channels">
        {profile.phones.map((phone) => {
          const telephone = phone.replace(/[^\d+]/g, "");
          const whatsapp = phone.replace(/\D/g, "");
          return <article className="phone-contact" key={phone}><PhoneCall /><span><small>{locale === "en" ? "PHONE" : "TÉLÉPHONE"}</small><strong>{phone}</strong></span><div className="phone-actions"><a href={`tel:${telephone}`}><PhoneCall size={15} />{locale === "en" ? "CALL" : "APPELER"}</a><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} />WHATSAPP</a></div></article>;
        })}
        <a className="contact-channel" href={`mailto:${profile.email}`}><Mail /><span><small>EMAIL</small><strong>{profile.email}</strong></span><ExternalLink /></a>
        <a className="contact-channel" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /><span><small>LINKEDIN</small><strong>Ryan Erick</strong></span><ExternalLink /></a>
        <a className="contact-channel" href={profile.github} target="_blank" rel="noopener noreferrer"><Github /><span><small>GITHUB</small><strong>@Ryane23</strong></span><ExternalLink /></a>
      </div>
      <aside className="contact-status"><span className="status-dot" /><div><span className="meta-label">{locale === "en" ? "AVAILABILITY" : "DISPONIBILITÉ"}</span><strong>{locale === "en" ? "Open to freelance and collaborative projects." : "Disponible pour des projets freelance et collaboratifs."}</strong></div></aside>
    </div>
  );
};

export default ReachOutPage;
