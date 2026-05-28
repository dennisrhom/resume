"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        padding: "5rem max(2rem, 8vw) 3rem",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "var(--fg-muted)",
            marginBottom: "1.5rem",
            opacity: 0.5,
          }}
        >
          07 / CONTACT
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            marginBottom: "2.5rem",
          }}
        >
          <a
            href="mailto:dryanhom@gmail.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--accent-1)",
              letterSpacing: "0.03em",
            }}
          >
            dryanhom@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/dennisrhom/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--accent-1)",
              letterSpacing: "0.03em",
            }}
          >
            linkedin.com/in/dennisrhom
          </a>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "var(--fg-muted)",
            letterSpacing: "0.06em",
            opacity: 0.4,
          }}
        >
          Built by Dennis in {year}. No tracking, no cookies, no analytics.
        </div>
      </motion.div>
    </footer>
  );
}
