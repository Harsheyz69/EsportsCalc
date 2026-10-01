"use client";

import { useEffect, useRef } from "react";

const LEADERBOARD = [
  { rank: 1, team: "SOUL", kills: 34, pts: 128, bar: 96 },
  { rank: 2, team: "GODLIKE", kills: 28, pts: 114, bar: 82 },
  { rank: 3, team: "OR", kills: 22, pts: 97, bar: 68 },
  { rank: 4, team: "TSM", kills: 19, pts: 83, bar: 54 },
];

export default function Features() {
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
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="section-pad"
      id="features"
      ref={sectionRef}
      style={{ paddingTop: 0 }}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Features</span>
          <h2>Your all-in-one tournament toolkit</h2>
          <p style={{ color: "var(--text-2)", marginTop: 12, maxWidth: 540 }}>
            Everything you need to run a scrim, league or championship — without
            bouncing between five different apps.
          </p>
        </div>

        <div className="feat-grid">
          {/* Big card — Flagship */}
          <div className="feat big reveal">
            <div className="copy">
              <span className="feat-tag">Flagship</span>
              <h3>AI screenshot extraction</h3>
              <p>
                Drop BGMI, PUBG Mobile or Free Fire lobby and result screens.
                Placements and kills are read automatically — points table,
                warhead, top fraggers, slot list, posters and certificates all
                generate from the same uploads.
              </p>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {["OpenCV preprocessing", "PaddleOCR / EasyOCR", "Gemini Flash fallback"].map(
                  (item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--text-3)",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--acid)",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Leaderboard preview widget */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  marginBottom: 12,
                }}
              >
                Live standings preview
              </div>
              <div className="point-system-table">
                <div className="pst-row header">
                  <span>#</span>
                  <span>Team</span>
                  <span style={{ textAlign: "right" }}>Pts</span>
                </div>
                {LEADERBOARD.map((row) => (
                  <div
                    key={row.rank}
                    className={`pst-row${row.rank === 1 ? " highlight" : ""}`}
                  >
                    <span className="pst-rank">{row.rank}</span>
                    <span>{row.team}</span>
                    <span className="pst-pts">{row.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily points tables */}
          <div className="feat third a-blue reveal">
            <span className="feat-tag" style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>
              Live
            </span>
            <h3>Daily points tables</h3>
            <p>
              Live standings after every match. Publish a fresh points table and
              warhead leaderboard without breaking format.
            </p>
            <div className="ministand">
              {[
                { rank: 1, bar: 96, pts: 128, lead: true },
                { rank: 2, bar: 82, pts: 114, lead: false },
                { rank: 3, bar: 68, pts: 97, lead: false },
                { rank: 4, bar: 54, pts: 83, lead: false },
              ].map((r) => (
                <div key={r.rank} className={`ms-row${r.lead ? " lead" : ""}`}>
                  <span className="ms-rank">{r.rank}</span>
                  <div className="ms-bar-wrap">
                    <div
                      className="ms-bar"
                      style={{ width: `${r.bar}%`, background: r.lead ? "rgba(0,245,212,0.5)" : "var(--border-2)" }}
                    />
                  </div>
                  <span className="ms-pts">{r.pts}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Fraggers */}
          <div className="feat third a-heat reveal">
            <span className="feat-tag" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>
              Stat cards
            </span>
            <h3>Top fraggers &amp; warhead</h3>
            <p>
              Auto-ranked from match data — the MVP of every lobby, surfaced as
              creator-grade stat cards in your colors.
            </p>
            <div
              style={{
                marginTop: 20,
                padding: "16px",
                background: "var(--surface)",
                borderRadius: "var(--r-md)",
                border: "1px solid rgba(239,68,68,0.2)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                💀
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
                  SOUL_Mortal
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#f87171",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  14 Kills · 2,850 DMG
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  padding: "4px 10px",
                  borderRadius: "var(--r-sm)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#f87171",
                }}
              >
                MVP
              </div>
            </div>
          </div>

          {/* Slot list */}
          <div className="feat third reveal">
            <span className="feat-tag">Broadcast</span>
            <h3>Slot list &amp; team posters</h3>
            <p>
              Add your teams, players and logos — EsportsCalc turns it into a
              broadcast-grade slot list and posters for every squad.
            </p>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {["Slot #01  SOUL", "Slot #02  GodLike", "Slot #03  TSM", "Slot #04  OR"].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    background: "var(--surface)",
                    borderRadius: "var(--r-sm)",
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="feat third a-gold reveal">
            <span className="feat-tag" style={{ background: "rgba(245,158,11,0.15)", color: "var(--gold)" }}>
              No Photoshop
            </span>
            <h3>Winner certificates</h3>
            <p>
              Free + premium certificate templates. Custom rules, placement and
              kill multipliers — generated, not designed by hand.
            </p>
            <div
              style={{
                marginTop: 20,
                padding: 16,
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "var(--r-md)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 4 }}>🏆</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>
                Champion
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                Certificate auto-generated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
