"use client";

import { useEffect, useRef } from "react";

// We'll render two rows of placeholder gradient cards as vault designs
const VAULT_ROW_1 = [
  { tag: "Premium", label: "Points Table", bg: "linear-gradient(135deg,#0f172a,#1e3a5f)", accent: "#3b82f6" },
  { tag: "Premium", label: "Warhead", bg: "linear-gradient(135deg,#1a0a0a,#4a1010)", accent: "#ef4444" },
  { tag: "Free", label: "Points Table", bg: "linear-gradient(135deg,#0f1a0a,#1a3a10)", accent: "#22c55e" },
  { tag: "Premium", label: "Top Fraggers", bg: "linear-gradient(135deg,#0a0a1a,#1a1040)", accent: "#8b5cf6" },
  { tag: "Premium", label: "Slot List", bg: "linear-gradient(135deg,#1a0f0a,#3a1f0a)", accent: "#f59e0b" },
  { tag: "Premium", label: "Certificate", bg: "linear-gradient(135deg,#0a1a1a,#0a3030)", accent: "#ff6a28" },
];

const VAULT_ROW_2 = [
  { tag: "Premium", label: "Team Poster", bg: "linear-gradient(135deg,#1a0a1a,#3a1040)", accent: "#a855f7" },
  { tag: "Premium", label: "Blue Table", bg: "linear-gradient(135deg,#0a0f1a,#102040)", accent: "#60a5fa" },
  { tag: "Premium", label: "Warhead Red", bg: "linear-gradient(135deg,#1a0808,#400f0f)", accent: "#f87171" },
  { tag: "Premium", label: "Fraggers Red", bg: "linear-gradient(135deg,#200808,#481010)", accent: "#ef4444" },
  { tag: "Premium", label: "Ice Table", bg: "linear-gradient(135deg,#081520,#0f2540)", accent: "#93c5fd" },
  { tag: "Premium", label: "Ice Poster", bg: "linear-gradient(135deg,#080d20,#101840)", accent: "#818cf8" },
];

function VaultCard({ card }: { card: typeof VAULT_ROW_1[0] }) {
  return (
    <div className="vshot">
      <span className={`vtag${card.tag === "Premium" ? " prem" : ""}`}>
        {card.tag}
      </span>
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: card.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            background: card.accent,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {card.label}
        </div>
        {/* Simulated table rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "70%",
            marginTop: 4,
          }}
        >
          {[90, 70, 55, 40].map((w, i) => (
            <div
              key={i}
              style={{
                height: 6,
                borderRadius: 3,
                background:
                  i === 0
                    ? card.accent
                    : "rgba(255,255,255,0.12)",
                width: `${w}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplateVault() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Duplicate tracks for seamless loop
    if (track1Ref.current) {
      track1Ref.current.innerHTML += track1Ref.current.innerHTML;
    }
    if (track2Ref.current) {
      track2Ref.current.innerHTML += track2Ref.current.innerHTML;
    }

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
    <section className="section-pad vault" id="designs" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="kicker center">The template vault</span>
        </div>
      </div>

      <div
        className="vault-big reveal"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(72px, 15vw, 220px)",
          textAlign: "center",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.45)",
          lineHeight: 1,
          paddingBlock: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ color: "var(--text)", WebkitTextStroke: 0 }}>200+</span>{" "}
        <span style={{ color: "rgba(255,255,255,0.12)", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>
          designs
        </span>
      </div>

      <div className="vault-rows">
        <div className="vault-mqrow">
          <div ref={track1Ref} className="vault-track">
            {VAULT_ROW_1.map((card, i) => (
              <VaultCard key={i} card={card} />
            ))}
          </div>
        </div>
        <div className="vault-mqrow rev">
          <div ref={track2Ref} className="vault-track">
            {VAULT_ROW_2.map((card, i) => (
              <VaultCard key={i} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="vault-cta reveal">
        <a className="btn btn-acid" href="#dashboard">
          Browse all 200+ templates →
        </a>
        <p className="vault-note">Free packs included · Premium drops monthly</p>
      </div>
    </section>
  );
}
