import React, { useEffect, useRef, useState, ReactNode } from "react";

interface GlowBorderCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  theme?: "dark" | "light";
}

const colorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

export const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className = "",
  glowColor = "purple",
  theme = "light"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isMobileOrTablet) {
      const syncPointer = (e: PointerEvent) => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          cardRef.current.style.setProperty("--x", x.toFixed(2));
          cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty("--y", y.toFixed(2));
          cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
        }
      };

      document.addEventListener("pointermove", syncPointer);
      return () => document.removeEventListener("pointermove", syncPointer);
    } else {
      let animationFrameId: number;

      const tick = (time: number) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        
        // Total perimeter length
        const totalPerimeter = 2 * (w + h);

        // Complete one rotation loop every 5000ms
        const duration = 5000;
        const progress = (time % duration) / duration; // 0 to 1 range
        const d = progress * totalPerimeter;

        let targetX = 0;
        let targetY = 0;

        if (d < w) {
          // Top edge: Left -> Right
          targetX = rect.left + d;
          targetY = rect.top;
        } else if (d < w + h) {
          // Right edge: Top -> Bottom
          targetX = rect.right;
          targetY = rect.top + (d - w);
        } else if (d < 2 * w + h) {
          // Bottom edge: Right -> Left
          targetX = rect.right - (d - w - h);
          targetY = rect.bottom;
        } else {
          // Left edge: Bottom -> Top
          targetX = rect.left;
          targetY = rect.bottom - (d - 2 * w - h);
        }

        cardRef.current.style.setProperty("--x", targetX.toFixed(2));
        cardRef.current.style.setProperty("--y", targetY.toFixed(2));
        cardRef.current.style.setProperty("--xp", (targetX / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--yp", (targetY / window.innerHeight).toFixed(2));

        animationFrameId = requestAnimationFrame(tick);
      };

      animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isMobileOrTablet]);

  const { base, spread } = colorMap[glowColor];

  const styleVariables = {
    "--base": base,
    "--spread": spread,
    "--radius": "24", // matches rounded-3xl
    "--border": "1.5",
    "--size": "250",
    "--border-size": "calc(var(--border, 1.5) * 1px)",
    "--spotlight-size": "calc(var(--size, 250) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    "--saturation": "100",
    "--lightness": theme === "dark" ? "70" : "50",
    "--border-spot-opacity": theme === "dark" ? "0.9" : "0.75",
    "--border-light-opacity": theme === "dark" ? "0.35" : "0.2"
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={styleVariables}
      data-glow-border
    >
      {children}
    </div>
  );
};
