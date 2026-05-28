"use client";
import { useEffect, useRef } from "react";

export function useMouseUniform() {
  const mouse = useRef<[number, number]>([0, 0]);
  const rafId = useRef<number | null>(null);
  const pending = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pending.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          mouse.current = pending.current;
          rafId.current = null;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mouse;
}
