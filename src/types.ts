/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavigationTab = "home" | "work" | "offers" | "contact";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  role: string;
  tags: string[];
  link?: string;
  isClosed?: boolean;
  videoUrl?: string; // Optional creative presentation video
  calloutBox?: {
    label: string;
    content: string;
  };
  frameworksDetail?: string;
}

export interface PracticeService {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
}

export interface Testimonial {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface ServiceOffer {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  timeline: string;
}
