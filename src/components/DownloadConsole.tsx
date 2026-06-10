/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Download, CheckCircle2, X, ArrowRight, RefreshCw, Box } from "lucide-react";

interface DownloadConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadConsole({ isOpen, onClose }: DownloadConsoleProps) {
  const [downloadStep, setDownloadStep] = useState<"form" | "progress" | "complete">("form");
  const [percent, setPercent] = useState(0);
  const [speed, setSpeed] = useState(0.0);

  useEffect(() => {
    if (!isOpen) {
      setDownloadStep("form");
      setPercent(0);
    }
  }, [isOpen]);

  const startSimulation = () => {
    setDownloadStep("progress");
    setPercent(0);
    setSpeed(14.8 + Math.random() * 3);

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStep("complete");
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 8;
        setSpeed(15.1 + (Math.random() * 2 - 1));
        return Math.min(prev + increment, 100);
      });
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div 
      id="download-dialog-overlay"
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-zinc-950/20 backdrop-blur-[2px] animate-fade-in"
    >
      <div 
        id="download-modal-content"
        className="w-full max-w-[360px] bg-white text-zinc-800 rounded-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Minimal Close Button */}
        <button
          id="close-download-dialog-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition cursor-pointer z-50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 select-none font-sans">
          
          {/* STEP 1: Main Platform Direct Action */}
          {downloadStep === "form" && (
            <div className="space-y-5">
              
              {/* Minimalist Left-Aligned Header */}
              <div className="space-y-1.5 pt-1">
                <div className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-650 px-2.5 py-0.5 rounded text-[10px] font-medium tracking-tight">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-zinc-500" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zm13.2 10.5v11.55L10.8 22.05v-9.6H24z" />
                  </svg>
                  Windows x64 <span className="text-zinc-400">•</span> 143 MB
                </div>
                <h3 className="text-zinc-900 text-lg font-semibold tracking-tight leading-tight">
                  Get Leara for Windows
                </h3>
                <p className="text-zinc-550 text-xs leading-relaxed">
                  Start coding instantly with our lightweight, local-first engine.
                </p>
              </div>

              {/* Main Premium Button */}
              <a
                href="/Leara%20Core%20Setup%200.0.0.exe"
                download="Leara Core Setup 0.0.0.exe"
                id="begin-download-trigger"
                onClick={startSimulation}
                className="w-full py-2.5 rounded-lg text-white bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer select-none shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download Windows Installer
              </a>
            </div>
          )}

          {/* STEP 2: Progress Download Tracker */}
          {downloadStep === "progress" && (
            <div className="space-y-4 py-1">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-semibold text-zinc-900 text-sm">Downloading Leara...</h4>
                  <p className="text-[11px] text-zinc-500">
                    Leara Core Setup 0.0.0.exe • 143 MB
                  </p>
                </div>
                <RefreshCw className="w-3.5 h-3.5 text-zinc-500 animate-spin" />
              </div>

              {/* Minimal Line Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zinc-900 transition-all duration-200" 
                    style={{ width: `${percent}%` }} 
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>{percent}%</span>
                  <span>{speed.toFixed(1)} MB/s</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Complete Download details */}
          {downloadStep === "complete" && (
            <div className="space-y-4">
              {/* Success Info */}
              <div className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <h4 className="font-semibold text-zinc-900 text-xs">Download complete</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    The installer is ready in your Downloads folder. Run the setup file to install.
                  </p>
                </div>
              </div>

              {/* Close CTA */}
              <button
                type="button"
                id="complete-dismiss-trigger"
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer transition select-none"
              >
                Close Installer
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
