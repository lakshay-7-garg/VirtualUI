import React, { useState } from "react";

export const Card = ({
  title = "Performance",
  description = "Real-time metrics with live dashboard updates every second.",
  icon = "⚡",
  tag = "Active",
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "#00000033" : "#0000001a"}`,
        borderRadius: "12px",
        padding: "1.25rem",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        width: "260px",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px", background: "#1D9E75",
        borderRadius: "12px 12px 0 0",
      }} />
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: "#E1F5EE",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 14,
      }}>
        {icon}
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{title}</p>
      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: "0 0 16px" }}>{description}</p>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "0.5px solid #0000001a", paddingTop: 12,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 500, padding: "3px 9px",
          borderRadius: 20, background: "#E1F5EE", color: "#0F6E56",
        }}>{tag}</span>
        <span style={{
          fontSize: 14, color: "#999", display: "inline-block",
          transition: "transform 0.2s",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }}>→</span>
      </div>
    </div>
  );
};