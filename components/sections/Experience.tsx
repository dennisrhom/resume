"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="experience"
      style={{
        padding: "7rem max(2rem, 8vw)",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SectionHeading num="04 / WORK" title="Work" />

      <div style={{ position: "relative" }}>
        {/* Vertical hairline */}
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 0.5px)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "var(--border)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {experience.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  alignItems: "start",
                }}
              >
                {/* Left — company + role */}
                <div>
                  <button
                    onClick={() =>
                      setOpenId(openId === entry.id ? null : entry.id)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                      width: "100%",
                    }}
                    aria-expanded={openId === entry.id}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                          fontWeight: 400,
                          color: "var(--fg)",
                        }}
                      >
                        {entry.company}
                      </h3>
                      {entry.current && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.1em",
                            color: "var(--accent-2)",
                            border: "1px solid var(--accent-2)",
                            padding: "0.1rem 0.35rem",
                            opacity: 0.8,
                          }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--fg-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {entry.role}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openId === entry.id && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginTop: "1rem",
                          paddingLeft: "1rem",
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.6rem",
                          borderLeft: "1px solid var(--border-strong)",
                        }}
                      >
                        {entry.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            style={{
                              fontSize: "0.92rem",
                              color: "var(--fg-muted)",
                              lineHeight: 1.65,
                            }}
                          >
                            {b}
                          </li>
                        ))}
                        {entry.tags && (
                          <li style={{ paddingTop: "0.25rem" }}>
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.58rem",
                                color: "var(--accent-1)",
                                letterSpacing: "0.08em",
                                opacity: 0.7,
                              }}
                            >
                              {entry.tags.join(" · ")}
                            </div>
                          </li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right — date */}
                <div style={{ textAlign: "right", paddingTop: "0.2rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--fg-muted)",
                      letterSpacing: "0.06em",
                      opacity: 0.6,
                    }}
                  >
                    {entry.period}
                  </span>
                </div>
              </div>

              {/* Divider */}
              {i < experience.length - 1 && (
                <div
                  style={{
                    marginTop: "2rem",
                    height: "1px",
                    background: "var(--border)",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
