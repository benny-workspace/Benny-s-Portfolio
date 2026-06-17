/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { NavigationTab } from "../types";

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  openAdmin: () => void;
  inquiryCount: number;
}

interface RollingNavLinkProps {
  key?: any;
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
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
      <span className="nav-underline" />
    </button>
  );
}

export default function Header({ activeTab, setActiveTab, openAdmin, inquiryCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: NavigationTab }[] = [
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "Offers", value: "offers" },
    { label: "Contact", value: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-custom/80 backdrop-blur-md border-b border-border-custom px-4 py-4 sm:px-8 text-text-primary transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => setActiveTab("home")}
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
                isActive={activeTab === item.value}
                onClick={() => setActiveTab(item.value)}
                id={`nav-${item.value}`}
              />
            ))}
          </nav>

          {/* SECURE MONITOR */}
          {inquiryCount > 0 && (
            <div className="flex items-center gap-4 border-l border-border-custom pl-6">
              <button
                onClick={openAdmin}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-mono font-semibold hover:bg-emerald-500/20 transition-all cursor-pointer shadow-xs focus:ring-2 focus:ring-emerald-400"
                id="admin-pill-btn"
                title="Open Local Secure Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{inquiryCount} SECURED</span>
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-2 md:hidden">
          {inquiryCount > 0 && (
            <button
              onClick={openAdmin}
              className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-mono font-semibold"
              title="Open Inquiries"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
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
                    setActiveTab(item.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.value
                      ? "bg-text-primary text-bg-custom"
                      : "text-text-secondary hover:bg-surface-custom"
                  }`}
                  id={`mobile-nav-${item.value}`}
                >
                  {item.label}
                </button>
              ))}
              {inquiryCount > 0 && (
                <div className="pt-2 px-4 border-t border-border-custom">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openAdmin();
                    }}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>View {inquiryCount} Inquiries</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
