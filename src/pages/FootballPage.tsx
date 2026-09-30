import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const FootballPage = () => {
  const locale = useLocale();
  const kick = () => window.dispatchEvent(new Event("room11:kick"));

  return (
    <div className="personal-page football-page section-pad">
      <header className="football-hero">
        <div className="football-visual">
          <img src="/images/football/raphinha-11-goal.svg" alt="Original dimensional illustration of a number 11 footballer striking the ball" />
          <div className="football-score"><span>BEN</span><strong>4—5</strong><span>BAR</span></div>
        </div>
        <div className="football-copy">
          <p className="meta-label">LISBON / 21.01.2025 / ROOM 11</p>
          <h1>11<br /><em>90+6</em></h1>
          <p>{locale === "en" ? "A personal memory of persistence: Raphinha’s second goal completed Barcelona’s comeback in stoppage time." : "Un souvenir personnel de persévérance : le second but de Raphinha a conclu la remontée de Barcelone dans le temps additionnel."}</p>
          <button type="button" className="outline-action room-kick" onClick={kick}>{locale === "en" ? "TAKE THE 3D SHOT" : "TIRER EN 3D"} →</button>
        </div>
      </header>
      <section className="match-line" aria-label="Match moment timeline"><span><small>64′</small><strong>11</strong></span><i /><span><small>86′</small><strong>4—4</strong></span><i /><span><small>90+6′</small><strong>4—5</strong></span></section>
      <section className="pitch-study"><div className="pitch-lines" aria-hidden="true"><span className="centre-circle" /><span className="goal-box left" /><span className="goal-box right" /><button type="button" className="ball-mark" onClick={kick}>11</button></div><div><p className="meta-label">ROOM 11 / INTERACTIVE STUDY</p><h2>{locale === "en" ? "The page and the room share the same shot." : "La page et la pièce partagent le même tir."}</h2><p>{locale === "en" ? "Triggering the number 11 button launches the generic 3D ball toward the net. The illustration is original and based on the supplied Raphinha references without reproducing a crest or sponsor mark." : "Le bouton numéro 11 lance le ballon 3D vers le filet. L’illustration est originale et s’inspire des références de Raphinha fournies sans reproduire de blason ni de sponsor."}</p></div></section>
      <Link className="outline-action" to={paths.network[locale]}>← {locale === "en" ? "NETWORK & COMMUNITY" : "RÉSEAU & COMMUNAUTÉ"}</Link>
    </div>
  );
};

export default FootballPage;
