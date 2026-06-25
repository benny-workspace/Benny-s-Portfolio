/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useScroll } from "motion/react";

interface ScrollRevealParagraphProps {
  children: React.ReactNode;
  className?: string;
}

function countCharacters(node: React.ReactNode): number {
  if (typeof node === "string") {
    return node.length;
  }
  if (typeof node === "number") {
    return String(node).length;
  }
  if (Array.isArray(node)) {
    return node.reduce((acc, child) => acc + countCharacters(child), 0);
  }
  if (React.isValidElement(node) && (node.props as any).children) {
    return countCharacters((node.props as any).children);
  }
  return 0;
}

export default function ScrollRevealParagraph({ children, className = "" }: ScrollRevealParagraphProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null);

  // useScroll yields smooth hardware-accelerated tracking as element enters/leaves reading zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 45%"],
  });

  const totalChars = React.useMemo(() => countCharacters(children), [children]);

  // Recursively split the React tree into raw spans avoiding expensive component wrapper models
  const splitContent = React.useMemo(() => {
    let charCounter = 0;

    function renderAndSplitPlain(node: React.ReactNode): React.ReactNode {
      if (typeof node === "string" || typeof node === "number") {
        const textStr = String(node);
        const parts = textStr.split(/(\s+)/);
        return parts.map((part, partIdx) => {
          if (/^\s+$/.test(part)) {
            const spaces = part.split("");
            return spaces.map((char) => {
              const globalIdx = charCounter++;
              const blendStyle = {
                opacity: 0.18,
                pointerEvents: "none" as const,
              };
              return (
                <span key={`space-${partIdx}-${globalIdx}`} data-idx={globalIdx} style={blendStyle}>
                  &nbsp;
                </span>
              );
            });
          }

          const chars = part.split("");
          return (
            <span key={`word-${partIdx}`} className="inline-block whitespace-nowrap">
              {chars.map((char, charIdx) => {
                const globalIdx = charCounter++;
                const blendStyle = {
                  opacity: 0.18,
                  pointerEvents: "none" as const,
                };
                return (
                  <span
                    key={`${globalIdx}-${charIdx}`}
                    data-idx={globalIdx}
                    style={blendStyle}
                    className="inline-block transition-opacity duration-75"
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        });
      }

      if (Array.isArray(node)) {
        return node.map((child, idx) => (
          <React.Fragment key={idx}>
            {renderAndSplitPlain(child)}
          </React.Fragment>
        ));
      }

      if (React.isValidElement(node)) {
        const { children: childNodes, ...restProps } = node.props as any;
        if (childNodes !== undefined && childNodes !== null) {
          const splitChildren = renderAndSplitPlain(childNodes);
          return React.cloneElement(node, { ...restProps, key: node.key }, splitChildren);
        }
        return node;
      }

      return node;
    }

    return renderAndSplitPlain(children);
  }, [children]);

  // Handle direct DOM manipulation via scroll progress changes for ultra-performant 120fps rendering
  useEffect(() => {
    if (!containerRef.current) return;

    // Use IntersectionObserver so off-screen text reveal blocks don't consume any CPU cycle!
    let isVisible = false;

    // Direct querying of descendant characters in this specific paragraph
    const spanElements = containerRef.current.querySelectorAll("span[data-idx]");
    const part = 1 / Math.max(1, totalChars);

    const updateSpans = (progress: number) => {
      spanElements.forEach((el) => {
        const span = el as HTMLSpanElement;
        const globalIdx = parseInt(span.getAttribute("data-idx") || "0", 10);
        const start = globalIdx * part;
        // 4 units overlap transition range creates organic reading rhythm
        const end = Math.min(1.0, (globalIdx + 4) * part);

        let itemOpacity = 0.18;
        if (progress >= end) {
          itemOpacity = 1.0;
        } else if (progress <= start) {
          itemOpacity = 0.18;
        } else {
          itemOpacity = 0.18 + ((progress - start) / (end - start)) * 0.82;
        }
        span.style.opacity = String(itemOpacity);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            // Re-sync progress when entering view
            updateSpans(scrollYProgress.get());
          }
        });
      },
      { rootMargin: "100px" } // trigger slightly before entering viewport
    );
    observer.observe(containerRef.current);

    // Pre-load opacity immediately right after rendering to eliminate visible jumps
    updateSpans(scrollYProgress.get());

    // Subscribe to raw motion value changes
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isVisible) {
        updateSpans(latest);
      }
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollYProgress, totalChars, splitContent]);

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        mixBlendMode: "difference",
        color: "#ffffff",
      }}
    >
      {splitContent}
    </p>
  );
}
