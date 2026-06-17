/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { X, Calendar, Database, ShieldAlert, Trash2, Mail, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Submission } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  onDeleteSubmission: (id: string) => void;
  onClearAll: () => void;
}

export default function AdminPanel({ isOpen, onClose, submissions, onDeleteSubmission, onClearAll }: AdminPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden">
      {/* SOLID COAL BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-coal-950/60 backdrop-blur-xs"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* SLIDING PANEL */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-screen max-w-lg bg-coal-950 text-bone-50 flex flex-col shadow-2xl relative"
        >
          {/* HEADER */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm tracking-tight">Active Client Inquiries</h3>
                <p className="text-[10px] text-zinc-500 font-mono">SECURED IN LOCALSTORAGE SANDBOX</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 px-1.5 border border-white/10 hover:border-white/30 rounded-full cursor-pointer focus:outline-none"
              id="close-admin-panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SUBMISSIONS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* SECURITY WARNING */}
            <div className="bg-emerald-950/25 border border-emerald-500/25 p-4 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block">Sanitation Engine Status: ONLINE</span>
                <p className="text-zinc-400 leading-normal mt-0.5">
                  All user inputs undergo custom client-side string sanitation. HTML injection triggers are safely encoded, and spam metrics are fully checked.
                </p>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-8 h-8 text-zinc-700 mx-auto opacity-50 mb-3" />
                <span className="text-zinc-500 font-display text-sm font-light">No client inquiries found in this secure session.</span>
                <p className="text-zinc-600 text-[11px] max-w-xs mx-auto mt-2">
                  Navigate to the Contact section, submit the enquiry form, and watch it register in this real-time log.
                </p>
              </div>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-coal-900 border border-white/5 hover:border-white/10 p-5 rounded-2xl transition-all relative group"
                >
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => onDeleteSubmission(sub.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 p-1.5 rounded-full hover:bg-white/5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    id={`delete-sub-btn-${sub.id}`}
                    title="Delete record from local state"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col gap-3">
                    {/* META TAGS */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="bg-white/5 border border-white/10 text-zinc-300 text-[9px] font-mono px-2 py-0.5 rounded">
                        {sub.projectType}
                      </span>
                      {sub.sanitized && (
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> SANITIZED
                        </span>
                      )}
                    </div>

                    {/* CONTENT DETAILS */}
                    <div>
                      <span className="font-display font-medium text-xs text-white block">
                        {sub.name}
                      </span>
                      <a
                        href={`mailto:${sub.email}`}
                        className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors font-mono mt-1"
                      >
                        <Mail className="w-3 h-3" /> {sub.email}
                      </a>
                    </div>

                    {/* MESSAGE DETAILS */}
                    <p className="text-xs text-zinc-300 leading-relaxed italic bg-black/25 p-3 rounded-lg border border-white/5 max-h-24 overflow-y-auto">
                      "{sub.details}"
                    </p>

                    {/* BUDGET & TIMELINE SPEC */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 divide-x divide-white/5">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 block uppercase leading-none">BUDGET</span>
                          <span className="text-[11px] font-semibold text-zinc-300 block mt-0.5">{sub.budget}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 pl-4">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 block uppercase leading-none">TIMELINE</span>
                          <span className="text-[11px] text-zinc-300 block mt-0.5 font-sans leading-none">{sub.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* DATA TIMELINE */}
                    <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {sub.timestamp}
                      </span>
                      <span>Origin: {sub.ipPlaceholder}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {submissions.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-coal-900/50 flex gap-2">
              <button
                onClick={onClearAll}
                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer focus:outline-none"
                id="clear-all-submissions"
              >
                Clear Database
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
