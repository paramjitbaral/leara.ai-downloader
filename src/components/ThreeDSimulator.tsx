/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Monitor, HelpCircle, Eye, Columns, RefreshCw, Layers, CheckSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WindowState {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorTheme: "blue" | "emerald" | "amber";
  activeZ: number;
  isSnapped: boolean;
  snappedPosition?: "left" | "right" | "full" | null;
}

export default function ThreeDSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Floating Windows State setup
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: "win-1",
      title: "Marketing_Campaign_Overview.pdf",
      x: 30,
      y: 40,
      width: 220,
      height: 140,
      colorTheme: "blue",
      activeZ: 10,
      isSnapped: false
    },
    {
      id: "win-2",
      title: "Creative_Moodboard_2026.png",
      x: 180,
      y: 110,
      width: 230,
      height: 150,
      colorTheme: "amber",
      activeZ: 20,
      isSnapped: false
    },
    {
      id: "win-3",
      title: "Web_Browser_Workspace",
      x: 80,
      y: 200,
      width: 240,
      height: 130,
      colorTheme: "emerald",
      activeZ: 15,
      isSnapped: false
    }
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [highestZ, setHighestZ] = useState(20);
  const [hoveredGuide, setHoveredGuide] = useState<"left" | "right" | null>(null);

  // Monitor size constants (simulated inside container)
  const canvasWidth = 520;
  const canvasHeight = 360;

  // Track window dragging triggers
  const startDrag = (e: React.MouseEvent, winId: string) => {
    e.preventDefault();
    const win = windows.find((w) => w.id === winId);
    if (!win) return;

    // Bring this window to front
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    
    setWindows(
      windows.map((w) => (w.id === winId ? { ...w, activeZ: newZ, isSnapped: false, snappedPosition: null } : w))
    );

    const clientX = e.clientX;
    const clientY = e.clientY;

    setDraggingId(winId);
    
    // Calculate offset inside the window itself
    setDragOffset({
      x: clientX - win.x,
      y: clientY - win.y
    });
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (!draggingId || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      let newX = e.clientX - rect.left - (dragOffset.x - (windows.find(w => w.id === draggingId)?.x || 0));
      let newY = e.clientY - rect.top - (dragOffset.y - (windows.find(w => w.id === draggingId)?.y || 0));

      // Correct coordinate drift relative to offset
      newX = e.clientX - dragOffset.x;
      newY = e.clientY - dragOffset.y;

      // Keep inside container bound buffers
      const winObj = windows.find(w => w.id === draggingId);
      if (!winObj) return;
      const rightLimit = canvasWidth - winObj.width;
      const bottomLimit = canvasHeight - winObj.height;

      newX = Math.max(0, Math.min(newX, rightLimit));
      newY = Math.max(0, Math.min(newY, bottomLimit));

      // Detect Snap Zones guides
      if (newX < 40) {
        setHoveredGuide("left");
      } else if (newX > rightLimit - 40) {
        setHoveredGuide("right");
      } else {
        setHoveredGuide(null);
      }

      setWindows(
        windows.map((w) => (w.id === draggingId ? { ...w, x: newX, y: newY } : w))
      );
    };

    const handleGlobalUp = () => {
      if (draggingId) {
        // Apply snaps if in guide area
        const winObj = windows.find(w => w.id === draggingId);
        if (winObj) {
          if (hoveredGuide === "left") {
            setWindows(
              windows.map((w) =>
                w.id === draggingId
                  ? {
                      ...w,
                      isSnapped: true,
                      snappedPosition: "left",
                      x: 10,
                      y: 10,
                      width: canvasWidth / 2 - 15,
                      height: canvasHeight - 20
                    }
                  : w
              )
            );
          } else if (hoveredGuide === "right") {
            setWindows(
              windows.map((w) =>
                w.id === draggingId
                  ? {
                      ...w,
                      isSnapped: true,
                      snappedPosition: "right",
                      x: canvasWidth / 2 + 5,
                      y: 10,
                      width: canvasWidth / 2 - 15,
                      height: canvasHeight - 20
                    }
                  : w
              )
            );
          }
        }
        setDraggingId(null);
        setHoveredGuide(null);
      }
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", handleGlobalUp);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
    };
  }, [draggingId, dragOffset, windows, hoveredGuide]);

  // Reset desktop grid to default
  const resetWorkspace = () => {
    setWindows([
      {
        id: "win-1",
        title: "Marketing_Campaign_Overview.pdf",
        x: 30,
        y: 40,
        width: 220,
        height: 140,
        colorTheme: "blue",
        activeZ: 10,
        isSnapped: false
      },
      {
        id: "win-2",
        title: "Creative_Moodboard_2026.png",
        x: 180,
        y: 110,
        width: 230,
        height: 150,
        colorTheme: "amber",
        activeZ: 20,
        isSnapped: false
      },
      {
        id: "win-3",
        title: "Web_Browser_Workspace",
        x: 80,
        y: 200,
        width: 240,
        height: 130,
        colorTheme: "emerald",
        activeZ: 15,
        isSnapped: false
      }
    ]);
    setHoveredGuide(null);
  };

  // Auto-Snap windows side-by-side (Demonstrating snapping)
  const applyDuoSnap = () => {
    setWindows([
      {
        id: "win-1",
        title: "Marketing_Campaign_Overview.pdf",
        x: 10,
        y: 10,
        width: canvasWidth / 2 - 15,
        height: canvasHeight - 20,
        colorTheme: "blue",
        activeZ: 10,
        isSnapped: true,
        snappedPosition: "left"
      },
      {
        id: "win-2",
        title: "Creative_Moodboard_2026.png",
        x: canvasWidth / 2 + 5,
        y: 10,
        width: canvasWidth / 2 - 15,
        height: canvasHeight / 2 - 15,
        colorTheme: "amber",
        activeZ: 20,
        isSnapped: true,
        snappedPosition: "right"
      },
      {
        id: "win-3",
        title: "Web_Browser_Workspace",
        x: canvasWidth / 2 + 5,
        y: canvasHeight / 2 + 5,
        width: canvasWidth / 2 - 15,
        height: canvasHeight / 2 - 15,
        colorTheme: "emerald",
        activeZ: 15,
        isSnapped: true,
        snappedPosition: "right"
      }
    ]);
  };

  return (
    <section 
      id="simulator" 
      className="py-24 bg-linear-to-b from-white via-slate-50 to-white px-6 relative border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold mb-4">
            <Monitor className="w-3.5 h-3.5" /> Interactive Sandbox
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            A Spatial Desktop, Right in Your Browser
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Drag the window panels below. Drag toward the left or right edges to invoke Prism&apos;s real-time snap boundaries, or trigger macro shortcuts below.
          </p>
        </div>

        {/* Dashboard and virtual sandbox wrapper */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel instructions (Cols 4) */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <h3 className="font-sans font-extrabold text-slate-800 text-2xl mb-6">Prism Snap Mechanics</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
                  <span className="font-mono text-sm font-bold text-sky-600">1</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-800 text-base mb-1">Interactive Dragging</h4>
                  <p className="font-sans text-slate-500 text-sm leading-relaxed">
                    Grab any window tag handle by its top titlebar and glide it across the workspace matrix. Responsive depth shadows elevate active targets.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                  <span className="font-mono text-sm font-bold text-indigo-600">2</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-800 text-base mb-1">Magnetic Dock Assist</h4>
                  <p className="font-sans text-slate-500 text-sm leading-relaxed">
                    Approach within 40px of screen margins to reveal a beautiful vector alignment guide overlay. Release key to perform the grid docking constraint.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <span className="font-mono text-sm font-bold text-emerald-600">3</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-800 text-base mb-1">Unified Multi-Grids</h4>
                  <p className="font-sans text-slate-500 text-sm leading-relaxed">
                    Once snapped, margins snap lock perfectly. Windows are recalculated into clean grids without screen space wastage.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick alignment triggers */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap gap-3">
              <button
                id="reset-playground-btn"
                onClick={resetWorkspace}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 font-sans text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Sandbox
              </button>
              
              <button
                id="trigger-split-grid-btn"
                onClick={applyDuoSnap}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 border border-indigo-500 hover:bg-indigo-700 font-sans text-xs font-bold text-white transition shadow-sm cursor-pointer"
              >
                <Columns className="w-3.5 h-3.5" />
                Trigger Perfect Divide
              </button>
            </div>
          </div>

          {/* Right panel: The Virtual Monitor Frame with Draggable Windows (Cols 8) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            {/* The Outer iMac/Windows Bezel Design wrapper */}
            <div className="w-full max-w-[580px] bg-slate-100 border border-slate-300 rounded-3xl p-5 shadow-2xl relative">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-300" />
              
              {/* Virtual OS Desktop Canvas */}
              <div 
                ref={containerRef}
                className="w-full h-[360px] rounded-2xl relative bg-linear-to-tr from-sky-100/40 via-purple-50/20 to-white border border-slate-200 shadow-inner overflow-hidden select-none"
                style={{ width: "100%" }}
              >
                {/* Simulated Desktop pattern grids backing */}
                <div className="absolute inset-0 z-0 opacity-[0.25] bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                {/* Floating Ambient Wallpaper Elements */}
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-sky-400/20 rounded-full blur-2xl filter" />
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl filter" />

                {/* Snap Assist Zones Guidance Overlays */}
                <AnimatePresence>
                  {hoveredGuide === "left" && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-2.5 top-2.5 bottom-2.5 w-[46%] rounded-xl border-2 border-dashed border-sky-400 bg-sky-200/45 backdrop-blur-xs z-50 flex items-center justify-center"
                    >
                      <span className="font-mono text-[9px] font-bold text-sky-700 bg-white border border-sky-300 px-2 py-1 rounded-md shadow-xs uppercase tracking-wide">Ready to Snap Left</span>
                    </motion.div>
                  )}
                  {hoveredGuide === "right" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-2.5 top-2.5 bottom-2.5 w-[46%] rounded-xl border-2 border-dashed border-sky-400 bg-sky-200/45 backdrop-blur-xs z-50 flex items-center justify-center"
                    >
                      <span className="font-mono text-[9px] font-bold text-sky-700 bg-white border border-sky-300 px-2 py-1 rounded-md shadow-xs uppercase tracking-wide">Ready to Snap Right</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Glass Windows Render Loop */}
                {windows.map((win) => {
                  const getThemeClasses = (theme: string, active: boolean) => {
                    switch (theme) {
                      case "blue":
                        return active 
                          ? "border-sky-300 bg-white/75 shadow-sky-400/20"
                          : "border-slate-200 bg-white/70 shadow-slate-300/10";
                      case "emerald":
                        return active 
                          ? "border-emerald-300 bg-white/75 shadow-emerald-400/20"
                          : "border-slate-200 bg-white/70 shadow-slate-300/10";
                      case "amber":
                        return active 
                          ? "border-amber-300 bg-white/75 shadow-amber-400/20"
                          : "border-slate-200 bg-white/70 shadow-slate-300/10";
                      default:
                        return "border-slate-200 bg-white/75";
                    }
                  };

                  const getHeaderDotColors = (theme: string) => {
                    switch (theme) {
                      case "blue": return "bg-sky-400";
                      case "emerald": return "bg-emerald-400";
                      case "amber": return "bg-amber-400";
                      default: return "bg-slate-300";
                    }
                  };

                  const isDraggingWin = draggingId === win.id;

                  return (
                    <div
                      key={win.id}
                      id={`sim-window-${win.id}`}
                      className={`absolute rounded-xl border backdrop-blur-md shadow-xl transition-all duration-150 flex flex-col justify-between overflow-hidden cursor-move ${
                        getThemeClasses(win.colorTheme, isDraggingWin)
                      } ${win.isSnapped ? "transition-all duration-300 ease-out" : ""}`}
                      style={{
                        left: `${win.x}px`,
                        top: `${win.y}px`,
                        width: `${win.width}px`,
                        height: `${win.height}px`,
                        zIndex: win.activeZ,
                        transform: isDraggingWin ? "scale(1.025) translateY(-3px)" : "none",
                        boxShadow: isDraggingWin 
                          ? "0 25px 50px -12px rgb(0 0 0 / 0.15), 0 0 15px -3px rgb(56 189 248 / 0.25)" 
                          : "0 10px 25px -5px rgb(0 0 0 / 0.08)"
                      }}
                    >
                      {/* Window TitleBar drag handler */}
                      <div
                        onMouseDown={(e) => startDrag(e, win.id)}
                        className={`px-3 py-2 flex items-center justify-between select-none active:cursor-grabbing border-b border-slate-200/60 bg-slate-50/50`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-full ${getHeaderDotColors(win.colorTheme)}`} />
                          <span className="font-mono text-[9px] font-bold text-slate-600 truncate">{win.title}</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {win.isSnapped && (
                            <span className="font-mono text-[7.5px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-1 rounded-xs uppercase">DOCK ACTIVE</span>
                          )}
                          <span className="w-2.5 h-0.5 bg-slate-300 rounded-sm" />
                          <span className="w-2.5 h-2 border border-slate-300 rounded-sm" />
                        </div>
                      </div>

                      {/* Window Inner Slate mockup */}
                      <div className="grow p-3 flex flex-col text-left justify-between overflow-hidden relative">
                        {win.colorTheme === "blue" && (
                          <div className="space-y-2 mt-1">
                            <div className="flex justify-between font-mono text-[8px] text-slate-400">
                              <span>Grid Alignment</span>
                              <span>Ratio: 7:3</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="w-3 bg-sky-100 rounded-xs h-8 block grow" />
                              <span className="w-3 bg-sky-200 rounded-xs h-8 block grow" />
                              <span className="w-3 bg-sky-500 rounded-xs h-8 block grow" />
                            </div>
                          </div>
                        )}

                        {win.colorTheme === "amber" && (
                          <div className="space-y-1.5 mt-1">
                            <div className="flex justify-between font-sans text-[8px] text-slate-400 font-bold uppercase">
                              <span>Aesthetic Swatches</span>
                              <span>Warm Mode</span>
                            </div>
                            <div className="flex gap-1.5 py-0.5">
                              <span className="w-4 h-4 rounded-full bg-amber-500 block" />
                              <span className="w-4 h-4 rounded-full bg-orange-400 block" />
                              <span className="w-4 h-4 rounded-full bg-rose-500 block" />
                            </div>
                            <p className="font-sans text-[8.5px] text-slate-500 leading-none">Aesthetic Moodboard theme matches desktop accents</p>
                          </div>
                        )}

                        {win.colorTheme === "emerald" && (
                          <div className="space-y-2 mt-1">
                            <div className="flex justify-between font-sans text-[8px] text-slate-400 font-bold uppercase">
                              <span>Live Session</span>
                              <span>Active</span>
                            </div>
                            <div className="p-1 px-1.5 rounded-lg bg-emerald-50 border border-emerald-100/50">
                              <span className="text-[8px] text-emerald-700 block font-sans font-bold leading-none">Workspace Balanced</span>
                            </div>
                            <span className="font-sans text-[8.5px] text-slate-500 block leading-tight font-medium">Auto-scanned bookmarks synced</span>
                          </div>
                        )}
                        
                        {/* Footer decorative coordinate trace */}
                        <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-1.5 opacity-60">
                          <span className="font-mono text-[7px] text-slate-400 font-semibold uppercase">NODE COORDINATE</span>
                          <span className="font-mono text-[8px] text-slate-500">
                            X:{Math.round(win.x)} Y:{Math.round(win.y)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instructions banner base */}
              <div className="mt-4 flex items-center justify-between text-left px-1">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Click and hold window header tabs to drag-and-snap.</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
              </div>
            </div>

            {/* Beautiful, minimal quality badge */}
            <div className="mt-8 flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-600 font-sans font-medium">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-pulse" />
              <span>Prism is designed to feel fluid, native, and perfectly integrated into Windows 10 & 11.</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
