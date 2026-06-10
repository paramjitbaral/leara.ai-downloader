/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SYSTEM_REQUIREMENTS, RELEASE_CHANNELS } from "../data/landingData";
import { ShieldAlert, Cpu, HeartPulse, History, ChevronDown, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FeatureDeepDive() {
  const [activeTab, setActiveTab] = useState<"specs" | "releases">("specs");
  const [expandedRelease, setExpandedRelease] = useState<string>("v2.4.2 stable");

  const toggleRelease = (version: string) => {
    setExpandedRelease((prev) => (prev === version ? "" : version));
  };

  return (
    <section 
      id="specs" 
      className="py-24 bg-white border-b border-slate-100 px-6 relative"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Tabs Header */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              id="spec-tab-specs"
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm transition-all cursor-pointer ${
                activeTab === "specs"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Cpu className="w-4 h-4 text-sky-500" />
              Technical Specifications
            </button>
            
            <button
              id="spec-tab-releases"
              onClick={() => setActiveTab("releases")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm transition-all cursor-pointer ${
                activeTab === "releases"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <History className="w-4 h-4 text-indigo-500" />
              Build Release Logs
            </button>
          </div>
        </div>

        {/* Tab 1 Content: Technical Specs */}
        <AnimatePresence mode="wait">
          {activeTab === "specs" && (
            <motion.div
              key="specs-tab-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
              id="specs-pane"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="font-sans font-extrabold text-slate-800 text-2xl mb-3">Enterprise Systems Compatibility</h3>
                <p className="font-sans text-slate-500 text-sm font-medium leading-relaxed">
                  Prism is built specifically for modern Windows environments, querying hardware devices directly to optimize performance.
                </p>
              </div>

              {/* Requirement Matrix Table */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 bg-slate-100/80 px-6 py-4 border-b border-slate-200 text-left">
                  <div className="col-span-4 font-mono text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">System Resource</div>
                  <div className="col-span-4 font-mono text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Minimum Level</div>
                  <div className="col-span-4 font-mono text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Recommended Setup</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {SYSTEM_REQUIREMENTS.map((req) => (
                    <div key={req.parameter} className="grid grid-cols-12 px-6 py-4.5 items-center hover:bg-slate-100/30 transition-colors text-left">
                      <div className="col-span-4 font-sans font-bold text-slate-800 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {req.parameter}
                      </div>
                      <div className="col-span-4 font-sans text-slate-500 text-xs font-semibold">{req.minimum}</div>
                      <div className="col-span-4 font-sans text-slate-800 text-xs font-bold">{req.recommended}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Binary Warning */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50 border border-amber-200/50 rounded-2xl p-5 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="font-sans font-bold text-amber-800 text-sm block">Official Certified Releases</span>
                  <span className="font-sans text-amber-700 text-xs block leading-relaxed mt-0.5">
                    To ensure safe, seamless installation, always obtain downloads through official verified links. Prism is pre-certified, secure, and adheres strictly to core desktop security guidelines.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2 Content: Release History Accordions */}
          {activeTab === "releases" && (
            <motion.div
              key="releases-tab-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
              id="releases-pane"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="font-sans font-extrabold text-slate-800 text-2xl mb-3">Release & Stable Channels</h3>
                <p className="font-sans text-slate-500 text-sm font-medium leading-relaxed">
                  Track the progress of our native desktop workspace code. Stable channel builds deploy quarterly.
                </p>
              </div>

              {/* Release Accordions list */}
              <div className="space-y-4">
                {RELEASE_CHANNELS.map((note) => {
                  const isExpanded = expandedRelease === note.version;
                  return (
                    <div 
                      key={note.version}
                      id={`release-note-${note.version.replace(/\s+/g, "-")}`}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50 hover:border-slate-300 transition-all text-left"
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleRelease(note.version)}
                        className="w-full flex items-center justify-between px-6 py-5 bg-white font-sans text-left cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                          <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                            {note.version}
                          </span>
                          <h4 className="font-sans font-bold text-slate-800 text-base">
                            {note.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-slate-400 font-semibold">{note.date}</span>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-100 overflow-hidden"
                          >
                            <div className="p-6 bg-slate-50 space-y-4">
                              <span className="font-mono text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Change Details:</span>
                              <ul className="space-y-2.5">
                                {note.changes.map((item, idx) => (
                                  <li key={idx} className="flex gap-2.5 items-start text-slate-600 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
