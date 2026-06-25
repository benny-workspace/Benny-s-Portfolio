/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useLocation, useOutlet } from "react-router-dom";

import { Project } from "./types";
import { ProjectModalContext } from "./context/ProjectModalContext";
import Header from "./components/Header";
import MagicCursor from "./components/MagicCursor";

const ProjectModal = lazy(() => import("./components/ProjectModal"));

/**
 * App layout shell: persistent chrome (cursor, theme toggle, header, project
 * modal) wrapping the routed page outlet. Page content lives in src/pages/*.
 */
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const outlet = useOutlet();

  // Synchronize dark/light mode classes with document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ProjectModalContext.Provider value={(project) => setSelectedProject(project)}>
      <div className="min-h-screen bg-bg-custom text-text-primary flex flex-col font-sans relative selection:bg-text-primary selection:text-bg-custom overflow-x-hidden">

        {/* CUSTOM MAGIC CURSOR */}
        <MagicCursor />

        {/* FLOATING THEME TOGGLE (FOLLOWS ON SCROLL, VERTICALLY CENTERED TO THE RIGHT) */}
        <div
          className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center"
          id="floating-theme-toggle"
        >
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-8 h-8 rounded-full border border-border-custom bg-surface-custom text-text-primary hover:text-text-secondary hover:bg-border-custom hover:scale-105 active:scale-95 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none relative group"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}

            {/* Subtle tooltip styling */}
            <span className="absolute right-10 bg-surface-custom text-text-primary px-2.5 py-1 text-[9px] font-mono rounded-md border border-border-custom opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
              {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
            </span>
          </button>
        </div>

        {/* HEADER BAR */}
        <Header />

        {/* CORE DISPLAY ROUTING */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                {outlet}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* PORTFOLIO DETAIL DIALOG MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <Suspense fallback={null}>
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </ProjectModalContext.Provider>
  );
}
