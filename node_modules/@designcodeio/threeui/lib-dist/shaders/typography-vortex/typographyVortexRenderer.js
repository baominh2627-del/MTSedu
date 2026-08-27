function q(s) {
  return s === "light" || s === 1 || s === "1" ? "light" : "dark";
}
const P = (s, v, k) => Math.max(v, Math.min(k, s)), N = (s, v, k) => s + (v - s) * k, mt = (s) => () => {
  s |= 0, s = s + 1831565813 | 0;
  let v = Math.imul(s ^ s >>> 15, 1 | s);
  return v = v + Math.imul(v ^ v >>> 7, 61 | v) ^ v, ((v ^ v >>> 14) >>> 0) / 4294967296;
};
function pt(s, v, k) {
  const i = v.getContext("2d"), C = document.createElement("canvas"), a = C.getContext("2d", { willReadFrequently: !0 });
  if (!i || !a) return () => {
  };
  const A = window.matchMedia("(prefers-reduced-motion: reduce)").matches, m = Math.min(window.devicePixelRatio || 1, 2), l = { x: 0, y: 0, inside: !1 }, g = { x: 0, y: 0, started: 0, until: 0 };
  let S = 0, w = 0, D = [], G = [], $ = [], L = 0, U = 0, V = 0, O = 0, st = 0, R = 0, Y = !0, H = "";
  const rt = () => {
    const n = k(), o = n.phrase || "SABLE / SYSTEMS IN MOTION / ", r = mt(122), p = '"ThreeUI Fragment Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', u = Math.max(m, 1.5), I = Math.hypot(Math.max(S * 0.55, S * 0.48), Math.max(w * 0.52, w * 0.5)) + 40;
    D = [];
    let t = Math.max(26, S * 0.038), M = 0;
    for (; t < I; ) {
      const f = M % 3 === 2, d = {
        radius: t,
        fontSize: P(7 + t * 0.015, 7, 17),
        alpha: P(0.34 + t / I, 0.36, 0.92) * (f ? 0.72 : 1) * n.opacity,
        speed: (0.05 + 40 / (t + 60)) * 0.35,
        offset: r() * Math.PI * 2,
        spacing: f ? 2.4 + r() * 1.2 : 1.02 + r() * 0.14,
        wobble: r() * Math.PI * 2
      }, y = Math.ceil((d.radius + d.fontSize * 2) * 2), x = document.createElement("canvas");
      x.width = x.height = Math.ceil(y * u);
      const c = x.getContext("2d");
      if (!c) break;
      c.scale(u, u), c.translate(y / 2, y / 2), c.font = `${d.fontSize}px ${p}`, c.textAlign = "center", c.textBaseline = "middle";
      const b = q(n.mode) === "light" ? "42,44,52" : "211,211,206";
      c.fillStyle = `rgba(${b},${d.alpha})`;
      const e = d.fontSize * 0.62 * d.spacing / d.radius, h = Math.max(4, Math.floor(Math.PI * 2 / e)), z = Math.PI * 2 / h;
      for (let E = 0; E < h; E += 1) {
        const F = E * z, T = o[E % o.length];
        T !== " " && (c.save(), c.translate(Math.cos(F) * d.radius, Math.sin(F) * d.radius), c.rotate(F + Math.PI / 2), c.fillText(T, 0, 0), c.restore());
      }
      D.push({ ...d, bitmap: x, size: y }), t *= Math.max(1.08, n.ringGrowth), M += 1;
    }
    G = [];
    for (let f = 0; f < 34; f += 1)
      G.push({
        radius: 30 + r() * (I - 60),
        angle: r() * Math.PI * 2,
        speed: (r() - 0.5) * 0.06,
        character: o[r() * o.length | 0],
        alpha: (0.18 + r() * 0.3) * n.opacity,
        fontSize: 8 + r() * 6
      });
  }, j = () => {
    const n = s.getBoundingClientRect();
    S = Math.max(1, n.width), w = Math.max(1, n.height), v.width = Math.round(S * m), v.height = Math.round(w * m), C.width = Math.round(S * m), C.height = Math.round(w * m), i.setTransform(m, 0, 0, m, 0, 0), a.setTransform(m, 0, 0, m, 0, 0), $ = [], H = "";
  }, ct = (n, o) => {
    const r = k();
    if (A || n < g.until || !l.inside || L < 0.08 || n - U < 44) return;
    U = n;
    const p = Math.max(0, Math.floor((l.x - o) * m)), u = Math.max(0, Math.floor((l.y - o) * m)), I = Math.min(C.width, Math.ceil((l.x + o) * m)), t = Math.min(C.height, Math.ceil((l.y + o) * m));
    if (I <= p || t <= u) return;
    const M = I - p, f = t - u, d = a.getImageData(p, u, M, f).data, y = Math.max(4, Math.round(4.5 * m)), x = Math.max(1, Math.round(44 * r.particleAmount));
    let c = 0;
    for (let e = 0; e < f && c < x; e += y)
      for (let h = 0; h < M && c < x; h += y) {
        const z = (e * M + h) * 4;
        if (d[z + 3] < 34 || Math.random() > 0.34) continue;
        const F = (p + h) / m, T = (u + e) / m, tt = F - l.x, et = T - l.y, B = Math.hypot(tt, et);
        if (B > o || B < o * 0.16) continue;
        const nt = tt / Math.max(1, B), at = et / Math.max(1, B), ot = 0.35 + Math.random() * 1.35, it = (Math.random() - 0.5) * 1.4;
        $.push({
          x: F,
          y: T,
          velocityX: nt * ot - at * it + (Math.random() - 0.5) * 0.35,
          velocityY: at * ot + nt * it - 0.15 + Math.random() * 0.55,
          size: 0.65 + Math.random() * 1.55,
          life: 560 + Math.random() * 620,
          maxLife: 1180,
          phase: Math.random() * Math.PI * 2,
          spin: Math.random() > 0.5 ? 1 : -1,
          color: `${d[z]},${d[z + 1]},${d[z + 2]}`,
          sucked: !1
        }), c += 1;
      }
    const b = Math.max(1, Math.round(720 * r.particleAmount));
    $.length > b && $.splice(0, $.length - b);
  }, lt = (n, o) => {
    const r = k();
    if (A || n < g.until || n - V < 115) return;
    V = n;
    const p = Math.min(S, o * 1.12), u = Math.max(1, Math.floor(p * m)), I = Math.max(1, Math.floor(w * m)), t = a.getImageData(0, 0, u, I).data, M = Math.max(1, Math.round(16 * r.particleAmount));
    let f = 0;
    for (let y = 0; y < 520 && f < M; y += 1) {
      const x = Math.random() * u | 0, c = Math.random() * I | 0, b = (c * u + x) * 4;
      if (t[b + 3] < 32) continue;
      const e = x / m, h = c / m, z = P(e / p, 0, 1);
      $.push({
        x: e,
        y: h,
        velocityX: 0.18 + Math.random() * 0.8 + z * 0.35,
        velocityY: (Math.random() - 0.5) * 0.8,
        size: 0.55 + Math.random() * 1.35,
        life: 620 + Math.random() * 520,
        maxLife: 1140,
        phase: Math.random() * Math.PI * 2,
        spin: Math.random() > 0.5 ? 1 : -1,
        color: `${t[b]},${t[b + 1]},${t[b + 2]}`,
        sucked: !1
      }), f += 1;
    }
    const d = Math.max(1, Math.round(720 * r.particleAmount));
    $.length > d && $.splice(0, $.length - d);
  }, dt = (n, o) => {
    const r = k(), p = P(o / 16.67, 0.25, 3), u = !A && n < g.until, I = [];
    for (const t of $) {
      if (t.life -= o, t.life <= 0 || t.sucked && !u) continue;
      let M = 1 / 0;
      if (u && t.sucked) {
        const x = g.x - t.x, c = g.y - t.y;
        if (M = Math.hypot(x, c), M < 5) continue;
        const b = P(M * 0.078, 3.2, 28), e = 1 - Math.pow(0.76, p);
        t.velocityX = N(t.velocityX, x / M * b, e), t.velocityY = N(t.velocityY, c / M * b, e);
      } else {
        const x = Math.sin(n * 24e-4 + t.phase) * 0.018 * t.spin;
        t.velocityX += Math.cos(t.phase + n * 17e-4) * 0.012 * p - x * t.velocityY, t.velocityY += 0.018 * p + x * t.velocityX, t.velocityX *= Math.pow(0.987, p), t.velocityY *= Math.pow(0.991, p);
      }
      t.x += t.velocityX * p, t.y += t.velocityY * p;
      const f = u && t.sucked ? P(M / 42, 0.12, 1) : 1, d = P(t.life / Math.min(t.maxLife, 820), 0, 1) * f * r.opacity;
      i.fillStyle = `rgba(${t.color},${d * 0.88})`;
      const y = t.size * (0.5 + d * 0.5);
      i.fillRect(t.x - y * 0.5, t.y - y * 0.5, y, y), I.push(t);
    }
    if ($ = I, u) {
      const t = P((n - g.started) / (g.until - g.started), 0, 1);
      i.save();
      const M = q(k().mode) === "light" ? "42,44,52" : "218,218,212", f = q(k().mode) === "light" ? "28,30,38" : "226,226,220";
      i.strokeStyle = `rgba(${M},${(1 - t) * 0.34 * r.opacity})`, i.lineWidth = 1, i.beginPath(), i.arc(g.x, g.y, 5 + t * 22, 0, Math.PI * 2), i.stroke(), i.fillStyle = `rgba(${f},${(1 - t) * 0.62 * r.opacity})`, i.fillRect(g.x - 1, g.y - 1, 2, 2), i.restore();
    }
  }, ht = (n) => {
    const o = k(), r = q(o.mode) === "light", p = `${o.mode}|${o.phrase}|${o.ringGrowth}|${o.opacity}|${S}|${w}`;
    p !== H && (H = p, rt()), i.clearRect(0, 0, S, w), i.fillStyle = r ? "#eef1f6" : "#151515", i.fillRect(0, 0, S, w), a.clearRect(0, 0, S, w);
    const u = Math.min(n - (O || n), 100);
    O = n;
    const I = l.inside && !A ? 1 : 0;
    L = N(L, I, 1 - Math.pow(0.78, u / 16.6)), L < 2e-3 && (L = 0);
    const t = S * 0.52, M = w * 0.485, f = n / 1e3 * o.speed, d = r ? "42,44,52" : "198,198,193", y = r ? "48,50,58" : "188,188,183";
    i.save(), i.translate(t, M), i.strokeStyle = `rgba(${d},${(r ? 0.1 : 0.065) * o.opacity})`, i.lineWidth = 1, i.setLineDash([1, 5]);
    for (const e of D)
      i.beginPath(), i.arc(0, 0, e.radius * 1.115, 0, Math.PI * 2), i.stroke();
    i.restore(), a.save(), a.translate(t, M);
    for (const e of D) {
      const h = e.offset + f * e.speed + Math.sin(f * 0.11 + e.wobble) * 0.02;
      a.save(), a.rotate(h), a.drawImage(e.bitmap, -e.size / 2, -e.size / 2, e.size, e.size), a.restore();
    }
    const x = '"ThreeUI Fragment Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';
    a.textAlign = "center", a.textBaseline = "middle";
    for (const e of G) {
      const h = e.angle + f * e.speed;
      a.font = `${e.fontSize}px ${x}`, a.fillStyle = `rgba(${y},${e.alpha})`, a.save(), a.translate(Math.cos(h) * e.radius, Math.sin(h) * e.radius), a.rotate(h + Math.PI / 2), a.fillText(e.character, 0, 0), a.restore();
    }
    a.restore();
    const c = P(S * 0.22, 108, 180), b = P(Math.min(S, w) * 0.24, 128, 196) * o.dissolveRadius;
    if (lt(n, c), ct(n, b), !A) {
      a.save(), a.globalCompositeOperation = "destination-out";
      const e = a.createLinearGradient(0, 0, c, 0);
      e.addColorStop(0, "rgba(0,0,0,.98)"), e.addColorStop(0.34, "rgba(0,0,0,.88)"), e.addColorStop(0.72, "rgba(0,0,0,.36)"), e.addColorStop(1, "rgba(0,0,0,0)"), a.fillStyle = e, a.fillRect(0, 0, c, w), a.restore();
    }
    if (L > 2e-3) {
      const e = b * (0.42 + L * 0.58);
      a.save(), a.globalCompositeOperation = "destination-out";
      const h = a.createRadialGradient(l.x, l.y, e * 0.06, l.x, l.y, e);
      h.addColorStop(0, "rgba(0,0,0,1)"), h.addColorStop(0.57, "rgba(0,0,0,.98)"), h.addColorStop(0.84, "rgba(0,0,0,.42)"), h.addColorStop(1, "rgba(0,0,0,0)"), a.fillStyle = h, a.beginPath(), a.arc(l.x, l.y, e, 0, Math.PI * 2), a.fill(), a.restore();
    }
    if (i.drawImage(C, 0, 0, C.width, C.height, 0, 0, S, w), dt(n, u), L > 0.02) {
      i.save();
      const e = r ? "42,44,52" : "210,210,205";
      i.strokeStyle = `rgba(${e},${(0.08 + L * 0.13) * o.opacity})`, i.lineWidth = 1, i.setLineDash([2, 6]), i.beginPath(), i.arc(l.x, l.y, b * (0.42 + L * 0.58), 0, Math.PI * 2), i.stroke(), i.restore();
    }
    if (++st % 5 === 0) {
      const e = !A && n < g.until;
      s.dataset.dissolveState = A ? "reduced" : e ? "suction" : l.inside ? "active" : L > 0.02 ? "recovering" : "ambient", s.dataset.suctionState = e ? "active" : "idle", s.dataset.particles = String($.length), s.dataset.dissolveStrength = L.toFixed(2);
    }
  }, W = (n) => {
    ht(n), R = Y && !document.hidden ? requestAnimationFrame(W) : 0;
  }, X = (n) => {
    const o = s.getBoundingClientRect();
    l.x = P(n.clientX - o.left, 0, o.width), l.y = P(n.clientY - o.top, 0, o.height), l.inside = !0;
  }, J = () => {
    l.inside = !1;
  }, K = (n) => {
    X(n);
    const o = k();
    g.x = l.x, g.y = l.y, g.started = performance.now(), g.until = g.started + o.suctionDuration;
    for (const r of $)
      r.sucked = !0, r.life = Math.max(r.life, o.suctionDuration + 20), r.maxLife = Math.max(r.maxLife, o.suctionDuration + 20);
    s.dataset.suctionState = "active";
  }, Q = () => {
    !document.hidden && Y && !R && (R = requestAnimationFrame(W));
  }, Z = new ResizeObserver(j), _ = new IntersectionObserver(([n]) => {
    Y = n?.isIntersecting ?? !0, Y && !R && !document.hidden && (R = requestAnimationFrame(W)), !Y && R && (cancelAnimationFrame(R), R = 0);
  });
  return s.addEventListener("pointerenter", X), s.addEventListener("pointermove", X), s.addEventListener("pointerleave", J), s.addEventListener("pointerdown", K), document.addEventListener("visibilitychange", Q), Z.observe(s), _.observe(s), j(), R = requestAnimationFrame(W), () => {
    R && cancelAnimationFrame(R), Z.disconnect(), _.disconnect(), s.removeEventListener("pointerenter", X), s.removeEventListener("pointermove", X), s.removeEventListener("pointerleave", J), s.removeEventListener("pointerdown", K), document.removeEventListener("visibilitychange", Q);
  };
}
export {
  pt as createTypographyVortexRenderer
};
