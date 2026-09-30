import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RyanMark from "@/components/RyanMark";

const messages = ["INITIALIZING ROOM 11", "INDEXING WORK", "PREPARING RYAN’S WORLD"];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const finish = () => {
    sessionStorage.setItem("room11-intro-seen", "true");
    setVisible(false);
    window.setTimeout(onComplete, 320);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("room11-intro-seen") === "true";
    if (reduced || seen) {
      setVisible(false);
      onComplete();
      return;
    }

    const startedAt = performance.now();
    const duration = 1500;
    let frame = 0;
    const tick = (time: number) => {
      const next = Math.min(100, Math.round(((time - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) frame = window.requestAnimationFrame(tick);
      else window.setTimeout(finish, 120);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} aria-live="polite">
          <div className="intro-grid" aria-hidden="true" />
          <div className="intro-top meta-label"><span>RYAN ERICK / ROOM 11</span><span>YAOUNDÉ · CM</span></div>
          <div className="intro-center">
            <RyanMark className="intro-mark" animated />
            <p className="meta-label">{messages[Math.min(messages.length - 1, Math.floor(progress / 38))]}</p>
          </div>
          <div className="intro-bottom">
            <div className="intro-progress" aria-label={`Loading ${progress}%`}><span style={{ width: `${progress}%` }} /></div>
            <div className="intro-progress-copy meta-label"><span>{String(progress).padStart(3, "0")}%</span><button type="button" onClick={finish}>SKIP INTRO</button></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
