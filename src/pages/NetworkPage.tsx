import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ExternalLink, Github, Linkedin, Loader2, MessageSquare, Music2, Send } from "lucide-react";
import readmeText from "../../README.md?raw";
import { profile } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

type GitHubUser = { login: string; name: string | null; bio: string | null; avatar_url: string; html_url: string; public_repos: number; followers: number };
type GitHubRepo = { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; fork: boolean; updated_at: string };
type GuestbookEntry = { id: number; name: string; message: string; created_at: string };

const stacks = [
  { label: "FRONTEND / MOBILE", items: [["⚛️", "React"], ["🔷", "TypeScript"], ["▲", "Next.js"], ["📱", "React Native"], ["🎨", "Tailwind"]] },
  { label: "BACKEND / APIs", items: [["🟢", "Node.js"], ["🦁", "NestJS"], ["🐍", "Django"], ["🐘", "Laravel"], ["🔌", "REST APIs"]] },
  { label: "DATA / CLOUD", items: [["🐘", "PostgreSQL"], ["🍃", "MongoDB"], ["🔥", "Firebase"], ["⚡", "Supabase"], ["🐳", "Docker"]] },
  { label: "AI / SYSTEMS", items: [["🐍", "Python"], ["🧠", "TensorFlow"], ["👁", "Computer Vision"], ["🐧", "Linux"], ["📦", "Git"]] },
];

const community = [
  { image: "/images/ngo/kidefind.webp", organization: "KIDEFIND", title: "Community development", copy: "Volunteer support across communication, coordination, and community-focused initiatives." },
  { image: "/images/ngo/amkay.webp", organization: "AMKAY", title: "Organizational support", copy: "Volunteer work supporting organizational and community activities." },
  { image: "/images/ngo/tic-summit.webp", organization: "TECHNOLOGY ARCHIVE", title: "Events and learning", copy: "A visual record of participation in technology and innovation spaces." },
  { image: "/images/ngo/workshop.webp", organization: "WORKSHOPS", title: "Learning together", copy: "Community learning and practical technology sessions from Ryan’s archive." },
];

