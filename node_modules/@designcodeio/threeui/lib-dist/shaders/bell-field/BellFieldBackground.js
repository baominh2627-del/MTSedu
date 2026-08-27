import { jsxs as Z, jsx as Y } from "react/jsx-runtime";
import { useRef as R, useEffect as ee } from "react";
import { BELL_FIELD_VERTEX_SHADER as te, BELL_FIELD_FRAGMENT_SHADER as re } from "./bellFieldShaders.js";
const H = { speed: 1, pointerAmount: 1, strikeDuration: 2400, emberAmount: 1, brightness: 1, opacity: 1, hue: 0, saturation: 1 };
function N(s, g, p) {
  const d = s.createShader(g);
  if (!d) throw new Error("Unable to create Bell Field shader");
  if (s.shaderSource(d, p), s.compileShader(d), !s.getShaderParameter(d, s.COMPILE_STATUS)) throw new Error(s.getShaderInfoLog(d) ?? "Bell Field shader compilation failed");
  return d;
}
function ae({ className: s = "", ...g }) {
  const p = R(null), d = R(null), _ = R(null), A = R({ ...H, ...g });
  A.current = { ...H, ...g }, ee(() => {
    const m = p.current, i = d.current, w = _.current;
    if (!m || !i || !w) return;
    const e = i.getContext("webgl"), u = w.getContext("2d");
    if (!e || !u) return;
    const I = N(e, e.VERTEX_SHADER, te), T = N(e, e.FRAGMENT_SHADER, re), n = e.createProgram();
    if (!n) return;
    if (e.attachShader(n, I), e.attachShader(n, T), e.linkProgram(n), !e.getProgramParameter(n, e.LINK_STATUS)) throw new Error(e.getProgramInfoLog(n) ?? "Bell Field program link failed");
    e.useProgram(n);
    const B = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, B), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]), e.STATIC_DRAW);
    const k = e.getAttribLocation(n, "position");
    e.enableVertexAttribArray(k), e.vertexAttribPointer(k, 2, e.FLOAT, !1, 0, 0);
    const q = e.getUniformLocation(n, "u_resolution"), G = e.getUniformLocation(n, "u_time"), V = e.getUniformLocation(n, "u_mouse"), j = e.getUniformLocation(n, "u_strike");
    let a = 1, h = 1, f = 1, x = 0.5, E = 0.5, L = 0.5, S = 0.5, c = 0, b = !0, P = !1, D = -1e9;
    const K = performance.now(), U = Array.from({ length: 58 }, () => ({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.4, vy: -(0.1 + Math.random() * 0.26), vx: (Math.random() - 0.5) * 0.08, ph: Math.random() * Math.PI * 2, sp: 0.5 + Math.random() * 1.4, hot: Math.random() < 0.36 })), C = () => {
      const o = m.getBoundingClientRect();
      a = Math.max(1, o.width), h = Math.max(1, o.height), f = Math.min(window.devicePixelRatio || 1, 2), i.width = Math.max(1, Math.round(a * f)), i.height = Math.max(1, Math.round(h * f)), w.width = i.width, w.height = i.height, u.setTransform(f, 0, 0, f, 0, 0), e.viewport(0, 0, i.width, i.height), e.uniform2f(q, i.width, i.height), P || (x = L = a * 0.5, E = S = h * 0.5, P = !0), U.forEach((r) => {
        r.x <= 1 && (r.x *= a), r.y <= 1 && (r.y *= h);
      });
    }, $ = (o) => {
      const r = m.getBoundingClientRect(), l = A.current.pointerAmount;
      L = a * 0.5 + (o.clientX - r.left - a * 0.5) * l, S = h * 0.5 + (o.clientY - r.top - h * 0.5) * l;
    }, M = () => {
      D = performance.now();
    }, W = window.setTimeout(M, 1700), J = window.setInterval(M, 8200), F = (o) => {
      const r = A.current, l = o * 1e-3 * r.speed;
      x += (L - x) * 0.04, E += (S - E) * 0.04, e.uniform1f(G, (o - K) * 1e-3 * r.speed), e.uniform1f(j, Math.min(1, Math.max(0, (o - D) / r.strikeDuration))), e.uniform2f(V, x * f, E * f), e.drawArrays(e.TRIANGLES, 0, 6), u.clearRect(0, 0, a, h);
      const Q = Math.max(0, Math.min(58, Math.round(58 * r.emberAmount)));
      for (let y = 0; y < Q; y += 1) {
        const t = U[y];
        t.y += t.vy * r.speed, t.x += (t.vx + Math.sin(l * t.sp * 0.5 + t.ph) * 0.13) * r.speed, t.y < -4 && (t.y = h + 4, t.x = Math.random() * a), t.x < -4 && (t.x = a + 4), t.x > a + 4 && (t.x = -4);
        const X = 0.5 + 0.5 * Math.sin(l * t.sp + t.ph);
        u.beginPath(), u.arc(t.x, t.y, t.r, 0, Math.PI * 2), u.fillStyle = t.hot ? `rgba(231, 193, 101, ${0.06 + X * 0.34})` : `rgba(143, 203, 185, ${0.04 + X * 0.24})`, u.fill();
      }
      c = b && !document.hidden ? requestAnimationFrame(F) : 0;
    }, z = new ResizeObserver(C), O = new IntersectionObserver(([o]) => {
      b = o?.isIntersecting ?? !0, b && !c && (c = requestAnimationFrame(F)), !b && c && (cancelAnimationFrame(c), c = 0);
    });
    return z.observe(m), O.observe(m), m.addEventListener("pointermove", $, { passive: !0 }), m.addEventListener("pointerdown", M), C(), c = requestAnimationFrame(F), () => {
      c && cancelAnimationFrame(c), window.clearTimeout(W), window.clearInterval(J), z.disconnect(), O.disconnect(), m.removeEventListener("pointermove", $), m.removeEventListener("pointerdown", M), e.deleteBuffer(B), e.deleteShader(I), e.deleteShader(T), e.deleteProgram(n);
    };
  }, []);
  const v = A.current;
  return /* @__PURE__ */ Z("div", { ref: p, className: `threeui-background bell-field${s ? ` ${s}` : ""}`, style: { background: "#08100f", opacity: v.opacity, filter: `hue-rotate(${v.hue}deg) saturate(${v.saturation}) brightness(${v.brightness})` }, children: [
    /* @__PURE__ */ Y("canvas", { ref: d, style: { zIndex: 0 } }),
    /* @__PURE__ */ Y("canvas", { ref: _, style: { zIndex: 1, pointerEvents: "none" } })
  ] });
}
export {
  H as BELL_FIELD_DEFAULTS,
  ae as BellFieldBackground
};
