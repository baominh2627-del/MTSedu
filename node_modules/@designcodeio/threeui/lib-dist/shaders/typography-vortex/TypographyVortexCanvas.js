import { jsxs as d, jsx as i } from "react/jsx-runtime";
import { useRef as e, useEffect as u } from "react";
import { createTypographyVortexRenderer as m } from "./typographyVortexRenderer.js";
const p = {
  mode: "dark",
  phrase: "SABLE / SYSTEMS IN MOTION / ",
  speed: 1,
  ringGrowth: 1.21,
  opacity: 1,
  dissolveRadius: 1,
  particleAmount: 1,
  suctionDuration: 920
};
function f({ className: r = "", ...o }) {
  const n = e(null), a = e(null), t = e({ ...p, ...o });
  return t.current = { ...p, ...o }, u(() => {
    const s = n.current, c = a.current;
    if (!(!s || !c))
      return m(s, c, () => t.current);
  }, []), /* @__PURE__ */ d(
    "div",
    {
      ref: n,
      className: `typography-vortex-component typography-vortex-component--${t.current.mode}${r ? ` ${r}` : ""}`,
      "data-mode": t.current.mode,
      "data-dissolve-state": "ambient",
      "data-suction-state": "idle",
      "data-particles": "0",
      "data-dissolve-strength": "0.00",
      children: [
        /* @__PURE__ */ i("canvas", { ref: a, "aria-label": "Interactive typography vortex" }),
        /* @__PURE__ */ i("span", { className: "typography-vortex-component__hint", children: "MOVE / DISSOLVE · CLICK / SUCTION" })
      ]
    }
  );
}
export {
  p as TYPOGRAPHY_VORTEX_DEFAULTS,
  f as TypographyVortexCanvas
};
