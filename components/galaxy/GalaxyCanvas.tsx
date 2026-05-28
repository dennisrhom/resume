"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "./StarField";
import Nebula from "./Nebula";

interface ClickData {
  pos: [number, number];
  time: number;
}

interface Props {
  scrollY?: number;
  easterEgg?: boolean;
}

export default function GalaxyCanvas({ scrollY = 0, easterEgg = false }: Props) {
  const [clickData, setClickData] = useState<ClickData>({ pos: [0, 0], time: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ?? 4) <= 2
    );

    const handleClick = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setClickData({ pos: [x, y], time: Date.now() });
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const starCount = isMobile ? 3500 : 10000;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        opacity: easterEgg ? 0.9 : 0.45,
        transition: "opacity 0.5s ease",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75, near: 0.1, far: 1000 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <StarField
          count={easterEgg ? Math.min(starCount * 2, 20000) : starCount}
          clickData={clickData}
          scrollY={scrollY}
        />
        <Nebula />
      </Canvas>
    </div>
  );
}
