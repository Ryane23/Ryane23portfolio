import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { paths, useLocale } from "@/lib/locale";

type RoomZone = "room" | "work" | "record" | "community" | "football" | "contact";

const zoneForRoute = (pathname: string): RoomZone => {
  if (/^\/(en|fr)\/?$/.test(pathname)) return "room";
  if (pathname.includes("football")) return "football";
  if (pathname.includes("library") || pathname.includes("bibliotheque") || pathname.includes("anime")) return "community";
  if (pathname.includes("experience") || pathname.includes("parcours")) return "record";
  if (pathname.includes("contact")) return "contact";
  if (pathname.includes("about") || pathname.includes("a-propos") || pathname.includes("cv")) return "record";
  return "work";
};

const RoomOverlay = () => {
  const { pathname } = useLocation();
  const locale = useLocale();
  const home = /^\/(en|fr)\/?$/.test(pathname);
  const [zone, setZone] = useState<RoomZone>(() => zoneForRoute(pathname));
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!home) {
      setZone(zoneForRoute(pathname));
      const onScroll = () => setHidden(window.scrollY > window.innerHeight * 0.72);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const index = Math.min(4, Math.round((scrollY / maximum) * 4));
        setZone((["room", "work", "record", "community", "football"] as RoomZone[])[index]);
        setHidden(false);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [home, pathname]);

  const content = useMemo(() => ({
    room: {
      number: "00",
      eyebrow: "ROOM 11 / OVERVIEW",
      title: locale === "en" ? "Ryan’s digital room." : "La pièce numérique de Ryan.",
      body: locale === "en" ? "A full-stack developer in Yaoundé building web, mobile, API, and data products." : "Un développeur full-stack à Yaoundé qui conçoit des produits web, mobiles, API et data.",
      tags: ["YAOUNDÉ", "WEB", "MOBILE"],
      href: paths.about[locale],
      action: locale === "en" ? "OPEN PROFILE" : "OUVRIR LE PROFIL",
    },
    work: {
      number: "01",
      eyebrow: "DESK / BUILD STATION",
      title: locale === "en" ? "Frontend on screen. Backend underneath." : "Frontend à l’écran. Backend en profondeur.",
      body: locale === "en" ? "Selected products, verified roles, live previews, and Cameroon-market comparable values." : "Produits sélectionnés, rôles vérifiés, aperçus en ligne et valeurs comparables au marché camerounais.",
      tags: ["⚛ REACT", "TS", "🐍 PYTHON", "NODE", "SQL"],
      href: paths.work[locale],
      action: locale === "en" ? "VIEW WORK" : "VOIR LES PROJETS",
    },
    record: {
      number: "02",
      eyebrow: "SHELF / RECORD",
      title: locale === "en" ? "Learning, contributing, leading." : "Apprendre, contribuer, diriger.",
      body: locale === "en" ? "CRESTLANCING, TIC Foundation, teaching, student leadership, and Project EAGLE." : "CRESTLANCING, TIC Foundation, enseignement, leadership étudiant et Project EAGLE.",
      tags: ["2022—2026", "4 VERIFIED ROLES"],
      href: paths.experience[locale],
      action: locale === "en" ? "FULL RECORD" : "PARCOURS COMPLET",
    },
    community: {
      number: "03",
      eyebrow: "WALL / COMMUNITY",
      title: locale === "en" ? "Code connected to people." : "Du code connecté aux personnes.",
      body: locale === "en" ? "A visual archive of community work with Kidefind, AMKAY, workshops, and technology events." : "Une archive visuelle du travail communautaire avec Kidefind, AMKAY, des ateliers et événements technologiques.",
      tags: ["KIDEFIND", "AMKAY", "COMMUNITY"],
      href: paths.network[locale],
      action: locale === "en" ? "OPEN NETWORK" : "OUVRIR LE RÉSEAU",
    },
    football: {
      number: "04",
      eyebrow: "GOAL / MEMORY",
      title: "11 · 90+6",
      body: locale === "en" ? "Raphinha, Barcelona, and a comeback remembered as a study in persistence." : "Raphinha, Barcelone et une remontée retenue comme une leçon de persévérance.",
      tags: ["BEN 4—5 BAR", "21.01.2025"],
      href: paths.football[locale],
      action: locale === "en" ? "TAKE THE SHOT" : "TIRER",
    },
    contact: {
      number: "05",
      eyebrow: "DOOR / CONTACT",
      title: locale === "en" ? "Bring a useful problem." : "Apportez un problème utile.",
      body: locale === "en" ? "Share the context, constraints, and desired outcome." : "Partagez le contexte, les contraintes et le résultat souhaité.",
      tags: ["AVAILABLE", "YAOUNDÉ"],
      href: paths.contact[locale],
      action: locale === "en" ? "REACH OUT" : "CONTACTER",
    },
  }), [locale]);

  const current = content[zone];
  return (
    <aside className={`room-info-card room-info-${zone}${hidden ? " is-hidden" : ""}`} aria-live="polite">
      <div className="room-info-index">{current.number}</div>
      <div className="room-info-copy">
        <span className="meta-label">{current.eyebrow}</span>
        <h2>{current.title}</h2>
        <p>{current.body}</p>
        <div className="room-info-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link to={current.href}>{current.action} ↗</Link>
      </div>
    </aside>
  );
};

export default RoomOverlay;
