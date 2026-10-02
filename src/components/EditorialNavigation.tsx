import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import RyanMark from "@/components/RyanMark";
import { useTheme } from "@/contexts/EditorialThemeContext";
import { paths, useLocale } from "@/lib/locale";
import { preloadRoute, type RouteModuleKey } from "@/lib/routeModules";

const labels = {
  en: { work: "Work", about: "About", experience: "Experience", certifications: "Certs", library: "Library", beyond: "Beyond", network: "Network", contact: "Contact", cv: "CV" },
  fr: { work: "Projets", about: "À propos", experience: "Parcours", certifications: "Certifs", library: "Bibliothèque", beyond: "Hors travail", network: "Réseau", contact: "Contact", cv: "CV" },
};

const EditorialNavigation = () => {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const copy = labels[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  const links: [string, string, RouteModuleKey | null][] = [
    [copy.work, paths.work[locale], "work"], [copy.about, paths.about[locale], "profile"],
    [copy.experience, paths.experience[locale], "record"], [copy.certifications, paths.certifications[locale], "certifications"],
    [copy.library, paths.library[locale], "library"],
    [copy.beyond, paths.beyond[locale], null],
    [copy.network, paths.network[locale], "network"], [copy.contact, paths.contact[locale], "contact"],
  ];
  const desktopLinks = links.filter(([, , module]) => module !== "contact");
  const isActive = (href: string) => {
    if (href.includes("#beyond")) return hash === "#beyond" || pathname.includes("/anime") || pathname.includes("/football");
    return pathname === href;
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link to={paths.home[locale]} className="brand-lockup" aria-label="Ryan Erick home"><RyanMark className="brand-mark" /><span>RYAN ERICK</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {desktopLinks.map(([label, href, module]) => {
            const preload = () => { if (module) preloadRoute(module); };
            const active = isActive(href);
            return <Link key={href} to={href} onPointerEnter={preload} onPointerDown={preload} onFocus={preload} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>{label}</Link>;
          })}
        </nav>
        <div className="header-actions">
          <Link className="language-switch" to={locale === "en" ? paths.home.fr : paths.home.en}>{locale === "en" ? "FR" : "EN"}</Link>
          <Link className="contact-link" to={paths.contact[locale]} onPointerEnter={() => preloadRoute("contact")} onPointerDown={() => preloadRoute("contact")}><Phone size={13} /><span>{copy.contact}</span></Link>
          <Link className="cv-link" to={paths.cv[locale]}>{copy.cv} ↓</Link>
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button type="button" className="icon-button mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" className="mobile-nav" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} aria-label="Mobile navigation">
            <p className="meta-label">INDEX / {locale.toUpperCase()}</p>
            {links.map(([label, href, module], index) => {
              const preload = () => { if (module) preloadRoute(module); };
              const active = isActive(href);
              return <Link key={href} to={href} onPointerEnter={preload} onPointerDown={preload} onFocus={preload} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}><span>0{index + 1}</span>{label}</Link>;
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditorialNavigation;
