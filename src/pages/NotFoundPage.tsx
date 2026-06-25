/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-[11px] tracking-widest text-text-secondary uppercase mb-4">
        404 — Page not found
      </p>
      <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight text-text-primary mb-6">
        Wrong room.
      </h1>
      <p className="text-text-secondary text-base sm:text-lg max-w-md mb-10 leading-relaxed">
        This page doesn't exist — but the rest of the portfolio does.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-text-primary text-bg-custom font-semibold text-sm px-6 py-3 rounded-full hover:opacity-80 transition-opacity duration-200 cursor-pointer focus:outline-none"
      >
        Back to Home
      </button>
    </section>
  );
}
