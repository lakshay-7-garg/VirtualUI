import React from "react";

export const ReviewCard = ({
  avatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80",
  name = "John Doe",
  rating = 4,
  review = "This product is fantastic! It exceeded my expectations in every way.",
  date = "2 days ago",
  accent = "#6366f1",
  bg = "#0f172a",
  onProfileClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "16px", padding: "16px", width: "320px", fontFamily: "system-ui,sans-serif", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <img src={avatar} alt={name} onClick={onProfileClick} style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? accent : "rgba(255,255,255,0.15)"} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            ))}
          </div>
        </div>
      </div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: "12px" }}>{review}</div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{date}</div>
    </div>
  );
};