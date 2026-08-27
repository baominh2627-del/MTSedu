import { jsx as r } from "react/jsx-runtime";
import { Suspense as t, lazy as a } from "react";
const o = a(() => import("../energy-orb/EnergyOrb.js").then((e) => ({ default: e.EnergyOrb })));
function c({ variant: e, ...n }) {
  return /* @__PURE__ */ r(t, { fallback: /* @__PURE__ */ r("div", { className: "threeui-background energy-orb", style: { background: "#05030e" } }), children: /* @__PURE__ */ r(o, { ...n }) });
}
export {
  c as GlobeCollection
};
