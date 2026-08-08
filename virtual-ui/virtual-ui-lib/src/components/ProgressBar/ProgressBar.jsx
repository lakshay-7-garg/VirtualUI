import React, { useEffect, useRef, useState } from "react";

/**
 * ProgressBar — type prop se style change hota hai
 * type: "default" | "striped" | "circular" | "gradient" | "steps"
 */
export const ProgressBar = ({
  label       = "Progress",
  percentage  = 75,
  accent      = "#6366f1",
  bg          = "#ffffff",
  height      = 12,
  showLabel   = true,
  showPercent = true,
  type        = "default",   // "default" | "striped" | "circular" | "gradient" | "steps"
  steps       = 5,           // only for type="steps"
}) => {
  const [filled,  setFilled]  = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* ── Intersection Observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ── Count-up on visible ── */
  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const start    = performance.now();
    const target   = Math.min(100, Math.max(0, percentage));
    const tick     = (now) => {
      const p      = Math.min((now - start) / duration, 1);
      const eased  = 1 - Math.pow(1 - p, 4);
      setFilled(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, percentage]);

  /* ── helpers ── */
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const uid = (accent+label+type).replace(/[^a-z0-9]/gi,"x");

  const badgeColor = filled>=80 ? "#16a34a" : filled>=50 ? "#d97706" : "#dc2626";
  const badgeBg    = filled>=80 ? "#dcfce7" : filled>=50 ? "#fef3c7" : "#fee2e2";

  /* ════════════════════════════════════
     RENDER per type
  ════════════════════════════════════ */

  const wrapStyle = {
    fontFamily : "'Sora', sans-serif",
    background : bg,
    borderRadius: "14px",
    padding    : "20px 22px",
    display    : "flex",
    flexDirection: "column",
    gap        : "10px",
    border     : "1px solid rgba(0,0,0,0.07)",
    boxShadow  : "0 2px 12px rgba(0,0,0,0.05)",
    opacity    : visible ? 1 : 0,
    transform  : visible ? "translateY(0)" : "translateY(16px)",
    transition : "opacity 0.45s ease, transform 0.45s ease",
  };

  const rowStyle = { display:"flex", justifyContent:"space-between", alignItems:"center" };

  const labelEl = showLabel && (
    <span style={{fontSize:"0.85rem",fontWeight:600,color:"#334155"}}>{label}</span>
  );

  const badgeEl = showPercent && (
    <span style={{fontSize:"0.72rem",fontWeight:700,color:badgeColor,background:badgeBg,
      padding:"3px 10px",borderRadius:"999px",transition:"color 0.4s,background 0.4s",
      fontVariantNumeric:"tabular-nums"}}>
      {filled}%
    </span>
  );

  /* ── 1. DEFAULT ── */
  if (type === "default") return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        @keyframes pb-pulse-${uid} {
          0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
          50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
        }
      `}</style>
      <div ref={ref} style={wrapStyle}>
        <div style={rowStyle}>{labelEl}{badgeEl}</div>
        <div style={{width:"100%",height:height,borderRadius:"999px",background:"#f1f5f9",overflow:"hidden",position:"relative"}}>
          <div style={{height:"100%",width:`${filled}%`,borderRadius:"999px",
            background:`linear-gradient(90deg,${alpha(accent,.7)},${accent})`,
            boxShadow:`0 0 10px ${alpha(accent,.35)}`,position:"relative",transition:"width 0.05s linear"}}>
            <div style={{position:"absolute",right:0,top:"50%",width:height+4,height:height+4,
              borderRadius:"50%",background:accent,boxShadow:`0 0 8px 2px ${alpha(accent,.5)}`,
              animation:`pb-pulse-${uid} 1.5s ease-in-out infinite`}} />
          </div>
        </div>
        <div style={rowStyle}>
          <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled < 100 ? `${filled} of 100 completed` : "Completed ✓"}</span>
          <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled>=80?"Almost there!":filled>=50?"Halfway done":"Just started"}</span>
        </div>
      </div>
    </>
  );

  /* ── 2. STRIPED ── */
  if (type === "striped") return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        @keyframes pb-stripe-${uid} { from{background-position:0 0} to{background-position:32px 0} }
        @keyframes pb-pulse-${uid} {
          0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
          50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
        }
      `}</style>
      <div ref={ref} style={wrapStyle}>
        <div style={rowStyle}>{labelEl}{badgeEl}</div>
        <div style={{width:"100%",height:height,borderRadius:"999px",background:"#f1f5f9",overflow:"hidden",position:"relative"}}>
          <div style={{height:"100%",width:`${filled}%`,borderRadius:"999px",
            background:`linear-gradient(90deg,${alpha(accent,.7)},${accent})`,
            boxShadow:`0 0 10px ${alpha(accent,.35)}`,position:"relative",transition:"width 0.05s linear"}}>
            {/* stripe overlay */}
            <div style={{position:"absolute",inset:0,borderRadius:"999px",
              background:"repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,0.18) 8px,rgba(255,255,255,0.18) 16px)",
              animation:`pb-stripe-${uid} 0.7s linear infinite`}} />
            <div style={{position:"absolute",right:0,top:"50%",width:height+4,height:height+4,
              borderRadius:"50%",background:accent,boxShadow:`0 0 8px 2px ${alpha(accent,.5)}`,
              animation:`pb-pulse-${uid} 1.5s ease-in-out infinite`}} />
          </div>
        </div>
        <div style={rowStyle}>
          <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled < 100 ? `${filled} of 100 completed` : "Completed ✓"}</span>
          <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled>=80?"Almost there!":filled>=50?"Halfway done":"Just started"}</span>
        </div>
      </div>
    </>
  );

  /* ── 3. CIRCULAR ── */
  if (type === "circular") {
    const r   = 54;
    const cx  = 70;
    const cy  = 70;
    const circ = 2 * Math.PI * r;
    const offset = circ - (filled / 100) * circ;
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
          @keyframes pb-spin-${uid} { from{stroke-dashoffset:${circ}} to{stroke-dashoffset:${offset}} }
        `}</style>
        <div ref={ref} style={{...wrapStyle, alignItems:"center", gap:16}}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* track */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="10"/>
            {/* fill */}
            <circle cx={cx} cy={cy} r={r} fill="none"
              stroke={accent} strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{transition:"stroke-dashoffset 0.05s linear",filter:`drop-shadow(0 0 6px ${alpha(accent,.5)})`}}
            />
            {/* center text */}
            <text x={cx} y={cy-8} textAnchor="middle" dominantBaseline="middle"
              style={{fontFamily:"'Sora',sans-serif",fontSize:"1.5rem",fontWeight:800,fill:"#0f172a"}}>
              {filled}%
            </text>
            <text x={cx} y={cy+14} textAnchor="middle" dominantBaseline="middle"
              style={{fontFamily:"'Sora',sans-serif",fontSize:"0.68rem",fontWeight:600,fill:"#94a3b8",letterSpacing:"0.05em"}}>
              {filled>=80?"GREAT":filled>=50?"GOOD":"LOW"}
            </text>
          </svg>
          {showLabel && <span style={{fontSize:"0.85rem",fontWeight:600,color:"#334155"}}>{label}</span>}
        </div>
      </>
    );
  }

  /* ── 4. GRADIENT ── */
  if (type === "gradient") {
    const colors = ["#ef4444","#f97316","#eab308","#22c55e","#6366f1"];
    const gradStr = colors.map((c,i)=>`${c} ${i*25}%`).join(",");
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
          @keyframes pb-pulse-${uid} {
            0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
            50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
          }
        `}</style>
        <div ref={ref} style={wrapStyle}>
          <div style={rowStyle}>{labelEl}{badgeEl}</div>
          <div style={{width:"100%",height:height,borderRadius:"999px",background:"#f1f5f9",overflow:"hidden",position:"relative"}}>
            {/* full rainbow track (dimmed) */}
            <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,${gradStr})`,opacity:0.15}} />
            {/* active fill */}
            <div style={{height:"100%",width:`${filled}%`,borderRadius:"999px",
              background:`linear-gradient(90deg,${gradStr})`,
              transition:"width 0.05s linear",position:"relative"}}>
              <div style={{position:"absolute",right:0,top:"50%",width:height+4,height:height+4,
                borderRadius:"50%",background:"#fff",border:`2px solid ${accent}`,
                animation:`pb-pulse-${uid} 1.5s ease-in-out infinite`}} />
            </div>
          </div>
          <div style={rowStyle}>
            <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled < 100 ? `${filled} of 100` : "Completed ✓"}</span>
            <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled>=80?"Almost there!":filled>=50?"Halfway done":"Just started"}</span>
          </div>
        </div>
      </>
    );
  }

  /* ── 5. STEPS ── */
  if (type === "steps") {
    const completedSteps = Math.round((filled / 100) * steps);
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
          @keyframes pb-popin-${uid} {
            from{transform:scale(0.5);opacity:0}
            to{transform:scale(1);opacity:1}
          }
        `}</style>
        <div ref={ref} style={wrapStyle}>
          <div style={rowStyle}>{labelEl}{badgeEl}</div>
          <div style={{display:"flex",alignItems:"center",gap:0}}>
            {Array.from({length:steps},(_,i)=>{
              const done   = i < completedSteps;
              const active = i === completedSteps - 1;
              return (
                <React.Fragment key={i}>
                  {/* step circle */}
                  <div style={{width:32,height:32,borderRadius:"50%",
                    background: done ? accent : "#f1f5f9",
                    border: active ? `2px solid ${accent}` : done ? "none" : "2px solid #e2e8f0",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0,
                    boxShadow: active ? `0 0 12px ${alpha(accent,.4)}` : "none",
                    transition:"background 0.3s,box-shadow 0.3s",
                    animation: done ? `pb-popin-${uid} 0.3s ease ${i*0.08}s both` : "none",
                  }}>
                    {done
                      ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      : <span style={{fontSize:"0.7rem",fontWeight:700,color:"#cbd5e1"}}>{i+1}</span>
                    }
                  </div>
                  {/* connector line */}
                  {i < steps-1 && (
                    <div style={{flex:1,height:3,borderRadius:"999px",
                      background: i < completedSteps-1 ? accent : "#f1f5f9",
                      transition:"background 0.3s"}} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div style={rowStyle}>
            <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>Step {completedSteps} of {steps}</span>
            <span style={{fontSize:"0.7rem",color:"#94a3b8"}}>{filled>=80?"Almost there!":filled>=50?"Halfway done":"Just started"}</span>
          </div>
        </div>
      </>
    );
  }

  return null;
};