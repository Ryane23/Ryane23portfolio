import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { localize, projects } from "@/data/portfolio";
import { projectPath, useLocale } from "@/lib/locale";

const WorkIndex = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">01 — {locale === "en" ? "WORK INDEX" : "INDEX DES PROJETS"}</p><h1>{locale === "en" ? "Selected work, documented honestly." : "Des projets sélectionnés, documentés honnêtement."}</h1><p>{locale === "en" ? "Prices are Cameroon-market comparable build values—not claims about what a client paid." : "Les prix indiquent une valeur de réalisation comparable au marché camerounais, et non le montant payé par un client."}</p></header>
      <div className="work-table-head meta-label"><span>NO.</span><span>{locale === "en" ? "PROJECT" : "PROJET"}</span><span>{locale === "en" ? "TYPE" : "TYPE"}</span><span>{locale === "en" ? "VALUE" : "VALEUR"}</span><span>{locale === "en" ? "STATUS" : "STATUT"}</span></div>
      <div className="work-table">
        {projects.map((project) => <Link to={projectPath(locale, project.slug)} className="work-row" key={project.slug}><span>{project.number}</span><strong>{project.name}</strong><span>{localize(project.category, locale)}</span><span>{localize(project.price, locale)}</span><span>{localize(project.status, locale)}</span><ArrowUpRight /></Link>)}
      </div>
      <div className="archive-note"><p className="meta-label">GITHUB / ARCHIVE</p><p>{locale === "en" ? "Experiments, coursework, and smaller repositories remain available in the code archive without being presented as commercial case studies." : "Les expérimentations, travaux académiques et petits dépôts restent disponibles dans l’archive de code sans être présentés comme des études de cas commerciales."}</p><a href="https://github.com/Ryane23?tab=repositories" target="_blank" rel="noopener noreferrer">OPEN GITHUB ARCHIVE ↗</a></div>
    </div>
  );
};

export default WorkIndex;
