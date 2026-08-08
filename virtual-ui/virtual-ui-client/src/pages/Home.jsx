import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import {
  TbArrowRight,
  TbBrandNpm,
  TbCode,
  TbLayout,
  TbAdjustments,
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbMenu2,
  TbX,
  TbLogout,
  TbComponents,
} from "react-icons/tb";
import { SiValorant } from "react-icons/si";
import Auth from "../components/Auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllComponents, setAllUsers, setUserData } from "../redux/userSlice";
import axios from "axios";
import { ServerUrl } from "../App";

const features = [
  {
    icon: TbLayout,
    title: "Prebuilt UI Components",
    text: "Install VirtualUI and use ready-made, production-grade components instantly.",
  },
  {
    icon: HiSparkles,
    title: "AI Component Generator",
    text: "Describe your UI in plain English and generate React components in seconds.",
  },
  {
    icon: TbAdjustments,
    title: "Customizable Props",
    text: "Modify component props and preview changes in real-time without rebuilding.",
  },
  {
    icon: TbCode,
    title: "Clean JSX Code",
    text: "Copy production-ready JSX directly into your project — zero boilerplate.",
  },
  {
    icon: TbBrandNpm,
    title: "NPM Library",
    text: "Import VirtualUI components with a simple npm install command.",
  },
  {
    icon: TbPlayerPlay,
    title: "Live Preview",
    text: "Instantly preview AI-generated components before exporting your code.",
  },
];

