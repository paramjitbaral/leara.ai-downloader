/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import PerspectiveGrid from "./PerspectiveGrid";
import EditorWorkspaceMockup from "./EditorWorkspaceMockup";
import FeatureSlider from "./FeatureSlider";
import SovereignCanvasVisual from "./SovereignCanvasVisual";

interface HeroProps {
  onOpenDownload: () => void;
}

export default function Hero({ onOpenDownload }: HeroProps) {
  return (
    <>
      {/* SECTION 1: Top Hero Fold (Full Screen) featuring clean white space and subtle perspective grid */}
      <section 
        id="hero-top"
        className="relative min-h-[92vh] pt-32 pb-24 flex flex-col items-center justify-center bg-white overflow-hidden px-6 text-slate-900"
      >
        {/* Isolated high-fidelity 3D Canvas Mesh */}
        <PerspectiveGrid />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 select-none mt-4 md:mt-6">
          
          {/* Top IDE Badge */}
          <div className="mb-6 md:pl-[0.3em]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-sans font-bold tracking-widest uppercase shadow-sm border border-slate-200 bg-white text-slate-500">
              <span className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
              Deep-Focus Learning Environment
            </span>
          </div>

          {/* Master heading featuring exquisite, bold display typography with generous negative space */}
          <h1 className="font-sans font-black tracking-tight text-slate-900 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05] mb-6 max-w-3xl mx-auto w-full select-none uppercase text-center md:pl-[0.3em]">
            LEARA.AI
          </h1>

          {/* Calm, professional description with reduced text size and perfect centering */}
          <p className="font-sans text-slate-500 text-xs sm:text-[13px] md:text-sm font-medium leading-relaxed max-w-md mx-auto mb-10 select-none text-center md:pl-[0.3em]">
            LEARA.AI is an elegant, local-first code editor integrated with a powerful learning mode to accelerate your development and master any engineering environment seamlessly.
          </p>

          {/* Symmetrical white/dark contrast button with soft trigger scale */}
          <div className="flex items-center gap-3 w-full justify-center max-w-md">
            <button
              id="hero-download-badge-cta"
              onClick={onOpenDownload}
              className="px-8 py-3.5 text-white font-sans font-semibold text-sm bg-neutral-900 hover:bg-neutral-800 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer z-10 pointer-events-auto inline-flex items-center gap-1.5"
            >
              <span>Download for Windows</span>
              <span className="text-xs ml-0.5">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Interactive Mockup and Clean Features Panel */}
      <section 
        id="hero-features"
        className="relative bg-white pt-10 pb-24 px-4 sm:px-6 text-slate-900"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="w-full max-w-2xl text-center mb-10 relative z-20 pointer-events-auto transition-all">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase mb-2 shadow-3xs bg-emerald-50 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              01 / WORKSPACE
            </span>
            <h3 className="font-sans font-black text-slate-900 text-xl sm:text-2xl tracking-tight leading-tight min-h-[32px]">
              Interactive Workspace
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed font-semibold max-w-lg mx-auto min-h-[40px]">
              Browse files, edit text, and explore modern layouts below. Keep your concentration locked with custom focus rules.
            </p>
          </div>
          
          {/* Section 2.1: Interactive Workspace Mockup */}
          <EditorWorkspaceMockup onOpenDownload={onOpenDownload} />
        </div>
      </section>

      {/* Section 2.2: Trae-style Feature Slider (Full width, open layout) */}
      <div className="w-full">
        <FeatureSlider pinCode="1234" />
      </div>

      {/* Hidden legacy details container */}
      <div className="hidden">
        <SovereignCanvasVisual />
      </div>
    </>
  );
}
