/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Download, ChevronDown, Sparkles, Terminal } from "lucide-react";

interface NavbarProps {
  onOpenDownload: () => void;
}

export default function Navbar({ onOpenDownload }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="leara-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Left Side: Professional Logo with Colored Triangle Icon (Antigravity-style elegant) */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer select-none"
          id="brand-logo"
        >
          {/* Custom high-fidelity 3D gradient LAi logo (matching uploaded design) */}
          <div className="h-8 flex items-center justify-center relative shadow-3xs hover:scale-105 transition-transform duration-200">
            <img src="/logo.png" alt="Leara.ai Logo" className="h-full w-auto object-contain" />
          </div>
          <span className="font-sans font-black text-[20px] tracking-tighter leading-tight">
            <span className="text-sky-500">Leara</span><span className="text-emerald-500">.ai</span>
          </span>
        </div>

        {/* Center: Beautiful Menu Layout */}
        <div className="hidden md:flex items-center gap-7 text-[13.5px] font-medium font-sans select-none text-slate-500">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition-colors duration-200 hover:text-slate-900">Home</a>
          <a href="#comparison-matrix" className="transition-colors duration-200 hover:text-slate-900">Comparison</a>
          <a href="#claim-sovereignty" className="transition-colors duration-200 hover:text-slate-900">Sovereignty</a>
        </div>

        {/* Right Side: Exact pill-shaped Download button with down-arrow */}
        <div>
          <button
            id="nav-download-button"
            onClick={onOpenDownload}
            className="flex items-center gap-1 px-5 py-2 rounded-full font-sans font-medium text-[13px] cursor-pointer shadow-xs transition-all duration-300 bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <span>Download</span>
            <span className="text-[10px] ml-0.5">↓</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
