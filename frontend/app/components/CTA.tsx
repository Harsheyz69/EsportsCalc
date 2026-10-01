"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
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
      { threshold: 0.2 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad cta" id="dashboard" ref={sectionRef}>
      <div className="wrap">
        <div className="cta-card reveal">
          <h2>
            Run your next
            <br />
            tournament with EsportsCalc
          </h2>
          <p>
            Free to get started. Join 150K+ organizers, scrim hosts and content
            creators who already run on EsportsCalc.
          </p>
          <div className="cta-actions">
            <a href="#" className="btn btn-acid" style={{ fontSize: 15, padding: "14px 28px" }}>
              Launch Web App — Free
            </a>
            <a href="#how" className="btn btn-ghost">
              See how it works
            </a>
          </div>

          {/* Decorative badges row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {["BGMI", "PUBG Mobile", "Free Fire", "150K+ Downloads", "4.9★ Rated"].map((badge) => (
              <span
                key={badge}
                style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-2)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-3)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
