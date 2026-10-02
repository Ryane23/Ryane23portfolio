import { FormEvent, useEffect, useState } from "react";
import { ExternalLink, Github, Linkedin, Loader2, MessageSquare, Music2, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { paths, useLocale } from "@/lib/locale";
import { Link } from "react-router-dom";

type GitHubUser = { login: string; name: string | null; bio: string | null; avatar_url: string; html_url: string; public_repos: number; followers: number };
type GuestbookEntry = { id: number; name: string; message: string; created_at: string };

const community = [
  { image: "/images/ngo/kidefind.webp", organization: "KIDEFIND", title: "Community development", copy: "Volunteer support across communication, coordination, and community-focused initiatives." },
  { image: "/images/ngo/amkay.webp", organization: "AMKAY", title: "Organizational support", copy: "Volunteer work supporting organizational and community activities." },
  { image: "/images/ngo/tic-summit.webp", organization: "TECHNOLOGY ARCHIVE", title: "Events and learning", copy: "A visual record of participation in technology and innovation spaces." },
  { image: "/images/ngo/workshop.webp", organization: "WORKSHOPS", title: "Learning together", copy: "Community learning and practical technology sessions from Ryan’s archive." },
];

const loadGuestbookClient = async () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
};

const NetworkPage = () => {
  const locale = useLocale();
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubError, setGithubError] = useState(false);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [guestbookState, setGuestbookState] = useState<"loading" | "ready" | "setup" | "sending" | "sent">("loading");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState({ playing: false, title: "Room audio paused" });

  useEffect(() => {
    let active = true;
    const cacheKey = "ryane23-github-profile";
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null") as { value: GitHubUser; time: number } | null;
      if (cached && Date.now() - cached.time < 15 * 60 * 1000) {
        setGithubUser(cached.value);
        return () => { active = false; };
      }
    } catch { /* Ignore unavailable or malformed cache data. */ }

    fetch("https://api.github.com/users/Ryane23")
      .then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<GitHubUser>; })
      .then((user) => {
        if (!active) return;
        setGithubUser(user);
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ value: user, time: Date.now() })); } catch { /* Storage may be disabled. */ }
      })
      .catch(() => active && setGithubError(true));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    void loadGuestbookClient().then((client) => {
      if (!active) return;
      if (!client) { setGuestbookState("setup"); return; }
      void client.from("guestbook_entries").select("id,name,message,created_at").eq("approved", true).order("created_at", { ascending: false }).limit(12)
        .then(({ data, error }) => {
          if (!active) return;
          if (error) setGuestbookState("setup");
          else { setGuestbook((data || []) as GuestbookEntry[]); setGuestbookState("ready"); }
        });
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onAudio = (event: Event) => setAudio((event as CustomEvent<{ playing: boolean; title: string }>).detail);
    window.addEventListener("room11:audio", onAudio);
    window.dispatchEvent(new Event("room11:audio-request"));
    return () => window.removeEventListener("room11:audio", onAudio);
  }, []);

  const submitGuestbook = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim() || guestbookState === "sending") return;
    setGuestbookState("sending");
    const client = await loadGuestbookClient();
    if (!client) { setGuestbookState("setup"); return; }
    const { error } = await client.from("guestbook_entries").insert({ name: name.trim(), message: message.trim(), approved: false });
    if (error) setGuestbookState("setup");
    else { setName(""); setMessage(""); setGuestbookState("sent"); }
  };

  return (
    <div className="network-page page-shell section-pad">
      <header className="page-hero network-hero"><p className="meta-label">07 — NETWORK</p><h1>{locale === "en" ? "Professional profiles and community." : "Profils professionnels et communauté."}</h1><p>{locale === "en" ? "GitHub, LinkedIn, community photographs, room audio, and the guestbook." : "GitHub, LinkedIn, photographies communautaires, audio de la pièce et livre d’or."}</p></header>

      <section className="network-section identity-section" id="profiles">
        <div className="network-section-head"><span className="meta-label">01 / PROFESSIONAL IDENTITIES</span><span>GITHUB ↔ LINKEDIN</span></div>
        <div className="identity-grid">
          <article className="identity-card github-identity">
            <Github size={24} /><span className="meta-label">GITHUB / LIVE PUBLIC PROFILE</span>
            {!githubUser && !githubError && <div className="identity-loading"><Loader2 className="spin" /><span>CONNECTING TO GITHUB</span></div>}
            {githubError && <p>GitHub’s public API is temporarily unavailable. Open the profile directly below.</p>}
            {githubUser && <div className="identity-profile"><img src={githubUser.avatar_url} alt="" /><div><h2>{githubUser.name || githubUser.login}</h2><p>{githubUser.bio || "Full-stack and mobile developer"}</p></div><dl><div><dt>PUBLIC REPOS</dt><dd>{githubUser.public_repos}</dd></div><div><dt>FOLLOWERS</dt><dd>{githubUser.followers}</dd></div></dl></div>}
            <a href={profile.github} target="_blank" rel="noopener noreferrer">OPEN GITHUB <ExternalLink size={14} /></a>
          </article>
          <article className="identity-card linkedin-identity">
            <Linkedin size={24} /><span className="meta-label">LINKEDIN / PROFESSIONAL PROFILE</span><h2>{profile.name}</h2><p>{locale === "en" ? "Professional history, education, and direct contact through LinkedIn." : "Parcours professionnel, formation et contact direct via LinkedIn."}</p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">OPEN LINKEDIN <ExternalLink size={14} /></a>
          </article>
        </div>
        <p className="network-work-route"><span>{locale === "en" ? "Looking for repositories, current builds, or the contribution calendar?" : "Vous cherchez les dépôts, les projets actifs ou le calendrier de contributions ?"}</span><Link to={paths.work[locale]}>{locale === "en" ? "OPEN WORK & GITHUB ACTIVITY" : "OUVRIR PROJETS & ACTIVITÉ GITHUB"} ↗</Link></p>
      </section>

      <section className="network-section" id="community">
        <div className="network-section-head"><span className="meta-label">02 / COMMUNITY ARCHIVE</span><span>KIDEFIND · AMKAY · EVENTS</span></div>
        <div className="community-gallery">{community.map((item) => <figure key={item.image}><img src={item.image} alt={item.title} loading="lazy" /><figcaption><span className="meta-label">{item.organization}</span><h3>{item.title}</h3><p>{item.copy}</p></figcaption></figure>)}</div>
      </section>

      <section className="network-section signal-grid">
        <article className="now-playing-panel"><Music2 size={22} /><span className="meta-label">03 / NOW PLAYING</span><div className={audio.playing ? "audio-disc is-playing" : "audio-disc"}><span>R11</span></div><h2>{audio.title}</h2><p>{audio.playing ? "ROOM AUDIO / PLAYING" : "USE THE SOUND CONTROL TO START"}</p><small>{locale === "en" ? "Room audio is available from the player at the bottom of the screen." : "L’audio de la pièce est disponible depuis le lecteur en bas de l’écran."}</small></article>
      </section>

      <section className="network-section guestbook-section" id="guestbook">
        <div className="network-section-head"><span className="meta-label">04 / GUESTBOOK</span><span>MODERATED BEFORE PUBLICATION</span></div>
        <div className="guestbook-layout"><form onSubmit={submitGuestbook}><label>NAME<input value={name} onChange={(event) => setName(event.target.value)} maxLength={50} required /></label><label>MESSAGE<textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={280} rows={5} required /></label><button className="solid-action" type="submit" disabled={guestbookState === "sending"}><Send size={14} />{guestbookState === "sending" ? "SENDING…" : "SIGN GUESTBOOK"}</button>{guestbookState === "sent" && <p className="guestbook-status">{locale === "en" ? "Message received and awaiting approval." : "Message reçu et en attente d’approbation."}</p>}{guestbookState === "setup" && <p className="guestbook-status">{locale === "en" ? "The guestbook is temporarily unavailable. Please try again later." : "Le livre d’or est temporairement indisponible. Réessayez plus tard."}</p>}</form><div className="guestbook-entries">{guestbookState === "loading" && <p>{locale === "en" ? "Loading approved messages…" : "Chargement des messages approuvés…"}</p>}{guestbookState !== "loading" && guestbook.length === 0 && <div className="guestbook-empty"><MessageSquare /><p>{locale === "en" ? "No published messages yet. New entries appear after moderation." : "Aucun message publié pour le moment. Les nouvelles entrées apparaissent après modération."}</p></div>}{guestbook.map((entry) => <article key={entry.id}><div><strong>{entry.name}</strong><time>{new Date(entry.created_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB")}</time></div><p>{entry.message}</p></article>)}</div></div>
      </section>
    </div>
  );
};

export default NetworkPage;
