"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "What games does EsportsCalc support?",
    a: "EsportsCalc supports BGMI, PUBG Mobile and Free Fire — the three biggest battle royale titles in the tournament community. You upload lobby and result screens; EsportsCalc generates the points table, warhead, top fraggers, slot list, team posters and certificates from that data.",
  },
  {
    q: "How does the AI screenshot extraction work?",
    a: "Upload your lobby and result screens from a match. EsportsCalc's AI reads the placements, kills and player stats directly off the images and populates everything automatically. You can review and edit any value before publishing — accuracy holds up across most result-screen layouts.",
  },
  {
    q: "Is EsportsCalc free?",
    a: "Yes — the app is free to download and the core features work without a subscription. Premium templates and AI screenshot extraction are available on optional paid tiers, starting at ₹29/week for Premium and ₹150/week for Premium + AI.",
  },
  {
    q: "Can I customize point rules and kill multipliers?",
    a: "Yes. EsportsCalc ships with official presets (BGIS 10-pt, Legacy 15-pt, Free Fire standard) and also supports fully custom point systems — set your own placement weights and kill point values from the settings panel.",
  },
  {
    q: "What output formats does EsportsCalc export?",
    a: "EsportsCalc exports broadcast-ready PNG/WebP at up to 4K resolution. Supported asset types include: Overall Standings (16:9 & 4:5), Warhead (16:9), Top Fraggers (1:1 & 9:16), Slot List (16:9 & 4:5), Team Posters, and Winner Certificates (A4/16:9).",
  },
  {
    q: "Can I use my own branding and logos?",
    a: "Yes. You can adjust colors, swap the background image and add as many custom logos as you need. EsportsCalc Studio lets you bring your own complete artwork — open your poster or background, drag the table and logos to where you want them, and share the design as a link.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
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
    <section className="section-pad" id="faq" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="kicker center">FAQ</span>
          <h2>Common questions</h2>
        </div>

        <div className="faq-list reveal" id="faqList">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item${openIdx === i ? " open" : ""}`}
            >
              <button
                className="faq-q"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                {faq.q}
                <span className="faq-ic">+</span>
              </button>
              {openIdx === i && (
                <div className="faq-a">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
