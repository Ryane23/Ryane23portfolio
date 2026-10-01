import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { articles, localize } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";

const ArticlePage = () => {
  const locale = useLocale();
  const { slug } = useParams();
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) return <div className="page-shell section-pad"><p>Article not found.</p></div>;
  return (
    <article className="article-page page-shell section-pad">
      <Link className="back-link" to={paths.library[locale]}><ArrowLeft size={16} />LIBRARY</Link>
      <header><span className="meta-label">{localize(article.status, locale)} / {article.topics.join(" · ")}</span><h1>{localize(article.title, locale)}</h1><p>{localize(article.excerpt, locale)}</p></header>
      <div className="article-empty-state"><span className="meta-label">DRAFT IN PROGRESS</span><h2>{locale === "en" ? "Research and writing in progress." : "Recherche et rédaction en cours."}</h2><p>{locale === "en" ? "Notes, examples, screenshots, and supporting material are being prepared for publication." : "Les notes, exemples, captures et éléments complémentaires sont en préparation."}</p></div>
    </article>
  );
};

export default ArticlePage;
