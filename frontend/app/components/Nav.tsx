"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Point Systems", href: "#points" },
  { label: "Studio", href: "#studio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <nav id="nav" className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a
          className="nav-brand"
          href="#top"
          onClick={(e) => handleAnchor(e, "#top")}
        >
          <Image
            src="/logo-icon.jpg"
            alt="PointCalc"
            width={32}
            height={32}
            style={{ borderRadius: 6 }}
          />
          PointCalc
        </a>

        {/* Desktop nav */}
        <div className={`nav-links${open ? " mobile-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn btn-acid nav-cta" href="#dashboard">
            Launch App →
          </a>
        </div>

        {/* Burger */}
        <button
          id="burger"
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            style={
              open
                ? { transform: "translateY(7px) rotate(45deg)" }
                : undefined
            }
          />
          <span style={open ? { opacity: 0 } : undefined} />
          <span
            style={
              open
                ? { transform: "translateY(-7px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: "var(--nav-h) 0 0",
            background: "rgba(8,8,11,0.96)",
            backdropFilter: "blur(16px)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: "32px 24px",
            gap: "8px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              style={{
                padding: "14px 16px",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text-2)",
                textDecoration: "none",
                borderRadius: "var(--r-sm)",
                background: "var(--surface)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#dashboard"
            className="btn btn-acid"
            style={{ marginTop: 16, justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            Launch App →
          </a>
        </div>
      )}
    </nav>
  );
}
