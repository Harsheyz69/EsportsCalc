"use client";

import { useEffect, useRef, useState } from "react";

type Period = "weekly" | "monthly" | "quarterly" | "yearly";

const PRICES: Record<
  string,
  { premium: string; ai: string; per: string }
> = {
  weekly: { premium: "₹29", ai: "₹150", per: "/week" },
  monthly: { premium: "₹69", ai: "₹350", per: "/month" },
  quarterly: { premium: "₹179", ai: "₹899", per: "/quarter" },
  yearly: { premium: "₹599", ai: "₹2999", per: "/year" },
};

const PERIODS: { id: Period; label: string }[] = [
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
];

export default function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");
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

  const p = PRICES[period];

  return (
    <section className="section-pad" id="pricing" ref={sectionRef} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="kicker center">Pricing</span>
          <h2>Start free. Upgrade when you scale.</h2>
          <p style={{ color: "var(--text-2)", marginTop: 12 }}>
            EsportsCalc is free forever. Unlock premium designs or add AI
            screenshot extraction whenever you&apos;re ready.
          </p>
          {/* Period toggle */}
          <div className="price-toggle" id="priceToggle" style={{ marginTop: 24 }}>
            {PERIODS.map((per) => (
              <button
                key={per.id}
                onClick={() => setPeriod(per.id)}
                className={period === per.id ? "active" : ""}
              >
                {per.label}
              </button>
            ))}
          </div>
        </div>

        <div className="price-grid">
          {/* Free plan */}
          <div className="plan reveal">
            <div className="plan-name">Free</div>
            <div className="plan-price">
              <span className="amount">₹0</span>
              <span className="per"> forever</span>
            </div>
            <ul className="plan-features">
              {[
                "Manual data entry",
                "Core points table generation",
                "Basic design templates",
                "Standard export (1080p)",
              ].map((f) => (
                <li key={f}>
                  <span className="ck">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn-ghost" href="#dashboard" style={{ width: "100%", justifyContent: "center" }}>
              Get Started Free
            </a>
          </div>

          {/* Premium plan */}
          <div className="plan reveal" style={{ transitionDelay: "80ms" }}>
            <div className="plan-name">Premium</div>
            <div className="plan-price">
              <span className="amount">{p.premium}</span>
              <span className="per">{p.per}</span>
            </div>
            <ul className="plan-features">
              {[
                "Unlimited points tables, warhead & posters",
                "Premium design templates",
                "Slot list, top fraggers & certificates",
                "Manual data entry",
                "Priority customer support",
              ].map((f) => (
                <li key={f}>
                  <span className="ck">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn-ghost" href="#dashboard" style={{ width: "100%", justifyContent: "center" }}>
              Get Premium
            </a>
          </div>

          {/* Premium + AI — featured */}
          <div className="plan featured reveal" style={{ transitionDelay: "160ms" }}>
            <div className="plan-ribbon">AI Powered</div>
            <div className="plan-name">Premium + AI</div>
            <div className="plan-price">
              <span className="amount" style={{ color: "var(--acid)" }}>
                {p.ai}
              </span>
              <span className="per">{p.per}</span>
            </div>
            <ul className="plan-features">
              {[
                "Everything in Premium",
                "AI screenshot extraction — auto-parse BGMI, PUBG, FF results",
                "Auto-generated points table, warhead & top fraggers",
                "Bulk match processing",
                "Earliest access to new AI features",
              ].map((f, i) => (
                <li key={f}>
                  <span
                    className="ck"
                    style={
                      i === 1
                        ? { background: "rgba(0,245,212,0.2)", color: "var(--acid)" }
                        : undefined
                    }
                  >
                    {i === 1 ? "AI" : "✓"}
                  </span>
                  <span style={i === 1 ? { fontWeight: 600, color: "var(--text)" } : undefined}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn btn-acid" href="#dashboard" style={{ width: "100%", justifyContent: "center" }}>
              Get Premium + AI
            </a>
          </div>
        </div>

        <p className="price-note">
          Free tier with core features. Pricing shown in INR; converted at checkout.
        </p>
      </div>
    </section>
  );
}
