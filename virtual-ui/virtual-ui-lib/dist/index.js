var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  AnimatedButton: () => AnimatedButton,
  AnimatedForm: () => AnimatedForm,
  AvatarCard: () => AvatarCard,
  BackgoundImageSlider: () => BackgoundImageSlider,
  Button: () => Button,
  Card: () => Card,
  Charts: () => Charts,
  ColorPicker: () => ColorPicker,
  DeleteButton: () => DeleteButton,
  EcommerceCard: () => EcommerceCard,
  EmployeeIdCard: () => EmployeeIdCard,
  FileUpload: () => FileUpload,
  Footer: () => Footer,
  ImageCard: () => ImageCard,
  ImageSlider: () => ImageSlider,
  InvoiceCard: () => InvoiceCard,
  Loader: () => Loader,
  Navbar: () => Navbar,
  NotificationToast: () => NotificationToast,
  OTPInput: () => OTPInput,
  PageLoader: () => PageLoader,
  PricingCard: () => PricingCard,
  ProgressBar: () => ProgressBar,
  RatingStars: () => RatingStars,
  ReviewCard: () => ReviewCard,
  Sidebar: () => Sidebar,
  StatCard: () => StatCard,
  StockChart: () => StockChart,
});
module.exports = __toCommonJS(index_exports);

// src/components/Loader/Loader.jsx
var import_react = __toESM(require("react"));
var Loader = ({
  type = "spinner",
  size = 48,
  accent = "#6366f1",
  bg = "transparent",
  label = "",
  speed = 1,
}) => {
  const [dots, setDots] = (0, import_react.useState)(0);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  (0, import_react.useEffect)(() => {
    if (type === "dots") {
      const t = setInterval(() => setDots((d) => (d + 1) % 4), 400 / speed);
      return () => clearInterval(t);
    }
    if (type === "bar") {
      const t = setInterval(
        () => setProgress((p) => (p >= 100 ? 0 : p + 2)),
        30 / speed,
      );
      return () => clearInterval(t);
    }
  }, [type, speed]);
  const dur = `${1 / speed}s`;
  const wrapStyle = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: bg,
    padding: bg !== "transparent" ? "24px" : "0",
    borderRadius: "16px",
    fontFamily: "system-ui, sans-serif",
  };
  const labelEl = label
    ? /* @__PURE__ */ import_react.default.createElement(
        "span",
        {
          style: {
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.3px",
          },
        },
        label,
      )
    : null;
  if (type === "spinner")
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      { style: wrapStyle },
      /* @__PURE__ */ import_react.default.createElement(
        "svg",
        { width: size, height: size, viewBox: "0 0 48 48" },
        /* @__PURE__ */ import_react.default.createElement("circle", {
          cx: "24",
          cy: "24",
          r: "20",
          fill: "none",
          stroke: alpha(accent, 0.15),
          strokeWidth: "4",
        }),
        /* @__PURE__ */ import_react.default.createElement("circle", {
          cx: "24",
          cy: "24",
          r: "20",
          fill: "none",
          stroke: accent,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDasharray: "31.4 94.2",
          style: {
            transformOrigin: "center",
            animation: `spin ${dur} linear infinite`,
          },
        }),
        /* @__PURE__ */ import_react.default.createElement(
          "style",
          null,
          `@keyframes spin { to { transform: rotate(360deg); } }`,
        ),
      ),
      labelEl,
    );
  if (type === "pulse")
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      { style: wrapStyle },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        { style: { position: "relative", width: size, height: size } },
        /* @__PURE__ */ import_react.default.createElement("div", {
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: alpha(accent, 0.2),
            animation: `pulse ${dur} ease-out infinite`,
          },
        }),
        /* @__PURE__ */ import_react.default.createElement("div", {
          style: {
            position: "absolute",
            inset: "25%",
            borderRadius: "50%",
            background: accent,
          },
        }),
        /* @__PURE__ */ import_react.default.createElement(
          "style",
          null,
          `@keyframes pulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2);opacity:0} }`,
        ),
      ),
      labelEl,
    );
  if (type === "dots")
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      { style: wrapStyle },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        { style: { display: "flex", gap: "8px", alignItems: "center" } },
        [0, 1, 2].map((i) =>
          /* @__PURE__ */ import_react.default.createElement("div", {
            key: i,
            style: {
              width: size / 5,
              height: size / 5,
              borderRadius: "50%",
              background: dots === i ? accent : alpha(accent, 0.25),
              transition: "background 0.2s",
            },
          }),
        ),
      ),
      labelEl,
    );
  if (type === "bar")
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      { style: wrapStyle },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          style: {
            width: size * 3,
            height: size / 8,
            background: alpha(accent, 0.15),
            borderRadius: "99px",
            overflow: "hidden",
          },
        },
        /* @__PURE__ */ import_react.default.createElement("div", {
          style: {
            height: "100%",
            borderRadius: "99px",
            background: accent,
            width: `${progress}%`,
            transition: "width 0.03s linear",
          },
        }),
      ),
      labelEl,
    );
  if (type === "ring")
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      { style: wrapStyle },
      /* @__PURE__ */ import_react.default.createElement("div", {
        style: {
          width: size,
          height: size,
          borderRadius: "50%",
          border: `4px solid ${alpha(accent, 0.15)}`,
          borderTop: `4px solid ${accent}`,
          borderRight: `4px solid ${accent}`,
          animation: `spin ${dur} linear infinite`,
        },
      }),
      /* @__PURE__ */ import_react.default.createElement(
        "style",
        null,
        `@keyframes spin { to { transform: rotate(360deg); } }`,
      ),
      labelEl,
    );
  return null;
};

// src/components/NotificationToast/NotificationToast.jsx
var import_react2 = __toESM(require("react"));
var NotificationToast = ({
  title = "New Message",
  message = "You have a new notification from the team.",
  type = "success",
  duration = 3e3,
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "14px",
  showProgress = true,
}) => {
  const [visible, setVisible] = (0, import_react2.useState)(true);
  const [progress, setProgress] = (0, import_react2.useState)(100);
  const typeColors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  const typeIcons = {
    success: "M5 13l4 4L19 7",
    error: "M6 18L18 6M6 6l12 12",
    warning:
      "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    info: "M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z",
  };
  const color = typeColors[type] || accent;
  (0, import_react2.useEffect)(() => {
    if (!showProgress) return;
    const step = 100 / (duration / 50);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return p - step;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [duration, showProgress]);
  if (!visible) return null;
  return /* @__PURE__ */ import_react2.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "16px 18px",
        width: "320px",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        border: `1px solid rgba(255,255,255,0.08)`,
        position: "relative",
        overflow: "hidden",
      },
    },
    /* @__PURE__ */ import_react2.default.createElement(
      "div",
      { style: { display: "flex", alignItems: "flex-start", gap: "12px" } },
      /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          style: {
            width: 36,
            height: 36,
            borderRadius: "10px",
            flexShrink: 0,
            background: `${color}22`,
            border: `1px solid ${color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        /* @__PURE__ */ import_react2.default.createElement(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: color,
            strokeWidth: "2.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react2.default.createElement("path", {
            d: typeIcons[type] || typeIcons.info,
          }),
        ),
      ),
      /* @__PURE__ */ import_react2.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        /* @__PURE__ */ import_react2.default.createElement(
          "div",
          {
            style: { fontSize: "14px", fontWeight: "700", marginBottom: "3px" },
          },
          title,
        ),
        /* @__PURE__ */ import_react2.default.createElement(
          "div",
          {
            style: {
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
            },
          },
          message,
        ),
      ),
      /* @__PURE__ */ import_react2.default.createElement(
        "button",
        {
          onClick: () => setVisible(false),
          style: {
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.3)",
            padding: "2px",
            flexShrink: 0,
            lineHeight: 1,
          },
        },
        /* @__PURE__ */ import_react2.default.createElement(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
          },
          /* @__PURE__ */ import_react2.default.createElement("path", {
            d: "M18 6L6 18M6 6l12 12",
          }),
        ),
      ),
    ),
    showProgress &&
      /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "rgba(255,255,255,0.07)",
          },
        },
        /* @__PURE__ */ import_react2.default.createElement("div", {
          style: {
            height: "100%",
            width: `${progress}%`,
            background: color,
            transition: "width 0.05s linear",
            borderRadius: "0 2px 2px 0",
          },
        }),
      ),
  );
};

// src/components/AvatarCard/AvatarCard.jsx
var import_react3 = __toESM(require("react"));
var AvatarCard = ({
  name = "Aryan Sharma",
  role = "Frontend Developer",
  followers = 2400,
  following = 180,
  projects = 34,
  bio = "Building beautiful UIs one component at a time.",
  avatar = "",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
}) => {
  const [followed, setFollowed] = (0, import_react3.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const stats = [
    { label: "Followers", value: followed ? followers + 1 : followers },
    { label: "Following", value: following },
    { label: "Projects", value: projects },
  ];
  return /* @__PURE__ */ import_react3.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "24px 20px",
        width: "280px",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      },
    },
    /* @__PURE__ */ import_react3.default.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.3)})`,
      },
    }),
    /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "16px",
        },
      },
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: avatar
              ? `url(${avatar}) center/cover`
              : `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.5)})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "800",
            color: "#fff",
            border: `3px solid ${alpha(accent, 0.4)}`,
            marginBottom: "12px",
          },
        },
        !avatar && initials,
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        { style: { fontSize: "16px", fontWeight: "700", marginBottom: "3px" } },
        name,
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            fontSize: "12px",
            fontWeight: "600",
            color: accent,
            background: alpha(accent, 0.12),
            padding: "2px 10px",
            borderRadius: "20px",
            border: `1px solid ${alpha(accent, 0.3)}`,
          },
        },
        role,
      ),
    ),
    /* @__PURE__ */ import_react3.default.createElement(
      "p",
      {
        style: {
          fontSize: "12px",
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: "18px",
          padding: "0 4px",
        },
      },
      bio,
    ),
    /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-around",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "12px 8px",
          marginBottom: "16px",
        },
      },
      stats.map((s) =>
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          { key: s.label, style: { textAlign: "center" } },
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            { style: { fontSize: "18px", fontWeight: "800" } },
            s.value >= 1e3 ? (s.value / 1e3).toFixed(1) + "k" : s.value,
          ),
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "2px",
              },
            },
            s.label,
          ),
        ),
      ),
    ),
  );
};

// src/components/PricingCard/PricingCard.jsx
var import_react4 = __toESM(require("react"));
var PricingCard = ({
  planName = "Pro Plan",
  description = "For teams that need more power.",
  price = 29,
  currency = "$",
  period = "per month",
  badgeText = "Most Popular",
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  features = [
    "Unlimited projects",
    "Priority support",
    "Advanced analytics",
    "Custom integrations",
    "Team collaboration",
  ],
  onCtaClick = () => {},
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "28px 24px",
        width: "300px",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        border: `1px solid ${alpha(accent, 0.25)}`,
        position: "relative",
        overflow: "hidden",
      },
    },
    /* @__PURE__ */ import_react4.default.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.3)})`,
      },
    }),
    badgeText &&
      /* @__PURE__ */ import_react4.default.createElement(
        "div",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "100px",
            marginBottom: "14px",
            background: alpha(accent, 0.12),
            border: `1px solid ${alpha(accent, 0.3)}`,
            fontSize: "11px",
            fontWeight: "700",
            color: accent,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          },
        },
        /* @__PURE__ */ import_react4.default.createElement("div", {
          style: {
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
          },
        }),
        badgeText,
      ),
    /* @__PURE__ */ import_react4.default.createElement(
      "div",
      { style: { fontSize: "20px", fontWeight: "800", marginBottom: "4px" } },
      planName,
    ),
    /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          fontSize: "13px",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "20px",
          lineHeight: 1.5,
        },
      },
      description,
    ),
    /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: "3px",
          marginBottom: "4px",
        },
      },
      /* @__PURE__ */ import_react4.default.createElement(
        "span",
        {
          style: {
            fontSize: "18px",
            fontWeight: "700",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 2,
          },
        },
        currency,
      ),
      /* @__PURE__ */ import_react4.default.createElement(
        "span",
        {
          style: {
            fontSize: "52px",
            fontWeight: "800",
            color: "#fff",
            lineHeight: 1,
          },
        },
        Math.round(price),
      ),
    ),
    /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          fontSize: "12px",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "20px",
        },
      },
      period,
    ),
    /* @__PURE__ */ import_react4.default.createElement("div", {
      style: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "16px",
      },
    }),
    /* @__PURE__ */ import_react4.default.createElement(
      "ul",
      {
        style: {
          listStyle: "none",
          padding: 0,
          margin: "0 0 22px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      },
      features.map((f, i) =>
        /* @__PURE__ */ import_react4.default.createElement(
          "li",
          {
            key: i,
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.75)",
            },
          },
          /* @__PURE__ */ import_react4.default.createElement(
            "div",
            {
              style: {
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: alpha(accent, 0.18),
                border: `1px solid ${alpha(accent, 0.4)}`,
              },
            },
            /* @__PURE__ */ import_react4.default.createElement(
              "svg",
              {
                width: "10",
                height: "10",
                viewBox: "0 0 12 12",
                fill: "none",
                stroke: "#fff",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              },
              /* @__PURE__ */ import_react4.default.createElement("polyline", {
                points: "1.5,6 4.5,9 10.5,3",
              }),
            ),
          ),
          f,
        ),
      ),
    ),
    /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: onCtaClick,
        style: {
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "none",
          background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`,
          color: "#fff",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          letterSpacing: "0.2px",
          fontFamily: "system-ui, sans-serif",
        },
        onMouseEnter: (e) => (e.currentTarget.style.opacity = "0.88"),
        onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
      },
      ctaText,
    ),
  );
};

// src/components/Navbar/Navbar.jsx
var import_react5 = __toESM(require("react"));
var Navbar = ({
  logo = "VirtualUI",
  links = ["Home", "Features", "Pricing", "Blog"],
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0f172a",
  onCtaClick = () => {},
  onLinkClick = () => {},
}) => {
  const [scrolled, setScrolled] = (0, import_react5.useState)(false);
  const [menuOpen, setMenuOpen] = (0, import_react5.useState)(false);
  const [active, setActive] = (0, import_react5.useState)("Home");
  const [isMobile, setIsMobile] = (0, import_react5.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  (0, import_react5.useEffect)(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  (0, import_react5.useEffect)(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  (0, import_react5.useEffect)(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);
  const handleLink = (link) => {
    setActive(link);
    setMenuOpen(false);
    onLinkClick(link);
  };
  return /* @__PURE__ */ import_react5.default.createElement(
    import_react5.default.Fragment,
    null,
    /* @__PURE__ */ import_react5.default.createElement(
      "style",
      null,
      `
        @keyframes nbSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-link:hover { color: rgba(255,255,255,0.9) !important; background: rgba(255,255,255,0.05) !important; }
        .nb-cta:hover  { opacity: 0.85 !important; }
        .nb-ham:hover  { background: rgba(255,255,255,0.1) !important; }
        .nb-mlink:hover { background: rgba(255,255,255,0.06) !important; }
      `,
    ),
    /* @__PURE__ */ import_react5.default.createElement(
      "nav",
      {
        style: {
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1e3,
          background: scrolled ? alpha(bg, 0.96) : bg,
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)"}`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
          fontFamily: "system-ui, -apple-system, sans-serif",
          width: "100%",
          boxSizing: "border-box",
        },
      },
      /* @__PURE__ */ import_react5.default.createElement(
        "div",
        {
          style: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            height: isMobile ? "56px" : "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            boxSizing: "border-box",
          },
        },
        /* @__PURE__ */ import_react5.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              flexShrink: 0,
            },
          },
          /* @__PURE__ */ import_react5.default.createElement(
            "div",
            {
              style: {
                width: isMobile ? "26px" : "30px",
                height: isMobile ? "26px" : "30px",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "800",
                color: "#fff",
                flexShrink: 0,
              },
            },
            logo[0],
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "span",
            {
              style: {
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "800",
                color: "#fff",
                letterSpacing: "-0.3px",
              },
            },
            logo,
          ),
        ),
        !isMobile &&
          /* @__PURE__ */ import_react5.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "2px",
                flex: 1,
                justifyContent: "center",
              },
            },
            links.map((link) =>
              /* @__PURE__ */ import_react5.default.createElement(
                "button",
                {
                  key: link,
                  className: "nb-link",
                  onClick: () => handleLink(link),
                  style: {
                    background:
                      active === link ? alpha(accent, 0.12) : "transparent",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: "9px",
                    fontSize: "14px",
                    fontWeight: active === link ? "700" : "500",
                    color: active === link ? accent : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  },
                },
                link,
              ),
            ),
          ),
        /* @__PURE__ */ import_react5.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            },
          },
          /* @__PURE__ */ import_react5.default.createElement(
            "button",
            {
              className: "nb-cta",
              onClick: onCtaClick,
              style: {
                padding: isMobile ? "7px 14px" : "9px 20px",
                borderRadius: "10px",
                border: "none",
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.75)})`,
                color: "#fff",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              },
            },
            ctaText,
          ),
          isMobile &&
            /* @__PURE__ */ import_react5.default.createElement(
              "button",
              {
                className: "nb-ham",
                onClick: () => setMenuOpen((o) => !o),
                style: {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  width: "34px",
                  height: "34px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  transition: "background 0.2s",
                  flexShrink: 0,
                  padding: 0,
                },
              },
              /* @__PURE__ */ import_react5.default.createElement("div", {
                style: {
                  width: "16px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "2px",
                  transform: menuOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                  transition: "transform 0.25s",
                },
              }),
              /* @__PURE__ */ import_react5.default.createElement("div", {
                style: {
                  width: "16px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "2px",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                },
              }),
              /* @__PURE__ */ import_react5.default.createElement("div", {
                style: {
                  width: "16px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "2px",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                  transition: "transform 0.25s",
                },
              }),
            ),
        ),
      ),
      isMobile &&
        menuOpen &&
        /* @__PURE__ */ import_react5.default.createElement(
          "div",
          {
            style: {
              animation: "nbSlideDown 0.2s ease",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "10px 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              background: alpha(bg, 0.98),
            },
          },
          links.map((link) =>
            /* @__PURE__ */ import_react5.default.createElement(
              "button",
              {
                key: link,
                className: "nb-mlink",
                onClick: () => handleLink(link),
                style: {
                  background:
                    active === link ? alpha(accent, 0.1) : "transparent",
                  border: "none",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: active === link ? "700" : "500",
                  color: active === link ? accent : "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  width: "100%",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              },
              link,
              active === link &&
                /* @__PURE__ */ import_react5.default.createElement(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: accent,
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                  },
                  /* @__PURE__ */ import_react5.default.createElement(
                    "polyline",
                    { points: "9 18 15 12 9 6" },
                  ),
                ),
            ),
          ),
          /* @__PURE__ */ import_react5.default.createElement("div", {
            style: {
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              margin: "8px 0",
            },
          }),
          /* @__PURE__ */ import_react5.default.createElement(
            "button",
            {
              onClick: () => {
                setMenuOpen(false);
                onCtaClick();
              },
              style: {
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.75)})`,
                border: "none",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#fff",
                cursor: "pointer",
                fontFamily: "inherit",
                width: "100%",
              },
            },
            ctaText,
          ),
        ),
    ),
  );
};

