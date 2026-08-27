import { jsx as o } from "react/jsx-runtime";
import { useState as f, useRef as h, useEffect as m } from "react";
import { splitTypographyProps as P, usePageTypography as y, applyPageCustomization as u } from "./pageTypography.js";
import { BESTSELLERS_TYPOGRAPHY as k, COMPLETE_SHELF_TYPOGRAPHY as S, KAGE_TYPOGRAPHY as T, SYLVA_TYPOGRAPHY as b } from "./pageRecipes.js";
const w = "allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts";
function p({ className: e = "", customization: n, sourceUrl: a, srcDoc: r, style: l, title: s }) {
  const [i, c] = f(!1), g = h(null);
  return m(() => {
    u(g.current, n);
  }, [n]), /* @__PURE__ */ o("div", { className: `threeui-background landing-page-frame${e ? ` ${e}` : ""}`, "data-state": i ? "ready" : "loading", style: { position: "relative", overflow: "hidden", background: "#080808", pointerEvents: "auto", ...l }, children: /* @__PURE__ */ o("iframe", { ref: g, title: s, ...r ? { srcDoc: r } : { src: a }, sandbox: w, loading: "eager", onLoad: (d) => {
    u(d.currentTarget, n), c(!0);
  }, style: { position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", border: 0, background: "#080808" } }) });
}
function t({ recipe: e, title: n, sourceUrl: a, ...r }) {
  const [l, s] = P(r), i = y(e, l);
  return /* @__PURE__ */ o(p, { ...s, customization: i, title: n, sourceUrl: a });
}
function Y(e) {
  return /* @__PURE__ */ o(t, { ...e, recipe: T, title: "Kage — Where stillness reveals the unseen", sourceUrl: "/landing-pages/kage.html" });
}
function A(e) {
  return /* @__PURE__ */ o(t, { ...e, recipe: S, title: "Working Volumes — Seven Tools for Making", sourceUrl: "/landing-pages/complete-shelf-v2.html" });
}
function H(e) {
  return /* @__PURE__ */ o(t, { ...e, recipe: k, title: "Field Manuals — Tools for Thought", sourceUrl: "/landing-pages/bestsellers-book-showcase.html" });
}
function M(e) {
  return /* @__PURE__ */ o(p, { ...e, title: "Meng To — Singapore Sketchbook", sourceUrl: "/landing-pages/meng-to-sketchbook.html" });
}
function O(e) {
  return /* @__PURE__ */ o(t, { ...e, recipe: b, title: "Sylva — Into the living world", sourceUrl: "/landing-pages/inner-green-3d.html" });
}
export {
  H as BestsellersBookShowcase,
  A as CompleteShelfLandingPage,
  Y as KageLandingPage,
  p as LandingPageFrame,
  M as MengToSketchbookLandingPage,
  O as SylvaHero
};
