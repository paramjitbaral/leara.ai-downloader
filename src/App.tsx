/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClaimSovereignty from "./components/ClaimSovereignty";
import ComparisonTable from "./components/ComparisonTable";
import Footer from "./components/Footer";
import DownloadConsole from "./components/DownloadConsole";

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  // Smooth scroll handler for the online simulator anchor
  const handleScrollToSimulator = () => {
    // Show download modal which contains the gorgeous simulated client console terminal
    setDownloadOpen(true);
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased select-none selection:bg-slate-900 selection:text-white"
      id="leara-root-wrap"
    >
      {/* Top Glass Navigation Bar */}
      <Navbar onOpenDownload={() => setDownloadOpen(true)} />

      {/* Main Page Core Layout */}
      <main id="leara-main-body">
        {/* Section 1: Hero Visual Centerpiece & Layout Preset Picker */}
        <Hero 
          onOpenDownload={() => setDownloadOpen(true)} 
        />
        
        {/* Section 2: Value Proposition / System Comparison Matrix */}
        <ComparisonTable />

        {/* Section 3: Technical Native Binary Sovereignty Call-To-Action (Claim Your Sovereignty) */}
        <ClaimSovereignty 
          onOpenDownload={() => setDownloadOpen(true)}
        />
      </main>

      {/* Corporate System Footer */}
      <Footer onOpenDownload={() => setDownloadOpen(true)} />

      {/* Interactive Installer / Download Simulator Modal */}
      <DownloadConsole 
        isOpen={downloadOpen} 
        onClose={() => setDownloadOpen(false)} 
      />
    </div>
  );
}
