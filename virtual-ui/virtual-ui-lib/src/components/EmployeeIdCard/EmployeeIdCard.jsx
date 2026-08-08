import React from "react";

export const EmployeeIdCard = ({
  companyName = "Microsoft",
  employeeName = "Lakshay Garg",
  designation = "SWE Intern",
  accent = "#0078d4",
  bg = "#1e293b",
  employeePhoto = "https://randomuser.me/api/portraits/men/32.jpg",
  employeeId = "EMP-2024-0578"
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{
      width: "320px",
      borderRadius: "16px",
      overflow: "hidden",
      background: bg,
      border: "1px solid " + alpha(accent, 0.2),
      fontFamily: "system-ui,sans-serif",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      position: "relative"
    }}>
      <div style={{
        height: "80px",
        background: "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.6) + ")",
        display: "flex",
        alignItems: "center",
        padding: "0 24px"
      }}>
        <h3 style={{
          color: "#fff",
          fontSize: "20px",
          fontWeight: "800",
          margin: 0,
          letterSpacing: "0.5px"
        }}>{companyName}</h3>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{
          display: "flex",
          gap: "16px",
          marginBottom: "20px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid " + alpha(accent, 0.4)
          }}>
            <img 
              src={employeePhoto} 
              alt={employeeName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <h4 style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              margin: "0 0 4px"
            }}>{employeeName}</h4>
            <p style={{
              color: accent,
              fontSize: "13px",
              fontWeight: "600",
              margin: 0
            }}>{designation}</p>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11px",
              margin: "8px 0 0",
              fontWeight: "500"
            }}>Employee ID: {employeeId}</p>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          background: alpha(accent, 0.1),
          borderRadius: "8px",
          border: "1px solid " + alpha(accent, 0.15)
        }}>
          <div>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "10px",
              margin: "0 0 4px",
              fontWeight: "600"
            }}>VALID THROUGH</p>
            <p style={{
              color: "#fff",
              fontSize: "12px",
              fontWeight: "700",
              margin: 0
            }}>Dec 31, 2024</p>
          </div>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              background: "linear-gradient(45deg, " + accent + ", " + alpha(accent, 0.5) + ")"
            }} />
          </div>
        </div>
      </div>
      <div style={{
        height: "3px",
        background: "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.3) + ")"
      }} />
    </div>
  );
};