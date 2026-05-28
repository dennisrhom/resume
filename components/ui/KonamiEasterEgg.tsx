"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

interface Props {
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function KonamiEasterEgg({ onActivate, onDeactivate }: Props) {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seq: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-KONAMI.length);
      const match = seq.length === KONAMI.length &&
        seq.every((k, i) => k === KONAMI[i]);
      setProgress(seq.filter((k, i) => k === KONAMI[i]).length);

      if (match) {
        setActive(true);
        onActivate();
        seq = [];
        setTimeout(() => {
          setActive(false);
          onDeactivate();
        }, 3500);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onActivate, onDeactivate]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--accent-2)",
            letterSpacing: "0.15em",
            pointerEvents: "none",
            textShadow: `0 0 20px var(--accent-2)`,
          }}
        >
          // gg
        </motion.div>
      )}
    </AnimatePresence>
  );
}
