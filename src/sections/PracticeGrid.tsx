/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";
import { PRACTICES } from "../data";
import SectionHeader from "../components/SectionHeader";

export default function PracticeGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="practice-section">
      <SectionHeader
        leftLabel="© CAPABILITIES ケイパ"
        rightLabel="CAPABILITIES"
        title="Practice. Makes. Perfect."
      />

      <div className="flex justify-end -mt-12 mb-10">
        <button
          onClick={() => navigate("/contact")}
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
  );
}
