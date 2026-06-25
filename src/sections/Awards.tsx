/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SectionHeader from "../components/SectionHeader";

export default function Awards() {
  return (
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
  );
}
