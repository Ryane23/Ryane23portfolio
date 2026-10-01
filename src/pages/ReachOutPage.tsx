import { ExternalLink, Github, Linkedin, Mail, MapPin, MessageCircle, PhoneCall, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const ReachOutPage = () => {
  const locale = useLocale();
  return (
    <div className="contact-page section-pad">
      <header><p className="meta-label">08 — CONTACT</p><h1>{locale === "en" ? "Start a conversation." : "Commençons une conversation."}</h1><p>{locale === "en" ? "For product work, collaboration, or professional enquiries, use any of the direct channels below." : "Pour un produit, une collaboration ou une demande professionnelle, utilisez l’un des contacts directs ci-dessous."}</p><div className="contact-location"><MapPin size={16} /><span>{profile.location}<small>Africa / Douala</small></span></div><Link className="outline-action" to={paths.cv[locale]}>{locale === "en" ? "VIEW CV" : "VOIR LE CV"} →</Link></header>
      <div className="contact-directory">
        <section className="contact-primary" aria-labelledby="primary-contact-title"><div className="contact-section-title"><span className="meta-label">01 / {locale === "en" ? "PRIMARY CONTACT" : "CONTACT PRINCIPAL"}</span><h2 id="primary-contact-title">{locale === "en" ? "Call or message." : "Appelez ou écrivez."}</h2></div>
        <div className="contact-channels">{profile.phones.map((phone) => {
          const telephone = phone.replace(/[^\d+]/g, "");
          const whatsapp = phone.replace(/\D/g, "");
          return <article className="phone-contact" key={phone}><PhoneCall /><span><small>{locale === "en" ? "PHONE" : "TÉLÉPHONE"}</small><strong>{phone}</strong></span><div className="phone-actions"><a href={`tel:${telephone}`}><PhoneCall size={15} />{locale === "en" ? "CALL" : "APPELER"}</a><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} />WHATSAPP</a></div></article>;
        })}</div></section>
        <section className="contact-profiles" aria-labelledby="professional-contact-title"><div className="contact-section-title"><span className="meta-label">02 / {locale === "en" ? "EMAIL & PROFILES" : "E-MAIL & PROFILS"}</span><h2 id="professional-contact-title">{locale === "en" ? "Professional channels." : "Canaux professionnels."}</h2></div><div className="contact-channels">
        <a className="contact-channel" href={`mailto:${profile.email}`}><Mail /><span><small>EMAIL</small><strong>{profile.email}</strong></span><ExternalLink /></a>
        <a className="contact-channel" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /><span><small>LINKEDIN</small><strong>Ryan Erick</strong></span><ExternalLink /></a>
        <a className="contact-channel" href={profile.github} target="_blank" rel="noopener noreferrer"><Github /><span><small>GITHUB</small><strong>@Ryane23</strong></span><ExternalLink /></a>
        <a className="contact-channel" href={profile.x} target="_blank" rel="noopener noreferrer"><Twitter /><span><small>X</small><strong>@ErickJavea55143</strong></span><ExternalLink /></a>
        </div></section>
      </div>
      <aside className="contact-status"><span className="status-dot" /><div><span className="meta-label">{locale === "en" ? "AVAILABILITY" : "DISPONIBILITÉ"}</span><strong>{locale === "en" ? "Open to freelance and collaborative projects." : "Disponible pour des projets freelance et collaboratifs."}</strong></div></aside>
    </div>
  );
};

export default ReachOutPage;
