/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { motion } from "motion/react";

interface ClaimSovereigntyProps {
  onOpenDownload: () => void;
}

export default function ClaimSovereignty({ onOpenDownload }: ClaimSovereigntyProps) {
  const [isHoveredWin, setIsHoveredWin] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHoveredIcon, setIsHoveredIcon] = useState(false);
  
  // Custom states for single-trigger viewport assembly flow - resets on page refresh!
  const [logoState, setLogoState] = useState<"idle" | "assembling" | "assembled">("idle");
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedOnce) {
          setHasPlayedOnce(true);
          setLogoState("assembling");
          // Transition to fully assembled stable state after premium spring finishes
          const timer = setTimeout(() => {
            setLogoState("assembled");
          }, 4000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayedOnce]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth physical 3D tilt calculations simulating Windows Spotlight
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 14;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    
    // Spot highlight tracker coordinates
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    
    setTilt({ x: rx, y: ry });
    setGlowPos({ x: gx, y: gy });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveredIcon(false);
  };

  return (
    <section 
      id="claim-sovereignty"
      className="relative bg-[#090D16] text-slate-100 py-24 overflow-hidden border-t border-slate-900 select-none"
    >
      {/* Aesthetic Light Geometric highlights exactly coordinating with the clean white/slate theme */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-slate-900/40 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copy and Solid Button actions (Col 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            {/* Blue status badge like dashboard style */}
            <span className="font-mono text-[10.5px] font-black tracking-[0.14em] text-[#10b981] uppercase block">
              NATIVE CLIENT AVAILABLE
            </span>
            
            {/* Massive Title */}
            <h2 className="font-sans font-black text-4xl sm:text-5xl tracking-tight text-white leading-tight">
              Native Desktop Companion
            </h2>
            
            {/* Core copy */}
            <p className="font-sans text-slate-400 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
              Get the full power of Leara directly on your computer. Experience seamless window controls, custom focus triggers, and beautiful local speed optimization.
            </p>
          </div>

          {/* Interactive Button Configuration Panel */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Windows Download Solid Action Button */}
            <button
              onClick={onOpenDownload}
              onMouseEnter={() => setIsHoveredWin(true)}
              onMouseLeave={() => setIsHoveredWin(false)}
              className="px-6 py-4 rounded-xl bg-neutral-100 text-slate-950 font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider hover:bg-white flex items-center gap-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] active:scale-[0.99] transition-all cursor-pointer border border-transparent"
            >
              {/* Custom SVG Microsoft Windows Logo */}
              <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform duration-300 ${isHoveredWin ? 'scale-110 text-[#10b981]' : 'text-slate-950'}`} fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zm13.2 10.5v11.55L10.8 22.05v-9.6H24z" />
              </svg>
              <div className="text-left flex flex-col leading-tight">
                <span className="text-[8px] font-bold text-slate-500 tracking-normal normal-case">DOWNLOAD FOR</span>
                <span className="text-[12px] font-extrabold tracking-wide text-slate-950 font-sans">Windows x64</span>
              </div>
            </button>

          </div>

        </div>

        {/* Right Side: High-Fidelity Interactive Explode & Gather Windows Logo Playground */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[380px] relative z-15">
          
          <div 
            ref={containerRef}
            className="relative w-80 h-80 flex items-center justify-center cursor-pointer select-none overflow-visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHoveredIcon(true)}
          >
            {/* Ambient Background Aura Glow when gathered */}
            <motion.div 
              className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-indigo-500/10 to-teal-500/10 blur-3xl pointer-events-none z-0"
              animate={{
                scale: isHoveredIcon ? 1.2 : 0.95,
                opacity: isHoveredIcon ? 0.8 : 0.45,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Glowing spotlight that tracks mouse coordinate */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-500 z-10"
              style={{
                background: isHoveredIcon ? `radial-gradient(circle 120px at ${glowPos.x}% ${glowPos.y}%, rgba(56, 189, 248, 0.12), transparent)` : 'none'
              }}
            />

            {/* Magnetic Particles Gathering Nebula - Auto-starting once during assembly phase */}
            {logoState === "assembling" && Array.from({ length: 22 }).map((_, i) => {
              const particleColors = ["#38bdf8", "#0ea5e9", "#60a5fa", "#3b82f6", "#93c5fd"];
              const angle = (i / 22) * Math.PI * 2;
              const distX = 80 + Math.random() * 40; // Safely inside the boundary so they never get clipped
              const distY = 80 + Math.random() * 40;
              const px = Math.cos(angle) * distX;
              const py = Math.sin(angle) * distY;
              const size = 1.4 + Math.random() * 2.2;
              const color = particleColors[i % 5];

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    left: "50%",
                    top: "50%",
                    backgroundColor: color,
                    boxShadow: `0 0 6px ${color}`
                  }}
                  initial={{ x: px, y: py, opacity: 0, scale: 0.1 }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 0.9, 0],
                    scale: [0.6, 1.3, 0]
                  }}
                  transition={{
                    duration: 2.4 + Math.random() * 0.6, // Slow and smooth velocities
                    ease: "linear",
                    delay: Math.random() * 0.3
                  }}
                />
              );
            })}
 
            {/* Massive Windows Logo with modular 3D perspective assembler groups */}
            <motion.svg 
              viewBox="0 0 24 24" 
              className="w-56 h-56 drop-shadow-[0_0_36px_rgba(56,189,248,0.18)] select-none pointer-events-none z-10" 
              style={{
                transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: isHoveredIcon ? 'none' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <defs>
                {/* Genuine Premium Windows OS Fluent-Blue Gradients */}
                <linearGradient id="winBlueQ1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="winBlueQ2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="winBlueQ3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="winBlueQ4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
 
              {/* Quadrant 1: Top-Left (Premium Windows Accent) */}
              <motion.g
                initial="idle"
                animate={logoState}
                variants={{
                  idle: { x: -20, y: -20, scale: 0.78, opacity: 0 },
                  assembling: { x: 0, y: 0, scale: 1, opacity: 1 },
                  assembled: { x: 0, y: 0, scale: 1, opacity: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 15,
                  mass: 0.8,
                  delay: 0.05
                }}
              >
                <path 
                  d="M2 4.5 L11.5 3.2 V11.5 H2 Z" 
                  fill="url(#winBlueQ1)" 
                  className="transition-colors duration-300"
                />
              </motion.g>

              {/* Quadrant 2: Bottom-Left (Premium Windows Accent) */}
              <motion.g
                initial="idle"
                animate={logoState}
                variants={{
                  idle: { x: -20, y: 20, scale: 0.78, opacity: 0 },
                  assembling: { x: 0, y: 0, scale: 1, opacity: 1 },
                  assembled: { x: 0, y: 0, scale: 1, opacity: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 15,
                  mass: 0.8,
                  delay: 0.12
                }}
              >
                <path 
                  d="M2 12.5 H11.5 V20.8 L2 19.5 Z" 
                  fill="url(#winBlueQ2)" 
                  className="transition-colors duration-300"
                />
              </motion.g>

              {/* Quadrant 3: Top-Right (Premium Windows Accent) */}
              <motion.g
                initial="idle"
                animate={logoState}
                variants={{
                  idle: { x: 20, y: -20, scale: 0.78, opacity: 0 },
                  assembling: { x: 0, y: 0, scale: 1, opacity: 1 },
                  assembled: { x: 0, y: 0, scale: 1, opacity: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 15,
                  mass: 0.8,
                  delay: 0.18
                }}
              >
                <path 
                  d="M12.5 3.1 L22 1.8 V11.5 H12.5 Z" 
                  fill="url(#winBlueQ3)" 
                  className="transition-colors duration-300"
                />
              </motion.g>

              {/* Quadrant 4: Bottom-Right (Premium Windows Accent) */}
              <motion.g
                initial="idle"
                animate={logoState}
                variants={{
                  idle: { x: 20, y: 20, scale: 0.78, opacity: 0 },
                  assembling: { x: 0, y: 0, scale: 1, opacity: 1 },
                  assembled: { x: 0, y: 0, scale: 1, opacity: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 15,
                  mass: 0.8,
                  delay: 0.25
                }}
              >
                <path 
                  d="M12.5 12.5 H22 V22.2 L12.5 20.9 Z" 
                  fill="url(#winBlueQ4)" 
                  className="transition-colors duration-300"
                />
              </motion.g>
            </motion.svg>
 
          </div>
        </div>

      </div>

      {/* Extreme corner graphic detail element */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-10 transform translate-x-12 translate-y-12">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          <line x1="240" y1="0" x2="0" y2="240" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="240" y1="40" x2="40" y2="240" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="#f1f5f9" strokeWidth="1" />
        </svg>
      </div>

    </section>
  );
}
