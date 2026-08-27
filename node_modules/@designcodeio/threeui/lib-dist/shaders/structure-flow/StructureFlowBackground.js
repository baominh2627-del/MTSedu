import { jsx as F } from "react/jsx-runtime";
import { useRef as c, useEffect as h } from "react";
import { STRUCTURE_FLOW_DEFAULTS as R, createStructureFlowRenderer as p } from "./structureFlowRenderer.js";
function z({ className: a = "", ...u }) {
  const m = c(null), d = c(null), s = c({ ...R, ...u });
  s.current = { ...R, ...u }, h(() => {
    const t = m.current, b = d.current;
    if (!t || !b) return;
    const r = p(b, () => s.current);
    let e = 0, n = !0;
    const k = () => {
      const o = t.getBoundingClientRect();
      r.resize(o.width, o.height), r.render();
    }, i = () => {
      r.render(), e = n && !document.hidden ? requestAnimationFrame(i) : 0;
    }, v = new ResizeObserver(k), g = new IntersectionObserver(([o]) => {
      n = o?.isIntersecting ?? !0, n && !e && (e = requestAnimationFrame(i)), !n && e && (cancelAnimationFrame(e), e = 0);
    });
    return v.observe(t), g.observe(t), k(), e = requestAnimationFrame(i), () => {
      e && cancelAnimationFrame(e), v.disconnect(), g.disconnect(), r.dispose();
    };
  }, []);
  const f = s.current, l = `linear-gradient(to bottom, transparent ${f.maskStart * 100}%, black ${f.maskSolid * 100}%, black 100%)`;
  return /* @__PURE__ */ F("div", { ref: m, className: `threeui-background structure-flow${a ? ` ${a}` : ""}`, style: { opacity: 0.8, WebkitMaskImage: l, maskImage: l }, children: /* @__PURE__ */ F("canvas", { ref: d }) });
}
export {
  z as StructureFlowBackground
};
