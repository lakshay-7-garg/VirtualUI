import React, { useState, useRef, useEffect } from "react";

export const OTPInput = ({
  length = 6,
  onComplete = () => {},
  onCancel = () => {},
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  label = "Enter verification code",
  subLabel = "We sent a code to your email",
  errorText = "",
  resendText = "Resend code",
  onResend = () => {},
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focused, setFocused] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef([]);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  // Auto focus first input
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < length - 1) {
      inputs.current[i + 1]?.focus();
      setFocused(i + 1);
    }
    if (newOtp.every((v) => v !== "")) {
      setCompleted(true);
      onComplete(newOtp.join(""));
    } else {
      setCompleted(false);
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[i]) {
        newOtp[i] = "";
        setOtp(newOtp);
      } else if (i > 0) {
        newOtp[i - 1] = "";
        setOtp(newOtp);
        inputs.current[i - 1]?.focus();
        setFocused(i - 1);
      }
      setCompleted(false);
    }
    if (e.key === "ArrowLeft" && i > 0) {
      inputs.current[i - 1]?.focus();
      setFocused(i - 1);
    }
    if (e.key === "ArrowRight" && i < length - 1) {
      inputs.current[i + 1]?.focus();
      setFocused(i + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((ch, i) => { newOtp[i] = ch; });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, length - 1);
    inputs.current[nextIndex]?.focus();
    setFocused(nextIndex);
    if (newOtp.every((v) => v !== "")) {
      setCompleted(true);
      onComplete(newOtp.join(""));
    }
  };

  const handleResend = () => {
    setOtp(Array(length).fill(""));
    setCompleted(false);
    setResendTimer(30);
    inputs.current[0]?.focus();
    setFocused(0);
    onResend();
  };

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "28px 24px",
      width: "fit-content",
      fontFamily: "system-ui, sans-serif",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: alpha(accent, 0.12),
          border: `1px solid ${alpha(accent, 0.25)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 14px",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 3l-4 4-4-4" />
          </svg>
        </div>
        <p style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 5px" }}>
          {label}
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
          {subLabel}
        </p>
      </div>

      {/* OTP Boxes */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "8px" }}>
        {otp.map((val, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            onFocus={() => setFocused(i)}
            style={{
              width: "44px", height: "52px",
              textAlign: "center",
              fontSize: "20px", fontWeight: "700",
              color: "#fff",
              background: val ? alpha(accent, 0.1) : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${
                errorText
                  ? "rgba(239,68,68,0.6)"
                  : focused === i
                  ? accent
                  : val
                  ? alpha(accent, 0.4)
                  : "rgba(255,255,255,0.1)"
              }`,
              borderRadius: "12px",
              outline: "none",
              caretColor: accent,
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          />
        ))}
      </div>

      {/* Separator for 6-digit (visual grouping) */}
      {length === 6 && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "44px" }} />)}
            <div style={{ width: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "6px", height: "1.5px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
            </div>
            {[0,1,2].map(i => <div key={i} style={{ width: "44px" }} />)}
          </div>
        </div>
      )}

      {/* Error */}
      {errorText && (
        <p style={{
          fontSize: "12px", color: "#f87171", textAlign: "center",
          margin: "6px 0 0", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "5px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorText}
        </p>
      )}

      {/* Verify button */}
      <button
        onClick={() => completed && onComplete(otp.join(""))}
        disabled={!completed}
        style={{
          width: "100%", padding: "12px",
          borderRadius: "12px", border: "none",
          marginTop: "20px",
          background: completed
            ? `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`
            : "rgba(255,255,255,0.06)",
          color: completed ? "#fff" : "rgba(255,255,255,0.25)",
          fontSize: "14px", fontWeight: "700",
          cursor: completed ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          transition: "all 0.25s",
        }}
      >
        {completed ? "Verify Code" : `Enter ${length - otp.filter(v => v).length} more digit${length - otp.filter(v => v).length !== 1 ? "s" : ""}`}
      </button>

      {/* Resend */}
      <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.25)", margin: "14px 0 0" }}>
        Didn't receive it?{" "}
        <button
          onClick={handleResend}
          disabled={resendTimer > 0}
          style={{
            background: "transparent", border: "none", padding: 0,
            fontSize: "12px", fontWeight: "700",
            color: resendTimer > 0 ? "rgba(255,255,255,0.25)" : accent,
            cursor: resendTimer > 0 ? "default" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {resendTimer > 0 ? `${resendText} (${resendTimer}s)` : resendText}
        </button>
      </p>
    </div>
  );
};