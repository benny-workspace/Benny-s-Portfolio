/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";
import SectionHeader from "../components/SectionHeader";
import { useOpenProject } from "../context/ProjectModalContext";

const FEATURED_IMAGE =
  "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Images/digi_dental_batch2_1.png";

export default function FeaturedCaseStudy() {
  const openProject = useOpenProject();

  return (
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
            src={FEATURED_IMAGE}
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
              The autonomous build that saves dental practices their lost hours and $ coverage. Artificial Intelligence used at its peak to gather Inbound clients and automatically book clinic clients to their calendars for practice owners to focus only on their dentistry.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-t border-coal-900/10 pt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#525252] uppercase">ROLE</span>
              <span className="font-display text-xs text-text-primary font-semibold">AI reception personal tailored Booking System</span>
            </div>

            <button
              onClick={() => openProject(PROJECTS[0])}
              className="bg-coal-950 text-bone-50 hover:bg-coal-800 text-xs font-semibold px-4 py-2 rounded-full shrink-0 flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              Read Project Details
              <ArrowUpRight className="w-3.5 h-3.5 text-bone-50" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
