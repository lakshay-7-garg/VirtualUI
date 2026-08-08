import React, { useState, useEffect } from "react";

export const PageLoader = ({
  logo = "VirtualAI",
  accent = "#6366f1",
  bg = "",
  type = "spinner",
  loadingText = "Loading...",
  subText = "",
  duration = 6000,
  onComplete = () => {},
}) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  useEffect(() => {
    const steps = 100;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [duration]);

  if (done) return null;

  return (
    <>
      <style>{`
        @keyframes pl-spin  { to { transform: rotate(360deg); } }
        @keyframes pl-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.15);opacity:0.7} }
        @keyframes pl-dot   { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }
        @keyframes pl-fade  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pl-bar   { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>

      <div style={{
        width: "100%",
        height: "100%",
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        animation: "pl-fade 0.3s ease",
      }}>

        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-100px", left: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(accent, 0.12)}, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-100px",
          width: "350px", height: "350px", borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(accent, 0.08)}, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", animation: "pl-fade 0.4s ease" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "800", color: "#fff",
            animation: type === "pulse" ? `pl-pulse 1.5s ease infinite` : "none",
          }}>
            {logo[0]}
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>
            {logo}
          </span>
        </div>

        {/* ── Spinner ── */}
        {type === "spinner" && (
          <div style={{ position: "relative", width: "56px", height: "56px" }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none"
                stroke={alpha(accent, 0.12)} strokeWidth="4" />
              <circle cx="28" cy="28" r="22" fill="none"
                stroke={accent} strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="34.8 104.4"
                style={{ transformOrigin: "center", animation: "pl-spin 0.9s linear infinite" }} />
            </svg>
            <span style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "700", color: accent,
            }}>
              {Math.round(progress)}%
            </span>
          </div>
        )}

        {/* ── Dots ── */}
        {type === "dots" && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: accent,
                animation: `pl-dot 1.2s ease infinite`,
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}

        {/* ── Pulse ── */}
        {type === "pulse" && (
          <div style={{ position: "relative", width: "56px", height: "56px" }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: alpha(accent, 0.3),
                animation: `pl-pulse 1.5s ease infinite`,
                animationDelay: `${i * 0.4}s`,
              }} />
            ))}
            <div style={{
              position: "absolute", inset: "30%", borderRadius: "50%",
              background: accent,
            }} />
          </div>
        )}

        {/* ── Ring ── */}
        {type === "ring" && (
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            border: `4px solid ${alpha(accent, 0.15)}`,
            borderTop: `4px solid ${accent}`,
            borderRight: `4px solid ${accent}`,
            animation: "pl-spin 0.9s linear infinite",
          }} />
        )}

        {/* ── Progress Bar (default) ── */}
        {type === "bar" && (
          <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{
              width: "100%", height: "4px",
              background: alpha(accent, 0.15),
              borderRadius: "2px", overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: "2px",
                background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)}, ${accent})`,
                backgroundSize: "200% 100%",
                animation: "pl-bar 1.2s linear infinite",
                transition: "width 0.03s linear",
              }} />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "11px", color: "rgba(255,255,255,0.3)",
            }}>
              <span>{loadingText}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            {subText && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)", margin: "4px 0 0", textAlign: "center" }}>
                {subText}
              </p>
            )}
          </div>
        )}

        {/* Loading text for non-bar types */}
        {type !== "bar" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: "0 0 4px" }}>
              {loadingText}
            </p>
            {subText && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)", margin: 0 }}>
                {subText}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};