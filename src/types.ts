/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  category: "productivity" | "visuals" | "performance" | "control";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatarBlurHash?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SystemRequirement {
  parameter: string;
  minimum: string;
  recommended: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}
