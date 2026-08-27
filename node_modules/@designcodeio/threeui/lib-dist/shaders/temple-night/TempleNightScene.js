import { jsxs as w, jsx as A } from "react/jsx-runtime";
import { useRef as y, useState as x, useEffect as F } from "react";
import { createTempleNightRenderer as N } from "./templeNightRenderer.js";
function S({ className: v = "" }) {
  const m = y(null), f = y(null), [c, l] = x("loading"), [R, M] = x("");
  return F(() => {
    const d = m.current, t = f.current;
    if (!d || !t) return;
    let r;
    try {
      r = N(t);
    } catch (n) {
      M(n instanceof Error ? n.message : "Unknown renderer error"), l("unavailable");
      return;
    }
    if (!r) {
      l("unavailable");
      return;
    }
    let e = 0, u = !0, p = !1, b = !1;
    const i = () => {
      !p && u && !document.hidden && !e && (e = requestAnimationFrame(z));
    }, z = (n) => {
      e = 0, r.render(n), b || (b = !0, l("ready")), r.reducedMotion || i();
    }, h = () => {
      r.resize(), i();
    }, s = (n) => {
      const o = t.getBoundingClientRect();
      r.setPointer((n.clientX - o.left) / Math.max(1, o.width) * 2 - 1, 1 - (n.clientY - o.top) / Math.max(1, o.height) * 2, !0), i();
    }, a = () => {
      r.setPointer(0, 0, !1), i();
    }, g = () => {
      document.hidden && e ? (cancelAnimationFrame(e), e = 0) : i();
    }, E = new ResizeObserver(h);
    E.observe(d);
    const L = new IntersectionObserver(([n]) => {
      u = n?.isIntersecting ?? !0, !u && e ? (cancelAnimationFrame(e), e = 0) : i();
    });
    return L.observe(d), t.addEventListener("pointermove", s, { passive: !0 }), t.addEventListener("pointerenter", s, { passive: !0 }), t.addEventListener("pointerleave", a, { passive: !0 }), window.addEventListener("blur", a), document.addEventListener("visibilitychange", g), h(), () => {
      p = !0, e && cancelAnimationFrame(e), E.disconnect(), L.disconnect(), t.removeEventListener("pointermove", s), t.removeEventListener("pointerenter", s), t.removeEventListener("pointerleave", a), window.removeEventListener("blur", a), document.removeEventListener("visibilitychange", g), r.dispose();
    };
  }, []), /* @__PURE__ */ w("div", { className: `temple-night-scene${v ? ` ${v}` : ""}`, ref: m, "data-state": c, children: [
    /* @__PURE__ */ A("canvas", { ref: f, className: `temple-night-canvas${c === "ready" ? " is-ready" : ""}`, "aria-label": "Interactive Kage mountain temple world after dark" }),
    c === "unavailable" ? /* @__PURE__ */ w("p", { className: "temple-night-unavailable", role: "status", children: [
      "WebGL is unavailable: ",
      R || "unsupported context",
      "."
    ] }) : null
  ] });
}
export {
  S as TempleNightScene
};
