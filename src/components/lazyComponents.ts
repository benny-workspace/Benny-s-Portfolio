/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy } from "react";

// Non-critical, below-the-fold sections — code-split out of the initial chunk.
export const LazyTestimonials = lazy(() => import("./Testimonials"));
export const LazyFAQ = lazy(() => import("./FAQ"));
export const LazyBottomBento = lazy(() => import("./BottomBento"));
