import { ArrowUpRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications, localize } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";

const CertificationsPage = () => {
  const locale = useLocale();

  return (
    <div className="page-shell certifications-page section-pad">
      <header className="page-hero certifications-hero">
        <p className="meta-label">04 — {locale === "en" ? "CERTIFICATIONS" : "CERTIFICATIONS"}</p>
        <h1>{locale === "en" ? "Credentials and recognition." : "Certifications et reconnaissance."}</h1>
        <p>{locale === "en" ? "A verified record of completed programmes and professional recognition." : "Un registre vérifié des programmes suivis et des reconnaissances professionnelles."}</p>
      </header>
      <section className="certificate-wall" aria-label={locale === "en" ? "Certificate wall" : "Mur de certifications"}>
        {certifications.map((item, index) => (
          <article className="certificate-frame certificate-frame-single" key={item.title}>
            <span className="certificate-index">0{index + 1}</span>
            <Award size={34} strokeWidth={1.25} />
            <span className="meta-label">{localize(item.type, locale)}</span>
            <h2>{item.title}</h2>
            <p>{localize(item.status, locale)}</p>
            <Link className="certificate-source" to={paths.cv[locale]}>{locale === "en" ? "VIEW CV REFERENCE" : "VOIR LA RÉFÉRENCE SUR LE CV"} <ArrowUpRight size={14} /></Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default CertificationsPage;
