import React, { useState } from "react";

export const RatingStars = ({
  defaultRating = 0,
  total = 5,
  size = 32,
  allowHalf = true,
  showLabel = true,
  showCount = true,
  reviewCount = 0,
  readOnly = false,
  accent = "#f59e0b",
  bg = "#0f172a",
  radius = "14px",
  onChange = () => {},
}) => {
  const [rating, setRating]   = useState(defaultRating);
  const [hovered, setHovered] = useState(0);

  const labels = ["", "Terrible", "Bad", "Okay", "Good", "Excellent"];
  const halfLabels = { 0.5:"Awful", 1:"Terrible", 1.5:"Very Bad", 2:"Bad", 2.5:"Below Average", 3:"Okay", 3.5:"Above Average", 4:"Good", 4.5:"Great", 5:"Excellent" };

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const active = hovered || rating;

  const handleMouseMove = (e, i) => {
    if (readOnly) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      setHovered(half ? i - 0.5 : i);
    } else {
      setHovered(i);
    }
  };

  const handleClick = (e, i) => {
    if (readOnly) return;
    let val;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      val = e.clientX - rect.left < rect.width / 2 ? i - 0.5 : i;
    } else {
      val = i;
    }
    setRating(val);
    onChange(val);
  };

  const StarIcon = ({ index }) => {
    const fill = active >= index ? "full" : active >= index - 0.5 ? "half" : "empty";
    const id = `half-${index}`;

    return (
      <svg
        width={size} height={size} viewBox="0 0 24 24"
        style={{ cursor: readOnly ? "default" : "pointer", transition: "transform 0.1s", flexShrink: 0 }}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={() => !readOnly && setHovered(0)}
        onClick={(e) => handleClick(e, index)}
        onMouseEnter={(e) => { if (!readOnly) e.currentTarget.style.transform = "scale(1.15)"; }}
      >
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor={accent} />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={
            fill === "full"  ? accent :
            fill === "half"  ? `url(#${id})` :
            "transparent"
          }
          stroke={fill === "empty" ? "rgba(255,255,255,0.15)" : accent}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "20px 22px",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      fontFamily: "system-ui, sans-serif",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    }}>

      {/* Stars row */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {Array.from({ length: total }, (_, i) => (
          <StarIcon key={i + 1} index={i + 1} />
        ))}
      </div>

      {/* Label */}
      {showLabel && (
        <div style={{
          fontSize: "14px", fontWeight: "700", minHeight: "20px",
          color: active > 0 ? accent : "rgba(255,255,255,0.2)",
          transition: "color 0.2s",
        }}>
          {active > 0
            ? (allowHalf ? halfLabels[active] : labels[Math.round(active)])
            : (readOnly ? "Not rated" : "Rate this")}
        </div>
      )}

      {/* Score + count */}
      {(rating > 0 || readOnly) && showCount && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "28px", fontWeight: "800", color: "#fff", lineHeight: 1,
          }}>
            {rating.toFixed(1)}
          </span>
          <div>
            <div style={{ display: "flex", gap: "1px", marginBottom: "3px" }}>
              {Array.from({ length: total }, (_, i) => {
                const fill = rating >= i + 1 ? "full" : rating >= i + 0.5 ? "half" : "empty";
                const gid = `sm-${i}`;
                return (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id={gid}>
                        <stop offset="50%" stopColor={accent}/>
                        <stop offset="50%" stopColor="transparent"/>
                      </linearGradient>
                    </defs>
                    <polygon
                      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                      fill={fill === "full" ? accent : fill === "half" ? `url(#${gid})` : "transparent"}
                      stroke={fill === "empty" ? "rgba(255,255,255,0.15)" : accent}
                      strokeWidth="1.5"
                    />
                  </svg>
                );
              })}
            </div>
            {reviewCount > 0 && (
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                {reviewCount.toLocaleString()} reviews
              </span>
            )}
          </div>
        </div>
      )}

      {/* Prompt when not rated */}
      {!readOnly && rating === 0 && (
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
          {allowHalf ? "Hover to rate • Half stars supported" : "Click to rate"}
        </p>
      )}
    </div>
  );
};