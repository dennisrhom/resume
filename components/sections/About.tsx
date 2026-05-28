"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  { label: "LOCATION",  value: "Conroe, TX" },
  { label: "STATUS",    value: "Open to opportunities" },
  { label: "LANGUAGES", value: "English" },
  { label: "WORK AUTH", value: "U.S., no restrictions" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "7rem max(2rem, 8vw)",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        position: "relative",
      }}
    >
      <SectionHeading num="02 / ABOUT" title="About" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* Main prose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ paddingLeft: "clamp(0px, 4vw, 3.5rem)" }}
        >
          {/* Pull quote */}
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              fontStyle: "italic",
              color: "var(--fg)",
              borderLeft: "1px solid var(--border-strong)",
              paddingLeft: "1.25rem",
              marginBottom: "2rem",
              lineHeight: 1.4,
            }}
          >
            &ldquo;I like things that have to actually work.&rdquo;
          </blockquote>

          <p style={{ marginBottom: "1.25rem", fontSize: "0.95rem" }}>
            I just graduated from UT Austin with a B.S. in Aerospace Engineering. I
            spend my time somewhere between CAD models, soldering irons, and Valorant
            lobbies. I&rsquo;m currently doing prompt engineering work for frontier AI
            labs through Mercor, co-running a small esports peripherals company called
            Pegasi, and helping my parents engineer a smarter chicken coop.
          </p>
          <p style={{ fontSize: "0.95rem" }}>
            I&rsquo;m looking for full-time roles in aerospace, hardware, or anywhere a
            generalist with strong fundamentals is useful. Open to relocation.
          </p>
        </motion.div>

        {/* Facts block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "var(--fg-muted)",
              marginBottom: "0.75rem",
              opacity: 0.5,
            }}
          >
            // FACTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {facts.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.06em",
                  color: "var(--fg-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "var(--accent-2)", marginRight: "0.5rem" }}>
                  {label}:
                </span>
                {value}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
