/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureItem, Testimonial, FAQItem, SystemRequirement, ReleaseNote, PricingTier } from "../types";

export const FEATURES: FeatureItem[] = [
  {
    id: "snapping",
    title: "Magnetic Grid Snapping",
    description: "Align windows effortlessly on an intelligent grid. Windows pull magnetically toward neat margins so your desktop stays perfectly ordered.",
    badge: "Smart Grid",
    category: "productivity"
  },
  {
    id: "glassmorphism",
    title: "Active Acrylic Backplanes",
    description: "Enjoy state-of-the-art blurred background diffusion. Preserve high-contrast text legibility while eliminating visual desktop noise.",
    badge: "Acrylic Depth",
    category: "visuals"
  },
  {
    id: "command",
    title: "Intuitive Global Search",
    description: "Press Option/Ctrl + Space to summon a fast visual control bar. Group related windows, recall custom workspace layouts, and switch apps instantly.",
    badge: "Control Deck",
    category: "control"
  },
  {
    id: "performance",
    title: "Ultralight System Footprint",
    description: "Engenders near-zero CPU and battery overhead. Runs quietly unnoticed in the background, consuming less resources than a single web browser tab.",
    badge: "Battery-Saving",
    category: "performance"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Design Lead",
    company: "Linear Studio",
    comment: "Prism has completely elevated my workspace flow on Windows. It is extremely rare to find a software application executed with such pristine aesthetic control and fluid performance.",
    rating: 5
  },
  {
    id: "2",
    name: "Cody Christensen",
    role: "Product Creator",
    company: "Vercel",
    comment: "The visual shortcut interface is incredibly fast and intuitive. Being able to snap and group my core design screens in a single press saves hours of tedious window resizing every day.",
    rating: 5
  },
  {
    id: "3",
    name: "Hana Kobayashi",
    role: "Creative Director",
    company: "Aether Group",
    comment: "A beautiful exploration of what modern desktop interfaces should feel like. The translucent glass aesthetics and fluid snapping animations are impeccably tuned.",
    rating: 5
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "Architect",
    company: "Studio Shape",
    comment: "The app is built like a premium Swiss watch. It is lightweight, exceptionally elegant, and entirely changes how I view multi-window focus.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "q1",
    question: "How is Prism different from standard built-in snapping options?",
    answer: "Prism offers a custom fluid environment far beyond basic default layouts. It features gorgeous, adjustable frosted-acrylic transparency backdrops, smart padding margins that offset on focused apps, and quick shortcuts to instant-switch between personalized workspace configurations with a single tap.",
    category: "General"
  },
  {
    id: "q2",
    question: "Will using Prism drain my laptop battery or affect performance?",
    answer: "Not at all. Prism is designed with ultra-optimized native frameworks that hook directly into the system event cycle only when windows are active or resized. It does not run background polling loops, keeping memory consumption minimal (typically under 18MB) and CPU usage at virtually zero when static.",
    category: "Performance"
  },
  {
    id: "q3",
    question: "Does Prism support dual or ultra-wide multi-monitor setups?",
    answer: "Yes, Prism natively supports multi-device monitors, high-DPI configurations, and ultra-wide screens. Grids are translated into relative screen percentages, allowing you to drag windows seamlessly between screens of completely different aspect ratios while preserving custom snapped proportions.",
    category: "Compatibility"
  },
  {
    id: "q4",
    question: "Can I customize the grid layouts easily?",
    answer: "Absolutely. Through the clean settings dashboard or visual layout builder, you can adjust margin gaps, select from beautiful preset layouts, and save custom window templates for specific tasks like editing, coding, or browsing.",
    category: "Features"
  },
  {
    id: "q5",
    question: "Is there any complicated setup or script required?",
    answer: "No setup required. Prism works instantly out of the box with zero custom parameters. It features a fully graphical interface that is gentle for beginners, alongside convenient shortcuts for power users.",
    category: "Advanced"
  }
];

export const SYSTEM_REQUIREMENTS: SystemRequirement[] = [
  {
    parameter: "Operating System",
    minimum: "Windows 10 64-bit",
    recommended: "Windows 11 (64-bit / ARM64 compatible)"
  },
  {
    parameter: "Processor",
    minimum: "Dual-Core Intel / AMD",
    recommended: "Quad-Core Intel i5 / AMD Ryzen / ARM native"
  },
  {
    parameter: "Memory",
    minimum: "4 GB RAM",
    recommended: "8 GB RAM or higher"
  },
  {
    parameter: "Graphics Card",
    minimum: "Standard integrated Graphics",
    recommended: "DirectX 12 / Dedicated Graphics card"
  },
  {
    parameter: "Storage Space",
    minimum: "30 MB available space",
    recommended: "100 MB available for templates and themes"
  }
];

export const RELEASE_CHANNELS: ReleaseNote[] = [
  {
    version: "v2.4 stable",
    date: "June 2026",
    title: "The Workspace Focus Release",
    changes: [
      "Introduced brand-new fluid spring physics for smoother drag animations.",
      "Optimized active blur algorithms with improved background diffusion.",
      "Reduced CPU cycle footprint on idle processes to near zero.",
      "Added absolute native support for modern ARM64 laptop processors."
    ]
  },
  {
    version: "v2.3 stable",
    date: "March 2026",
    title: "Aesthetic Enhancements",
    changes: [
      "Launched visual shortcut overlays with simple, fast keyboard combinations.",
      "Refined grid border snapping to offer high-precision docking offsets.",
      "Enhanced high-DPI displays compatibility for crisp visual rendering."
    ]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Personal",
    price: "$0",
    period: "forever",
    description: "The complete spatial desktop tool perfect for single-monitor and hobbyist setups.",
    features: [
      "Fluid grid window snapping",
      "Standard Frosted Acrylic glass backplanes",
      "Fast global shortcut bar",
      "Custom margin gap triggers",
      "Up to 2 active monitor profiles"
    ],
    buttonText: "Instant Download",
    isPopular: false
  },
  {
    name: "Pro Professional",
    price: "$19",
    period: "one-time",
    description: "Advanced layout configurations, auto-adjusting multi-screen profiles, and premium presets.",
    features: [
      "Everything in Personal, plus:",
      "Premium hardware-accelerated Acrylic v2 blur",
      "Unlimited monitor profile configurations",
      "Custom layout templates & workspace saving",
      "Smart margin auto-resizing based on focus",
      "Lifetime application upgrades and future themes"
    ],
    buttonText: "Upgrade to Professional",
    isPopular: true
  },
  {
    name: "Team Collective",
    price: "$8",
    period: "member / month",
    description: "Enterprise workspace layouts sharing, custom global presets, and priority engineering support.",
    features: [
      "Everything in Professional, plus:",
      "Cloud-synced active company layouts",
      "Centralized deployment installer tools",
      "Secure custom group workspace policies",
      "Priority feature roadmap requests",
      "Dedicated integration support SLAs"
    ],
    buttonText: "Get Enterprise",
    isPopular: false
  }
];
