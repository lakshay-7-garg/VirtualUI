import React, { useState } from "react";

export const InvoiceCard = ({
  invoiceNumber = "INV-2024-001",
  date = "21 March 2024",
  dueDate = "31 March 2024",
  from = {
    name: "VirtualAI Inc.",
    email: "billing@virtualai.com",
    address: "123 Tech Street, San Francisco, CA",
  },
  to = {
    name: "Aryan Sharma",
    email: "aryan@example.com",
    address: "456 Dev Lane, Mumbai, India",
  },
  items = [
    { name: "Pro Plan Subscription", qty: 1, price: 29 },
    { name: "Extra AI Credits (500)", qty: 2, price: 9 },
    { name: "Custom Domain Setup",   qty: 1, price: 15 },
  ],
  taxRate = 18,
  currency = "$",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  status = "unpaid",
  onPayClick = () => {},
  onDownloadClick = () => {},
}) => {
  const [paid, setPaid] = useState(status === "paid");

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax      = parseFloat(((subtotal * taxRate) / 100).toFixed(2));
  const total    = parseFloat((subtotal + tax).toFixed(2));

  const statusConfig = {
    paid:    { label: "Paid",    bg: "rgba(16,185,129,0.15)", color: "#34d399", border: "rgba(16,185,129,0.3)" },
    unpaid:  { label: "Unpaid",  bg: "rgba(239,68,68,0.12)",  color: "#f87171", border: "rgba(239,68,68,0.3)"  },
    pending: { label: "Pending", bg: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  };
  const sc = statusConfig[paid ? "paid" : status] || statusConfig.unpaid;

  const Row = ({ label, value, bold, large, accentColor }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "5px 0",
    }}>
      <span style={{
        fontSize: large ? "14px" : "12px",
        fontWeight: bold ? "700" : "400",
        color: large ? "#fff" : "rgba(255,255,255,0.45)",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: large ? "16px" : "13px",
        fontWeight: bold ? "800" : "600",
        color: accentColor || (large ? "#fff" : "rgba(255,255,255,0.85)"),
      }}>
        {currency}{typeof value === "number" ? value.toFixed(2) : value}
      </span>
    </div>
  );

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      padding: "24px",
      width: "340px",
      fontFamily: "system-ui, sans-serif",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      color: "#fff",
    }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "6px",
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "800", color: "#fff",
            }}>
              V
            </div>
            <span style={{ fontSize: "14px", fontWeight: "800" }}>{from.name}</span>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0 }}>{invoiceNumber}</p>
        </div>

        {/* Status badge */}
        <div style={{
          padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
          textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          {sc.label}
        </div>
      </div>

      {/* ── From / To ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px", padding: "14px", marginBottom: "20px",
      }}>
        {[{ label: "From", info: from }, { label: "To", info: to }].map(({ label, info }) => (
          <div key={label}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px" }}>
              {label}
            </p>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#fff", margin: "0 0 2px" }}>{info.name}</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "0 0 2px" }}>{info.email}</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0, lineHeight: 1.4 }}>{info.address}</p>
          </div>
        ))}
      </div>

      {/* ── Dates ── */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {[{ label: "Issue Date", val: date }, { label: "Due Date", val: dueDate }].map(({ label, val }) => (
          <div key={label} style={{
            flex: 1, background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px", padding: "10px 12px",
          }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 3px", fontWeight: "700" }}>{label}</p>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#fff", margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* ── Line Items ── */}
      <div style={{ marginBottom: "16px" }}>
        {/* Table header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto auto",
          gap: "8px", padding: "6px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "4px",
        }}>
          {["Item", "Qty", "Amount"].map((h) => (
            <span key={h} style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.8px", textAlign: h !== "Item" ? "right" : "left" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {items.map((item, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr auto auto",
            gap: "8px", padding: "8px",
            borderRadius: "8px",
            background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
          }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>{item.name}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textAlign: "right" }}>×{item.qty}</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#fff", textAlign: "right" }}>
              {currency}{(item.qty * item.price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Totals ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px", padding: "12px 14px", marginBottom: "20px",
      }}>
        <Row label="Subtotal"          value={subtotal} />
        <Row label={`Tax (${taxRate}%)`} value={tax} />
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />
        <Row label="Total" value={total} bold large accentColor={accent} />
      </div>

      {/* ── Actions ── */}
      <div style={{ display: "flex", gap: "8px" }}>
        {!paid && (
          <button
            onClick={() => { setPaid(true); onPayClick(); }}
            style={{
              flex: 1, padding: "11px",
              borderRadius: "12px", border: "none",
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`,
              color: "#fff", fontSize: "13px", fontWeight: "700",
              cursor: "pointer", fontFamily: "inherit",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Pay {currency}{total.toFixed(2)}
          </button>
        )}

        {paid && (
          <div style={{
            flex: 1, padding: "11px", borderRadius: "12px",
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "6px", fontSize: "13px", fontWeight: "700", color: "#34d399",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Payment Done
          </div>
        )}

        <button
          onClick={onDownloadClick}
          style={{
            width: "42px", padding: "11px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </button>
      </div>
    </div>
  );
};