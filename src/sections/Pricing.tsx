/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

export default function Pricing() {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate("/offers")}
            className="px-4 py-1.5 bg-coal-950 text-bone-50 text-[10px] font-mono font-bold rounded-full hover:bg-coal-800 transition-colors"
          >
            BROWSE DRAFT PAC
          </button>
        </div>
      </div>
    </section>
  );
}
