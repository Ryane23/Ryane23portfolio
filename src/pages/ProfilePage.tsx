import ryanProfile from "@/assets/ryan-profile.webp";
import { education, localize, profile } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";
import TechStackGrid from "@/components/TechStackGrid";

const ProfilePage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="profile-hero"><div><p className="meta-label">02 — {locale === "en" ? "ABOUT" : "À PROPOS"}</p><h1>{locale === "en" ? "Software, systems, and useful digital products." : "Logiciels, systèmes et produits numériques utiles."}</h1><p>{localize(profile.summary, locale)}</p><Link className="solid-action" to={paths.cv[locale]}>{locale === "en" ? "VIEW CV" : "VOIR LE CV"} →</Link></div><figure><img src={ryanProfile} alt="Ryan Erick Ngu Javea Fominyen" /></figure></header>
      <section className="fact-strip"><div><span className="meta-label">BASE</span><strong>{profile.location}</strong></div><div><span className="meta-label">LANGUAGES</span><strong>English · Français</strong></div><div><span className="meta-label">FOCUS</span><strong>Web · Mobile · APIs · Data</strong></div><div><span className="meta-label">{locale === "en" ? "PRACTICE" : "PRATIQUE"}</span><strong>{locale === "en" ? "Full-stack product development" : "Développement de produits full-stack"}</strong></div></section>
      <section className="content-section"><div className="section-heading"><span className="section-number">01</span><div><p className="meta-label">{locale === "en" ? "EDUCATION" : "FORMATION"}</p><h2>{locale === "en" ? "Academic foundation." : "Parcours académique."}</h2></div></div><div className="record-list light-record">{education.map((item) => <div className="record-row" key={item.school}><span>{item.period}</span><strong>{localize(item.qualification, locale)}</strong><span>{item.school}</span></div>)}</div></section>
      <section className="content-section"><div className="section-heading"><span className="section-number">02</span><div><p className="meta-label">{locale === "en" ? "TECHNOLOGY STACK" : "STACK TECHNOLOGIQUE"}</p><h2>{locale === "en" ? "The tools behind the products." : "Les outils derrière les produits."}</h2></div></div><TechStackGrid locale={locale} /></section>
    </div>
  );
};

export default ProfilePage;
