"use client";

import { useEffect, useRef } from "react";
import { Upload, ScanLine, Send } from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: Upload,
    kicker: "Step 01",
    title: "Upload your screens",
    desc: "Drop your lobby and result screenshots from BGMI, PUBG Mobile or Free Fire. That's the only input PointCalc needs — multi-game support out of the box.",
    className: "step s1",
  },
  {
    n: 2,
    icon: ScanLine,
    kicker: "Step 02",
    title: "AI extracts the data",
    desc: "Placements and kills are read straight off the screens. PointCalc derives the full picture — points table, warhead and top fraggers. Edit any value if you need to.",
    className: "step s2",
  },
  {
    n: 3,
    icon: Send,
    kicker: "Step 03",
    title: "Publish the design",
    desc: "Pick a template, drop in your brand, export. Points table, warhead, top fragger, slot list, team posters and certificates — all built in.",
    className: "step s3",
  },
];

export default function HowItWorks() {
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
      { threshold: 0.12 }
    );

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => {
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad" id="how" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">How it works</span>
          <h2>Three steps to a published kit</h2>
          <p style={{ color: "var(--text-2)", marginTop: 12, maxWidth: 560 }}>
            No spreadsheets. No copy-pasting from screenshots. No Photoshop.
            PointCalc handles the whole chain — from raw screens to a finished,
            broadcast-grade tournament kit.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className={`${step.className} reveal`}>
                <div className="step-number">
                  <span className="step-badge">{String(step.n).padStart(2, "0")}</span>
                  <Icon size={20} className="step-icon" />
                </div>
                <div className="step-kicker">{step.kicker}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            );
          })}
        </div>

        <p
          className="reveal"
          style={{
            marginTop: 32,
            color: "var(--text-3)",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Want the full walkthrough?{" "}
          <a
            href="#faq"
            style={{ color: "var(--acid)", textDecoration: "none" }}
          >
            Read the step-by-step guide →
          </a>
        </p>
      </div>
    </section>
  );
}
