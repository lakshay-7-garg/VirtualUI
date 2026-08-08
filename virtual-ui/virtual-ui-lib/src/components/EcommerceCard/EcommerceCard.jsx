import React, { useState } from "react";

export const EcommerceCard = ({
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  title = "Wireless Headphones",
  description = "Premium noise-cancelling headphones with 40 hours battery life.",
  price = 199,
  currency = "$",
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onViewDetails = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        overflow: "hidden",
        width: "300px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
      </div>
      <div style={{ padding: "18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 8px", lineHeight: 1.4 }}>{title}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 18px" }}>{description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <span style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>{currency}{price}</span>
          <button
            onClick={onAddToCart}
            style={{ padding: "8px 16px", borderRadius: "12px", border: "none", background: accent, color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
          >Add to Cart</button>
        </div>
        <button
          onClick={onViewDetails}
          style={{ width: "100%", padding: "11px", borderRadius: "12px", border: "1px solid " + alpha(accent, 0.3), background: "transparent", color: accent, fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
        >View Details</button>
      </div>
    </div>
  );
};