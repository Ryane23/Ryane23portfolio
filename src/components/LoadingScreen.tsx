import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RyanMark from "@/components/RyanMark";

const DURATION = 5000;
const messages = [
  "CALIBRATING ROOM 11",
  "LIGHTING THE WORKSTATION",
  "INDEXING PROJECTS",
  "CONNECTING THE ARCHIVE",
  "ROOM READY",
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem("room11-intro-seen") !== "true"; }
    catch { return true; }
  });
  const [progress, setProgress] = useState(0);
  const roomReady = useRef(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try { sessionStorage.setItem("room11-intro-seen", "true"); } catch { /* Storage may be disabled. */ }
    setVisible(false);
    window.setTimeout(onComplete, 320);
  }, [onComplete]);

  useEffect(() => {
    if (!visible) {
      finish();
      return;
    }

    const ready = () => { roomReady.current = true; };
    window.addEventListener("room11:ready", ready);
    const startedAt = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const next = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(next);
      if (elapsed < DURATION) frame = requestAnimationFrame(tick);
      else finish();
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("room11:ready", ready);
    };
  }, [finish, visible]);

  const messageIndex = Math.min(messages.length - 1, Math.floor(progress / 21));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-screen intro-screen-cinematic" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }} aria-live="polite">
          <div className="intro-grid intro-grid-drift" aria-hidden="true" />
          <div className="intro-scanline" aria-hidden="true" />
          <div className="intro-top meta-label"><span>RYAN ERICK / ROOM 11</span><span>YAOUNDÉ · CM</span></div>
          <div className="intro-center">
            <div className="intro-orbit" aria-hidden="true"><span /><span /><span /></div>
            <RyanMark className="intro-mark" animated />
            <p className="meta-label">{messages[messageIndex]}</p>
          </div>
          <div className="intro-bottom">
            <div className="intro-progress"><span style={{ width: `${progress}%` }} /></div>
            <div className="intro-progress-copy meta-label"><span>{String(progress).padStart(3, "0")}%</span><span>{roomReady.current ? "3D SIGNAL LOCKED" : "WAITING FOR 3D SIGNAL"}</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
