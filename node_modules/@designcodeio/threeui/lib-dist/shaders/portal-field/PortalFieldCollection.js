import { jsx as t } from "react/jsx-runtime";
import { Suspense as r, lazy as l } from "react";
const c = l(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((a) => ({ default: a.PortalField }))
), d = l(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((a) => ({ default: a.FlowField }))
), f = l(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.CloudField }))
), v = l(
  () => import("../bell-field/BellFieldBackground.js").then((a) => ({ default: a.BellFieldBackground }))
), u = l(
  () => import("../stream-convergence/StreamConvergenceBackground.js").then((a) => ({ default: a.StreamConvergenceBackground }))
), i = /* @__PURE__ */ t("div", { className: "threeui-background portal-field" });
function k(a) {
  if (a.variant === "flow-field") {
    const { variant: e, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(d, { ...n }) });
  }
  if (a.variant === "cloud-field") {
    const { variant: e, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(f, { ...n }) });
  }
  if (a.variant === "bell-field") {
    const { variant: e, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(v, { ...n }) });
  }
  if (a.variant === "stream-convergence") {
    const { variant: e, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(u, { ...n }) });
  }
  const { variant: s, ...o } = a;
  return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(c, { ...o }) });
}
export {
  k as PortalFieldCollection
};
