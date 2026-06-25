/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Post-build prerender: boots a Vite preview server, visits each route in a
 * headless browser, and writes the fully-rendered HTML (with route-specific
 * <title>/meta) to dist/<route>/index.html so non-JS crawlers get real content.
 *
 * Decoupled from `npm run build` on purpose — it needs a Chromium binary.
 * Run with:  npm run build:prerender
 * Override the browser path with PRERENDER_CHROMIUM=/path/to/chrome if needed.
 */
import { preview } from "vite";
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const ROUTES = ["/", "/work", "/offers", "/contact"];
const PORT = 5055;

function findChromium() {
  if (process.env.PRERENDER_CHROMIUM) return process.env.PRERENDER_CHROMIUM;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    const dir = readdirSync(root).find((d) => d.startsWith("chromium-") && !d.includes("headless"));
    if (dir) {
      const exe = `${root}/${dir}/chrome-linux/chrome`;
      if (existsSync(exe)) return exe;
    }
  } catch { /* fall through */ }
  return undefined; // let playwright resolve from its registry
}

const server = await preview({ preview: { port: PORT, strictPort: true } });
const base = `http://localhost:${PORT}`;

const exe = findChromium();
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage();

for (const route of ROUTES) {
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 15000 });
  // Let route meta + entrance animations settle before snapshotting.
  await page.waitForTimeout(1200);
  const html = await page.content();
  const outFile = route === "/" ? "dist/index.html" : `dist${route}/index.html`;
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`prerendered ${route.padEnd(9)} -> ${outFile} (${Math.round(html.length / 1024)} KB)`);
}

await browser.close();
await new Promise((res) => server.httpServer.close(res));
console.log("✓ prerender complete");
process.exit(0);
