import { jsx as N } from "react/jsx-runtime";
import { useRef as D, useState as h, useMemo as M, useCallback as I, useEffect as c } from "react";
import L from "./sources/brand-orbs-v2.html.js";
const $ = [
  "claude",
  "openai",
  "codex",
  "cursor",
  "gemini",
  "figma",
  "framer",
  "react",
  "swift",
  "designcode",
  "aura",
  "dreamcut",
  "ui",
  "ux",
  "css",
  "ios",
  "neuform",
  "github",
  "x",
  "instagram",
  "threads",
  "linkedin",
  "email"
], C = ["small", "medium"], a = {
  variant: "claude",
  size: "medium",
  mode: "dark",
  speed: 1,
  paused: !1
}, V = {
  small: 20,
  medium: 56
}, E = {
  claude: "Claude Code",
  openai: "OpenAI",
  codex: "Codex",
  cursor: "Cursor",
  gemini: "Gemini",
  figma: "Figma",
  framer: "Framer",
  react: "React",
  swift: "Swift",
  designcode: "DesignCode",
  aura: "Aura",
  dreamcut: "DreamCut",
  ui: "UI",
  ux: "UX",
  css: "CSS",
  ios: "iOS",
  neuform: "Neuform",
  github: "GitHub",
  x: "X",
  instagram: "Instagram",
  threads: "Threads",
  linkedin: "LinkedIn",
  email: "Email"
};
function F(e, n, t) {
  return Math.min(t, Math.max(n, e));
}
function S() {
  if (typeof document > "u" || typeof window > "u") return "dark";
  const e = document.documentElement.dataset.theme ?? document.documentElement.dataset.scheme;
  return e === "light" || e === "dark" ? e : document.documentElement.classList.contains("light") ? "light" : document.documentElement.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function U(e) {
  const [n, t] = h(S);
  return c(() => {
    if (!e || typeof document > "u" || typeof window > "u") return;
    const o = window.matchMedia("(prefers-color-scheme: dark)"), i = () => t(S()), r = new MutationObserver(i);
    return r.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-scheme", "data-theme"]
    }), o.addEventListener("change", i), i(), () => {
      r.disconnect(), o.removeEventListener("change", i);
    };
  }, [e]), n;
}
function z(e) {
  return [...e.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].at(-1)?.[1] ?? "";
}
const P = z(L).replace(/<\/script/gi, "<\\/script");
function T(e, n, t) {
  const o = t === "light" ? "#dad7cc" : "#050608", i = t === "light" ? "invert(1) hue-rotate(180deg) contrast(1.04) saturate(.92)" : "none", r = V[n], u = JSON.stringify(e).replace(/</g, "\\u003c"), l = `<script data-brand-orbs-controls>
(function () {
  var nativeNow = performance.now.bind(performance);
  var last = nativeNow();
  var virtual = last;
  var controls = { speed: 1, paused: false };
  window.__BRAND_ORB_PAUSED = false;
  performance.now = function () {
    var real = nativeNow();
    if (!controls.paused) virtual += (real - last) * controls.speed;
    last = real;
    return virtual;
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'brand-orbs-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) controls.speed = Math.max(.1, Math.min(3, next.speed));
    controls.paused = Boolean(next.paused);
    window.__BRAND_ORB_PAUSED = controls.paused;
  });
})();
<\/script>`, s = P.replace(
    'if (document.visibilityState !== "hidden")',
    'if (document.visibilityState !== "hidden" && !window.__BRAND_ORB_PAUSED)'
  );
  return `<!doctype html>
<html lang="en" data-theme="${t}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${E[e]} Brand Orb</title>
<style>
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: ${o}; }
body { display: grid; place-items: center; }
canvas { display: block; width: ${r}px; height: ${r}px; filter: ${i}; }
</style>
${l}
</head>
<body>
<canvas data-mode=${u} data-size="${r}" aria-hidden="true"></canvas>
<script>${s}<\/script>
</body>
</html>`;
}
function J({
  variant: e = a.variant,
  size: n = a.size,
  mode: t = a.mode,
  speed: o = a.speed,
  paused: i = a.paused,
  "aria-label": r,
  className: u,
  style: l
}) {
  const s = D(null), [_, A] = h(!0), [x, R] = h(() => typeof document > "u" || !document.hidden), k = U(t === "auto"), m = t === "auto" ? k : t, f = $.includes(e) ? e : a.variant, v = C.includes(n) ? n : a.size, b = F(o, 0.1, 3), g = i || !_ || !x, w = M(() => T(f, v, m), [m, v, f]), B = m === "light" ? "#dad7cc" : "#050608", p = I(() => {
    s.current?.contentWindow?.postMessage({
      type: "brand-orbs-controls",
      controls: { speed: b, paused: g }
    }, "*");
  }, [g, b]);
  return c(() => {
    const d = s.current;
    if (!d || typeof IntersectionObserver > "u") return;
    const y = new IntersectionObserver(([O]) => A(O?.isIntersecting ?? !0));
    return y.observe(d), () => y.disconnect();
  }, []), c(() => {
    if (typeof document > "u") return;
    const d = () => R(!document.hidden);
    return document.addEventListener("visibilitychange", d), () => document.removeEventListener("visibilitychange", d);
  }, []), c(() => {
    p();
  }, [p, w]), /* @__PURE__ */ N(
    "iframe",
    {
      ref: s,
      className: u,
      title: r ?? `${E[f]} animated brand orb`,
      srcDoc: w,
      sandbox: "allow-scripts",
      loading: "eager",
      onLoad: p,
      style: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: B,
        ...l
      }
    }
  );
}
export {
  a as BRAND_ORBS_DEFAULTS,
  C as BRAND_ORB_SIZES,
  $ as BRAND_ORB_VARIANTS,
  J as BrandOrbs
};
