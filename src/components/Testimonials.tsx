/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

// Inline Verified Badge (Twitter-like verification Checkmark)
function VerifiedBadge() {
  return (
    <svg
      className="w-4 h-4 text-[#1D9BF0] fill-current flex-shrink-0 inline-block align-middle"
      viewBox="0 0 24 24"
      aria-label="Verified creator account"
    >
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.09-1.36.26C14.77 2.51 13.5 1.7 12 1.7s-2.77.81-3.41 2.07c-.419-.17-.88-.26-1.36-.26-2.11 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.09 1.36-.26.64 1.26 1.91 2.07 3.41 2.07s2.77-.81 3.41-2.07c.419.17.88.26 1.36.26 2.11 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.5 4l-4-4 1.5-1.5 2.5 2.5 6-6 1.5 1.5-7.5 7.5z" />
    </svg>
  );
}

// Custom Serif "Cairo" Wordmark
function CairoLogo() {
  return (
    <div className="flex items-center space-x-1 select-none font-display font-black text-coal-950 hover:text-amber-600 transition-colors duration-300">
      <span className="text-lg italic tracking-tight font-serif">Cairo</span>
    </div>
  );
}

// Structured test data extracted directly from user screenshots
const SCREENSHOT_TESTIMONIALS = [
  {
    rating: "★★★★★",
    quotes: [
      "yoo, happy to see it bro. Even if it's baby steps! Just subbed to your channel btw 😇",
      "Let's goo, I got more book recs when you're done 😇🤝"
    ],
    author: "Ron Jackson",
    role: "Business owner, Creator",
    avatarBg: "from-amber-600 to-amber-900",
    initials: "RJ",
  },
  {
    rating: "★★★★★",
    quotes: [
      "nothing rlly you can do to leverage that besides use it as fuel to keep doing You! Keep Posting!"
    ],
    author: "Jake Sujanani",
    role: "Agency Owner, Creator",
    avatarBg: "from-zinc-700 to-zinc-950",
    initials: "JS",
  },
  {
    rating: "★★★★★",
    quotes: [
      "Benny, if you've been posting consistently for three years but aren't growing, there's a gap in your knowledge and sometimes, the fastest way to bridge it is by investing in professional guidance. You're clearly not lazy (you've put in the work), so the issue isn't effort, it's strategy. Quality improves with practice, but you also need the right insights. You're just a dumbass. Keep pushing: be better today, even better tomorrow."
    ],
    author: "Sam Milsap",
    role: "Fitness Business, Creator",
    avatarBg: "from-blue-700 to-slate-900",
    initials: "SM",
  },
  {
    rating: "★★★★★",
    quotes: [
      "Working with Benny is amazing! we get along well, have fun, and get things done. Emotionally, I'm really happy to have him as a partner because he's fiercely driven and knows what he wants. He pushes me just the right amount, which is exactly what I need to stay motivated and break out of my lazy habits. Highly recommend!"
    ],
    author: "Lucas Ito",
    role: "AI Agency Owner",
    avatarBg: "from-violet-700 to-indigo-950",
    initials: "LI",
  },
  {
    rating: "★★★★★",
    quotes: [
      "Working with Benny was the strategic breakthrough I needed. As someone passionate about debating, law, and creative skills but overwhelmed by where to focus, his 'divide and rule' mastery method gave me clarity: master one skill at a time, maintain it, then level up the next. Benny doesn't just motivate, he listens deeply, asks the right questions, and delivers actionable frameworks (like his Focus-Master-Maintain-Iterate phases) that turn chaos into progress.",
      "Thanks to his guidance, I now have a game plan: sharpening my video editing first, then debating techniques, followed by writing, all with structured practice and mentorship. Benny's approach isn't just about working harder; it's about working smarter with your energy. If you're a student, debater, or creator stuck between 'I know what to do' and 'I don't know how to start,' Benny bridges that gap with bold, direct, and sophisticated coaching.",
      "P.S. His brother's a naughty one."
    ],
    author: "Gunnoid",
    role: "1st client / newbiepreneur",
    avatarBg: "from-emerald-500 to-emerald-950",
    initials: "GD",
  }
];

