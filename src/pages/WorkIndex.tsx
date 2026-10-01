import { ArrowUpRight, Code2, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { localize, profile, projects } from "@/data/portfolio";
import { projectPath, useLocale } from "@/lib/locale";

const WorkIndex = () => {
  const locale = useLocale();
  const activeProjects = projects.filter((project) => project.status.en.toLowerCase().includes("development"));
  const previewProject = (project: (typeof projects)[number]) => {
    window.dispatchEvent(new CustomEvent("room11:project-preview", {
      detail: {
        slug: project.slug,
        name: project.name,
        category: localize(project.category, locale),
        status: localize(project.status, locale),
        stack: project.stack,
        liveUrl: project.liveUrl,
        previewImage: project.previewImage,
      },
    }));
  };
  const clearPreview = () => window.dispatchEvent(new Event("room11:project-preview-clear"));

  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">01 — {locale === "en" ? "WORK INDEX" : "INDEX DES PROJETS"}</p><h1>{locale === "en" ? "Products across web, mobile, and platforms." : "Produits web, mobile et plateformes."}</h1><p>{locale === "en" ? "Project scope, technology, status, and estimated Cameroon-market build ranges." : "Périmètre, technologies, statut et estimations de réalisation pour le marché camerounais."}</p></header>
      <p className="work-preview-hint meta-label">{locale === "en" ? "HOVER OR FOCUS A PROJECT TO PREVIEW IT ON THE 3D MONITOR" : "SURVOLEZ OU SÉLECTIONNEZ UN PROJET POUR L’AFFICHER SUR L’ÉCRAN 3D"}</p>
      <div className="work-table-head meta-label"><span>NO.</span><span>{locale === "en" ? "PROJECT" : "PROJET"}</span><span>{locale === "en" ? "TYPE" : "TYPE"}</span><span>{locale === "en" ? "VALUE" : "VALEUR"}</span><span>{locale === "en" ? "STATUS" : "STATUT"}</span></div>
      <div className="work-table">
        {projects.map((project) => <Link to={projectPath(locale, project.slug)} className="work-row" key={project.slug} onPointerEnter={() => previewProject(project)} onPointerLeave={clearPreview} onPointerDown={() => previewProject(project)} onFocus={() => previewProject(project)} onBlur={clearPreview}><span>{project.number}</span><strong>{project.name}</strong><span>{localize(project.category, locale)}</span><span>{localize(project.price, locale)}</span><span>{localize(project.status, locale)}</span><ArrowUpRight /></Link>)}
      </div>

      <section className="work-signal-section" aria-labelledby="current-work-title">
        <div className="work-signal-heading"><span className="meta-label">GITHUB / CURRENT SIGNAL</span><h2 id="current-work-title">{locale === "en" ? "What I’m building now." : "Ce que je construis actuellement."}</h2><p>{locale === "en" ? "Active builds and completed case studies are organized for quick review." : "Les projets actifs et les études de cas terminées sont organisés pour une consultation rapide."}</p></div>
        <div className="current-builds">
          {activeProjects.map((project) => <Link to={projectPath(locale, project.slug)} key={project.slug}><Code2 size={18} /><span className="meta-label">{localize(project.status, locale)}</span><h3>{project.name}</h3><p>{localize(project.context, locale)}</p><small>{project.stack.join(" · ")} ↗</small></Link>)}
        </div>
      </section>

      <section className="github-contribution-panel" aria-labelledby="github-activity-title">
        <div><Github size={22} /><span className="meta-label">PUBLIC GITHUB ACTIVITY / LIVE</span><h2 id="github-activity-title">@Ryane23</h2><p>{locale === "en" ? "Public contribution activity and repositories from Ryan’s GitHub profile." : "Activité de contribution publique et dépôts du profil GitHub de Ryan."}</p><a href={`${profile.github}?tab=overview&from=2026-01-01&to=2026-12-31`} target="_blank" rel="noopener noreferrer">OPEN GITHUB PROFILE <ArrowUpRight size={14} /></a></div>
        <div className="github-calendar-frame"><img src="https://ghchart.xqsit94.in/Ryane23" alt="Ryan Erick's live GitHub contribution calendar for the past year" loading="lazy" /><span className="meta-label">SOURCE / PUBLIC GITHUB CONTRIBUTIONS · REFRESHED DAILY</span></div>
      </section>

      <div className="archive-note"><p className="meta-label">GITHUB / REPOSITORIES</p><p>{locale === "en" ? "Browse open-source work, technical experiments, and supporting repositories." : "Parcourez les travaux open source, les expérimentations techniques et les dépôts complémentaires."}</p><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">OPEN REPOSITORIES ↗</a></div>
    </div>
  );
};

export default WorkIndex;
