import React, { useState, useEffect } from "react";

export const NotificationToast = ({
  title = "New Message",
  message = "You have a new notification from the team.",
  type = "success",
  duration = 3000,
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "14px",
  showProgress = true,
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const typeColors = {
    success: "#10b981",
    error:   "#ef4444",
    warning: "#f59e0b",
    info:    "#3b82f6",
  };

  const typeIcons = {
    success: "M5 13l4 4L19 7",
    error:   "M6 18L18 6M6 6l12 12",
    warning: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    info:    "M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z",
  };

  const color = typeColors[type] || accent;

  useEffect(() => {
    if (!showProgress) return;
    const step = 100 / (duration / 50);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) { clearInterval(timer); setVisible(false); return 0; }
        return p - step;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [duration, showProgress]);

  if (!visible) return null;

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "16px 18px",
      width: "320px",
      color: "white",
      fontFamily: "system-ui, sans-serif",
      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      border: `1px solid rgba(255,255,255,0.08)`,
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>

        {/* Icon */}
        <div style={{
          width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
          background: `${color}22`, border: `1px solid ${color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={typeIcons[type] || typeIcons.info} />
          </svg>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "3px" }}>
            {title}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
            {message}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.3)", padding: "2px", flexShrink: 0,
            lineHeight: 1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "3px", background: "rgba(255,255,255,0.07)",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: color, transition: "width 0.05s linear",
            borderRadius: "0 2px 2px 0",
          }} />
        </div>
      )}
    </div>
  );
};