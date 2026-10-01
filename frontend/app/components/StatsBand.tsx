"use client";

import { useEffect, useRef } from "react";

export default function StatsBand() {
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

  const stats = [
    { value: "150K+", label: "Downloads" },
    { value: "4.9★", label: "App Store rating" },
    { value: "4.4★", label: "Play Store rating" },
    { value: "550+", label: "Total reviews" },
  ];

  return (
    <section className="band" ref={sectionRef}>
      <div className="wrap">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="band-stat reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <strong
              style={
                s.value.includes("★")
                  ? { color: "var(--gold)" }
                  : undefined
              }
            >
              {s.value}
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
