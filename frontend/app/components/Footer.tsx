import Image from "next/image";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Point Systems", href: "#points" },
    { label: "Studio", href: "#studio" },
    { label: "Template Vault", href: "#designs" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Platform: [
    { label: "Web App", href: "#dashboard" },
    { label: "iOS App", href: "#" },
    { label: "Android App", href: "#" },
    { label: "Studio for iOS", href: "#studio" },
    { label: "Studio for Android", href: "#studio" },
  ],
  Connect: [
    { label: "Instagram", href: "#" },
    { label: "WhatsApp Support", href: "#" },
    { label: "Email", href: "mailto:contact@esportscalc.in" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          {/* Brand col */}
          <div className="foot-col">
            <div className="foot-brand">
              <Image
                src="/esportscalc-logo.jpg"
                alt="EsportsCalc"
                width={28}
                height={28}
                style={{ borderRadius: 6 }}
              />
              EsportsCalc
            </div>
            <p>
              AI-powered tournament toolkit for BGMI, PUBG Mobile &amp; Free
              Fire organizers. Drop screenshots, get the whole kit — points
              table, warhead, top fraggers, slot list, posters and certificates.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <a href="#" className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
                Instagram
              </a>
              <a href="#" className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="foot-col">
              <h4>{heading}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="foot-bottom">
          <span>© 2026 EsportsCalc. All rights reserved.</span>
          <span>
            Made with ❤️ for the esports community
          </span>
        </div>
      </div>
    </footer>
  );
}
