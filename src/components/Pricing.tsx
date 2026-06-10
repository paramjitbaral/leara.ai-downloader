/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRICING_TIERS } from "../data/landingData";
import { Check, ShieldCheck, Zap, Layers } from "lucide-react";

interface PricingProps {
  onOpenDownload: () => void;
}

export default function Pricing({ onOpenDownload }: PricingProps) {
  return (
    <section 
      id="pricing" 
      className="py-24 bg-slate-50/50 border-b border-slate-100 px-6 relative"
    >
      <div className="absolute inset-0 z-0 opacity-[0.2] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" /> Pricing Options
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            A License Matching Your Layout Needs
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Free forever for personal workspaces, one-time payment for premium custom overlays, or SaaS alignment for large team engineering grids.
          </p>
        </div>

        {/* Pricing Tiers Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              id={`pricing-card-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "bg-white border-2 border-sky-500 shadow-xl lg:scale-[1.03]"
                  : "bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Recommended Badge highlight */}
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-sans font-bold text-[10.5px] uppercase tracking-wider text-white bg-sky-500 px-4 py-1.5 rounded-full shadow-sm">
                  Recommended For Power Users
                </span>
              )}

              {/* Tier Meta info header */}
              <div className="text-left mb-8">
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">{tier.name} Edition</span>
                
                <div className="flex items-baseline gap-1.5 my-3">
                  <span className="font-sans font-extrabold text-slate-800 text-4xl sm:text-5xl">{tier.price}</span>
                  <span className="font-sans text-slate-400 text-sm font-semibold">{tier.period !== "forever" && tier.period !== "one-time" ? ` / ${tier.period}` : ` ${tier.period}`}</span>
                </div>

                <p className="font-sans text-slate-500 text-xs sm:text-sm font-medium leading-relaxed min-h-[48px] mt-2">
                  {tier.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="divide-y divide-slate-100 mb-8 grow text-left">
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 py-3 items-start text-slate-600 font-sans text-sm font-semibold">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.isPopular ? "text-sky-500" : "text-slate-400"}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Button CTA */}
              <button
                type="button"
                id={`pricing-cta-${tier.name.toLowerCase()}`}
                onClick={onOpenDownload}
                className={`w-full py-4 rounded-2xl font-sans font-bold text-sm transition-all cursor-pointer ${
                  tier.isPopular
                    ? "bg-linear-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/10 border border-sky-400/20 hover:scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Security / System compliance note */}
        <div className="mt-16 flex items-center justify-center gap-2.5 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All credentials transaction processed via corporate standard secure Stripe TLS layer</span>
        </div>

      </div>
    </section>
  );
}
