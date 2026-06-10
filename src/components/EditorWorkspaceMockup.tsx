/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  FileText, Search, GitBranch, Play, Sliders, Settings, ShieldCheck, 
  ChevronDown, ChevronRight, Bot, History, Plus, Send, GraduationCap, Moon, Sun,
  FolderOpen, Folder
} from "lucide-react";

// Flat interactive files mock dictionary representing a simplified workspace
const FILES_DATA: Record<string, { lang: string; count: number; content: string }> = {
  "prisma.ts": {
    lang: "typescript",
    count: 5,
    content: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;`
  },
  "App.tsx": {
    lang: "typescript",
    count: 7,
    content: `import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl">Welcome to Leara.ai</h1>
    </div>
  );
}`
  },
  "index.css": {
    lang: "css",
    count: 5,
    content: `@import "tailwindcss";

body {
  font-family: 'Inter', sans-serif;
}`
  }
};

// Rich real-time keyword highlighter for VS Code Light Theme approximation
const renderHighlightedLine = (text: string, lang: string) => {
  if (!text.trim()) return <span>&nbsp;</span>;
  if (lang === "text") return <span className="text-slate-600">{text}</span>;

  if (text.trim().startsWith("//") || text.trim().startsWith("#") || text.trim().startsWith("/*") || text.trim().startsWith("*")) {
    return <span className="text-[#10b981] font-normal italic">{text}</span>;
  }

  const keywords = [
    "import", "from", "const", "new", "export", "default", "as",
    "interface", "def", "class", "function", "pub", "use", "try", "except",
    "let", "return", "await", "async", "std", "collections", "HashMap", "if", "for", "in"
  ];

  // Regex splitter to isolate strings and words gracefully
  const wordsWithBoundaries = text.split(/(\b|_|'|"|`)/g);

  return (
    <span>
      {wordsWithBoundaries.map((part, idx) => {
        if (keywords.includes(part)) {
          return <span key={idx} className="text-[#059669] font-bold">{part}</span>;
        }
        if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
          return <span key={idx} className="text-[#a11] font-medium">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={idx} className="text-[#059669]">{part}</span>;
        }
        if (/^[A-Z][A-Za-z0-9]*$/.test(part)) {
          return <span key={idx} className="text-[#008080] font-semibold">{part}</span>;
        }
        return <span key={idx} className="text-slate-900">{part}</span>;
      })}
    </span>
  );
};

interface EditorWorkspaceMockupProps {
  onOpenDownload?: () => void;
}

