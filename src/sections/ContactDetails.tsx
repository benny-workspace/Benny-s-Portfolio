/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollRevealParagraph from "../components/ScrollRevealParagraph";

const SUPA = "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/public/Images";
const PORTRAIT = new URL("../assets/images/benny_suit.jpg", import.meta.url).href;

export default function ContactDetails() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto" id="contact-section">
      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch mb-16 mt-6">
        {/* Left Column: Portrait Photo with Rounded Corners */}
        <div className="w-full relative group max-w-[95%] sm:max-w-[90%] md:max-w-[75%] mx-auto md:mx-0 flex flex-col justify-center">
          <div className="overflow-hidden rounded-[2rem] aspect-[16/10] bg-bone-100/30 shadow-md transition-all duration-500 hover:scale-[1.01] hover:shadow-lg">
            <img
              src={PORTRAIT}
              alt="Benny — portrait, available for new projects"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center select-none transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column: 4 Interactive Stacked Info Rows */}
        <div className="flex flex-col justify-center h-full space-y-0">
          {/* Top line to ground the list */}
          <div className="relative w-full h-[1px] bg-border-custom" />

          {/* Row 1 - Location */}
          <div className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 select-none">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                Office: Coimbra, Portugal.
              </span>
              <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0 select-none" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
              <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </div>
          </div>

          {/* Row 2 - Instagram */}
          <a
            href="https://www.instagram.com/ceobennyco"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                Follow me on Instagram
              </span>
              <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
              <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </div>
          </a>

          {/* Row 3 - Phone/WhatsApp */}
          <a
            href="https://wa.me/351912859130"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                WhatsApp - +351 912 859 130
              </span>
              <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
              <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </div>
          </a>

          {/* Row 4 - Email */}
          <a
            href="mailto:bennysworkspace@gmail.com"
            className="group relative py-5 flex flex-col w-full text-text-primary transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-text-secondary">
                bennysworkspace@gmail.com
              </span>
              <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
              <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </div>
          </a>
        </div>
      </div>

      <SectionHeader
        id="contact-now-heading"
        leftLabel="CONTACT コンタック"
        rightLabel="STAY IN TOUCH"
        title="CONTACT コンタック & STAY IN TOUCH"
      />

      {/* Extended Paragraph Space (Borders Removed) */}
      <div className="w-full relative px-6 py-20 sm:py-28 md:py-36 max-w-4xl mx-auto mb-10 overflow-visible group/bio">
        {/* Three Background Images Collage (Tactile Watermark Style, Exact Behind Text) */}

        {/* Image 1: Top-Left (Shoyu Ramen Image) */}
        <div className="absolute top-2 left-2 sm:top-8 sm:left-12 md:left-20 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[-6deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[-3deg] transition-all duration-500 cursor-zoom-in opacity-100">
          {/* Texture grain layer */}
          <div className="grain-effect rounded-2xl" />
          <img
            src={`${SUPA}/Shoyu%20Ramen.jpg`}
            alt="Warm bowl of authentic Shoyu Ramen reflecting raw design texture and culinary artistry"
            loading="lazy"
            fetchPriority="auto"
            decoding="async"
            className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Image 2: Bottom-Left (Japanese Dragon Stone Carving) */}
        <div className="absolute bottom-2 left-6 sm:bottom-8 sm:left-16 md:left-24 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[6deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[3deg] transition-all duration-500 cursor-zoom-in opacity-100">
          {/* Texture grain layer */}
          <div className="grain-effect rounded-2xl" />
          <img
            src={`${SUPA}/Japanese%20Dragon%20Stone%20Carving.jpg`}
            alt="Japanese Dragon Stone Carving reflecting raw design texture and dimension"
            loading="lazy"
            fetchPriority="auto"
            decoding="async"
            className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Image 3: Centered In-Between them vertically, right-centered (Japanese Neighborhood) */}
        <div className="absolute top-[35%] right-2 sm:top-[38%] sm:right-6 md:right-10 w-40 sm:w-60 md:w-72 h-auto rounded-2xl overflow-hidden shadow-2xl border border-border-custom bg-surface-custom rotate-[4deg] pointer-events-auto select-none z-0 hover:scale-105 hover:rotate-[1deg] transition-all duration-500 cursor-zoom-in opacity-100">
          {/* Texture grain layer */}
          <div className="grain-effect rounded-2xl" />
          <img
            src={`${SUPA}/Japanese%20Neighborhood%20_.jpg`}
            alt="Japanese Neighborhood scenery reflecting raw design texture and dimension"
            loading="lazy"
            fetchPriority="auto"
            decoding="async"
            className="w-full h-auto object-contain saturate-130 contrast-110 brightness-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* High Contrast Foreground Text Layer */}
        <div className="relative text-center select-text space-y-6 sm:space-y-8 max-w-2xl mx-auto">
          <ScrollRevealParagraph className="text-text-primary font-sans text-base sm:text-lg md:text-xl font-semibold leading-relaxed tracking-wide italic">
            "The people who know me think I'm stupid. <br className="hidden sm:inline" />
            The people who watch me know better."
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed tracking-wide">
            19 years old. Consistent Four Figures. Three languages. One mission: freedom, built from scratch, on my own terms.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-secondary/90 font-sans text-sm sm:text-base leading-relaxed">
            I'm not what you'd expect. Is what I'd like to say...
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            I speak three languages, run an AI company targeting the US market, post content every single day, and move at a speed that confuses the people closest to me and inspires those watching from the outside.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-semibold tracking-tight italic">
            That gap between those two groups... That's where I operate.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            Growing up, I felt like an alien in every room I walked into. Not the tragic kind. The kind who looks around, realizes the room wasn't built for them, and decides to build a better one. So that's what I'm doing, you're already inside a glimpse of it.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            Right now, that looks like <strong className="text-text-primary font-semibold">Digi Dental</strong>, an AI receptionist agency making sure dental clinics across the US never lose a patient to a missed call again. Real work. Technical, commercial, and completely mine.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-secondary/90 font-sans text-sm sm:text-base leading-relaxed">
            But Digi Dental is one piece of a much larger picture.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            I create content. I document the grind, unfiltered, no highlight reel. I'm learning languages on the side, doing my own sales, planning the next move, and quietly building toward something that doesn't have a clean label yet.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            Because here's what I've realized: I'm not interested in being known for one thing. That sounds too boring despite the reality of the fact that in order to start everyone has to be known for one thing Initially at the very least.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg font-semibold tracking-tight uppercase tracking-wider text-text-primary">
            I want to be a movement. Not a niche. Not a category. A perspective, one that keeps shifting not switching, keeps expanding, and stays completely, unapologetically mine.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            I'm not the perfectly disciplined entrepreneur you see on your feed. I miss days. Life hits. I don't pretend otherwise. What I am is the kind of person who recalibrates without drama, locks back in without an audience, and keeps going, because stopping was never actually an option. <span className="font-semibold italic">Speed is King.</span>
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            What's driving me isn't a vision board. It's something rawer than that. I'm tired of the effort going unrewarded. I want the freedom I've been building toward. And I will not stop until it's real.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            This brand is for people who know that feeling, who are inspired, who wanna work with, who want to follow, and those who want to take action along.
          </ScrollRevealParagraph>

          <ScrollRevealParagraph className="text-text-primary/95 font-sans text-sm sm:text-base leading-relaxed">
            If you're here and it lands, you already know why. <br />
            If it doesn't, no problem. This was never for everyone.
          </ScrollRevealParagraph>

          <div className="pt-4 space-y-2">
            <ScrollRevealParagraph className="font-sans text-base sm:text-lg font-bold tracking-widest uppercase">
              Follow the build. Watch what happens.
            </ScrollRevealParagraph>
            <ScrollRevealParagraph className="font-mono text-sm mt-1">
              @ceobennyco
            </ScrollRevealParagraph>
          </div>
        </div>
      </div>

      {/* Centered YouTube Link (Framer interactive style) */}
      <div className="max-w-xl mx-auto pt-4 pb-12">
        <a
          href="https://www.youtube.com/@bennyunmatched"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative py-6 flex items-center justify-between text-text-primary transition-colors duration-300 w-full cursor-pointer"
        >
          {/* Top divider line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
            <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
          </div>

          <span className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase group-hover:text-text-secondary transition-colors duration-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EA4335] inline-block animate-pulse shrink-0" />
            Link to YouTube Video
          </span>
          <ArrowUpRight className="w-4 h-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-text-primary shrink-0" />

          {/* Bottom divider line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-custom overflow-hidden">
            <div className="h-full bg-text-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
          </div>
        </a>
      </div>
    </section>
  );
}
