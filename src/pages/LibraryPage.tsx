import { Link } from "react-router-dom";
import { articlePath, useLocale } from "@/lib/locale";
import { articles, localize } from "@/data/portfolio";

const LibraryPage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">04 — LIBRARY</p><h1>{locale === "en" ? "Writing will grow alongside the work." : "Les écrits évolueront avec le travail."}</h1><p>{locale === "en" ? "No generated thought leadership and no fake publication dates. These are honest working outlines that will become Ryan’s first-person articles." : "Pas de faux contenus d’expertise ni de dates inventées. Ces plans de travail deviendront des articles écrits à la première personne par Ryan."}</p></header>
      <div className="library-list">{articles.map((article, index) => <Link to={articlePath(locale, article.slug)} key={article.slug}><span>0{index + 1}</span><div><span className="meta-label">{localize(article.status, locale)}</span><h2>{localize(article.title, locale)}</h2><p>{localize(article.excerpt, locale)}</p></div><span>{article.topics.join(" / ")}</span><strong>↗</strong></Link>)}</div>
    </div>
  );
};

export default LibraryPage;
