import { experiences, localize } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

const RecordPage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">03 — {locale === "en" ? "PROFESSIONAL RECORD" : "PARCOURS PROFESSIONNEL"}</p><h1>{locale === "en" ? "Software, teaching, and leadership experience." : "Expérience en logiciel, enseignement et leadership."}</h1><p>{locale === "en" ? "Roles, responsibilities, and career milestones." : "Fonctions, responsabilités et étapes du parcours professionnel."}</p></header>
      <div className="experience-timeline">{experiences.map((item, index) => <article key={`${item.organization}-${item.period}`}><div className="timeline-index">0{index + 1}</div><div><span className="meta-label">{item.period}</span><h2>{localize(item.role, locale)}</h2><strong>{item.organization}</strong><p>{localize(item.description, locale)}</p></div></article>)}</div>
      <section className="leadership-callout"><span className="meta-label">PROJECT LEADERSHIP</span><h2>PROJECT EAGLE</h2><p>{locale === "en" ? "Project leadership across planning, repository coordination, implementation, and delivery." : "Direction du projet : planification, coordination du dépôt, implémentation et livraison."}</p></section>
    </div>
  );
};

export default RecordPage;
