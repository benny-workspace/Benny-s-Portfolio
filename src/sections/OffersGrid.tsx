/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Globe, Dumbbell, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { GlowBorderCard } from "../components/GlowBorderCard";

const renderRollingButtonText = (text: string) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "16px", overflow: "hidden", boxSizing: "border-box" }}>
      <p className="rolling-text-inner-offers">
        {text.split("").map((char, index) => (
          <span key={index}>{char === " " ? " " : char}</span>
        ))}
      </p>
    </div>
  );
};

export default function OffersGrid() {
  const navigate = useNavigate();
  const goContact = () => navigate("/contact");

  return (
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
            onClick={goContact}
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
            onClick={goContact}
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
            onClick={goContact}
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
            onClick={goContact}
            className="roll-btn w-full mt-6 py-3.5 bg-coal-950 hover:bg-coal-800 text-bone-50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 cursor-pointer overflow-hidden border border-coal-950/10"
          >
            {renderRollingButtonText("Book Discovery Call →")}
          </button>
        </GlowBorderCard>
      </div>
    </section>
  );
}
