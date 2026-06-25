/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const PERSONA_IMAGE =
  "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Images/1769160829960.jpg";

export default function PersonaNarrative() {
  const navigate = useNavigate();

  return (
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
                src={PERSONA_IMAGE}
                alt="Benny with his online client ecosystem and community of 200+ members"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                decoding="async"
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
                onClick={() => navigate("/work")}
                className="bg-coal-950 hover:bg-coal-800 text-bone-50 text-xs font-semibold px-5  py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <span>Explore All Works</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border border-coal-900/15 hover:border-coal-950 text-coal-700 hover:text-coal-950 text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Queries / Staying Updated
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
