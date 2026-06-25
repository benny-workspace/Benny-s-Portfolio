/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import Hero from "../sections/Hero";
import PersonaNarrative from "../sections/PersonaNarrative";
import PracticeGrid from "../sections/PracticeGrid";
import Awards from "../sections/Awards";
import Pricing from "../sections/Pricing";
import FeaturedCaseStudy from "../sections/FeaturedCaseStudy";
import { LazyTestimonials, LazyFAQ, LazyBottomBento } from "../components/lazyComponents";

export default function HomePage() {
  usePageMeta({
    title: "Benny — AI Systems Builder & Creative Director | DigiDental",
    description:
      "Benny (ceobennyco) builds AI receptionist systems for US dental clinics with DigiDental, designs high-end React websites, and produces cinematic brand content. Creative director, AI systems builder, and calisthenics athlete.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <PersonaNarrative />
      <PracticeGrid />
      <Suspense fallback={null}>
        <LazyTestimonials />
      </Suspense>
      <Awards />
      <Pricing />
      <FeaturedCaseStudy />
      <Suspense fallback={null}>
        <LazyFAQ />
      </Suspense>
      <Suspense fallback={null}>
        <LazyBottomBento />
      </Suspense>
    </>
  );
}
