import { experiences, localize } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

const RecordPage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">03 — {locale === "en" ? "PROFESSIONAL RECORD" : "PARCOURS PROFESSIONNEL"}</p><h1>{locale === "en" ? "Experience without inflated claims." : "Une expérience sans affirmations exagérées."}</h1><p>{locale === "en" ? "Roles and dates are aligned with Ryan’s September 2026 CV and confirmed corrections." : "Les rôles et dates sont alignés sur le CV de septembre 2026 et les corrections confirmées."}</p></header>
      <div className="experience-timeline">{experiences.map((item, index) => <article key={`${item.organization}-${item.period}`}><div className="timeline-index">0{index + 1}</div><div><span className="meta-label">{item.period}</span><h2>{localize(item.role, locale)}</h2><strong>{item.organization}</strong><p>{localize(item.description, locale)}</p></div></article>)}</div>
      <section className="leadership-callout"><span className="meta-label">PROJECT LEADERSHIP</span><h2>PROJECT EAGLE</h2><p>{locale === "en" ? "Ryan’s Project Lead role is confirmed. Product details and media remain limited until private materials are approved for publication." : "Le rôle de chef de projet de Ryan est confirmé. Les détails et médias restent limités jusqu’à validation des éléments privés."}</p></section>
    </div>
  );
};

export default RecordPage;
