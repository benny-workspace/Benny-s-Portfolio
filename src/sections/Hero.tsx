/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp } from "lucide-react";
import CountUp from "../components/CountUp";

const HERO_VIDEO =
  "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Videos%20(Under%2030s)/download.mp4";

export default function Hero() {
  return (
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
          src={HERO_VIDEO}
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
  );
}