// src/components/Footer/Footer.jsx
var import_react6 = __toESM(require("react"));
var Footer = ({
  logo = "VirtualUI",
  links = ["Home", "Features", "Pricing", "Blog", "Contact"],
  copyright = "VirtualUI",
  accent = "#6366f1",
  bg = "#0f172a",
}) => {
  return /* @__PURE__ */ import_react6.default.createElement(
    "footer",
    {
      style: {
        background: bg,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "system-ui, sans-serif",
        width: "100%",
        boxSizing: "border-box",
        padding: "28px 24px",
      },
    },
    /* @__PURE__ */ import_react6.default.createElement(
      "div",
      {
        style: {
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        },
      },
      /* @__PURE__ */ import_react6.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "8px" } },
        /* @__PURE__ */ import_react6.default.createElement(
          "div",
          {
            style: {
              width: "26px",
              height: "26px",
              borderRadius: "7px",
              background: `linear-gradient(135deg, ${accent}, rgba(99,102,241,0.5))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "800",
              color: "#fff",
            },
          },
          logo[0],
        ),
        /* @__PURE__ */ import_react6.default.createElement(
          "span",
          { style: { fontSize: "15px", fontWeight: "800", color: "#fff" } },
          logo,
        ),
      ),
      /* @__PURE__ */ import_react6.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px",
          },
        },
        links.map((link) =>
          /* @__PURE__ */ import_react6.default.createElement(
            "a",
            {
              key: link,
              href: "#",
              style: {
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                padding: "4px 12px",
                borderRadius: "8px",
                transition: "color 0.2s",
              },
              onMouseEnter: (e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.85)"),
              onMouseLeave: (e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.4)"),
            },
            link,
          ),
        ),
      ),
      /* @__PURE__ */ import_react6.default.createElement("div", {
        style: {
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.06)",
        },
      }),
      /* @__PURE__ */ import_react6.default.createElement(
        "p",
        {
          style: {
            fontSize: "12px",
            color: "rgba(255,255,255,0.22)",
            margin: 0,
          },
        },
        "\xA9 ",
        /* @__PURE__ */ new Date().getFullYear(),
        " ",
        copyright,
        ". All rights reserved.",
      ),
    ),
  );
};

// src/components/Sidebar/Sidebar.jsx
var import_react7 = __toESM(require("react"));
var Sidebar = ({
  logo = "VirtualUI",
  accent = "#6366f1",
  bg = "#0f172a",
  items = [
    {
      label: "Dashboard",
      icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
      component: /* @__PURE__ */ import_react7.default.createElement(
        "div",
        { style: { padding: "24px" } },
        /* @__PURE__ */ import_react7.default.createElement(
          "h2",
          {
            style: {
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            },
          },
          "Dashboard",
        ),
        /* @__PURE__ */ import_react7.default.createElement(
          "p",
          { style: { color: "rgba(255,255,255,0.4)", fontSize: "14px" } },
          "Welcome to your dashboard overview.",
        ),
      ),
    },
    {
      label: "Analytics",
      icon: "M18 20V10M12 20V4M6 20v-6",
      component: /* @__PURE__ */ import_react7.default.createElement(
        "div",
        { style: { padding: "24px" } },
        /* @__PURE__ */ import_react7.default.createElement(
          "h2",
          {
            style: {
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            },
          },
          "Analytics",
        ),
        /* @__PURE__ */ import_react7.default.createElement(
          "p",
          { style: { color: "rgba(255,255,255,0.4)", fontSize: "14px" } },
          "View your stats and performance here.",
        ),
      ),
    },
    {
      label: "Users",
      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
      component: /* @__PURE__ */ import_react7.default.createElement(
        "div",
        { style: { padding: "24px" } },
        /* @__PURE__ */ import_react7.default.createElement(
          "h2",
          {
            style: {
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            },
          },
          "Users",
        ),
        /* @__PURE__ */ import_react7.default.createElement(
          "p",
          { style: { color: "rgba(255,255,255,0.4)", fontSize: "14px" } },
          "Manage your users and permissions.",
        ),
      ),
    },
    {
      label: "Settings",
      icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
      component: /* @__PURE__ */ import_react7.default.createElement(
        "div",
        { style: { padding: "24px" } },
        /* @__PURE__ */ import_react7.default.createElement(
          "h2",
          {
            style: {
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            },
          },
          "Settings",
        ),
        /* @__PURE__ */ import_react7.default.createElement(
          "p",
          { style: { color: "rgba(255,255,255,0.4)", fontSize: "14px" } },
          "Configure your preferences here.",
        ),
      ),
    },
  ],
}) => {
  const [active, setActive] = (0, import_react7.useState)(0);
  const [collapsed, setCollapsed] = (0, import_react7.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const activeItem = items[active];
  return /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      style: {
        display: "flex",
        height: "480px",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
      },
    },
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        style: {
          width: collapsed ? "60px" : "200px",
          background: bg,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease",
          flexShrink: 0,
          overflow: "hidden",
        },
      },
      /* @__PURE__ */ import_react7.default.createElement(
        "div",
        {
          style: {
            height: "56px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: collapsed ? "0 14px" : "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
            flexShrink: 0,
          },
        },
        /* @__PURE__ */ import_react7.default.createElement(
          "div",
          {
            style: {
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              flexShrink: 0,
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "800",
              color: "#fff",
            },
          },
          logo[0],
        ),
        !collapsed &&
          /* @__PURE__ */ import_react7.default.createElement(
            "span",
            {
              style: {
                fontSize: "14px",
                fontWeight: "800",
                color: "#fff",
                whiteSpace: "nowrap",
              },
            },
            logo,
          ),
      ),
      /* @__PURE__ */ import_react7.default.createElement(
        "nav",
        {
          style: {
            flex: 1,
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            overflowY: "auto",
          },
        },
        items.map((item, i) =>
          /* @__PURE__ */ import_react7.default.createElement(
            "button",
            {
              key: i,
              onClick: () => setActive(i),
              title: collapsed ? item.label : "",
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: collapsed ? "9px 0" : "9px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                width: "100%",
                background: active === i ? alpha(accent, 0.12) : "transparent",
                color: active === i ? accent : "rgba(255,255,255,0.45)",
                borderLeft:
                  active === i
                    ? `2px solid ${accent}`
                    : "2px solid transparent",
              },
              onMouseEnter: (e) => {
                if (active !== i) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }
              },
              onMouseLeave: (e) => {
                if (active !== i) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }
              },
            },
            /* @__PURE__ */ import_react7.default.createElement(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                style: { flexShrink: 0 },
              },
              /* @__PURE__ */ import_react7.default.createElement("path", {
                d: item.icon,
              }),
            ),
            !collapsed &&
              /* @__PURE__ */ import_react7.default.createElement(
                "span",
                {
                  style: {
                    fontSize: "13px",
                    fontWeight: active === i ? "700" : "500",
                    whiteSpace: "nowrap",
                  },
                },
                item.label,
              ),
          ),
        ),
      ),
      /* @__PURE__ */ import_react7.default.createElement(
        "div",
        {
          style: {
            padding: "8px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          },
        },
        /* @__PURE__ */ import_react7.default.createElement(
          "button",
          {
            onClick: () => setCollapsed((c) => !c),
            style: {
              width: "100%",
              padding: "8px",
              borderRadius: "9px",
              border: "none",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
              transition: "all 0.2s",
            },
            onMouseEnter: (e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.7)"),
            onMouseLeave: (e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.3)"),
          },
          /* @__PURE__ */ import_react7.default.createElement(
            "svg",
            {
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
            },
            /* @__PURE__ */ import_react7.default.createElement("path", {
              d: collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6",
            }),
          ),
        ),
      ),
    ),
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        style: {
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          overflow: "auto",
        },
      },
      /* @__PURE__ */ import_react7.default.createElement(
        "div",
        {
          style: {
            height: "56px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "10px",
          },
        },
        /* @__PURE__ */ import_react7.default.createElement("div", {
          style: {
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: accent,
          },
        }),
        /* @__PURE__ */ import_react7.default.createElement(
          "span",
          { style: { fontSize: "14px", fontWeight: "700", color: "#fff" } },
          activeItem == null ? void 0 : activeItem.label,
        ),
      ),
      /* @__PURE__ */ import_react7.default.createElement(
        "div",
        { style: { color: "#fff" } },
        activeItem == null ? void 0 : activeItem.component,
      ),
    ),
  );
};

// src/components/Charts/Charts.jsx
var import_react8 = __toESM(require("react"));
var Charts = ({
  type = "bar",
  data = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 70 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 90 },
    { label: "May", value: 65 },
    { label: "Jun", value: 80 },
    { label: "Jul", value: 100 },
    { label: "Aug", value: 30 },
  ],
  title = "Monthly Stats",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  showGrid = true,
  showValues = true,
}) => {
  const [hovered, setHovered] = (0, import_react8.useState)(null);
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
  const areaPoints =
    `${padL},${padT + chartH} ` +
    points +
    ` ${getX(data.length - 1)},${padT + chartH}`;
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    val: Math.round(min + t * (max - min)),
  }));
  const BarChart = () => {
    const barW = Math.min(28, (chartW / data.length) * 0.55);
    return /* @__PURE__ */ import_react8.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 ${W} ${H}` },
      showGrid &&
        gridLines.map((g, i) =>
          /* @__PURE__ */ import_react8.default.createElement(
            "g",
            { key: i },
            /* @__PURE__ */ import_react8.default.createElement("line", {
              x1: padL,
              y1: g.y,
              x2: W - padR,
              y2: g.y,
              stroke: "rgba(255,255,255,0.05)",
              strokeWidth: "1",
            }),
            /* @__PURE__ */ import_react8.default.createElement(
              "text",
              {
                x: padL - 4,
                y: g.y + 4,
                textAnchor: "end",
                fill: "rgba(255,255,255,0.25)",
                fontSize: "9",
              },
              g.val,
            ),
          ),
        ),
      data.map((d, i) => {
        const x =
          padL + (i / data.length) * chartW + (chartW / data.length - barW) / 2;
        const barH = ((d.value - min) / (max - min || 1)) * chartH;
        const y = padT + chartH - barH;
        const isH = hovered === i;
        return /* @__PURE__ */ import_react8.default.createElement(
          "g",
          {
            key: i,
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
          },
          /* @__PURE__ */ import_react8.default.createElement("rect", {
            x,
            y: padT,
            width: barW,
            height: chartH,
            fill: "transparent",
            rx: "4",
          }),
          /* @__PURE__ */ import_react8.default.createElement("rect", {
            x,
            y,
            width: barW,
            height: barH,
            fill: isH ? accent : alpha(accent, 0.55),
            rx: "4",
            style: { transition: "fill 0.15s" },
          }),
          showValues &&
            isH &&
            /* @__PURE__ */ import_react8.default.createElement(
              "text",
              {
                x: x + barW / 2,
                y: y - 5,
                textAnchor: "middle",
                fill: "#fff",
                fontSize: "9",
                fontWeight: "700",
              },
              d.value,
            ),
          /* @__PURE__ */ import_react8.default.createElement(
            "text",
            {
              x: x + barW / 2,
              y: H - 6,
              textAnchor: "middle",
              fill: "rgba(255,255,255,0.3)",
              fontSize: "9",
            },
            d.label,
          ),
        );
      }),
    );
  };
  const LineChart = () =>
    /* @__PURE__ */ import_react8.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 ${W} ${H}` },
      /* @__PURE__ */ import_react8.default.createElement(
        "defs",
        null,
        /* @__PURE__ */ import_react8.default.createElement(
          "linearGradient",
          { id: "lg", x1: "0", y1: "0", x2: "0", y2: "1" },
          /* @__PURE__ */ import_react8.default.createElement("stop", {
            offset: "0%",
            stopColor: accent,
            stopOpacity: "0.3",
          }),
          /* @__PURE__ */ import_react8.default.createElement("stop", {
            offset: "100%",
            stopColor: accent,
            stopOpacity: "0",
          }),
        ),
      ),
      showGrid &&
        gridLines.map((g, i) =>
          /* @__PURE__ */ import_react8.default.createElement(
            "g",
            { key: i },
            /* @__PURE__ */ import_react8.default.createElement("line", {
              x1: padL,
              y1: g.y,
              x2: W - padR,
              y2: g.y,
              stroke: "rgba(255,255,255,0.05)",
              strokeWidth: "1",
            }),
            /* @__PURE__ */ import_react8.default.createElement(
              "text",
              {
                x: padL - 4,
                y: g.y + 4,
                textAnchor: "end",
                fill: "rgba(255,255,255,0.25)",
                fontSize: "9",
              },
              g.val,
            ),
          ),
        ),
      /* @__PURE__ */ import_react8.default.createElement("polygon", {
        points: areaPoints,
        fill: "url(#lg)",
      }),
      /* @__PURE__ */ import_react8.default.createElement("polyline", {
        points,
        fill: "none",
        stroke: accent,
        strokeWidth: "2",
        strokeLinejoin: "round",
        strokeLinecap: "round",
      }),
      data.map((d, i) => {
        const isH = hovered === i;
        return /* @__PURE__ */ import_react8.default.createElement(
          "g",
          {
            key: i,
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
          },
          /* @__PURE__ */ import_react8.default.createElement("circle", {
            cx: getX(i),
            cy: getY(d.value),
            r: "10",
            fill: "transparent",
          }),
          /* @__PURE__ */ import_react8.default.createElement("circle", {
            cx: getX(i),
            cy: getY(d.value),
            r: isH ? 5 : 3,
            fill: isH ? "#fff" : accent,
            stroke: accent,
            strokeWidth: "2",
            style: { transition: "all 0.15s" },
          }),
          showValues &&
            isH &&
            /* @__PURE__ */ import_react8.default.createElement(
              "text",
              {
                x: getX(i),
                y: getY(d.value) - 10,
                textAnchor: "middle",
                fill: "#fff",
                fontSize: "9",
                fontWeight: "700",
              },
              d.value,
            ),
          /* @__PURE__ */ import_react8.default.createElement(
            "text",
            {
              x: getX(i),
              y: H - 6,
              textAnchor: "middle",
              fill: "rgba(255,255,255,0.3)",
              fontSize: "9",
            },
            d.label,
          ),
        );
      }),
    );
  const PieChart = () => {
    var _a, _b;
    const cx = W / 2,
      cy = H / 2 - 4,
      r = Math.min(H, W) / 2 - 24;
    const total = data.reduce((s, d) => s + d.value, 0);
    const colors = [
      accent,
      alpha(accent, 0.75),
      alpha(accent, 0.55),
      alpha(accent, 0.4),
      alpha(accent, 0.3),
      alpha(accent, 0.2),
      alpha(accent, 0.12),
    ];
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
      const slice = {
        path,
        color: colors[i % colors.length],
        d,
        angle,
        lx,
        ly,
        i,
      };
      startAngle += angle;
      return slice;
    });
    return /* @__PURE__ */ import_react8.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 ${W} ${H}` },
      slices.map((s) =>
        /* @__PURE__ */ import_react8.default.createElement(
          "g",
          {
            key: s.i,
            onMouseEnter: () => setHovered(s.i),
            onMouseLeave: () => setHovered(null),
          },
          /* @__PURE__ */ import_react8.default.createElement("path", {
            d: s.path,
            fill: s.color,
            stroke: bg,
            strokeWidth: "2",
            transform:
              hovered === s.i
                ? `translate(${Math.cos(s.angle / 2 - Math.PI / 2) * 4}, ${Math.sin(s.angle / 2 - Math.PI / 2) * 4})`
                : "",
            style: { transition: "transform 0.15s", cursor: "pointer" },
          }),
        ),
      ),
      hovered !== null &&
        /* @__PURE__ */ import_react8.default.createElement(
          import_react8.default.Fragment,
          null,
          /* @__PURE__ */ import_react8.default.createElement(
            "text",
            {
              x: cx,
              y: cy - 8,
              textAnchor: "middle",
              fill: "#fff",
              fontSize: "16",
              fontWeight: "800",
            },
            (_a = data[hovered]) == null ? void 0 : _a.value,
          ),
          /* @__PURE__ */ import_react8.default.createElement(
            "text",
            {
              x: cx,
              y: cy + 10,
              textAnchor: "middle",
              fill: "rgba(255,255,255,0.4)",
              fontSize: "9",
            },
            (_b = data[hovered]) == null ? void 0 : _b.label,
          ),
        ),
      hovered === null &&
        /* @__PURE__ */ import_react8.default.createElement(
          "text",
          {
            x: cx,
            y: cy + 5,
            textAnchor: "middle",
            fill: "rgba(255,255,255,0.2)",
            fontSize: "9",
          },
          "Hover slice",
        ),
    );
  };
  const AreaChart = () =>
    /* @__PURE__ */ import_react8.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 ${W} ${H}` },
      /* @__PURE__ */ import_react8.default.createElement(
        "defs",
        null,
        /* @__PURE__ */ import_react8.default.createElement(
          "linearGradient",
          { id: "ag", x1: "0", y1: "0", x2: "0", y2: "1" },
          /* @__PURE__ */ import_react8.default.createElement("stop", {
            offset: "0%",
            stopColor: accent,
            stopOpacity: "0.5",
          }),
          /* @__PURE__ */ import_react8.default.createElement("stop", {
            offset: "100%",
            stopColor: accent,
            stopOpacity: "0.02",
          }),
        ),
      ),
      showGrid &&
        gridLines.map((g, i) =>
          /* @__PURE__ */ import_react8.default.createElement(
            "g",
            { key: i },
            /* @__PURE__ */ import_react8.default.createElement("line", {
              x1: padL,
              y1: g.y,
              x2: W - padR,
              y2: g.y,
              stroke: "rgba(255,255,255,0.05)",
              strokeWidth: "1",
            }),
            /* @__PURE__ */ import_react8.default.createElement(
              "text",
              {
                x: padL - 4,
                y: g.y + 4,
                textAnchor: "end",
                fill: "rgba(255,255,255,0.25)",
                fontSize: "9",
              },
              g.val,
            ),
          ),
        ),
      /* @__PURE__ */ import_react8.default.createElement("polygon", {
        points: areaPoints,
        fill: "url(#ag)",
      }),
      /* @__PURE__ */ import_react8.default.createElement("polyline", {
        points,
        fill: "none",
        stroke: accent,
        strokeWidth: "1.5",
        strokeLinejoin: "round",
        strokeLinecap: "round",
      }),
      data.map((d, i) =>
        /* @__PURE__ */ import_react8.default.createElement(
          "g",
          {
            key: i,
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
          },
          /* @__PURE__ */ import_react8.default.createElement("rect", {
            x: getX(i) - 12,
            y: padT,
            width: 24,
            height: chartH,
            fill: "transparent",
          }),
          hovered === i &&
            /* @__PURE__ */ import_react8.default.createElement(
              import_react8.default.Fragment,
              null,
              /* @__PURE__ */ import_react8.default.createElement("line", {
                x1: getX(i),
                y1: padT,
                x2: getX(i),
                y2: padT + chartH,
                stroke: "rgba(255,255,255,0.1)",
                strokeWidth: "1",
                strokeDasharray: "3 3",
              }),
              showValues &&
                /* @__PURE__ */ import_react8.default.createElement(
                  "text",
                  {
                    x: getX(i),
                    y: getY(d.value) - 10,
                    textAnchor: "middle",
                    fill: "#fff",
                    fontSize: "9",
                    fontWeight: "700",
                  },
                  d.value,
                ),
            ),
          /* @__PURE__ */ import_react8.default.createElement(
            "text",
            {
              x: getX(i),
              y: H - 6,
              textAnchor: "middle",
              fill: "rgba(255,255,255,0.3)",
              fontSize: "9",
            },
            d.label,
          ),
        ),
      ),
    );
  const renderChart = () => {
    if (type === "line")
      return /* @__PURE__ */ import_react8.default.createElement(
        LineChart,
        null,
      );
    if (type === "pie")
      return /* @__PURE__ */ import_react8.default.createElement(
        PieChart,
        null,
      );
    if (type === "area")
      return /* @__PURE__ */ import_react8.default.createElement(
        AreaChart,
        null,
      );
    return /* @__PURE__ */ import_react8.default.createElement(BarChart, null);
  };
  return /* @__PURE__ */ import_react8.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid rgba(255,255,255,0.07)",
        width: "100%",
        maxWidth: "360px",
        boxSizing: "border-box",
      },
    },
    /* @__PURE__ */ import_react8.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        },
      },
      /* @__PURE__ */ import_react8.default.createElement(
        "p",
        {
          style: {
            fontSize: "14px",
            fontWeight: "700",
            color: "#fff",
            margin: 0,
          },
        },
        title,
      ),
      /* @__PURE__ */ import_react8.default.createElement(
        "span",
        {
          style: {
            fontSize: "10px",
            fontWeight: "700",
            padding: "3px 9px",
            borderRadius: "6px",
            background: alpha(accent, 0.12),
            color: accent,
            border: `1px solid ${alpha(accent, 0.25)}`,
            textTransform: "capitalize",
          },
        },
        type,
      ),
    ),
    renderChart(),
  );
};

// src/components/ImageCard/ImageCard.jsx
var import_react9 = __toESM(require("react"));
var ImageCard = ({
  image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  tag = "Travel",
  title = "Discover the Hidden Peaks of the Himalayas",
  description = "A breathtaking journey through untouched landscapes, ancient monasteries, and snow-capped summits that few have ever seen.",
  buttonText = "Read More",
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  onButtonClick = () => {},
}) => {
  const [hovered, setHovered] = (0, import_react9.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  return /* @__PURE__ */ import_react9.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: bg,
        borderRadius: radius,
        overflow: "hidden",
        width: "300px",
        border: `1px solid ${hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"}`,
        fontFamily: "system-ui, sans-serif",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.5)`
          : "0 4px 20px rgba(0,0,0,0.3)",
      },
    },
    /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: "100%",
          height: "180px",
          overflow: "hidden",
        },
      },
      /* @__PURE__ */ import_react9.default.createElement("img", {
        src: image,
        alt: title,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.4s ease",
        },
      }),
      /* @__PURE__ */ import_react9.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        },
      }),
      tag &&
        /* @__PURE__ */ import_react9.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: alpha(accent, 0.85),
              fontSize: "10px",
              fontWeight: "700",
              color: "#fff",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            },
          },
          tag,
        ),
    ),
    /* @__PURE__ */ import_react9.default.createElement(
      "div",
      { style: { padding: "18px" } },
      /* @__PURE__ */ import_react9.default.createElement(
        "h3",
        {
          style: {
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 8px",
            lineHeight: 1.4,
          },
        },
        title,
      ),
      /* @__PURE__ */ import_react9.default.createElement(
        "p",
        {
          style: {
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.65,
            margin: "0 0 18px",
          },
        },
        description,
      ),
      /* @__PURE__ */ import_react9.default.createElement(
        "button",
        {
          onClick: onButtonClick,
          style: {
            width: "100%",
            padding: "11px",
            borderRadius: "12px",
            border: "none",
            background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`,
            color: "#fff",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.2s",
          },
          onMouseEnter: (e) => (e.currentTarget.style.opacity = "0.85"),
          onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
        },
        buttonText,
      ),
    ),
  );
};

