import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useLocation } from "react-router-dom";

const EditorialMusicPlayer = () => {
  const { pathname } = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(true);
  const footballTrack = pathname.includes("football") || pathname.includes("anime") || pathname.includes("library") || pathname.includes("bibliotheque");
  const src = footballTrack ? "/music/nemzzz-track.mp3" : "/music/mgmt-little-dark-age.mp3";
  const title = footballTrack ? "Nemzzz" : "MGMT · Little Dark Age";

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.45;
    return () => { audio.pause(); };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audio.src.endsWith(src)) return;
    const resume = playing;
    audio.pause();
    audio.src = src;
    audio.load();
    if (resume) audio.play().catch(() => setPlaying(false));
  }, [src, playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  useEffect(() => {
    const report = () => window.dispatchEvent(new CustomEvent("room11:audio", { detail: { playing, title } }));
    window.addEventListener("room11:audio-request", report);
    report();
    return () => window.removeEventListener("room11:audio-request", report);
  }, [playing, title]);

  return (
    <div className={`editorial-player ${open ? "is-open" : ""}`}>
      <button type="button" className="player-tab" onClick={() => setOpen(!open)} aria-expanded={open}><span className={playing ? "player-pulse" : ""} /> SOUND</button>
      <div className="player-controls">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Pause size={14} /> : <Play size={14} />}</button>
        <div><strong>{title}</strong><span>{playing ? "PLAYING" : "PAUSED"}</span></div>
        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
      </div>
    </div>
  );
};

export default EditorialMusicPlayer;
