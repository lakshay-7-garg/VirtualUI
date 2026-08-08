import React, { useState } from "react";

export const Button = ({
  text = "Click Me",
  variant = "gradient", // primary | outline | ghost | gradient
  size = "md", // sm | md | lg
  icon,
  loading = false,
  disabled = false,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  // 🎨 Variants
  const variants = {
    primary: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "#2563eb",
      border: "1px solid #2563eb",
    },
    ghost: {
      background: "transparent",
      color: "#111",
      border: "none",
    },
    gradient: {
      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
      color: "#fff",
      border: "none",
    },
  };

  // 📏 Sizes
  const sizes = {
    sm: { padding: "6px 12px", fontSize: "12px" },
    md: { padding: "10px 18px", fontSize: "14px" },
    lg: { padding: "14px 24px", fontSize: "16px" },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...variants[variant],
        ...sizes[size],

        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: 600,
        fontFamily: "sans-serif",

        // 🔥 Animation
        transform: hovered ? "translateY(-2px) scale(1.02)" : "scale(1)",
        boxShadow: hovered
          ? "0 10px 20px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.1)",

        transition: "all 0.2s ease",
        opacity: disabled ? 0.6 : 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔥 Ripple Effect */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.2)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Content */}
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};