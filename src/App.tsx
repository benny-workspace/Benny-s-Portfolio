/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  Smartphone,
  Layers,
  HeartHandshake,
  ShieldCheck,
  Send,
  Star,
  Film,
  Instagram,
  Linkedin,
  Youtube,
  Sun,
  Moon,
  TrendingUp,
  Phone,
  Globe,
  Dumbbell,
  Rocket,
  Zap
} from "lucide-react";

import { NavigationTab, Project, Submission } from "./types";
import { PROJECTS, PRACTICES } from "./data";
import Header from "./components/Header";
import MagicCursor from "./components/MagicCursor";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import BottomBento from "./components/BottomBento";
import ProjectModal from "./components/ProjectModal";
import AdminPanel from "./components/AdminPanel";
import SectionHeader from "./components/SectionHeader";
import { GlowBorderCard } from "./components/GlowBorderCard";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ end, duration = 3000, suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

interface ScrollRevealParagraphProps {
  children: React.ReactNode;
  className?: string;
}

function countCharacters(node: React.ReactNode): number {
  if (typeof node === "string") {
    return node.length;
  }
  if (typeof node === "number") {
    return String(node).length;
  }
  if (Array.isArray(node)) {
    return node.reduce((acc, child) => acc + countCharacters(child), 0);
  }
  if (React.isValidElement(node) && node.props.children) {
    return countCharacters(node.props.children);
  }
  return 0;
}

function ScrollRevealParagraph({ children, className = "" }: ScrollRevealParagraphProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null);

  // useScroll yields smooth hardware-accelerated tracking as element enters/leaves reading zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 45%"],
  });

  const totalChars = React.useMemo(() => countCharacters(children), [children]);

  // Recursively split the React tree into raw spans avoiding expensive component wrapper models
  const splitContent = React.useMemo(() => {
    let charCounter = 0;

    function renderAndSplitPlain(node: React.ReactNode): React.ReactNode {
      if (typeof node === "string" || typeof node === "number") {
        const textStr = String(node);
        const parts = textStr.split(/(\s+)/);
        return parts.map((part, partIdx) => {
          if (/^\s+$/.test(part)) {
            const spaces = part.split("");
            return spaces.map((char) => {
              const globalIdx = charCounter++;
              const blendStyle = {
                opacity: 0.18,
                pointerEvents: "none" as const,
              };
              return (
                <span key={`space-${partIdx}-${globalIdx}`} data-idx={globalIdx} style={blendStyle}>
                  &nbsp;
                </span>
              );
            });
          }

          const chars = part.split("");
          return (
            <span key={`word-${partIdx}`} className="inline-block whitespace-nowrap">
              {chars.map((char, charIdx) => {
                const globalIdx = charCounter++;
                const blendStyle = {
                  opacity: 0.18,
                  pointerEvents: "none" as const,
                };
                return (
                  <span
                    key={`${globalIdx}-${charIdx}`}
                    data-idx={globalIdx}
                    style={blendStyle}
                    className="inline-block transition-opacity duration-75"
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        });
      }

      if (Array.isArray(node)) {
        return node.map((child, idx) => (
          <React.Fragment key={idx}>
            {renderAndSplitPlain(child)}
          </React.Fragment>
        ));
      }

      if (React.isValidElement(node)) {
        const { children: childNodes, ...restProps } = node.props as any;
        if (childNodes !== undefined && childNodes !== null) {
          const splitChildren = renderAndSplitPlain(childNodes);
          return React.cloneElement(node, { ...restProps, key: node.key }, splitChildren);
        }
        return node;
      }

      return node;
    }

    return renderAndSplitPlain(children);
  }, [children]);

  // Handle direct DOM manipulation via scroll progress changes for ultra-performant 120fps rendering
  useEffect(() => {
    if (!containerRef.current) return;

    // Use IntersectionObserver so off-screen text reveal blocks don't consume any CPU cycle!
    let isVisible = false;
    
    // Direct querying of descendant characters in this specific paragraph
    const spanElements = containerRef.current.querySelectorAll("span[data-idx]");
    const part = 1 / Math.max(1, totalChars);

    const updateSpans = (progress: number) => {
      spanElements.forEach((el) => {
        const span = el as HTMLSpanElement;
        const globalIdx = parseInt(span.getAttribute("data-idx") || "0", 10);
        const start = globalIdx * part;
        // 4 units overlap transition range creates organic reading rhythm
        const end = Math.min(1.0, (globalIdx + 4) * part);

        let itemOpacity = 0.18;
        if (progress >= end) {
          itemOpacity = 1.0;
        } else if (progress <= start) {
          itemOpacity = 0.18;
        } else {
          itemOpacity = 0.18 + ((progress - start) / (end - start)) * 0.82;
        }
        span.style.opacity = String(itemOpacity);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            // Re-sync progress when entering view
            updateSpans(scrollYProgress.get());
          }
        });
      },
      { rootMargin: "100px" } // trigger slightly before entering viewport
    );
    observer.observe(containerRef.current);

    // Pre-load opacity immediately right after rendering to eliminate visible jumps
    updateSpans(scrollYProgress.get());

    // Subscribe to raw motion value changes
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isVisible) {
        updateSpans(latest);
      }
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollYProgress, totalChars, splitContent]);

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        mixBlendMode: "difference",
        color: "#ffffff",
      }}
    >
      {splitContent}
    </p>
  );
}

