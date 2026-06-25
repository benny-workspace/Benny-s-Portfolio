/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext } from "react";
import { Project } from "../types";

/** Opens the shared project detail modal (provided by the App layout). */
export const ProjectModalContext = createContext<(project: Project) => void>(() => {});

export const useOpenProject = () => useContext(ProjectModalContext);
