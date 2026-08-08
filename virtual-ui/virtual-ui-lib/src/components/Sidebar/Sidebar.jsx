import React, { useState } from "react";

export const Sidebar = ({
  logo = "VirtualAI",
  accent = "#6366f1",
  bg = "#0f172a",
  items = [
    {
      label: "Dashboard",
      icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
      component: (
        <div style={{ padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Dashboard</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Welcome to your dashboard overview.</p>
        </div>
      ),
    },
    {
      label: "Analytics",
      icon: "M18 20V10M12 20V4M6 20v-6",
      component: (
        <div style={{ padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Analytics</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>View your stats and performance here.</p>
        </div>
      ),
    },
    {
      label: "Users",
      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
      component: (
        <div style={{ padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Users</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Manage your users and permissions.</p>
        </div>
      ),
    },
    {
      label: "Settings",
      icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
      component: (
        <div style={{ padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Settings</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Configure your preferences here.</p>
        </div>
      ),
    },
  ],
}) => {
  const [active, setActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const activeItem = items[active];

  return (
    <div style={{
      display: "flex",
      height: "480px",
      fontFamily: "system-ui, sans-serif",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.07)",
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: collapsed ? "60px" : "200px",
        background: bg,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        flexShrink: 0,
        overflow: "hidden",
      }}>

        {/* Logo */}
        <div style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: collapsed ? "0 14px" : "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: "800", color: "#fff",
          }}>
            {logo[0]}
          </div>
          {!collapsed && (
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#fff", whiteSpace: "nowrap" }}>
              {logo}
            </span>
          )}
        </div>

        {/* Nav buttons */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: "3px", overflowY: "auto" }}>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: collapsed ? "9px 0" : "9px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                width: "100%",
                background: active === i ? alpha(accent, 0.12) : "transparent",
                color: active === i ? accent : "rgba(255,255,255,0.45)",
                borderLeft: active === i ? `2px solid ${accent}` : "2px solid transparent",
              }}
              onMouseEnter={e => {
                if (active !== i) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseLeave={e => {
                if (active !== i) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0 }}>
                <path d={item.icon} />
              </svg>
              {!collapsed && (
                <span style={{ fontSize: "13px", fontWeight: active === i ? "700" : "500", whiteSpace: "nowrap" }}>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              width: "100%", padding: "8px",
              borderRadius: "9px", border: "none",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.3)", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{
        flex: 1,
        background: "rgba(255,255,255,0.02)",
        overflow: "auto",
      }}>

        {/* Content topbar */}
        <div style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          gap: "10px",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: accent,
          }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>
            {activeItem?.label}
          </span>
        </div>

        {/* Rendered component */}
        <div style={{ color: "#fff" }}>
          {activeItem?.component}
        </div>
      </div>
    </div>
  );
};