// src/components/ImageSlider/ImageSlider.jsx
var import_react10 = __toESM(require("react"));
var ImageSlider = ({
  images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      title: "Hidden Peaks of Himalayas",
      tag: "Travel",
    },
    {
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      title: "City Lights at Night",
      tag: "Urban",
    },
    {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      title: "Tropical Beach Paradise",
      tag: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      title: "Starry Mountain Night",
      tag: "Adventure",
    },
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "20px",
  showDots = true,
  showCaption = true,
  autoPlay = false,
}) => {
  const [current, setCurrent] = (0, import_react10.useState)(0);
  const [dir, setDir] = (0, import_react10.useState)(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const prev = () => {
    setDir("left");
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = () => {
    setDir("right");
    setCurrent((c) => (c + 1) % images.length);
  };
  const goTo = (i) => {
    setDir(i > current ? "right" : "left");
    setCurrent(i);
  };
  const img = images[current];
  return /* @__PURE__ */ import_react10.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        overflow: "hidden",
        width: "300px",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      },
    },
    /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
          background: "#000",
        },
      },
      /* @__PURE__ */ import_react10.default.createElement("img", {
        key: current,
        src: img.src,
        alt: img.title,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          animation: `sliderFade 0.35s ease`,
        },
      }),
      /* @__PURE__ */ import_react10.default.createElement(
        "style",
        null,
        `@keyframes sliderFade { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }`,
      ),
      /* @__PURE__ */ import_react10.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
        },
      }),
      img.tag &&
        /* @__PURE__ */ import_react10.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: alpha(accent, 0.85),
              fontSize: "10px",
              fontWeight: "700",
              color: "#fff",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            },
          },
          img.tag,
        ),
      /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "4px 10px",
            borderRadius: "20px",
            background: "rgba(0,0,0,0.5)",
            fontSize: "10px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.7)",
          },
        },
        current + 1,
        " / ",
        images.length,
      ),
      /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          onClick: prev,
          style: {
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
            padding: 0,
          },
          onMouseEnter: (e) =>
            (e.currentTarget.style.background = alpha(accent, 0.8)),
          onMouseLeave: (e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.5)"),
        },
        /* @__PURE__ */ import_react10.default.createElement(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
          },
          /* @__PURE__ */ import_react10.default.createElement("polyline", {
            points: "15 18 9 12 15 6",
          }),
        ),
      ),
      /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          onClick: next,
          style: {
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
            padding: 0,
          },
          onMouseEnter: (e) =>
            (e.currentTarget.style.background = alpha(accent, 0.8)),
          onMouseLeave: (e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.5)"),
        },
        /* @__PURE__ */ import_react10.default.createElement(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
          },
          /* @__PURE__ */ import_react10.default.createElement("polyline", {
            points: "9 18 15 12 9 6",
          }),
        ),
      ),
    ),
    showCaption &&
      /* @__PURE__ */ import_react10.default.createElement(
        "div",
        { style: { padding: "14px 16px 4px" } },
        /* @__PURE__ */ import_react10.default.createElement(
          "p",
          {
            style: {
              fontSize: "14px",
              fontWeight: "700",
              color: "#fff",
              margin: 0,
              lineHeight: 1.4,
              animation: "sliderFade 0.3s ease",
            },
            key: current + "-title",
          },
          img.title,
        ),
      ),
    showDots &&
      /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            padding: "12px 16px 16px",
          },
        },
        images.map((_, i) =>
          /* @__PURE__ */ import_react10.default.createElement("button", {
            key: i,
            onClick: () => goTo(i),
            style: {
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === current ? accent : "rgba(255,255,255,0.2)",
              transition: "all 0.25s ease",
            },
          }),
        ),
      ),
  );
};

