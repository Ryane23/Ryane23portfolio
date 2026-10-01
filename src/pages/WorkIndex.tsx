import { ArrowUpRight, Code2, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { localize, profile, projects } from "@/data/portfolio";
import { projectPath, useLocale } from "@/lib/locale";

const WorkIndex = () => {
  const locale = useLocale();
  const activeProjects = projects.filter((project) => project.status.en.toLowerCase().includes("development"));
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">01 — {locale === "en" ? "WORK INDEX" : "INDEX DES PROJETS"}</p><h1>{locale === "en" ? "Products across web, mobile, and platforms." : "Produits web, mobile et plateformes."}</h1><p>{locale === "en" ? "Project scope, technology, status, and estimated Cameroon-market build ranges." : "Périmètre, technologies, statut et estimations de réalisation pour le marché camerounais."}</p></header>
      <div className="work-table-head meta-label"><span>NO.</span><span>{locale === "en" ? "PROJECT" : "PROJET"}</span><span>{locale === "en" ? "TYPE" : "TYPE"}</span><span>{locale === "en" ? "VALUE" : "VALEUR"}</span><span>{locale === "en" ? "STATUS" : "STATUT"}</span></div>
      <div className="work-table">
        {projects.map((project) => <Link to={projectPath(locale, project.slug)} className="work-row" key={project.slug}><span>{project.number}</span><strong>{project.name}</strong><span>{localize(project.category, locale)}</span><span>{localize(project.price, locale)}</span><span>{localize(project.status, locale)}</span><ArrowUpRight /></Link>)}
      </div>

      <section className="work-signal-section" aria-labelledby="current-work-title">
        <div className="work-signal-heading"><span className="meta-label">GITHUB / CURRENT SIGNAL</span><h2 id="current-work-title">{locale === "en" ? "What I’m building now." : "Ce que je construis actuellement."}</h2><p>{locale === "en" ? "Active builds and completed case studies are organized for quick review." : "Les projets actifs et les études de cas terminées sont organisés pour une consultation rapide."}</p></div>
        <div className="current-builds">
          {activeProjects.map((project) => <Link to={projectPath(locale, project.slug)} key={project.slug}><Code2 size={18} /><span className="meta-label">{localize(project.status, locale)}</span><h3>{project.name}</h3><p>{localize(project.context, locale)}</p><small>{project.stack.join(" · ")} ↗</small></Link>)}
        </div>
      </section>

      <section className="github-contribution-panel" aria-labelledby="github-activity-title">
        <div><Github size={22} /><span className="meta-label">PUBLIC GITHUB ACTIVITY / LIVE</span><h2 id="github-activity-title">@Ryane23</h2><p>{locale === "en" ? "A live rendering of the public contribution history on Ryan’s GitHub profile. Private work is not exposed." : "Un rendu en direct de l’historique public des contributions sur le profil GitHub de Ryan. Le travail privé n’est pas exposé."}</p><a href={`${profile.github}?tab=overview&from=2026-01-01&to=2026-12-31`} target="_blank" rel="noopener noreferrer">OPEN GITHUB PROFILE <ArrowUpRight size={14} /></a></div>
        <div className="github-calendar-frame"><img src="https://ghchart.xqsit94.in/Ryane23" alt="Ryan Erick's live GitHub contribution calendar for the past year" loading="lazy" /><span className="meta-label">SOURCE / PUBLIC GITHUB CONTRIBUTIONS · REFRESHED DAILY</span></div>
      </section>

      <div className="archive-note"><p className="meta-label">GITHUB / ARCHIVE</p><p>{locale === "en" ? "Experiments, coursework, and smaller repositories remain available in the code archive without being presented as commercial case studies." : "Les expérimentations, travaux académiques et petits dépôts restent disponibles dans l’archive de code sans être présentés comme des études de cas commerciales."}</p><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">OPEN GITHUB ARCHIVE ↗</a></div>
    </div>
  );
};

export default WorkIndex;
