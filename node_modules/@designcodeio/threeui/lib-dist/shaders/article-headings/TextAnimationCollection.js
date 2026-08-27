import { jsx as r } from "react/jsx-runtime";
import { Suspense as n, lazy as e } from "react";
const l = e(
  () => import("./ArticleHeadings.js").then((a) => ({ default: a.ArticleHeadings }))
), d = e(
  () => import("../neuform-isolated/NeuformCraftEffects.js").then((a) => ({ default: a.NeonTypography }))
), v = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.ThreeUIIntro }))
), u = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.ParticleWordmark }))
), f = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.AudioWordmark }))
), i = /* @__PURE__ */ r("div", { className: "threeui-background", style: { background: "#090909" } });
function k(a) {
  if (a.variant === "neon-sign") {
    const { variant: o, ...t } = a;
    return /* @__PURE__ */ r(n, { fallback: i, children: /* @__PURE__ */ r(d, { ...t }) });
  }
  if (a.variant === "threeui-intro") {
    const { variant: o, ...t } = a;
    return /* @__PURE__ */ r(n, { fallback: i, children: /* @__PURE__ */ r(v, { ...t }) });
  }
  if (a.variant === "particle-wordmark") {
    const { variant: o, ...t } = a;
    return /* @__PURE__ */ r(n, { fallback: i, children: /* @__PURE__ */ r(u, { ...t }) });
  }
  if (a.variant === "audio-wordmark") {
    const { variant: o, ...t } = a;
    return /* @__PURE__ */ r(n, { fallback: i, children: /* @__PURE__ */ r(f, { ...t }) });
  }
  const { variant: m, ...c } = a;
  return /* @__PURE__ */ r(n, { fallback: i, children: /* @__PURE__ */ r(l, { ...c }) });
}
export {
  k as TextAnimationCollection
};
