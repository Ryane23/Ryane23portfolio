import { Link } from "react-router-dom";
import { Github, Linkedin, MessageSquare, Users } from "lucide-react";
import { paths, useLocale } from "@/lib/locale";

const NetworkPreview = () => {
  const locale = useLocale();
  const items = [
    { icon: Github, label: "GITHUB", text: locale === "en" ? "Projects and contribution activity" : "Projets et activité de contribution" },
    { icon: Linkedin, label: "LINKEDIN", text: locale === "en" ? "Professional profile" : "Profil professionnel" },
    { icon: Users, label: "COMMUNITY", text: locale === "en" ? "Kidefind, AMKAY, events" : "Kidefind, AMKAY, événements" },
    { icon: MessageSquare, label: "GUESTBOOK", text: locale === "en" ? "Messages stored for moderation" : "Messages enregistrés pour modération" },
  ];

  return (
    <section className="network-preview section-pad" data-room-stop="network">
      <div className="section-heading"><span className="section-number">05</span><div><p className="meta-label">NETWORK</p><h2>{locale === "en" ? "Professional profiles and community." : "Profils professionnels et communauté."}</h2></div><Link to={paths.network[locale]}>{locale === "en" ? "OPEN NETWORK" : "OUVRIR LE RÉSEAU"} ↗</Link></div>
      <div className="network-preview-grid">
        {items.map(({ icon: Icon, label, text }) => <Link to={paths.network[locale]} key={label}><Icon size={18} /><span className="meta-label">{label}</span><strong>{text}</strong><span>↗</span></Link>)}
      </div>
    </section>
  );
};

export default NetworkPreview;
