import React, { useState } from "react";

export const ColorPicker = ({
  defaultColor = "#6366f1",
  showOpacity = true,
  showEyedropper = true,
  showInput = true,
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  onChange = () => {},
  swatches = [
    "#6366f1","#8b5cf6","#a855f7","#ec4899","#f43f5e",
    "#ef4444","#f97316","#f59e0b","#eab308","#84cc16",
    "#22c55e","#10b981","#14b8a6","#06b6d4","#3b82f6",
    "#0ea5e9","#64748b","#94a3b8","#ffffff","#000000",
  ],
}) => {
  const [color, setColor] = useState(defaultColor);
  const [hex, setHex]     = useState(defaultColor);
  const [opacity, setOpacity] = useState(100);
  const [inputErr, setInputErr] = useState(false);
  const [copied, setCopied]   = useState(false);

  const alpha = (hexVal, op) => {
    const r = parseInt(hexVal.slice(1,3), 16);
    const g = parseInt(hexVal.slice(3,5), 16);
    const b = parseInt(hexVal.slice(5,7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const isValidHex = (v) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);

  const applyColor = (val) => {
    if (!isValidHex(val)) { setInputErr(true); return; }
    setInputErr(false);
    setColor(val);
    setHex(val);
    onChange({ hex: val, opacity, rgba: alpha(val, opacity / 100) });
  };

  const pickSwatch = (val) => {
    setColor(val);
    setHex(val);
    setInputErr(false);
    onChange({ hex: val, opacity, rgba: alpha(val, opacity / 100) });
  };

  const handleOpacity = (v) => {
    setOpacity(v);
    onChange({ hex: color, opacity: v, rgba: alpha(color, v / 100) });
  };

  const copyHex = () => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Hue gradient for the color strip
  const hueGradient = "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)";

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "20px",
      width: "260px",
      fontFamily: "system-ui, sans-serif",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    }}>

      {/* ── Color preview bar ── */}
      <div style={{
        height: "52px", borderRadius: "12px", marginBottom: "16px",
        background: alpha(color, opacity / 100),
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative", overflow: "hidden",
      }}>
        {/* checkerboard for transparency */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(45deg,#555 25%,transparent 25%),linear-gradient(-45deg,#555 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#555 75%),linear-gradient(-45deg,transparent 75%,#555 75%)",
          backgroundSize: "10px 10px",
          backgroundPosition: "0 0,0 5px,5px -5px,-5px 0",
          opacity: 0.3,
        }} />
        <div style={{ position: "absolute", inset: 0, background: alpha(color, opacity / 100) }} />
      </div>

      {/* ── Hue strip ── */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <input
          type="range" min="0" max="360" defaultValue="240"
          onChange={(e) => {
            const h = e.target.value;
            const c = `hsl(${h},80%,60%)`;
            const el = document.createElement("div");
            el.style.color = c;
            document.body.appendChild(el);
            const rgb = getComputedStyle(el).color;
            document.body.removeChild(el);
            const [r,g,b] = rgb.match(/\d+/g).map(Number);
            const hex6 = "#" + [r,g,b].map(n => n.toString(16).padStart(2,"0")).join("");
            pickSwatch(hex6);
          }}
          style={{
            width: "100%", height: "10px", borderRadius: "5px",
            appearance: "none", WebkitAppearance: "none",
            background: hueGradient, cursor: "pointer", outline: "none", border: "none",
          }}
        />
      </div>

      {/* ── Opacity strip ── */}
      {showOpacity && (
        <div style={{ marginBottom: "16px" }}>
          <input
            type="range" min="0" max="100" value={opacity}
            onChange={(e) => handleOpacity(Number(e.target.value))}
            style={{
              width: "100%", height: "10px", borderRadius: "5px",
              appearance: "none", WebkitAppearance: "none",
              background: `linear-gradient(90deg, transparent, ${color})`,
              cursor: "pointer", outline: "none", border: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>Opacity</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontWeight: "600" }}>{opacity}%</span>
          </div>
        </div>
      )}

      {/* ── Hex input + copy ── */}
      {showInput && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
            background: color, border: "1px solid rgba(255,255,255,0.1)",
          }} />
          <input
            value={hex}
            onChange={(e) => { setHex(e.target.value); setInputErr(false); }}
            onBlur={(e) => applyColor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyColor(hex)}
            placeholder="#000000"
            style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: `1px solid ${inputErr ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "8px", padding: "7px 10px",
              fontSize: "12px", fontFamily: "monospace",
              color: inputErr ? "#f87171" : "#fff",
              outline: "none",
            }}
          />
          <button
            onClick={copyHex}
            title="Copy hex"
            style={{
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: copied ? "#34d399" : "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
            }}
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            )}
          </button>
        </div>
      )}

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "14px" }} />

      {/* ── Swatches ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {swatches.map((s) => (
          <button
            key={s}
            onClick={() => pickSwatch(s)}
            title={s}
            style={{
              width: "22px", height: "22px", borderRadius: "6px",
              background: s, border: `2px solid ${color === s ? "#fff" : "transparent"}`,
              cursor: "pointer", padding: 0, transition: "transform 0.15s, border-color 0.15s",
              outline: "none",
              boxShadow: s === "#ffffff" ? "inset 0 0 0 1px rgba(0,0,0,0.15)" : "none",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        ))}
      </div>

      {/* ── RGBA output ── */}
      <div style={{
        marginTop: "14px", padding: "8px 10px", borderRadius: "8px",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          RGBA
        </span>
        <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>
          {alpha(color, opacity / 100)}
        </span>
      </div>
    </div>
  );
};