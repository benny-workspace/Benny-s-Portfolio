/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

export default function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let rafId: number;

    const SMOOTH = 0.55; // High responsiveness factor
    const INTERACTIVE = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"]), label, .cursor-pointer';

    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      try {
        return el.matches(INTERACTIVE) || !!el.closest(INTERACTIVE);
      } catch (e) {
        return false;
      }
    };

    const updateClass = () => {
      if (!cursor) return;
      if (isVisible) {
        cursor.classList.add("visible");
      } else {
        cursor.classList.remove("visible");
      }

      if (isHovering && !isClicking) {
        cursor.classList.add("is-hovering");
      } else {
        cursor.classList.remove("is-hovering");
      }

      if (isClicking) {
        cursor.classList.add("is-clicking");
      } else {
        cursor.classList.remove("is-clicking");
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        cursorX = mouseX;
        cursorY = mouseY;
        updateClass();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      isHovering = isInteractive(target);
      updateClass();
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Set hovering false depending on what we enter next
      const nextTarget = e.relatedTarget as HTMLElement | null;
      isHovering = isInteractive(nextTarget);
      updateClass();
    };

    const handleMouseEnter = () => {
      isVisible = true;
      updateClass();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      updateClass();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isClicking = true;
        updateClass();
      }
    };

    const handleMouseUp = () => {
      if (isClicking) {
        isClicking = false;
        updateClass();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const factor = Math.min(SMOOTH + dist * 0.005, 0.95);

      cursorX += dx * factor;
      cursorY += dy * factor;

      if (isVisible) {
        const scale = isClicking ? 0.65 : 1;
        // Shift left and top by -50% to naturally center the custom cursor circle over the coordinates
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop */
        @media (pointer: fine) {
          *,
          *::before,
          *::after {
            cursor: none !important;
          }
        }
        
        #magic-cursor-el {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transform: translate3d(-100px, -100px, 0) scale(1);
          box-shadow: 0 0 0 1.5px rgba(0,0,0,0.25), 0 0 8px rgba(0,0,0,0.06);
          opacity: 0;
          /* Specifically do NOT transition top/left/transform properties to avoid browser-level clash with fluid rAF updates */
          transition: opacity 0.2s, width 0.15s, height 0.15s, box-shadow 0.15s;
        }
        
        #magic-cursor-el.visible {
          opacity: 1;
        }

        #magic-cursor-el.is-hovering {
          width: 16px;
          height: 16px;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.3), 0 0 0 6px rgba(0,0,0,0.08), 0 0 20px rgba(0,0,0,0.05);
        }

        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          #magic-cursor-el {
            display: none !important;
          }
        }
      `}</style>
      <div id="magic-cursor-el" ref={cursorRef} aria-hidden="true" />
    </>
  );
}