// src/components/BackgoundImageSlider/BackgoundImageSlider.jsx
var import_react11 = __toESM(require("react"));
var BackgoundImageSlider = ({
  images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      tag: "Travel",
      title: "Hidden Peaks of the Himalayas",
      description:
        "A breathtaking journey through untouched landscapes and ancient monasteries.",
    },
    {
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80",
      tag: "Urban",
      title: "City Lights at Night",
      description:
        "Explore the vibrant energy of the world's most iconic skylines after dark.",
    },
    {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80",
      tag: "Nature",
      title: "Tropical Beach Paradise",
      description:
        "Crystal clear waters and white sand beaches that feel like the edge of the world.",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80",
      tag: "Adventure",
      title: "Starry Mountain Night",
      description:
        "Where silence meets the cosmos \u2014 a night sky like you've never seen before.",
    },
  ],
  width = "100%",
  height = "520px",
  accent = "#6366f1",
  radius = "0px",
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 4e3,
}) => {
  const [current, setCurrent] = (0, import_react11.useState)(0);
  const [animating, setAnimating] = (0, import_react11.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const go = (0, import_react11.useCallback)(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + images.length) % images.length);
      setTimeout(() => setAnimating(false), 400);
    },
    [animating, images.length],
  );
  const prev = () => go(current - 1);
  const next = () => go(current + 1);
  (0, import_react11.useEffect)(() => {
    if (!autoPlay) return;
    const t = setInterval(() => go(current + 1), autoPlayInterval);
    return () => clearInterval(t);
  }, [autoPlay, autoPlayInterval, current, go]);
  const img = images[current];
  return /* @__PURE__ */ import_react11.default.createElement(
    import_react11.default.Fragment,
    null,
    /* @__PURE__ */ import_react11.default.createElement(
      "style",
      null,
      `
        @keyframes hs-fade { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
        @keyframes hs-up   { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .hs-prev:hover, .hs-next:hover { background: rgba(0,0,0,0.65) !important; border-color: rgba(255,255,255,0.35) !important; }
      `,
    ),
    /* @__PURE__ */ import_react11.default.createElement(
      "div",
      {
        style: {
          position: "relative",
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
          userSelect: "none",
        },
      },
      /* @__PURE__ */ import_react11.default.createElement("img", {
        key: current,
        src: img.src,
        alt: img.title,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          animation: "hs-fade 0.4s ease",
        },
      }),
      /* @__PURE__ */ import_react11.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
        },
      }),
      img.tag &&
        /* @__PURE__ */ import_react11.default.createElement(
          "div",
          {
            key: current + "-tag",
            style: {
              position: "absolute",
              top: "24px",
              left: "28px",
              padding: "5px 14px",
              borderRadius: "20px",
              background: alpha(accent, 0.85),
              fontSize: "11px",
              fontWeight: "700",
              color: "#fff",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              animation: "hs-up 0.4s ease",
            },
          },
          img.tag,
        ),
      /* @__PURE__ */ import_react11.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: "24px",
            right: "28px",
            padding: "5px 12px",
            borderRadius: "20px",
            background: "rgba(0,0,0,0.45)",
            fontSize: "11px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.7)",
          },
        },
        current + 1,
        " / ",
        images.length,
      ),
      /* @__PURE__ */ import_react11.default.createElement(
        "button",
        {
          className: "hs-prev",
          onClick: prev,
          style: {
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            padding: 0,
            zIndex: 10,
          },
        },
        /* @__PURE__ */ import_react11.default.createElement(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react11.default.createElement("polyline", {
            points: "15 18 9 12 15 6",
          }),
        ),
      ),
      /* @__PURE__ */ import_react11.default.createElement(
        "button",
        {
          className: "hs-next",
          onClick: next,
          style: {
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            padding: 0,
            zIndex: 10,
          },
        },
        /* @__PURE__ */ import_react11.default.createElement(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react11.default.createElement("polyline", {
            points: "9 18 15 12 9 6",
          }),
        ),
      ),
      /* @__PURE__ */ import_react11.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: showDots ? "56px" : "28px",
            left: "28px",
            right: "28px",
            zIndex: 5,
          },
        },
        /* @__PURE__ */ import_react11.default.createElement(
          "h2",
          {
            key: current + "-title",
            style: {
              fontSize: "clamp(20px, 4vw, 36px)",
              fontWeight: "800",
              color: "#fff",
              margin: "0 0 8px",
              lineHeight: 1.25,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              animation: "hs-up 0.45s ease",
              maxWidth: "600px",
            },
          },
          img.title,
        ),
        /* @__PURE__ */ import_react11.default.createElement(
          "p",
          {
            key: current + "-desc",
            style: {
              fontSize: "clamp(13px, 2vw, 15px)",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              lineHeight: 1.6,
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              animation: "hs-up 0.5s ease",
              maxWidth: "500px",
            },
          },
          img.description,
        ),
      ),
      showDots &&
        /* @__PURE__ */ import_react11.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "20px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              zIndex: 5,
            },
          },
          images.map((_, i) =>
            /* @__PURE__ */ import_react11.default.createElement("button", {
              key: i,
              onClick: () => go(i),
              style: {
                width: i === current ? "24px" : "7px",
                height: "7px",
                borderRadius: "4px",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === current ? accent : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
              },
            }),
          ),
        ),
    ),
  );
};

// src/components/PageLoader/PageLoader.jsx
var import_react12 = __toESM(require("react"));
var PageLoader = ({
  logo = "VirtualUI",
  accent = "#6366f1",
  bg = "",
  type = "spinner",
  loadingText = "Loading...",
  subText = "",
  duration = 6e3,
  onComplete = () => {},
}) => {
  const [progress, setProgress] = (0, import_react12.useState)(0);
  const [done, setDone] = (0, import_react12.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  (0, import_react12.useEffect)(() => {
    const steps = 100;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [duration]);
  if (done) return null;
  return /* @__PURE__ */ import_react12.default.createElement(
    import_react12.default.Fragment,
    null,
    /* @__PURE__ */ import_react12.default.createElement(
      "style",
      null,
      `
        @keyframes pl-spin  { to { transform: rotate(360deg); } }
        @keyframes pl-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.15);opacity:0.7} }
        @keyframes pl-dot   { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }
        @keyframes pl-fade  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pl-bar   { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `,
    ),
    /* @__PURE__ */ import_react12.default.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          animation: "pl-fade 0.3s ease",
        },
      },
      /* @__PURE__ */ import_react12.default.createElement("div", {
        style: {
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(accent, 0.12)}, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        },
      }),
      /* @__PURE__ */ import_react12.default.createElement("div", {
        style: {
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(accent, 0.08)}, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        },
      }),
      /* @__PURE__ */ import_react12.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "pl-fade 0.4s ease",
          },
        },
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          {
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "800",
              color: "#fff",
              animation:
                type === "pulse" ? `pl-pulse 1.5s ease infinite` : "none",
            },
          },
          logo[0],
        ),
        /* @__PURE__ */ import_react12.default.createElement(
          "span",
          {
            style: {
              fontSize: "20px",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "-0.5px",
            },
          },
          logo,
        ),
      ),
      type === "spinner" &&
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          { style: { position: "relative", width: "56px", height: "56px" } },
          /* @__PURE__ */ import_react12.default.createElement(
            "svg",
            { width: "56", height: "56", viewBox: "0 0 56 56" },
            /* @__PURE__ */ import_react12.default.createElement("circle", {
              cx: "28",
              cy: "28",
              r: "22",
              fill: "none",
              stroke: alpha(accent, 0.12),
              strokeWidth: "4",
            }),
            /* @__PURE__ */ import_react12.default.createElement("circle", {
              cx: "28",
              cy: "28",
              r: "22",
              fill: "none",
              stroke: accent,
              strokeWidth: "4",
              strokeLinecap: "round",
              strokeDasharray: "34.8 104.4",
              style: {
                transformOrigin: "center",
                animation: "pl-spin 0.9s linear infinite",
              },
            }),
          ),
          /* @__PURE__ */ import_react12.default.createElement(
            "span",
            {
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "700",
                color: accent,
              },
            },
            Math.round(progress),
            "%",
          ),
        ),
      type === "dots" &&
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          { style: { display: "flex", gap: "10px", alignItems: "center" } },
          [0, 1, 2].map((i) =>
            /* @__PURE__ */ import_react12.default.createElement("div", {
              key: i,
              style: {
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: accent,
                animation: `pl-dot 1.2s ease infinite`,
                animationDelay: `${i * 0.2}s`,
              },
            }),
          ),
        ),
      type === "pulse" &&
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          { style: { position: "relative", width: "56px", height: "56px" } },
          [0, 1].map((i) =>
            /* @__PURE__ */ import_react12.default.createElement("div", {
              key: i,
              style: {
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: alpha(accent, 0.3),
                animation: `pl-pulse 1.5s ease infinite`,
                animationDelay: `${i * 0.4}s`,
              },
            }),
          ),
          /* @__PURE__ */ import_react12.default.createElement("div", {
            style: {
              position: "absolute",
              inset: "30%",
              borderRadius: "50%",
              background: accent,
            },
          }),
        ),
      type === "ring" &&
        /* @__PURE__ */ import_react12.default.createElement("div", {
          style: {
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: `4px solid ${alpha(accent, 0.15)}`,
            borderTop: `4px solid ${accent}`,
            borderRight: `4px solid ${accent}`,
            animation: "pl-spin 0.9s linear infinite",
          },
        }),
      type === "bar" &&
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          {
            style: {
              width: "200px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            },
          },
          /* @__PURE__ */ import_react12.default.createElement(
            "div",
            {
              style: {
                width: "100%",
                height: "4px",
                background: alpha(accent, 0.15),
                borderRadius: "2px",
                overflow: "hidden",
              },
            },
            /* @__PURE__ */ import_react12.default.createElement("div", {
              style: {
                height: "100%",
                width: `${progress}%`,
                borderRadius: "2px",
                background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)}, ${accent})`,
                backgroundSize: "200% 100%",
                animation: "pl-bar 1.2s linear infinite",
                transition: "width 0.03s linear",
              },
            }),
          ),
          /* @__PURE__ */ import_react12.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
              },
            },
            /* @__PURE__ */ import_react12.default.createElement(
              "span",
              null,
              loadingText,
            ),
            /* @__PURE__ */ import_react12.default.createElement(
              "span",
              null,
              Math.round(progress),
              "%",
            ),
          ),
          subText &&
            /* @__PURE__ */ import_react12.default.createElement(
              "p",
              {
                style: {
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.18)",
                  margin: "4px 0 0",
                  textAlign: "center",
                },
              },
              subText,
            ),
        ),
      type !== "bar" &&
        /* @__PURE__ */ import_react12.default.createElement(
          "div",
          { style: { textAlign: "center" } },
          /* @__PURE__ */ import_react12.default.createElement(
            "p",
            {
              style: {
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                margin: "0 0 4px",
              },
            },
            loadingText,
          ),
          subText &&
            /* @__PURE__ */ import_react12.default.createElement(
              "p",
              {
                style: {
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.15)",
                  margin: 0,
                },
              },
              subText,
            ),
        ),
    ),
  );
};

// src/components/OTPInput/OTPInput.jsx
var import_react13 = __toESM(require("react"));
var OTPInput = ({
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
  const [otp, setOtp] = (0, import_react13.useState)(Array(length).fill(""));
  const [focused, setFocused] = (0, import_react13.useState)(0);
  const [completed, setCompleted] = (0, import_react13.useState)(false);
  const [resendTimer, setResendTimer] = (0, import_react13.useState)(30);
  const inputs = (0, import_react13.useRef)([]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  (0, import_react13.useEffect)(() => {
    var _a;
    (_a = inputs.current[0]) == null ? void 0 : _a.focus();
  }, []);
  (0, import_react13.useEffect)(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => s - 1), 1e3);
    return () => clearInterval(t);
  }, [resendTimer]);
  const handleChange = (e, i) => {
    var _a;
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < length - 1) {
      (_a = inputs.current[i + 1]) == null ? void 0 : _a.focus();
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
    var _a, _b, _c;
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[i]) {
        newOtp[i] = "";
        setOtp(newOtp);
      } else if (i > 0) {
        newOtp[i - 1] = "";
        setOtp(newOtp);
        (_a = inputs.current[i - 1]) == null ? void 0 : _a.focus();
        setFocused(i - 1);
      }
      setCompleted(false);
    }
    if (e.key === "ArrowLeft" && i > 0) {
      (_b = inputs.current[i - 1]) == null ? void 0 : _b.focus();
      setFocused(i - 1);
    }
    if (e.key === "ArrowRight" && i < length - 1) {
      (_c = inputs.current[i + 1]) == null ? void 0 : _c.focus();
      setFocused(i + 1);
    }
  };
  const handlePaste = (e) => {
    var _a;
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((ch, i) => {
      newOtp[i] = ch;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, length - 1);
    (_a = inputs.current[nextIndex]) == null ? void 0 : _a.focus();
    setFocused(nextIndex);
    if (newOtp.every((v) => v !== "")) {
      setCompleted(true);
      onComplete(newOtp.join(""));
    }
  };
  const handleResend = () => {
    var _a;
    setOtp(Array(length).fill(""));
    setCompleted(false);
    setResendTimer(30);
    (_a = inputs.current[0]) == null ? void 0 : _a.focus();
    setFocused(0);
    onResend();
  };
  return /* @__PURE__ */ import_react13.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "28px 24px",
        width: "fit-content",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      },
    },
    /* @__PURE__ */ import_react13.default.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: "24px" } },
      /* @__PURE__ */ import_react13.default.createElement(
        "div",
        {
          style: {
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: alpha(accent, 0.12),
            border: `1px solid ${alpha(accent, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          },
        },
        /* @__PURE__ */ import_react13.default.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: accent,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react13.default.createElement("rect", {
            x: "2",
            y: "7",
            width: "20",
            height: "14",
            rx: "2",
          }),
          /* @__PURE__ */ import_react13.default.createElement("path", {
            d: "M16 3l-4 4-4-4",
          }),
        ),
      ),
      /* @__PURE__ */ import_react13.default.createElement(
        "p",
        {
          style: {
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 5px",
          },
        },
        label,
      ),
      /* @__PURE__ */ import_react13.default.createElement(
        "p",
        {
          style: {
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
          },
        },
        subLabel,
      ),
    ),
    /* @__PURE__ */ import_react13.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "8px",
        },
      },
      otp.map((val, i) =>
        /* @__PURE__ */ import_react13.default.createElement("input", {
          key: i,
          ref: (el) => (inputs.current[i] = el),
          type: "text",
          inputMode: "numeric",
          maxLength: 1,
          value: val,
          onChange: (e) => handleChange(e, i),
          onKeyDown: (e) => handleKeyDown(e, i),
          onPaste: handlePaste,
          onFocus: () => setFocused(i),
          style: {
            width: "44px",
            height: "52px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
            background: val ? alpha(accent, 0.1) : "rgba(255,255,255,0.04)",
            border: `1.5px solid ${errorText ? "rgba(239,68,68,0.6)" : focused === i ? accent : val ? alpha(accent, 0.4) : "rgba(255,255,255,0.1)"}`,
            borderRadius: "12px",
            outline: "none",
            caretColor: accent,
            transition: "all 0.2s",
            fontFamily: "inherit",
          },
        }),
      ),
    ),
    length === 6 &&
      /* @__PURE__ */ import_react13.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "8px",
          },
        },
        /* @__PURE__ */ import_react13.default.createElement(
          "div",
          { style: { display: "flex", gap: "10px" } },
          [0, 1, 2].map((i) =>
            /* @__PURE__ */ import_react13.default.createElement("div", {
              key: i,
              style: { width: "44px" },
            }),
          ),
          /* @__PURE__ */ import_react13.default.createElement(
            "div",
            {
              style: {
                width: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
            /* @__PURE__ */ import_react13.default.createElement("div", {
              style: {
                width: "6px",
                height: "1.5px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "1px",
              },
            }),
          ),
          [0, 1, 2].map((i) =>
            /* @__PURE__ */ import_react13.default.createElement("div", {
              key: i,
              style: { width: "44px" },
            }),
          ),
        ),
      ),
    errorText &&
      /* @__PURE__ */ import_react13.default.createElement(
        "p",
        {
          style: {
            fontSize: "12px",
            color: "#f87171",
            textAlign: "center",
            margin: "6px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          },
        },
        /* @__PURE__ */ import_react13.default.createElement(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
          },
          /* @__PURE__ */ import_react13.default.createElement("circle", {
            cx: "12",
            cy: "12",
            r: "10",
          }),
          /* @__PURE__ */ import_react13.default.createElement("line", {
            x1: "12",
            y1: "8",
            x2: "12",
            y2: "12",
          }),
          /* @__PURE__ */ import_react13.default.createElement("line", {
            x1: "12",
            y1: "16",
            x2: "12.01",
            y2: "16",
          }),
        ),
        errorText,
      ),
    /* @__PURE__ */ import_react13.default.createElement(
      "button",
      {
        onClick: () => completed && onComplete(otp.join("")),
        disabled: !completed,
        style: {
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          marginTop: "20px",
          background: completed
            ? `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`
            : "rgba(255,255,255,0.06)",
          color: completed ? "#fff" : "rgba(255,255,255,0.25)",
          fontSize: "14px",
          fontWeight: "700",
          cursor: completed ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          transition: "all 0.25s",
        },
      },
      completed
        ? "Verify Code"
        : `Enter ${length - otp.filter((v) => v).length} more digit${length - otp.filter((v) => v).length !== 1 ? "s" : ""}`,
    ),
    /* @__PURE__ */ import_react13.default.createElement(
      "p",
      {
        style: {
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(255,255,255,0.25)",
          margin: "14px 0 0",
        },
      },
      "Didn't receive it?",
      " ",
      /* @__PURE__ */ import_react13.default.createElement(
        "button",
        {
          onClick: handleResend,
          disabled: resendTimer > 0,
          style: {
            background: "transparent",
            border: "none",
            padding: 0,
            fontSize: "12px",
            fontWeight: "700",
            color: resendTimer > 0 ? "rgba(255,255,255,0.25)" : accent,
            cursor: resendTimer > 0 ? "default" : "pointer",
            fontFamily: "inherit",
          },
        },
        resendTimer > 0 ? `${resendText} (${resendTimer}s)` : resendText,
      ),
    ),
  );
};

