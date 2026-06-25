/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export default function BottomBento() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const watermarkTextRef = useRef<SVGTextElement>(null);
  const watermarkSvgRef = useRef<SVGSVGElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Watermark auto-fit implementation
  const fitWatermark = () => {
    const svg = watermarkSvgRef.current;
    const textElem = watermarkTextRef.current;
    if (!svg || !textElem) return;
    try {
      const bbox = textElem.getBBox();
      if (bbox.width > 0 && bbox.height > 0) {
        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitWatermark);
    } else {
      window.addEventListener("load", fitWatermark);
    }
    window.addEventListener("resize", fitWatermark);
    const timer = setTimeout(fitWatermark, 200);

    return () => {
      window.removeEventListener("resize", fitWatermark);
      window.removeEventListener("load", fitWatermark);
      clearTimeout(timer);
    };
  }, []);

  // Set of verified links
  const links = {
    facebook: "https://web.facebook.com/bennyuncrowned",
    instagramEntreprenurial: "https://www.instagram.com/ceobennyco",
    instagramPersonal: "https://www.instagram.com/bennyuncrowned",
    youtube: "https://www.youtube.com/@bennyunmatched",
    discord: "https://discord.gg/jm5cxrT694",
    linkedin: "https://www.linkedin.com/in/ceobenny/",
    twitter: "https://x.com/bennyuncrowned",
    pinterest: "https://pt.pinterest.com/bennyunmatched/",
    medium: "https://medium.com/@bennyco",
    googleMaps: "https://www.google.com/maps/contrib/108566019481010681421/reviews/@22.7572178,19.8932077,3z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
    tiktok: "https://www.tiktok.com/@ceobennyco",
    email: "mailto:bennysworkspace@gmail.com",
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-transparent relative overflow-hidden" id="bento-footer">
      <style>{`
        /* CUSTOM FOOTER ACCENT STYLING BASED ON YOUR PRESET ACCORDION-BRAND */
        .brand-footer-section {
          font-family: var(--font-sans);
          width: 100%;
          position: relative;
        }

        .footer-wrapper {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 990px) {
          .footer-wrapper {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .footer-left {
          position: relative;
          min-height: 420px;
          border-radius: 28px;
          padding: 36px 32px;
          overflow: hidden;
          background: #0A1931; /* navy blue fallback -> primary brand navy */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px rgba(21, 76, 189, 0.35); /* blue glow from example */
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-left:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 50px rgba(21, 76, 189, 0.55);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .footer-left-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          opacity: 1.0; /* No tint, opacity 1 - clean video presence */
        }

        .footer-logo-name, .footer-tagline, .footer-social-label {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.75);
        }

        .footer-logo {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
        }

        .footer-logo-mark {
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.07);
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        .footer-logo-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.03em;
          color: white;
        }

        .footer-tagline-container {
          margin-top: auto;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .footer-tagline {
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: 18px;
          line-height: 1.45;
          color: white;
        }

        .footer-tagline span {
          color: rgba(255, 255, 255, 0.55);
          font-size: 14px;
          display: block;
          margin-top: 4px;
        }

        .footer-social-row {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          border-t: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 18px;
        }

        .footer-social-label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.3px;
        }

        .footer-social-icons {
          display: flex;
          flex-direction: row;
          gap: 8px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-icon svg {
          width: 16px;
          height: 16px;
          display: block;
          fill: currentColor;
        }

        .social-icon:hover {
          background: #ffffff;
          color: #0b0b0b;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 16px rgba(255, 255, 255, 0.15);
        }

        /* RIGHT CARD STYLES */
        .footer-right {
          background: var(--surface-custom, #141414);
          border: 1px solid var(--border-custom, #262626);
          border-radius: 28px;
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: visible;
          transition: all 0.2s ease;
        }

        .footer-lucky-graphic {
          position: absolute;
          top: -38px;
          right: 44px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .lucky-cube {
          width: 88px;
          height: 88px;
          border-radius: 22px;
          transform: rotate(-10deg);
          background: linear-gradient(135deg, #5b9ffb 0%, #1e5dd7 55%, #1448be 100%);
          box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.4), inset -3px -3px 12px rgba(0, 0, 0, 0.25), 0 12px 36px rgba(20, 72, 200, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .lucky-cube:hover {
          transform: rotate(12deg) scale(1.1);
          box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.5), inset -3px -3px 12px rgba(0, 0, 0, 0.18), 0 20px 48px rgba(20, 72, 200, 0.85);
        }

        .lucky-cube-mark {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 38px;
          letter-spacing: -0.04em;
          color: var(--text-primary, #ffffff);
          line-height: 1;
        }

        .lucky-text-row {
          display: flex;
          flex-direction: row;
          gap: 6px;
          align-items: center;
          transform: rotate(-3deg);
          margin-top: 4px;
        }

        .lucky-arrow {
          width: 20px;
          height: 20px;
          color: var(--text-secondary, #a3a3a3);
        }

        .lucky-text {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 18px;
          color: var(--text-secondary, #a3a3a3);
          white-space: nowrap;
        }

        .footer-nav-cols {
          display: flex;
          flex-direction: row;
          gap: 64px;
          flex-wrap: wrap;
          padding-top: 12px;
        }

        .footer-col {
          min-width: 140px;
        }

        .footer-col-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 24px;
          font-style: italic;
          color: var(--text-secondary, #a3a3a3);
          margin-bottom: 16px;
        }

        .footer-col-links a {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 13.5px;
          color: var(--text-primary, #ffffff);
          text-decoration: none;
          margin-bottom: 11px;
          transition: all 0.2s ease;
        }

        .footer-col-links a:hover {
          color: var(--text-secondary, #a3a3a3);
          transform: translateX(4px);
        }

        .footer-bottom {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 48px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-copyright {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 12px;
          color: var(--text-secondary, #a3a3a3);
          letter-spacing: 0.05em;
        }

        .footer-cta-mini {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          max-width: 340px;
        }

        .footer-cta-mini h4 {
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: 14px;
          color: var(--text-secondary, #a3a3a3);
          line-height: 1.45;
          margin: 0;
        }

        .footer-cta-mini h4 strong {
          display: block;
          font-weight: 700;
          font-size: 18px;
          color: var(--text-primary, #ffffff);
          margin-top: 2px;
        }

        .footer-subscribe-row {
          display: flex;
          flex-direction: row;
          background: var(--bg-custom, #0B0B0B);
          border: 1px solid var(--border-custom, #262626);
          border-radius: 12px;
          padding: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .footer-subscribe-row input {
          flex: 1;
          padding: 10px 14px;
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-primary, #ffffff);
          outline: none;
        }

        .footer-subscribe-row input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .footer-subscribe-row button {
          padding: 10px 18px;
          background: var(--text-primary, #ffffff);
          border: none;
          color: var(--bg-custom, #0b0b0b);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 12.5px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .footer-subscribe-row button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        /* WATERMARK BRANDING */
        .footer-watermark {
          max-width: 1150px;
          margin: -48px auto 0;
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 0;
          line-height: 0;
        }

        .footer-watermark svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .footer-watermark text {
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: -0.04em;
          fill: var(--border-custom, #262626);
          opacity: 0.15;
          transition: fill 0.2s ease;
        }

        @media (max-width: 768px) {
          .footer-left {
            align-items: center;
            text-align: center;
            min-height: auto;
            padding: 40px 24px;
          }
          .footer-logo {
            justify-content: center;
            margin-bottom: 24px;
            width: 100%;
          }
          .footer-tagline-container {
            margin: 0 auto 24px auto;
          }
          .footer-social-row {
            justify-content: center;
            width: 100%;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            padding-top: 20px;
            flex-direction: column;
            gap: 12px;
          }
          .footer-social-icons {
            justify-content: center;
            width: 100%;
          }
          .footer-right {
            padding: 36px 24px;
          }
          .footer-nav-cols {
            gap: 40px 24px;
            justify-content: center;
          }
          .footer-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .footer-col-links a {
            justify-content: center;
          }
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
            gap: 32px;
          }
          .footer-cta-mini {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-cta-mini h4 {
            text-align: center;
          }
          .footer-subscribe-row {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
          .footer-lucky-graphic {
            position: relative;
            top: 0;
            right: 0;
            margin: 0 auto 36px auto;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: auto;
          }
          .lucky-text-row {
            justify-content: center;
            transform: none;
            margin-top: 8px;
          }
          .lucky-cube {
            transform: none !important;
            margin: 0 auto;
            width: 68px;
            height: 68px;
          }
          .lucky-cube-mark {
            font-size: 28px;
          }
          .lucky-text {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto brand-footer-section">
        <div className="footer-wrapper">
          {/* LEFT CHROME CARD: WITH DIRECT MP4 VIDEO + LOGO + SOCIAL LINK ROW */}
          <div className="footer-left">
            <video className="footer-left-video" autoPlay muted loop playsInline preload="auto">
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* LOG DETECT */}
            <div className="footer-logo">
              <div className="footer-logo-mark">C</div>
              <span className="footer-logo-name">ceobennyco</span>
            </div>

            {/* BRAND ARGUMENTS */}
            <div className="footer-tagline-container">
              <div className="footer-tagline text-balance">
                Your cinematic agency & creative director.<br />
                <span>Crafting narrative experiences of absolute visual excellence.</span>
              </div>
            </div>

            {/* QUICK SOCIAL PANEL */}
            <div className="footer-social-row">
              <span className="footer-social-label">Stay in touch!</span>
              <div className="footer-social-icons">
                {/* LinkedIn */}
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-white/80 hover:text-white"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram (Entrepreneurial) */}
                <a
                  href={links.instagramEntreprenurial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-white/80 hover:text-white"
                  title="Instagram (Entrepreneurial)"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.073-3.668-.072-4.948-.2-4.358-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-white/80 hover:text-white"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Discord */}
                <a
                  href={links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-white/80 hover:text-white"
                  title="Discord Community"
                  aria-label="Discord"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.075.075 0 0 0-.079.032c-.212.38-.448.854-.614 1.232a18.47 18.47 0 0 0-5.54 0c-.166-.378-.402-.852-.614-1.232a.077.077 0 0 0-.079-.032 19.736 19.736 0 0 0-4.885 1.515.072.072 0 0 0-.032.03c-3.118 4.646-3.97 9.184-3.548 13.652a.074.074 0 0 0 .03.048 19.91 19.91 0 0 0 5.994 3.026.077.077 0 0 0 .083-.028c.461-.63.872-1.294 1.227-2 .02-.035.006-.078-.03-.094a13.152 13.152 0 0 1-1.868-.895.076.076 0 0 1-.036-.098.078.078 0 0 1 .06-.046c.125-.014.25-.034.373-.058a.076.076 0 0 1 .066.017 13.61 13.61 0 0 0 10.052 0 .076.076 0 0 1 .066-.017c.123.024.248.044.373.058a.078.078 0 0 1 .06.046.076.076 0 0 1-.036.098 13.162 13.162 0 0 1-1.868.895.076.076 0 0 0-.03.094c.356.706.767 1.37 1.227 2a.077.077 0 0 0 .083.028 19.912 19.912 0 0 0 5.994-3.026.074.074 0 0 0 .03-.048c.492-5.056-.823-9.547-3.522-13.652a.069.069 0 0 0-.032-.03ZM8.02 15.33c-1.196 0-2.188-1.098-2.188-2.443 0-1.345.97-2.443 2.188-2.443 1.217 0 2.188 1.098 2.188 2.443 0 1.345-.954 2.443-2.188 2.443Zm7.96 0c-1.196 0-2.188-1.098-2.188-2.443 0-1.345.97-2.443 2.188-2.443 1.217 0 2.188 1.098 2.188 2.443 0 1.345-.954 2.443-2.188 2.443Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT COLUMN: NESTED INTERACTIVE DIRECTORY */}
          <div className="footer-right">
            {/* FLOATING CUBE ACCENT */}
            <div className="footer-lucky-graphic">
              <div
                className="lucky-cube"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                title="Back to Top"
              >
                <span className="lucky-cube-mark">B</span>
              </div>
              <div className="lucky-text-row">
                <div className="lucky-arrow">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 19V5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12L12 5L19 12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="lucky-text">Back to Top</span>
              </div>
            </div>

            {/* DIRECTORIES GONE DIGITAL */}
            <div className="footer-right-top">
              <div className="footer-nav-cols">
                {/* COLUMN 1: INSTAGRAM CHANNELS */}
                <div className="footer-col">
                  <div className="footer-col-title">Socials</div>
                  <div className="footer-col-links">
                    <a href={links.instagramEntreprenurial} target="_blank" rel="noopener noreferrer">
                      Entrepreneurial IG
                    </a>
                    <a href={links.instagramPersonal} target="_blank" rel="noopener noreferrer">
                      Personal Brand IG
                    </a>
                    <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
                      TikTok Account
                    </a>
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook Hub
                    </a>
                  </div>
                </div>

                {/* COLUMN 2: PROFESSIONAL CHANNELS */}
                <div className="footer-col">
                  <div className="footer-col-title">Professional</div>
                  <div className="footer-col-links">
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn Network
                    </a>
                    <a href={links.medium} target="_blank" rel="noopener noreferrer">
                      Medium Articles
                    </a>
                    <a href={links.pinterest} target="_blank" rel="noopener noreferrer">
                      Pinterest Boards
                    </a>
                    <a href={links.googleMaps} target="_blank" rel="noopener noreferrer">
                      Google Maps Profiles
                    </a>
                  </div>
                </div>

                {/* COLUMN 3: BACKUP */}
                <div className="footer-col">
                  <div className="footer-col-title">Backup Link</div>
                  <div className="footer-col-links font-mono text-[11px]">
                    <Link to="/" className="font-sans font-medium">
                      Home
                    </Link>
                    <Link to="/work" className="font-sans font-medium">
                      Work
                    </Link>
                    <Link to="/offers" className="font-sans font-medium">
                      Offers
                    </Link>
                    <Link to="/contact" className="font-sans font-medium">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: CTA + NEWSLETTER WRAPPED */}
            <div className="footer-bottom">
              <div className="footer-copyright">
                © 2026 ceobennyco. All Rights Reserved.
              </div>

              <div className="footer-cta-mini">
                <h4>
                  Modern aesthetics move rapidly.<br />
                  <strong>Stay ahead with ceobennyco.</strong>
                </h4>

                <form onSubmit={handleSubscribe} className="footer-subscribe-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    aria-label="Email for updates"
                  />
                  <button type="submit">Subscribe</button>
                </form>

                <AnimatePresence>
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-emerald-500 font-medium"
                    >
                      🎉 Subscribed successfully to the ceobennyco list!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERSIZED SVG WATERMARK SHIFTED */}
      <div className="footer-watermark" aria-hidden="true">
        <svg ref={watermarkSvgRef} id="watermarkSvg" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet">
          <text
            ref={watermarkTextRef}
            id="watermarkText"
            x="200"
            y="80"
            textAnchor="middle"
            fontSize="120"
            fontWeight="900"
          >
            CEOBENNYCO
          </text>
        </svg>
      </div>
    </section>
  );
}
