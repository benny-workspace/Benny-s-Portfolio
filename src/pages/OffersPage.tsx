/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import OffersGrid from "../sections/OffersGrid";
import { LazyFAQ, LazyBottomBento } from "../components/lazyComponents";

export default function OffersPage() {
  usePageMeta({
    title: "Offers — AI Receptionist, Web Design & Coaching | Benny",
    description:
      "Transparent packages from Benny: a 24/7 AI call receptionist, pixel-perfect web design & development, bodyweight calisthenics coaching, and online business accelerator mentorship.",
    path: "/offers",
  });

  return (
    <>
      <OffersGrid />
      <Suspense fallback={null}>
        <LazyFAQ />
      </Suspense>
      <Suspense fallback={null}>
        <LazyBottomBento />
      </Suspense>
    </>
  );
}
