import { jsx as o } from "react/jsx-runtime";
import { Suspense as l, lazy as n } from "react";
const i = {
  "uploading-button": "thinking-button"
}, r = {
  "star-portal": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.StarPortal }))
  ),
  "ignition-button": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.IgnitionButton }))
  ),
  "induction-button": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.InductionButton }))
  ),
  "plasma-button": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.PlasmaButton }))
  ),
  "tactile-button": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.TactileButton }))
  ),
  "thinking-button": n(
    () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((t) => ({ default: t.ThinkingButton }))
  )
};
function d({ variant: t = "star-portal", ...u }) {
  const e = t in i ? i[t] : t, a = r[e];
  return /* @__PURE__ */ o(l, { fallback: null, children: /* @__PURE__ */ o(a, { ...u }) });
}
export {
  d as ShaderButtons
};
