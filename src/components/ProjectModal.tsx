/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { X, Calendar, User, Briefcase, ExternalLink, Hash } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-coal-950/70 backdrop-blur-sm"
      />

      {/* CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative bg-bone-50 border border-coal-900/20 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        id={`project-modal-${project.id}`}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-coal-950/60 p-2 text-bone-50 rounded-full hover:bg-coal-950 transition-colors z-20 cursor-pointer focus:outline-none"
          id="close-modal-btn"
          aria-label="Close modal dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INNER SCROLLABLE */}
        <div className="overflow-y-auto flex-1">
          {/* COVER IMAGE */}
          <div className="w-full h-[250px] sm:h-[400px] relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95"
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-[10px] text-zinc-300 font-semibold uppercase bg-coal-950/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 tracking-widest">
                {project.category}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-bone-100 tracking-tight mt-2 drop-shadow-md">
                {project.title}
              </h3>
            </div>
          </div>

          {/* PROJECT DETAIL METRIC BAR */}
          <div className="bg-bone-100 grid grid-cols-2 sm:grid-cols-4 border-b border-coal-900/10 divide-x divide-coal-900/5 *:p-4">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-coal-600 font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>Client</span>
              </div>
              <span className="font-display font-semibold text-xs sm:text-sm text-coal-950 block mt-1">
                {project.client}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-coal-600 font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Role</span>
              </div>
              <span className="font-display font-semibold text-xs sm:text-sm text-coal-950 block mt-1">
                {project.role}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-coal-600 font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </div>
              <span className="font-display font-semibold text-xs sm:text-sm text-coal-950 block mt-1 animate-pulse">
                {project.year}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-coal-600 font-bold uppercase tracking-wider">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Action</span>
              </div>
              {project.isClosed ? (
                <span className="font-display font-bold text-xs sm:text-sm text-coal-500 block mt-1">
                  Closed
                </span>
              ) : (
                <a
                  href={project.link || "#"}
                  target={project.link && project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link && project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-display font-bold text-xs sm:text-sm text-coal-950 hover:text-coal-700 underline block mt-1"
                >
                  Launch Live View
                </a>
              )}
            </div>
          </div>

          {/* DETAILED ANALYSIS SUMMARY COPIES */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-display font-bold text-lg text-coal-950">
                  Concept Overview & Strategy.
                </h4>
                <p className="text-sm text-coal-600 leading-relaxed font-light">
                  {project.longDescription}
                </p>
                {project.calloutBox ? (
                  <div className="bg-bone-100 border border-coal-900/5 p-4 rounded-2xl">
                    <span className="font-mono text-[9px] text-coal-600 font-bold tracking-wider uppercase block">
                      {project.calloutBox.label}
                    </span>
                    <p className="text-xs text-coal-600/90 mt-1 leading-relaxed leading-normal">
                      {project.calloutBox.content}
                    </p>
                  </div>
                ) : (
                  <div className="bg-bone-100 border border-coal-900/5 p-4 rounded-2xl">
                    <span className="font-mono text-[9px] text-coal-600 font-bold tracking-wider uppercase block">
                      Security & Accessibility Auditing
                    </span>
                    <p className="text-xs text-coal-600/90 mt-1 leading-relaxed leading-normal">
                      Designed with client-side sandbox protection, preventing memory leak loops or unsanitized layout alterations, and audited with keyboard accessibility guidelines.
                    </p>
                  </div>
                )}
              </div>

              {/* SIDE METRICS - TAG PATTERNS */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-coal-950">
                  Operational Frameworks.
                </h4>
                {project.frameworksDetail && (
                  <p className="text-xs text-coal-600/90 mt-1 leading-relaxed">
                    {project.frameworksDetail}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 font-mono text-[10px] text-coal-950 bg-bone-200 border border-coal-900/5 px-2.5 py-1 rounded-full font-medium"
                    >
                      <Hash className="w-3 h-3 text-coal-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
