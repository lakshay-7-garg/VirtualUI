import React, { useState } from "react";

export const AvatarCard = ({
  name = "Aryan Sharma",
  role = "Frontend Developer",
  followers = 2400,
  following = 180,
  projects = 34,
  bio = "Building beautiful UIs one component at a time.",
  avatar = "",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
}) => {
  const [followed, setFollowed] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    { label: "Followers", value: followed ? followers + 1 : followers },
    { label: "Following", value: following },
    { label: "Projects",  value: projects },
  ];

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "24px 20px",
      width: "280px",
      color: "#fff",
      fontFamily: "system-ui, sans-serif",
      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.08)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.3)})`,
      }} />

      {/* Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: avatar ? `url(${avatar}) center/cover` : `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.5)})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", fontWeight: "800", color: "#fff",
          border: `3px solid ${alpha(accent, 0.4)}`,
          marginBottom: "12px",
        }}>
          {!avatar && initials}
        </div>

        <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "3px" }}>{name}</div>
        <div style={{
          fontSize: "12px", fontWeight: "600",
          color: accent, background: alpha(accent, 0.12),
          padding: "2px 10px", borderRadius: "20px",
          border: `1px solid ${alpha(accent, 0.3)}`,
        }}>
          {role}
        </div>
      </div>

      {/* Bio */}
      <p style={{
        fontSize: "12px", color: "rgba(255,255,255,0.45)",
        textAlign: "center", lineHeight: 1.6,
        marginBottom: "18px", padding: "0 4px",
      }}>
        {bio}
      </p>

      {/* Stats */}
      <div style={{
        display: "flex", justifyContent: "space-around",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px", padding: "12px 8px",
        marginBottom: "16px",
      }}>
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "800" }}>
              {s.value >= 1000 ? (s.value / 1000).toFixed(1) + "k" : s.value}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};