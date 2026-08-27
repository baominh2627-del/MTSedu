import { jsx as e } from "react/jsx-runtime";
import { Suspense as t, lazy as l } from "react";
const n = l(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((r) => ({ default: r.MatrixField }))
), s = l(
  () => import("./LaserVariants.js").then((r) => ({ default: r.LaserVariants }))
), i = /* @__PURE__ */ e("div", { className: "threeui-background laser-variant" });
function f({ variant: r = "matrix-field", ...a }) {
  return r !== "matrix-field" ? /* @__PURE__ */ e(t, { fallback: i, children: /* @__PURE__ */ e(s, { ...a, variant: r }) }) : /* @__PURE__ */ e(t, { fallback: i, children: /* @__PURE__ */ e(n, { ...a }) });
}
export {
  f as LaserCollection
};
