/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationTab } from "../types";

interface RollingNavLinkProps {
  key?: string | number;
  label: string;
  isActive: boolean;
  onClick: () => void;
  id?: string;
}

function RollingNavLink({ label, isActive, onClick, id }: RollingNavLinkProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`nav-link-group relative py-1 cursor-pointer focus:outline-none flex items-center ${
        isActive ? "is-active text-text-primary" : "text-text-secondary hover:text-text-primary"
      }`}
    >
      <span className="rolling-text-inner uppercase tracking-wider text-[11px] font-semibold">
        {label.split("").map((char, index) => {
          const delay = `${(index * 0.02).toFixed(3)}s`;
          return (
            <span
              key={index}
              style={{ transitionDelay: delay }}
              className="rolling-char"
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </span>
      <span className="nav-underline" />
    </button>
  );
}

const navItems: { label: string; value: NavigationTab; path: string }[] = [
  { label: "Home", value: "home", path: "/" },
  { label: "Work", value: "work", path: "/work" },
  { label: "Offers", value: "offers", path: "/offers" },
  { label: "Contact", value: "contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" || pathname === "/home" : pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-bg-custom/80 backdrop-blur-md border-b border-border-custom px-4 py-4 sm:px-8 text-text-primary transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 cursor-pointer focus:outline-none"
          id="header-brand-logo"
        >
          <span className="font-display font-medium text-lg tracking-wider text-text-primary hover:text-text-secondary transition-colors duration-300">
            ©ceobennyco
          </span>
        </button>

        {/* RIGHT CLUSTER (DESKTOP) */}
        <div className="hidden md:flex items-center gap-10">
          {/* DESKTOP NAV */}
          <nav className="flex items-center gap-8 relative">
            {navItems.map((item) => (
              <RollingNavLink
                key={item.value}
                label={item.label}
                isActive={isActive(item.path)}
                onClick={() => navigate(item.path)}
                id={`nav-${item.value}`}
              />
            ))}
          </nav>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-custom cursor-pointer focus:outline-none"
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border-custom mt-2"
          >
            <div className="py-3 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-text-primary text-bg-custom"
                      : "text-text-secondary hover:bg-surface-custom"
                  }`}
                  id={`mobile-nav-${item.value}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