// src/components/InvoiceCard/InvoiceCard.jsx
var import_react14 = __toESM(require("react"));
var InvoiceCard = ({
  invoiceNumber = "INV-2024-001",
  date = "21 March 2024",
  dueDate = "31 March 2024",
  from = {
    name: "VirtualUI Inc.",
    email: "billing@VirtualUI.com",
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
    { name: "Custom Domain Setup", qty: 1, price: 15 },
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
  const [paid, setPaid] = (0, import_react14.useState)(status === "paid");
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = parseFloat(((subtotal * taxRate) / 100).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  const statusConfig = {
    paid: {
      label: "Paid",
      bg: "rgba(16,185,129,0.15)",
      color: "#34d399",
      border: "rgba(16,185,129,0.3)",
    },
    unpaid: {
      label: "Unpaid",
      bg: "rgba(239,68,68,0.12)",
      color: "#f87171",
      border: "rgba(239,68,68,0.3)",
    },
    pending: {
      label: "Pending",
      bg: "rgba(245,158,11,0.12)",
      color: "#fbbf24",
      border: "rgba(245,158,11,0.3)",
    },
  };
  const sc = statusConfig[paid ? "paid" : status] || statusConfig.unpaid;
  const Row = ({ label, value, bold, large, accentColor }) =>
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 0",
        },
      },
      /* @__PURE__ */ import_react14.default.createElement(
        "span",
        {
          style: {
            fontSize: large ? "14px" : "12px",
            fontWeight: bold ? "700" : "400",
            color: large ? "#fff" : "rgba(255,255,255,0.45)",
          },
        },
        label,
      ),
      /* @__PURE__ */ import_react14.default.createElement(
        "span",
        {
          style: {
            fontSize: large ? "16px" : "13px",
            fontWeight: bold ? "800" : "600",
            color: accentColor || (large ? "#fff" : "rgba(255,255,255,0.85)"),
          },
        },
        currency,
        typeof value === "number" ? value.toFixed(2) : value,
      ),
    );
  return /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "24px",
        width: "340px",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        color: "#fff",
      },
    },
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        },
      },
      /* @__PURE__ */ import_react14.default.createElement(
        "div",
        null,
        /* @__PURE__ */ import_react14.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "4px",
            },
          },
          /* @__PURE__ */ import_react14.default.createElement(
            "div",
            {
              style: {
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.6)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "800",
                color: "#fff",
              },
            },
            "V",
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "span",
            { style: { fontSize: "14px", fontWeight: "800" } },
            from.name,
          ),
        ),
        /* @__PURE__ */ import_react14.default.createElement(
          "p",
          {
            style: {
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            },
          },
          invoiceNumber,
        ),
      ),
      /* @__PURE__ */ import_react14.default.createElement(
        "div",
        {
          style: {
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            background: sc.bg,
            color: sc.color,
            border: `1px solid ${sc.border}`,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          },
        },
        sc.label,
      ),
    ),
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          padding: "14px",
          marginBottom: "20px",
        },
      },
      [
        { label: "From", info: from },
        { label: "To", info: to },
      ].map(({ label, info }) =>
        /* @__PURE__ */ import_react14.default.createElement(
          "div",
          { key: label },
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "10px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "5px",
              },
            },
            label,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "12px",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 2px",
              },
            },
            info.name,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                margin: "0 0 2px",
              },
            },
            info.email,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                margin: 0,
                lineHeight: 1.4,
              },
            },
            info.address,
          ),
        ),
      ),
    ),
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      { style: { display: "flex", gap: "10px", marginBottom: "20px" } },
      [
        { label: "Issue Date", val: date },
        { label: "Due Date", val: dueDate },
      ].map(({ label, val }) =>
        /* @__PURE__ */ import_react14.default.createElement(
          "div",
          {
            key: label,
            style: {
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px",
              padding: "10px 12px",
            },
          },
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 3px",
                fontWeight: "700",
              },
            },
            label,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "p",
            {
              style: {
                fontSize: "12px",
                fontWeight: "700",
                color: "#fff",
                margin: 0,
              },
            },
            val,
          ),
        ),
      ),
    ),
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      { style: { marginBottom: "16px" } },
      /* @__PURE__ */ import_react14.default.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "8px",
            padding: "6px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "4px",
          },
        },
        ["Item", "Qty", "Amount"].map((h) =>
          /* @__PURE__ */ import_react14.default.createElement(
            "span",
            {
              key: h,
              style: {
                fontSize: "10px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                textAlign: h !== "Item" ? "right" : "left",
              },
            },
            h,
          ),
        ),
      ),
      items.map((item, i) =>
        /* @__PURE__ */ import_react14.default.createElement(
          "div",
          {
            key: i,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "8px",
              padding: "8px",
              borderRadius: "8px",
              background:
                i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
            },
          },
          /* @__PURE__ */ import_react14.default.createElement(
            "span",
            { style: { fontSize: "12px", color: "rgba(255,255,255,0.75)" } },
            item.name,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "span",
            {
              style: {
                fontSize: "12px",
                color: "rgba(255,255,255,0.35)",
                textAlign: "right",
              },
            },
            "\xD7",
            item.qty,
          ),
          /* @__PURE__ */ import_react14.default.createElement(
            "span",
            {
              style: {
                fontSize: "12px",
                fontWeight: "600",
                color: "#fff",
                textAlign: "right",
              },
            },
            currency,
            (item.qty * item.price).toFixed(2),
          ),
        ),
      ),
    ),
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        style: {
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          padding: "12px 14px",
          marginBottom: "20px",
        },
      },
      /* @__PURE__ */ import_react14.default.createElement(Row, {
        label: "Subtotal",
        value: subtotal,
      }),
      /* @__PURE__ */ import_react14.default.createElement(Row, {
        label: `Tax (${taxRate}%)`,
        value: tax,
      }),
      /* @__PURE__ */ import_react14.default.createElement("div", {
        style: {
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          margin: "8px 0",
        },
      }),
      /* @__PURE__ */ import_react14.default.createElement(Row, {
        label: "Total",
        value: total,
        bold: true,
        large: true,
        accentColor: accent,
      }),
    ),
    /* @__PURE__ */ import_react14.default.createElement(
      "div",
      { style: { display: "flex", gap: "8px" } },
      !paid &&
        /* @__PURE__ */ import_react14.default.createElement(
          "button",
          {
            onClick: () => {
              setPaid(true);
              onPayClick();
            },
            style: {
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              border: "none",
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 0.7)})`,
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "opacity 0.2s",
            },
            onMouseEnter: (e) => (e.currentTarget.style.opacity = "0.85"),
            onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
          },
          "Pay ",
          currency,
          total.toFixed(2),
        ),
      paid &&
        /* @__PURE__ */ import_react14.default.createElement(
          "div",
          {
            style: {
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#34d399",
            },
          },
          /* @__PURE__ */ import_react14.default.createElement(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
            },
            /* @__PURE__ */ import_react14.default.createElement("polyline", {
              points: "20 6 9 17 4 12",
            }),
          ),
          "Payment Done",
        ),
      /* @__PURE__ */ import_react14.default.createElement(
        "button",
        {
          onClick: onDownloadClick,
          style: {
            width: "42px",
            padding: "11px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          },
        },
        /* @__PURE__ */ import_react14.default.createElement(
          "svg",
          {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react14.default.createElement("path", {
            d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
          }),
        ),
      ),
    ),
  );
};

// src/components/FileUpload/FileUpload.jsx
var import_react15 = __toESM(require("react"));
var FileUpload = ({
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
  const [files, setFiles] = (0, import_react15.useState)([]);
  const [dragging, setDragging] = (0, import_react15.useState)(false);
  const [error, setError] = (0, import_react15.useState)("");
  const inputRef = (0, import_react15.useRef)(null);
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
    if (type.startsWith("image/"))
      return {
        path: "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z",
        color: "#a78bfa",
      };
    if (type.includes("pdf"))
      return {
        path: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
        color: "#f87171",
      };
    if (type.includes("video"))
      return {
        path: "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z",
        color: "#34d399",
      };
    if (type.includes("audio"))
      return {
        path: "M9 18V5l12-2v13M9 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z",
        color: "#fbbf24",
      };
    return {
      path: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
      color: "#94a3b8",
    };
  };
  const processFiles = (incoming) => {
    setError("");
    const valid = [];
    for (const f of incoming) {
      if (f.size > maxSizeMB * 1024 * 1024) {
        setError(`"${f.name}" exceeds ${maxSizeMB}MB limit.`);
        continue;
      }
      valid.push({
        file: f,
        id: Math.random().toString(36).slice(2),
        progress: 0,
        done: false,
      });
    }
    if (!valid.length) return;
    const newFiles = multiple ? [...files, ...valid] : valid;
    setFiles(newFiles);
    valid.forEach(({ id }) => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.floor(Math.random() * 15) + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(t);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, progress: 100, done: true } : f,
            ),
          );
          onUpload(id);
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, progress: p } : f)),
          );
        }
      }, 200);
    });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  };
  const removeFile = (id) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));
  return /* @__PURE__ */ import_react15.default.createElement(
    "div",
    { style: { width: "320px", fontFamily: "system-ui, sans-serif" } },
    /* @__PURE__ */ import_react15.default.createElement(
      "div",
      {
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop: handleDrop,
        style: {
          background: dragging ? alpha(accent, 0.1) : "rgba(255,255,255,0.03)",
          border: `2px dashed ${dragging ? accent : "rgba(255,255,255,0.1)"}`,
          borderRadius: radius,
          padding: "32px 20px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
        },
      },
      /* @__PURE__ */ import_react15.default.createElement("input", {
        ref: inputRef,
        type: "file",
        accept,
        multiple,
        style: { display: "none" },
        onChange: (e) => processFiles(Array.from(e.target.files)),
      }),
      /* @__PURE__ */ import_react15.default.createElement(
        "div",
        {
          style: {
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: alpha(accent, 0.12),
            border: `1px solid ${alpha(accent, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
            transition: "all 0.2s",
            transform: dragging ? "scale(1.1)" : "scale(1)",
          },
        },
        /* @__PURE__ */ import_react15.default.createElement(
          "svg",
          {
            width: "22",
            height: "22",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: accent,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          /* @__PURE__ */ import_react15.default.createElement("path", {
            d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
          }),
        ),
      ),
      /* @__PURE__ */ import_react15.default.createElement(
        "p",
        {
          style: {
            fontSize: "13px",
            fontWeight: "600",
            color: "#fff",
            margin: "0 0 4px",
          },
        },
        label,
      ),
      /* @__PURE__ */ import_react15.default.createElement(
        "p",
        {
          style: {
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
          },
        },
        subLabel,
        " ",
        maxSizeMB,
        "MB",
      ),
    ),
    error &&
      /* @__PURE__ */ import_react15.default.createElement(
        "div",
        {
          style: {
            marginTop: "10px",
            padding: "9px 12px",
            borderRadius: "10px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
        },
        /* @__PURE__ */ import_react15.default.createElement(
          "svg",
          {
            width: "13",
            height: "13",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#f87171",
            strokeWidth: "2.5",
            strokeLinecap: "round",
          },
          /* @__PURE__ */ import_react15.default.createElement("circle", {
            cx: "12",
            cy: "12",
            r: "10",
          }),
          /* @__PURE__ */ import_react15.default.createElement("line", {
            x1: "12",
            y1: "8",
            x2: "12",
            y2: "12",
          }),
          /* @__PURE__ */ import_react15.default.createElement("line", {
            x1: "12",
            y1: "16",
            x2: "12.01",
            y2: "16",
          }),
        ),
        /* @__PURE__ */ import_react15.default.createElement(
          "span",
          { style: { fontSize: "11px", color: "#f87171" } },
          error,
        ),
      ),
    files.length > 0 &&
      /* @__PURE__ */ import_react15.default.createElement(
        "div",
        {
          style: {
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          },
        },
        files.map(({ file, id, progress, done }) => {
          const icon = getIcon(file.type);
          const preview = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null;
          return /* @__PURE__ */ import_react15.default.createElement(
            "div",
            {
              key: id,
              style: {
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${done ? alpha(accent, 0.2) : "rgba(255,255,255,0.07)"}`,
                borderRadius: "12px",
                padding: "10px 12px",
                transition: "border-color 0.3s",
              },
            },
            /* @__PURE__ */ import_react15.default.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: "10px" } },
              /* @__PURE__ */ import_react15.default.createElement(
                "div",
                {
                  style: {
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    flexShrink: 0,
                    background: preview
                      ? `url(${preview}) center/cover`
                      : alpha(icon.color, 0.12),
                    border: `1px solid ${alpha(icon.color, 0.2)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                },
                !preview &&
                  /* @__PURE__ */ import_react15.default.createElement(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: icon.color,
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    },
                    /* @__PURE__ */ import_react15.default.createElement(
                      "path",
                      { d: icon.path },
                    ),
                  ),
              ),
              /* @__PURE__ */ import_react15.default.createElement(
                "div",
                { style: { flex: 1, minWidth: 0 } },
                /* @__PURE__ */ import_react15.default.createElement(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#fff",
                      margin: "0 0 2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  },
                  file.name,
                ),
                /* @__PURE__ */ import_react15.default.createElement(
                  "p",
                  {
                    style: {
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.3)",
                      margin: 0,
                    },
                  },
                  formatSize(file.size),
                ),
              ),
              done
                ? /* @__PURE__ */ import_react15.default.createElement(
                    "div",
                    {
                      style: {
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(16,185,129,0.15)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      },
                    },
                    /* @__PURE__ */ import_react15.default.createElement(
                      "svg",
                      {
                        width: "10",
                        height: "10",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#34d399",
                        strokeWidth: "3",
                        strokeLinecap: "round",
                      },
                      /* @__PURE__ */ import_react15.default.createElement(
                        "polyline",
                        { points: "20 6 9 17 4 12" },
                      ),
                    ),
                  )
                : /* @__PURE__ */ import_react15.default.createElement(
                    "button",
                    {
                      onClick: () => removeFile(id),
                      style: {
                        background: "transparent",
                        border: "none",
                        padding: "2px",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.25)",
                        flexShrink: 0,
                        transition: "color 0.2s",
                      },
                      onMouseEnter: (e) =>
                        (e.currentTarget.style.color = "#f87171"),
                      onMouseLeave: (e) =>
                        (e.currentTarget.style.color =
                          "rgba(255,255,255,0.25)"),
                    },
                    /* @__PURE__ */ import_react15.default.createElement(
                      "svg",
                      {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2.5",
                        strokeLinecap: "round",
                      },
                      /* @__PURE__ */ import_react15.default.createElement(
                        "path",
                        { d: "M18 6L6 18M6 6l12 12" },
                      ),
                    ),
                  ),
            ),
            !done &&
              /* @__PURE__ */ import_react15.default.createElement(
                "div",
                {
                  style: {
                    marginTop: "8px",
                    height: "3px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  },
                },
                /* @__PURE__ */ import_react15.default.createElement("div", {
                  style: {
                    height: "100%",
                    borderRadius: "2px",
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${accent}, ${alpha(accent, 0.6)})`,
                    transition: "width 0.2s ease",
                  },
                }),
              ),
          );
        }),
      ),
  );
};

// src/components/ColorPicker/ColorPicker.jsx
var import_react16 = __toESM(require("react"));
var ColorPicker = ({
  defaultColor = "#6366f1",
  showOpacity = true,
  showEyedropper = true,
  showInput = true,
  accent = "#6366f1",
  bg = "#0f172a",
  radius = "16px",
  onChange = () => {},
  swatches = [
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#ec4899",
    "#f43f5e",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#3b82f6",
    "#0ea5e9",
    "#64748b",
    "#94a3b8",
    "#ffffff",
    "#000000",
  ],
}) => {
  const [color, setColor] = (0, import_react16.useState)(defaultColor);
  const [hex, setHex] = (0, import_react16.useState)(defaultColor);
  const [opacity, setOpacity] = (0, import_react16.useState)(100);
  const [inputErr, setInputErr] = (0, import_react16.useState)(false);
  const [copied, setCopied] = (0, import_react16.useState)(false);
  const alpha = (hexVal, op) => {
    const r = parseInt(hexVal.slice(1, 3), 16);
    const g = parseInt(hexVal.slice(3, 5), 16);
    const b = parseInt(hexVal.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const isValidHex = (v) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
  const applyColor = (val) => {
    if (!isValidHex(val)) {
      setInputErr(true);
      return;
    }
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
    var _a;
    (_a = navigator.clipboard) == null
      ? void 0
      : _a.writeText(hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const hueGradient =
    "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)";
  return /* @__PURE__ */ import_react16.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "20px",
        width: "260px",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      },
    },
    /* @__PURE__ */ import_react16.default.createElement(
      "div",
      {
        style: {
          height: "52px",
          borderRadius: "12px",
          marginBottom: "16px",
          background: alpha(color, opacity / 100),
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        },
      },
      /* @__PURE__ */ import_react16.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(45deg,#555 25%,transparent 25%),linear-gradient(-45deg,#555 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#555 75%),linear-gradient(-45deg,transparent 75%,#555 75%)",
          backgroundSize: "10px 10px",
          backgroundPosition: "0 0,0 5px,5px -5px,-5px 0",
          opacity: 0.3,
        },
      }),
      /* @__PURE__ */ import_react16.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: alpha(color, opacity / 100),
        },
      }),
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "div",
      { style: { position: "relative", marginBottom: "12px" } },
      /* @__PURE__ */ import_react16.default.createElement("input", {
        type: "range",
        min: "0",
        max: "360",
        defaultValue: "240",
        onChange: (e) => {
          const h = e.target.value;
          const c = `hsl(${h},80%,60%)`;
          const el = document.createElement("div");
          el.style.color = c;
          document.body.appendChild(el);
          const rgb = getComputedStyle(el).color;
          document.body.removeChild(el);
          const [r, g, b] = rgb.match(/\d+/g).map(Number);
          const hex6 =
            "#" +
            [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
          pickSwatch(hex6);
        },
        style: {
          width: "100%",
          height: "10px",
          borderRadius: "5px",
          appearance: "none",
          WebkitAppearance: "none",
          background: hueGradient,
          cursor: "pointer",
          outline: "none",
          border: "none",
        },
      }),
    ),
    showOpacity &&
      /* @__PURE__ */ import_react16.default.createElement(
        "div",
        { style: { marginBottom: "16px" } },
        /* @__PURE__ */ import_react16.default.createElement("input", {
          type: "range",
          min: "0",
          max: "100",
          value: opacity,
          onChange: (e) => handleOpacity(Number(e.target.value)),
          style: {
            width: "100%",
            height: "10px",
            borderRadius: "5px",
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(90deg, transparent, ${color})`,
            cursor: "pointer",
            outline: "none",
            border: "none",
          },
        }),
        /* @__PURE__ */ import_react16.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
            },
          },
          /* @__PURE__ */ import_react16.default.createElement(
            "span",
            { style: { fontSize: "10px", color: "rgba(255,255,255,0.25)" } },
            "Opacity",
          ),
          /* @__PURE__ */ import_react16.default.createElement(
            "span",
            {
              style: {
                fontSize: "10px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: "600",
              },
            },
            opacity,
            "%",
          ),
        ),
      ),
    showInput &&
      /* @__PURE__ */ import_react16.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            alignItems: "center",
          },
        },
        /* @__PURE__ */ import_react16.default.createElement("div", {
          style: {
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            flexShrink: 0,
            background: color,
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }),
        /* @__PURE__ */ import_react16.default.createElement("input", {
          value: hex,
          onChange: (e) => {
            setHex(e.target.value);
            setInputErr(false);
          },
          onBlur: (e) => applyColor(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && applyColor(hex),
          placeholder: "#000000",
          style: {
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${inputErr ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "8px",
            padding: "7px 10px",
            fontSize: "12px",
            fontFamily: "monospace",
            color: inputErr ? "#f87171" : "#fff",
            outline: "none",
          },
        }),
        /* @__PURE__ */ import_react16.default.createElement(
          "button",
          {
            onClick: copyHex,
            title: "Copy hex",
            style: {
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              flexShrink: 0,
              background: copied
                ? "rgba(16,185,129,0.15)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: copied ? "#34d399" : "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
            },
          },
          copied
            ? /* @__PURE__ */ import_react16.default.createElement(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                },
                /* @__PURE__ */ import_react16.default.createElement(
                  "polyline",
                  { points: "20 6 9 17 4 12" },
                ),
              )
            : /* @__PURE__ */ import_react16.default.createElement(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                },
                /* @__PURE__ */ import_react16.default.createElement("rect", {
                  x: "9",
                  y: "9",
                  width: "13",
                  height: "13",
                  rx: "2",
                }),
                /* @__PURE__ */ import_react16.default.createElement("path", {
                  d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
                }),
              ),
        ),
      ),
    /* @__PURE__ */ import_react16.default.createElement("div", {
      style: {
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        marginBottom: "14px",
      },
    }),
    /* @__PURE__ */ import_react16.default.createElement(
      "div",
      { style: { display: "flex", flexWrap: "wrap", gap: "7px" } },
      swatches.map((s) =>
        /* @__PURE__ */ import_react16.default.createElement("button", {
          key: s,
          onClick: () => pickSwatch(s),
          title: s,
          style: {
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            background: s,
            border: `2px solid ${color === s ? "#fff" : "transparent"}`,
            cursor: "pointer",
            padding: 0,
            transition: "transform 0.15s, border-color 0.15s",
            outline: "none",
            boxShadow:
              s === "#ffffff" ? "inset 0 0 0 1px rgba(0,0,0,0.15)" : "none",
          },
          onMouseEnter: (e) => (e.currentTarget.style.transform = "scale(1.2)"),
          onMouseLeave: (e) => (e.currentTarget.style.transform = "scale(1)"),
        }),
      ),
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "div",
      {
        style: {
          marginTop: "14px",
          padding: "8px 10px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
      /* @__PURE__ */ import_react16.default.createElement(
        "span",
        {
          style: {
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          },
        },
        "RGBA",
      ),
      /* @__PURE__ */ import_react16.default.createElement(
        "span",
        {
          style: {
            fontSize: "10px",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
          },
        },
        alpha(color, opacity / 100),
      ),
    ),
  );
};

