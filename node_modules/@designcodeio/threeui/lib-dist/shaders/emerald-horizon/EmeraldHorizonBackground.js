import { jsx as E } from "react/jsx-runtime";
import { useRef as l, useEffect as M } from "react";
import * as r from "three128";
import { LUMINA_FRAGMENT_SHADER as z, LUMINA_VERTEX_SHADER as O } from "./emeraldHorizonShaders.js";
const S = { speed: 1, waveScale: 1, variation: 1, glow: 1, vignette: 1, hue: 0 };
function L({ className: v = "", ...d }) {
  const m = l(null), f = l(null), u = l({ ...S, ...d });
  return u.current = { ...S, ...d }, M(() => {
    const i = m.current, h = f.current;
    if (!i || !h) return;
    const w = new r.Scene(), b = new r.OrthographicCamera(-1, 1, 1, -1, 0, 1), o = new r.WebGLRenderer({ canvas: h, alpha: !0, antialias: !0 });
    o.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const n = { u_time: { value: 0 }, u_resolution: { value: new r.Vector2(1, 1) }, u_wave_scale: { value: 1 }, u_variation: { value: 1 }, u_glow: { value: 1 }, u_vignette: { value: 1 } }, _ = new r.ShaderMaterial({ vertexShader: O, fragmentShader: z, uniforms: n, depthWrite: !1, depthTest: !1 }), g = new r.PlaneGeometry(2, 2);
    w.add(new r.Mesh(g, _));
    let e = 0, s = !0, F = performance.now();
    const R = () => {
      const t = i.getBoundingClientRect();
      o.setSize(t.width, t.height, !1), n.u_resolution.value.set(t.width, t.height);
    }, c = (t) => {
      const a = u.current;
      n.u_time.value = (t - F) * 1e-3 * a.speed, n.u_wave_scale.value = a.waveScale, n.u_variation.value = a.variation, n.u_glow.value = a.glow, n.u_vignette.value = a.vignette, o.render(w, b), e = s && !document.hidden ? requestAnimationFrame(c) : 0;
    }, p = new ResizeObserver(R), A = new IntersectionObserver(([t]) => {
      s = t?.isIntersecting ?? !0, s && !e && (e = requestAnimationFrame(c)), !s && e && (cancelAnimationFrame(e), e = 0);
    });
    return p.observe(i), A.observe(i), R(), e = requestAnimationFrame(c), () => {
      e && cancelAnimationFrame(e), p.disconnect(), A.disconnect(), g.dispose(), _.dispose(), o.dispose();
    };
  }, []), /* @__PURE__ */ E("div", { ref: m, className: `threeui-background emerald-horizon${v ? ` ${v}` : ""}`, children: /* @__PURE__ */ E("canvas", { ref: f, style: { filter: `hue-rotate(${u.current.hue}deg)` } }) });
}
export {
  S as EMERALD_HORIZON_DEFAULTS,
  L as EmeraldHorizonBackground
};
