/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, ArrowRight } from "lucide-react";

interface FooterProps {
  onOpenDownload: () => void;
}

export default function Footer({ onOpenDownload }: FooterProps) {
  return (
    <footer 
      id="leara-footer"
      className="relative bg-[#f8fafc] border-t border-slate-200/60 pt-16 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden select-none font-sans mt-auto"
    >
      {/* Huge, faint background watermark text "LEARA" */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden font-sans font-black tracking-[0.05em] text-slate-200/95 text-[18vw] md:text-[23vw] lg:text-[26vw] leading-none uppercase">
        LEARA
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Top Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8">
          
          {/* Column 1: Brand details replacing Foundations/Company filler */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold text-[#0f172a] text-xl tracking-tight">Leara.ai</span>
            </div>
            <p className="text-sm font-semibold text-slate-500/90 leading-relaxed max-w-sm">
              Next-generation developer workspace designed for lightning-fast speed, unyielding security, and mission-critical offline workflows.
            </p>
          </div>

          {/* Column 2: Sovereign Workspace genuine anchor links */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="font-mono text-[10px] uppercase font-bold tracking-[0.15em] text-slate-500/90">
              Sovereign Workspace
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#features" className="font-sans text-sm font-semibold text-slate-700/90 hover:text-slate-950 transition duration-150">
                  Features Bento Grid
                </a>
              </li>
              <li>
                <a href="#simulator" className="font-sans text-sm font-semibold text-slate-700/90 hover:text-slate-950 transition duration-150">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#pricing" className="font-sans text-sm font-semibold text-slate-700/90 hover:text-slate-950 transition duration-150">
                  Pricing Matrix
                </a>
              </li>
              <li>
                <a href="#faq" className="font-sans text-sm font-semibold text-slate-700/90 hover:text-slate-950 transition duration-150">
                  Technical FAQ & Release Specs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: SYSTEMS STATUS & PRIMARY CTA */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-start space-y-5">
            
            {/* Status indicator row */}
            <div className="space-y-2 flex flex-col items-start md:items-end w-full md:w-auto">
              <h4 className="font-mono text-[10px] uppercase font-bold tracking-[0.15em] text-slate-500/90 mr-[-0.15em] text-left md:text-right">
                Systems Status
              </h4>
              <div className="bg-white border border-slate-200/60 rounded-md px-4 py-2 flex items-center justify-center gap-2.5 shadow-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-sans text-xs font-semibold text-slate-800 tracking-tight whitespace-nowrap">
                  All Nodes Operational
                </span>
              </div>
            </div>

            {/* Premium CTA Button */}
            <button
              onClick={onOpenDownload}
              className="bg-[#1e293b] text-white font-sans font-semibold text-xs px-6 py-3.5 rounded-md flex items-center gap-2 hover:bg-slate-950 transition duration-200 active:scale-98 shadow-sm whitespace-nowrap w-full md:w-auto justify-center"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

        </div>

        {/* Bottom bar row */}
        <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
          
          {/* Inner links block */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 text-xs font-bold text-slate-500/95">
            <a href="#legal" className="hover:text-slate-900 transition duration-150">
              Legal Framework
            </a>
            <a href="#privacy" className="hover:text-slate-900 transition duration-150">
              Privacy Governance
            </a>
            <a href="#cookies" className="hover:text-slate-900 transition duration-150">
              Cookie Schema
            </a>
            <a href="#security" className="hover:text-slate-900 transition duration-150">
              Security Matrix
            </a>
          </div>

          {/* Copyright notice */}
          <div className="text-center md:text-right">
            <span className="text-[11px] font-semibold text-slate-400/90 tracking-wide">
              &copy; 2024 Leara.ai Engineering. Built for mission-critical workflows.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
