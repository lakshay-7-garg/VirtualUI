import React, { useState } from "react";

export const ImageCard = ({
  image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  tag = "Travel",
  title = "Discover the Hidden Peaks of the Himalayas",
  description = "A breathtaking journey through untouched landscapes, ancient monasteries, and snow-capped summits that few have ever seen.",
  buttonText = "Read More",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  onButtonClick = () => {},
}) => {
  const [hovered, setHovered] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: radius,
        overflow: "hidden",
        width: "300px",
        border: `1px solid ${hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"}`,
        fontFamily: "system-ui, sans-serif",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        }} />

        {/* Tag */}
        {tag && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            padding: "4px 10px", borderRadius: "20px",
            background: alpha(accent, 0.85),
            fontSize: "10px", fontWeight: "700",
            color: "#fff", letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}>
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "18px" }}>
        <h3 style={{
          fontSize: "15px", fontWeight: "700",
          color: "#fff", margin: "0 0 8px",
          lineHeight: 1.4,
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.45)",
          lineHeight: 1.65, margin: "0 0 18px",
        }}>
          {description}
        </p>

        <button
          onClick={onButtonClick}
          style={{
            width: "100%", padding: "11px",
            borderRadius: "12px", border: "none",
            background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`,
            color: "#fff", fontSize: "13px", fontWeight: "700",
            cursor: "pointer", fontFamily: "inherit",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};