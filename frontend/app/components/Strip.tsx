"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "BGMI",
  "PUBG Mobile",
  "Free Fire",
  "Points Table",
  "Warhead",
  "Top Fraggers",
  "Slot List",
  "Certificates",
  "AI Screenshot Reader",
  "Team Posters",
  "4K Export",
  "Live Standings",
];

export default function Strip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Duplicate items for seamless loop
    if (trackRef.current) {
      const original = trackRef.current.innerHTML;
      trackRef.current.innerHTML = original + original;
    }
  }, []);

  return (
    <div className="strip" aria-label="Supported games and features">
      <div ref={trackRef} className="strip-track">
        {ITEMS.map((item, i) => (
          <span key={i} className="item" style={{ display: "inline-flex", alignItems: "center" }}>
            {item}
            <span className="sep" style={{ marginLeft: 28, marginRight: 0 }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