const steps = [
  {
    n: "01",
    title: "Install Library",
    text: "npm install virtual-ui-componenet-library to access all prebuilt UI components.",
  },
  {
    n: "02",
    title: "Use Components",
    text: "Import and customize with props for any design requirement.",
  },
  {
    n: "03",
    title: "Generate with AI",
    text: "Describe your UI and let AI build the component for you.",
  },
  {
    n: "04",
    title: "Copy & Use",
    text: "Paste the clean JSX code straight into your project.",
  },
];

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Admin redirect ──
  useEffect(() => {
    if (userData?.role === "admin") {
      navigate("/admin");
    }
  }, [userData]);

  // Profile popup bahar click karne pe band ho
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install virtual-ui-componenet-library");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateClick = () => {
    if (userData) {
      navigate("/generate");
    } else {
      setShowAuth(true);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setAllComponents(null));
      dispatch(setAllUsers(null));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    setProfileOpen(false);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans',sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');`}</style>

      {/* BG */}
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]">
            <SiValorant size={15} color="#051c20" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            VirtualAI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50">
          <a
            onClick={() => navigate("/component")}
            className="hover:text-white transition-colors duration-200"
          >
            Components
          </a>

          {userData ? (
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3be8ff]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold">
                  {getInitials(userData.name)}
                </div>
                <span className="text-white/80 text-sm font-medium max-w-[100px] truncate">
                  {userData.name}
                </span>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 w-52 bg-[#0a1a1e] border border-white/[0.09] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                  >
                    <div className="px-4 py-3.5 border-b border-white/[0.07]">
                      <p className="text-white/90 font-semibold text-sm truncate">
                        {userData.name}
                      </p>
                      <p className="text-white/40 text-xs truncate mt-0.5">
                        {userData.email || ""}
                      </p>
                    </div>
                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          navigate("/my-components");
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left"
                      >
                        <TbComponents size={16} className="text-[#3be8ff]/70" />
                        My Components
                      </button>
                    </div>
                    <div className="border-t border-white/[0.07] py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors cursor-pointer bg-transparent border-none text-left"
                      >
                        <TbLogout size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.25)] hover:shadow-[0_0_30px_rgba(59,232,255,0.4)] transition-shadow"
            >
              <HiSparkles size={14} /> Generate AI Component
            </motion.button>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden sticky top-[65px] z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/[0.05] px-4 py-4 flex flex-col gap-3"
          >
            <a
              onClick={() => navigate("/component")}
              className="text-sm text-white/60 hover:text-white transition-colors py-1"
            >
              Components
            </a>
            {userData ? (
              <>
                <div className="flex items-center gap-2.5 py-2 border-t border-white/[0.07]">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold">
                    {getInitials(userData.name)}
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {userData.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/my-components");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors py-1 bg-transparent border-none cursor-pointer text-left"
                >
                  <TbComponents size={15} /> My Components
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-red-400/80 hover:text-red-400 transition-colors py-1 bg-transparent border-none cursor-pointer text-left"
                >
                  <TbLogout size={15} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-none mt-1"
              >
                <HiSparkles size={14} /> Generate AI Component
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        <motion.div
          {...fadeUp(0.05)}
          className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/[0.05] rounded-full px-4 py-1.5 mb-6 sm:mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3be8ff] animate-pulse" />
          AI-Powered React UI Library
        </motion.div>

        <motion.h1
          {...fadeUp(0.12)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 sm:mb-6"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          Build React UI
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4]">
            Faster with AI
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-light px-2"
        >
          Use prebuilt VirtualUI components or generate custom ones with AI.
          Copy clean JSX directly into your project in seconds.
        </motion.p>

        <motion.div
          {...fadeUp(0.27)}
          className="flex justify-center mb-7 sm:mb-8 px-2"
        >
          <div className="flex items-center gap-2 sm:gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono w-full max-w-xs sm:max-w-fit">
            <span className="text-[#3be8ff]/60">$</span>
            <span className="text-white/80 truncate">
              npm i virtual-ui-componenet-library
            </span>
            <button
              onClick={handleCopy}
              className="ml-1 text-white/30 hover:text-[#3be8ff] transition-colors cursor-pointer bg-transparent border-none flex-shrink-0"
            >
              {copied ? (
                <TbCheck size={15} className="text-[#3be8ff]" />
              ) : (
                <TbCopy size={15} />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.33)}
          className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0"
        >
          <motion.button
            onClick={() => navigate("/component")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto"
          >
            Get Started <TbArrowRight size={15} />
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerateClick}
            className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent w-full sm:w-auto"
          >
            <HiSparkles size={14} /> Generate AI Component
          </motion.button>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 sm:mt-16 mx-auto max-w-2xl bg-[#0a1a1e]/80 border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-x-auto"
        >
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] text-white/20 font-mono">
              App.jsx
            </span>
          </div>
          <div className="font-mono text-[11px] sm:text-[12.5px] leading-6 space-y-0.5 min-w-[280px]">
            <p>
              <span className="text-[#3be8ff]/60">import</span>{" "}
              <span className="text-white/80">{"{ Button, Card }"}</span>{" "}
              <span className="text-[#3be8ff]/60">from</span>{" "}
              <span className="text-[#aaff80]/70">
                'virtual-ui-componenet-library'
              </span>
              <span className="text-white/30">;</span>
            </p>
            <p className="text-white/20"> </p>
            <p>
              <span className="text-[#3be8ff]/60">export default function</span>{" "}
              <span className="text-[#ffd580]/80">App</span>
              <span className="text-white/50">() {"{"}</span>
            </p>
            <p>
              <span className="text-white/30">{"  return ("}</span>
            </p>
            <p>
              <span className="text-white/30">{"    <"}</span>
              <span className="text-[#3be8ff]/70">Card</span>{" "}
              <span className="text-[#aaff80]/60">title</span>
              <span className="text-white/30">{"="}</span>
              <span className="text-[#aaff80]/70">{'"Dashboard"'}</span>
              <span className="text-white/30">{">"}</span>
            </p>
            <p>
              <span className="text-white/30">{"      <"}</span>
              <span className="text-[#3be8ff]/70">Button</span>{" "}
              <span className="text-[#aaff80]/60">Text</span>
              <span className="text-white/30">{"="}</span>
              <span className="text-[#aaff80]/70">{'"Hello"'}</span>
              <span className="text-white/30">{" />"}</span>
            </p>
            <p>
              <span className="text-white/30">{"    </"}</span>
              <span className="text-[#3be8ff]/70">Card</span>
              <span className="text-white/30">{">"}</span>
            </p>
            <p>
              <span className="text-white/30">{"  );"}</span>
            </p>
            <p>
              <span className="text-white/50">{"}"}</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3">
            What's inside
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Everything you need
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-[#3be8ff]/[0.04] hover:border-[#3be8ff]/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#3be8ff]/[0.08] border border-[#3be8ff]/15 flex items-center justify-center mb-4 group-hover:bg-[#3be8ff]/15 transition-colors">
                <Icon size={18} className="text-[#3be8ff]" />
              </div>
              <h3 className="font-semibold text-white/90 mb-2 text-[15px]">
                {title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3">
            Simple process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            How it works
          </h2>
        </motion.div>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#3be8ff]/20 to-transparent" />
          {steps.map(({ n, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-center group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-[#0e2528] to-[#071518] border border-[#3be8ff]/20 flex flex-col items-center justify-center group-hover:border-[#3be8ff]/40 group-hover:shadow-[0_0_20px_rgba(59,232,255,0.1)] transition-all duration-300">
                <span className="text-[9px] text-[#3be8ff]/60 font-bold tracking-widest">
                  {n}
                </span>
              </div>
              <h3 className="font-semibold text-white/90 mb-2 text-[13px] sm:text-[14px]">
                {title}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl border border-[#3be8ff]/15 bg-gradient-to-br from-[#071518] to-[#040f12] p-8 sm:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,232,255,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 sm:mb-4">
              Start building
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Ready to generate
              <br />
              your new component?
            </h2>
            {userData ? (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
                  Welcome back,{" "}
                  <span className="text-[#3be8ff]/70">{userData.name}</span>!
                  Continue building amazing components.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/generate")}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow"
                  >
                    <HiSparkles size={15} /> Generate Component
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/my-components")}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent"
                  >
                    <TbComponents size={15} /> My Components
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
                  Sign in with Google, get 150 free AI Credits, and start
                  generating production-ready UI components instantly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAuth(true)}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow"
                  >
                    <HiSparkles size={15} /> Get Started Free
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center">
              <SiValorant size={11} color="#051c20" />
            </div>
            <span className="text-sm font-semibold text-white/60">
              VirtualAI
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-xs text-white/30">
            <a
              onClick={() => navigate("/component")}
              className="hover:text-white/60 transition-colors"
            >
              Components
            </a>

            <a className="hover:text-white/60 transition-colors">
              admin@virtualai.com
            </a>
          </div>
          <p className="text-xs text-white/25 order-last sm:order-none">
            © {new Date().getFullYear()} VirtualAI. All rights reserved.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </AnimatePresence>
    </div>
  );
}
