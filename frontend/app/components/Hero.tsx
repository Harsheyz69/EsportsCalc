"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const revealRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Trigger hero reveal on mount
    const timer = setTimeout(() => {
      revealRef.current.forEach((el, i) => {
        if (el) {
          setTimeout(() => el.classList.add("in"), i * 200);
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const addReveal = (el: HTMLDivElement | null) => {
    if (el && !revealRef.current.includes(el)) revealRef.current.push(el);
  };

  return (
    <section className="hero" id="top">
      {/* Background gradients */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-holo-text" aria-hidden="true">ESPORTS</div>

      <div className="wrap hero-grid">
        {/* Copy */}
        <div className="hero-copy">
          <div ref={addReveal} className="hero-reveal">
            <a className="hero-badge" href="#studio">
              <span className="dot" />
              New · EsportsCalc Studio is here →
            </a>
          </div>

          <div ref={addReveal} className="hero-reveal">
            <h1>
              Drop screens.
              <br />
              <span className="em" data-text="Get the">Get the</span>
              <br />
              <span className="stroke" data-text="whole kit.">whole kit.</span>
            </h1>
          </div>

          <div ref={addReveal} className="hero-reveal">
            <p className="hero-sub">
              The AI tournament toolkit for BGMI, PUBG Mobile &amp; Free Fire
              organizers. Upload your lobby and result screens — placements and
              kills are read automatically, then EsportsCalc builds the points
              table, warhead, top fraggers, slot list, posters and certificates
              for you.
            </p>
          </div>

          <div ref={addReveal} className="hero-reveal">
            <div className="hero-actions">
              <a href="#dashboard" className="btn btn-acid">
                Launch App — It&apos;s Free
              </a>
              <a href="#how" className="btn btn-ghost">
                See how it works ↓
              </a>
            </div>
          </div>

          <div ref={addReveal} className="hero-reveal">
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>
                  4.9<span className="star">★</span>
                </strong>
                <span>App Store</span>
              </div>
              <div className="hero-stat">
                <strong>
                  4.4<span className="star">★</span>
                </strong>
                <span>Play Store</span>
              </div>
              <div className="hero-stat">
                <strong>150K+</strong>
                <span>Downloads</span>
              </div>
              <div className="hero-stat">
                <strong>550+</strong>
                <span>Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