const NetworkPage = () => {
  const locale = useLocale();
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [githubError, setGithubError] = useState(false);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [guestbookState, setGuestbookState] = useState<"loading" | "ready" | "setup" | "sending" | "sent">("loading");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState({ playing: false, title: "Room audio paused" });

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("https://api.github.com/users/Ryane23").then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<GitHubUser>; }),
      fetch("https://api.github.com/users/Ryane23/repos?sort=updated&per_page=12").then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<GitHubRepo[]>; }),
    ]).then(([user, repositoryData]) => {
      if (!active) return;
      setGithubUser(user);
      setRepos(repositoryData.filter((repo) => !repo.fork).slice(0, 6));
    }).catch(() => active && setGithubError(true));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setGuestbookState("setup"); return; }
    const client = createClient(url, key);
    client.from("guestbook_entries").select("id,name,message,created_at").eq("approved", true).order("created_at", { ascending: false }).limit(12)
      .then(({ data, error }) => {
        if (error) setGuestbookState("setup");
        else { setGuestbook((data || []) as GuestbookEntry[]); setGuestbookState("ready"); }
      });
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
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setGuestbookState("setup"); return; }
    setGuestbookState("sending");
    const client = createClient(url, key);
    const { error } = await client.from("guestbook_entries").insert({ name: name.trim(), message: message.trim(), approved: false });
    if (error) setGuestbookState("setup");
    else { setName(""); setMessage(""); setGuestbookState("sent"); }
  };

  const readmeExcerpt = useMemo(() => readmeText.split("\n").slice(0, 48).join("\n"), []);

  return (
    <div className="network-page page-shell section-pad">
      <header className="page-hero network-hero"><p className="meta-label">04 — NETWORK / LIVE SIGNALS</p><h1>{locale === "en" ? "Code, community, and the people around the work." : "Le code, la communauté et les personnes autour du travail."}</h1><p>{locale === "en" ? "Live GitHub data, an honest professional network, community photographs, room audio, and a moderated guestbook." : "Données GitHub en direct, réseau professionnel vérifié, photographies communautaires, audio de la pièce et livre d’or modéré."}</p></header>

      <section className="network-section github-live" id="github">
        <div className="network-section-head"><span className="meta-label">01 / GITHUB · LIVE</span><a href={profile.github} target="_blank" rel="noopener noreferrer">@RYANE23 ↗</a></div>
        {!githubUser && !githubError && <div className="network-loading"><Loader2 className="spin" /><span>FETCHING GITHUB SIGNAL</span></div>}
        {githubError && <div className="network-notice">GitHub’s public API is temporarily unavailable. <a href={profile.github}>Open the profile directly ↗</a></div>}
        {githubUser && <div className="github-profile-line"><img src={githubUser.avatar_url} alt="" loading="lazy" /><div><h2>{githubUser.name || githubUser.login}</h2><p>{githubUser.bio || "Full-stack developer"}</p></div><dl><div><dt>REPOSITORIES</dt><dd>{githubUser.public_repos}</dd></div><div><dt>FOLLOWERS</dt><dd>{githubUser.followers}</dd></div></dl></div>}
        <div className="github-repos">{repos.map((repo) => <a href={repo.html_url} target="_blank" rel="noopener noreferrer" key={repo.id}><span className="meta-label">{repo.language || "REPOSITORY"}</span><h3>{repo.name}</h3><p>{repo.description || "Open repository on GitHub."}</p><small>★ {repo.stargazers_count} · UPDATED {new Date(repo.updated_at).toLocaleDateString()}</small></a>)}</div>
        <details className="readme-panel"><summary>README.md <span>OPEN FILE +</span></summary><pre>{readmeExcerpt}</pre></details>
      </section>

      <section className="network-section" id="stack">
        <div className="network-section-head"><span className="meta-label">02 / TECHNOLOGY MAP</span><span>FRONTEND ↔ BACKEND</span></div>
        <div className="stack-departments">{stacks.map((group) => <article key={group.label}><span className="meta-label">{group.label}</span><div>{group.items.map(([emoji, name]) => <span key={name}><b>{emoji}</b>{name}</span>)}</div></article>)}</div>
      </section>

      <section className="network-section" id="community">
        <div className="network-section-head"><span className="meta-label">03 / COMMUNITY ARCHIVE</span><span>KIDEFIND · AMKAY · EVENTS</span></div>
        <div className="community-gallery">{community.map((item) => <figure key={item.image}><img src={item.image} alt={item.title} loading="lazy" /><figcaption><span className="meta-label">{item.organization}</span><h3>{item.title}</h3><p>{item.copy}</p></figcaption></figure>)}</div>
      </section>

      <section className="network-section signal-grid">
        <article className="linkedin-panel"><Linkedin size={22} /><span className="meta-label">04 / LINKEDIN · VERIFIED LINK</span><h2>{profile.name}</h2><p>{locale === "en" ? "Professional history and contact route. No invented follower, connection, or recommendation counts." : "Historique professionnel et canal de contact. Aucun chiffre d’abonnés, de relations ou de recommandations inventé."}</p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">OPEN LINKEDIN <ExternalLink size={14} /></a></article>
        <article className="now-playing-panel"><Music2 size={22} /><span className="meta-label">05 / NOW PLAYING</span><div className={audio.playing ? "audio-disc is-playing" : "audio-disc"}><span>R11</span></div><h2>{audio.title}</h2><p>{audio.playing ? "ROOM AUDIO / PLAYING" : "USE THE SOUND CONTROL TO START"}</p><small>Spotify live status requires Ryan’s Spotify API credentials; local room music remains available now.</small></article>
      </section>

      <section className="network-section guestbook-section" id="guestbook">
        <div className="network-section-head"><span className="meta-label">06 / GUESTBOOK · REAL DATA</span><span>MODERATED BEFORE PUBLICATION</span></div>
        <div className="guestbook-layout"><form onSubmit={submitGuestbook}><label>NAME<input value={name} onChange={(event) => setName(event.target.value)} maxLength={50} required /></label><label>MESSAGE<textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={280} rows={5} required /></label><button className="solid-action" type="submit" disabled={guestbookState === "sending"}><Send size={14} />{guestbookState === "sending" ? "SENDING…" : "SIGN GUESTBOOK"}</button>{guestbookState === "sent" && <p className="guestbook-status">Message received and awaiting approval.</p>}{guestbookState === "setup" && <p className="guestbook-status">The frontend is ready; apply the included Supabase migration to activate storage.</p>}</form><div className="guestbook-entries">{guestbookState === "loading" && <p>Loading approved messages…</p>}{guestbookState !== "loading" && guestbook.length === 0 && <div className="guestbook-empty"><MessageSquare /><p>No approved messages yet. Be the first to write—your entry will appear after moderation.</p></div>}{guestbook.map((entry) => <article key={entry.id}><div><strong>{entry.name}</strong><time>{new Date(entry.created_at).toLocaleDateString()}</time></div><p>{entry.message}</p></article>)}</div></div>
      </section>
    </div>
  );
};

export default NetworkPage;