// src/components/RatingStars/RatingStars.jsx
var import_react17 = __toESM(require("react"));
var RatingStars = ({
  defaultRating = 0,
  total = 5,
  size = 32,
  allowHalf = true,
  showLabel = true,
  showCount = true,
  reviewCount = 0,
  readOnly = false,
  accent = "#f59e0b",
  bg = "#0f172a",
  radius = "14px",
  onChange = () => {},
}) => {
  const [rating, setRating] = (0, import_react17.useState)(defaultRating);
  const [hovered, setHovered] = (0, import_react17.useState)(0);
  const labels = ["", "Terrible", "Bad", "Okay", "Good", "Excellent"];
  const halfLabels = {
    0.5: "Awful",
    1: "Terrible",
    1.5: "Very Bad",
    2: "Bad",
    2.5: "Below Average",
    3: "Okay",
    3.5: "Above Average",
    4: "Good",
    4.5: "Great",
    5: "Excellent",
  };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const active = hovered || rating;
  const handleMouseMove = (e, i) => {
    if (readOnly) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      setHovered(half ? i - 0.5 : i);
    } else {
      setHovered(i);
    }
  };
  const handleClick = (e, i) => {
    if (readOnly) return;
    let val;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      val = e.clientX - rect.left < rect.width / 2 ? i - 0.5 : i;
    } else {
      val = i;
    }
    setRating(val);
    onChange(val);
  };
  const StarIcon = ({ index }) => {
    const fill =
      active >= index ? "full" : active >= index - 0.5 ? "half" : "empty";
    const id = `half-${index}`;
    return /* @__PURE__ */ import_react17.default.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        style: {
          cursor: readOnly ? "default" : "pointer",
          transition: "transform 0.1s",
          flexShrink: 0,
        },
        onMouseMove: (e) => handleMouseMove(e, index),
        onMouseLeave: () => !readOnly && setHovered(0),
        onClick: (e) => handleClick(e, index),
        onMouseEnter: (e) => {
          if (!readOnly) e.currentTarget.style.transform = "scale(1.15)";
        },
      },
      /* @__PURE__ */ import_react17.default.createElement(
        "defs",
        null,
        /* @__PURE__ */ import_react17.default.createElement(
          "linearGradient",
          { id },
          /* @__PURE__ */ import_react17.default.createElement("stop", {
            offset: "50%",
            stopColor: accent,
          }),
          /* @__PURE__ */ import_react17.default.createElement("stop", {
            offset: "50%",
            stopColor: "transparent",
          }),
        ),
      ),
      /* @__PURE__ */ import_react17.default.createElement("polygon", {
        points:
          "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26",
        fill:
          fill === "full"
            ? accent
            : fill === "half"
              ? `url(#${id})`
              : "transparent",
        stroke: fill === "empty" ? "rgba(255,255,255,0.15)" : accent,
        strokeWidth: "1.5",
      }),
    );
  };
  return /* @__PURE__ */ import_react17.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: radius,
        padding: "20px 22px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      },
    },
    /* @__PURE__ */ import_react17.default.createElement(
      "div",
      { style: { display: "flex", gap: "4px", alignItems: "center" } },
      Array.from({ length: total }, (_, i) =>
        /* @__PURE__ */ import_react17.default.createElement(StarIcon, {
          key: i + 1,
          index: i + 1,
        }),
      ),
    ),
    showLabel &&
      /* @__PURE__ */ import_react17.default.createElement(
        "div",
        {
          style: {
            fontSize: "14px",
            fontWeight: "700",
            minHeight: "20px",
            color: active > 0 ? accent : "rgba(255,255,255,0.2)",
            transition: "color 0.2s",
          },
        },
        active > 0
          ? allowHalf
            ? halfLabels[active]
            : labels[Math.round(active)]
          : readOnly
            ? "Not rated"
            : "Rate this",
      ),
    (rating > 0 || readOnly) &&
      showCount &&
      /* @__PURE__ */ import_react17.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "8px" } },
        /* @__PURE__ */ import_react17.default.createElement(
          "span",
          {
            style: {
              fontSize: "28px",
              fontWeight: "800",
              color: "#fff",
              lineHeight: 1,
            },
          },
          rating.toFixed(1),
        ),
        /* @__PURE__ */ import_react17.default.createElement(
          "div",
          null,
          /* @__PURE__ */ import_react17.default.createElement(
            "div",
            { style: { display: "flex", gap: "1px", marginBottom: "3px" } },
            Array.from({ length: total }, (_, i) => {
              const fill =
                rating >= i + 1 ? "full" : rating >= i + 0.5 ? "half" : "empty";
              const gid = `sm-${i}`;
              return /* @__PURE__ */ import_react17.default.createElement(
                "svg",
                { key: i, width: "12", height: "12", viewBox: "0 0 24 24" },
                /* @__PURE__ */ import_react17.default.createElement(
                  "defs",
                  null,
                  /* @__PURE__ */ import_react17.default.createElement(
                    "linearGradient",
                    { id: gid },
                    /* @__PURE__ */ import_react17.default.createElement(
                      "stop",
                      { offset: "50%", stopColor: accent },
                    ),
                    /* @__PURE__ */ import_react17.default.createElement(
                      "stop",
                      { offset: "50%", stopColor: "transparent" },
                    ),
                  ),
                ),
                /* @__PURE__ */ import_react17.default.createElement(
                  "polygon",
                  {
                    points:
                      "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26",
                    fill:
                      fill === "full"
                        ? accent
                        : fill === "half"
                          ? `url(#${gid})`
                          : "transparent",
                    stroke:
                      fill === "empty" ? "rgba(255,255,255,0.15)" : accent,
                    strokeWidth: "1.5",
                  },
                ),
              );
            }),
          ),
          reviewCount > 0 &&
            /* @__PURE__ */ import_react17.default.createElement(
              "span",
              { style: { fontSize: "11px", color: "rgba(255,255,255,0.3)" } },
              reviewCount.toLocaleString(),
              " reviews",
            ),
        ),
      ),
    !readOnly &&
      rating === 0 &&
      /* @__PURE__ */ import_react17.default.createElement(
        "p",
        {
          style: {
            fontSize: "11px",
            color: "rgba(255,255,255,0.2)",
            margin: 0,
          },
        },
        allowHalf
          ? "Hover to rate \u2022 Half stars supported"
          : "Click to rate",
      ),
  );
};

