/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const BottomBento = lazy(() => import("../components/BottomBento"));

const SUPA = "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Images";

interface FloatingImage {
  src: string;
  top: number;
  left: number;
  rotate: number;
  depth: number; // higher = moves MORE with cursor
  w: number;
}

const FLOATING_IMAGES: FloatingImage[] = [
  { src: `${SUPA}/1769160829960.jpg`,                          top:  6,  left:  5,  rotate: -14, depth: 0.28, w: 160 },
  { src: `${SUPA}/digi_dental_linkedin_2.png`,                 top:  3,  left: 34,  rotate:   7, depth: 0.18, w: 145 },
  { src: `${SUPA}/digi_dental_batch2_1.png`,                   top:  5,  left: 66,  rotate:  -9, depth: 0.22, w: 155 },
  { src: `${SUPA}/before%26afterwebclienttestimonials.png`,    top: 12,  left: 86,  rotate:  11, depth: 0.30, w: 135 },
  { src: `${SUPA}/FBgrowth.png`,                               top: 40,  left:  1,  rotate:  -7, depth: 0.24, w: 150 },
  { src: `${SUPA}/skin%26guthealth.png`,                       top: 40,  left: 88,  rotate:   9, depth: 0.20, w: 145 },
  { src: `${SUPA}/screenshot%20(41).jpg`,                      top: 68,  left:  4,  rotate:  15, depth: 0.26, w: 140 },
  { src: `${SUPA}/Shoyu%20Ramen.jpg`,                          top: 74,  left: 28,  rotate:  -6, depth: 0.16, w: 155 },
  { src: `${SUPA}/Japanese%20Dragon%20Stone%20Carving.jpg`,    top: 72,  left: 63,  rotate:  10, depth: 0.22, w: 145 },
  { src: `${SUPA}/Japanese%20Neighborhood%20_.jpg`,            top: 70,  left: 85,  rotate:  -8, depth: 0.28, w: 158 },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  // Current interpolated mouse position
  const currentRef = useRef({ x: 0, y: 0 });
  // Raw target mouse position
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    // Lerp factor — lower = more lag = smoother/heavier feel
    const LERP = 0.07;

    const animate = () => {
      // Smooth interpolation toward mouse target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * LERP;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * LERP;

      const { x, y } = currentRef.current;

      imagesRef.current.forEach((el, i) => {
        if (!el) return;
        const { depth, rotate } = FLOATING_IMAGES[i];
        // Stronger translation range (×200 horizontal, ×140 vertical)
        const tx = x * depth * 200;
        const ty = y * depth * 140;
        // Subtle tilt based on cursor (up to ±3° extra)
        const rx = -y * depth * 15;
        const ry =  x * depth * 15;
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* HERO 404 SECTION */}
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center select-none"
        style={{ background: "var(--bg-custom)", perspective: "800px" }}
      >
        {/* FLOATING PARALLAX IMAGES */}
        {FLOATING_IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => { imagesRef.current[i] = el; }}
            className="absolute pointer-events-none z-10 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              top: `${img.top}%`,
              left: `${img.left}%`,
              width: `${img.w}px`,
              transform: `rotate(${img.rotate}deg)`,
              willChange: "transform",
            }}
          >
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
              style={{ opacity: 0.72 }}
            />
            {/* Theme-aware vignette overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "linear-gradient(135deg, var(--bg-custom) 0%, transparent 60%)", opacity: 0.35 }}
            />
          </div>
        ))}

        {/* CENTRE TEXT */}
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          {/* eyebrow */}
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-6"
             style={{ color: "var(--text-secondary)" }}>
            404 — Wrong address
          </p>

          {/* headline */}
          <h1
            className="font-display font-black leading-[0.9] tracking-tight"
            style={{
              fontSize: "clamp(4rem, 15vw, 13rem)",
              color: "var(--text-primary)",
            }}
          >
            Page
            <br />
            Not Found.
          </h1>

          {/* sub */}
          <p
            className="mt-6 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            This page doesn't exist — but the portfolio does.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/")}
            className="mt-10 text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
            style={{
              border: "1px solid var(--text-primary)",
              color: "var(--text-primary)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--text-primary)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-custom)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            }}
          >
            Go Home
          </button>
        </div>
      </div>

      {/* FOOTER — navigation fallback */}
      <Suspense fallback={null}>
        <BottomBento />
      </Suspense>
    </>
  );
}
