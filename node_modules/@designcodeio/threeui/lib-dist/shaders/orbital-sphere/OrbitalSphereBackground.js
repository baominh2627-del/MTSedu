import { jsx as v } from "react/jsx-runtime";
import { useRef as c, useEffect as g } from "react";
import { ORBITAL_SPHERE_DEFAULTS as R, createOrbitalSphereRenderer as p } from "./orbitalSphereRenderer.js";
function z({ className: a = "", ...u }) {
  const d = c(null), f = c(null), s = c({ ...R, ...u });
  return s.current = { ...R, ...u }, g(() => {
    const r = d.current, m = f.current;
    if (!r || !m) return;
    const n = p(m, () => s.current);
    let e = 0, t = !0;
    const l = () => {
      const i = r.getBoundingClientRect();
      n.resize(i.width, i.height), n.render();
    }, o = () => {
      n.render(), e = t && !document.hidden ? requestAnimationFrame(o) : 0;
    }, h = new ResizeObserver(l), b = new IntersectionObserver(([i]) => {
      t = i?.isIntersecting ?? !0, t && !e && (e = requestAnimationFrame(o)), !t && e && (cancelAnimationFrame(e), e = 0);
    });
    return h.observe(r), b.observe(r), l(), e = requestAnimationFrame(o), () => {
      e && cancelAnimationFrame(e), h.disconnect(), b.disconnect(), n.dispose();
    };
  }, []), /* @__PURE__ */ v("div", { ref: d, className: `threeui-background orbital-sphere${a ? ` ${a}` : ""}`, children: /* @__PURE__ */ v("canvas", { ref: f, style: { filter: `hue-rotate(${s.current.hue}deg)` } }) });
}
export {
  z as OrbitalSphereBackground
};
