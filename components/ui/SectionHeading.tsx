"use client";
import { motion } from "framer-motion";

interface Props {
  num: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ num, title, subtitle, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{ marginBottom: "3rem" }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          color: "var(--fg-muted)",
          marginBottom: "0.6rem",
          opacity: 0.6,
        }}
      >
        {num}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          fontWeight: 400,
          color: "var(--fg)",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent-2)",
            marginTop: "0.5rem",
            letterSpacing: "0.08em",
          }}
        >
          {subtitle}
        </div>
      )}
    </motion.div>
  );
}
