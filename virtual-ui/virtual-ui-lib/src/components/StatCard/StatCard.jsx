import React, { useEffect, useRef, useState } from "react";

export const StatCard = ({
  title = "Active Users",
  value = "128K",
  numericValue = 128000,
  change = "+12.4%",
  isPositive = true,
  icon = "👥",
  bg = "#ffffff",
  accent = "#3b82f6",
  radius = "16px",
  showBadge = true,
  showIcon = true,
  barPercent = 68,
}) => {
  const [count, setCount]       = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [visible, setVisible]   = useState(false);
  const [entered, setEntered]   = useState(false);
  const ref = useRef(null);

  /* ── Intersection Observer → trigger once on enter ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* ── Count-up animation ── */
  useEffect(() => {
    if (!visible) return;
    setEntered(true);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // ease-out cubic
      setCount(Math.floor(eased * numericValue));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, numericValue]);

  /* ── Bar fill animation ── */
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setBarWidth(barPercent), 200);
    return () => clearTimeout(t);
  }, [visible, barPercent]);

  /* ── Format display number ── */
  const formatCount = (n) => {
    if (numericValue >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (numericValue >= 1_000)     return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString();
  };

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const uid = accent.replace("#", "sc");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .sc-${uid} {
          font-family: 'Sora', sans-serif;
          background: ${bg};
          border-radius: ${radius};
          padding: 24px;
          display: inline-flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          min-width: 200px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease;
        }

        .sc-${uid}.entered {
          opacity: 1;
          transform: translateY(0);
        }

        .sc-${uid}:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 16px 40px ${alpha(accent, 0.18)};
        }

        /* Shimmer sweep on mount */
        .sc-${uid}::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, ${alpha(accent, 0.08)} 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .sc-${uid}.entered::before {
          animation: sc-shimmer-${uid} 0.9s ease 0.3s forwards;
        }
        @keyframes sc-shimmer-${uid} {
          to { transform: translateX(200%); }
        }

        /* Pulse ring on icon */
        .sc-icon-${uid} {
          font-size: 1.3rem;
          background: ${alpha(accent, 0.1)};
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .sc-icon-${uid}::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 14px;
          border: 2px solid ${alpha(accent, 0.25)};
          animation: sc-pulse-${uid} 2s ease-in-out infinite;
        }
        @keyframes sc-pulse-${uid} {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.12); opacity: 0; }
        }

        .sc-top-${uid} {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sc-badge-up-${uid} {
          font-size: 0.72rem;
          font-weight: 700;
          color: #16a34a;
          background: #dcfce7;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.02em;
          animation: sc-badgepop-${uid} 0.4s cubic-bezier(.34,1.56,.64,1) 0.6s both;
        }
        .sc-badge-down-${uid} {
          font-size: 0.72rem;
          font-weight: 700;
          color: #dc2626;
          background: #fee2e2;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.02em;
          animation: sc-badgepop-${uid} 0.4s cubic-bezier(.34,1.56,.64,1) 0.6s both;
        }
        @keyframes sc-badgepop-${uid} {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .sc-value-${uid} {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .sc-label-${uid} {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .sc-track-${uid} {
          height: 5px;
          border-radius: 999px;
          background: rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .sc-fill-${uid} {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, ${alpha(accent, 0.5)}, ${accent});
          width: 0%;
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
          box-shadow: 0 0 8px ${alpha(accent, 0.5)};
        }
      `}</style>

      <div
        ref={ref}
        className={`sc-${uid}${entered ? " entered" : ""}`}
      >
        {/* Top row */}
        <div className={`sc-top-${uid}`}>
          {showIcon && <div className={`sc-icon-${uid}`}>{icon}</div>}
          {showBadge && (
            <span className={isPositive ? `sc-badge-up-${uid}` : `sc-badge-down-${uid}`}>
              {isPositive ? "▲" : "▼"} {change}
            </span>
          )}
        </div>

        {/* Count-up value */}
        <div className={`sc-value-${uid}`}>
          {visible ? formatCount(count) : "0"}
        </div>

        {/* Label */}
        <div className={`sc-label-${uid}`}>{title}</div>

        {/* Animated bar */}
        <div className={`sc-track-${uid}`}>
          <div
            className={`sc-fill-${uid}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
    </>
  );
};