// src/components/StatCard/StatCard.jsx
var import_react18 = __toESM(require("react"));
var StatCard = ({
  title = "Active Users",
  value = "128K",
  numericValue = 128e3,
  change = "+12.4%",
  isPositive = true,
  icon = "\u{1F465}",
  bg = "#ffffff",
  accent = "#3b82f6",
  radius = "16px",
  showBadge = true,
  showIcon = true,
  barPercent = 68,
}) => {
  const [count, setCount] = (0, import_react18.useState)(0);
  const [barWidth, setBarWidth] = (0, import_react18.useState)(0);
  const [visible, setVisible] = (0, import_react18.useState)(false);
  const [entered, setEntered] = (0, import_react18.useState)(false);
  const ref = (0, import_react18.useRef)(null);
  (0, import_react18.useEffect)(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  (0, import_react18.useEffect)(() => {
    if (!visible) return;
    setEntered(true);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * numericValue));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, numericValue]);
  (0, import_react18.useEffect)(() => {
    if (!visible) return;
    const t = setTimeout(() => setBarWidth(barPercent), 200);
    return () => clearTimeout(t);
  }, [visible, barPercent]);
  const formatCount = (n) => {
    if (numericValue >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (numericValue >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const uid = accent.replace("#", "sc");
  return /* @__PURE__ */ import_react18.default.createElement(
    import_react18.default.Fragment,
    null,
    /* @__PURE__ */ import_react18.default.createElement(
      "style",
      null,
      `
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
      `,
    ),
    /* @__PURE__ */ import_react18.default.createElement(
      "div",
      {
        ref,
        className: `sc-${uid}${entered ? " entered" : ""}`,
      },
      /* @__PURE__ */ import_react18.default.createElement(
        "div",
        { className: `sc-top-${uid}` },
        showIcon &&
          /* @__PURE__ */ import_react18.default.createElement(
            "div",
            { className: `sc-icon-${uid}` },
            icon,
          ),
        showBadge &&
          /* @__PURE__ */ import_react18.default.createElement(
            "span",
            {
              className: isPositive
                ? `sc-badge-up-${uid}`
                : `sc-badge-down-${uid}`,
            },
            isPositive ? "\u25B2" : "\u25BC",
            " ",
            change,
          ),
      ),
      /* @__PURE__ */ import_react18.default.createElement(
        "div",
        { className: `sc-value-${uid}` },
        visible ? formatCount(count) : "0",
      ),
      /* @__PURE__ */ import_react18.default.createElement(
        "div",
        { className: `sc-label-${uid}` },
        title,
      ),
      /* @__PURE__ */ import_react18.default.createElement(
        "div",
        { className: `sc-track-${uid}` },
        /* @__PURE__ */ import_react18.default.createElement("div", {
          className: `sc-fill-${uid}`,
          style: { width: `${barWidth}%` },
        }),
      ),
    ),
  );
};

// src/components/ProgressBar/ProgressBar.jsx
var import_react19 = __toESM(require("react"));
var ProgressBar = ({
  label = "Progress",
  percentage = 75,
  accent = "#6366f1",
  bg = "#ffffff",
  height = 12,
  showLabel = true,
  showPercent = true,
  type = "default",
  // "default" | "striped" | "circular" | "gradient" | "steps"
  steps = 5,
  // only for type="steps"
}) => {
  const [filled, setFilled] = (0, import_react19.useState)(0);
  const [visible, setVisible] = (0, import_react19.useState)(false);
  const ref = (0, import_react19.useRef)(null);
  (0, import_react19.useEffect)(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  (0, import_react19.useEffect)(() => {
    if (!visible) return;
    const duration = 1200;
    const start = performance.now();
    const target = Math.min(100, Math.max(0, percentage));
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setFilled(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, percentage]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${op})`;
  };
  const uid = (accent + label + type).replace(/[^a-z0-9]/gi, "x");
  const badgeColor =
    filled >= 80 ? "#16a34a" : filled >= 50 ? "#d97706" : "#dc2626";
  const badgeBg =
    filled >= 80 ? "#dcfce7" : filled >= 50 ? "#fef3c7" : "#fee2e2";
  const wrapStyle = {
    fontFamily: "'Sora', sans-serif",
    background: bg,
    borderRadius: "14px",
    padding: "20px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 0.45s ease, transform 0.45s ease",
  };
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const labelEl =
    showLabel &&
    /* @__PURE__ */ import_react19.default.createElement(
      "span",
      { style: { fontSize: "0.85rem", fontWeight: 600, color: "#334155" } },
      label,
    );
  const badgeEl =
    showPercent &&
    /* @__PURE__ */ import_react19.default.createElement(
      "span",
      {
        style: {
          fontSize: "0.72rem",
          fontWeight: 700,
          color: badgeColor,
          background: badgeBg,
          padding: "3px 10px",
          borderRadius: "999px",
          transition: "color 0.4s,background 0.4s",
          fontVariantNumeric: "tabular-nums",
        },
      },
      filled,
      "%",
    );
  if (type === "default")
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react19.default.Fragment,
      null,
      /* @__PURE__ */ import_react19.default.createElement(
        "style",
        null,
        `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        @keyframes pb-pulse-${uid} {
          0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
          50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
        }
      `,
      ),
      /* @__PURE__ */ import_react19.default.createElement(
        "div",
        { ref, style: wrapStyle },
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          labelEl,
          badgeEl,
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          {
            style: {
              width: "100%",
              height,
              borderRadius: "999px",
              background: "#f1f5f9",
              overflow: "hidden",
              position: "relative",
            },
          },
          /* @__PURE__ */ import_react19.default.createElement(
            "div",
            {
              style: {
                height: "100%",
                width: `${filled}%`,
                borderRadius: "999px",
                background: `linear-gradient(90deg,${alpha(accent, 0.7)},${accent})`,
                boxShadow: `0 0 10px ${alpha(accent, 0.35)}`,
                position: "relative",
                transition: "width 0.05s linear",
              },
            },
            /* @__PURE__ */ import_react19.default.createElement("div", {
              style: {
                position: "absolute",
                right: 0,
                top: "50%",
                width: height + 4,
                height: height + 4,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 8px 2px ${alpha(accent, 0.5)}`,
                animation: `pb-pulse-${uid} 1.5s ease-in-out infinite`,
              },
            }),
          ),
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled < 100 ? `${filled} of 100 completed` : "Completed \u2713",
          ),
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled >= 80
              ? "Almost there!"
              : filled >= 50
                ? "Halfway done"
                : "Just started",
          ),
        ),
      ),
    );
  if (type === "striped")
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react19.default.Fragment,
      null,
      /* @__PURE__ */ import_react19.default.createElement(
        "style",
        null,
        `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        @keyframes pb-stripe-${uid} { from{background-position:0 0} to{background-position:32px 0} }
        @keyframes pb-pulse-${uid} {
          0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
          50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
        }
      `,
      ),
      /* @__PURE__ */ import_react19.default.createElement(
        "div",
        { ref, style: wrapStyle },
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          labelEl,
          badgeEl,
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          {
            style: {
              width: "100%",
              height,
              borderRadius: "999px",
              background: "#f1f5f9",
              overflow: "hidden",
              position: "relative",
            },
          },
          /* @__PURE__ */ import_react19.default.createElement(
            "div",
            {
              style: {
                height: "100%",
                width: `${filled}%`,
                borderRadius: "999px",
                background: `linear-gradient(90deg,${alpha(accent, 0.7)},${accent})`,
                boxShadow: `0 0 10px ${alpha(accent, 0.35)}`,
                position: "relative",
                transition: "width 0.05s linear",
              },
            },
            /* @__PURE__ */ import_react19.default.createElement("div", {
              style: {
                position: "absolute",
                inset: 0,
                borderRadius: "999px",
                background:
                  "repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,0.18) 8px,rgba(255,255,255,0.18) 16px)",
                animation: `pb-stripe-${uid} 0.7s linear infinite`,
              },
            }),
            /* @__PURE__ */ import_react19.default.createElement("div", {
              style: {
                position: "absolute",
                right: 0,
                top: "50%",
                width: height + 4,
                height: height + 4,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 8px 2px ${alpha(accent, 0.5)}`,
                animation: `pb-pulse-${uid} 1.5s ease-in-out infinite`,
              },
            }),
          ),
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled < 100 ? `${filled} of 100 completed` : "Completed \u2713",
          ),
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled >= 80
              ? "Almost there!"
              : filled >= 50
                ? "Halfway done"
                : "Just started",
          ),
        ),
      ),
    );
  if (type === "circular") {
    const r = 54;
    const cx = 70;
    const cy = 70;
    const circ = 2 * Math.PI * r;
    const offset = circ - (filled / 100) * circ;
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react19.default.Fragment,
      null,
      /* @__PURE__ */ import_react19.default.createElement(
        "style",
        null,
        `
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
          @keyframes pb-spin-${uid} { from{stroke-dashoffset:${circ}} to{stroke-dashoffset:${offset}} }
        `,
      ),
      /* @__PURE__ */ import_react19.default.createElement(
        "div",
        { ref, style: { ...wrapStyle, alignItems: "center", gap: 16 } },
        /* @__PURE__ */ import_react19.default.createElement(
          "svg",
          { width: "140", height: "140", viewBox: "0 0 140 140" },
          /* @__PURE__ */ import_react19.default.createElement("circle", {
            cx,
            cy,
            r,
            fill: "none",
            stroke: "#f1f5f9",
            strokeWidth: "10",
          }),
          /* @__PURE__ */ import_react19.default.createElement("circle", {
            cx,
            cy,
            r,
            fill: "none",
            stroke: accent,
            strokeWidth: "10",
            strokeLinecap: "round",
            strokeDasharray: circ,
            strokeDashoffset: offset,
            transform: `rotate(-90 ${cx} ${cy})`,
            style: {
              transition: "stroke-dashoffset 0.05s linear",
              filter: `drop-shadow(0 0 6px ${alpha(accent, 0.5)})`,
            },
          }),
          /* @__PURE__ */ import_react19.default.createElement(
            "text",
            {
              x: cx,
              y: cy - 8,
              textAnchor: "middle",
              dominantBaseline: "middle",
              style: {
                fontFamily: "'Sora',sans-serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                fill: "#0f172a",
              },
            },
            filled,
            "%",
          ),
          /* @__PURE__ */ import_react19.default.createElement(
            "text",
            {
              x: cx,
              y: cy + 14,
              textAnchor: "middle",
              dominantBaseline: "middle",
              style: {
                fontFamily: "'Sora',sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                fill: "#94a3b8",
                letterSpacing: "0.05em",
              },
            },
            filled >= 80 ? "GREAT" : filled >= 50 ? "GOOD" : "LOW",
          ),
        ),
        showLabel &&
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            {
              style: { fontSize: "0.85rem", fontWeight: 600, color: "#334155" },
            },
            label,
          ),
      ),
    );
  }
  if (type === "gradient") {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1"];
    const gradStr = colors.map((c, i) => `${c} ${i * 25}%`).join(",");
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react19.default.Fragment,
      null,
      /* @__PURE__ */ import_react19.default.createElement(
        "style",
        null,
        `
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
          @keyframes pb-pulse-${uid} {
            0%,100%{opacity:.9;transform:translateY(-50%) scale(1)}
            50%{opacity:.4;transform:translateY(-50%) scale(1.5)}
          }
        `,
      ),
      /* @__PURE__ */ import_react19.default.createElement(
        "div",
        { ref, style: wrapStyle },
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          labelEl,
          badgeEl,
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          {
            style: {
              width: "100%",
              height,
              borderRadius: "999px",
              background: "#f1f5f9",
              overflow: "hidden",
              position: "relative",
            },
          },
          /* @__PURE__ */ import_react19.default.createElement("div", {
            style: {
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg,${gradStr})`,
              opacity: 0.15,
            },
          }),
          /* @__PURE__ */ import_react19.default.createElement(
            "div",
            {
              style: {
                height: "100%",
                width: `${filled}%`,
                borderRadius: "999px",
                background: `linear-gradient(90deg,${gradStr})`,
                transition: "width 0.05s linear",
                position: "relative",
              },
            },
            /* @__PURE__ */ import_react19.default.createElement("div", {
              style: {
                position: "absolute",
                right: 0,
                top: "50%",
                width: height + 4,
                height: height + 4,
                borderRadius: "50%",
                background: "#fff",
                border: `2px solid ${accent}`,
                animation: `pb-pulse-${uid} 1.5s ease-in-out infinite`,
              },
            }),
          ),
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled < 100 ? `${filled} of 100` : "Completed \u2713",
          ),
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled >= 80
              ? "Almost there!"
              : filled >= 50
                ? "Halfway done"
                : "Just started",
          ),
        ),
      ),
    );
  }
  if (type === "steps") {
    const completedSteps = Math.round((filled / 100) * steps);
    return /* @__PURE__ */ import_react19.default.createElement(
      import_react19.default.Fragment,
      null,
      /* @__PURE__ */ import_react19.default.createElement(
        "style",
        null,
        `
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
          @keyframes pb-popin-${uid} {
            from{transform:scale(0.5);opacity:0}
            to{transform:scale(1);opacity:1}
          }
        `,
      ),
      /* @__PURE__ */ import_react19.default.createElement(
        "div",
        { ref, style: wrapStyle },
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          labelEl,
          badgeEl,
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 0 } },
          Array.from({ length: steps }, (_, i) => {
            const done = i < completedSteps;
            const active = i === completedSteps - 1;
            return /* @__PURE__ */ import_react19.default.createElement(
              import_react19.default.Fragment,
              { key: i },
              /* @__PURE__ */ import_react19.default.createElement(
                "div",
                {
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: done ? accent : "#f1f5f9",
                    border: active
                      ? `2px solid ${accent}`
                      : done
                        ? "none"
                        : "2px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: active
                      ? `0 0 12px ${alpha(accent, 0.4)}`
                      : "none",
                    transition: "background 0.3s,box-shadow 0.3s",
                    animation: done
                      ? `pb-popin-${uid} 0.3s ease ${i * 0.08}s both`
                      : "none",
                  },
                },
                done
                  ? /* @__PURE__ */ import_react19.default.createElement(
                      "svg",
                      {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 14 14",
                        fill: "none",
                      },
                      /* @__PURE__ */ import_react19.default.createElement(
                        "path",
                        {
                          d: "M2.5 7l3.5 3.5 5.5-6",
                          stroke: "#fff",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        },
                      ),
                    )
                  : /* @__PURE__ */ import_react19.default.createElement(
                      "span",
                      {
                        style: {
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#cbd5e1",
                        },
                      },
                      i + 1,
                    ),
              ),
              i < steps - 1 &&
                /* @__PURE__ */ import_react19.default.createElement("div", {
                  style: {
                    flex: 1,
                    height: 3,
                    borderRadius: "999px",
                    background: i < completedSteps - 1 ? accent : "#f1f5f9",
                    transition: "background 0.3s",
                  },
                }),
            );
          }),
        ),
        /* @__PURE__ */ import_react19.default.createElement(
          "div",
          { style: rowStyle },
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            "Step ",
            completedSteps,
            " of ",
            steps,
          ),
          /* @__PURE__ */ import_react19.default.createElement(
            "span",
            { style: { fontSize: "0.7rem", color: "#94a3b8" } },
            filled >= 80
              ? "Almost there!"
              : filled >= 50
                ? "Halfway done"
                : "Just started",
          ),
        ),
      ),
    );
  }
  return null;
};

// src/components/EcommerceCard/EcommerceCard.jsx
var import_react20 = __toESM(require("react"));
var EcommerceCard = ({
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  title = "Wireless Headphones",
  description = "Premium noise-cancelling headphones with 40 hours battery life.",
  price = 199,
  currency = "$",
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onViewDetails = () => {},
}) => {
  const [hovered, setHovered] = (0, import_react20.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react20.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: bg,
        borderRadius: "20px",
        overflow: "hidden",
        width: "300px",
        border:
          "1px solid " +
          (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      },
    },
    /* @__PURE__ */ import_react20.default.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
        },
      },
      /* @__PURE__ */ import_react20.default.createElement("img", {
        src: image,
        alt: title,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.4s ease",
        },
      }),
      /* @__PURE__ */ import_react20.default.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        },
      }),
    ),
    /* @__PURE__ */ import_react20.default.createElement(
      "div",
      { style: { padding: "18px" } },
      /* @__PURE__ */ import_react20.default.createElement(
        "h3",
        {
          style: {
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 8px",
            lineHeight: 1.4,
          },
        },
        title,
      ),
      /* @__PURE__ */ import_react20.default.createElement(
        "p",
        {
          style: {
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.65,
            margin: "0 0 18px",
          },
        },
        description,
      ),
      /* @__PURE__ */ import_react20.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
          },
        },
        /* @__PURE__ */ import_react20.default.createElement(
          "span",
          { style: { fontSize: "24px", fontWeight: "800", color: "#fff" } },
          currency,
          price,
        ),
        /* @__PURE__ */ import_react20.default.createElement(
          "button",
          {
            onClick: onAddToCart,
            style: {
              padding: "8px 16px",
              borderRadius: "12px",
              border: "none",
              background: accent,
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit",
            },
          },
          "Add to Cart",
        ),
      ),
      /* @__PURE__ */ import_react20.default.createElement(
        "button",
        {
          onClick: onViewDetails,
          style: {
            width: "100%",
            padding: "11px",
            borderRadius: "12px",
            border: "1px solid " + alpha(accent, 0.3),
            background: "transparent",
            color: accent,
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
          },
        },
        "View Details",
      ),
    ),
  );
};

// src/components/AnimatedForm/AnimatedForm.jsx
var import_react21 = __toESM(require("react"));
var AnimatedForm = ({
  title = "Contact Us",
  description = "We'll get back to you shortly",
  submitText = "Send Message",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {},
}) => {
  const [name, setName] = (0, import_react21.useState)("");
  const [email, setEmail] = (0, import_react21.useState)("");
  const [message, setMessage] = (0, import_react21.useState)("");
  const [hovered, setHovered] = (0, import_react21.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react21.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: bg,
        borderRadius: "20px",
        padding: "28px",
        width: "400px",
        border:
          "1px solid " +
          (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      },
    },
    /* @__PURE__ */ import_react21.default.createElement(
      "h2",
      {
        style: {
          fontSize: "20px",
          fontWeight: "700",
          color: "#fff",
          margin: "0 0 8px",
        },
      },
      title,
    ),
    /* @__PURE__ */ import_react21.default.createElement(
      "p",
      {
        style: {
          fontSize: "14px",
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 24px",
        },
      },
      description,
    ),
    /* @__PURE__ */ import_react21.default.createElement("input", {
      type: "text",
      placeholder: "Your Name",
      value: name,
      onChange: (e) => setName(e.target.value),
      style: {
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
        fontFamily: "inherit",
      },
    }),
    /* @__PURE__ */ import_react21.default.createElement("input", {
      type: "email",
      placeholder: "Your Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      style: {
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
        fontFamily: "inherit",
      },
    }),
    /* @__PURE__ */ import_react21.default.createElement("textarea", {
      placeholder: "Your Message",
      value: message,
      onChange: (e) => setMessage(e.target.value),
      style: {
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
        resize: "vertical",
      },
    }),
    /* @__PURE__ */ import_react21.default.createElement(
      "button",
      {
        onClick: () => onSubmit({ name, email, message }),
        style: {
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "none",
          background:
            "linear-gradient(135deg, " +
            accent +
            ", " +
            alpha(accent, 0.7) +
            ")",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          fontFamily: "inherit",
        },
      },
      submitText,
    ),
  );
};

