/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface SovereignCanvasVisualProps {
  initialBentoSelected?: number;
}

export default function SovereignCanvasVisual({ initialBentoSelected = 1 }: SovereignCanvasVisualProps) {
  const [bentoSelectedProject, setBentoSelectedProject] = useState(initialBentoSelected);
  const [learnMode, setLearnMode] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState("1234");
  const [inputPin, setInputPin] = useState("");
  const [lockShake, setLockShake] = useState(false);
  const [lockMessage, setLockMessage] = useState("Keep your focus locked");

  // PIN validation handler
  const verifyPin = (currentPin: string) => {
    if (currentPin.length === 4) {
      if (currentPin === pinCode) {
        setTimeout(() => {
          setIsLocked(false);
          setInputPin("");
        }, 250);
      } else {
        setLockShake(true);
        const prevMsg = lockMessage;
        setLockMessage("Invalid PIN code!");
        setTimeout(() => {
          setLockShake(false);
          setInputPin("");
          setLockMessage(prevMsg);
        }, 500);
      }
    }
  };

  return (
    <div className="mt-32 w-full relative z-20 pointer-events-auto">
      
      {/* Elegant Header with Dual-Accent layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-200/60 pb-8 mb-16 border-solid">
        <div className="lg:col-span-12 space-y-2 text-left">
          <span className="text-[10px] font-black tracking-widest text-[#10b981] uppercase font-mono block">
            CAPABILITIES & ARCHITECTURE
          </span>
          <h3 className="font-sans font-extrabold text-[#0f172a] text-2xl sm:text-3xl tracking-tight leading-tight">
            Sovereign Workspace Visual System
          </h3>
          <p className="text-slate-550 font-sans text-xs sm:text-sm max-w-lg font-medium">
            A premium, minimalist orchestration model designed with structural balance and absolute spatial precision.
          </p>
        </div>
      </div>

      {/* Premium Schematic Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Clean list of 4 core capabilities */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          {[
            {
              id: 1,
              num: "01",
              tag: "WORKSPACE",
              title: "Sovereign Workspace & Canvas",
              description: "An intuitive workspace integrating file navigators, custom editor splits, and multi-tab buffers mapped natively.",
            },
            {
              id: 2,
              num: "02",
              tag: "CONSOLE",
              title: "Thread-native Virtual Shell",
              description: "An integrated command environment running containerized Node threads natively to execute build files and manage background dependencies.",
            },
            {
              id: 3,
              num: "03",
              tag: "ENGINE",
              title: "Local AI Copilot Guard",
              description: "Your local-first twin mind. Context-aware completions, refactoring models, and direct chat assistance keeping keys hidden.",
            },
            {
              id: 4,
              num: "04",
              tag: "FOCUS LOCK",
              title: "PIN-Locked Learning Mode",
              description: "Set a 4-digit PIN to lock down workspace directories and controls. Eliminate session task-switching impulses and keep your focus locked.",
            }
          ].map((feat) => {
            const isActive = bentoSelectedProject === feat.id;
            return (
              <div
                key={feat.id}
                onMouseEnter={() => setBentoSelectedProject(feat.id)}
                onClick={() => setBentoSelectedProject(feat.id)}
                className={`group p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative border-solid ${
                  isActive
                    ? "bg-white border-slate-300/80 shadow-[0_12px_24px_rgba(0,0,0,0.02)]"
                    : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200/50"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-[#10b981] rounded-r-full" />
                )}
                
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-mono text-xs font-bold leading-none ${isActive ? "text-[#10b981]" : "text-slate-400"}`}>
                    {feat.num}
                  </span>
                  <span className={`text-[9px] font-black tracking-widest uppercase font-mono px-2 py-0.5 rounded-md ${
                    isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {feat.tag}
                  </span>
                </div>

                <h4 className={`font-sans font-extrabold text-[15px] tracking-tight mb-1 transition-colors duration-200 ${
                  isActive ? "text-slate-900 font-bold" : "text-slate-705 font-semibold"
                }`}>
                  {feat.title}
                </h4>
                <p className="text-slate-450 font-sans text-xs font-medium leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Ultra-premium Interactive Workspace Layout Blueprint */}
        <div className="lg:col-span-12 xl:col-span-7 bg-slate-50/55 border border-slate-200/55 rounded-3xl p-6 sm:p-8 relative overflow-hidden group border-solid">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#10b981]/5 rounded-full blur-3xl z-0 pointer-events-none" />
          
          {/* Visual Label */}
          <div className="flex items-center justify-between mb-4 relative z-10 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
              <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                SYSTEM BLUEPRINT / SCHEMATIC VISUAL
              </span>
            </div>
            <span className="font-mono text-[8.5px] text-slate-400">
              SCALE: AUTORANGE (DP)
            </span>
          </div>

          {/* The Slate Interactive Frame */}
          <div className="relative z-10 w-full bg-white border border-slate-200/90 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col aspect-[16/10.5] border-solid">
            
            {/* Top Bar Area */}
            <div className="bg-slate-50/50 border-b border-slate-200/70 py-2.5 px-4 flex items-center justify-between shrink-0 select-none border-solid">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
              </div>
              <span className="font-mono text-[8.5px] text-slate-400 uppercase tracking-wider font-bold">
                leara_layout_dimensions.cad
              </span>
              <button 
                onClick={() => {
                  if (learnMode) {
                    if (isLocked) {
                      setLockShake(true);
                      const prevMsg = lockMessage;
                      setLockMessage("Keep your focus locked — Unlock with PIN first!");
                      setTimeout(() => setLockShake(false), 500);
                      setTimeout(() => setLockMessage(prevMsg), 2500);
                    } else {
                      setLearnMode(false);
                      setIsLocked(false);
                      setInputPin("");
                    }
                  } else {
                    setLearnMode(true);
                    setIsLocked(true);
                    setInputPin("");
                  }
                }}
                className={`px-2 py-1 rounded text-[8px] font-mono font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-solid ${
                  learnMode 
                    ? isLocked 
                      ? "bg-red-500/10 border border-red-500/30 text-red-500 animate-pulse"
                      : "bg-[#10b981]/10 border border-[#10b981]/30 text-emerald-600 font-extrabold" 
                    : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${learnMode ? "bg-current animate-ping" : "bg-slate-400"}`} />
                <span>{learnMode ? isLocked ? "SCHEME LOCKED" : "LEARN ACTIVE" : "LEARN MODE"}</span>
              </button>
            </div>

            {/* Main Grid Parts Area */}
            <div className="grow flex flex-col min-h-0 relative">
              
              {/* Inner Split View */}
              <div className="grow flex min-h-0 divide-x divide-slate-100 select-none relative divide-solid">
                {/* 01 / Navigator Panel */}
                <div 
                  onMouseEnter={() => setBentoSelectedProject(1)}
                  className={`w-1/4 p-3 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                    bentoSelectedProject === 1 
                      ? "bg-slate-100/30 font-bold" 
                      : "bg-white opacity-45 hover:opacity-75"
                  }`}
                >
                  {bentoSelectedProject === 1 && (
                    <div className="absolute inset-0 border-2 border-[#10b981]/15 pointer-events-none z-10" />
                  )}
                  <div className="space-y-4">
                    <span className="font-mono text-[8px] font-black text-slate-400 tracking-wider">01 / NAVIGATOR</span>
                    <div className="space-y-2 opacity-60">
                      <div className="h-1.5 w-10 bg-[#10b981]/25 rounded" />
                      <div className="pl-2 space-y-1.5">
                        <div className="h-1 w-12 bg-slate-100 rounded" />
                        <div className="h-1 w-8 bg-slate-100 rounded" />
                        <div className="h-1 w-14 bg-slate-100/70 rounded" />
                      </div>
                      <div className="h-1.5 w-12 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <span className="font-mono text-[7px] text-slate-400 font-bold tracking-wider uppercase">W: 240px</span>
                </div>

                {/* Main Canvas + Console Stack */}
                <div className="grow flex flex-col divide-y divide-slate-100 divide-solid">
                  
                  {/* 02 / Canvas Editor Panel */}
                  <div 
                    onMouseEnter={() => setBentoSelectedProject(1)}
                    className={`grow p-4 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                      bentoSelectedProject === 1 
                        ? "bg-slate-100/30" 
                        : "bg-white opacity-45 hover:opacity-75"
                    }`}
                  >
                    {bentoSelectedProject === 1 && (
                      <div className="absolute inset-0 border-2 border-[#10b981]/15 pointer-events-none z-10" />
                    )}
                    <div className="space-y-4 text-left">
                      <span className="font-mono text-[8px] font-black text-slate-400 tracking-wider">01 / CANVAS</span>
                      <div className="space-y-1.5 font-mono text-[7px] text-slate-400 leading-none pb-2">
                        <p><span className="text-[#10b981]">import</span> React <span className="text-[#10b981]">from</span> 'react';</p>
                        <p><span className="text-slate-900 font-bold">export default function</span> App() &#123;</p>
                        <p className="pl-3"><span className="text-[#10b981]">return</span> &lt;<span className="text-slate-500">div</span>&gt;Workspace&lt;/<span className="text-slate-500">div</span>&gt;;</p>
                        <p>&#125;</p>
                      </div>
                    </div>
                    <span className="font-mono text-[7px] text-slate-400 font-bold tracking-wider uppercase self-end">FLEX: GROW / AUTO</span>
                  </div>

                  {/* 03 / Console Panel */}
                  <div 
                    onMouseEnter={() => setBentoSelectedProject(2)}
                    className={`h-24 p-3 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                      bentoSelectedProject === 2 
                        ? "bg-slate-100/30" 
                        : "bg-white opacity-45 hover:opacity-75"
                    }`}
                  >
                    {bentoSelectedProject === 2 && (
                      <div className="absolute inset-0 border-2 border-[#10b981]/15 pointer-events-none z-10" />
                    )}
                    <div className="space-y-3">
                      <span className="font-mono text-[8px] font-black text-slate-400 tracking-wider">02 / CONSOLE</span>
                      <div className="opacity-55 space-y-1.5 font-mono text-[7px] text-slate-400">
                        <p className="text-[#10b981] font-bold">$ npm run compile</p>
                        <p className="text-slate-400">✔ Success: Bundle built in 14ms</p>
                      </div>
                    </div>
                    <span className="font-mono text-[7px] text-slate-400 font-bold tracking-wider uppercase">H: 140px / DOCK</span>
                  </div>

                </div>

                {/* 04 / AI Context Panel */}
                <div 
                  onMouseEnter={() => setBentoSelectedProject(3)}
                  className={`w-1/4 p-3 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                    bentoSelectedProject === 3 
                      ? "bg-slate-100/30 font-bold" 
                      : "bg-white opacity-45 hover:opacity-75"
                  }`}
                >
                  {bentoSelectedProject === 3 && (
                    <div className="absolute inset-0 border-2 border-[#10b981]/15 pointer-events-none z-10" />
                  )}
                  <div className="space-y-4">
                    <span className="font-mono text-[8px] font-black text-slate-400 tracking-wider">03 / COPILOT</span>
                    <div className="space-y-2 opacity-60">
                      <div className="p-1 px-1.5 bg-[#10b981]/15 rounded text-[7px] text-slate-600 font-sans tracking-tight">Question details...</div>
                      <div className="h-2 w-10 bg-slate-200 rounded self-end ml-auto animate-pulse" />
                    </div>
                  </div>
                  <span className="font-mono text-[7px] text-slate-400 font-bold tracking-wider uppercase">W: 280px</span>
                </div>

                {/* FOCUS LOCK COMPONENT OVERLAY ON SCHEMATIC */}
                {bentoSelectedProject === 4 && (
                  <div className="absolute inset-x-0 inset-y-0 bg-[#0f172a]/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 z-20 transition-all duration-300 animate-fade-in">
                    
                    {/* Styled off-white Card Container for design overview */}
                    <div className="bg-slate-50 rounded-[20px] border border-slate-100 shadow-[0_20px_45px_rgba(0,0,0,0.15)] p-3.5 w-full max-w-[195px] flex flex-col items-center select-none text-center border-solid">
                      
                      {/* Green Check Shield */}
                      <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2 shadow-xs border-solid">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      </div>

                      {/* Text Descriptions */}
                      <h4 className="font-sans font-black text-[11px] text-slate-800 leading-tight mb-0.5 select-none">Enter 4-Digit PIN</h4>
                      <p className="text-slate-450 font-sans font-semibold text-[7.5px] leading-tight mb-2 select-none">
                        Keep your focus locked
                      </p>

                      {/* Digits bullets Indicator */}
                      <div className="flex items-center gap-2 mb-2.5 select-none">
                        {[0, 1, 2, 3].map((idx) => (
                          <div 
                            key={idx} 
                            className="w-1.5 h-1.5 rounded-full bg-slate-200" 
                          />
                        ))}
                      </div>

                      {/* Precise On-Screen Keypad Grid */}
                      <div className="grid grid-cols-3 gap-y-1.5 gap-x-1.5 w-full max-w-[130px] mb-1 justify-items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <button
                            key={num}
                            type="button"
                            className="h-7 w-7 text-[10px] font-bold rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-3xs transition-all flex items-center justify-center cursor-pointer border-solid"
                          >
                            {num}
                          </button>
                        ))}
                        
                        {/* Close Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setBentoSelectedProject(1); // Reset back to default Sovereign Workspace preview
                          }}
                          className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full transition-all flex items-center justify-center cursor-pointer text-[9px] font-bold"
                        >
                          ✕
                        </button>

                        {/* 0 Key */}
                        <button
                          type="button"
                          className="h-7 w-7 text-[10px] font-bold rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-3xs transition-all flex items-center justify-center cursor-pointer border-solid"
                        >
                          0
                        </button>

                        {/* Backspace Key */}
                        <button
                          type="button"
                          className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19H20a2 2 0 002-2V7a2 2 0 00-2-2h-9.172a2 2 0 00-1.414.586L3 12z" />
                          </svg>
                        </button>
                      </div>

                    </div>
                    
                    <span className="font-mono text-[7px] text-emerald-400 font-extrabold tracking-widest uppercase mt-3 select-none">
                      04 / PIN-LOCKED PREVIEW
                    </span>

                  </div>
                )}

                {/* GLOBAL SCHEMATIC FOCUS LOCK SCREEN */}
                {learnMode && isLocked && (
                  <div className="absolute inset-x-0 inset-y-0 bg-[#0f172a]/40 backdrop-blur-xs flex flex-col items-center justify-center p-3 z-[25]">
                    
                    {/* Styled off-white Card Container matching screenshot */}
                    <div className={`bg-slate-55 rounded-[20px] border border-slate-100 shadow-[0_20px_45px_rgba(0,0,0,0.15)] p-3.5 w-full max-w-[195px] flex flex-col items-center select-none text-center border-solid ${lockShake ? "animate-bounce" : "transition-transform duration-300"}`}>
                      
                      {/* Green Check Shield */}
                      <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2 shadow-xs border-solid">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      </div>

                      {/* Text Descriptions */}
                      <h4 className="font-sans font-black text-[11px] text-slate-800 leading-tight mb-0.5 select-none animate-pulse">Enter 4-Digit PIN</h4>
                      <p className="text-slate-450 font-sans font-semibold text-[7.5px] leading-tight mb-2 select-none">
                        {lockMessage}
                      </p>

                      {/* Digits bullets Indicator */}
                      <div className="flex items-center gap-2 mb-2.5 select-none">
                        {[0, 1, 2, 3].map((idx) => (
                          <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
                              inputPin.length > idx 
                                ? "bg-emerald-500 scale-110 shadow-3xs" 
                                : "bg-slate-200"
                            }`} 
                          />
                        ))}
                      </div>

                      {/* Precise On-Screen Keypad Grid */}
                      <div className="grid grid-cols-3 gap-y-1.5 gap-x-1.5 w-full max-w-[130px] mb-1 justify-items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              if (inputPin.length < 4) {
                                const newPin = inputPin + num;
                                setInputPin(newPin);
                                verifyPin(newPin);
                              }
                            }}
                            className="h-7 w-7 text-[10px] font-bold rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-3xs active:scale-90 transition-all flex items-center justify-center cursor-pointer border-solid"
                          >
                            {num}
                          </button>
                        ))}
                        
                        {/* Close / Reset Pin Bullet */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsLocked(false);
                            setInputPin("");
                          }}
                          className="h-7 w-7 text-slate-450 hover:text-red-500 font-sans hover:bg-slate-100 rounded-full transition-all flex items-center justify-center cursor-pointer text-[9px] font-bold"
                        >
                          ✕
                        </button>

                        {/* 0 Key */}
                        <button
                          key={0}
                          type="button"
                          onClick={() => {
                            if (inputPin.length < 4) {
                              const newPin = inputPin + "0";
                              setInputPin(newPin);
                              verifyPin(newPin);
                            }
                          }}
                          className="h-7 w-7 text-[10px] font-bold rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-3xs active:scale-90 transition-all flex items-center justify-center cursor-pointer border-solid"
                        >
                          0
                        </button>

                        {/* Backspace Key */}
                        <button
                          type="button"
                          onClick={() => setInputPin(prev => prev.slice(0, -1))}
                          className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-95 transition-all cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19H20a2 2 0 002-2V7a2 2 0 00-2-2h-9.172a2 2 0 00-1.414.586L3 12z" />
                          </svg>
                        </button>
                      </div>

                    </div>

                    {/* Developer Auto-Fill Helper at bottom, neatly segregated */}
                    <button
                      type="button"
                      onClick={() => {
                        setInputPin(pinCode);
                        setTimeout(() => {
                          setIsLocked(false);
                          setInputPin("");
                        }, 350);
                      }}
                      className="mt-2.5 px-2 py-0.5 rounded bg-[#0f172a]/80 backdrop-blur-xs text-[7.5px] font-mono text-emerald-400 border border-emerald-500/20 hover:bg-[#0f172a] transition uppercase select-none cursor-pointer tracking-wider animate-pulse border-solid"
                    >
                      Auto Unlock ({pinCode})
                    </button>

                  </div>
                )}

              </div>

              {/* Integrated Blueprint Measurements Overlay line */}
              <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-50 border-t border-slate-200/60 font-mono text-[6.5px] text-slate-400 px-3 flex items-center justify-between shrink-0 select-none border-solid">
                <span>X OFFSET: 0.00px</span>
                <span>GRID SNAP: ON (8px)</span>
                <span>STATUS: ONLINE READY</span>
              </div>

            </div>
          </div>
        </div>

        {/* Subtitle explaining interaction */}
        <p className="mt-4 text-center font-sans text-slate-500 text-[11px] font-medium leading-normal relative z-10 select-none">
          Hover or click any panel quadrant of the blueprint above to align focused architectural specs instantly.
        </p>
      </div>

    </div>
  );
}
