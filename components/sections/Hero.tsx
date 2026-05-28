"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BIRTH_YEAR = 2003;

function UptimeCounter() {
  const [years, setYears] = useState(new Date().getFullYear() - BIRTH_YEAR);
  useEffect(() => {
    const id = setInterval(
      () => setYears(new Date().getFullYear() - BIRTH_YEAR),
      60000
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      since {BIRTH_YEAR} · {years} yrs online
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        padding: "0 max(2rem, 8vw)",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ maxWidth: "760px" }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            color: "var(--fg-muted)",
            marginBottom: "0.4rem",
            opacity: 0.6,
          }}
        >
          01 / HOME
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "var(--fg-muted)",
            marginBottom: "2rem",
            opacity: 0.45,
          }}
        >
          <UptimeCounter />
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            color: "var(--fg)",
            marginBottom: "1.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Dennis{" "}
          <em style={{ fontStyle: "italic", display: "block" }}>Hom</em>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--fg-muted)",
            maxWidth: "480px",
            lineHeight: 1.65,
            marginBottom: "1.75rem",
          }}
        >
          Aerospace Engineer (UT Austin &lsquo;25). Currently working on
          SolidWorks CSWP Certificate.
        </p>

        {/* Contact links */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.04em",
            color: "var(--fg-muted)",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <a href="mailto:dryanhom@gmail.com" style={{ color: "var(--accent-1)" }}>
            dryanhom@gmail.com
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <a
            href="https://www.linkedin.com/in/dennisrhom/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-1)" }}
          >
            linkedin/dennisrhom
          </a>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handler = () => {
      const progress = window.scrollY / (window.innerHeight * 0.5);
      setOpacity(Math.max(0, 1 - progress));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "max(2rem, 8vw)",
        opacity,
        transition: "opacity 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.4rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.1em",
          color: "var(--fg-muted)",
          opacity: 0.5,
        }}
      >
        ↓ scroll
      </span>
      <div
        style={{
          width: "1px",
          height: "2.5rem",
          background: "linear-gradient(to bottom, var(--fg-muted), transparent)",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
