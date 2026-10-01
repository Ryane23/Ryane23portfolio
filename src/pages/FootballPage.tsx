import { Link } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

const FootballPage = () => {
  const locale = useLocale();

  return (
    <div className="personal-page football-page section-pad">
      <header className="football-hero">
        <div className="football-visual" aria-hidden="true"><div className="football-orbit"><span className="football-css-ball" /></div><img className="football-club-mark" src="/images/football/fcb-official-badge.png" alt="" /></div>
        <div className="football-copy">
          <div className="favorite-club"><img src="/images/football/fcb-official-badge.png" alt="FC Barcelona official crest and wordmark" /><span className="meta-label">{locale === "en" ? "MY FAVORITE CLUB" : "MON CLUB PRÉFÉRÉ"}</span></div>
          <p className="meta-label">FC BARCELONA / FOOTBALL / MESSI</p>
          <h1>MY<br /><em>GAME.</em></h1>
          <p>{locale === "en" ? "Football has always been part of my life. FC Barcelona is my team because of its identity, creativity, and belief in playing with purpose." : "Le football a toujours fait partie de ma vie. Le FC Barcelone est mon équipe pour son identité, sa créativité et sa volonté de jouer avec intention."}</p>
          <p>{locale === "en" ? "Lionel Messi is my greatest of all time: vision, discipline, consistency, and the ability to make difficult things look simple." : "Lionel Messi est pour moi le plus grand de tous les temps : vision, discipline, constance et capacité à rendre simples les choses difficiles."}</p>
        </div>
      </header>
      <section className="pitch-study"><div className="pitch-lines" aria-hidden="true"><span className="centre-circle" /><span className="goal-box left" /><span className="goal-box right" /><span className="ball-mark" /></div><div><p className="meta-label">ROOM 11 / INTERACTIVE</p><h2>{locale === "en" ? "The ball is the control." : "Le ballon est la commande."}</h2><p>{locale === "en" ? "Find the ball in the 3D room and tap it to take the shot. There is no separate button." : "Repérez le ballon dans la pièce 3D et touchez-le pour tirer. Aucun bouton séparé n’est nécessaire."}</p></div></section>
      <Link className="outline-action" to={paths.beyond[locale]}>← {locale === "en" ? "BACK TO BEYOND WORK" : "RETOUR À HORS TRAVAIL"}</Link>
    </div>
  );
};

export default FootballPage;
