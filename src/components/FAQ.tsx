/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FAQS } from "../data/landingData";
import { HelpCircle, ChevronDown, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string>("q1");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const categories = ["All", "General", "Performance", "Compatibility", "Features"];

  const filteredFaqs = activeCategory === "All" 
    ? FAQS 
    : FAQS.filter(faq => faq.category === activeCategory);

  return (
    <section 
      id="faq" 
      className="py-24 bg-slate-50/50 border-b border-slate-100 px-6 relative"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Core Inquiries
          </div>
          <h2 className="font-sans font-extrabold tracking-tight text-slate-800 text-3xl sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
            Everything you need to know about setting up snap configurations, memory bounds, and multi-monitor profiles.
          </p>
        </div>

        {/* Category Filters bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`faq-cat-filter-${cat.toLowerCase()}`}
              onClick={() => {
                setActiveCategory(cat);
                // Open first item of new category to avoid empty states
                const match = FAQS.find(f => cat === "All" || f.category === cat);
                if (match) setOpenId(match.id);
              }}
              className={`px-4 py-2 font-sans font-bold text-xs rounded-xl border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion matrix */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-accordion-item-${faq.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all text-left"
              >
                {/* Trigger Question bar */}
                <button
                  type="button"
                  id={`faq-accordion-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 justify-between font-sans text-left cursor-pointer"
                >
                  <h4 className="font-sans font-bold text-slate-800 text-[15px] sm:text-base leading-snug">
                    {faq.question}
                  </h4>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expanding Answer sheet */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100 overflow-hidden"
                    >
                      <div className="p-5 bg-slate-50/50">
                        <p className="font-sans text-slate-600 text-[13.5px] sm:text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still got questions footer anchor */}
        <div className="mt-16 text-center text-slate-500 text-sm font-sans flex items-center justify-center gap-2 font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Have specific deployment questions? Reach our core team at <a href="mailto:paramjitbaral44@gmail.com" className="text-sky-600 font-bold hover:underline">paramjitbaral44@gmail.com</a></span>
        </div>

      </div>
    </section>
  );
}
