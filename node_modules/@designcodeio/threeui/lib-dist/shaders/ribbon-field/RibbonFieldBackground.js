import { jsx as B } from "react/jsx-runtime";
import { useRef as p, useEffect as O } from "react";
import { RIBBON_FIELD_VERTEX_SHADER as y, RIBBON_FIELD_FRAGMENT_SHADER as N } from "./ribbonFieldShaders.js";
const I = { speed: 1, pointerAmount: 1, smoothing: 0.035, brightness: 1, opacity: 1, hue: 0, saturation: 1 };
function T(o, u, f) {
  const n = o.createShader(u);
  if (!n) throw new Error("Unable to create Axiom shader");
  if (o.shaderSource(n, f), o.compileShader(n), !o.getShaderParameter(n, o.COMPILE_STATUS)) throw new Error(o.getShaderInfoLog(n) ?? "Axiom shader compilation failed");
  return n;
}
function $({ className: o = "", ...u }) {
  const f = p(null), n = p(null), m = p({ ...I, ...u });
  m.current = { ...I, ...u }, O(() => {
    const c = f.current, s = n.current;
    if (!c || !s) return;
    const e = s.getContext("webgl", { alpha: !0, antialias: !1, premultipliedAlpha: !1 });
    if (!e) return;
    const R = T(e, e.VERTEX_SHADER, y), b = T(e, e.FRAGMENT_SHADER, N), t = e.createProgram();
    if (!t) return;
    if (e.attachShader(t, R), e.attachShader(t, b), e.linkProgram(t), !e.getProgramParameter(t, e.LINK_STATUS)) throw new Error(e.getProgramInfoLog(t) ?? "Axiom program link failed");
    e.useProgram(t);
    const E = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, E), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), e.STATIC_DRAW);
    const v = e.getAttribLocation(t, "position");
    e.enableVertexAttribArray(v), e.vertexAttribPointer(v, 2, e.FLOAT, !1, 0, 0);
    const P = e.getUniformLocation(t, "resolution"), D = e.getUniformLocation(t, "time"), M = e.getUniformLocation(t, "pointer");
    let l = 0.72, g = 0.42, w = 0.72, S = 0.42, i = 0, d = !0;
    const U = performance.now(), F = (a) => {
      const r = c.getBoundingClientRect();
      w = 0.72 + ((a.clientX - r.left) / Math.max(r.width, 1) - 0.72) * m.current.pointerAmount, S = 0.42 + (1 - (a.clientY - r.top) / Math.max(r.height, 1) - 0.42) * m.current.pointerAmount;
    }, L = () => {
      const a = c.getBoundingClientRect(), r = Math.min(window.devicePixelRatio || 1, 2);
      s.width = Math.max(1, Math.floor(a.width * r)), s.height = Math.max(1, Math.floor(a.height * r)), e.viewport(0, 0, s.width, s.height), e.uniform2f(P, s.width, s.height);
    }, A = (a) => {
      const r = m.current;
      l += (w - l) * r.smoothing, g += (S - g) * r.smoothing, e.uniform1f(D, (a - U) * 1e-3 * r.speed), e.uniform2f(M, l, g), e.drawArrays(e.TRIANGLES, 0, 6), i = d && !document.hidden ? requestAnimationFrame(A) : 0;
    }, _ = new ResizeObserver(L), x = new IntersectionObserver(([a]) => {
      d = a?.isIntersecting ?? !0, d && !i && (i = requestAnimationFrame(A)), !d && i && (cancelAnimationFrame(i), i = 0);
    });
    return _.observe(c), x.observe(c), c.addEventListener("pointermove", F, { passive: !0 }), L(), i = requestAnimationFrame(A), () => {
      i && cancelAnimationFrame(i), _.disconnect(), x.disconnect(), c.removeEventListener("pointermove", F), e.deleteBuffer(E), e.deleteShader(R), e.deleteShader(b), e.deleteProgram(t);
    };
  }, []);
  const h = m.current;
  return /* @__PURE__ */ B("div", { ref: f, className: `threeui-background ribbon-field${o ? ` ${o}` : ""}`, children: /* @__PURE__ */ B("canvas", { ref: n, style: { opacity: h.opacity, filter: `hue-rotate(${h.hue}deg) saturate(${h.saturation}) brightness(${h.brightness})` } }) });
}
export {
  I as RIBBON_FIELD_DEFAULTS,
  $ as RibbonFieldBackground
};