// src/components/ReviewCard/ReviewCard.jsx
var import_react22 = __toESM(require("react"));
var ReviewCard = ({
  avatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80",
  name = "John Doe",
  rating = 4,
  review = "This product is fantastic! It exceeded my expectations in every way.",
  date = "2 days ago",
  accent = "#6366f1",
  bg = "#0f172a",
  onProfileClick = () => {},
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react22.default.createElement(
    "div",
    {
      style: {
        background: bg,
        borderRadius: "16px",
        padding: "16px",
        width: "320px",
        fontFamily: "system-ui,sans-serif",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      },
    },
    /* @__PURE__ */ import_react22.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        },
      },
      /* @__PURE__ */ import_react22.default.createElement("img", {
        src: avatar,
        alt: name,
        onClick: onProfileClick,
        style: {
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
        },
      }),
      /* @__PURE__ */ import_react22.default.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "2px" } },
        /* @__PURE__ */ import_react22.default.createElement(
          "div",
          { style: { fontSize: "14px", fontWeight: "700", color: "#fff" } },
          name,
        ),
        /* @__PURE__ */ import_react22.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: "4px" } },
          Array.from({ length: 5 }).map((_, i) =>
            /* @__PURE__ */ import_react22.default.createElement(
              "svg",
              {
                key: i,
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: i < rating ? accent : "rgba(255,255,255,0.15)",
                stroke: "none",
              },
              /* @__PURE__ */ import_react22.default.createElement("path", {
                d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
              }),
            ),
          ),
        ),
      ),
    ),
    /* @__PURE__ */ import_react22.default.createElement(
      "div",
      {
        style: {
          fontSize: "13px",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.5,
          marginBottom: "12px",
        },
      },
      review,
    ),
    /* @__PURE__ */ import_react22.default.createElement(
      "div",
      { style: { fontSize: "11px", color: "rgba(255,255,255,0.4)" } },
      date,
    ),
  );
};

// src/components/Card/Card.jsx
var import_react23 = __toESM(require("react"));
var Card = ({
  title = "Performance",
  description = "Real-time metrics with live dashboard updates every second.",
  icon = "\u26A1",
  tag = "Active",
  onClick,
}) => {
  const [hovered, setHovered] = (0, import_react23.useState)(false);
  return /* @__PURE__ */ import_react23.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick,
      style: {
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "#00000033" : "#0000001a"}`,
        borderRadius: "12px",
        padding: "1.25rem",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        width: "260px",
      },
    },
    /* @__PURE__ */ import_react23.default.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "#1D9E75",
        borderRadius: "12px 12px 0 0",
      },
    }),
    /* @__PURE__ */ import_react23.default.createElement(
      "div",
      {
        style: {
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "#E1F5EE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 14,
        },
      },
      icon,
    ),
    /* @__PURE__ */ import_react23.default.createElement(
      "p",
      {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: "#111",
          margin: "0 0 6px",
        },
      },
      title,
    ),
    /* @__PURE__ */ import_react23.default.createElement(
      "p",
      {
        style: {
          fontSize: 13,
          color: "#666",
          lineHeight: 1.6,
          margin: "0 0 16px",
        },
      },
      description,
    ),
    /* @__PURE__ */ import_react23.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "0.5px solid #0000001a",
          paddingTop: 12,
        },
      },
      /* @__PURE__ */ import_react23.default.createElement(
        "span",
        {
          style: {
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 9px",
            borderRadius: 20,
            background: "#E1F5EE",
            color: "#0F6E56",
          },
        },
        tag,
      ),
      /* @__PURE__ */ import_react23.default.createElement(
        "span",
        {
          style: {
            fontSize: 14,
            color: "#999",
            display: "inline-block",
            transition: "transform 0.2s",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
          },
        },
        "\u2192",
      ),
    ),
  );
};

// src/components/Button/Button.jsx
var import_react24 = __toESM(require("react"));
var Button = ({
  text = "Click Me",
  variant = "gradient",
  // primary | outline | ghost | gradient
  size = "md",
  // sm | md | lg
  icon,
  loading = false,
  disabled = false,
  onClick,
}) => {
  const [hovered, setHovered] = (0, import_react24.useState)(false);
  const variants = {
    primary: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "#2563eb",
      border: "1px solid #2563eb",
    },
    ghost: {
      background: "transparent",
      color: "#111",
      border: "none",
    },
    gradient: {
      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
      color: "#fff",
      border: "none",
    },
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: "12px" },
    md: { padding: "10px 18px", fontSize: "14px" },
    lg: { padding: "14px 24px", fontSize: "16px" },
  };
  return /* @__PURE__ */ import_react24.default.createElement(
    "button",
    {
      onClick,
      disabled: disabled || loading,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        ...variants[variant],
        ...sizes[size],
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: 600,
        fontFamily: "sans-serif",
        // 🔥 Animation
        transform: hovered ? "translateY(-2px) scale(1.02)" : "scale(1)",
        boxShadow: hovered
          ? "0 10px 20px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.6 : 1,
        position: "relative",
        overflow: "hidden",
      },
    },
    /* @__PURE__ */ import_react24.default.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        background: "rgba(255,255,255,0.2)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      },
    }),
    loading
      ? /* @__PURE__ */ import_react24.default.createElement(
          "span",
          null,
          "Loading...",
        )
      : /* @__PURE__ */ import_react24.default.createElement(
          import_react24.default.Fragment,
          null,
          icon &&
            /* @__PURE__ */ import_react24.default.createElement(
              "span",
              null,
              icon,
            ),
          /* @__PURE__ */ import_react24.default.createElement(
            "span",
            null,
            text,
          ),
        ),
  );
};

// src/components/AnimatedButton/AnimatedButton.jsx
var import_react25 = __toESM(require("react"));
var AnimatedButton = ({
  text = "Click Me!",
  bg = "#7c3aed",
  color = "white",
  size = "md",
  width = "auto",
  radius = "12px",
  border = "none",
  weight = "600",
  shadow = "0 4px 14px rgba(124,58,237,0.4)",
  onClick,
}) => {
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  const [hovered, setHovered] = (0, import_react25.useState)(false);
  return /* @__PURE__ */ import_react25.default.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: hovered ? "#6b21a8" : bg,
        color,
        padding: sizes[size],
        width,
        border,
        borderRadius: radius,
        cursor: "pointer",
        fontWeight: weight,
        fontSize: "15px",
        boxShadow: shadow,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease, background 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        letterSpacing: "0.02em",
      },
    },
    text,
  );
};

// src/components/DeleteButton/DeleteButton.jsx
var import_react26 = __toESM(require("react"));
var DeleteButton = ({
  text = "Delete",
  bg = "#e11d48",
  color = "#fff",
  size = "md",
  disabled = false,
  loading = false,
  onClick = () => {},
}) => {
  const sizes = { sm: "8px 16px", md: "11px 24px", lg: "14px 32px" };
  return /* @__PURE__ */ import_react26.default.createElement(
    "button",
    {
      onClick,
      disabled: disabled || loading,
      style: {
        background: bg,
        color,
        padding: sizes[size],
        borderRadius: "10px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 4px 14px rgba(225,29,72,0.4)",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s",
      },
    },
    loading ? "Deleting..." : text,
  );
};

// src/components/StockChart/StockChart.jsx
var import_react27 = __toESM(require("react"));
var StockChart = ({
  data = [
    { value: 120, name: "Jan" },
    { value: 200, name: "Feb" },
    { value: 150, name: "Mar" },
    { value: 220, name: "Apr" },
    { value: 300, name: "May" },
    { value: 280, name: "Jun" },
    { value: 400, name: "Jul" },
  ],
  height = 240,
  width = 500,
  color = "#6366f1",
  bg = "#0f172a",
  showTooltip = true,
  lineWidth = 3,
  dotSize = 6,
  gridLines = true,
}) => {
  const [activeIndex, setActiveIndex] = (0, import_react27.useState)(-1);
  const [dimensions, setDimensions] = (0, import_react27.useState)({
    width: 500,
    height: 240,
  });
  const containerRef = (0, import_react27.useRef)(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  (0, import_react27.useEffect)(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue;
  const step = dimensions.width / (data.length - 1);
  const getYPosition = (value) => {
    return dimensions.height - ((value - minValue) / range) * dimensions.height;
  };
  const generatePath = () => {
    if (data.length < 2) return "";
    let path = "M0 " + getYPosition(data[0].value) + " ";
    for (let i = 1; i < data.length; i++) {
      path += "L" + i * step + " " + getYPosition(data[i].value) + " ";
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
  return /* @__PURE__ */ import_react27.default.createElement(
    "div",
    {
      ref: containerRef,
      style: {
        background: bg,
        borderRadius: "16px",
        padding: "20px",
        width: width + "px",
        height: height + "px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: () => setActiveIndex(-1),
    },
    /* @__PURE__ */ import_react27.default.createElement(
      "svg",
      { width: "100%", height: "100%", style: { overflow: "visible" } },
      gridLines &&
        /* @__PURE__ */ import_react27.default.createElement(
          "g",
          null,
          [0, 0.25, 0.5, 0.75, 1].map((percent, i) =>
            /* @__PURE__ */ import_react27.default.createElement(
              "g",
              { key: i },
              /* @__PURE__ */ import_react27.default.createElement("line", {
                x1: "0",
                y1: dimensions.height * percent,
                x2: dimensions.width,
                y2: dimensions.height * percent,
                stroke: "rgba(255,255,255,0.05)",
                strokeWidth: "1",
                strokeDasharray: "3 3",
              }),
              /* @__PURE__ */ import_react27.default.createElement(
                "text",
                {
                  x: "-30",
                  y: dimensions.height * percent + 4,
                  fill: "rgba(255,255,255,0.3)",
                  fontSize: "10",
                  textAnchor: "end",
                },
                Math.round(minValue + (1 - percent) * range),
              ),
            ),
          ),
        ),
      /* @__PURE__ */ import_react27.default.createElement("path", {
        d: generatePath(),
        fill: "none",
        stroke: color,
        strokeWidth: lineWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      data.map((item, i) =>
        /* @__PURE__ */ import_react27.default.createElement("circle", {
          key: i,
          cx: i * step,
          cy: getYPosition(item.value),
          r: activeIndex === i ? dotSize * 1.5 : dotSize,
          fill: activeIndex === i ? "#fff" : color,
          stroke: activeIndex === i ? color : bg,
          strokeWidth: "2",
          style: { transition: "r 0.2s, fill 0.2s" },
        }),
      ),
      data.map((item, i) =>
        /* @__PURE__ */ import_react27.default.createElement(
          "text",
          {
            key: i,
            x: i * step,
            y: dimensions.height - 5,
            fill: "rgba(255,255,255,0.5)",
            fontSize: "10",
            textAnchor: "middle",
          },
          item.name,
        ),
      ),
      activeIndex >= 0 &&
        showTooltip &&
        /* @__PURE__ */ import_react27.default.createElement(
          "g",
          null,
          /* @__PURE__ */ import_react27.default.createElement("rect", {
            x: activeIndex * step - 25,
            y: getYPosition(data[activeIndex].value) - 40,
            width: "50",
            height: "24",
            rx: "6",
            fill: "rgba(0,0,0,0.7)",
            stroke: color,
            strokeWidth: "1",
          }),
          /* @__PURE__ */ import_react27.default.createElement(
            "text",
            {
              x: activeIndex * step,
              y: getYPosition(data[activeIndex].value) - 25,
              fill: "#fff",
              fontSize: "10",
              textAnchor: "middle",
              fontWeight: "bold",
            },
            data[activeIndex].value,
          ),
          /* @__PURE__ */ import_react27.default.createElement("circle", {
            cx: activeIndex * step,
            cy: getYPosition(data[activeIndex].value),
            r: "3",
            fill: color,
          }),
          /* @__PURE__ */ import_react27.default.createElement("line", {
            x1: activeIndex * step,
            y1: getYPosition(data[activeIndex].value),
            x2: activeIndex * step,
            y2: dimensions.height,
            stroke: alpha(color, 0.3),
            strokeWidth: "1",
            strokeDasharray: "3 3",
          }),
        ),
    ),
    /* @__PURE__ */ import_react27.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: "12px",
          left: "16px",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "700",
        },
      },
      activeIndex >= 0
        ? data[activeIndex].name + " " + data[activeIndex].value
        : "Hover for details",
    ),
  );
};

// src/components/EmployeeIdCard/EmployeeIdCard.jsx
var import_react28 = __toESM(require("react"));
var EmployeeIdCard = ({
  companyName = "Microsoft",
  employeeName = "Lakshay Garg",
  designation = "SWE Intern",
  accent = "#0078d4",
  bg = "#1e293b",
  employeePhoto = "https://randomuser.me/api/portraits/men/32.jpg",
  employeeId = "EMP-2024-0578",
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react28.default.createElement(
    "div",
    {
      style: {
        width: "320px",
        borderRadius: "16px",
        overflow: "hidden",
        background: bg,
        border: "1px solid " + alpha(accent, 0.2),
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        position: "relative",
      },
    },
    /* @__PURE__ */ import_react28.default.createElement(
      "div",
      {
        style: {
          height: "80px",
          background:
            "linear-gradient(90deg, " +
            accent +
            ", " +
            alpha(accent, 0.6) +
            ")",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        },
      },
      /* @__PURE__ */ import_react28.default.createElement(
        "h3",
        {
          style: {
            color: "#fff",
            fontSize: "20px",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "0.5px",
          },
        },
        companyName,
      ),
    ),
    /* @__PURE__ */ import_react28.default.createElement(
      "div",
      { style: { padding: "24px" } },
      /* @__PURE__ */ import_react28.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "16px",
            marginBottom: "20px",
          },
        },
        /* @__PURE__ */ import_react28.default.createElement(
          "div",
          {
            style: {
              width: "80px",
              height: "80px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid " + alpha(accent, 0.4),
            },
          },
          /* @__PURE__ */ import_react28.default.createElement("img", {
            src: employeePhoto,
            alt: employeeName,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }),
        ),
        /* @__PURE__ */ import_react28.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
          },
          /* @__PURE__ */ import_react28.default.createElement(
            "h4",
            {
              style: {
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                margin: "0 0 4px",
              },
            },
            employeeName,
          ),
          /* @__PURE__ */ import_react28.default.createElement(
            "p",
            {
              style: {
                color: accent,
                fontSize: "13px",
                fontWeight: "600",
                margin: 0,
              },
            },
            designation,
          ),
          /* @__PURE__ */ import_react28.default.createElement(
            "p",
            {
              style: {
                color: "rgba(255,255,255,0.5)",
                fontSize: "11px",
                margin: "8px 0 0",
                fontWeight: "500",
              },
            },
            "Employee ID: ",
            employeeId,
          ),
        ),
      ),
      /* @__PURE__ */ import_react28.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px",
            background: alpha(accent, 0.1),
            borderRadius: "8px",
            border: "1px solid " + alpha(accent, 0.15),
          },
        },
        /* @__PURE__ */ import_react28.default.createElement(
          "div",
          null,
          /* @__PURE__ */ import_react28.default.createElement(
            "p",
            {
              style: {
                color: "rgba(255,255,255,0.6)",
                fontSize: "10px",
                margin: "0 0 4px",
                fontWeight: "600",
              },
            },
            "VALID THROUGH",
          ),
          /* @__PURE__ */ import_react28.default.createElement(
            "p",
            {
              style: {
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                margin: 0,
              },
            },
            "Dec 31, 2024",
          ),
        ),
        /* @__PURE__ */ import_react28.default.createElement(
          "div",
          {
            style: {
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            },
          },
          /* @__PURE__ */ import_react28.default.createElement("div", {
            style: {
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              background:
                "linear-gradient(45deg, " +
                accent +
                ", " +
                alpha(accent, 0.5) +
                ")",
            },
          }),
        ),
      ),
    ),
    /* @__PURE__ */ import_react28.default.createElement("div", {
      style: {
        height: "3px",
        background:
          "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.3) + ")",
      },
    }),
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    AnimatedButton,
    AnimatedForm,
    AvatarCard,
    BackgoundImageSlider,
    Button,
    Card,
    Charts,
    ColorPicker,
    DeleteButton,
    EcommerceCard,
    EmployeeIdCard,
    FileUpload,
    Footer,
    ImageCard,
    ImageSlider,
    InvoiceCard,
    Loader,
    Navbar,
    NotificationToast,
    OTPInput,
    PageLoader,
    PricingCard,
    ProgressBar,
    RatingStars,
    ReviewCard,
    Sidebar,
    StatCard,
    StockChart,
  });
