import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbUsers, TbCode, TbLogout, TbPlus, TbLayoutDashboard,
  TbPackage, TbX, TbTrash, TbDeviceFloppy, TbUpload,
  TbEye, TbCodeDots, TbLoader, TbMenu2, TbChevronLeft,
  TbWorld, TbSearch, TbBoxOff,
} from "react-icons/tb";
import { SiValorant } from "react-icons/si";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { ServerUrl } from "../App";
import LiveComponentPreview from "../components/LiveComponentPreview";

// ── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0a1f24] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-[#a78bfa] font-bold">{payload[0].value} components</p>
    </div>
  );
}

// ── PROP TAG INPUT ───────────────────────────────────────────────────────────
function PropsInput({ props, setProps }) {
  const [input, setInput] = useState("");

  const addProp = () => {
    const trimmed = input.trim();
    if (trimmed && !props.includes(trimmed)) {
      setProps([...props, trimmed]);
    }
    setInput("");
  };

  const removeProp = (p) => setProps(props.filter((x) => x !== p));

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {props.map((p) => (
          <span
            key={p}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" }}
          >
            {p}
            <button
              onClick={() => removeProp(p)}
              className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer p-0 leading-none"
              style={{ color: "#a78bfa" }}
            >
              <TbX size={11} />
            </button>
          </span>
        ))}
        {props.length === 0 && (
          <span className="text-xs text-white/20 self-center">No props added yet</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addProp(); }
          }}
          placeholder='e.g. "title", "onClick", "children"'
          className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#a78bfa]/50 transition-colors"
        />
        <button
          onClick={addProp}
          className="px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all whitespace-nowrap"
          style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" }}
        >
          Add
        </button>
      </div>
      <p className="text-[10px] text-white/20 mt-1.5">
        Press <kbd className="px-1 py-0.5 rounded bg-white/5 text-white/40 text-[9px]">Enter</kbd> or comma to add a prop
      </p>
    </div>
  );
}

