import React, { useState } from "react";

export const AnimatedForm = ({
  title = "Contact Us",
  description = "We'll get back to you shortly",
  submitText = "Send Message",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {}
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        padding: "28px",
        width: "400px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", margin: "0 0 8px" }}>{title}</h2>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", margin: "0 0 24px" }}>{description}</p>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
          marginBottom: "16px",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit"
        }}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
          marginBottom: "16px",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit"
        }}
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
          marginBottom: "24px",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit",
          minHeight: "120px",
          resize: "vertical"
        }}
      />
      <button
        onClick={() => onSubmit({ name, email, message })}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" ,
          color: "#fff",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          fontFamily: "inherit"
        }}
      >
        {submitText}
      </button>
    </div>
  );
};