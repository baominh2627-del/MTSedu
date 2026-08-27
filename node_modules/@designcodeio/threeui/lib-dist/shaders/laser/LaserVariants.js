import { jsx as C } from "react/jsx-runtime";
import { useRef as p, useEffect as O } from "react";
import { LASER_VERTEX_SHADER as $, LASER_FRAGMENT_SHADER as j } from "./laserShaders.js";
const P = {
  variant: "atmospheric-blade",
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1
}, V = {
  "atmospheric-blade": 0,
  "vanishing-array": 1,
  "prism-aperture": 2,
  "halftone-relay": 3
};
function f(o, l, i) {
  return Math.min(i, Math.max(l, o));
}
function X(o, l, i) {
  const a = o.createShader(l);
  if (!a) throw new Error("Unable to create Laser shader");
  if (o.shaderSource(a, i), o.compileShader(a), !o.getShaderParameter(a, o.COMPILE_STATUS)) {
    const v = o.getShaderInfoLog(a) ?? "Laser shader compilation failed";
    throw o.deleteShader(a), new Error(v);
  }
  return a;
}
function W({ className: o = "", style: l, ...i }) {
  const a = p(null), v = p(null), L = p(() => {
  }), E = p({ ...P, ...i });
  E.current = { ...P, ...i }, O(() => {
    const c = a.current, d = v.current;
    if (!c || !d) return;
    const e = d.getContext("webgl", {
      alpha: !1,
      antialias: !1,
      powerPreference: "high-performance",
      premultipliedAlpha: !1
    });
    if (!e) return;
    const w = X(e, e.VERTEX_SHADER, $), A = X(e, e.FRAGMENT_SHADER, j), t = e.createProgram();
    if (!t) {
      e.deleteShader(w), e.deleteShader(A);
      return;
    }
    if (e.attachShader(t, w), e.attachShader(t, A), e.linkProgram(t), !e.getProgramParameter(t, e.LINK_STATUS)) {
      const r = e.getProgramInfoLog(t) ?? "Laser program link failed";
      throw e.deleteProgram(t), e.deleteShader(w), e.deleteShader(A), new Error(r);
    }
    const U = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, U), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    ), e.useProgram(t);
    const T = e.getAttribLocation(t, "a_position");
    e.enableVertexAttribArray(T), e.vertexAttribPointer(T, 2, e.FLOAT, !1, 0, 0);
    const s = {
      resolution: e.getUniformLocation(t, "u_resolution"),
      pointer: e.getUniformLocation(t, "u_pointer"),
      time: e.getUniformLocation(t, "u_time"),
      variant: e.getUniformLocation(t, "u_variant"),
      size: e.getUniformLocation(t, "u_size"),
      length: e.getUniformLocation(t, "u_length"),
      density: e.getUniformLocation(t, "u_density"),
      hue: e.getUniformLocation(t, "u_hue"),
      saturation: e.getUniformLocation(t, "u_saturation"),
      brightness: e.getUniformLocation(t, "u_brightness")
    }, R = window.matchMedia("(prefers-reduced-motion: reduce)");
    let h = R.matches, u = 0, S = !0, b = 0, _ = 0, y = 0, M = 0;
    const k = performance.now(), m = (r) => {
      const n = E.current, G = n.variant in V ? n.variant : P.variant;
      y += (b - y) * (h ? 1 : 0.055), M += (_ - M) * (h ? 1 : 0.055), e.useProgram(t), e.uniform2f(s.resolution, d.width, d.height), e.uniform2f(s.pointer, y, M), e.uniform1f(s.time, h ? 2.75 : (r - k) * 1e-3 * f(n.speed, 0, 3)), e.uniform1f(s.variant, V[G]), e.uniform1f(s.size, f(n.size, 0.35, 2.5)), e.uniform1f(s.length, f(n.length, 0.35, 2.5)), e.uniform1f(s.density, f(n.density, 0.25, 2.5)), e.uniform1f(s.hue, f(n.hue, -180, 180)), e.uniform1f(s.saturation, f(n.saturation, 0, 2)), e.uniform1f(s.brightness, f(n.brightness, 0.35, 1.65)), e.drawArrays(e.TRIANGLES, 0, 6);
    }, x = () => {
      !h && S && !document.hidden && !u && (u = window.requestAnimationFrame(H));
    };
    function H(r) {
      u = 0, m(r), x();
    }
    const g = () => {
      if (h || !S || document.hidden) {
        u && window.cancelAnimationFrame(u), u = 0, m(performance.now());
        return;
      }
      x();
    };
    L.current = () => m(performance.now());
    const F = () => {
      const r = c.getBoundingClientRect(), n = Math.min(window.devicePixelRatio || 1, 1.5);
      d.width = Math.max(1, Math.round(r.width * n)), d.height = Math.max(1, Math.round(r.height * n)), e.viewport(0, 0, d.width, d.height), m(performance.now());
    }, I = (r) => {
      const n = c.getBoundingClientRect();
      b = (r.clientX - n.left) / Math.max(1, n.width) * 2 - 1, _ = -((r.clientY - n.top) / Math.max(1, n.height) * 2 - 1), h && m(performance.now());
    }, z = () => {
      b = 0, _ = 0, h && m(performance.now());
    }, D = (r) => {
      h = r.matches, g();
    }, B = new ResizeObserver(F), N = new IntersectionObserver(([r]) => {
      S = r?.isIntersecting ?? !0, g();
    });
    return B.observe(c), N.observe(c), c.addEventListener("pointermove", I, { passive: !0 }), c.addEventListener("pointerleave", z, { passive: !0 }), document.addEventListener("visibilitychange", g), R.addEventListener("change", D), F(), g(), () => {
      u && window.cancelAnimationFrame(u), B.disconnect(), N.disconnect(), c.removeEventListener("pointermove", I), c.removeEventListener("pointerleave", z), document.removeEventListener("visibilitychange", g), R.removeEventListener("change", D), L.current = () => {
      }, e.deleteBuffer(U), e.deleteShader(w), e.deleteShader(A), e.deleteProgram(t);
    };
  }, []), O(() => {
    L.current();
  }, [i.variant, i.speed, i.size, i.length, i.density, i.hue, i.saturation, i.brightness]);
  const Y = f(E.current.opacity, 0.05, 1);
  return /* @__PURE__ */ C(
    "div",
    {
      ref: a,
      className: `threeui-background laser-variant${o ? ` ${o}` : ""}`,
      style: { background: "#020305", ...l },
      children: /* @__PURE__ */ C("canvas", { ref: v, "aria-hidden": "true", style: { opacity: Y, pointerEvents: "none" } })
    }
  );
}
export {
  P as LASER_VARIANT_DEFAULTS,
  W as LaserVariants
};