export default function EditorWorkspaceMockup({ onOpenDownload }: EditorWorkspaceMockupProps) {
  // Mockup Interactive States
  const [openTabs, setOpenTabs] = useState<string[]>(["prisma.ts"]);
  const [activeTabFilename, setActiveTabFilename] = useState<string>("prisma.ts");
  const [isFolderExpanded, setIsFolderExpanded] = useState<Record<string, boolean>>({
    workspace: true,
    components: true,
    pages: false,
    server: false,
    services: false,
    store: false,
  });

  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [learnMode, setLearnMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Focus Lock and 4-Digit PIN states specifically for Learning Mode
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState("1234");
  const [inputPin, setInputPin] = useState("");
  const [lockShake, setLockShake] = useState(false);
  const [lockMessage, setLockMessage] = useState("Keep your focus locked");

  // Dynamic file updates helper since we cannot mutate original dictionary
  const [localFiles, setLocalFiles] = useState<Record<string, { lang: string; count: number; content: string }>>(FILES_DATA);

  // PIN validation handler
  const verifyPin = (currentPin: string) => {
    if (currentPin.length === 4) {
      if (currentPin === pinCode) {
        // Access granted trigger
        setTimeout(() => {
          setIsLocked(false);
          setInputPin("");
        }, 250);
      } else {
        // Shaking penalty warning
        setLockShake(true);
        setTimeout(() => {
          setLockShake(false);
          setInputPin("");
        }, 500);
      }
    }
  };

  return (
    <div className="w-full relative z-20 pointer-events-auto">
      <div className="w-full bg-white rounded-xl border border-slate-200/95 shadow-[0_20px_48px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col text-left font-sans select-none border-solid">
        
        {/* TOP MENU BAR & WINDOW HEADER */}
        <div className="flex items-center justify-between bg-white border-b border-slate-200/70 px-4 py-2 z-30">
          
          {/* Left side: Logo & Navigation Menu items */}
          <div className="flex items-center gap-4">
            {/* Elegant custom exact logo */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center relative">
                <img src="/logo.png" alt="Leara.ai Logo" className="w-[16px] h-[16px] shrink-0 object-contain" />
              </div>
              <span className="font-black text-xs tracking-tighter leading-tight">
                <span className="text-sky-500">Leara</span><span className="text-emerald-500">.ai</span>
              </span>
            </div>

            {/* Window Menu Links */}
            <div className="hidden lg:flex items-center gap-3 text-[11px] font-medium text-slate-500 pl-1">
              {["File", "Edit", "View", "Go", "Help"].map((menu) => (
                <span key={menu} className="hover:text-slate-900 cursor-pointer px-1 py-0.5 rounded transition">
                  {menu}
                </span>
              ))}
            </div>

            {/* Learn Mode custom Capsule - exact replica with focus lock enforcement */}
            <button 
              onClick={() => {
                if (learnMode) {
                  if (isLocked) {
                    // Prevent exiting while locked — must enter PIN first!
                    setLockShake(true);
                    const prevMsg = lockMessage;
                    setLockMessage("Keep your focus locked — Unlock with PIN first!");
                    setTimeout(() => setLockShake(false), 500);
                    setTimeout(() => setLockMessage(prevMsg), 2500);
                  } else {
                    // Clean disable since it is currently unlocked
                    setLearnMode(false);
                    setIsLocked(false);
                    setInputPin("");
                  }
                } else {
                  // Activate Learning mode and lock focus
                  setLearnMode(true);
                  setIsLocked(true);
                  setInputPin("");
                }
              }}
              className={`ml-1 px-2.5 py-1.5 sm:py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                learnMode 
                  ? isLocked 
                    ? "bg-red-650 text-white shadow-2xs border-transparent animate-pulse bg-red-600"
                    : "bg-[#10b981] text-white shadow-2xs border-transparent" 
                  : "bg-slate-50 border border-slate-200/90 text-slate-700 hover:bg-slate-100 border-solid"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-current shrink-0" />
              <span>{learnMode ? isLocked ? "LOCKED FOCUS" : "LEARN ACTIVE" : "LEARN MODE"}</span>
            </button>
          </div>

          {/* Right side: Dark Mode, Profile block & Window System badges */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode representation button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 rounded-md text-slate-450 hover:bg-slate-100 transition"
              title="Toggle Theme Simulation"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <span className="text-slate-200">|</span>

            {/* User Profile header block - exact replica */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col text-right select-none">
                <span className="font-extrabold text-[10px] leading-tight text-slate-800">PARAMJIT BARAL</span>
                <span className="text-[8px] text-slate-400 font-medium font-sans">paramjitbaral44@gmail.com</span>
              </div>
              {/* PB Avatar circle */}
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-3xs">
                PB
              </div>
            </div>

            {/* Standard minimization max close controllers */}
            <div className="hidden sm:flex items-center gap-1.5 pl-1 text-slate-400 text-[10px]">
              <span className="cursor-pointer hover:text-slate-700 font-bold">—</span>
              <span className="cursor-pointer hover:text-slate-700">▢</span>
              <span className="cursor-pointer hover:text-rose-600 font-semibold pl-1">✕</span>
            </div>
          </div>
        </div>

        {/* PRIMARY LAYOUT CONTAINER: Left activity bar and Right workspace */}
        <div className="flex h-[330px] sm:h-[390px] bg-white divide-x divide-slate-200/60 relative">
          
          {/* COLUMN 1: Vertical activity icons strip (goes all the way to the bottom corner) */}
          <div className="w-11 bg-white flex flex-col items-center justify-between py-3 shrink-0 h-full">
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Files icon active */}
              <div className="w-full flex justify-center border-l-2 border-[#10b981] text-[#10b981] py-0.5 cursor-pointer">
                <FileText className="w-4 h-4" />
              </div>
              {/* Other icons of activity sidebar */}
              <div className="text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <GitBranch className="w-4 h-4" />
              </div>
              <div className="text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <Play className="w-4 h-4" />
              </div>
              <div className="text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <Sliders className="w-3.5 h-3.5" />
              </div>
            </div>
            
            {/* Settings Gear beautifully aligned at the bottom */}
            <div className="text-slate-400 hover:text-slate-700 cursor-pointer select-none">
              <Settings className="w-4 h-4" />
            </div>
          </div>

          {/* THE RIGHT WORKSPACE AND STATUS BAR INNER WRAPPER */}
          <div className="flex-1 flex flex-col overflow-hidden h-full divide-y divide-slate-200/70 relative divide-solid">
            
            {/* Focus Lock Settings Ribbon */}
            {learnMode && !isLocked && (
              <div className="bg-[#10b981]/10 px-3 py-1.5 flex items-center justify-between text-[11px] font-sans border-b border-emerald-100/45 shrink-0 text-emerald-800 border-solid">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span>Focus Shield Active. Your lock PIN is: <span className="bg-[#10b981]/10 px-1 py-0.5 rounded text-emerald-900 font-mono font-bold">{pinCode}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setIsLocked(true);
                      setInputPin("");
                    }}
                    className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[9px] uppercase tracking-wider transition cursor-pointer"
                  >
                    🔐 Lock Control Panel
                  </button>
                  <button 
                    onClick={() => {
                      const newPin = prompt("Set a new 4-digit PIN:", pinCode);
                      if (newPin) {
                        if (/^\d{4}$/.test(newPin)) {
                          setPinCode(newPin);
                        } else {
                          alert("Invalid PIN. Please enter exactly 4 numeric characters.");
                        }
                      }
                    }}
                    className="px-2 py-0.5 rounded bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-[9px] uppercase tracking-wider transition cursor-pointer border border-slate-200 border-solid"
                  >
                    ⚙️ Set Custom PIN
                  </button>
                </div>
              </div>
            )}

            {/* FOCUS LOCK OVERLAY */}
            {learnMode && isLocked && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-[35] flex flex-col items-center justify-center p-3 animate-fade-in">
                
                {/* Styled off-white Card Container matching layout */}
                <div className={`bg-slate-50 rounded-[20px] border border-slate-100 shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-3.5 w-full max-w-[195px] flex flex-col items-center select-none text-center border-solid ${lockShake ? "animate-bounce" : "transition-transform duration-300"}`}>
                  
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
                      className="h-7 w-7 text-slate-400 hover:text-red-500 font-sans hover:bg-slate-100 rounded-full transition-all flex items-center justify-center cursor-pointer text-[9px] font-bold"
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
                      className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-650 active:scale-95 transition-all cursor-pointer"
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
            
            {/* COLS 2, 3, 4 Row Block */}
            <div className="flex-1 flex divide-x divide-slate-100 overflow-hidden min-h-0 divide-solid">

              {/* COLUMN 2: Workspace explorer tree sidebar */}
              <div className="hidden md:flex w-44 bg-[#f8fafc] flex-col p-2 select-none text-[10px] text-slate-500 shrink-0 overflow-y-auto">
                <div className="flex items-center justify-between mb-2 text-slate-400 font-bold uppercase tracking-wide text-[8px]">
                  <span>Explorer</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="hover:text-slate-700 cursor-pointer" title="New File" onClick={() => {
                      const name = prompt("Enter file name:");
                      if (name) {
                        if (!localFiles[name]) {
                          setLocalFiles(prev => ({
                            ...prev,
                            [name]: { lang: "typescript", count: 3, content: `// ${name}\nexport default function test() {}` }
                          }));
                        }
                        if (!openTabs.includes(name)) {
                          setOpenTabs([...openTabs, name]);
                        }
                        setActiveTabFilename(name);
                      }
                    }}>+</span>
                    <span className="ml-1 hover:text-slate-700 cursor-pointer text-[10px] leading-none" title="Collapse All">⛶</span>
                  </div>
                </div>

                {/* Simplified clean folder root WORKSPACE - exact replica driven by localFiles */}
                <div className="space-y-1">
                  <div 
                    onClick={() => setIsFolderExpanded(p => ({ ...p, workspace: !p.workspace }))}
                    className="flex items-center gap-1.5 font-bold text-slate-750 cursor-pointer hover:bg-slate-200/40 p-1 rounded transition text-[10px]"
                  >
                    {isFolderExpanded.workspace ? (
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    )}
                    {isFolderExpanded.workspace ? (
                      <FolderOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className="tracking-tight uppercase">WORKSPACE</span>
                  </div>

                  {isFolderExpanded.workspace && (
                    <div className="pl-3 border-l border-slate-200/50 ml-1.5 space-y-0.5 border-solid">
                      {Object.keys(localFiles).map((filename) => (
                        <div 
                          key={filename}
                          onClick={() => {
                            if (!openTabs.includes(filename)) {
                              setOpenTabs([...openTabs, filename]);
                            }
                            setActiveTabFilename(filename);
                          }}
                          className={`flex items-center gap-1.5 cursor-pointer px-1.5 py-0.5 rounded transition ${
                            activeTabFilename === filename 
                              ? "bg-emerald-50/70 text-[#059669] font-bold" 
                              : "hover:bg-slate-100 text-slate-600"
                          }`}
                        >
                          <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{filename}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMN 3: Central editor workspace content with tab bars and nested terminal */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                
                {/* Editor tab items row */}
                <div className="flex items-center bg-slate-50/50 border-b border-slate-200/60 overflow-x-auto select-none pt-0.5 shrink-0 border-solid">
                  {openTabs.map((tabname) => (
                    <div 
                      key={tabname}
                      onClick={() => setActiveTabFilename(tabname)}
                      className={`group relative flex items-center gap-1.5 pl-2.5 pr-1.5 py-0.5 text-[10px] font-medium border-r border-slate-200/60 cursor-pointer transition-all border-solid ${
                        activeTabFilename === tabname 
                          ? "bg-white text-slate-950 font-bold border-t-2 border-t-[#10b981]" 
                          : "text-slate-450 hover:bg-slate-100/50"
                      }`}
                    >
                      <FileText className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span>{tabname}</span>
                      {/* Close button for tab */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const index = openTabs.indexOf(tabname);
                          const updated = openTabs.filter(t => t !== tabname);
                          setOpenTabs(updated.length ? updated : ["prisma.ts"]);
                          if (activeTabFilename === tabname) {
                            setActiveTabFilename(updated[index - 1] || updated[0] || "prisma.ts");
                          }
                        }}
                        className="w-3 h-3 rounded-full hover:bg-slate-100 flex items-center justify-center text-[7px] text-slate-400 hover:text-slate-800 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Actual Code Pre blocks */}
                <div className="flex-1 p-3 overflow-y-auto font-mono text-[9px] sm:text-[9.5px] leading-normal relative bg-white">
                  <div className="space-y-0.5">
                    {((localFiles[activeTabFilename] ? localFiles[activeTabFilename].content : "/* No content */").split("\n")).map((line, idx) => (
                      <div key={idx} className="flex hover:bg-slate-50/75 transition-all py-px">
                        <span className="w-4 text-slate-450 select-none text-right pr-1 text-[8.5px] font-semibold border-r border-slate-100 mr-1.5 border-solid">{idx + 1}</span>
                        <div className="pl-0.5 whitespace-pre">
                          {renderHighlightedLine(line, localFiles[activeTabFilename]?.lang || "typescript")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM INTEGRATED TERMINAL - EXACT REPLICA */}
                <div className="bg-white border-t border-slate-200/50 flex flex-col shrink-0 min-h-[95px] select-none text-left border-solid">
                  {/* Terminal Menu Header Tabs */}
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-1 border-solid">
                    <div className="flex items-center gap-3.5 text-[9.5px] font-extrabold text-slate-500 uppercase tracking-widest">
                      <span className="text-slate-800 border-b border-slate-800 pb-0.5 cursor-pointer border-solid">Terminal</span>
                      <span className="hover:text-slate-700 cursor-pointer">Problems</span>
                      <span className="hover:text-slate-700 cursor-pointer flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Bash
                      </span>
                      <span>+</span>
                    </div>
                    <span className="text-slate-400 text-[9px] cursor-pointer hover:text-slate-700 font-bold">✕</span>
                  </div>

                  {/* Console Print Out block */}
                  <div className="flex-1 p-2 bg-[#f8fafc] font-mono text-[10px] leading-relaxed text-slate-650 overflow-y-auto overflow-x-hidden min-h-[60px]">
                    <p className="text-emerald-600 font-medium pb-0.5 font-mono">Connected to local virtual environment thread.</p>
                    <p className="text-slate-500 font-mono">Leara.ai is fully operational.</p>
                  </div>
                </div>

              </div>

              {/* COLUMN 4: Right Copilot chat helper ("LEARA CORE") */}
              <div className="hidden lg:flex w-64 bg-white flex-col justify-between p-3 font-sans shrink-0 overflow-y-hidden border-solid">
                
                {/* Chat Panel Header toolbar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 select-none shrink-0 border-solid">
                  <span className="text-[9.5px] font-black tracking-wide text-slate-800 uppercase flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-slate-500" />
                    Leara Core
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <span className="hover:text-slate-700 cursor-pointer" title="Reset Session" onClick={() => setChatMessages([])}><History className="w-3 h-3" /></span>
                    <span className="hover:text-slate-700 cursor-pointer" title="New Topic"><Plus className="w-3 h-3" /></span>
                  </div>
                </div>

                {/* Chat dialog viewport */}
                <div className="flex-1 overflow-y-auto py-2 space-y-2.5 text-xs text-left">
                  {chatMessages.length === 0 ? (
                    /* Nice, minimal empty bot message - exact replica */
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-4 select-none">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shadow-3xs text-slate-405 border-solid">
                        <Bot className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider">Ask Leara Core Anything</h4>
                      <p className="text-slate-450 font-semibold uppercase text-[8px] max-w-[170px] leading-relaxed">
                        ASK ME TO EXPLAIN, FIX, OR GENERATE CODE.
                      </p>
                    </div>
                  ) : (
                    /* Populate custom user/assistant dialog blocks dynamically */
                    chatMessages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-0.5`}>
                        <span className="text-[7.5px] uppercase tracking-widest font-black text-slate-400 font-sans">
                          {msg.sender === "user" ? "You" : "Leara Copilot"}
                        </span>
                        <div className={`p-2 rounded-xl max-w-full text-[10.5px] leading-snug font-medium shadow-3xs ${
                          msg.sender === "user"
                            ? "bg-[#10b981] text-white rounded-br-none font-sans"
                            : "bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-none font-sans border-solid"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="flex items-center gap-1 pl-1 text-[9px] text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce delay-100" />
                      <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce delay-200" />
                    </div>
                  )}
                </div>

                {/* Prompt Text input container with tags - exact layout */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatInput.trim()) return;
                    const input = chatInput;
                    setChatInput("");
                    setChatMessages(prev => [...prev, { sender: "user", text: input }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      const response = `I've analyzed your active workspace filename "${activeTabFilename}". Let me know if you would like me to generate a new integration module or explain configurations!`;
                      setChatMessages(prev => [...prev, { sender: "bot", text: response }]);
                    }, 900);
                  }} 
                  className="border-t border-slate-100 pt-2 flex flex-col gap-1.5 shrink-0 select-none text-left border-solid"
                >
                  
                  {/* Prompt Text box widget */}
                  <div className="relative w-full rounded-lg border border-slate-200 bg-white shadow-3xs group focus-within:border-[#10b981] transition-all p-0.5 border-solid">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full text-[10.5px] text-slate-700 placeholder-slate-400 bg-transparent outline-none border-none py-1.5 pl-2 pr-7 font-medium"
                    />
                    
                    {/* Send button absolute right inside input */}
                    <button 
                      type="submit"
                      className="absolute right-1 top-1 p-1 rounded-lg text-slate-400 hover:text-[#10b981] hover:bg-slate-50 transition cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Capsule Tags underneath the prompt text area */}
                  <div className="flex items-center gap-1.5 select-none pt-0.5">
                    <button 
                      type="button"
                      onClick={() => {
                        setChatInput("Explain this layout coordinate system");
                      }}
                      className="flex-1 px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-650 hover:bg-emerald-50/50 hover:text-[#059669] transition cursor-pointer text-[8px] font-bold uppercase text-center border-solid"
                    >
                      ⚡ EXPLAIN
                    </button>
                  </div>

                </form>
              </div>

            </div> {/* Close COLS 2, 3, 4 Row Block */}

          </div> {/* Close THE RIGHT WORKSPACE INNER WRAPPER */}

        </div> {/* Close PRIMARY LAYOUT CONTAINER */}

        {/* INTEGRATED GENTLE STATUS BAR BAR (FOOTER GUTTER) - SPANS FULL WIDTH AT THE ABSOLUTE BOTTOM */}
        <div className="bg-[#f8fafc] px-4 py-2 flex items-center justify-between text-slate-450 font-sans text-[10px] uppercase tracking-wide select-none h-9 shrink-0 border-t border-slate-200/60 border-solid">
          <div className="flex items-center gap-4 font-bold">
            <span className="flex items-center gap-1 text-emerald-600 font-extrabold font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              READY
            </span>
            <span className="font-sans">MAIN</span>
            <span className="hidden sm:inline font-sans">UTF-8</span>
          </div>
          <span className="text-emerald-500 font-black tracking-widest flex items-center gap-1 text-[9px] font-sans">
            <span>⚡ AI POWERED</span>
          </span>
        </div>

      </div> {/* Close Editor Workspace Mockup Card */}
    </div>
  );
}
