import React, { useState } from "react";

export const AnimatedButton = ({
  text = "Click Me!",
  bg = "#7c3aed",
  color = "white",
  size = "md",
  width = "auto",
  radius = "12px",
  border = "none",
  weight = "600",
  shadow = "0 4px 14px rgba(124,58,237,0.4)",
  onClick
}) => {
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#6b21a8" : bg,
        color: color,
        padding: sizes[size],
        width: width,
        border: border,
        borderRadius: radius,
        cursor: "pointer",
        fontWeight: weight,
        fontSize: "15px",
        boxShadow: shadow,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease, background 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        letterSpacing: "0.02em"
      }}
    >
      {text}
    </button>
  );
};