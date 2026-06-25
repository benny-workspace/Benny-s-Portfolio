/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

const HomePage = lazy(() => import("./pages/HomePage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "work", element: <WorkPage /> },
      { path: "offers", element: <OffersPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
