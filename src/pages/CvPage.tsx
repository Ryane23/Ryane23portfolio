import { Download, ExternalLink } from "lucide-react";
import cvUrl from "../../RYAN_ERICK_NGU_JAVEA_FOMINYEN_FlowCV_Resume_2026-09-25 (1).pdf?url";
import { education, experiences, localize, profile } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

const CvPage = () => {
  const locale = useLocale();
  return (
    <div className="page-shell section-pad">
      <header className="cv-hero"><div><p className="meta-label">05 — CURRICULUM VITAE</p><h1>{profile.name}</h1><p>{localize(profile.role, locale)}</p></div><div className="cv-actions"><a className="solid-action" href={cvUrl} target="_blank" rel="noopener noreferrer">{locale === "en" ? "VIEW CV" : "VOIR LE CV"}<ExternalLink size={16} /></a><a className="outline-action" href={cvUrl} download="Ryan_Erick_CV.pdf">{locale === "en" ? "DOWNLOAD PDF" : "TÉLÉCHARGER LE PDF"}<Download size={16} /></a></div></header>
      <section className="cv-summary"><p>{localize(profile.summary, locale)}</p><div><span>{profile.email}</span><span>{profile.phones.join(" · ")}</span><span>{profile.location}</span></div></section>
      <div className="cv-columns"><section><p className="meta-label">{locale === "en" ? "EXPERIENCE" : "EXPÉRIENCE"}</p>{experiences.map((item) => <article key={`${item.organization}-${item.period}`}><span>{item.period}</span><h2>{localize(item.role, locale)}</h2><strong>{item.organization}</strong></article>)}</section><section><p className="meta-label">{locale === "en" ? "EDUCATION" : "FORMATION"}</p>{education.map((item) => <article key={item.school}><span>{item.period}</span><h2>{localize(item.qualification, locale)}</h2><strong>{item.school}</strong></article>)}</section></div>
      <section className="pdf-frame"><object data={cvUrl} type="application/pdf" aria-label="Ryan Erick CV PDF"><p>{locale === "en" ? "Your browser cannot display the PDF." : "Votre navigateur ne peut pas afficher le PDF."} <a href={cvUrl}>Open PDF</a></p></object></section>
    </div>
  );
};

export default CvPage;
