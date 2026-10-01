import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BookOpen, Gamepad2, Goal, Headphones, LibraryBig, MessageCircle } from "lucide-react";
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

      <section id="beyond" className="worlds-section section-pad beyond-home" data-room-stop="beyond">
        <div className="section-heading"><span className="section-number">04</span><div><p className="meta-label">{locale === "en" ? "BEYOND WORK" : "HORS TRAVAIL"}</p><h2>{locale === "en" ? "The interests that keep me curious." : "Les passions qui nourrissent ma curiosité."}</h2></div></div>
        <div className="interest-grid" aria-label={locale === "en" ? "Personal interests" : "Centres d’intérêt"}>
          <Link to={paths.football[locale]} className="interest-card"><Goal /><span className="interest-visual interest-visual-ball" aria-hidden="true" /><small>01 / FOOTBALL</small><strong>FC BARCELONA</strong><span>{locale === "en" ? "Club, tactics, Messi." : "Club, tactique, Messi."} ↗</span></Link>
          <Link to={paths.anime[locale]} className="interest-card"><BookOpen /><span className="interest-visual interest-visual-level" aria-hidden="true" /><small>02 / ANIME</small><strong>DBZ · SOLO LEVELING</strong><span>{locale === "en" ? "Progress and resilience." : "Progression et résilience."} ↗</span></Link>
          <article className="interest-card"><Gamepad2 /><span className="interest-visual interest-visual-pulse" aria-hidden="true" /><small>03 / GAMING</small><strong>PLAY & STRATEGY</strong><span>{locale === "en" ? "Systems, timing, teamwork." : "Systèmes, rythme, équipe."}</span></article>
          <article className="interest-card"><LibraryBig /><span className="interest-visual interest-visual-pages" aria-hidden="true" /><small>04 / READING</small><strong>IDEAS & STORIES</strong><span>{locale === "en" ? "Learning beyond the screen." : "Apprendre au-delà de l’écran."}</span></article>
          <article className="interest-card"><Headphones /><span className="interest-visual interest-visual-wave" aria-hidden="true" /><small>05 / MUSIC</small><strong>FOCUS MODE</strong><span>{locale === "en" ? "Sound for deep work." : "Le son pour se concentrer."}</span></article>
          <article className="interest-card"><MessageCircle /><span className="interest-visual interest-visual-talk" aria-hidden="true" /><small>06 / SPEAKING</small><strong>SHARE & MENTOR</strong><span>{locale === "en" ? "Making knowledge useful." : "Rendre le savoir utile."}</span></article>
        </div>
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
