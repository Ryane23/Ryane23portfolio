import { Link } from "react-router-dom";
import { articlePath, useLocale } from "@/lib/locale";
import { articles, localize } from "@/data/portfolio";

const LibraryPage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="page-hero"><p className="meta-label">05 — LIBRARY</p><h1>{locale === "en" ? "Engineering notes and practical writing." : "Notes d’ingénierie et écrits pratiques."}</h1><p>{locale === "en" ? "Articles on software development, products, and lessons from active projects." : "Articles sur le développement logiciel, les produits et les enseignements tirés des projets actifs."}</p></header>
      <div className="library-list">{articles.map((article, index) => <Link to={articlePath(locale, article.slug)} key={article.slug}><span>0{index + 1}</span><div><span className="meta-label">{localize(article.status, locale)}</span><h2>{localize(article.title, locale)}</h2><p>{localize(article.excerpt, locale)}</p></div><span>{article.topics.join(" / ")}</span><strong>↗</strong></Link>)}</div>
    </div>
  );
};

export default LibraryPage;
