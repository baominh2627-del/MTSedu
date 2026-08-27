import { jsx as _ } from "react/jsx-runtime";
import { useRef as g, useEffect as L } from "react";
import { STREAM_CONVERGENCE_VERTEX_SHADER as M, STREAM_CONVERGENCE_FRAGMENT_SHADER as P } from "./streamConvergenceShaders.js";
const w = { speed: 1, fidelity: 0.5, scale: 1, brightness: 1, opacity: 1, hue: 0, saturation: 1 };
function T(t, f, u) {
  const n = t.createShader(f);
  if (!n) throw new Error("Unable to create Stream Convergence shader");
  if (t.shaderSource(n, u), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(n) ?? "Stream Convergence shader compilation failed");
  return n;
}
function I({ className: t = "", ...f }) {
  const u = g(null), n = g(null), h = g({ ...w, ...f });
  h.current = { ...w, ...f }, L(() => {
    const d = u.current, i = n.current;
    if (!d || !i) return;
    const e = i.getContext("webgl", { alpha: !0, antialias: !1 });
    if (!e) return;
    const A = T(e, e.VERTEX_SHADER, M), E = T(e, e.FRAGMENT_SHADER, `precision highp float;
${P}`), r = e.createProgram();
    if (!r) return;
    if (e.attachShader(r, A), e.attachShader(r, E), e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS)) throw new Error(e.getProgramInfoLog(r) ?? "Stream Convergence program link failed");
    e.useProgram(r);
    const R = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, R), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), e.STATIC_DRAW);
    const S = e.getAttribLocation(r, "position");
    e.enableVertexAttribArray(S), e.vertexAttribPointer(S, 2, e.FLOAT, !1, 0, 0);
    const F = e.getUniformLocation(r, "u_time"), C = e.getUniformLocation(r, "u_resolution"), y = e.getUniformLocation(r, "u_interactive_fidelity");
    let o = 0, m = !0;
    const v = () => {
      const a = d.getBoundingClientRect(), c = Math.min(window.devicePixelRatio || 1, 2);
      i.width = Math.max(1, Math.round(a.width * c)), i.height = Math.max(1, Math.round(a.height * c)), e.viewport(0, 0, i.width, i.height), e.uniform2f(C, i.width, i.height);
    }, l = (a) => {
      const c = h.current;
      e.uniform1f(F, a * 3e-4 * c.speed), e.uniform1f(y, c.fidelity), e.drawArrays(e.TRIANGLES, 0, 6), o = m && !document.hidden ? requestAnimationFrame(l) : 0;
    }, p = new ResizeObserver(v), b = new IntersectionObserver(([a]) => {
      m = a?.isIntersecting ?? !0, m && !o && (o = requestAnimationFrame(l)), !m && o && (cancelAnimationFrame(o), o = 0);
    });
    return p.observe(d), b.observe(d), v(), o = requestAnimationFrame(l), () => {
      o && cancelAnimationFrame(o), p.disconnect(), b.disconnect(), e.deleteBuffer(R), e.deleteShader(A), e.deleteShader(E), e.deleteProgram(r);
    };
  }, []);
  const s = h.current;
  return /* @__PURE__ */ _("div", { ref: u, className: `threeui-background stream-convergence${t ? ` ${t}` : ""}`, children: /* @__PURE__ */ _("canvas", { ref: n, style: { opacity: s.opacity, filter: `hue-rotate(${s.hue}deg) saturate(${s.saturation}) brightness(${s.brightness})`, transform: `scale(${s.scale})` } }) });
}
export {
  w as STREAM_CONVERGENCE_DEFAULTS,
  I as StreamConvergenceBackground
};
