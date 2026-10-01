"use client";

import { useEffect, useRef } from "react";

const CHECKLIST = [
  "Covers the whole kit: points table, warhead, top fraggers, slot list, team poster and certificate. Each one starts from your own image.",
  "Your fonts come along. Drop in a TTF or OTF file and it ships inside the design, so the table looks the same on every device.",
  "Nobody has to pass files around. The link is the design. Your admins import it once and it stays in their EsportsCalc.",
  "Pay for a design once and its link stays live for good. Studio Pro lets you share as many designs as you want while the plan runs.",
];

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad" id="studio" ref={sectionRef} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">New · EsportsCalc Studio</span>
          <h2>
            Your own design,
            <br />
            <span className="em">on every</span> result.
          </h2>
          <p style={{ color: "var(--text-2)", marginTop: 12, maxWidth: 600 }}>
            You already have a look for your org. Studio lets you use it. Open
            your poster or background, drag the table, team names and logos to
            where you want them, and tap Share. You get a link — send it to
            whoever posts your results.
          </p>
        </div>

        {/* Studio card */}
        <div
          className="reveal"
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}
        >
          {/* Copy side */}
          <div style={{ padding: "48px" }}>
            {/* Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 32,
                padding: "16px 20px",
                background: "var(--bg-3)",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "var(--r-sm)",
                  background: "linear-gradient(135deg, var(--acid), var(--violet))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                🎨
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text)" }}>
                  EsportsCalc Studio
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                  Available on Android and iOS
                </div>
              </div>
            </div>

            {/* Checklist */}
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {CHECKLIST.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(0,245,212,0.12)",
                      color: "var(--acid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 900,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    +
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 10 }}>
              <a href="#" className="btn btn-acid">
                Get Studio →
              </a>
              <a href="#pricing" className="btn btn-ghost">
                Studio pricing
              </a>
            </div>
          </div>

          {/* Visual side */}
          <div
            style={{
              background: "var(--bg-3)",
              borderLeft: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Simulated studio editor preview */}
            <div
              style={{
                width: "100%",
                background: "#0a0a14",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border-2)",
                overflow: "hidden",
              }}
            >
              {/* Editor toolbar */}
              <div
                style={{
                  padding: "10px 16px",
                  background: "var(--bg-2)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
                <div
                  style={{
                    marginLeft: 8,
                    fontSize: 11,
                    color: "var(--text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  EsportsCalc Studio — design editor
                </div>
              </div>

              {/* Canvas area */}
              <div
                style={{
                  aspectRatio: "16/9",
                  background: "linear-gradient(135deg, #0f1728 0%, #1a0f28 100%)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Glow */}
                <div
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%)",
                    top: "20%",
                    left: "30%",
                  }}
                />

                {/* Points table placeholder */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "2px dashed rgba(0,245,212,0.4)",
                    borderRadius: 8,
                    padding: "16px 24px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--acid)",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    POINTS TABLE
                  </div>
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      style={{
                        display: "flex",
                        gap: 12,
                        marginBottom: 4,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 6,
                          background: n === 1 ? "var(--acid)" : "rgba(255,255,255,0.15)",
                          borderRadius: 2,
                        }}
                      />
                      <div
                        style={{
                          width: `${80 - n * 14}px`,
                          height: 6,
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Drag handle indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    fontSize: 10,
                    color: "var(--acid)",
                    background: "rgba(0,245,212,0.1)",
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid rgba(0,245,212,0.25)",
                  }}
                >
                  ⟵ drag to position
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
