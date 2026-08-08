import React, { useEffect, useState } from "react";

export const Loader = ({
  type = "spinner",
  size = 48,
  accent = "#6366f1",
  bg = "transparent",
  label = "",
  speed = 1,
}) => {
  const [dots, setDots] = useState(0);
  const [progress, setProgress] = useState(0);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  useEffect(() => {
    if (type === "dots") {
      const t = setInterval(() => setDots((d) => (d + 1) % 4), 400 / speed);
      return () => clearInterval(t);
    }
    if (type === "bar") {
      const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 2)), 30 / speed);
      return () => clearInterval(t);
    }
  }, [type, speed]);

  const dur = `${1 / speed}s`;

  const wrapStyle = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: bg,
    padding: bg !== "transparent" ? "24px" : "0",
    borderRadius: "16px",
    fontFamily: "system-ui, sans-serif",
  };

  const labelEl = label ? (
    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.3px" }}>
      {label}
    </span>
  ) : null;

  // ── Spinner ──
  if (type === "spinner") return (
    <div style={wrapStyle}>
      <svg width={size} height={size} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none"
          stroke={alpha(accent, 0.15)} strokeWidth="4" />
        <circle cx="24" cy="24" r="20" fill="none"
          stroke={accent} strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 94.2"
          style={{ transformOrigin: "center", animation: `spin ${dur} linear infinite` }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
      {labelEl}
    </div>
  );

  // ── Pulse ──
  if (type === "pulse") return (
    <div style={wrapStyle}>
      <div style={{ position: "relative", width: size, height: size }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: alpha(accent, 0.2),
          animation: `pulse ${dur} ease-out infinite`,
        }} />
        <div style={{
          position: "absolute", inset: "25%", borderRadius: "50%",
          background: accent,
        }} />
        <style>{`@keyframes pulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2);opacity:0} }`}</style>
      </div>
      {labelEl}
    </div>
  );

  // ── Dots ──
  if (type === "dots") return (
    <div style={wrapStyle}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: size / 5, height: size / 5, borderRadius: "50%",
            background: dots === i ? accent : alpha(accent, 0.25),
            transition: "background 0.2s",
          }} />
        ))}
      </div>
      {labelEl}
    </div>
  );

  // ── Bar ──
  if (type === "bar") return (
    <div style={wrapStyle}>
      <div style={{
        width: size * 3, height: size / 8,
        background: alpha(accent, 0.15),
        borderRadius: "99px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: "99px",
          background: accent,
          width: `${progress}%`,
          transition: "width 0.03s linear",
        }} />
      </div>
      {labelEl}
    </div>
  );

  // ── Ring ──
  if (type === "ring") return (
    <div style={wrapStyle}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `4px solid ${alpha(accent, 0.15)}`,
        borderTop: `4px solid ${accent}`,
        borderRight: `4px solid ${accent}`,
        animation: `spin ${dur} linear infinite`,
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {labelEl}
    </div>
  );

  return null;
};