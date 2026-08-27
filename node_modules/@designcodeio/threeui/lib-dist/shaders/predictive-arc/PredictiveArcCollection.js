import { jsx as t } from "react/jsx-runtime";
import { Suspense as i, lazy as e } from "react";
import { PredictiveArcCanvas as l } from "./PredictiveArcCanvas.js";
const c = e(
  () => import("../ribbon-field/RibbonFieldBackground.js").then((a) => ({ default: a.RibbonFieldBackground }))
), f = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.VoidField }))
), d = e(
  () => import("../neuform-isolated/NeuformCraftEffects.js").then((a) => ({ default: a.HalftoneFlow }))
), v = e(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((a) => ({ default: a.AmberHalftone }))
), r = /* @__PURE__ */ t("div", { className: "threeui-background predictive-arc" });
function u(a) {
  if (a.variant === "ribbon-field") {
    const { variant: o, ...n } = a;
    return /* @__PURE__ */ t(i, { fallback: r, children: /* @__PURE__ */ t(c, { ...n }) });
  }
  if (a.variant === "void-field") {
    const { variant: o, ...n } = a;
    return /* @__PURE__ */ t(i, { fallback: r, children: /* @__PURE__ */ t(f, { ...n }) });
  }
  if (a.variant === "halftone-flow") {
    const { variant: o, ...n } = a;
    return /* @__PURE__ */ t(i, { fallback: r, children: /* @__PURE__ */ t(d, { ...n }) });
  }
  if (a.variant === "amber-halftone") {
    const { variant: o, ...n } = a;
    return /* @__PURE__ */ t(i, { fallback: r, children: /* @__PURE__ */ t(v, { ...n }) });
  }
  return /* @__PURE__ */ t(l, { ...a });
}
export {
  u as PredictiveArcCanvas
};
