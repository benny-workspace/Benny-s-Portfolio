/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import ContactDetails from "../sections/ContactDetails";
import { LazyFAQ, LazyBottomBento } from "../components/lazyComponents";

export default function ContactPage() {
  usePageMeta({
    title: "Contact Benny — AI Systems & Creative Work",
    description:
      "Get in touch with Benny for AI receptionist systems, web design, video, or coaching. Based in Coimbra, Portugal — working with US-focused clients via Instagram, WhatsApp, and email.",
    path: "/contact",
  });

  return (
    <>
      <ContactDetails />
      <Suspense fallback={null}>
        <LazyFAQ />
      </Suspense>
      <Suspense fallback={null}>
        <LazyBottomBento />
      </Suspense>
    </>
  );
}
