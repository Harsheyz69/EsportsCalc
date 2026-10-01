"use client";

import { useEffect, useRef } from "react";

const REVIEWS = [
  {
    stars: 5,
    text: "Absolutely one of the best apps I've used. The UI is clean, smooth, and very professional. Customer support is fast, helpful and truly world-class.",
    name: "Babul Behera",
    platform: "Google Play review",
    avatar: "B",
  },
  {
    stars: 5,
    text: "User friendly and also the best support for importing designs. Everything I need to run my scrims is in one place — saves me hours after every match day.",
    name: "Sakeena Basheer",
    platform: "Google Play review",
    avatar: "S",
  },
  {
    stars: 5,
    text: "Very useful app for tournament or scrims conducting teams. Quick to learn, results look professional. Highly recommended for any community running events.",
    name: "Adhi (Gamer FF)",
    platform: "Google Play review",
    avatar: "A",
  },
];

export default function Testimonials() {
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
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad" id="reviews" ref={sectionRef} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Trusted by organizers</span>
          <h2>What organizers are saying</h2>
          <p style={{ color: "var(--text-2)", marginTop: 12 }}>
            Real installs, real ratings, real testimonials from the Play Store
            and App Store.
          </p>
        </div>

        <div className="quotes">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className={`quote reveal`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="qmark">&ldquo;</span>
              <span className="stars">{"★".repeat(rev.stars)}</span>
              <p>&ldquo;{rev.text}&rdquo;</p>
              <div className="who">
                <span className="av">{rev.avatar}</span>
                <div>
                  <div className="who-name">{rev.name}</div>
                  <div className="who-role">{rev.platform}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
