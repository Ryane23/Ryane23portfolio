import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const FootballPage = () => {
  const locale = useLocale();
  return (
    <div className="personal-page football-page section-pad">
      <header className="football-hero"><div className="football-score"><span>BEN</span><strong>4—5</strong><span>BAR</span></div><div className="football-copy"><p className="meta-label">LISBON / 21.01.2025</p><h1>11<br /><em>90+6</em></h1><p>{locale === "en" ? "A personal memory of resilience: Raphinha’s second goal completed Barcelona’s comeback in stoppage time." : "Un souvenir personnel de résilience : le second but de Raphinha a conclu la remontée de Barcelone dans le temps additionnel."}</p></div></header>
      <section className="match-line" aria-label="Match moment timeline"><span><small>64′</small><strong>11</strong></span><i /><span><small>86′</small><strong>4—4</strong></span><i /><span><small>90+6′</small><strong>4—5</strong></span></section>
      <section className="pitch-study"><div className="pitch-lines" aria-hidden="true"><span className="centre-circle" /><span className="goal-box left" /><span className="goal-box right" /><span className="ball-mark">11</span></div><div><p className="meta-label">ROOM 11 / FOOTBALL STUDY</p><h2>{locale === "en" ? "The final interaction will stay physical and restrained." : "L’interaction finale restera physique et mesurée."}</h2><p>{locale === "en" ? "A generic ball idles quietly. One deliberate interaction triggers a grounded kick and a short net response. No official crest, kit, competition mark, player image, or club colour is used." : "Un ballon générique reste discrètement en mouvement. Une interaction déclenche un tir réaliste et une brève réaction du filet. Aucun blason, maillot, logo de compétition, portrait ou couleur officielle n’est utilisé."}</p></div></section>
      <Link className="outline-action" to={paths.anime[locale]}>← {locale === "en" ? "ANIME ARCHIVE" : "ARCHIVE ANIME"}</Link>
    </div>
  );
};

export default FootballPage;