export default function Testimonials() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    let currentlyVisible = false;
    let cachedOffsetTop = 0;

    const updateOffset = () => {
      if (sectionRef.current) {
        // Measure offset top only once or on resize, avoiding layout thrashing during scroll
        cachedOffsetTop = sectionRef.current.offsetTop;
      }
    };

    const handleScroll = () => {
      if (!active || !currentlyVisible) return;
      const bg = bgRef.current;
      if (!bg) return;

      const sy = window.pageYOffset || window.scrollY;
      const translateY = sy - cachedOffsetTop;

      window.requestAnimationFrame(() => {
        if (!active || !bg) return;
        bg.style.transform = `translate3d(0, ${translateY}px, 0)`;
      });
    };

    const section = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (section) {
      updateOffset();
      observer = new IntersectionObserver(
        ([entry]) => {
          currentlyVisible = entry.isIntersecting;
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            updateOffset();
            handleScroll();
          }
        },
        {
          root: null,
          rootMargin: "300px",
          threshold: 0.01,
        }
      );
      observer.observe(section);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => {
      updateOffset();
      handleScroll();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial position setup
    updateOffset();
    handleScroll();

    return () => {
      active = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleShowProof = () => {
    // Dynamic feedback popup notification
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 right-8 bg-white text-black px-6 py-4 rounded-2xl font-mono text-xs tracking-wider uppercase border border-neutral-200 shadow-2xl z-[999] animate-slide-up flex items-center space-x-2";
    toast.innerHTML = `<span class="text-amber-500">✦</span> <span>CAIRO NETWORK VERIFIED // SECURE PROOF ACTIVE</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-all", "duration-500");
      setTimeout(() => toast.remove(), 500);
    }, 2800);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[220vh] bg-bone-50 text-coal-950 overflow-hidden [clip-path:inset(0)]"
      style={{ clipPath: "inset(0)" }}
      id="testimonials-section"
    >
      <style>{`
        @keyframes bg-marquee-loop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-bg-marquee {
          animation: bg-marquee-loop 60s linear infinite;
          will-change: transform;
        }
        .bg-marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .paused-marquee {
          animation-play-state: paused !important;
        }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 {
          --font-size: 23px;
          --text: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, currentColor);
          --line-height-abs: 20px;
          box-sizing: border-box; margin: 0; padding: 0; vertical-align: top;
          display: flex; overflow: hidden; width: max-content;
          font-family: "Inter", sans-serif; font-size: 23px;
          text-transform: uppercase; user-select: none;
          text-shadow: 0 var(--line-height-abs) 0 var(--text);
        }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span {
          display: block; -webkit-backface-visibility: hidden; backface-visibility: hidden;
          white-space: pre; flex-shrink: 0;
          font-family: inherit; font-weight: inherit; font-style: inherit;
          font-size: inherit; letter-spacing: inherit;
          line-height: 20px;
          color: var(--text);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .roll-btn:hover .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span {
          transform: translateY(-20px);
        }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(1) { transition-delay: 0.00s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(2) { transition-delay: 0.02s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(3) { transition-delay: 0.04s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(4) { transition-delay: 0.06s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(5) { transition-delay: 0.08s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(6) { transition-delay: 0.10s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(7) { transition-delay: 0.12s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(8) { transition-delay: 0.14s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(9) { transition-delay: 0.16s; }
        .rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890 span:nth-child(10) { transition-delay: 0.18s; }
      `}</style>

      {/* --- SCROLL-TRACKING CENTRAL BACKGROUND CONTENT --- */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full flex flex-col justify-center items-center bg-transparent pointer-events-none z-0"
        style={{
          height: "100vh",
          willChange: "transform",
        }}
      >
        <div className="w-full flex flex-col items-center justify-center space-y-6 sm:space-y-10">
          {/* Infinite Left-Loop Marquee Text in subtle coal-950/4 watermark Satoshi Font */}
          <div className="bg-marquee-mask w-full select-none pointer-events-none font-display font-medium tracking-tighter text-coal-950/4 overflow-hidden text-[5rem] sm:text-[10rem] md:text-[12rem] leading-none z-1">
            <div className={`flex w-max animate-bg-marquee ${!isVisible ? "paused-marquee" : ""}`}>
              {/* Slide 1 */}
              <div className="flex items-center space-x-12 pr-12">
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
              </div>
              {/* Slide 2 (for seamless loop) */}
              <div className="flex items-center space-x-12 pr-12" aria-hidden="true">
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
                <span>© Testimonials レビュー / Real Feedback.</span><span className="text-coal-950/10">✦</span>
              </div>
            </div>
          </div>

          {/* "SHOW PROOF" BUTTON BELOW MARQUEE */}
          <div className="pointer-events-auto z-10">
            <a
              href="https://drive.google.com/drive/folders/12ZG18Q6_KnrU-Do07HfiFyX5VpiEnEBK?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleShowProof}
              className="roll-btn inline-block bg-white/70 backdrop-blur-md border border-coal-900/15 hover:border-coal-950 text-coal-950 hover:bg-coal-950 hover:text-bone-50 transition-all duration-300 font-sans font-semibold tracking-widest rounded-full shadow-md hover:shadow-xl active:scale-95 cursor-pointer uppercase text-center overflow-hidden"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", overflow: "hidden", padding: "12px 24px", boxSizing: "border-box" }}>
                <p className="rolling-text-inner-c5efe3cd-9346-4501-81f6-75ee825d9890">
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>S</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>H</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>O</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>W</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>{"\u00a0"}</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>P</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>R</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>O</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>O</span>
                  <span style={{ display: "block", fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif', fontSize: "23px", fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: "20px", willChange: "transform" }}>F</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* --- SCROLLABLE FOREGROUND LANES GRID --- */}
      <div className="relative z-10 w-full bg-transparent pointer-events-none">
        {/* Top Information Label Row */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 pt-16">
          <div className="w-full flex justify-between items-end pb-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-coal-600 uppercase">
            <span className="font-medium">© Testimonials レビュー</span>
            <span className="opacity-85 font-mono">REAL FEEDBACK</span>
          </div>
          <div className="border-b border-coal-900/10 w-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-[18vh] pb-[25vh] flex flex-col gap-[18vh] sm:gap-[28vh]">
          
          {/* LANES ROW 1: [Card 1] [empty-lane] [Card 2] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 lg:gap-24 items-start">
            
            {/* Lane 1: Ron Jackson */}
            <div className="flex justify-center w-full pointer-events-auto">
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(10,10,12,0.22)" }}
                transition={{ duration: 0.22 }}
                className="bg-bone-100/50 hover:bg-bone-100/80 backdrop-blur-md border border-coal-900/10 rounded-3xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_12px_30px_rgba(10,10,12,0.04)] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="space-y-4 text-coal-950 font-sans text-[15px] sm:text-base leading-relaxed font-light text-left">
                    {SCREENSHOT_TESTIMONIALS[0].quotes.map((q, idx) => (
                      <p key={idx}>"{q}"</p>
                    ))}
                  </div>
                </div>

                {/* Card footer: Author and Logo branding line */}
                <div className="border-t border-coal-900/10 pt-4 mt-8 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${SCREENSHOT_TESTIMONIALS[0].avatarBg} flex items-center justify-center font-bold text-xs text-white tracking-wider flex-shrink-0`}>
                      {SCREENSHOT_TESTIMONIALS[0].initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sans font-semibold text-sm text-coal-950">
                          {SCREENSHOT_TESTIMONIALS[0].author}
                        </span>
                        <VerifiedBadge />
                      </div>
                      <span className="font-mono text-[10px] text-coal-600 uppercase tracking-wider block mt-0.5">
                        {SCREENSHOT_TESTIMONIALS[0].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Empty Lane (invisible container to preserve layout on desktops) */}
            <div className="hidden md:block opacity-0 pointer-events-none" aria-hidden="true" />

            {/* Lane 3: Jake Sujanani */}
            <div className="flex justify-center w-full pointer-events-auto">
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(10,10,12,0.22)" }}
                transition={{ duration: 0.22 }}
                className="bg-bone-100/50 hover:bg-bone-100/80 backdrop-blur-md border border-coal-900/10 rounded-3xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_12px_30px_rgba(10,10,12,0.04)] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="space-y-4 text-coal-950 font-sans text-[15px] sm:text-base leading-relaxed font-light text-left">
                    {SCREENSHOT_TESTIMONIALS[1].quotes.map((q, idx) => (
                      <p key={idx}>"{q}"</p>
                    ))}
                  </div>
                </div>

                {/* Card footer: Author and Logo branding line */}
                <div className="border-t border-coal-900/10 pt-4 mt-8 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${SCREENSHOT_TESTIMONIALS[1].avatarBg} flex items-center justify-center font-bold text-xs text-white tracking-wider flex-shrink-0`}>
                      {SCREENSHOT_TESTIMONIALS[1].initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sans font-semibold text-sm text-coal-950">
                          {SCREENSHOT_TESTIMONIALS[1].author}
                        </span>
                        <VerifiedBadge />
                      </div>
                      <span className="font-mono text-[10px] text-coal-600 uppercase tracking-wider block mt-0.5">
                        {SCREENSHOT_TESTIMONIALS[1].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* LANES ROW 2: [empty-lane] [Card 3 - Sam Milsap] [empty-lane] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 lg:gap-24 items-start">
            
            {/* Empty Lane 1 */}
            <div className="hidden md:block opacity-0 pointer-events-none" aria-hidden="true" />

            {/* Lane 2: Sam Milsap */}
            <div className="flex justify-center w-full pointer-events-auto">
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(10,10,12,0.22)" }}
                transition={{ duration: 0.22 }}
                className="bg-bone-100/50 hover:bg-bone-100/80 backdrop-blur-md border border-coal-900/10 rounded-3xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_12px_30px_rgba(10,10,12,0.04)] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="space-y-4 text-coal-950 font-sans text-[15px] sm:text-base leading-relaxed font-light text-left">
                    {SCREENSHOT_TESTIMONIALS[2].quotes.map((q, idx) => (
                      <p key={idx}>"{q}"</p>
                    ))}
                  </div>
                </div>

                {/* Card footer: Author and Logo branding line */}
                <div className="border-t border-coal-900/10 pt-4 mt-8 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${SCREENSHOT_TESTIMONIALS[2].avatarBg} flex items-center justify-center font-bold text-xs text-white tracking-wider flex-shrink-0`}>
                      {SCREENSHOT_TESTIMONIALS[2].initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sans font-semibold text-sm text-coal-950">
                          {SCREENSHOT_TESTIMONIALS[2].author}
                        </span>
                        <VerifiedBadge />
                      </div>
                      <span className="font-mono text-[10px] text-coal-600 uppercase tracking-wider block mt-0.5">
                        {SCREENSHOT_TESTIMONIALS[2].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Empty Lane 3 */}
            <div className="hidden md:block opacity-0 pointer-events-none" aria-hidden="true" />

          </div>

          {/* LANES ROW 3: [Card 4] [empty-lane] [Card 5] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 lg:gap-24 items-start">
            
            {/* Lane 1: Lucas Ito */}
            <div className="flex justify-center w-full pointer-events-auto">
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(10,10,12,0.22)" }}
                transition={{ duration: 0.22 }}
                className="bg-bone-100/50 hover:bg-bone-100/80 backdrop-blur-md border border-coal-900/10 rounded-3xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_12px_30px_rgba(10,10,12,0.04)] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="space-y-4 text-coal-950 font-sans text-[15px] sm:text-base leading-relaxed font-light text-left">
                    {SCREENSHOT_TESTIMONIALS[3].quotes.map((q, idx) => (
                      <p key={idx}>"{q}"</p>
                    ))}
                  </div>
                </div>

                {/* Card footer: Author and Logo branding line */}
                <div className="border-t border-coal-900/10 pt-4 mt-8 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${SCREENSHOT_TESTIMONIALS[3].avatarBg} flex items-center justify-center font-bold text-xs text-white tracking-wider flex-shrink-0`}>
                      {SCREENSHOT_TESTIMONIALS[3].initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sans font-semibold text-sm text-coal-950">
                          {SCREENSHOT_TESTIMONIALS[3].author}
                        </span>
                        <VerifiedBadge />
                      </div>
                      <span className="font-mono text-[10px] text-coal-600 uppercase tracking-wider block mt-0.5">
                        {SCREENSHOT_TESTIMONIALS[3].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Empty Lane */}
            <div className="hidden md:block opacity-0 pointer-events-none" aria-hidden="true" />

            {/* Lane 3: Gunnoid */}
            <div className="flex justify-center w-full pointer-events-auto">
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(10,10,12,0.22)" }}
                transition={{ duration: 0.22 }}
                className="bg-bone-100/50 hover:bg-bone-100/80 backdrop-blur-md border border-coal-900/10 rounded-3xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_12px_30px_rgba(10,10,12,0.04)] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="space-y-4 text-coal-950 font-sans text-[15px] sm:text-base leading-relaxed font-light text-left">
                    {SCREENSHOT_TESTIMONIALS[4].quotes.map((q, idx) => (
                      <p key={idx} className="mb-4 last:mb-0">"{q}"</p>
                    ))}
                  </div>
                </div>

                {/* Card footer: Author and Logo branding line */}
                <div className="border-t border-coal-900/10 pt-4 mt-8 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${SCREENSHOT_TESTIMONIALS[4].avatarBg} flex items-center justify-center font-bold text-xs text-white tracking-wider flex-shrink-0`}>
                      {SCREENSHOT_TESTIMONIALS[4].initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sans font-semibold text-sm text-coal-950">
                          {SCREENSHOT_TESTIMONIALS[4].author}
                        </span>
                        <VerifiedBadge />
                      </div>
                      <span className="font-mono text-[10px] text-coal-600 uppercase tracking-wider block mt-0.5">
                        {SCREENSHOT_TESTIMONIALS[4].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
