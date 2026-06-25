/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import WorkList from "../sections/WorkList";
import { LazyFAQ, LazyBottomBento } from "../components/lazyComponents";

export default function WorkPage() {
  usePageMeta({
    title: "Work — DigiDental, Web & Content Projects | Benny",
    description:
      "Selected projects by Benny: the DigiDental AI receptionist system, Coimbra web & video client work, a 0→2,000 organic social growth experiment, dual personal-brand systems, and a DTC e-commerce build.",
    path: "/work",
  });

  return (
    <>
      <WorkList />
      <Suspense fallback={null}>
        <LazyFAQ />
      </Suspense>
      <Suspense fallback={null}>
        <LazyBottomBento />
      </Suspense>
    </>
  );
}
