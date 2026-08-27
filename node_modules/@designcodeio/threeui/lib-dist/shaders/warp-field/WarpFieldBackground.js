import { jsx as b } from "react/jsx-runtime";
import { useRef as c, useEffect as F } from "react";
import { WARP_FIELD_DEFAULTS as g, createWarpFieldRenderer as R } from "./warpFieldRenderer.js";
function w({ className: a = "", ...u }) {
  const d = c(null), f = c(null), r = c({ ...g, ...u });
  return r.current = { ...g, ...u }, F(() => {
    const n = d.current, m = f.current;
    if (!n || !m) return;
    const t = R(m, () => r.current);
    let e = 0, i = !0;
    const l = () => {
      const s = n.getBoundingClientRect();
      t.resize(s.width, s.height), t.render();
    }, o = () => {
      t.render(), e = i && !document.hidden ? requestAnimationFrame(o) : 0;
    }, h = new ResizeObserver(l), v = new IntersectionObserver(([s]) => {
      i = s?.isIntersecting ?? !0, i && !e && (e = requestAnimationFrame(o)), !i && e && (cancelAnimationFrame(e), e = 0);
    });
    return h.observe(n), v.observe(n), l(), e = requestAnimationFrame(o), () => {
      e && cancelAnimationFrame(e), h.disconnect(), v.disconnect(), t.dispose();
    };
  }, []), /* @__PURE__ */ b("div", { ref: d, className: `threeui-background warp-field${a ? ` ${a}` : ""}`, children: /* @__PURE__ */ b("canvas", { ref: f, style: { filter: `hue-rotate(${r.current.hue}deg) saturate(${r.current.saturation}) brightness(${r.current.brightness})` } }) });
}
export {
  w as WarpFieldBackground
};
