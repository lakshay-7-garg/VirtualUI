import React, { useState, useEffect, useCallback } from "react";

export const BackgoundImageSlider = ({
  images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      tag: "Travel",
      title: "Hidden Peaks of the Himalayas",
      description: "A breathtaking journey through untouched landscapes and ancient monasteries.",
    },
    {
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80",
      tag: "Urban",
      title: "City Lights at Night",
      description: "Explore the vibrant energy of the world's most iconic skylines after dark.",
    },
    {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80",
      tag: "Nature",
      title: "Tropical Beach Paradise",
      description: "Crystal clear waters and white sand beaches that feel like the edge of the world.",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80",
      tag: "Adventure",
      title: "Starry Mountain Night",
      description: "Where silence meets the cosmos — a night sky like you've never seen before.",
    },
  ],
  width = "100%",
  height = "520px",
  accent = "#6366f1",
  radius = "0px",
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 4000,
}) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const go = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((index + images.length) % images.length);
    setTimeout(() => setAnimating(false), 400);
  }, [animating, images.length]);

  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => go(current + 1), autoPlayInterval);
    return () => clearInterval(t);
  }, [autoPlay, autoPlayInterval, current, go]);

  const img = images[current];

  return (
    <>
      <style>{`
        @keyframes hs-fade { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
        @keyframes hs-up   { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .hs-prev:hover, .hs-next:hover { background: rgba(0,0,0,0.65) !important; border-color: rgba(255,255,255,0.35) !important; }
      `}</style>

      <div style={{
        position: "relative",
        width: width,
        height: height,
        borderRadius: radius,
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        userSelect: "none",
      }}>

        {/* ── Image ── */}
        <img
          key={current}
          src={img.src}
          alt={img.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            animation: "hs-fade 0.4s ease",
          }}
        />

        {/* ── Gradient overlay ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
        }} />

        {/* ── Tag ── */}
        {img.tag && (
          <div
            key={current + "-tag"}
            style={{
              position: "absolute", top: "24px", left: "28px",
              padding: "5px 14px", borderRadius: "20px",
              background: alpha(accent, 0.85),
              fontSize: "11px", fontWeight: "700",
              color: "#fff", letterSpacing: "0.6px", textTransform: "uppercase",
              animation: "hs-up 0.4s ease",
            }}
          >
            {img.tag}
          </div>
        )}

        {/* ── Counter ── */}
        <div style={{
          position: "absolute", top: "24px", right: "28px",
          padding: "5px 12px", borderRadius: "20px",
          background: "rgba(0,0,0,0.45)",
          fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.7)",
        }}>
          {current + 1} / {images.length}
        </div>

        {/* ── Prev button ── */}
        <button
          className="hs-prev"
          onClick={prev}
          style={{
            position: "absolute", left: "20px", top: "50%",
            transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", padding: 0, zIndex: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* ── Next button ── */}
        <button
          className="hs-next"
          onClick={next}
          style={{
            position: "absolute", right: "20px", top: "50%",
            transform: "translateY(-50%)",
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", padding: 0, zIndex: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* ── Title + Description (absolute bottom) ── */}
        <div style={{
          position: "absolute", bottom: showDots ? "56px" : "28px",
          left: "28px", right: "28px",
          zIndex: 5,
        }}>
          <h2
            key={current + "-title"}
            style={{
              fontSize: "clamp(20px, 4vw, 36px)",
              fontWeight: "800", color: "#fff",
              margin: "0 0 8px", lineHeight: 1.25,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              animation: "hs-up 0.45s ease",
              maxWidth: "600px",
            }}
          >
            {img.title}
          </h2>
          <p
            key={current + "-desc"}
            style={{
              fontSize: "clamp(13px, 2vw, 15px)",
              color: "rgba(255,255,255,0.7)",
              margin: 0, lineHeight: 1.6,
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              animation: "hs-up 0.5s ease",
              maxWidth: "500px",
            }}
          >
            {img.description}
          </p>
        </div>

        {/* ── Dots ── */}
        {showDots && (
          <div style={{
            position: "absolute", bottom: "20px", left: 0, right: 0,
            display: "flex", justifyContent: "center",
            gap: "6px", zIndex: 5,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === current ? "24px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  border: "none", padding: 0, cursor: "pointer",
                  background: i === current ? accent : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};