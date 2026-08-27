import { jsx as O } from "react/jsx-runtime";
import { useRef as m, useEffect as _ } from "react";
import * as n from "three128";
import { CORE_UPLINK_FRAGMENT_SHADER as F, CORE_UPLINK_VERTEX_SHADER as P } from "./dotMatrixShaders.js";
const y = { speed: 1, gridScale: 60, mouseAmount: 0.04, pulseSpeed: 0.4, radius: 0.15, opacity: 0.35, hue: 0 };
function D({ className: v = "", ...p }) {
  const h = m(null), f = m(null), c = m({ ...y, ...p });
  return c.current = { ...y, ...p }, _(() => {
    const a = h.current, o = f.current;
    if (!a || !o) return;
    const u = new n.WebGLRenderer({ canvas: o, antialias: !0, alpha: !0 });
    u.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const R = new n.Scene(), w = new n.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    w.position.z = 1;
    const r = { uTime: { value: 0 }, uResolution: { value: new n.Vector2() }, uMouse: { value: new n.Vector2() }, uGridScale: { value: 60 }, uMouseAmount: { value: 0.04 }, uPulseSpeed: { value: 0.4 }, uRadius: { value: 0.15 }, uOpacity: { value: 0.35 } }, g = new n.PlaneGeometry(2, 2), S = new n.ShaderMaterial({ uniforms: r, vertexShader: P, fragmentShader: F, transparent: !0, depthWrite: !1 });
    R.add(new n.Mesh(g, S));
    let A = new n.Vector2(), l = new n.Vector2(), i = 0, s = !0, T = performance.now();
    const E = (e) => {
      const t = o.getBoundingClientRect();
      l.x = (e.clientX - t.left) / Math.max(1, t.width) * 2 - 1, l.y = -((e.clientY - t.top) / Math.max(1, t.height) * 2 - 1);
    }, M = () => {
      const e = a.getBoundingClientRect();
      u.setSize(e.width, e.height, !1), r.uResolution.value.set(e.width, e.height);
    }, d = (e) => {
      const t = c.current;
      A.lerp(l, 0.05), r.uTime.value = (e - T) * 1e-3 * t.speed, r.uMouse.value = A, r.uGridScale.value = t.gridScale, r.uMouseAmount.value = t.mouseAmount, r.uPulseSpeed.value = t.pulseSpeed, r.uRadius.value = t.radius, r.uOpacity.value = t.opacity, u.render(R, w), i = s && !document.hidden ? requestAnimationFrame(d) : 0;
    }, b = new ResizeObserver(M), x = new IntersectionObserver(([e]) => {
      s = e?.isIntersecting ?? !0, s && !i && (i = requestAnimationFrame(d)), !s && i && (cancelAnimationFrame(i), i = 0);
    });
    return b.observe(a), x.observe(a), o.addEventListener("pointermove", E, { passive: !0 }), M(), i = requestAnimationFrame(d), () => {
      i && cancelAnimationFrame(i), b.disconnect(), x.disconnect(), o.removeEventListener("pointermove", E), g.dispose(), S.dispose(), u.dispose();
    };
  }, []), /* @__PURE__ */ O("div", { ref: h, className: `threeui-background dot-matrix${v ? ` ${v}` : ""}`, children: /* @__PURE__ */ O("canvas", { ref: f, style: { filter: `hue-rotate(${c.current.hue}deg)` } }) });
}
export {
  y as DOT_MATRIX_DEFAULTS,
  D as DotMatrixBackground
};
