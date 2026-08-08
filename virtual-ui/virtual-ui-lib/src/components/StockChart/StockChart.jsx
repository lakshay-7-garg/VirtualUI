import React, { useState, useEffect, useRef } from "react";

export const StockChart = ({
  data = [
    { value: 120, name: "Jan" },
    { value: 200, name: "Feb" },
    { value: 150, name: "Mar" },
    { value: 220, name: "Apr" },
    { value: 300, name: "May" },
    { value: 280, name: "Jun" },
    { value: 400, name: "Jul" }
  ],
  height = 240,
  width = 500,
  color = "#6366f1",
  bg = "#0f172a",
  showTooltip = true,
  lineWidth = 3,
  dotSize = 6,
  gridLines = true
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dimensions, setDimensions] = useState({ width: 500, height: 240 });
  const containerRef = useRef(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;
  const step = dimensions.width / (data.length - 1);

  const getYPosition = (value) => {
    return dimensions.height - ((value - minValue) / range) * dimensions.height;
  };

  const generatePath = () => {
    if (data.length < 2) return "";
    
    let path = "M0 " + getYPosition(data[0].value) + " ";
    
    for (let i = 1; i < data.length; i++) {
      path += "L" + (i * step) + " " + getYPosition(data[i].value) + " ";
    }
    
    return path;
  };

  const handleMouseMove = (e) => {
    if (!showTooltip) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.round(x / step);
    setActiveIndex(Math.min(Math.max(index, 0), data.length - 1));
  };

  return (
    <div 
      ref={containerRef}
      style={{
        background: bg,
        borderRadius: "16px",
        padding: "20px",
        width: width + "px",
        height: height + "px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(-1)}
    >
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        {gridLines && (
          <g>
            {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => (
              <g key={i}>
                <line 
                  x1="0" 
                  y1={dimensions.height * percent} 
                  x2={dimensions.width} 
                  y2={dimensions.height * percent} 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="1" 
                  strokeDasharray="3 3"
                />
                <text 
                  x="-30" 
                  y={dimensions.height * percent + 4} 
                  fill="rgba(255,255,255,0.3)" 
                  fontSize="10" 
                  textAnchor="end"
                >
                  {Math.round(minValue + (1 - percent) * range)}
                </text>
              </g>
            ))}
          </g>
        )}
        
        <path 
          d={generatePath()}
          fill="none"
          stroke={color}
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {data.map((item, i) => (
          <circle 
            key={i}
            cx={i * step}
            cy={getYPosition(item.value)}
            r={activeIndex === i ? dotSize * 1.5 : dotSize}
            fill={activeIndex === i ? "#fff" : color}
            stroke={activeIndex === i ? color : bg}
            strokeWidth="2"
            style={{ transition: "r 0.2s, fill 0.2s" }}
          />
        ))}
        
        {data.map((item, i) => (
          <text 
            key={i}
            x={i * step}
            y={dimensions.height - 5}
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
            textAnchor="middle"
          >
            {item.name}
          </text>
        ))}
        
        {activeIndex >= 0 && showTooltip && (
          <g>
            <rect 
              x={activeIndex * step - 25} 
              y={getYPosition(data[activeIndex].value) - 40} 
              width="50" 
              height="24" 
              rx="6" 
              fill="rgba(0,0,0,0.7)" 
              stroke={color} 
              strokeWidth="1"
            />
            <text 
              x={activeIndex * step} 
              y={getYPosition(data[activeIndex].value) - 25} 
              fill="#fff" 
              fontSize="10" 
              textAnchor="middle"
              fontWeight="bold"
            >
              {data[activeIndex].value}
            </text>
            <circle 
              cx={activeIndex * step}
              cy={getYPosition(data[activeIndex].value)}
              r="3"
              fill={color}
            />
            <line 
              x1={activeIndex * step} 
              y1={getYPosition(data[activeIndex].value)} 
              x2={activeIndex * step} 
              y2={dimensions.height} 
              stroke={alpha(color, 0.3)} 
              strokeWidth="1" 
              strokeDasharray="3 3"
            />
          </g>
        )}
      </svg>
      
      <div style={{ position: "absolute", top: "12px", left: "16px", color: "#fff", fontSize: "12px", fontWeight: "700" }}>
        {activeIndex >= 0 ? data[activeIndex].name + " " + data[activeIndex].value : "Hover for details"}
      </div>
    </div>
  );
};