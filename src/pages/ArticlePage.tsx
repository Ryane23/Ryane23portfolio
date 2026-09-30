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
      <div className="article-empty-state"><span className="meta-label">DRAFT SPACE</span><h2>{locale === "en" ? "This article has not been invented for the portfolio." : "Cet article n’a pas été inventé pour remplir le portfolio."}</h2><p>{locale === "en" ? "Ryan’s notes, examples, screenshots, and lessons will be written here before publication. Until then, the Library clearly marks it as work in progress." : "Les notes, exemples, captures et enseignements de Ryan seront rédigés ici avant publication. En attendant, la Bibliothèque l’indique clairement comme travail en cours."}</p></div>
    </article>
  );
};

export default ArticlePage;
