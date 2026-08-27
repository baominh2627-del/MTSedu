import { jsx as b } from "react/jsx-runtime";
import { useRef as s, useEffect as F } from "react";
import { DATA_PIXEL_ARC_DEFAULTS as g, createDataPixelArcRenderer as R } from "./dataPixelArcRenderer.js";
function $({ className: a = "", ...u }) {
  const d = s(null), m = s(null), t = s({ ...g, ...u });
  return t.current = { ...g, ...u }, F(() => {
    const r = d.current, l = m.current;
    if (!r || !l) return;
    const i = R(l, () => t.current);
    if (!i) return;
    let e = 0, n = !0;
    const f = () => {
      const o = r.getBoundingClientRect();
      i.resize(o.width, o.height), i.render();
    }, c = () => {
      i.render(), e = n && !document.hidden ? requestAnimationFrame(c) : 0;
    }, v = new ResizeObserver(f), h = new IntersectionObserver(([o]) => {
      n = o?.isIntersecting ?? !0, n && !e && (e = requestAnimationFrame(c)), !n && e && (cancelAnimationFrame(e), e = 0);
    }), A = () => {
      document.hidden && e ? (cancelAnimationFrame(e), e = 0) : !document.hidden && n && !e && (e = requestAnimationFrame(c));
    };
    return v.observe(r), h.observe(r), document.addEventListener("visibilitychange", A), f(), e = requestAnimationFrame(c), () => {
      e && cancelAnimationFrame(e), v.disconnect(), h.disconnect(), document.removeEventListener("visibilitychange", A);
    };
  }, []), /* @__PURE__ */ b(
    "div",
    {
      ref: d,
      className: `threeui-background data-pixel-arc data-pixel-arc--${t.current.mode}${a ? ` ${a}` : ""}`,
      "data-mode": t.current.mode,
      children: /* @__PURE__ */ b("canvas", { ref: m, style: { filter: `hue-rotate(${t.current.hue}deg) saturate(${t.current.saturation})` } })
    }
  );
}
export {
  $ as DataPixelArcCanvas
};
