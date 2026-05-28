"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      style={{
        padding: "7rem max(2rem, 8vw)",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SectionHeading num="05 / PROJECTS" title="Projects" />

      {/* Asymmetric 12-col grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto",
          gap: "1.25rem",
        }}
      >
        {projects.map((project, i) => {
          const colSpans = [
            "span 7", // chicken coop — large
            "span 5", // nasa — medium-large
            "span 12", // propeller — full width (medium)
          ];
          const isOpen = openId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{ gridColumn: colSpans[i] ?? "span 12" }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  border: "1px solid var(--border)",
                  padding: "1.75rem",
                  height: "100%",
                  cursor: "pointer",
                  position: "relative",
                  transition: "border-color 0.25s ease",
                }}
                onHoverStart={(e) => {
                  (e.target as HTMLElement).closest<HTMLElement>("[data-project]")!
                    .style.borderColor = "var(--accent-1)";
                }}
                onHoverEnd={(e) => {
                  (e.target as HTMLElement).closest<HTMLElement>("[data-project]")!
                    .style.borderColor = "var(--border)";
                }}
                data-project
                onClick={() => setOpenId(isOpen ? null : project.id)}
              >
                {/* Period */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--fg-muted)",
                    letterSpacing: "0.08em",
                    opacity: 0.5,
                    textAlign: "right",
                    marginBottom: "1rem",
                  }}
                >
                  {project.period}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    fontWeight: 400,
                    color: "var(--fg)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.2,
                  }}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--fg-muted)",
                    lineHeight: 1.55,
                    marginBottom: "1rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--accent-1)",
                    letterSpacing: "0.08em",
                    opacity: 0.65,
                  }}
                >
                  {project.tags.join(" · ")}
                </div>

                {/* Hover hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1.25rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--fg-muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isOpen ? "↑ collapse" : "→ details"}
                </motion.div>

                {/* Expanded detail panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", marginTop: "1.5rem" }}
                    >
                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                          paddingTop: "1.25rem",
                        }}
                      >
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.6rem",
                          }}
                        >
                          {project.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              style={{
                                fontSize: "0.85rem",
                                color: "var(--fg-muted)",
                                lineHeight: 1.55,
                                paddingLeft: "1rem",
                                borderLeft: "1px solid var(--border-strong)",
                              }}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
