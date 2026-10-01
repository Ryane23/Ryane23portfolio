import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { localize, projects } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";

const ProjectCaseStudy = () => {
  const locale = useLocale();
  const { slug } = useParams();
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return <div className="page-shell section-pad"><p>Project not found.</p><Link to={paths.work[locale]}>Back to work</Link></div>;

  return (
    <article className="case-study page-shell section-pad">
      <Link className="back-link" to={paths.work[locale]}><ArrowLeft size={16} />{locale === "en" ? "WORK INDEX" : "INDEX DES PROJETS"}</Link>
      <header className="case-hero"><div><p className="meta-label">CASE / {project.number}</p><h1>{project.name}</h1></div><div className="case-facts"><span><small>{locale === "en" ? "TYPE" : "TYPE"}</small>{localize(project.category, locale)}</span><span><small>{locale === "en" ? "STATUS" : "STATUT"}</small>{localize(project.status, locale)}</span><span><small>{locale === "en" ? "MARKET VALUE" : "VALEUR MARCHÉ"}</small>{localize(project.price, locale)}</span></div></header>

      <div className={`project-preview project-preview-${project.preview}`}>
        {project.preview === "embed" && project.liveUrl ? <iframe title={`${project.name} live preview`} src={project.liveUrl} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" /> : <div className="preview-placeholder"><span className="meta-label">{locale === "en" ? "PROJECT OVERVIEW" : "APERÇU DU PROJET"}</span><strong>{project.name}</strong><p>{locale === "en" ? "Visual documentation is being prepared for this case study." : "La documentation visuelle de cette étude de cas est en préparation."}</p></div>}
      </div>
      <div className="case-link-row">
        {project.liveUrl && <a className="solid-action" href={project.liveUrl} target="_blank" rel="noopener noreferrer">{locale === "en" ? "VISIT LIVE SITE" : "VISITER LE SITE"}<ArrowUpRight size={16} /></a>}
        {project.repoUrl && <a className="outline-action" href={project.repoUrl} target="_blank" rel="noopener noreferrer">{locale === "en" ? "VIEW REPOSITORY" : "VOIR LE DÉPÔT"}<ArrowUpRight size={16} /></a>}
      </div>
      <div className="case-narrative">
        <section><span className="meta-label">01 / CONTEXT</span><h2>{locale === "en" ? "Why it exists" : "Pourquoi ce projet existe"}</h2><p>{localize(project.context, locale)}</p></section>
        <section><span className="meta-label">02 / ROLE</span><h2>{locale === "en" ? "Ryan’s contribution" : "Contribution de Ryan"}</h2><p>{localize(project.role, locale)}</p></section>
        <section><span className="meta-label">03 / OUTCOME</span><h2>{locale === "en" ? "Project outcome" : "Résultat du projet"}</h2><p>{localize(project.outcome, locale)}</p></section>
        <section><span className="meta-label">04 / LESSON</span><h2>{locale === "en" ? "What remains" : "Ce qui reste"}</h2><p>{localize(project.lesson, locale)}</p></section>
      </div>
      <div className="case-stack"><span className="meta-label">STACK / CAPABILITIES</span><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
    </article>
  );
};

export default ProjectCaseStudy;
