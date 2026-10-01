"use client";

import { useEffect, useRef } from "react";

const POINT_SYSTEMS = [
  {
    id: "bgis",
    name: "BGIS / PMGC (10-pt)",
    game: "BGMI · PUBG Mobile",
    color: "var(--acid)",
    rows: [
      { rank: "#1 (WWCD)", pts: 10 },
      { rank: "#2", pts: 6 },
      { rank: "#3", pts: 5 },
      { rank: "#4", pts: 4 },
      { rank: "#5", pts: 3 },
      { rank: "#6", pts: 2 },
      { rank: "#7 – #8", pts: 1 },
      { rank: "#9 – #16", pts: 0 },
      { rank: "Per Kill", pts: 1 },
    ],
  },
  {
    id: "legacy",
    name: "Legacy 15-pt System",
    game: "Old PMPL · Club Open",
    color: "var(--violet)",
    rows: [
      { rank: "#1", pts: 15 },
      { rank: "#2", pts: 12 },
      { rank: "#3", pts: 10 },
      { rank: "#4", pts: 8 },
      { rank: "#5", pts: 6 },
      { rank: "#6", pts: 4 },
      { rank: "#7", pts: 2 },
      { rank: "#8 – #12", pts: 1 },
      { rank: "Per Kill", pts: 1 },
    ],
  },
  {
    id: "ff",
    name: "Free Fire Standard",
    game: "Free Fire · Booyah",
    color: "var(--gold)",
    rows: [
      { rank: "#1 (Booyah)", pts: 12 },
      { rank: "#2", pts: 9 },
      { rank: "#3", pts: 7 },
      { rank: "#4", pts: 5 },
      { rank: "#5", pts: 4 },
      { rank: "#6", pts: 3 },
      { rank: "#7 – #8", pts: 2 },
      { rank: "#9 – #12", pts: 1 },
      { rank: "Per Kill", pts: 1 },
    ],
  },
];

export default function PointSystems() {
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
    <section className="section-pad" id="points" ref={sectionRef} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Point Systems</span>
          <h2>Built-in point rule presets</h2>
          <p style={{ color: "var(--text-2)", marginTop: 12, maxWidth: 560 }}>
            EsportsCalc ships with official presets for BGMI, PUBG Mobile and Free
            Fire — or build your own custom ruleset with manual placement
            weights and kill multipliers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {POINT_SYSTEMS.map((ps, i) => (
            <div
              key={ps.id}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                style={{
                  background: "var(--bg-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-2)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Header bar */}
                <div
                  style={{
                    height: 3,
                    background: ps.color,
                  }}
                />
                {/* Card header */}
                <div style={{ padding: "24px 24px 16px" }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 4,
                    }}
                  >
                    {ps.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: ps.color,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {ps.game}
                  </div>
                </div>

                {/* Table */}
                <div className="point-system-table" style={{ margin: "0 16px 16px", borderRadius: "var(--r-sm)" }}>
                  <div className="pst-row header">
                    <span>Rank</span>
                    <span style={{ gridColumn: "span 2", textAlign: "right" }}>Points</span>
                  </div>
                  {ps.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`pst-row${
                        ri === 0 || ri === ps.rows.length - 1 ? " highlight" : ""
                      }`}
                      style={
                        ri === 0
                          ? { color: ps.color }
                          : ri === ps.rows.length - 1
                          ? { color: "var(--text-3)" }
                          : undefined
                      }
                    >
                      <span style={{ gridColumn: "span 2" }}>{row.rank}</span>
                      <span className="pst-pts" style={ri === 0 ? { color: ps.color } : undefined}>
                        +{row.pts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tie-breaker note */}
        <div
          className="reveal"
          style={{
            marginTop: 32,
            padding: 24,
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(0,245,212,0.12)",
              color: "var(--acid)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Automatic Tie-Breaker Resolution
            </div>
            <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>
              When teams share identical Total Points, EsportsCalc resolves ties
              by:{" "}
              <span style={{ color: "var(--acid)" }}>
                (1) Placement Points → (2) WWCD/Booyah count → (3) Kill Points
                → (4) Best single-match score → (5) Best placement rank
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