const renderRollingButtonText = (text: string) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "16px", overflow: "hidden", boxSizing: "border-box" }}>
      <p className="rolling-text-inner-offers">
        {text.split("").map((char, index) => (
          <span key={index}>{char === " " ? "\u00a0" : char}</span>
        ))}
      </p>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Synchronize dark/light mode classes with document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  // Synchronize state with URL path or hash and handle browser back/forward buttons
  useEffect(() => {
    const parseUrl = (): NavigationTab => {
      // 1. Check pathname segments first
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1] || "";
      if (["home", "work", "offers", "contact"].includes(lastSegment)) {
        return lastSegment as NavigationTab;
      }

      // 2. Check hash segments next
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (["home", "work", "offers", "contact"].includes(hash)) {
        return hash as NavigationTab;
      }

      return "home";
    };

    const handleLocationChange = () => {
      const tab = parseUrl();
      setActiveTab(tab);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    // Initial parsing on mount
    const initialTab = parseUrl();
    setActiveTab(initialTab);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Scroll to top and update URL history path when active tab changes
  useEffect(() => {
    window.scrollTo(0, 0);

    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || "";
    const hash = window.location.hash.replace(/^#\/?/, "");

    if (lastSegment !== activeTab && hash !== activeTab) {
      // Use clean pathname routing to show elegant URL structure e.g., /home, /work
      window.history.pushState(null, "", "/" + activeTab);
    }
  }, [activeTab]);

  // Local spam check and rate limiting variables
  const [cooldown, setCooldown] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // Form states (built-in validation first)
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("AI Filmmaking Teaser");
  const [formBudget, setFormBudget] = useState("$2,500 - $5,000");
  const [formDetails, setFormDetails] = useState("");
  const [formTimeline, setFormTimeline] = useState("Within 4 weeks");
  const [honeypot, setHoneypot] = useState(""); // Antispam shielding

  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load inquiries from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("benny_inquiries");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse submissions database.", e);
      }
    }
  }, []);

  // Save changes to localstorage
  const saveSubmissions = (updated: Submission[]) => {
    setSubmissions(updated);
    localStorage.setItem("benny_inquiries", JSON.stringify(updated));
  };

  // Safe input sanitation to prevent XSS / script injections in public presentation list
  const sanitizeInput = (val: string): string => {
    return val
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .trim();
  };

  const notifyToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Submit Inquiry
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Antispam honeypot shield
    if (honeypot) {
      notifyToast("Security Alert: Robotic action blocked.", "error");
      return;
    }

    // 2. Simple clientside rate limit
    const now = Date.now();
    if (cooldown || (now - lastSubmitTime < 10000 && lastSubmitTime !== 0)) {
      notifyToast("Rate limit exceeded. Please wait 10 seconds between submissions.", "error");
      return;
    }

    // Validation
    if (!formName.trim() || !formEmail.trim() || !formDetails.trim()) {
      notifyToast("Input error: Please fill all required fields.", "error");
      return;
    }

    // Construct submission object with clean sanitized strings
    const sanitizedName = sanitizeInput(formName);
    const sanitizedEmail = sanitizeInput(formEmail);
    const sanitizedDetails = sanitizeInput(formDetails);

    const newInquiry: Submission = {
      id: "inq-" + Math.random().toString(36).substr(2, 9),
      name: sanitizedName,
      email: sanitizedEmail,
      projectType: formType,
      budget: formBudget,
      details: sanitizedDetails,
      timeline: formTimeline,
      timestamp: new Date().toLocaleString(),
      ipPlaceholder: `sandbox-client-${Math.floor(100 + Math.random() * 900)}`,
      sanitized: true
    };

    const nextList = [newInquiry, ...submissions];
    saveSubmissions(nextList);

    setLastSubmitTime(now);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10000);

    // Clear form
    setFormName("");
    setFormEmail("");
    setFormDetails("");

    notifyToast("Inquiry registered! Benny receives this in real-time. Verify via the top green indicator badge!");
  };

  const handleDeleteSubmission = (id: string) => {
    const filtered = submissions.filter((s) => s.id !== id);
    saveSubmissions(filtered);
    notifyToast("Inquiry removed from local sandbox.");
  };

  const handleClearAllSubmissions = () => {
    if (window.confirm("Restore original state and wipe inquiries database?")) {
      saveSubmissions([]);
      notifyToast("Inquiries database reset.");
    }
  };

  // Trigger inquiry pre-fill from offers selection
  const handleSelectPackage = (packageName: string) => {
    setFormType(packageName);
    setActiveTab("contact");
    // Scroll smoothly to contacts form container
    setTimeout(() => {
      const el = document.getElementById("contact-now-heading");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-bg-custom text-text-primary flex flex-col font-sans relative selection:bg-text-primary selection:text-bg-custom overflow-x-hidden">
      
      {/* CUSTOM MAGIC CURSOR */}
      <MagicCursor />

      {/* FLOATING THEME TOGGLE (FOLLOWS ON SCROLL, VERTICALLY CENTERED TO THE RIGHT) */}
      <div 
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center"
        id="floating-theme-toggle"
      >
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-8 h-8 rounded-full border border-border-custom bg-surface-custom text-text-primary hover:text-text-secondary hover:bg-border-custom hover:scale-105 active:scale-95 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none relative group"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme mode"
        >
          {isDarkMode ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
          )}
          
          {/* Subtle tooltip styling */}
          <span className="absolute right-10 bg-surface-custom text-text-primary px-2.5 py-1 text-[9px] font-mono rounded-md border border-border-custom opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
            {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
          </span>
        </button>
      </div>

      {/* HEADER BAR */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAdmin={() => setIsAdminOpen(true)}
        inquiryCount={submissions.length}
      />

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-18 right-4 sm:right-8 z-100 flex items-center gap-3 px-5 py-3 rounded-2xl border text-xs font-medium shadow-xl max-w-sm ${
              toastMessage.type === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY ROUTING */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* HERO REGION */}
              <div className="relative overflow-hidden w-full" id="hero-region-container">
                <style>{`
                  @media (min-width: 1024px) {
                    .hero-video-mask {
                      -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%);
                      mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%);
                    }
                  }
                  @media (min-width: 768px) and (max-width: 1023px) {
                    .hero-video-mask {
                      -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%);
                      mask-image: linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%);
                    }
                  }
                  @media (max-width: 767px) {
                    .hero-video-mask {
                      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 80%);
                      mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 80%);
                    }
                  }

                  @keyframes smokeDriftOne {
                    0% { transform: translate(-5%, -5%) scale(1) rotate(0deg); opacity: 0; }
                    50% { opacity: 0.16; }
                    100% { transform: translate(15%, 10%) scale(1.3) rotate(30deg); opacity: 0; }
                  }
                  @keyframes smokeDriftTwo {
                    0% { transform: translate(10%, 15%) scale(1.2) rotate(180deg); opacity: 0; }
                    50% { opacity: 0.12; }
                    100% { transform: translate(-10%, -5%) scale(0.9) rotate(360deg); opacity: 0; }
                  }
                  @keyframes smokeDriftThree {
                    0% { transform: translate(-5%, 10%) scale(0.95); opacity: 0; }
                    50% { opacity: 0.18; }
                    100% { transform: translate(10%, -10%) scale(1.4); opacity: 0; }
                  }
                  @keyframes smokeDriftFour {
                    0% { transform: translate(15%, -10%) scale(1.1) rotate(45deg); opacity: 0; }
                    50% { opacity: 0.14; }
                    100% { transform: translate(-15%, 15%) scale(1.5) rotate(225deg); opacity: 0; }
                  }
                `}</style>

                {/* Background Video (z-index: 0) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                  <video
                    src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Videos%20(Under%2030s)/download.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb3MgKFVuZGVyIDMwcykvZG93bmxvYWQubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTI4NDMxNCwiZXhwIjoxODEyODIwMzE0fQ.ITFexWxsSlGignsBdmLCIrprdgHoqOkWS-BrVHbwl98"
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    playsInline
                    className="w-full h-full object-cover object-[center_35%] md:object-[right_center] hero-video-mask"
                  />
                </div>

                {/* CSS Smoke/Atmosphere Effect Layer (z-index: 1 - constrained to left 60% of the hero section) */}
                <div className="absolute left-0 top-0 w-full md:w-[60%] h-full overflow-hidden pointer-events-none z-[1] hidden md:block select-none pointer-events-none">
                  <div 
                    className="absolute rounded-full filter blur-[50px] opacity-100"
                    style={{
                      width: '380px',
                      height: '380px',
                      left: '8%',
                      top: '12%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(200,200,200,0.03) 50%, rgba(200,200,200,0) 100%)',
                      animation: 'smokeDriftOne 18s ease-in-out infinite',
                    }}
                  />
                  <div 
                    className="absolute rounded-full filter blur-[60px] opacity-100"
                    style={{
                      width: '480px',
                      height: '480px',
                      left: '25%',
                      top: '35%',
                      background: 'radial-gradient(circle, rgba(240,240,240,0.05) 0%, rgba(180,180,180,0.02) 50%, rgba(180,180,180,0) 100%)',
                      animation: 'smokeDriftTwo 26s ease-in-out infinite',
                      animationDelay: '2s',
                    }}
                  />
                  <div 
                    className="absolute rounded-full filter blur-[40px] opacity-100"
                    style={{
                      width: '280px',
                      height: '280px',
                      left: '-5%',
                      top: '50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(200,200,200,0.04) 50%, rgba(200,200,200,0) 100%)',
                      animation: 'smokeDriftThree 14s ease-out infinite',
                      animationDelay: '4s',
                    }}
                  />
                  <div 
                    className="absolute rounded-full filter blur-[55px] opacity-100"
                    style={{
                      width: '420px',
                      height: '420px',
                      left: '12%',
                      top: '60%',
                      background: 'radial-gradient(circle, rgba(235,235,235,0.06) 0%, rgba(170,170,170,0.03) 50%, rgba(170,170,170,0) 100%)',
                      animation: 'smokeDriftFour 22s ease-in-out infinite',
                      animationDelay: '7s',
                    }}
                  />
                </div>

                 <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10" id="hero-section">
                  
                  {/* Floating Mobile Accreditation overlay (maintaining designer context beautifully on mobile screens) */}
                  <div className="md:hidden absolute top-4 right-4 bg-coal-950/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-bone-50 z-20 shadow-lg">
                    <span className="font-display font-bold text-[9px] uppercase tracking-wider">Benny B.</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  </div>

                  {/* HERO COPY */}
                  <div className="lg:col-span-7 space-y-8 relative z-20">
                    <div className="inline-flex items-center gap-2 bg-coal-950/5 text-coal-700 px-3.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase animate-pulse-slow">
                      <TrendingUp className="w-3.5 h-3.5 text-coal-950" />
                      <span>Personal Brand Portfolio - 2026 Edition</span>
                    </div>

                    <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-coal-950 leading-none">
                      Personal Dimension and Memories that Connect and Leave a Bold <span className="text-stroke font-extrabold uppercase">イメージ.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-coal-600 font-sans font-light leading-relaxed max-w-xl">
                      Founder of Digi Dental. I help businesses leverage AI, automation, and modern marketing systems to generate more profits while saving time. Currently building businesses, creating content, and pursuing Peak through Calisthenics and constant learning.
                    </p>

                    {/* HERO FOOTER BADGES GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-coal-900/5 *:p-3 *:bg-bone-100/50 *:border *:border-coal-900/5 *:rounded-xl">
                      <div className="group hover:bg-bone-100 hover:border-coal-900/10 transition-colors">
                        <span className="font-mono text-[9px] text-coal-600 block leading-tight">TENURE</span>
                        <span className="font-display font-bold text-sm text-coal-950 block mt-1">
                          <CountUp end={5} suffix="+" /> Years
                        </span>
                        <p className="text-[10px] text-coal-600 mt-1 font-light leading-none">Creating Online</p>
                      </div>
                      <div className="group hover:bg-bone-100 hover:border-coal-900/10 transition-colors">
                        <span className="font-mono text-[9px] text-coal-600 block leading-tight">PRODUCTION</span>
                        <span className="font-display font-bold text-sm text-coal-950 block mt-1">
                          <CountUp end={500} suffix="+" />
                        </span>
                        <p className="text-[10px] text-coal-600 mt-1 font-light leading-none">Content pieces published</p>
                      </div>
                      <div className="group hover:bg-bone-100 hover:border-coal-900/10 transition-colors">
                        <span className="font-mono text-[9px] text-coal-600 block leading-tight">JOURNEY</span>
                        <span className="font-display font-bold text-sm text-coal-950 block mt-1">
                          <CountUp end={19} /> &
                        </span>
                        <p className="text-[10px] text-coal-600 mt-1 font-light leading-none">
                          Travelled to <CountUp end={3} /> countries
                        </p>
                      </div>
                      <div className="group bg-coal-950 text-bone-50 border border-coal-950 rounded-xl flex flex-col justify-between text-left hover:bg-coal-900/95 transition-colors select-none">
                        <span className="font-mono text-[9px] text-silver-300 block leading-tight">GLOBAL</span>
                        <span className="font-display font-medium text-xs text-bone-100 block mt-1">
                          Speaks <CountUp end={3} /> Languages
                        </span>
                        <a
                          href="https://discord.gg/jm5cxrT694"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] text-zinc-400 mt-1 leading-none hover:text-amber-400 transition-colors cursor-pointer block"
                          style={{ textDecoration: "none" }}
                        >
                          <CountUp end={200} suffix="+" /> Join Community
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* PERSONA NARRATIVE SECTION */}
              <section className="py-20 bg-bone-100/30 px-4 sm:px-8" id="persona-section">
                <div className="max-w-7xl mx-auto">
                  <SectionHeader
                    leftLabel="© PERSONA ペルソナ"
                    rightLabel="OVERVIEW"
                    title="Persona"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* CAMERA BTS PICTURE */}
                    <div className="lg:col-span-5 relative flex items-center justify-center">
                      <div className="relative w-full">
                        {/* Ambient Blurred Glow Backdrop (Free and blurred with no visible barrier) */}
                        <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/10 dark:via-purple-500/5 dark:to-pink-500/5 blur-3xl rounded-full opacity-80 pointer-events-none -z-10 animate-pulse-slow" />
                        
                        <img
                          src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/1769160829960.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvMTc2OTE2MDgyOTk2MC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzk2MDYyLCJleHAiOjE4MTMzMzIwNjJ9.J3zFNmQ3bZYK0HhXweklVw-W4FDOvkWpMRai06ExgRc"
                          alt="Wholesome client ecosystem and community gathering in a modern brewpub"
                          referrerPolicy="no-referrer"
                          loading="eager"
                          fetchPriority="high"
                          decoding="sync"
                          className="w-full aspect-[4/3] object-cover rounded-3xl filter contrast-104 shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.01]"
                        />
                        <div className="pt-3 px-2 flex justify-between items-center text-[10px] text-coal-600 font-mono relative z-20">
                          <span>COMMUNITY //</span>
                          <span>PERSONAL ATTENDANCE // 200+ ONLINE</span>
                        </div>
                      </div>
                    </div>

                    {/* STORY DESCRIPTION */}
                    <div className="lg:col-span-7 space-y-6">
                      <h3 className="font-display font-medium text-xl sm:text-2xl text-coal-950 leading-snug">
                        Building wholesome client ecosystem/community space over 200 members strong via high-retention branded narratives.
                      </h3>

                      <p className="text-sm sm:text-base text-coal-600 leading-relaxed font-light">
                        I believe content acts as the core gravity well of a modern entrepreneurial identity. That comes with actually being present with your people and that's absolute if you're building a community worth being in. Digital interface architecture, and professional cinema operations, I craft tailored pipelines for brands who look to establish their own authenticity and of course work with people who have great visions in mind.
                      </p>

                      <p className="text-sm text-coal-600 leading-relaxed">
                        By integrating cutting edge creative tools, I bridge the gulf between raw code frameworks and modern cinematic beauty.
                      </p>

                      <div className="pt-4 flex gap-4">
                        <button
                          onClick={() => {
                            setActiveTab("work");
                            window.scrollTo(0, 0);
                          }}
                          className="bg-coal-950 hover:bg-coal-800 text-bone-50 text-xs font-semibold px-5  py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer focus:outline-none"
                        >
                          <span>Explore All Works</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSelectPackage("Online Business Coaching")}
                          className="border border-coal-900/15 hover:border-coal-950 text-coal-700 hover:text-coal-950 text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                        >
                          Queries / Staying Updated
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* PRACTICE GRID SECTION */}
              <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="practice-section">
                <SectionHeader
                  leftLabel="© CAPABILITIES ケイパ"
                  rightLabel="CAPABILITIES"
                  title="Practice. Makes. Perfect."
                />

                <div className="flex justify-end -mt-12 mb-10">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="group relative flex items-center justify-center p-1 bg-coal-950 hover:bg-coal-800 text-bone-50 rounded-full font-mono text-[9px] tracking-wider px-4 py-2 cursor-pointer focus:outline-none"
                  >
                    <span className="animate-spin-slow inline-block mr-1">⚡</span>
                    <span>SKILL THAT BREAKS THE KNOWLEDGE GAP</span>
                  </button>
                </div>

                {/* PRACTICE ROW GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRACTICES.map((pr) => {
                    return (
                      <div
                        key={pr.id}
                        className="p-6 sm:p-8 bg-bone-100/45 hover:bg-bone-100 border border-coal-900/5 hover:border-coal-900/15 rounded-3xl transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-coal-600 font-bold uppercase tracking-wider bg-coal-950/5 px-2 py-0.5 rounded">
                              {pr.category}
                            </span>
                            <span className={`h-2 w-2 rounded-full ${
                              pr.status === "Nominated" ? "bg-amber-500" :
                              pr.status === "New" ? "bg-indigo-500" : "bg-emerald-500"
                            }`} title={`Status: ${pr.status}`} />
                          </div>
                          
                          <h3 className="font-display font-bold text-lg text-coal-950 group-hover:text-coal-700 transition-colors">
                            {pr.name}
                          </h3>
                          <p className="text-xs text-coal-600 leading-relaxed font-light">
                            {pr.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-coal-900/5 mt-6 pt-4 text-xs font-mono text-coal-600">
                          <span>METRIC METADATA</span>
                          <span className="font-bold text-coal-950">{pr.status.toUpperCase()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* TESTIMONIALS IMPORT */}
              <Testimonials />

              {/* AWARDS DUMMY LIST */}
              <section className="py-20 px-4 sm:px-8 bg-bone-100/20" id="awards-section">
                <div className="max-w-4xl mx-auto">
                  <SectionHeader
                    leftLabel="© AWARDS アワード"
                    rightLabel="CERTIFICATIONS/HONORS"
                    title="Awards"
                  />
                  
                  {/* UPDATING PLACEHOLDER */}
                  <div className="mt-8 p-6 bg-bone-50 border border-coal-900/10 rounded-2xl max-w-sm mx-auto shadow-inner flex flex-col items-center space-y-4 text-center">
                    <div className="flex space-x-1.5 justify-center">
                      <div className="w-2.5 h-2.5 bg-coal-950 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2.5 h-2.5 bg-coal-950 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2.5 h-2.5 bg-coal-950 rounded-full animate-bounce" />
                    </div>
                    <span className="font-mono text-[10px] text-coal-950 uppercase font-bold tracking-widest">
                      Updating...
                    </span>
                    <p className="text-xs text-coal-600 font-light leading-relaxed">
                      Sifting nominations across Pending Web Arts and CSS Design Awards 2026. Standby for publication assets.
                    </p>
                  </div>
                </div>
              </section>

              {/* PRICING UPDATING PLACEHOLDER */}
              <section className="py-20 px-4 sm:px-8 bg-bone-50" id="pricing-section">
                <div className="max-w-4xl mx-auto">
                  <SectionHeader
                    leftLabel="© METRIC MATRICES プライス"
                    rightLabel="PLANNING SPECS"
                    title="Pricing"
                  />
                  
                  {/* UPDATING PLACEHOLDER */}
                  <div className="mt-8 p-6 bg-bone-100/50 border border-coal-900/15 rounded-2xl max-w-sm mx-auto shadow-sm flex flex-col items-center space-y-4 text-center">
                    <div className="flex space-x-1.5 justify-center">
                      <div className="w-2.5 h-2.5 bg-coal-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2.5 h-2.5 bg-coal-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2.5 h-2.5 bg-coal-600 rounded-full animate-bounce" />
                    </div>
                    <span className="font-mono text-[10px] text-coal-950 uppercase font-bold tracking-widest">
                      Updating...
                    </span>
                    <p className="text-xs text-coal-600 font-light leading-relaxed">
                      Pricing matrices are being audited for international compliance. Standard offerings can be reviewed on the "Offers" view right now.
                    </p>
                    <button
                      onClick={() => setActiveTab("offers")}
                      className="px-4 py-1.5 bg-coal-950 text-bone-50 text-[10px] font-mono font-bold rounded-full hover:bg-coal-800 transition-colors"
                    >
                      BROWSE DRAFT PAC
                    </button>
                  </div>
                </div>
              </section>

              {/* FEATURED CASE STUDY PREVIEW: DIGI DENTAL */}
              <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="featured-article">
                <SectionHeader
                  leftLabel="© CASE STUDIES ケース"
                  rightLabel="HIGHLIGHT MATTERS"
                  title="Featured Case Studies"
                />

                {/* DIGI DENTAL HERO CARD */}
                <div className="bg-bone-100/50 hover:bg-bone-100 border border-coal-900/10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 items-center group shadow-sm transition-all duration-300 p-6 gap-8 relative overflow-visible">
                  <div className="lg:col-span-5 relative h-[250px] lg:h-[320px] rounded-2xl overflow-visible flex items-center justify-center">
                    {/* Ambient Blurred Glow Backdrop (Free and blurred with no visible barrier) */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-indigo-500/10 dark:from-amber-500/10 dark:via-orange-500/5 dark:to-indigo-500/5 blur-2xl rounded-full opacity-80 pointer-events-none z-0 animate-pulse-slow" />
                    
                    <img
                      src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/digi_dental_batch2_1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZGlnaV9kZW50YWxfYmF0Y2gyXzEucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTY5MzUwNCwiZXhwIjoxODEzMjI5NTA0fQ.RLDxhWwWAgF8Erna4kQYOpEfQNPEbkw11nagyCOTJSA"
                      alt="DigiDental AI receptionist dashboard preview for US dental clinics"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                      className="w-full h-full object-cover rounded-2xl filter contrast-105 group-hover:scale-[1.01] transition-transform duration-500 shadow-xl relative z-10 font-sans"
                    />
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-coal-900/5 text-[#525252] font-mono text-[9px] px-2.5 py-0.5 rounded-full border border-coal-900/5 font-semibold">
                          CASE STUDY DESIGN
                        </span>
                        <span className="font-mono text-[9px] text-[#525252]">ACTIVE PERFORMANCE TESTED</span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-text-primary leading-tight">
                        Redesigned appointment metrics reducing patients friction by 47.12% Digi Dental PMS framework.
                      </h3>

                      <p className="text-[#525252] text-sm leading-relaxed font-light">
                        The autonomous build that saves dental practices their lost hours and $ coverage. Artifical Inteligence used at it's peak to gather Inbound clients and automatically book clinic clients to their calendars for practice owners to focus only on their dentistry.
                      </p>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-t border-coal-900/10 pt-6 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#525252] uppercase">ROLE</span>
                        <span className="font-display text-xs text-text-primary font-semibold">AI reception personal tailored Booking System</span>
                      </div>

                      <button
                        onClick={() => setSelectedProject(PROJECTS[0])}
                        className="bg-coal-950 text-bone-50 hover:bg-coal-800 text-xs font-semibold px-4 py-2 rounded-full shrink-0 flex items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        Read Project Details
                        <ArrowUpRight className="w-3.5 h-3.5 text-bone-50" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <FAQ />

              {/* BOTTOM BENTO */}
              <BottomBento />
            </motion.div>
          )}

          {activeTab === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* HEADING PORTFOLIO */}
              <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="work-section">
                <SectionHeader
                  leftLabel="© CURATED SELECTION ワークス"
                  rightLabel="PORTFOLIO SHOWCASE"
                  title="All Works"
                  description="Filming experiences, design systems, and software engineering portfolios that blend commercial impact with pristine execution."
                />

                {/* PROJECTS LIST: STACKED LAYOUT AS WIREFRAME */}
                <div className="space-y-8">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="group bg-bone-100/50 hover:bg-bone-100 border border-coal-900/5 hover:border-coal-900/15 p-5 sm:p-6 rounded-3xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                      id={`project-card-${proj.id}`}
                    >
                      {/* PICTURE PREVIEW */}
                      <div className="lg:col-span-5 h-[220px] sm:h-[280px] rounded-2xl relative flex items-center justify-center overflow-visible">
                        {/* Ambient Blurred Glow Backdrop (Free and blurred with no visible barrier) */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 blur-2xl rounded-full opacity-70 pointer-events-none z-0" />
                        
                        <div className="w-full h-full overflow-hidden rounded-2xl relative z-10 shadow-lg border border-border-custom bg-surface-custom">
                          <img
                            src={proj.image}
                            alt={`${proj.title} — ${proj.category}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-102 brightness-95"
                          />
                        </div>
                      </div>

                      {/* COPY DESCRIPTION */}
                      <div className="lg:col-span-7 space-y-4 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between font-mono text-[9px] text-coal-600 mb-2">
                            <span className="bg-coal-950/5 px-2 py-0.5 rounded text-coal-700 tracking-wider">
                              {proj.category.toUpperCase()}
                            </span>
                            <span>YEAR: {proj.year}</span>
                          </div>
                          
                          <h2 className="font-display font-bold text-xl sm:text-2xl text-coal-950 group-hover:text-coal-700 transition-colors tracking-tight">
                            {proj.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-coal-600 leading-relaxed font-light mt-2">
                            {proj.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-coal-900/5 pt-4 mt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="font-mono text-[9px] text-coal-600 border border-coal-900/5 px-2 py-0.5 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="flex items-center gap-1 text-xs text-coal-950 font-semibold group-hover:translate-x-0.5 transition-transform">
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <FAQ />

              {/* FOOTER */}
              <BottomBento />
            </motion.div>
          )}

          {activeTab === "offers" && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* OFFERS BANNER */}
              <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="offers-section">
                <SectionHeader
                  leftLabel="© DRAFT PAC オファー"
                  rightLabel="COMPACT PACKAGES // PRICING SPECS"
                  title="Offers"
                  description="Transparent rates for voice-AI receptionist systems, professional web design, bodyweight strength coaching, and online business accelerator mentorship."
                />

                {/* SERVICE PACKAGES CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pack 1: AI RECEPTIONIST */}
                  <GlowBorderCard glowColor="orange" theme="dark" className="bg-coal-950 text-bone-50 px-6 pt-14 pb-6 sm:px-8 sm:pt-16 sm:pb-8 flex flex-col justify-between group shadow-md">
                    {/* RECOMMENDED PLACARD */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-amber-500 text-coal-950 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                      RECOMMENDED FOR BUSY FOUNDERS & AGENCIES
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="p-2 rounded-lg bg-white/10 text-white">
                          <Phone className="w-5 h-5 animate-pulse text-amber-300" />
                        </span>
                        <div className="text-right flex flex-col items-end">
                          <div className="flex items-baseline gap-1">
                            <span className="font-display font-bold text-2xl text-white block">$2,000</span>
                            <span className="font-mono text-[8px] text-zinc-400 uppercase">SETUP</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="font-display font-bold text-lg text-amber-400 block">$299</span>
                            <span className="font-mono text-[8px] text-zinc-400 uppercase">/ MO ONGOING</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white">24/7 AI Call Reception & Automated Booking</h3>
                      <p className="text-xs text-zinc-300 leading-relaxed font-light">
                        Never let a lead slip through the cracks again. Our voice-AI receptionist answers every call, schedules directly into your calendar, and handles standard volume effortlessly—so you can focus on closing deals, not answering cold calls.
                      </p>
                      
                      <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-white/10">
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-amber-300 rounded-full shrink-0" />
                          <span>24/7 live call answering & intelligent routing</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full shrink-0" />
                          <span>Direct calendar booking with smart conflict resolution</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full shrink-0" />
                          <span>Overage billed at cents/min—only pay for what you use</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPackage("AI Receptionist")}
                      className="roll-btn w-full mt-6 py-3.5 bg-bone-50 hover:bg-zinc-100 text-coal-950 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 cursor-pointer overflow-hidden border border-white/10"
                    >
                      {renderRollingButtonText("Get AI Receptionist →")}
                    </button>
                  </GlowBorderCard>

                  {/* Pack 2: WEBSITE LAUNCH */}
                  <GlowBorderCard glowColor="purple" theme="light" className="bg-bone-100/50 px-6 pt-14 pb-6 sm:px-8 sm:pt-16 sm:pb-8 flex flex-col justify-between group shadow-sm">
                    {/* TAGLINE PLACARD */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-coal-200 text-coal-800 text-[9px] font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                      FLEXIBLE PACKAGES FOR DIGITAL PRESENCE
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="p-2 rounded-lg bg-coal-950/5 text-coal-950">
                          <Globe className="w-5 h-5 text-coal-850" />
                        </span>
                        <div className="text-right flex flex-col items-end">
                          <div className="flex items-baseline gap-1 flex-col items-end">
                            <span className="font-display font-bold text-lg text-coal-950 block">€499 <span className="font-mono text-[8px] text-coal-600 uppercase">STARTER</span></span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="font-display font-bold text-lg text-coal-950 block">€850 <span className="font-mono text-[8px] text-coal-600 uppercase">GROWTH</span></span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="font-display font-bold text-lg text-indigo-650 block">€1,000–€1,200 <span className="font-mono text-[8px] text-coal-600 uppercase">ENTERPRISE</span></span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-coal-950">Pixel-Perfect Web Design & Development</h3>
                      <p className="text-xs text-coal-600 leading-relaxed font-light">
                        From a clean single-page site to a fully managed multi-page ecosystem with blog integration and lead magnets. All builds are mobile-responsive, SEO-tuned, and delivered in under 24 hours for the Starter/Growth tiers.
                      </p>
                      
                      <ul className="text-xs text-coal-600 space-y-2 pt-2 border-t border-coal-900/5">
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Single or multi-page layouts with zero template reuse</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>1 month post-launch support & SSL certification</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Priority updates and custom lead funnel pages included</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPackage("Website Launch")}
                      className="roll-btn w-full mt-6 py-3.5 bg-coal-950 hover:bg-coal-800 text-bone-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 cursor-pointer overflow-hidden border border-coal-950/10"
                    >
                      {renderRollingButtonText("View Website Plans →")}
                    </button>
                  </GlowBorderCard>

                  {/* Pack 3: CALISTHENICS COACHING */}
                  <GlowBorderCard glowColor="green" theme="light" className="bg-bone-100/50 px-6 pt-14 pb-6 sm:px-8 sm:pt-16 sm:pb-8 flex flex-col justify-between group shadow-sm">
                    {/* TAGLINE PLACARD */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-coal-200 text-coal-800 text-[9px] font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                      FOR INTERMEDIATE & BELOW ATHLETES
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="p-2 rounded-lg bg-coal-950/5 text-coal-950">
                          <Dumbbell className="w-5 h-5 text-coal-850" />
                        </span>
                        <div className="text-right">
                          <span className="font-display font-bold text-2xl text-coal-950 block">$1,000</span>
                          <span className="font-mono text-[9px] text-coal-600 uppercase">PER MONTH</span>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-coal-950">Bodyweight Strength & Movement Mastery</h3>
                      <p className="text-xs text-coal-600 leading-relaxed font-light">
                        Progressive calisthenics coaching designed to take you from fundamental control to advanced static holds and dynamic flows. Each month includes custom programming based on your video form analysis.
                      </p>
                      
                      <ul className="text-xs text-coal-600 space-y-2 pt-2 border-t border-coal-900/5">
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Custom progressive workout cycles scaled to your level</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Deep-dive video form correction & mobility prehab</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Weekly 1-on-1 check-in calls for accountability</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPackage("Calisthenics Coaching")}
                      className="roll-btn w-full mt-6 py-3.5 bg-coal-950 hover:bg-coal-800 text-bone-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 cursor-pointer overflow-hidden border border-coal-950/10"
                    >
                      {renderRollingButtonText("Apply for Coaching →")}
                    </button>
                  </GlowBorderCard>

                  {/* Pack 4: ONLINE BUSINESS COACHING */}
                  <GlowBorderCard glowColor="blue" theme="light" className="bg-bone-100/50 px-6 pt-14 pb-6 sm:px-8 sm:pt-16 sm:pb-8 flex flex-col justify-between group shadow-sm">
                    {/* TAGLINE PLACARD */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-coal-200 text-coal-800 text-[9px] font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                      FOR COURSE CREATORS & SCALING ENTREPRENEURS
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="p-2 rounded-lg bg-coal-950/5 text-coal-950">
                          <Rocket className="w-5 h-5 text-coal-850" />
                        </span>
                        <div className="text-right">
                          <span className="font-display font-bold text-2xl text-coal-950 block">$2,500</span>
                          <span className="font-mono text-[9px] text-coal-600 uppercase">PER MONTH</span>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-coal-950">The Business Accelerator & Course Blueprint</h3>
                      <p className="text-xs text-coal-600 leading-relaxed font-light">
                        High-ticket 1:1 mentorship to architect, launch, and scale your digital knowledge business. We build your funnel, systematize your operations, and map out your path to consistent six-figure months.
                      </p>
                      
                      <ul className="text-xs text-coal-600 space-y-2 pt-2 border-t border-coal-900/5">
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Weekly deep-dive 1-on-1 strategy & funnel audits</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Complete course creation blueprint + sales architecture</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-coal-950 rounded-full shrink-0" />
                          <span>Done-for-you systems setup (email, CRM, & offer sequencing)</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPackage("Online Business Coaching")}
                      className="roll-btn w-full mt-6 py-3.5 bg-coal-950 hover:bg-coal-800 text-bone-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 cursor-pointer overflow-hidden border border-coal-950/10"
                    >
                      {renderRollingButtonText("Book Discovery Call →")}
                    </button>
                  </GlowBorderCard>
                </div>
              </section>

              {/* FAQ */}
              <FAQ />

              {/* FOOTER */}
              <BottomBento />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* CONTACT NOW CONTAINER */}
              <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="contact-section">
                {/* Two Columns Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch mb-16 mt-6">
                  {/* Left Column: Portrait Photo with Rounded Corners (Slightly Shrunk, More Rectangular/Less Tall) */}
                  <div className="w-full relative group max-w-[95%] sm:max-w-[90%] md:max-w-[75%] mx-auto md:mx-0 flex flex-col justify-center">
                    <div className="overflow-hidden rounded-[2rem] aspect-[16/10] bg-bone-100/30 shadow-md transition-all duration-500 hover:scale-[1.01] hover:shadow-lg">
                      <img
                        src={new URL("./assets/images/benny_suit.jpg", import.meta.url).href}
                        alt="Benny portrait contact image"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        fetchPriority="high"
                        decoding="sync"
                        className="w-full h-full object-cover object-center select-none transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Right Column: 4 Interactive Stacked Info Rows */}
                  <div className="flex flex-col justify-center h-full space-y-0">
                    {/* Top line to ground the list */}
                    <div className="relative w-full h-[1px] bg-border-custom" />

                    {/* Row 1 - Location */}
                    <div className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 select-none">
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                          Office: Coimbra, Portugal.
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0 select-none" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                        <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                      </div>
                    </div>

                    {/* Row 2 - Instagram */}
                    <a
                      href="https://www.instagram.com/ceobennyco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                          Follow me on Instagram
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                        <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                      </div>
                    </a>

                    {/* Row 3 - Phone/WhatsApp */}
                    <a
                      href="https://wa.me/351912859130"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                          WhatsApp - +351 912 859 130
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                        <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                      </div>
                    </a>

                    {/* Row 4 - Email */}
                    <a
                      href="mailto:bennysworkspace@gmail.com"
                      className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                          bennysworkspace@gmail.com
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                        <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                      </div>
                    </a>
                  </div>
                </div>

                <SectionHeader
                  id="contact-now-heading"
                  leftLabel="CONTACT コンタック"
                  rightLabel="STAY IN TOUCH"
                  title="CONTACT コンタック & STAY IN TOUCH"
                />

                {/* Extended Paragraph Space (Borders Removed) */}
                <div className="w-full relative px-6 py-20 sm:py-28 md:py-36 max-w-4xl mx-auto mb-10 overflow-visible group/bio">
                  {/* Three Background Images Collage (Tactile Watermark Style, Exact Behind Text) */}
                  
                  {/* Image 1: Top-Left (Shoyu Ramen Image) */}
                  <div className="absolute top-2 left-2 sm:top-8 sm:left-12 md:left-20 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[-6deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[-3deg] transition-all duration-500 cursor-zoom-in opacity-100">
                    {/* Texture grain layer */}
                    <div className="grain-effect rounded-2xl" />
                    <img 
                      src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/Shoyu%20Ramen.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvU2hveXUgUmFtZW4uanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTc5NTg2NywiZXhwIjoxODEzMzMxODY3fQ.WOc3lfa_xEFsCHRYu1hC7bf4AgZKxP-qptnQXexvwdE"
                      alt="Warm bowl of authentic Shoyu Ramen reflecting raw design texture and culinary artistry" 
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                      className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Image 2: Bottom-Left (Japanese Dragon Stone Carving) */}
                  <div className="absolute bottom-2 left-6 sm:bottom-8 sm:left-16 md:left-24 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[6deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[3deg] transition-all duration-500 cursor-zoom-in opacity-100">
                    {/* Texture grain layer */}
                    <div className="grain-effect rounded-2xl" />
                    <img 
                      src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/Japanese%20Dragon%20Stone%20Carving.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvSmFwYW5lc2UgRHJhZ29uIFN0b25lIENhcnZpbmcuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTc5NDY5MCwiZXhwIjoxODEzMzMwNjkwfQ.-UcpQhXho-64IYV2cvsYYNdUBbQogf6m0kz_Nwiankw"
                      alt="Japanese Dragon Stone Carving reflecting raw design texture and dimension" 
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                      className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Image 3: Centered In-Between them vertically, right-centered (Japanese Neighborhood) */}
                  <div className="absolute top-[35%] right-2 sm:top-[38%] sm:right-6 md:right-10 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[4deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[1deg] transition-all duration-500 cursor-zoom-in opacity-100">
                    {/* Texture grain layer */}
                    <div className="grain-effect rounded-2xl" />
                    <img 
                      src="https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/Japanese%20Neighborhood%20_.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvSmFwYW5lc2UgTmVpZ2hib3Job29kIF8uanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTc5NDYxNiwiZXhwIjoxODEzMzMwNjE2fQ.-zr_xnK69HDXz0rMEp582kVDdMq9VYIbqSoOzKNR164"
                      alt="Japanese Neighborhood scenery reflecting raw design texture and dimension" 
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                      className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* High Contrast Foreground Text Layer */}
                  <div className="relative text-center select-text space-y-6 sm:space-y-8 max-w-2xl mx-auto">
                    <ScrollRevealParagraph className="text-text-primary font-sans text-base sm:text-lg md:text-xl font-semibold leading-relaxed tracking-wide italic">
                      "The people who know me think I'm stupid. <br className="hidden sm:inline" />
                      The people who watch me know better."
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed tracking-wide">
                      19 years old. Consistent Four Figures. Three languages. One mission: freedom, built from scratch, on my own terms.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-secondary/90 font-sans text-sm sm:text-base leading-relaxed">
                      I'm not what you'd expect. Is what I'd like to say...
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      I speak three languages, run an AI company targeting the US market, post content every single day, and move at a speed that confuses the people closest to me and Inspires those watching from the outside.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-semibold tracking-tight italic">
                      That gap between those two groups... That's where I operate.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      Growing up, I felt like an alien in every room I walked into. Not the tragic kind. The kind who looks around, realizes the room wasn't built for them, and decides to build a better one. So that's what I'm doing, you're already inside a glimpse of it.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      Right now, that looks like <strong className="text-text-primary font-semibold">Digi Dental</strong>, an AI receptionist agency making sure dental clinics across the US never lose a patient to a missed call again. Real work. Technical, commercial, and completely mine.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-secondary/90 font-sans text-sm sm:text-base leading-relaxed">
                      But Digi Dental is one piece of a much larger picture.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      I create content. I document the grind, unfiltered, no highlight reel. I'm learning languages on the side, doing my own sales, planning the next move, and quietly building toward something that doesn't have a clean label yet.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      Because here's what I've realized: I'm not interested in being known for one thing. That sounds too boring despite the reality of the fact that in order to start everyone has to be known for one thing Initially at the very least.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-semibold tracking-tight uppercase tracking-wider text-text-primary">
                      I want to be a movement. Not a niche. Not a category. A perspective, one that keeps shifting not switching, keeps expanding, and stays completely, unapologetically mine.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      I'm not the perfectly disciplined entrepreneur you see on your feed. I miss days. Life hits. I don't pretend otherwise. What I am is the kind of person who recalibrates without drama, locks back in without an audience, and keeps going, because stopping was never actually an option. <span className="font-semibold italic">Speed is King.</span>
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      What's driving me isn't a vision board. It's something rawer than that. I'm tired of the effort going unrewarded. I want the freedom I've been building toward. And I will not stop until it's real.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                      This brand is for people who know that feeling, who are inspired, who wanna work with, who want to follow, and those who want to take action along.
                    </ScrollRevealParagraph>

                    <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base leading-relaxed">
                      If you're here and it lands, you already know why. <br />
                      If it doesn't, no problem. This was never for everyone.
                    </ScrollRevealParagraph>

                    <div className="pt-4 space-y-2">
                      <ScrollRevealParagraph className="font-sans text-base sm:text-lg font-bold tracking-widest uppercase">
                        Follow the build. Watch what happens.
                      </ScrollRevealParagraph>
                      <ScrollRevealParagraph className="font-mono text-sm mt-1">
                        @ceobennyco
                      </ScrollRevealParagraph>
                    </div>
                  </div>
                </div>

                {/* Centered YouTube Link (Framer interactive style) */}
                <div className="max-w-xl mx-auto pt-4 pb-12">
                  <a
                    href="https://www.youtube.com/@bennyunmatched"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative py-6 flex items-center justify-between text-text-primary transition-colors duration-300 w-full cursor-pointer"
                  >
                    {/* Top divider line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                      <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </div>

                    <span className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase group-hover:text-text-secondary transition-colors duration-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#EA4335] inline-block animate-pulse shrink-0" />
                      Link to YouTube Video
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />

                    {/* Bottom divider line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
                      <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </div>
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <FAQ />

              {/* FOOTER */}
              <BottomBento />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* PORTFOLIO DETAIL DIALOG MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* SECURED CLIENT SUBMISSION LOG DRAWER (ADMIN ACCREDITATION PANEL) */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            submissions={submissions}
            onDeleteSubmission={handleDeleteSubmission}
            onClearAll={handleClearAllSubmissions}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
