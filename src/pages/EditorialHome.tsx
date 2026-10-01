import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles, experiences, localize, profile, projects } from "@/data/portfolio";
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
      <section className="editorial-hero section-pad" data-room-stop="room">
        <div className="hero-name" aria-label="Ryan Erick"><span>RYAN</span><span>ERICK</span></div>
        <motion.div className="hero-meta hero-meta-left" {...reveal(0.1)}>
          <span className="meta-label">01 / PROFILE</span>
          <strong>{locale === "en" ? "FULL-STACK · MOBILE" : "FULL-STACK · MOBILE"}</strong>
          <span>{locale === "en" ? "WEB · MOBILE · SYSTEMS" : "WEB · MOBILE · SYSTÈMES"}</span>
        </motion.div>
        <motion.div className="hero-meta hero-meta-right" {...reveal(0.2)}>
          <span className="meta-label">{profile.location.toUpperCase()}</span>
          <strong>{localize(profile.role, locale)}</strong>
          <span>{locale === "en" ? "BASED IN YAOUNDÉ · CAMEROON" : "BASÉ À YAOUNDÉ · CAMEROUN"}</span>
        </motion.div>
        <motion.div className="hero-intro room-copy-panel" {...reveal(0.25)}>
          <span className="display-serif">{locale === "en" ? "Hello," : "Bonjour,"}</span>
          <h1>{localize(profile.role, locale)}</h1>
          <p>{localize(profile.summary, locale)}</p>
          <div className="hero-actions"><Link className="solid-action" to={paths.work[locale]}>{locale === "en" ? "EXPLORE THE WORK" : "EXPLORER LES PROJETS"}<ArrowUpRight size={16} /></Link><Link className="text-action" to={paths.about[locale]}>{locale === "en" ? "ABOUT RYAN" : "À PROPOS"}</Link></div>
        </motion.div>
        <a href="#selected-work" className="scroll-cue"><span>{locale === "en" ? "SCROLL TO EXPLORE" : "DÉFILER POUR EXPLORER"}</span><ArrowDown size={16} /></a>
      </section>

      <section id="selected-work" className="editorial-section section-pad" data-room-stop="work">
        <div className="section-heading"><span className="section-number">02</span><div><p className="meta-label">{locale === "en" ? "PROJECTS" : "PROJETS"}</p><h2>{locale === "en" ? "Web, mobile, and platform work." : "Projets web, mobile et plateformes."}</h2></div><Link to={paths.work[locale]}>{locale === "en" ? "VIEW ALL" : "TOUT VOIR"} ↗</Link></div>
        <div className="project-index">
          {featured.map((project) => (
            <Link className="project-index-row" key={project.slug} to={projectPath(locale, project.slug)}>
              <span>{project.number}</span><strong>{project.name}</strong><span>{localize(project.category, locale)}</span><span>{localize(project.price, locale)}</span><ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="record-section section-pad inverse-section" data-room-stop="record">
        <div className="section-heading"><span className="section-number">03</span><div><p className="meta-label">{locale === "en" ? "EXPERIENCE" : "PARCOURS"}</p><h2>{locale === "en" ? "Professional experience and responsibilities." : "Expérience professionnelle et responsabilités."}</h2></div><Link to={paths.experience[locale]}>{locale === "en" ? "VIEW EXPERIENCE" : "VOIR LE PARCOURS"} ↗</Link></div>
        <div className="record-list">
          {experiences.slice(0, 4).map((item) => <div className="record-row" key={`${item.organization}-${item.period}`}><span>{item.period}</span><strong>{localize(item.role, locale)}</strong><span>{item.organization}</span></div>)}
        </div>
      </section>

      <section className="worlds-section section-pad" data-room-stop="beyond">
        <div className="section-heading"><span className="section-number">04</span><div><p className="meta-label">{locale === "en" ? "BEYOND WORK" : "HORS TRAVAIL"}</p><h2>{locale === "en" ? "Football, anime, and community." : "Football, anime et engagement communautaire."}</h2></div><Link to={paths.beyond[locale]}>{locale === "en" ? "EXPLORE" : "EXPLORER"} ↗</Link></div>
        <Link to={paths.beyond[locale]} className="world-card beyond-world"><img className="world-raphinha" src="/images/football/raphinha-11-goal.svg" alt="" /><span className="meta-label">FOOTBALL / ANIME / COMMUNITY</span><strong>{locale === "en" ? "THE OTHER SIDE OF ME" : "L’AUTRE CÔTÉ DE MOI"}</strong><span>{locale === "en" ? "OPEN BEYOND WORK" : "OUVRIR HORS TRAVAIL"} ↗</span></Link>
      </section>

      <NetworkPreview />

      <section className="editorial-section section-pad" data-room-stop="library">
        <div className="section-heading"><span className="section-number">06</span><div><p className="meta-label">LIBRARY</p><h2>{locale === "en" ? "Notes from ongoing work." : "Notes sur les travaux en cours."}</h2></div><Link to={paths.library[locale]}>{locale === "en" ? "OPEN LIBRARY" : "OUVRIR LA BIBLIOTHÈQUE"} ↗</Link></div>
        <div className="article-grid">
          {articles.map((article) => <Link to={articlePath(locale, article.slug)} key={article.slug} className="article-card"><span className="meta-label">{localize(article.status, locale)}</span><h3>{localize(article.title, locale)}</h3><p>{localize(article.excerpt, locale)}</p><span>{article.topics.join(" / ")}</span></Link>)}
        </div>
      </section>
    </>
  );
};

export default EditorialHome;
