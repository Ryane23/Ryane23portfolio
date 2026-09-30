import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles, experiences, localize, profile, projects, skillGroups } from "@/data/portfolio";
import NetworkPreview from "@/components/NetworkPreview";
import { articlePath, paths, projectPath, useLocale } from "@/lib/locale";

const EditorialHome = () => {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((project) => project.featured).slice(0, 6);

  const reveal = (delay = 0) => reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <>
      <section className="editorial-hero section-pad">
        <div className="hero-name" aria-label="Ryan Erick"><span>RYAN</span><span>ERICK</span></div>
        <motion.div className="hero-meta hero-meta-left" {...reveal(0.1)}>
          <span className="meta-label">01 / PROFILE</span>
          <strong>{locale === "en" ? "4 VERIFIED ROLES" : "4 RÔLES VÉRIFIÉS"}</strong>
          <span>{locale === "en" ? "WEB · MOBILE · SYSTEMS" : "WEB · MOBILE · SYSTÈMES"}</span>
        </motion.div>
        <motion.div className="hero-meta hero-meta-right" {...reveal(0.2)}>
          <span className="meta-label">{profile.location.toUpperCase()}</span>
          <strong>{localize(profile.role, locale)}</strong>
          <span>{locale === "en" ? "AVAILABLE FOR SELECT PROJECTS" : "DISPONIBLE POUR DES PROJETS SÉLECTIONNÉS"}</span>
        </motion.div>
        <motion.div className="hero-intro room-copy-panel" {...reveal(0.25)}>
          <span className="display-serif">{locale === "en" ? "Hello," : "Bonjour,"}</span>
          <h1>{localize(profile.role, locale)}</h1>
          <p>{localize(profile.summary, locale)}</p>
          <div className="hero-actions"><Link className="solid-action" to={paths.work[locale]}>{locale === "en" ? "EXPLORE THE WORK" : "EXPLORER LES PROJETS"}<ArrowUpRight size={16} /></Link><Link className="text-action" to={paths.about[locale]}>{locale === "en" ? "ABOUT RYAN" : "À PROPOS"}</Link></div>
        </motion.div>
        <a href="#selected-work" className="scroll-cue"><span>{locale === "en" ? "SCROLL TO EXPLORE" : "DÉFILER POUR EXPLORER"}</span><ArrowDown size={16} /></a>
      </section>

      <section id="selected-work" className="editorial-section section-pad">
        <div className="section-heading"><span className="section-number">02</span><div><p className="meta-label">{locale === "en" ? "SELECTED WORK" : "PROJETS SÉLECTIONNÉS"}</p><h2>{locale === "en" ? "Projects with real context." : "Des projets avec un contexte réel."}</h2></div><Link to={paths.work[locale]}>{locale === "en" ? "VIEW ALL" : "TOUT VOIR"} ↗</Link></div>
        <div className="project-index">
          {featured.map((project) => (
            <Link className="project-index-row" key={project.slug} to={projectPath(locale, project.slug)}>
              <span>{project.number}</span><strong>{project.name}</strong><span>{localize(project.category, locale)}</span><span>{localize(project.price, locale)}</span><ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="record-section section-pad inverse-section">
        <div className="section-heading"><span className="section-number">03</span><div><p className="meta-label">{locale === "en" ? "PROFESSIONAL RECORD" : "PARCOURS PROFESSIONNEL"}</p><h2>{locale === "en" ? "A short history of learning and shipping." : "Un parcours d’apprentissage et de réalisation."}</h2></div><Link to={paths.experience[locale]}>{locale === "en" ? "FULL RECORD" : "PARCOURS COMPLET"} ↗</Link></div>
        <div className="record-list">
          {experiences.slice(0, 4).map((item) => <div className="record-row" key={`${item.organization}-${item.period}`}><span>{item.period}</span><strong>{localize(item.role, locale)}</strong><span>{item.organization}</span></div>)}
        </div>
      </section>

      <section className="editorial-section section-pad">
        <div className="section-heading"><span className="section-number">04</span><div><p className="meta-label">{locale === "en" ? "CAPABILITIES" : "COMPÉTENCES"}</p><h2>{locale === "en" ? "Built around complete products." : "Pensé autour de produits complets."}</h2></div></div>
        <div className="capability-grid">
          {skillGroups.map((group, index) => <div className="capability-block" key={group.title.en}><span className="meta-label">0{index + 1}</span><h3>{localize(group.title, locale)}</h3><p>{group.items.join(" · ")}</p></div>)}
        </div>
      </section>

      <section className="worlds-section section-pad">
        <div className="section-heading"><span className="section-number">05</span><div><p className="meta-label">{locale === "en" ? "COMMUNITY & FOOTBALL" : "COMMUNAUTÉ & FOOTBALL"}</p><h2>{locale === "en" ? "Two human corners of the room." : "Deux espaces humains dans la pièce."}</h2></div></div>
        <div className="world-grid">
          <Link to={paths.network[locale]} className="world-card anime-world"><span className="meta-label">COMMUNITY / ARCHIVE</span><strong>KIDEFIND<br />AMKAY</strong><span>{locale === "en" ? "OPEN COMMUNITY ARCHIVE" : "OUVRIR L’ARCHIVE COMMUNAUTAIRE"} ↗</span></Link>
          <Link to={paths.football[locale]} className="world-card football-world"><img className="world-raphinha" src="/images/football/raphinha-11-goal.svg" alt="" /><span className="meta-label">MATCH / 21.01.2025</span><strong>11<br />90+6</strong><span>{locale === "en" ? "ENTER FOOTBALL ROOM" : "ENTRER DANS LA SALLE FOOTBALL"} ↗</span></Link>
        </div>
      </section>

      <NetworkPreview />

      <section className="editorial-section section-pad">
        <div className="section-heading"><span className="section-number">07</span><div><p className="meta-label">LIBRARY</p><h2>{locale === "en" ? "Notes from work in progress." : "Notes d’un travail en cours."}</h2></div><Link to={paths.library[locale]}>{locale === "en" ? "OPEN LIBRARY" : "OUVRIR LA BIBLIOTHÈQUE"} ↗</Link></div>
        <div className="article-grid">
          {articles.map((article) => <Link to={articlePath(locale, article.slug)} key={article.slug} className="article-card"><span className="meta-label">{localize(article.status, locale)}</span><h3>{localize(article.title, locale)}</h3><p>{localize(article.excerpt, locale)}</p><span>{article.topics.join(" / ")}</span></Link>)}
        </div>
      </section>
    </>
  );
};

export default EditorialHome;
