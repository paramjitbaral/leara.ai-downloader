/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import {
  Lock,
  Github,
  GitBranch,
  Folder,
  FileText,
  Settings,
  Check,
  Sparkles,
  Database,
  Cloud,
  Activity,
  Cpu,
  Terminal,
  Zap,
  RefreshCw,
  ShieldCheck,
  GraduationCap,
  Search,
  Play,
  Sliders,
  Bot,
  ChevronDown,
  ChevronRight,
  FolderOpen
} from "lucide-react";
import { motion, useTransform, useMotionValue } from "motion/react";

interface FeatureSliderProps {
  pinCode?: string;
}

export default function FeatureSlider({ pinCode = "1234" }: FeatureSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Dynamic sliding range based on element dimensions (stored as absolute pixels)
  const [slideRange, setSlideRange] = useState<number>(0);

  // Custom MotionValue to track scroll progress with absolute mathematical perfection
  const scrollProgressVal = useMotionValue(0);

  // Dynamically calculate the precise overflow percentage required to slide all items into view
  useEffect(() => {
    const calculateRange = () => {
      if (!wrapperRef.current) return;

      const isSm = window.innerWidth >= 640;
      // fallback values adjusted for extra elegant spacer
      const defaultTrackWidth = isSm ? (1878 + 112) : (1496 + 64);
      const trackWidth = (trackRef.current && trackRef.current.scrollWidth > 0)
        ? trackRef.current.scrollWidth
        : defaultTrackWidth;

      const containerWidth = wrapperRef.current.getBoundingClientRect().width;

      if (trackWidth > containerWidth) {
        const overflow = trackWidth - containerWidth;
        // Slide by exactly the overflow distance in pixels (negative)
        setSlideRange(-overflow);
      } else {
        setSlideRange(0);
      }
    };

    // Calculate immediately on mount
    calculateRange();

    // Instantly respond to element resize using ResizeObserver for maximum robustness
    const resizeObserver = new ResizeObserver(() => {
      calculateRange();
    });

    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener("resize", calculateRange);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  // Hook up high performance scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;

      if (totalDistance <= 0) return;

      // Calculate standard scroll progress through the pin phase
      const current = -rect.top;
      const progress = Math.min(1, Math.max(0, current / totalDistance));

      if (!isNaN(progress)) {
        scrollProgressVal.set(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgressVal]);

  // Map vertical scroll progress to horizontal translation of the cards track dynamically.
  // We complete the horizontal translation fully at scroll position 0.85 (85% progress),
  // leaving the remaining 15% phase to hold the track stationary so users can visually absorb the end card
  // before the parent container unpins and scrolls away.
  const xTranslate = useTransform(scrollProgressVal, (progress) => {
    const slideMultiplier = Math.min(1, progress / 0.85);
    const rangeVal = slideRange || 0;
    return `${slideMultiplier * rangeVal}px`;
  });

  const features = [
    {
      id: "00",
      title: "High-Performance GitHub",
      description: "Instantly clones and auto-configures repositories in seconds.",
      tag: "GITHUB SYNC",
      component: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d1117]">
          <div className="flex items-center gap-6 w-full justify-center">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
              <Github className="w-5 h-5 text-slate-400" />
            </div>
            <div className="relative w-16 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/2 bg-sky-500 rounded-full animate-[slideRight_1.5s_ease-in-out_infinite]" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
              <FolderOpen className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <style>{`
            @keyframes slideRight {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      )
    },
    {
      id: "01",
      title: "AI Pair Programming",
      description: "Interactive refactoring suggestions with live performance metrics.",
      tag: "GEMINI AI",
      component: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d1117]">
          <div className="w-full max-w-[140px] space-y-3 relative">
            {/* Generic code block representations */}
            <div className="w-full h-2 rounded-full bg-slate-800" />
            <div className="w-5/6 h-2 rounded-full bg-slate-800" />

            <div className="relative flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-2 rounded-lg -mx-2">
              <div className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center shrink-0">
                <Bot className="w-3 h-3 text-sky-400" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="w-full h-1.5 rounded-full bg-sky-500/30" />
                <div className="w-2/3 h-1.5 rounded-full bg-sky-500/30" />
              </div>
            </div>

            <div className="w-3/4 h-2 rounded-full bg-slate-800" />
          </div>
        </div>
      )
    },
    {
      id: "02",
      title: "Immersive Learning",
      description: "A distraction-free mode secured by an interactive PIN lock.",
      tag: "FOCUS LOCK",
      component: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d1117]">
          <div className="w-full max-w-[160px] bg-slate-900/50 border border-slate-800/80 rounded-lg p-3 text-center space-y-3">
            <Lock className="w-5 h-5 text-slate-400 mx-auto" />
            <div>
              <p className="text-[10px] font-bold text-slate-300 font-sans mb-0.5">Focus Mode Active</p>
              <p className="text-[8.5px] text-slate-500 font-sans">All distractions blocked</p>
            </div>
            <div className="flex justify-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "03",
      title: "Cloud Persistence",
      description: "Synchronize real-time workspace states on any remote device.",
      tag: "PERSISTENCE",
      component: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d1117]">
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[9px] text-slate-500 font-sans font-medium">Local</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-16">
              <Cloud className="w-4 h-4 text-sky-500" />
              <div className="w-full flex justify-between items-center px-1">
                <div className="w-1 h-1 rounded-full bg-sky-500" />
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="w-1 h-1 rounded-full bg-slate-700" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Database className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[9px] text-slate-500 font-sans font-medium">Remote</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "04",
      title: "Command Center",
      description: "Live workspace metrics, repository speeds, and runtime status.",
      tag: "COMMAND CENTER",
      component: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0d1117]">
          <div className="w-full max-w-[150px] space-y-2">
            <div className="flex gap-2 w-full">
              <div className="h-10 flex-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-sky-400" />
              </div>
              <div className="h-10 flex-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
                <Cpu className="w-4 h-4 text-slate-400" />
              </div>
              <div className="h-10 flex-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="w-full h-12 bg-slate-900 border border-slate-800 rounded-lg relative overflow-hidden flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  d="M0,35 L15,25 L30,30 L45,15 L60,20 L75,5 L100,10"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[520vh]">
      {/* 
        Sticky Viewport container.
        This pins the screen in place when the user scrolls down,
        letting the cards slide horizontally in spot before releasing.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#090d16] px-2 sm:px-6">

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Title Grid Segment */}
          <div className="lg:col-span-4 flex flex-col text-left space-y-4 select-none lg:pr-8 z-10">
            <div className="inline-flex">
              <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase font-mono px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-800/40">
                02 / ARCHITECTURE
              </span>
            </div>

            <h3 className="font-sans font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] max-w-sm">
              What You'll Unlock
            </h3>

            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed font-semibold max-w-sm" id="unlock-sub-desc">
              An autonomous, deep-focus ecosystem. Progress through individual modules instantly as you scroll down. Your focus remains absolute.
            </p>

            {/* Scroll Indicator Prompt */}
            <div className="pt-4 flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider animate-pulse">
              <span>Scroll down to slide</span>
              <svg className="w-3.5 h-3.5 animate-bounce mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Right Sliding Component */}
          <div className="lg:col-span-8 relative z-10">
            {/* Visual gradient mask overlays to clean horizontal bounds */}
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#090d16] to-transparent pointer-events-none z-20 hidden md:block" />
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#090d16] to-transparent pointer-events-none z-20 hidden md:block" />

            {/* Framer motion wrapper executing the horizontal track translation */}
            <div ref={wrapperRef} className="overflow-hidden py-4 -my-4 pl-1">
              <motion.div
                ref={trackRef}
                style={{ x: xTranslate }}
                className="flex gap-6 sm:gap-8 flex-row cursor-grab active:cursor-grabbing w-max"
              >
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[350px] shrink-0 bg-[#0e1320] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/50 hover:bg-[#111827] hover:shadow-2xl hover:shadow-sky-900/20 transition-all duration-300 relative group select-none"
                  >
                    {/* Decorative tag upper right */}
                    <span className="absolute top-5 right-5 text-[9px] font-mono font-black text-slate-550 group-hover:text-sky-400 transition-colors uppercase">
                      [{feat.tag}]
                    </span>

                    <div className="text-left flex flex-col">
                      {/* Number Indicator badge */}
                      <div className="text-sky-400 font-mono text-xs font-bold mb-1.5 select-none uppercase">
                        [{feat.id}]
                      </div>

                      {/* Card main title */}
                      <h4 className="font-sans font-extrabold text-white text-base tracking-tight mb-3">
                        {feat.title}
                      </h4>

                      {/* Inner simulator representation card */}
                      <div className="w-full bg-[#090d16] border border-slate-800 rounded-xl p-4 aspect-[1.5/1] relative overflow-hidden flex flex-col justify-between shadow-3xs group-hover:border-slate-700 transition-colors duration-300">
                        {feat.component}
                      </div>
                    </div>

                    {/* Card Description underneath visual frame */}
                    <p className="mt-4 text-slate-400 font-sans text-xs leading-relaxed font-semibold text-left">
                      {feat.description}
                    </p>
                  </div>
                ))}

                {/* Visual trailing Spacer to allow the 5th card to slide completely past the right gradient mask overlay */}
                <div className="w-16 sm:w-28 shrink-0 pointer-events-none" />
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
