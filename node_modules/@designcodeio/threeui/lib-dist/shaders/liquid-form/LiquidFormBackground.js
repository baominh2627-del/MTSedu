import { jsx as T } from "react/jsx-runtime";
import { useRef as R, useEffect as D } from "react";
import { VELOX_VERTEX_SHADER as O, VELOX_FRAGMENT_SHADER as V } from "./liquidFormShaders.js";
const P = { speed: 1, morph: 1, noiseScale: 1, mouseAmount: 0.15, metal: 1, camera: 5.5, tintHue: 220, tintAmount: 0 };
function I(n, c, u) {
  const i = n.createShader(c);
  if (!i) throw new Error("Unable to create Velox shader");
  if (n.shaderSource(i, u), n.compileShader(i), !n.getShaderParameter(i, n.COMPILE_STATUS)) throw new Error(n.getShaderInfoLog(i) ?? "Velox shader compilation failed");
  return i;
}
function C({ className: n = "", ...c }) {
  const u = R(null), i = R(null), l = R({ ...P, ...c });
  l.current = { ...P, ...c }, D(() => {
    const d = u.current, o = i.current;
    if (!d || !o) return;
    const e = o.getContext("webgl", { alpha: !1, antialias: !1, powerPreference: "high-performance" });
    if (!e) return;
    const _ = I(e, e.VERTEX_SHADER, O), S = I(e, e.FRAGMENT_SHADER, V), t = e.createProgram();
    if (!t) return;
    if (e.attachShader(t, _), e.attachShader(t, S), e.linkProgram(t), !e.getProgramParameter(t, e.LINK_STATUS)) throw new Error(e.getProgramInfoLog(t) ?? "Velox program link failed");
    e.useProgram(t);
    const v = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, v), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), e.STATIC_DRAW);
    const E = e.getAttribLocation(t, "a_pos");
    e.enableVertexAttribArray(E), e.vertexAttribPointer(E, 2, e.FLOAT, !1, 0, 0);
    const s = {
      resolution: e.getUniformLocation(t, "u_res"),
      time: e.getUniformLocation(t, "u_time"),
      mouse: e.getUniformLocation(t, "u_mouse"),
      morph: e.getUniformLocation(t, "u_morph"),
      noiseScale: e.getUniformLocation(t, "u_noise_scale"),
      mouseAmount: e.getUniformLocation(t, "u_mouse_amount"),
      metal: e.getUniformLocation(t, "u_metal"),
      camera: e.getUniformLocation(t, "u_camera")
    };
    let L = 0, w = 0, g = 0, A = 0, a = 0, h = !0;
    const B = performance.now(), b = () => {
      const m = d.getBoundingClientRect(), r = Math.min(window.devicePixelRatio || 1, 1.5);
      o.width = Math.max(1, Math.round(m.width * r)), o.height = Math.max(1, Math.round(m.height * r)), e.viewport(0, 0, o.width, o.height);
    }, F = (m) => {
      const r = o.getBoundingClientRect();
      L = (m.clientX - r.left) / Math.max(1, r.width) * 2 - 1, w = -((m.clientY - r.top) / Math.max(1, r.height) * 2 - 1);
    }, p = (m) => {
      const r = l.current;
      g += (L - g) * 0.05, A += (w - A) * 0.05, e.uniform2f(s.resolution, o.width, o.height), e.uniform1f(s.time, (m - B) * 1e-3 * r.speed), e.uniform2f(s.mouse, g, A), e.uniform1f(s.morph, r.morph), e.uniform1f(s.noiseScale, r.noiseScale), e.uniform1f(s.mouseAmount, r.mouseAmount), e.uniform1f(s.metal, r.metal), e.uniform1f(s.camera, r.camera), e.drawArrays(e.TRIANGLE_STRIP, 0, 4), a = h && !document.hidden ? requestAnimationFrame(p) : 0;
    }, x = new ResizeObserver(b), U = new IntersectionObserver(([m]) => {
      h = m?.isIntersecting ?? !0, h && !a && (a = requestAnimationFrame(p)), !h && a && (cancelAnimationFrame(a), a = 0);
    });
    return x.observe(d), U.observe(d), o.addEventListener("pointermove", F, { passive: !0 }), b(), a = requestAnimationFrame(p), () => {
      a && cancelAnimationFrame(a), x.disconnect(), U.disconnect(), o.removeEventListener("pointermove", F), e.deleteBuffer(v), e.deleteShader(_), e.deleteShader(S), e.deleteProgram(t);
    };
  }, []);
  const f = l.current, M = f.tintAmount > 0 ? ` sepia(${f.tintAmount}) saturate(${1 + f.tintAmount * 5}) hue-rotate(${f.tintHue - 35}deg)` : "";
  return /* @__PURE__ */ T("div", { ref: u, className: `threeui-background liquid-form${n ? ` ${n}` : ""}`, children: /* @__PURE__ */ T("canvas", { ref: i, style: { filter: M.trim() || void 0 } }) });
}
export {
  P as LIQUID_FORM_DEFAULTS,
  C as LiquidFormBackground
};
