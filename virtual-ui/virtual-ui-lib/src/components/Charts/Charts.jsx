import React, { useState } from "react";

export const Charts = ({
  type = "bar",
  data = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 70 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 90 },
    { label: "May", value: 65 },
    { label: "Jun", value: 80 },
    { label: "Jul", value: 100 },
{ label: "Aug", value: 30 }
  ],
  title = "Monthly Stats",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  showGrid = true,
  showValues = true,
}) => {
  const [hovered, setHovered] = useState(null);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const W = 320;
  const H = 160;
  const padL = 28;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const getX = (i) => padL + (i / (data.length - 1)) * chartW;
  const getY = (v) => padT + chartH - ((v - min) / (max - min || 1)) * chartH;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");
  const areaPoints = `${padL},${padT + chartH} ` + points + ` ${getX(data.length - 1)},${padT + chartH}`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    val: Math.round(min + t * (max - min)),
  }));

  // ── Bar Chart ──
  const BarChart = () => {
    const barW = Math.min(28, (chartW / data.length) * 0.55);
    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {showGrid && gridLines.map((g, i) => (
          <g key={i}>
            <line x1={padL} y1={g.y} x2={W - padR} y2={g.y}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x={padL - 4} y={g.y + 4} textAnchor="end"
              fill="rgba(255,255,255,0.25)" fontSize="9">{g.val}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = padL + (i / data.length) * chartW + (chartW / data.length - barW) / 2;
          const barH = ((d.value - min) / (max - min || 1)) * chartH;
          const y = padT + chartH - barH;
          const isH = hovered === i;
          return (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <rect x={x} y={padT} width={barW} height={chartH}
                fill="transparent" rx="4" />
              <rect x={x} y={y} width={barW} height={barH}
                fill={isH ? accent : alpha(accent, 0.55)}
                rx="4" style={{ transition: "fill 0.15s" }} />
              {showValues && isH && (
                <text x={x + barW / 2} y={y - 5} textAnchor="middle"
                  fill="#fff" fontSize="9" fontWeight="700">{d.value}</text>
              )}
              <text x={x + barW / 2} y={H - 6} textAnchor="middle"
                fill="rgba(255,255,255,0.3)" fontSize="9">{d.label}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  // ── Line Chart ──
  const LineChart = () => (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showGrid && gridLines.map((g, i) => (
        <g key={i}>
          <line x1={padL} y1={g.y} x2={W - padR} y2={g.y}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={padL - 4} y={g.y + 4} textAnchor="end"
            fill="rgba(255,255,255,0.25)" fontSize="9">{g.val}</text>
        </g>
      ))}
      <polygon points={areaPoints} fill="url(#lg)" />
      <polyline points={points} fill="none" stroke={accent} strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const isH = hovered === i;
        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle cx={getX(i)} cy={getY(d.value)} r="10" fill="transparent" />
            <circle cx={getX(i)} cy={getY(d.value)}
              r={isH ? 5 : 3}
              fill={isH ? "#fff" : accent}
              stroke={accent} strokeWidth="2"
              style={{ transition: "all 0.15s" }} />
            {showValues && isH && (
              <text x={getX(i)} y={getY(d.value) - 10} textAnchor="middle"
                fill="#fff" fontSize="9" fontWeight="700">{d.value}</text>
            )}
            <text x={getX(i)} y={H - 6} textAnchor="middle"
              fill="rgba(255,255,255,0.3)" fontSize="9">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );

  // ── Pie Chart ──
  const PieChart = () => {
    const cx = W / 2, cy = H / 2 - 4, r = Math.min(H, W) / 2 - 24;
    const total = data.reduce((s, d) => s + d.value, 0);
    const colors = [accent, alpha(accent, 0.75), alpha(accent, 0.55),
      alpha(accent, 0.4), alpha(accent, 0.3), alpha(accent, 0.2), alpha(accent, 0.12)];
    let startAngle = -Math.PI / 2;
    const slices = data.map((d, i) => {
      const angle = (d.value / total) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(startAngle + angle);
      const y2 = cy + r * Math.sin(startAngle + angle);
      const lx = cx + (r + 14) * Math.cos(startAngle + angle / 2);
      const ly = cy + (r + 14) * Math.sin(startAngle + angle / 2);
      const large = angle > Math.PI ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
      const slice = { path, color: colors[i % colors.length], d, angle, lx, ly, i };
      startAngle += angle;
      return slice;
    });

    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {slices.map((s) => (
          <g key={s.i} onMouseEnter={() => setHovered(s.i)} onMouseLeave={() => setHovered(null)}>
            <path d={s.path} fill={s.color}
              stroke={bg} strokeWidth="2"
              transform={hovered === s.i ? `translate(${Math.cos(s.angle / 2 - Math.PI / 2) * 4}, ${Math.sin(s.angle / 2 - Math.PI / 2) * 4})` : ""}
              style={{ transition: "transform 0.15s", cursor: "pointer" }} />
          </g>
        ))}
        {hovered !== null && (
          <>
            <text x={cx} y={cy - 8} textAnchor="middle"
              fill="#fff" fontSize="16" fontWeight="800">
              {data[hovered]?.value}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle"
              fill="rgba(255,255,255,0.4)" fontSize="9">
              {data[hovered]?.label}
            </text>
          </>
        )}
        {hovered === null && (
          <text x={cx} y={cy + 5} textAnchor="middle"
            fill="rgba(255,255,255,0.2)" fontSize="9">Hover slice</text>
        )}
      </svg>
    );
  };

  // ── Area Chart ──
  const AreaChart = () => (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {showGrid && gridLines.map((g, i) => (
        <g key={i}>
          <line x1={padL} y1={g.y} x2={W - padR} y2={g.y}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={padL - 4} y={g.y + 4} textAnchor="end"
            fill="rgba(255,255,255,0.25)" fontSize="9">{g.val}</text>
        </g>
      ))}
      <polygon points={areaPoints} fill="url(#ag)" />
      <polyline points={points} fill="none" stroke={accent}
        strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
          <rect x={getX(i) - 12} y={padT} width={24} height={chartH} fill="transparent" />
          {hovered === i && (
            <>
              <line x1={getX(i)} y1={padT} x2={getX(i)} y2={padT + chartH}
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
              {showValues && (
                <text x={getX(i)} y={getY(d.value) - 10} textAnchor="middle"
                  fill="#fff" fontSize="9" fontWeight="700">{d.value}</text>
              )}
            </>
          )}
          <text x={getX(i)} y={H - 6} textAnchor="middle"
            fill="rgba(255,255,255,0.3)" fontSize="9">{d.label}</text>
        </g>
      ))}
    </svg>
  );

  const renderChart = () => {
    if (type === "line") return <LineChart />;
    if (type === "pie")  return <PieChart />;
    if (type === "area") return <AreaChart />;
    return <BarChart />;
  };

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "20px",
      fontFamily: "system-ui, sans-serif",
      border: "1px solid rgba(255,255,255,0.07)",
      width: "100%",
      maxWidth: "360px",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#fff", margin: 0 }}>{title}</p>
        <span style={{
          fontSize: "10px", fontWeight: "700", padding: "3px 9px", borderRadius: "6px",
          background: alpha(accent, 0.12), color: accent, border: `1px solid ${alpha(accent, 0.25)}`,
          textTransform: "capitalize",
        }}>
          {type}
        </span>
      </div>
      {renderChart()}
    </div>
  );
};