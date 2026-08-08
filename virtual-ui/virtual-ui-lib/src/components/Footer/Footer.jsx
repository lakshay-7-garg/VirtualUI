import React from "react";

export const Footer = ({
  logo = "VirtualAI",
  links = ["Home", "Features", "Pricing", "Blog", "Contact"],
  copyright = "VirtualAI",
  accent = "#6366f1",
  bg = "#0f172a",
}) => {
  return (
    <footer style={{
      background: bg,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      fontFamily: "system-ui, sans-serif",
      width: "100%",
      boxSizing: "border-box",
      padding: "28px 24px",
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "26px", height: "26px", borderRadius: "7px",
            background: `linear-gradient(135deg, ${accent}, rgba(99,102,241,0.5))`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "800", color: "#fff",
          }}>
            {logo[0]}
          </div>
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo}</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px" }}>
          {links.map((link) => (
            <a key={link} href="#" style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              padding: "4px 12px",
              borderRadius: "8px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Copyright */}
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)", margin: 0 }}>
          © {new Date().getFullYear()} {copyright}. All rights reserved.
        </p>

      </div>
    </footer>
  );
};