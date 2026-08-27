const A = {
  speed: 1,
  dropAmount: 1,
  opacity: 1
};
function S(M, v) {
  const l = M.getContext("2d");
  if (!l) throw new Error("Condensation requires Canvas 2D");
  let u = 1, g = 1, n = 1, p = 1, m = 120, x = 120, C = 0, y = 0, b = 0, s = [], d = [];
  const f = /* @__PURE__ */ new Map(), P = (a) => {
    const e = Math.max(0.5, Math.round(a * 2) / 2), r = f.get(e);
    if (r) return r;
    const t = Math.ceil(2 * n), h = Math.ceil(e * 2 + t * 2), o = document.createElement("canvas");
    o.width = h, o.height = h;
    const i = o.getContext("2d");
    if (!i) throw new Error("Condensation bubble sprite unavailable");
    const c = h / 2, w = e / (4.4 * n);
    return i.fillStyle = `rgba(96,139,196,${0.18 + w * 0.22})`, i.beginPath(), i.arc(c, c, e, 0, Math.PI * 2), i.fill(), i.strokeStyle = `rgba(70,98,148,${0.35 + w * 0.35})`, i.lineWidth = 0.9 * n, i.stroke(), i.fillStyle = `rgba(255,255,255,${0.32 + w * 0.3})`, i.beginPath(), i.arc(
      c - e * 0.32,
      c - e * 0.36,
      Math.max(0.45 * n, e * 0.24),
      0,
      Math.PI * 2
    ), i.fill(), f.set(e, o), o;
  }, E = (a = 0) => {
    const e = 8 * n, r = Math.max(1, u - e * 2), t = Math.max(1, p - e * 2);
    s.push({
      x: e + Math.random() * r,
      y: e + Math.random() * t,
      r: (0.5 + a * 0.7) * n,
      rMax: (2.1 + Math.random() * 2.3) * n,
      grow: (22e-4 + Math.random() * 32e-4) * n,
      running: !1,
      vy: 0
    });
  }, D = (a, e) => {
    n = Math.min(window.devicePixelRatio || 1, 2), u = M.width = Math.max(1, Math.floor(a * n)), g = M.height = Math.max(1, Math.floor(e * n)), M.style.width = `${a}px`, M.style.height = `${e}px`, p = Math.max(1, g - 2 * n), m = Math.max(80, Math.min(240, Math.round(u * g / (n * n) / 5200))), x = Math.round(m * v().dropAmount), s = [], d = [], f.clear();
    const r = Math.round(x * 0.62);
    for (let t = 0; t < r; t += 1) E(Math.random() * 3);
  }, I = (a, e = 1) => {
    s.length < x && Math.random() < 0.34 * e && E(), a - C > 6400 && (C = a, s.filter((r) => !r.running).sort((r, t) => t.r - r.r).slice(0, 3).forEach((r) => {
      r.running = !0, r.vy = 0.35 * n;
    }));
    for (let r = s.length - 1; r >= 0; r -= 1) {
      const t = s[r];
      if (!t.running) {
        t.r += t.grow * e, t.r >= t.rMax && (t.running = !0, t.vy = 0.3 * n);
        continue;
      }
      t.vy = Math.min(t.vy + 0.075 * n * e, 5.4 * n), t.y += t.vy * e;
      for (let h = s.length - 1; h >= 0; h -= 1) {
        const o = s[h];
        if (o === t || o.running) continue;
        const i = Math.abs(o.x - t.x) < t.r + o.r + 1.5 * n, c = o.y > t.y - t.r && o.y < t.y + t.vy + t.r;
        i && c && (t.r = Math.sqrt(t.r * t.r + o.r * o.r), s.splice(h, 1), h < r && (r -= 1));
      }
      t.y >= p && (d.push({ x: t.x, y: p, r0: t.r, born: a }), s.splice(r, 1));
    }
    d = d.filter((r) => a - r.born < 760);
  }, $ = (a) => {
    l.clearRect(0, 0, u, g), s.forEach((e) => {
      const r = P(e.r);
      l.drawImage(r, e.x - r.width / 2, e.y - r.height / 2);
    }), d.forEach((e) => {
      const r = (a - e.born) / 760;
      if (r < 0 || r > 1) return;
      const t = e.r0 + r * 16 * n;
      l.strokeStyle = `rgba(75,108,158,${(1 - r) * 0.52})`, l.lineWidth = 1.1 * n, l.beginPath(), l.ellipse(e.x, e.y, t, t * 0.34, 0, 0, Math.PI * 2), l.stroke();
    });
  };
  return {
    resize: D,
    render(a) {
      const e = v();
      x = Math.round(m * e.dropAmount);
      const r = b ? Math.min(50, a - b) : 16.67;
      b = a, y += r * e.speed, I(y, e.speed), $(y);
    },
    dispose() {
      s = [], d = [], f.clear();
    }
  };
}
export {
  A as CONDENSATION_DEFAULTS,
  S as createCondensationRenderer
};
