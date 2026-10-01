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
          <div className="favorite-club"><img src="/images/football/fcb-official-badge.png" alt="FC Barcelona official crest and wordmark" /><span className="meta-label">{locale === "en" ? "MY FAVORITE CLUB" : "MON CLUB PRÉFÉRÉ"}</span></div>
          <p className="meta-label">FC BARCELONA / RAPHINHA / 11</p>
          <h1>11<br /><em>90+6</em></h1>
          <p>{locale === "en" ? "FC Barcelona is my favorite club. Raphinha’s stoppage-time winner against Benfica remains one of my favorite football memories." : "Le FC Barcelone est mon club préféré. Le but de Raphinha dans le temps additionnel contre Benfica reste l’un de mes meilleurs souvenirs de football."}</p>
          <button type="button" className="outline-action room-kick" onClick={kick}>{locale === "en" ? "TAKE THE 3D SHOT" : "TIRER EN 3D"} →</button>
        </div>
      </header>
      <section className="match-line" aria-label="Match moment timeline"><span><small>64′</small><strong>11</strong></span><i /><span><small>86′</small><strong>4—4</strong></span><i /><span><small>90+6′</small><strong>4—5</strong></span></section>
      <section className="raphinha-gallery" aria-label="Raphinha gallery"><figure><img src="/images/football/raphinha-official.webp" alt="Raphinha in the official FC Barcelona portrait" loading="lazy" /><figcaption>RAPHINHA / 11</figcaption></figure><figure><img src="/images/football/raphinha-supplied.webp" alt="Raphinha wearing the FC Barcelona shirt" loading="lazy" /><figcaption>BARÇA / FORWARD</figcaption></figure></section>
      <section className="pitch-study"><div className="pitch-lines" aria-hidden="true"><span className="centre-circle" /><span className="goal-box left" /><span className="goal-box right" /><button type="button" className="ball-mark" onClick={kick}>11</button></div><div><p className="meta-label">ROOM 11 / INTERACTIVE SHOT</p><h2>{locale === "en" ? "Replay the moment in the room." : "Rejouer ce moment dans la pièce."}</h2><p>{locale === "en" ? "Use the number 11 button to send the 3D ball toward the net." : "Utilisez le bouton numéro 11 pour envoyer le ballon 3D vers le filet."}</p></div></section>
      <Link className="outline-action" to={paths.network[locale]}>← {locale === "en" ? "NETWORK & COMMUNITY" : "RÉSEAU & COMMUNAUTÉ"}</Link>
    </div>
  );
};

export default FootballPage;
