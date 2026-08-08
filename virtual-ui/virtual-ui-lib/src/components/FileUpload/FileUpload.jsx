import React, { useState, useRef } from "react";

export const FileUpload = ({
  accept = "*",
  multiple = true,
  maxSizeMB = 5,
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  label = "Drop files here or click to upload",
  subLabel = "Supports any file up to",
  onUpload = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getIcon = (type) => {
    if (type.startsWith("image/")) return { path: "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z", color: "#a78bfa" };
    if (type.includes("pdf"))   return { path: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8", color: "#f87171" };
    if (type.includes("video")) return { path: "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z", color: "#34d399" };
    if (type.includes("audio")) return { path: "M9 18V5l12-2v13M9 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z", color: "#fbbf24" };
    return { path: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6", color: "#94a3b8" };
  };

  const processFiles = (incoming) => {
    setError("");
    const valid = [];
    for (const f of incoming) {
      if (f.size > maxSizeMB * 1024 * 1024) {
        setError(`"${f.name}" exceeds ${maxSizeMB}MB limit.`);
        continue;
      }
      valid.push({ file: f, id: Math.random().toString(36).slice(2), progress: 0, done: false });
    }
    if (!valid.length) return;

    const newFiles = multiple ? [...files, ...valid] : valid;
    setFiles(newFiles);

    // Simulate upload progress
    valid.forEach(({ id }) => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.floor(Math.random() * 15) + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(t);
          setFiles((prev) => prev.map((f) => f.id === id ? { ...f, progress: 100, done: true } : f));
          onUpload(id);
        } else {
          setFiles((prev) => prev.map((f) => f.id === id ? { ...f, progress: p } : f));
        }
      }, 200);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div style={{ width: "320px", fontFamily: "system-ui, sans-serif" }}>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          background: dragging ? alpha(accent, 0.1) : "rgba(255,255,255,0.03)",
          border: `2px dashed ${dragging ? accent : "rgba(255,255,255,0.1)"}`,
          borderRadius: radius,
          padding: "32px 20px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: "none" }}
          onChange={(e) => processFiles(Array.from(e.target.files))}
        />

        {/* Upload icon */}
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          background: alpha(accent, 0.12),
          border: `1px solid ${alpha(accent, 0.25)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 14px",
          transition: "all 0.2s",
          transform: dragging ? "scale(1.1)" : "scale(1)",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "#fff", margin: "0 0 4px" }}>
          {label}
        </p>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          {subLabel} {maxSizeMB}MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          marginTop: "10px", padding: "9px 12px", borderRadius: "10px",
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#f87171" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span style={{ fontSize: "11px", color: "#f87171" }}>{error}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {files.map(({ file, id, progress, done }) => {
            const icon = getIcon(file.type);
            const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

            return (
              <div key={id} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${done ? alpha(accent, 0.2) : "rgba(255,255,255,0.07)"}`,
                borderRadius: "12px", padding: "10px 12px",
                transition: "border-color 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                  {/* Thumbnail or icon */}
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px", flexShrink: 0,
                    background: preview ? `url(${preview}) center/cover` : alpha(icon.color, 0.12),
                    border: `1px solid ${alpha(icon.color, 0.2)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    {!preview && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke={icon.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icon.path} />
                      </svg>
                    )}
                  </div>

                  {/* File info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: "12px", fontWeight: "600", color: "#fff",
                      margin: "0 0 2px", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {file.name}
                    </p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                      {formatSize(file.size)}
                    </p>
                  </div>

                  {/* Done check or remove */}
                  {done ? (
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="#34d399" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <button
                      onClick={() => removeFile(id)}
                      style={{
                        background: "transparent", border: "none", padding: "2px",
                        cursor: "pointer", color: "rgba(255,255,255,0.25)", flexShrink: 0,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                {!done && (
                  <div style={{
                    marginTop: "8px", height: "3px",
                    background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: "2px",
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)})`,
                      transition: "width 0.2s ease",
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};