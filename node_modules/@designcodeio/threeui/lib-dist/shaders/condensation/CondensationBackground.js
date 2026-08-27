import { jsx as h } from "react/jsx-runtime";
import { useRef as c, useEffect as A } from "react";
import { CONDENSATION_DEFAULTS as p, createCondensationRenderer as R } from "./condensationRenderer.js";
function w({ className: a = "", ...u }) {
  const d = c(null), m = c(null), o = c({ ...p, ...u });
  return o.current = { ...p, ...u }, A(() => {
    const r = d.current, f = m.current;
    if (!r || !f) return;
    const t = R(f, () => o.current);
    let e = 0, i = !0;
    const l = () => {
      const n = r.getBoundingClientRect();
      t.resize(n.width, n.height), t.render(performance.now());
    }, s = (n) => {
      t.render(n), e = i && !document.hidden ? requestAnimationFrame(s) : 0;
    }, v = new ResizeObserver(l), b = new IntersectionObserver(([n]) => {
      i = n?.isIntersecting ?? !0, i && !e && (e = requestAnimationFrame(s)), !i && e && (cancelAnimationFrame(e), e = 0);
    });
    return v.observe(r), b.observe(r), l(), e = requestAnimationFrame(s), () => {
      e && cancelAnimationFrame(e), v.disconnect(), b.disconnect(), t.dispose();
    };
  }, []), /* @__PURE__ */ h("div", { ref: d, className: `threeui-background condensation${a ? ` ${a}` : ""}`, style: { opacity: o.current.opacity }, children: /* @__PURE__ */ h("canvas", { ref: m }) });
}
export {
  w as CondensationBackground
};
