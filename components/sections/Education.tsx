"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { courseGroups, stats, skills } from "@/data/coursework";

export default function Education() {
  return (
    <section
      id="education"
      style={{
        padding: "7rem max(2rem, 8vw)",
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SectionHeading num="03 / EDUCATION" title="Education" />

      {/* Degree headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "3.5rem" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontWeight: 400,
            color: "var(--fg)",
            marginBottom: "0.4rem",
          }}
        >
          University of Texas at Austin
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
            letterSpacing: "0.06em",
          }}
        >
          B.S. Aerospace Engineering · May 2025 · GPA 3.56
        </p>
      </motion.div>

      {/* Two-column layout: coursework + stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "start",
          marginBottom: "4rem",
        }}
      >
        {/* Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "var(--fg-muted)",
              marginBottom: "1.25rem",
              opacity: 0.5,
            }}
          >
            // SELECTED COURSEWORK
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            {courseGroups.map((group) => (
              <div key={group.label}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    color: "var(--accent-2)",
                    marginBottom: "0.6rem",
                    opacity: 0.7,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {group.courses.map((course) => (
                    <div
                      key={course.code}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "0.5rem",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          color: "var(--fg-muted)",
                          opacity: 0.5,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {course.code}
                      </span>
                      <span
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {course.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          color: "var(--fg-muted)",
                          opacity: 0.6,
                          textAlign: "right",
                        }}
                      >
                        {course.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ minWidth: "160px" }}
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
            // BY THE NUMBERS
          </div>
          {stats.map(({ label, value }) => (
            <div
              key={label}
              style={{ marginBottom: "0.6rem" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  color: "var(--fg-muted)",
                  letterSpacing: "0.08em",
                  opacity: 0.5,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  color: "var(--fg)",
                  letterSpacing: "0.03em",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills band */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {skills.map(({ label, items }) => (
          <div
            key={label}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                color: "var(--accent-1)",
                marginRight: "0.75rem",
                opacity: 0.8,
              }}
            >
              {label} →
            </span>
            <span style={{ color: "var(--fg-muted)", opacity: 0.75 }}>{items}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
