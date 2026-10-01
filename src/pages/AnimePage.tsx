import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const AnimePage = () => {
  const locale = useLocale();
  return (
    <div className="personal-page anime-page section-pad">
      <header className="personal-hero"><div><p className="meta-label">PERSONAL ARCHIVE / A</p><h1>STORIES ABOUT<br />GROWTH.</h1><p>{locale === "en" ? "DBZ and Solo Leveling are personal favourites. This space uses original typography and abstract progression cues—never copied characters, posters, logos, or artwork." : "DBZ et Solo Leveling font partie de ses favoris. Cet espace utilise une typographie originale et des signes abstraits de progression, sans personnages, affiches, logos ou illustrations copiés."}</p></div><div className="level-gauge" aria-label="Abstract progression diagram"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><strong>LEVEL / ∞</strong></div></header>
      <section className="manga-shelf" aria-label="Original monochrome manga shelf"><div><span>DBZ</span><small>TRAINING / LEGACY</small></div><div><span>SL</span><small>PROGRESSION / RESOLVE</small></div><div><span>R11</span><small>PERSONAL ARCHIVE</small></div><div className="blank-volume"><span>—</span><small>NEXT ENTRY</small></div></section>
      <section className="personal-note"><span className="meta-label">{locale === "en" ? "WHY THESE STORIES" : "POURQUOI CES RÉCITS"}</span><h2>{locale === "en" ? "Discipline and progression." : "Discipline et progression."}</h2><p>{locale === "en" ? "Both stories connect with the value of deliberate practice: learning from setbacks, improving consistently, and staying focused on a long-term goal." : "Ces deux récits rejoignent la valeur de la pratique volontaire : apprendre des échecs, progresser avec constance et rester concentré sur un objectif à long terme."}</p></section>
      <Link className="solid-action" to={paths.beyond[locale]}>← {locale === "en" ? "BACK TO BEYOND WORK" : "RETOUR À HORS TRAVAIL"}</Link>
    </div>
  );
};

export default AnimePage;
