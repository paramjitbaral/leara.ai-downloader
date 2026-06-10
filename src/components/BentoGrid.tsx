/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FEATURES } from "../data/landingData";
import { LayoutGrid, Cpu, Eye, Sparkles, Sliders, Play, Code, Search, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BentoGrid() {
  // Snapping Demo States
  const [activeLayout, setActiveLayout] = useState<"standard" | "left-heavy" | "quad" | "vertical">("standard");
  
  // Frosted Sliders States
  const [blurAmount, setBlurAmount] = useState(16);
  const [opacityAmount, setOpacityAmount] = useState(70);

  return (
    <section 
      id="features" 
      className="py-24 bg-white border-y border-slate-100 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title with Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 font-mono text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Architecture
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            Engineered for Extreme Spatial Precision
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Every millimeter of your layout has been detailed. Tap into visual desktop control with widgets fueled by system-native hooks.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Card 1: Interactive Window Custom Snapping Demo (Col-Span 7) */}
          <div 
            id="bento-snap-demo"
            className="lg:col-span-7 bg-slate-50 border border-slate-200/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-sky-200/20 to-transparent blur-2xl z-0 pointer-events-none" />
            
            <div className="relative z-10 max-w-md">
              <span className="font-mono text-[10.5px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Physics Simulator</span>
              <h3 className="font-sans font-extrabold text-slate-800 text-2xl mt-3 mb-2">Adaptive Snap Matrix</h3>
              <p className="font-sans text-slate-600 text-sm font-medium leading-relaxed">
                Test the physical grid engine online. Choose standard screen partition templates and watch the visual system adapt and snap instantly.
              </p>
            </div>

            {/* Simulated Desktop grid viewport */}
            <div className="my-8 bg-slate-200/40 border border-slate-300/40 rounded-2xl p-3 aspect-[16/9] flex flex-col relative z-10 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                </div>
                <span className="font-mono text-[8px] text-slate-400">Virtual screen canvas (4K matrix)</span>
                <span className="w-4" />
              </div>

              {/* Flex Grid Container with beautiful custom animations based on toggle */}
              <div className="grow grid gap-2 transition-all duration-500 ease-out h-full">
                {activeLayout === "standard" && (
                  <div className="grid grid-cols-3 gap-2 h-full">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center p-2 text-center">
                      <div className="w-6 h-6 rounded-md bg-sky-50 flex items-center justify-center"><LayoutGrid className="w-3.5 h-3.5 text-sky-500" /></div>
                      <span className="font-mono text-[8px] text-slate-400 mt-1 block">Left (33%)</span>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200/80 shadow-sm flex flex-col items-center justify-center p-2 text-center col-span-2 relative overscroll-none overflow-hidden group">
                      <div className="absolute inset-0 bg-sky-500/[0.02] -z-10" />
                      <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center"><Code className="w-3.5 h-3.5 text-indigo-500" /></div>
                      <span className="font-mono text-[8px] text-indigo-600 mt-1 block font-bold">Main Workspace (67%)</span>
                    </div>
                  </div>
                )}

                 {activeLayout === "left-heavy" && (
                  <div className="grid grid-cols-10 gap-2 h-full">
                    <div className="col-span-7 bg-white rounded-lg border border-slate-300 shadow-sm flex flex-col items-center justify-center p-2 text-center">
                      <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center"><Sliders className="w-3.5 h-3.5 text-violet-500" /></div>
                      <span className="font-mono text-[8px] text-violet-600 mt-1 block font-bold">Priority Grid (70%)</span>
                    </div>
                    <div className="col-span-3 bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center p-2 text-center">
                      <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center"><Search className="w-3.5 h-3.5 text-slate-500" /></div>
                      <span className="font-mono text-[8px] text-slate-400 mt-1 block">Sidebar (30%)</span>
                    </div>
                  </div>
                )}

                {activeLayout === "quad" && (
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {["A", "B", "C", "D"].map((node, i) => (
                      <div key={node} className="bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center p-1.5 text-center">
                        <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[7px] text-slate-500 font-bold">Q{i+1}</span>
                        <span className="font-mono text-[7px] text-slate-400 block">Monitor Node {node}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeLayout === "vertical" && (
                  <div className="grid grid-rows-3 gap-2 h-full">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center p-1 text-center">
                      <span className="font-mono text-[7.5px] text-slate-400">Stream Node (Top)</span>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-300 shadow-sm flex flex-col items-center justify-center p-1 text-center">
                      <span className="font-mono text-[7.5px] text-indigo-600 font-semibold">Active workspace (Center)</span>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center p-1 text-center">
                      <span className="font-mono text-[7.5px] text-slate-400">Logs (Bottom)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Layout control triggers */}
            <div className="flex flex-wrap gap-2.5 border-t border-slate-200/50 pt-5 relative z-10 w-full justify-start items-center">
              <span className="font-sans font-bold text-xs text-slate-500 mr-2 uppercase tracking-wide">Triggers:</span>
              <button
                id="layout-btn-standard"
                onClick={() => setActiveLayout("standard")}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                  activeLayout === "standard"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                Standard (2:1)
              </button>
              <button
                id="layout-btn-left-heavy"
                onClick={() => setActiveLayout("left-heavy")}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                  activeLayout === "left-heavy"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                Developer (7:3)
              </button>
              <button
                id="layout-btn-quad"
                onClick={() => setActiveLayout("quad")}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                  activeLayout === "quad"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                Quad Panel
              </button>
              <button
                id="layout-btn-vertical"
                onClick={() => setActiveLayout("vertical")}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                  activeLayout === "vertical"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                Stack Stack
              </button>
            </div>
          </div>

          {/* Card 2: Frosted settings customizer (Col-Span 5) */}
          <div 
            id="bento-glass-settings"
            className="lg:col-span-5 bg-slate-50 border border-slate-200/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/10 blur-2xl rounded-full z-0 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col text-left">
              <span className="font-sans text-[10.5px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider self-start flex items-center gap-1.5 font-semibold">
                <Settings className="w-3.5 h-3.5 text-sky-500" />
                Theme Customizer
              </span>
              <h3 className="font-sans font-extrabold text-slate-800 text-2xl mt-3 mb-2">Backdrop Opacity & Blur</h3>
              <p className="font-sans text-slate-600 text-sm font-medium leading-relaxed">
                Adjust window transparency real-time. Configure deep-depth frosted blur strength to eliminate visual desktop clutter.
              </p>
            </div>

            {/* Interactive Preview Slate */}
            <div className="my-6 p-6 rounded-2xl border border-slate-200 bg-slate-100 flex flex-col justify-center items-center relative z-10 overflow-hidden min-h-[160px]">
              {/* Colorful wallpaper backdrop dots as a guide */}
              <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-rose-400 blur-md opacity-70" />
              <div className="absolute bottom-4 right-6 w-20 h-20 rounded-full bg-sky-400 blur-lg opacity-70" />
              
              {/* The glass card itself that reacts to states */}
              <div 
                className="w-full max-w-[200px] p-4 rounded-xl border border-white/60 shadow-xl text-left select-none relative transition-all duration-150"
                style={{
                  backdropFilter: `blur(${blurAmount}px)`,
                  WebkitBackdropFilter: `blur(${blurAmount}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${opacityAmount / 100})`
                }}
              >
                <div className="flex gap-1 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h4 className="font-sans font-extrabold text-slate-800 text-[10.5px] uppercase tracking-wide">Prism Glass Layout</h4>
                <p className="font-sans text-[9px] text-slate-600 font-bold leading-tight mt-1.5">
                  Blur: {blurAmount}px <br />
                  Opacity: {opacityAmount}%
                </p>
              </div>
            </div>

            {/* Direct Slider Controllers */}
            <div className="space-y-4 pt-4 border-t border-slate-200/60 relative z-10 w-full">
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 font-sans">
                  <span>Acrylic Blur Strength</span>
                  <span className="font-mono text-[10.5px] text-indigo-600 font-bold">{blurAmount}px</span>
                </div>
                <input 
                  type="range"
                  min="4"
                  max="28"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 font-sans">
                  <span>Transparency level</span>
                  <span className="font-mono text-[10.5px] text-indigo-600 font-bold">{opacityAmount}%</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="95"
                  value={opacityAmount}
                  onChange={(e) => setOpacityAmount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid subcategories (Personalised Bento highlights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => {
            const getIcon = (id: string) => {
              switch (id) {
                case "snapping":
                  return <LayoutGrid className="w-5 h-5 text-sky-500" />;
                case "glassmorphism":
                  return <Eye className="w-5 h-5 text-indigo-500" />;
                case "command":
                  return <Search className="w-5 h-5 text-amber-500" />;
                case "performance":
                  return <Cpu className="w-5 h-5 text-emerald-500" />;
                default:
                  return <Sparkles className="w-5 h-5 text-sky-500" />;
              }
            };

            const getColorDecoration = (id: string) => {
              switch (id) {
                case "snapping":
                  return "bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300";
                case "glassmorphism":
                  return "bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300";
                case "command":
                  return "bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300";
                case "performance":
                  return "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300";
                default:
                  return "bg-slate-50 text-slate-700 border-slate-100";
              }
            };

            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="bg-white border border-slate-200/60 hover:border-slate-300 hover:shadow-lg rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className={`p-2.5 rounded-xl border w-fit mb-5 transition-all ${getColorDecoration(feature.id)}`}>
                    {getIcon(feature.id)}
                  </div>
                  
                  {feature.badge && (
                    <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                      {feature.badge}
                    </span>
                  )}
                  
                  <h4 className="font-sans font-extrabold text-slate-800 text-lg mt-2.5 mb-2">
                    {feature.title}
                  </h4>
                  <p className="font-sans text-slate-500 text-sm font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
