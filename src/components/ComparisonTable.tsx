/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, Minus, GraduationCap, Shield, Lock, Zap } from "lucide-react";

interface ComparisonRow {
  id: string;
  feature: string;
  description: string;
  icon: React.ReactNode;
  learaValue: string;
  traditionalValue: string;
}

export default function ComparisonTable() {
  const comparisonData: ComparisonRow[] = [
    {
      id: "learning-mode",
      feature: "Interactive Learning Mode",
      description: "Live tutoring on complex algorithms and design systems.",
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
      learaValue: "Built-In Tutoring",
      traditionalValue: "Chatbots only",
    },
    {
      id: "focus-mode",
      feature: "Secure Locked Focus",
      description: "Isolated workspace designed to silences alerts and block distractions.",
      icon: <Lock className="w-4 h-4 text-emerald-600" />,
      learaValue: "Distraction Shield",
      traditionalValue: "Constant alerts",
    },
    {
      id: "latency",
      feature: "Local-First Speed Engine",
      description: "Runs 100% on local hardware with zero cloud latency.",
      icon: <Zap className="w-4 h-4 text-emerald-600" />,
      learaValue: "Sub-Millisecond Speed",
      traditionalValue: "Cloud queue delays",
    },
    {
      id: "privacy",
      feature: "Absolute Code Sovereignty",
      description: "Zero external indexing. Code stays private on your local disk.",
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
      learaValue: "Fully Offline",
      traditionalValue: "Cloud Telemetry",
    },
  ];

  return (
    <section 
      id="comparison-matrix" 
      className="relative bg-[#ffffff] text-slate-900 py-16 sm:py-20 px-6 md:px-12 overflow-hidden border-t border-slate-100 select-none"
    >
      <div className="max-w-4xl mx-auto relative z-10 w-full">
        
        {/* Minimal Swiss Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-emerald-600 uppercase">
            Architectural Audit
          </span>
          <h2 className="font-sans font-light tracking-tight text-2xl sm:text-3xl text-slate-950 uppercase leading-none">
            Why <span className="font-black text-slate-900">LEARA.AI</span> is different
          </h2>
          <p className="font-sans text-slate-500 text-[12.5px] font-normal max-w-md mx-auto leading-relaxed">
            A granular comparison built to maximize focus and code comprehension.
          </p>
        </div>

        {/* Minimalistic Table Grid */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200/90 border-solid pb-3">
                <th className="pb-2.5 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase w-5/12">
                  System Capability
                </th>
                <th className="pb-2.5 px-4 text-center text-[10px] font-mono font-bold tracking-widest text-[#059669] uppercase bg-emerald-500/[0.03] border-x border-t border-emerald-500/10 border-solid rounded-t-lg w-7/24">
                  LEARA.AI ENGINE
                </th>
                <th className="pb-2.5 text-center text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase w-7/24">
                  STANDARD COPILOTS
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 divide-solid">
              {comparisonData.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/40 transition duration-150">
                  {/* Left Column: Capability name and subtle subtext */}
                  <td className="py-4 pr-6">
                    <div className="flex items-start gap-3.5">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 border-solid shrink-0 mt-0.5 group-hover:bg-white transition-colors">
                        {row.icon}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-slate-900 tracking-tight block">
                          {row.feature}
                        </span>
                        <span className="text-[11px] text-slate-450 leading-relaxed font-normal block max-w-sm">
                          {row.description}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Middle Column: LEARA values highlighted with luxury minimal details */}
                  <td className="py-4 px-4 bg-emerald-500/[0.015] border-x border-emerald-500/5 border-solid text-center">
                    <div className="inline-flex flex-col items-center justify-center gap-1 w-full">
                      <div className="w-5 h-5 rounded-full bg-emerald-5 flex items-center justify-center border border-emerald-100 border-solid shadow-3xs">
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                      </div>
                      <span className="font-bold text-emerald-800 text-[10.5px] tracking-tight">
                        {row.learaValue}
                      </span>
                    </div>
                  </td>

                  {/* Right Column: Standard Copilots */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center justify-center gap-1 w-full">
                      <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 border-solid">
                        <Minus className="w-3 h-3 text-slate-350 stroke-[2.5]" />
                      </div>
                      <span className="font-semibold text-slate-400 text-[10.5px] tracking-tight">
                        {row.traditionalValue}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Outer subtle system footnote */}
        <div className="mt-8 text-center select-none">
          <span className="font-mono text-[9px] font-bold text-slate-350 tracking-widest uppercase">
            Sovereign Development System — Fully Compiled Natively
          </span>
        </div>

      </div>
    </section>
  );
}
