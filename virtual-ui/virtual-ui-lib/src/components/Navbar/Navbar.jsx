import React, { useState, useEffect } from "react";

export const Navbar = ({
  logo = "VirtualAI",
  links = ["Home", "Features", "Pricing", "Blog"],
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0f172a",
  onCtaClick = () => {},
  onLinkClick = () => {},
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleLink = (link) => {
    setActive(link);
    setMenuOpen(false);
    onLinkClick(link);
  };

  return (
    <>
      <style>{`
        @keyframes nbSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-link:hover { color: rgba(255,255,255,0.9) !important; background: rgba(255,255,255,0.05) !important; }
        .nb-cta:hover  { opacity: 0.85 !important; }
        .nb-ham:hover  { background: rgba(255,255,255,0.1) !important; }
        .nb-mlink:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      <nav style={{
        position: "sticky",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? alpha(bg, 0.96) : bg,
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        fontFamily: "system-ui, -apple-system, sans-serif",
        width: "100%",
        boxSizing: "border-box",
      }}>

        {/* ── Main bar ── */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          height: isMobile ? "56px" : "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          boxSizing: "border-box",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
            <div style={{
              width: isMobile ? "26px" : "30px",
              height: isMobile ? "26px" : "30px",
              borderRadius: "8px",
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: "800", color: "#fff", flexShrink: 0,
            }}>
              {logo[0]}
            </div>
            <span style={{
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "800", color: "#fff", letterSpacing: "-0.3px",
            }}>
              {logo}
            </span>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
              {links.map((link) => (
                <button
                  key={link}
                  className="nb-link"
                  onClick={() => handleLink(link)}
                  style={{
                    background: active === link ? alpha(accent, 0.12) : "transparent",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: "9px",
                    fontSize: "14px",
                    fontWeight: active === link ? "700" : "500",
                    color: active === link ? accent : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>

            {/* CTA button */}
            <button
              className="nb-cta"
              onClick={onCtaClick}
              style={{
                padding: isMobile ? "7px 14px" : "9px 20px",
                borderRadius: "10px",
                border: "none",
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.75)})`,
                color: "#fff",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {ctaText}
            </button>

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                className="nb-ham"
                onClick={() => setMenuOpen((o) => !o)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  width: "34px", height: "34px",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "5px", transition: "background 0.2s",
                  flexShrink: 0, padding: 0,
                }}
              >
                <div style={{
                  width: "16px", height: "1.5px",
                  background: "rgba(255,255,255,0.7)", borderRadius: "2px",
                  transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                  transition: "transform 0.25s",
                }} />
                <div style={{
                  width: "16px", height: "1.5px",
                  background: "rgba(255,255,255,0.7)", borderRadius: "2px",
                  opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s",
                }} />
                <div style={{
                  width: "16px", height: "1.5px",
                  background: "rgba(255,255,255,0.7)", borderRadius: "2px",
                  transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                  transition: "transform 0.25s",
                }} />
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {isMobile && menuOpen && (
          <div style={{
            animation: "nbSlideDown 0.2s ease",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 16px 16px",
            display: "flex", flexDirection: "column", gap: "3px",
            background: alpha(bg, 0.98),
          }}>
            {links.map((link) => (
              <button
                key={link}
                className="nb-mlink"
                onClick={() => handleLink(link)}
                style={{
                  background: active === link ? alpha(accent, 0.1) : "transparent",
                  border: "none",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: active === link ? "700" : "500",
                  color: active === link ? accent : "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  width: "100%",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {link}
                {active === link && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={accent} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}

            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />

            <button
              onClick={() => { setMenuOpen(false); onCtaClick(); }}
              style={{
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.75)})`,
                border: "none", padding: "12px", borderRadius: "12px",
                fontSize: "14px", fontWeight: "700", color: "#fff",
                cursor: "pointer", fontFamily: "inherit", width: "100%",
              }}
            >
              {ctaText}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};