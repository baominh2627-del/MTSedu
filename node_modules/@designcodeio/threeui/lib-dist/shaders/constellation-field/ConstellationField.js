import { jsx as n } from "react/jsx-runtime";
import { TopoField as o, DefenseLines as l, InterfaceLines as a, ConnectivityGraph as r, GatewayFlow as s, ParticleNetwork as c, ParticleDrift as f, ConstellationField as d } from "../neuform-isolated/NeuformBatchEffects.js";
const p = {
  "constellation-field": d,
  "particle-drift": f,
  "particle-network": c,
  "gateway-flow": s,
  "connectivity-graph": r,
  "interface-lines": a,
  "defense-lines": l,
  "topo-field": o
};
function F({ variant: e = "constellation-field", ...t }) {
  const i = p[e];
  return /* @__PURE__ */ n(i, { ...t });
}
export {
  F as ConstellationField
};
