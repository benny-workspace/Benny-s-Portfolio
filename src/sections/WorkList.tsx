/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";
import SectionHeader from "../components/SectionHeader";
import { useOpenProject } from "../context/ProjectModalContext";

export default function WorkList() {
  const openProject = useOpenProject();

  return (
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
            onClick={() => openProject(proj)}
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
  );
}
