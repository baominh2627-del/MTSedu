import { jsx as n } from "react/jsx-runtime";
import { Suspense as A, lazy as R, useRef as l, useEffect as F } from "react";
import { DataPixelArcCanvas as k } from "../data-pixel-arc/DataPixelArcCanvas.js";
import { PREDICTIVE_ARC_DEFAULTS as P, createPredictiveArcRenderer as E } from "./predictiveArcRenderer.js";
const _ = R(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((e) => ({ default: e.SignalParticles }))
), p = R(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((e) => ({ default: e.OverrideGrid }))
);
function y({ className: e = "", ...v }) {
  const c = l(null), i = l(null), t = l({ ...P, ...v });
  return t.current = { ...P, ...v }, F(() => {
    const s = c.current, m = i.current;
    if (!s || !m) return;
    const o = E(m, () => t.current);
    if (!o) return;
    let r = 0, a = !0;
    const f = () => {
      const u = s.getBoundingClientRect();
      o.resize(u.width, u.height), o.render();
    }, d = () => {
      o.render(), r = a && !document.hidden ? requestAnimationFrame(d) : 0;
    }, h = new ResizeObserver(f), b = new IntersectionObserver(([u]) => {
      a = u?.isIntersecting ?? !0, a && !r && (r = requestAnimationFrame(d)), !a && r && (cancelAnimationFrame(r), r = 0);
    }), g = () => {
      document.hidden && r ? (cancelAnimationFrame(r), r = 0) : !document.hidden && a && !r && (r = requestAnimationFrame(d));
    };
    return h.observe(s), b.observe(s), document.addEventListener("visibilitychange", g), f(), r = requestAnimationFrame(d), () => {
      r && cancelAnimationFrame(r), h.disconnect(), b.disconnect(), document.removeEventListener("visibilitychange", g);
    };
  }, []), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: `threeui-background predictive-arc predictive-arc--${t.current.mode}${e ? ` ${e}` : ""}`,
      "data-mode": t.current.mode,
      children: /* @__PURE__ */ n(
        "canvas",
        {
          ref: i,
          style: { filter: `hue-rotate(${t.current.hue}deg) saturate(${t.current.saturation})` }
        }
      )
    }
  );
}
function z(e) {
  if (e.variant === "data-pixel") {
    const { variant: i, ...t } = e;
    return /* @__PURE__ */ n(k, { ...t });
  }
  if (e.variant === "signal-particles") {
    const { variant: i, ...t } = e;
    return /* @__PURE__ */ n(A, { fallback: /* @__PURE__ */ n("div", { className: "threeui-background predictive-arc" }), children: /* @__PURE__ */ n(_, { ...t }) });
  }
  if (e.variant === "override-grid") {
    const { variant: i, ...t } = e;
    return /* @__PURE__ */ n(A, { fallback: /* @__PURE__ */ n("div", { className: "threeui-background predictive-arc" }), children: /* @__PURE__ */ n(p, { ...t }) });
  }
  const { variant: v, ...c } = e;
  return /* @__PURE__ */ n(y, { ...c });
}
export {
  z as PredictiveArcCanvas
};
