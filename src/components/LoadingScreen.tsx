import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RyanMark from "@/components/RyanMark";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem("room11-intro-seen") !== "true"; }
    catch { return true; }
  });
  const [ready, setReady] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try { sessionStorage.setItem("room11-intro-seen", "true"); } catch { /* Storage can be disabled. */ }
    setVisible(false);
    window.setTimeout(onComplete, 180);
  }, [onComplete]);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const started = performance.now();
    const roomReady = () => {
      const remaining = Math.max(0, 280 - (performance.now() - started));
      window.setTimeout(() => { setReady(true); finish(); }, remaining);
    };
    window.addEventListener("room11:ready", roomReady, { once: true });
    const timeout = window.setTimeout(() => { setReady(true); finish(); }, 900);
    return () => {
      window.removeEventListener("room11:ready", roomReady);
      window.clearTimeout(timeout);
    };
  }, [finish, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-screen intro-screen-fast" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} aria-live="polite">
          <div className="intro-grid" aria-hidden="true" />
          <div className="intro-top meta-label"><span>RYAN ERICK / ROOM 11</span><span>YAOUNDÉ · CM</span></div>
          <div className="intro-center">
            <RyanMark className="intro-mark" animated />
            <p className="meta-label">{ready ? "ROOM READY" : "OPENING ROOM"}</p>
          </div>
          <div className="intro-bottom">
            <div className="intro-progress intro-progress-live"><span /></div>
            <div className="intro-progress-copy meta-label"><span>3D / WEBGL</span><button type="button" onClick={finish}>ENTER NOW</button></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
