import { jsxs as te, jsx as V } from "react/jsx-runtime";
import { useRef as x, useEffect as re } from "react";
import { NXA_ENERGY_ORB_VERTEX_SHADER as ne, NXA_ENERGY_ORB_CONFIGURABLE_FRAGMENT_SHADER as oe } from "./energyOrbShaders.js";
const X = {
  speed: 1,
  scale: 1,
  smokeScale: 1,
  smokeStrength: 1,
  smokeSpeed: 1,
  hue: 0,
  saturation: 1,
  glow: 1,
  starDensity: 1,
  starSpeed: 1,
  starSize: 1,
  brightness: 1,
  opacity: 1
};
function W(r, u, a) {
  const c = r.createShader(u);
  if (!c) throw new Error("Unable to create energy-orb shader");
  if (r.shaderSource(c, a), r.compileShader(c), !r.getShaderParameter(c, r.COMPILE_STATUS)) {
    const b = r.getShaderInfoLog(c) ?? "Energy orb shader compilation failed";
    throw console.error(b), new Error(b);
  }
  return c;
}
function S(r, u) {
  return Math.abs(Math.sin(r * 91.173 + u * 17.719) * 43758.5453) % 1;
}
function ae(r) {
  return Array.from({ length: r }, (u, a) => ({
    x: S(a, 1),
    y: S(a, 2),
    depth: 0.25 + S(a, 3) * 0.75,
    phase: S(a, 4) * Math.PI * 2,
    drift: 0.35 + S(a, 5) * 0.65,
    size: 0.45 + S(a, 6) * 1.15
  }));
}
function I(r) {
  return r - Math.floor(r);
}
function he({ className: r = "", ...u }) {
  const a = x(null), c = x(null), b = x(null), A = x({ ...X, ...u });
  A.current = { ...X, ...u }, re(() => {
    const w = a.current, d = c.current, g = b.current;
    if (!w || !d || !g) return;
    const s = d.getContext("2d", { alpha: !0 }), e = g.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!s || !e) return;
    const L = W(e, e.VERTEX_SHADER, ne), k = W(e, e.FRAGMENT_SHADER, oe), t = e.createProgram();
    if (!t) {
      e.deleteShader(L), e.deleteShader(k);
      return;
    }
    if (e.attachShader(t, L), e.attachShader(t, k), e.linkProgram(t), !e.getProgramParameter(t, e.LINK_STATUS)) {
      const o = e.getProgramInfoLog(t) ?? "Energy orb program link failed";
      throw console.error(o), new Error(o);
    }
    e.useProgram(t);
    const N = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, N), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), e.STATIC_DRAW);
    const O = e.getAttribLocation(t, "p");
    e.enableVertexAttribArray(O), e.vertexAttribPointer(O, 2, e.FLOAT, !1, 0, 0);
    const m = {
      time: e.getUniformLocation(t, "uT"),
      resolution: e.getUniformLocation(t, "uR"),
      smokeScale: e.getUniformLocation(t, "uSmokeScale"),
      smokeStrength: e.getUniformLocation(t, "uSmokeStrength"),
      smokeSpeed: e.getUniformLocation(t, "uSmokeSpeed"),
      hue: e.getUniformLocation(t, "uHue"),
      saturation: e.getUniformLocation(t, "uSaturation"),
      glow: e.getUniformLocation(t, "uGlow")
    };
    e.enable(e.BLEND), e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA), e.clearColor(0, 0, 0, 0);
    const B = ae(180), P = window.matchMedia("(prefers-reduced-motion: reduce)");
    let T = P.matches, E = 1, M = 1, R = 1, f = 0, v = !0;
    const j = performance.now(), D = () => {
      const o = w.getBoundingClientRect();
      E = Math.max(1, o.width), M = Math.max(1, o.height);
      const n = Math.min(window.devicePixelRatio || 1, 2), h = Math.max(1, Math.round(E * n)), l = Math.max(1, Math.round(M * n));
      (g.width !== h || g.height !== l) && (g.width = h, g.height = l), e.viewport(0, 0, h, l), e.uniform2f(m.resolution, h, l), R = Math.min(window.devicePixelRatio || 1, 1.5);
      const p = Math.max(1, Math.round(E * R)), _ = Math.max(1, Math.round(M * R));
      (d.width !== p || d.height !== _) && (d.width = p, d.height = _);
    }, q = (o) => {
      const n = A.current;
      s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, d.width, d.height);
      const h = Math.max(0, n.starDensity), l = Math.min(B.length, Math.round(E * M / 4200 * h));
      if (!l) return;
      s.setTransform(R, 0, 0, R, 0, 0), s.globalCompositeOperation = "screen";
      const p = T ? 0 : o * Math.max(0, n.starSpeed), _ = I((252 + n.hue) / 360) * 360;
      for (let F = 0; F < l; F += 1) {
        const i = B[F], K = I(i.x + p * 22e-4 * i.drift) * E, Q = I(i.y - p * 8e-4 * i.depth + 1) * M, J = T ? 0.78 : 0.58 + Math.sin(p * (0.8 + i.depth) + i.phase) * 0.24, Z = Math.max(0.08, J * (0.22 + i.depth * 0.48)), ee = Math.max(0.35, i.size * i.depth * Math.max(0.25, n.starSize));
        s.fillStyle = `hsla(${_}, 84%, ${72 + i.depth * 20}%, ${Z})`, s.beginPath(), s.arc(K, Q, ee, 0, Math.PI * 2), s.fill();
      }
      s.globalCompositeOperation = "source-over";
    }, H = (o) => {
      f = 0;
      const n = A.current, h = (o - j) * 1e-3;
      q(h), e.uniform1f(m.time, h * n.speed), e.uniform1f(m.smokeScale, Math.max(0.01, n.smokeScale)), e.uniform1f(m.smokeStrength, Math.max(0, n.smokeStrength)), e.uniform1f(m.smokeSpeed, Math.max(0, n.smokeSpeed)), e.uniform1f(m.hue, n.hue * Math.PI / 180), e.uniform1f(m.saturation, Math.max(0, n.saturation)), e.uniform1f(m.glow, Math.max(0, n.glow)), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLES, 0, 3), v && !document.hidden && (f = requestAnimationFrame(H));
    }, C = () => {
      !f && v && !document.hidden && (f = requestAnimationFrame(H));
    }, U = () => {
      f && cancelAnimationFrame(f), f = 0;
    }, z = () => {
      document.hidden ? U() : C();
    }, G = (o) => {
      T = o.matches;
    }, $ = new ResizeObserver(D), Y = new IntersectionObserver(([o]) => {
      v = o?.isIntersecting ?? !0, v ? C() : U();
    });
    return $.observe(w), Y.observe(w), document.addEventListener("visibilitychange", z), P.addEventListener("change", G), D(), C(), () => {
      U(), $.disconnect(), Y.disconnect(), document.removeEventListener("visibilitychange", z), P.removeEventListener("change", G), e.deleteBuffer(N), e.deleteShader(L), e.deleteShader(k), e.deleteProgram(t);
    };
  }, []);
  const y = A.current;
  return /* @__PURE__ */ te("div", { ref: a, className: `threeui-background energy-orb${r ? ` ${r}` : ""}`, style: { background: "#05030e" }, children: [
    /* @__PURE__ */ V("canvas", { ref: c, className: "energy-orb__stars", "aria-hidden": "true", style: { zIndex: 0, pointerEvents: "none" } }),
    /* @__PURE__ */ V("canvas", { ref: b, className: "energy-orb__shader", "aria-hidden": "true", style: { zIndex: 1, opacity: y.opacity, filter: `brightness(${y.brightness})`, transform: `scale(${y.scale})`, pointerEvents: "none" } })
  ] });
}
export {
  X as ENERGY_ORB_DEFAULTS,
  he as EnergyOrb
};