// ── ADD COMPONENT FORM ───────────────────────────────────────────────────────
function AddComponentForm({ onSaved }) {
  const [name, setName]             = useState("");
  const [props, setProps]           = useState([]);
  const [code, setCode]             = useState("");
  const [codeTab, setCodeTab]       = useState("code");
  const [saving, setSaving]         = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedId, setSavedId]       = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [toast, setToast]           = useState(null);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!name.trim() || !code.trim()) {
      showToast("Component name and code are required.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post(
        `${ServerUrl}/api/component/save`,
        { name: name.trim(), code, props },
        { withCredentials: true }
      );
      setSavedId(res.data._id);
      showToast("Component saved successfully!", "success");
      onSaved && onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedId) return;
    setPublishing(true);
    try {
      await axios.post(
        `${ServerUrl}/api/component/publish`,
        { componentId: savedId },
        { withCredentials: true }
      );
      setIsPublished(true);
      showToast("Published to npm successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Publish failed", "error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl w-full mx-auto">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium"
            style={{
              background: toast.type === "success" ? "#0d9f6e" : toast.type === "error" ? "#e02424" : "#1c1c2e",
              maxWidth: "calc(100vw - 2rem)",
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-base sm:text-lg font-bold mb-1">Add Component</h2>
      <p className="text-white/35 text-xs mb-5 sm:mb-6">
        Manually add a component — give it a name, define props, paste the code and preview it.
      </p>

      <div className="space-y-4 sm:space-y-5">

        {/* ── Component Name ── */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
            Component Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. "PricingCard", "HeroSection"'
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#3be8ff]/40 transition-colors"
          />
        </div>

        {/* ── Props ── */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
            Props
          </label>
          <PropsInput props={props} setProps={setProps} />
        </div>

        {/* ── Code + Preview ── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 border-b border-white/[0.06]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Component Code
            </label>
            <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.3)" }}>
              {["code", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCodeTab(tab)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border-none cursor-pointer"
                  style={{
                    background: codeTab === tab ? "rgba(59,232,255,0.2)" : "transparent",
                    color: codeTab === tab ? "#3be8ff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {tab === "code" ? <TbCodeDots size={12} /> : <TbEye size={12} />}
                  <span className="hidden xs:inline">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {codeTab === "code" ? (
              <motion.div key="code-editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={12}
                  spellCheck={false}
                  placeholder={`export default function MyComponent({ title }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                  className="w-full bg-[#0d1117] px-4 sm:px-5 py-4 text-xs leading-relaxed text-green-300 font-mono resize-none outline-none placeholder-white/10"
                  style={{ minHeight: 220 }}
                />
              </motion.div>
            ) : (
              <motion.div key="code-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3.5 sm:p-4">
                {code.trim() ? (
                  <LiveComponentPreview code={code} />
                ) : (
                  <div
                    className="h-36 sm:h-40 flex items-center justify-center text-white/20 text-sm rounded-xl"
                    style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
                  >
                    Paste some code first to see the preview
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1">

          {/* Save */}
          <motion.button
            onClick={handleSave}
            disabled={saving || !!savedId}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all border-none cursor-pointer"
            style={{
              background: savedId ? "rgba(16,185,129,0.12)" : "rgba(59,232,255,0.12)",
              color: savedId ? "#34d399" : "#3be8ff",
              border: `1px solid ${savedId ? "rgba(16,185,129,0.3)" : "rgba(59,232,255,0.25)"}`,
            }}
          >
            {saving ? (
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <TbDeviceFloppy size={15} />
              </motion.span>
            ) : (
              <TbDeviceFloppy size={15} />
            )}
            {saving ? "Saving..." : savedId ? "Saved ✓" : "Save Component"}
          </motion.button>

          {/* Publish */}
          <AnimatePresence>
            {savedId && !isPublished && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                onClick={handlePublish}
                disabled={publishing}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all border-none cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  boxShadow: publishing ? "none" : "0 0 20px rgba(6,182,212,0.25)",
                  color: "#fff",
                }}
              >
                {publishing ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <TbLoader size={15} />
                  </motion.span>
                ) : (
                  <TbLoader size={15} />
                )}
                {publishing ? "Publishing..." : "Publish to npm"}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Published badge */}
          <AnimatePresence>
            {isPublished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}
              >
                ✓ Published
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset */}
          {(savedId || code || name) && (
            <button
              onClick={() => {
                setName(""); setProps([]); setCode("");
                setSavedId(null); setIsPublished(false); setCodeTab("code");
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all bg-transparent border-none cursor-pointer"
            >
              <TbTrash size={13} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { userData, allUsers, allcomponents } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [componentSearch, setComponentSearch] = useState("");

  // Close sidebar on route/view change
  const handleNavClick = (id) => {
    setActiveView(id);
    setSidebarOpen(false);
  };

  // Close sidebar on outside click
  const sidebarRef = useRef(null);
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const publicComponents = allcomponents?.filter((c) => c.visibility === "public") || [];

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter((c) =>
        c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
        c.props?.some((p) => p.toLowerCase().includes(componentSearch.toLowerCase()))
      )
    : publicComponents;

  const chartData = (() => {
    if (!publicComponents.length) return [];
    const map = {};
    publicComponents.forEach((c) => {
      const raw = c.createdAt || c.created_at;
      if (!raw) return;
      const label = new Date(raw).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      map[label] = (map[label] || 0) + 1;
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, components: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-12);
  })();

  const stats = [
    { label: "Total Users",     value: allUsers?.length      || 0, icon: TbUsers, color: "#3be8ff" },
    { label: "Components Made", value: publicComponents?.length || 0, icon: TbCode,  color: "#a78bfa" },
  ];

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard",     Icon: TbLayoutDashboard },
    { id: "add",       label: "Add Component", Icon: TbPackage          },
  ];

  // ── Sidebar content (shared between mobile drawer & desktop) ──
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] flex-shrink-0">
          <SiValorant size={15} color="#051c20" />
        </div>
        <div>
          <span className="text-base font-bold block">VirtualAI</span>
          <span className="text-[10px] text-[#3be8ff]/60 font-semibold tracking-[2px] uppercase">Admin</span>
        </div>
        {/* Close button – mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
        >
          <TbChevronLeft size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer text-left"
              style={{
                background: isActive ? "rgba(59,232,255,0.08)" : "transparent",
                color: isActive ? "#3be8ff" : "rgba(255,255,255,0.45)",
                borderLeft: isActive ? "2px solid #3be8ff" : "2px solid transparent",
              }}
            >
              <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all cursor-pointer bg-transparent border-none text-left"
        >
          <TbLogout size={16} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @media (max-width: 480px) { .xs\\:inline { display: inline; } }
      `}</style>

      {/* ── DESKTOP SIDEBAR (md+) ── */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/[0.06] fixed top-0 left-0 z-20">
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen bg-[#040e11] border-r border-white/[0.06] md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto">

        {/* Topbar */}
        <div className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between gap-2">

          {/* Left: Hamburger (mobile) + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger – mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all flex-shrink-0"
            >
              <TbMenu2 size={20} />
            </button>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold truncate">
                {activeView === "dashboard" ? "Dashboard" : "Add Component"}
              </h1>
              <p className="text-white/35 text-xs truncate">
                Welcome back, {userData?.name?.split(" ")[0] || "Admin"} 👋
              </p>
            </div>
          </div>

          {/* Right: Generate button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate("/generate")}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#030b0d] bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none flex-shrink-0"
          >
            <TbPlus size={14} />
            <span className="hidden xs:inline">Generate</span>
            <span className="hidden sm:inline">AI Component</span>
          </motion.button>
        </div>

        {/* ── VIEW: DASHBOARD ── */}
        <AnimatePresence mode="wait">
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map(({ label, value, icon: Icon, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] transition-all"
                  >
                    <div className="mb-2.5 sm:mb-3">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                      >
                        <Icon size={15} style={{ color }} />
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">{value.toLocaleString()}</p>
                    <p className="text-white/40 text-xs mt-0.5">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
              >
                <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">Public Components Published</p>
                    <p className="text-white/35 text-xs mt-0.5">Date-wise breakdown</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 flex-shrink-0">
                    Last 12 days
                  </span>
                </div>

                {chartData.length === 0 ? (
                  <div className="h-[180px] sm:h-[220px] flex items-center justify-center text-white/20 text-sm">
                    No public components yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                      <defs>
                        <linearGradient id="componentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#a78bfa" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity={0}   />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)" }} />
                      <Area
                        type="monotone" dataKey="components" stroke="#a78bfa" strokeWidth={2}
                        fill="url(#componentGradient)" dot={false}
                        activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>

              {/* ── Public Components List ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,232,255,0.1)", border: "1px solid rgba(59,232,255,0.2)" }}>
                      <TbWorld size={14} style={{ color: "#3be8ff" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Public Components</p>
                      <p className="text-white/35 text-[11px]">{publicComponents.length} components visible to all users</p>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative w-full sm:w-48">
                    <TbSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder="Search components..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#3be8ff]/40 transition-colors"
                    />
                  </div>
                </div>

                {/* List */}
                {filteredPublicComponents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/20">
                    <TbBoxOff size={32} />
                    <p className="text-sm">
                      {componentSearch ? "No components match your search" : "No public components yet"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {filteredPublicComponents.map((comp, i) => (
                      <motion.div
                        key={comp._id || i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Left: icon + name + props */}
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0"
                            style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}
                          >
                            <TbCode size={14} style={{ color: "#a78bfa" }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{comp.name}</p>
                            {/* Props tags */}
                            {comp.props?.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {comp.props.slice(0, 4).map((p) => (
                                  <span
                                    key={p}
                                    className="px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                                    style={{ background: "rgba(167,139,250,0.1)", color: "rgba(167,139,250,0.7)" }}
                                  >
                                    {p}
                                  </span>
                                ))}
                                {comp.props.length > 4 && (
                                  <span className="px-1.5 py-0.5 rounded-md text-[10px] text-white/25">
                                    +{comp.props.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right: date + badge */}
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                          {comp.createdAt || comp.created_at ? (
                            <span className="text-[11px] text-white/25 whitespace-nowrap">
                              {new Date(comp.createdAt || comp.created_at).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </span>
                          ) : null}
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: "rgba(59,232,255,0.08)", color: "#3be8ff", border: "1px solid rgba(59,232,255,0.2)" }}
                          >
                            <TbWorld size={9} /> public
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

            </motion.div>
          )}

          {/* ── VIEW: ADD COMPONENT ── */}
          {activeView === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AddComponentForm onSaved={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}