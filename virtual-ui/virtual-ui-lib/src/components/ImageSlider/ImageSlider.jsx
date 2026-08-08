import React, { useState } from "react";

export const ImageSlider = ({
  images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      title: "Hidden Peaks of Himalayas",
      tag: "Travel",
    },
    {
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      title: "City Lights at Night",
      tag: "Urban",
    },
    {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      title: "Tropical Beach Paradise",
      tag: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      title: "Starry Mountain Night",
      tag: "Adventure",
    },
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  showDots = true,
  showCaption = true,
  autoPlay = false,
}) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(null);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const prev = () => {
    setDir("left");
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const next = () => {
    setDir("right");
    setCurrent((c) => (c + 1) % images.length);
  };

  const goTo = (i) => {
    setDir(i > current ? "right" : "left");
    setCurrent(i);
  };

  const img = images[current];

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      overflow: "hidden",
      width: "300px",
      border: "1px solid rgba(255,255,255,0.07)",
      fontFamily: "system-ui, sans-serif",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    }}>

      {/* Image area */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden", background: "#000" }}>
        <img
          key={current}
          src={img.src}
          alt={img.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            animation: `sliderFade 0.35s ease`,
          }}
        />
        <style>{`@keyframes sliderFade { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }`}</style>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
        }} />

        {/* Tag */}
        {img.tag && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            padding: "4px 10px", borderRadius: "20px",
            background: alpha(accent, 0.85),
            fontSize: "10px", fontWeight: "700",
            color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase",
          }}>
            {img.tag}
          </div>
        )}

        {/* Counter */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          padding: "4px 10px", borderRadius: "20px",
          background: "rgba(0,0,0,0.5)",
          fontSize: "10px", fontWeight: "600", color: "rgba(255,255,255,0.7)",
        }}>
          {current + 1} / {images.length}
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          style={{
            position: "absolute", left: "10px", top: "50%",
            transform: "translateY(-50%)",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
            padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = alpha(accent, 0.8)}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          style={{
            position: "absolute", right: "10px", top: "50%",
            transform: "translateY(-50%)",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
            padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = alpha(accent, 0.8)}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      {showCaption && (
        <div style={{ padding: "14px 16px 4px" }}>
          <p style={{
            fontSize: "14px", fontWeight: "700", color: "#fff",
            margin: 0, lineHeight: 1.4,
            animation: "sliderFade 0.3s ease",
          }}
            key={current + "-title"}
          >
            {img.title}
          </p>
        </div>
      )}

      {/* Dots */}
      {showDots && (
        <div style={{
          display: "flex", justifyContent: "center",
          gap: "6px", padding: "12px 16px 16px",
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === current ? accent : "rgba(255,255,255,0.2)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};