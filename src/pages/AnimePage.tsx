import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const AnimePage = () => {
  const locale = useLocale();
  return (
    <div className="personal-page anime-page section-pad">
      <header className="personal-hero"><div><p className="meta-label">PERSONAL ARCHIVE / A</p><h1>STORIES ABOUT<br />GROWTH.</h1><p>{locale === "en" ? "DBZ and Solo Leveling are personal favourites. This space uses original typography and abstract progression cues—never copied characters, posters, logos, or artwork." : "DBZ et Solo Leveling font partie de ses favoris. Cet espace utilise une typographie originale et des signes abstraits de progression, sans personnages, affiches, logos ou illustrations copiés."}</p></div><div className="level-gauge" aria-label="Abstract progression diagram"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><strong>LEVEL / ∞</strong></div></header>
      <section className="manga-shelf" aria-label="Original monochrome manga shelf"><div><span>DBZ</span><small>TRAINING / LEGACY</small></div><div><span>SL</span><small>PROGRESSION / RESOLVE</small></div><div><span>R11</span><small>PERSONAL ARCHIVE</small></div><div className="blank-volume"><span>—</span><small>NEXT ENTRY</small></div></section>
      <section className="personal-note"><span className="meta-label">SAFE REFERENCE SYSTEM</span><h2>{locale === "en" ? "Influence without imitation." : "S’inspirer sans imiter."}</h2><p>{locale === "en" ? "The final 3D room will use blank-spine volumes, original symbols, grayscale materials, and generic figures. Franchise characters and protected visual identities will not be reproduced." : "La future pièce 3D utilisera des volumes à dos neutre, des symboles originaux, des matériaux gris et des figurines génériques. Les personnages et identités visuelles protégés ne seront pas reproduits."}</p></section>
      <Link className="solid-action" to={paths.football[locale]}>{locale === "en" ? "NEXT ROOM · FOOTBALL" : "PIÈCE SUIVANTE · FOOTBALL"} →</Link>
    </div>
  );
};

export default AnimePage;
