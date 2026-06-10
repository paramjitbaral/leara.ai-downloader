/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from "../data/landingData";
import { Star, MessageSquare } from "lucide-react";

export default function ShowcaseCarousel() {
  return (
    <section 
      id="testify" 
      className="py-24 bg-white border-b border-slate-100 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 font-mono text-xs font-bold mb-4">
            <MessageSquare className="w-3.5 h-3.5" /> Peer Endorsements
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            Endorsed by Top Industry Creators
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            See how staff engineers and digital architects arrange their workspace workflows using Prism&apos;s native desktop layer.
          </p>
        </div>

        {/* Testimonials Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((col) => (
            <div
              key={col.id}
              id={`testimonial-card-${col.id}`}
              className="bg-slate-50/50 hover:bg-white border border-slate-200/50 hover:border-slate-300 hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 text-left"
            >
              <div>
                {/* Visual Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(col.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Main Quote Content */}
                <p className="font-sans text-slate-600 text-sm font-semibold leading-relaxed mb-6 italic">
                  &ldquo;{col.comment}&rdquo;
                </p>
              </div>

              {/* Profile Meta info footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                {/* Initial Avatar Mockup */}
                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-sky-300 to-indigo-400 flex items-center justify-center font-sans font-bold text-xs text-white uppercase shadow-inner">
                  {col.name.charAt(0)}
                </div>
                <div>
                  <span className="font-sans font-extrabold text-slate-800 text-sm block">
                    {col.name}
                  </span>
                  <span className="font-mono text-[9.5px] text-slate-400 block mt-0.5 font-bold uppercase tracking-wide">
                    {col.role}, <span className="text-sky-600">{col.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
