import { jsx as e } from "react/jsx-runtime";
import { Suspense as a, lazy as i } from "react";
const s = i(
  () => import("./ElementsBackground.js").then((n) => ({ default: n.ElementsBackground }))
), d = i(
  () => import("../condensation/CondensationBackground.js").then((n) => ({ default: n.CondensationBackground }))
), v = i(
  () => import("./GenerativeTree.js").then((n) => ({ default: n.GenerativeTree }))
), r = /* @__PURE__ */ e("div", { className: "threeui-background elements" });
function f(n) {
  if (n.variant === "generative-tree") {
    const { variant: l, ...t } = n;
    return /* @__PURE__ */ e(a, { fallback: r, children: /* @__PURE__ */ e(v, { ...t }) });
  }
  if (n.variant === "condensation") {
    const { variant: l, ...t } = n;
    return /* @__PURE__ */ e(a, { fallback: r, children: /* @__PURE__ */ e(d, { ...t }) });
  }
  const { variant: o = "water", ...c } = n;
  return /* @__PURE__ */ e(a, { fallback: r, children: /* @__PURE__ */ e(s, { ...c, variant: o }) });
}
export {
  f as ElementsCollection
};
