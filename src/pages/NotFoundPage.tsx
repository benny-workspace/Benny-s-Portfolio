/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const BottomBento = lazy(() => import("../components/BottomBento"));

const SUPA = "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Images";

// Each floating image: src, initial position (%), rotation, depth (parallax speed multiplier)
const FLOATING_IMAGES = [
  { src: `${SUPA}/1769160829960.jpg`,                    top:  8,  left:  8,  rotate: -12, depth: 0.04, w: 160 },
  { src: `${SUPA}/digi_dental_linkedin_2.png`,            top:  5,  left: 36,  rotate:   6, depth: 0.07, w: 140 },
  { src: `${SUPA}/digi_dental_batch2_1.png`,              top:  4,  left: 68,  rotate:  -8, depth: 0.05, w: 150 },
  { src: `${SUPA}/before%26afterwebclienttestimonials.png`, top: 14, left: 85, rotate:  10, depth: 0.06, w: 130 },
  { src: `${SUPA}/FBgrowth.png`,                          top: 42,  left:  2,  rotate:  -6, depth: 0.08, w: 145 },
  { src: `${SUPA}/skin%26guthealth.png`,                  top: 42,  left: 88,  rotate:   8, depth: 0.05, w: 140 },
  { src: `${SUPA}/screenshot%20(41).jpg`,                 top: 68,  left:  5,  rotate:  14, depth: 0.07, w: 135 },
  { src: `${SUPA}/Shoyu%20Ramen.jpg`,                     top: 72,  left: 30,  rotate:  -5, depth: 0.04, w: 150 },
  { src: `${SUPA}/Japanese%20Dragon%20Stone%20Carving.jpg`, top: 75, left: 62, rotate:   9, depth: 0.06, w: 140 },
  { src: `${SUPA}/Japanese%20Neighborhood%20_.jpg`,        top: 70,  left: 84,  rotate:  -7, depth: 0.05, w: 155 },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize to -1..1 from center
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const animate = () => {
      const { x, y } = mouseRef.current;
      imagesRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOATING_IMAGES[i].depth;
        const tx = x * depth * 120;
        const ty = y * depth * 80;
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${FLOATING_IMAGES[i].rotate}deg)`;
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
        className="relative min-h-screen bg-[#080808] overflow-hidden flex flex-col items-center justify-center select-none"
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
              transition: "transform 0.08s linear",
            }}
          >
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover brightness-75"
            />
          </div>
        ))}

        {/* CENTRE TEXT */}
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <h1
            className="font-display font-black leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
          >
            Page
            <br />
            Not Found.
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-10 border border-white/80 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Go Home
          </button>
        </div>
      </div>

      {/* FOOTER — lets users navigate to the right place */}
      <Suspense fallback={null}>
        <BottomBento />
      </Suspense>
    </>
  );
}
