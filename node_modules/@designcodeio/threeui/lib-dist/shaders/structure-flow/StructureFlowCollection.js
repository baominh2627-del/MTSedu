import { jsx as t } from "react/jsx-runtime";
import { Suspense as r, lazy as e } from "react";
const c = e(
  () => import("./StructureFlowBackground.js").then((a) => ({ default: a.StructureFlowBackground }))
), d = e(
  () => import("../emerald-horizon/EmeraldHorizonBackground.js").then((a) => ({ default: a.EmeraldHorizonBackground }))
), v = e(
  () => import("../orbital-sphere/OrbitalSphereBackground.js").then((a) => ({ default: a.OrbitalSphereBackground }))
), u = e(
  () => import("../dot-matrix/DotMatrixBackground.js").then((a) => ({ default: a.DotMatrixBackground }))
), f = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.ExpanseField }))
), h = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.LogicCoreField }))
), m = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.DimensionalField }))
), s = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.DataField }))
), b = e(
  () => import("../neuform-isolated/NeuformIsolatedEffects.js").then((a) => ({ default: a.TopologyField }))
), k = e(
  () => import("../neuform-isolated/NeuformCraftEffects.js").then((a) => ({ default: a.NebulaBackground }))
), g = e(
  () => import("../neuform-isolated/NeuformCraftEffects.js").then((a) => ({ default: a.FluidFieldBackground }))
), V = e(
  () => import("../neuform-isolated/NeuformCraftEffects.js").then((a) => ({ default: a.EmberStorm }))
), x = e(
  () => import("../neuform-isolated/NeuformBatchEffects.js").then((a) => ({ default: a.FluxVortex }))
), i = /* @__PURE__ */ t("div", { className: "threeui-background", style: { background: "#050607" } });
function B(a) {
  if (a.variant === "emerald-horizon") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(d, { ...n }) });
  }
  if (a.variant === "orbital-sphere") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(v, { ...n }) });
  }
  if (a.variant === "dot-matrix") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(u, { ...n }) });
  }
  if (a.variant === "expanse-field") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(f, { ...n }) });
  }
  if (a.variant === "logic-core") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(h, { ...n }) });
  }
  if (a.variant === "dimensional-field") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(m, { ...n }) });
  }
  if (a.variant === "data-field") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(s, { ...n }) });
  }
  if (a.variant === "topology-field") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(b, { ...n }) });
  }
  if (a.variant === "nebula") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(k, { ...n }) });
  }
  if (a.variant === "fluid-field") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(g, { ...n }) });
  }
  if (a.variant === "ember-storm") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(V, { ...n }) });
  }
  if (a.variant === "flux-vortex") {
    const { variant: l, ...n } = a;
    return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(x, { ...n }) });
  }
  const { variant: F, ...o } = a;
  return /* @__PURE__ */ t(r, { fallback: i, children: /* @__PURE__ */ t(c, { ...o }) });
}
export {
  B as StructureFlowCollection
};
