import { ArrowUpRight, BookOpen, Goal, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const BeyondWorkPage = () => {
  const locale = useLocale();

  return (
    <div className="page-shell beyond-page section-pad">
      <header className="page-hero beyond-hero">
        <p className="meta-label">06 — {locale === "en" ? "BEYOND WORK" : "HORS TRAVAIL"}</p>
        <h1>{locale === "en" ? "The interests and communities beyond the code." : "Les passions et communautés au-delà du code."}</h1>
        <p>{locale === "en" ? "Football, stories, volunteering, mentoring, and the interests that shape how I work with people." : "Football, récits, bénévolat, mentorat et centres d’intérêt qui nourrissent ma manière de travailler avec les autres."}</p>
      </header>

      <section className="beyond-index" aria-label={locale === "en" ? "Extracurricular activities" : "Activités extrascolaires"}>
        <Link className="beyond-card beyond-card-football" to={paths.football[locale]}>
          <div className="beyond-card-visual"><span className="beyond-ball" /><img src="/images/football/fcb-official-badge.png" alt="" /></div>
          <div><Goal size={20} /><span className="meta-label">01 / FOOTBALL</span><h2>FC BARCELONA<br />MESSI / 10</h2><p>{locale === "en" ? "My favourite club, my greatest player, and an interactive shot inside Room 11." : "Mon club préféré, mon plus grand joueur et un tir interactif dans Room 11."}</p><span className="beyond-link">{locale === "en" ? "OPEN FOOTBALL CORNER" : "OUVRIR L’ESPACE FOOTBALL"} <ArrowUpRight size={15} /></span></div>
        </Link>

        <Link className="beyond-card beyond-card-anime" to={paths.anime[locale]}>
          <div className="beyond-monogram" aria-hidden="true"><span>DBZ</span><span>SL</span></div>
          <div><BookOpen size={20} /><span className="meta-label">02 / ANIME</span><h2>DRAGON BALL Z<br />SOLO LEVELING</h2><p>{locale === "en" ? "Stories about discipline, progression, resilience, and becoming stronger through practice." : "Des récits de discipline, de progression, de résilience et d’apprentissage par la pratique."}</p><span className="beyond-link">{locale === "en" ? "OPEN ANIME SHELF" : "OUVRIR L’ÉTAGÈRE ANIME"} <ArrowUpRight size={15} /></span></div>
        </Link>

        <article className="beyond-card beyond-card-community">
          <div className="beyond-community-images" aria-hidden="true"><img src="/images/ngo/kidefind.webp" alt="" /><img src="/images/ngo/amkay.webp" alt="" /></div>
          <div><HeartHandshake size={20} /><span className="meta-label">03 / COMMUNITY</span><h2>KIDEFIND<br />AMKAY</h2><p>{locale === "en" ? "Volunteer work supporting community initiatives, coordination, communication, and social impact." : "Bénévolat au service d’initiatives communautaires, de la coordination, de la communication et de l’impact social."}</p></div>
        </article>
      </section>
    </div>
  );
};

export default BeyondWorkPage;
