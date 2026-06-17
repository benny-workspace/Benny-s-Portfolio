/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface SectionHeaderProps {
  id?: string;
  leftLabel: string;
  rightLabel: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  id,
  leftLabel,
  rightLabel,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  const trimmed = title.trim();
  const isLoopTitle = trimmed === "Practice. Makes. Perfect.";
  const isOneWord = !trimmed.includes(" ") && !isLoopTitle;

  return (
    <div id={id} className={`w-full mb-14 select-none ${className}`}>
      {/* Meta Row (Monospace Row Above Border Line) */}
      <div className="w-full flex justify-between items-end pb-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase">
        <span className="font-medium">{leftLabel}</span>
        <span className="opacity-85 font-mono">{rightLabel}</span>
      </div>

      {/* Screenshot Line Segment */}
      <div className="border-b border-border-custom w-full" />

      {/* Main Massive Title (Below Border Line) */}
      <div className="mt-10 sm:mt-14 overflow-hidden">
        {isLoopTitle ? (
          /* LOOPING THREE-WORD ROTATION DESIGN WITH SPIRAL LETTER ROLL */
          <div className="flex items-end">
            <style>{`
              @keyframes header-roll-word1 {
                0%, 25% { transform: translateY(0); }
                33%, 58% { transform: translateY(-100%); }
                66%, 91% { transform: translateY(-200%); }
                100% { transform: translateY(0); }
              }
              @keyframes header-roll-word2 {
                0%, 25% { transform: translateY(100%); }
                33%, 58% { transform: translateY(0); }
                66%, 91% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
              }
              @keyframes header-roll-word3 {
                0%, 25% { transform: translateY(200%); }
                33%, 58% { transform: translateY(100%); }
                66%, 91% { transform: translateY(0); }
                100% { transform: translateY(200%); }
              }
              .animate-header-roll-word1 {
                animation: header-roll-word1 8s cubic-bezier(0.25, 1, 0.35, 1) infinite;
                will-change: transform;
              }
              .animate-header-roll-word2 {
                animation: header-roll-word2 8s cubic-bezier(0.25, 1, 0.35, 1) infinite;
                will-change: transform;
              }
              .animate-header-roll-word3 {
                animation: header-roll-word3 8s cubic-bezier(0.25, 1, 0.35, 1) infinite;
                will-change: transform;
              }
            `}</style>
            <h2 className="font-display font-extrabold text-6xl sm:text-8xl md:text-[8rem] tracking-tight leading-none text-text-primary select-none flex flex-wrap items-end py-1 relative w-full">
              {/* Word 1: Practice. */}
              <span className="flex items-end relative z-10 leading-none">
                {"Practice.".split("").map((char, index) => {
                  const delay = `${(index * 0.045).toFixed(3)}s`;
                  return (
                    <span
                      key={index}
                      className="inline-block overflow-hidden relative leading-none align-bottom h-[1.12em]"
                    >
                      <span
                        className="block animate-header-roll-word1 text-text-primary"
                        style={{ animationDelay: delay }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </span>

              {/* Word 2: Makes. */}
              <span className="absolute inset-0 flex items-end justify-start py-1 z-10 leading-none pointer-events-none">
                {"Makes.".split("").map((char, index) => {
                  const delay = `${(index * 0.045).toFixed(3)}s`;
                  return (
                    <span
                      key={index}
                      className="inline-block overflow-hidden relative leading-none align-bottom h-[1.12em]"
                    >
                      <span
                        className="block animate-header-roll-word2 text-text-primary"
                        style={{ animationDelay: delay }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </span>

              {/* Word 3: Perfect. */}
              <span className="absolute inset-0 flex items-end justify-start py-1 z-10 leading-none pointer-events-none">
                {"Perfect.".split("").map((char, index) => {
                  const delay = `${(index * 0.045).toFixed(3)}s`;
                  return (
                    <span
                      key={index}
                      className="inline-block overflow-hidden relative leading-none align-bottom h-[1.12em]"
                    >
                      <span
                        className="block animate-header-roll-word3 text-text-primary"
                        style={{ animationDelay: delay }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </span>
            </h2>
          </div>
        ) : isOneWord ? (
          /* ONE-WORD SPLIT-LETTER ROLL ANIMATION */
          <div className="flex items-end">
            <h2 className="font-display font-extrabold text-6xl sm:text-8xl md:text-[8rem] tracking-tight leading-none text-text-primary select-none flex flex-wrap items-end py-1">
              {trimmed.split("").map((char, index) => {
                const delay = `${(index * 0.045).toFixed(3)}s`;
                return (
                  <span
                    key={index}
                    className="inline-block overflow-hidden relative leading-none align-bottom h-[1.12em]"
                  >
                    <span
                      className="block animate-header-split-letter-roll"
                      style={{ animationDelay: delay }}
                    >
                      {char}
                    </span>
                    <span
                      className="absolute top-full left-0 block animate-header-split-letter-roll w-full"
                      style={{ animationDelay: delay }}
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
              {/* Period "." */}
              <span className="inline-block overflow-hidden relative leading-none align-bottom h-[1.12em]">
                <span
                  className="block animate-header-split-letter-roll text-text-primary font-bold"
                  style={{ animationDelay: `${(trimmed.length * 0.045).toFixed(3)}s` }}
                >
                  .
                </span>
                <span
                  className="absolute top-full left-0 block animate-header-split-letter-roll text-text-primary font-bold w-full"
                  style={{ animationDelay: `${(trimmed.length * 0.045).toFixed(3)}s` }}
                >
                  .
                </span>
              </span>
            </h2>
          </div>
        ) : (
          /* MULTI-WORD MARQUEE HEADER ANIMATION */
          <div className="header-marquee-mask overflow-hidden w-full relative select-none py-2">
            <div className="flex w-max animate-header-marquee">
              {/* Slide 1 */}
              <div className="flex items-center space-x-12 pr-12">
                {Array(4)
                  .fill(trimmed)
                  .map((text, idx) => (
                    <React.Fragment key={`c1-${idx}`}>
                      <span className="font-display font-extrabold text-5xl sm:text-7xl md:text-[7.5rem] tracking-tight leading-none text-text-primary uppercase whitespace-nowrap">
                        {text}
                      </span>
                      <span className="text-2xl sm:text-4xl text-text-secondary">•</span>
                    </React.Fragment>
                  ))}
              </div>
              {/* Slide 2 */}
              <div className="flex items-center space-x-12 pr-12" aria-hidden="true">
                {Array(4)
                  .fill(trimmed)
                  .map((text, idx) => (
                    <React.Fragment key={`c2-${idx}`}>
                      <span className="font-display font-extrabold text-5xl sm:text-7xl md:text-[7.5rem] tracking-tight leading-none text-text-primary uppercase whitespace-nowrap">
                        {text}
                      </span>
                      <span className="text-2xl sm:text-4xl text-text-secondary">•</span>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Section Subtitle / Description below the title */}
        {description && (
          <p className="text-sm text-[#737373] mt-6 max-w-2xl font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
