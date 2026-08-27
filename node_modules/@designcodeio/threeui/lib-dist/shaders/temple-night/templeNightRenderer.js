import * as o from "three";
function to(Be) {
  const _e = new URLSearchParams(location.search), Se = (s, a) => {
    const t = _e.get(s);
    return t === null ? a : t;
  }, mt = (s, a) => {
    const t = _e.get(s);
    return t === null ? a : parseFloat(t);
  }, bt = matchMedia("(prefers-reduced-motion: reduce)").matches, qe = matchMedia("(hover: none)").matches, $ = (s, a, t) => s < a ? a : s > t ? t : s, Ee = (s) => $(s, 0, 1), oe = (s, a, t) => s + (a - s) * t, ye = (s, a, t) => {
    const e = Ee((t - s) / (a - s));
    return e * e * (3 - 2 * e);
  }, H = Math.PI * 2, xe = (s, a, t, e) => oe(s, a, 1 - Math.exp(-t * e));
  function _(s) {
    return function() {
      s |= 0, s = s + 1831565813 | 0;
      let a = Math.imul(s ^ s >>> 15, 1 | s);
      return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
    };
  }
  function We(s) {
    const a = _(s), t = new Uint8Array(256), e = new Uint8Array(512);
    for (let n = 0; n < 256; n++) t[n] = n;
    for (let n = 255; n > 0; n--) {
      const p = a() * (n + 1) | 0, i = t[n];
      t[n] = t[p], t[p] = i;
    }
    for (let n = 0; n < 512; n++) e[n] = t[n & 255];
    const r = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]], l = (n) => n * n * n * (n * (n * 6 - 15) + 10);
    return function(n, p) {
      const i = Math.floor(n), f = Math.floor(p), d = i & 255, c = f & 255, S = n - i, y = p - f, M = l(S), C = l(y), g = (v, w, b) => {
        const A = r[v & 7];
        return A[0] * w + A[1] * b;
      }, x = e[e[d] + c], h = e[e[d] + c + 1], m = e[e[d + 1] + c], u = e[e[d + 1] + c + 1];
      return oe(
        oe(g(x, S, y), g(m, S - 1, y), M),
        oe(g(h, S, y - 1), g(u, S - 1, y - 1), M),
        C
      );
    };
  }
  function re(s, a, t, e, r, l) {
    let n = 0.5, p = 1, i = 0, f = 0;
    for (let d = 0; d < (e || 4); d++)
      i += n * s(a * p, t * p), f += n, n *= l || 0.5, p *= r || 2;
    return i / f;
  }
  function E(s, a) {
    const t = document.createElement("canvas");
    return t.width = s, t.height = a, t;
  }
  const ae = (s, a, t) => "rgb(" + (s | 0) + "," + (a | 0) + "," + (t | 0) + ")";
  function j(s, a, t, e, r, l) {
    const n = E(s, a), p = n.getContext("2d");
    p.fillStyle = "#808080", p.fillRect(0, 0, s, a);
    let i = r || 3, f = 1;
    for (let d = 0; d < (e || 5); d++) {
      const c = E(i, i), S = c.getContext("2d"), y = S.createImageData(i, i), M = y.data, C = _(t + d * 977);
      for (let g = 0; g < i * i; g++) {
        const x = 128 + (C() - 0.5) * 255 * (l || 1);
        M[g * 4] = M[g * 4 + 1] = M[g * 4 + 2] = $(x, 0, 255), M[g * 4 + 3] = 255;
      }
      S.putImageData(y, 0, 0), p.globalAlpha = f, p.globalCompositeOperation = d === 0 ? "source-over" : "overlay", p.imageSmoothingEnabled = !0, p.imageSmoothingQuality = "high", p.drawImage(c, 0, 0, s, a), i *= 2, f *= 0.62;
    }
    return p.globalAlpha = 1, p.globalCompositeOperation = "source-over", n;
  }
  function pe(s, a) {
    const t = s.width, e = s.height, r = E(t, e), l = r.getContext("2d");
    l.filter = "blur(1.1px)", l.drawImage(s, 0, 0), l.filter = "none";
    const n = l.getImageData(0, 0, t, e).data, p = E(t, e), i = p.getContext("2d"), f = i.createImageData(t, e), d = f.data, c = (y, M) => n[((M + e) % e * t + (y + t) % t) * 4] / 255, S = a || 2.4;
    for (let y = 0; y < e; y++) for (let M = 0; M < t; M++) {
      const C = (c(M + 1, y) - c(M - 1, y)) * S, g = (c(M, y + 1) - c(M, y - 1)) * S;
      let x = -C, h = g, m = 1;
      const u = 1 / Math.hypot(x, h, m), v = (y * t + M) * 4;
      d[v] = (x * u * 0.5 + 0.5) * 255, d[v + 1] = (h * u * 0.5 + 0.5) * 255, d[v + 2] = (m * u * 0.5 + 0.5) * 255, d[v + 3] = 255;
    }
    return i.putImageData(f, 0, 0), p;
  }
  function wt() {
    const t = E(1024, 1024), e = t.getContext("2d");
    e.fillStyle = "#10161a", e.fillRect(0, 0, 1024, 1024), e.globalCompositeOperation = "overlay", e.globalAlpha = 0.82, e.drawImage(j(1024, 1024, 41, 6, 3, 1), 0, 0), e.globalAlpha = 1, e.globalCompositeOperation = "source-over";
    const r = _(7);
    for (let p = 1; p < 6; p++) {
      const i = 170.66666666666666 * p;
      e.fillStyle = "rgba(0,0,0,.45)", e.fillRect(0, i - 1.5, 1024, 3), e.fillStyle = "rgba(190,205,205,.05)", e.fillRect(0, i + 2, 1024, 2);
    }
    for (let p = 0; p < 6; p++) for (let i = 0; i < 4; i++) {
      const f = 256 * (i + 0.5) + (r() - 0.5) * 14, d = 1024 / 6 * (p + 0.5), c = e.createRadialGradient(f, d, 1, f, d, 11);
      c.addColorStop(0, "rgba(0,0,0,.5)"), c.addColorStop(0.7, "rgba(0,0,0,.18)"), c.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = c, e.beginPath(), e.arc(f, d, 11, 0, H), e.fill();
    }
    for (let p = 0; p < 190; p++) {
      const i = r() * 1024, f = 0.6 + r() * 3.4, d = r() * 1024 * 0.5, c = 1024 * (0.4 + r() * 0.7), S = e.createLinearGradient(0, d, 0, d + c), y = r() > 0.45;
      S.addColorStop(0, "rgba(0,0,0,0)"), S.addColorStop(0.25, y ? "rgba(0,0,0,.20)" : "rgba(170,195,200,.045)"), S.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = S, e.fillRect(i, d, f, c);
    }
    e.globalAlpha = 0.16, e.globalCompositeOperation = "overlay", e.drawImage(j(512, 512, 91, 3, 128, 1.4), 0, 0, 1024, 1024), e.globalAlpha = 1, e.globalCompositeOperation = "source-over";
    const l = E(1024, 1024), n = l.getContext("2d");
    n.fillStyle = "#808080", n.fillRect(0, 0, 1024, 1024), n.globalAlpha = 0.5, n.drawImage(j(1024, 1024, 41, 5, 6, 1), 0, 0), n.globalAlpha = 1;
    for (let p = 1; p < 6; p++)
      n.fillStyle = "#2a2a2a", n.fillRect(0, 1024 / 6 * p - 2, 1024, 4);
    return { map: t, normal: pe(l, 2) };
  }
  function St() {
    const t = E(1024, 1024), e = t.getContext("2d"), r = _(23);
    e.fillStyle = "#0a0f12", e.fillRect(0, 0, 1024, 1024);
    const l = 4, n = 1024 / l;
    for (let c = 0; c < l; c++) for (let S = 0; S < l; S++) {
      const y = 0.82 + r() * 0.36;
      e.fillStyle = ae(12 * y, 17 * y, 20 * y), e.fillRect(S * n + 1.5, c * n + 1.5, n - 3, n - 3);
    }
    e.globalCompositeOperation = "overlay", e.globalAlpha = 0.55, e.drawImage(j(1024, 1024, 63, 6, 4, 1), 0, 0), e.globalAlpha = 1, e.globalCompositeOperation = "source-over", e.strokeStyle = "rgba(0,0,0,.72)", e.lineWidth = 3;
    for (let c = 0; c <= l; c++)
      e.beginPath(), e.moveTo(c * n, 0), e.lineTo(c * n, 1024), e.stroke(), e.beginPath(), e.moveTo(0, c * n), e.lineTo(1024, c * n), e.stroke();
    const p = E(1024, 1024), i = p.getContext("2d");
    i.fillStyle = "#8c8c8c", i.fillRect(0, 0, 1024, 1024), i.globalAlpha = 0.35, i.drawImage(j(1024, 1024, 63, 5, 8, 1), 0, 0), i.globalAlpha = 1, i.strokeStyle = "#303030", i.lineWidth = 5;
    for (let c = 0; c <= l; c++)
      i.beginPath(), i.moveTo(c * n, 0), i.lineTo(c * n, 1024), i.stroke(), i.beginPath(), i.moveTo(0, c * n), i.lineTo(1024, c * n), i.stroke();
    const f = E(512, 512), d = f.getContext("2d");
    return d.fillStyle = "#1c1c1c", d.fillRect(0, 0, 512, 512), d.globalAlpha = 0.95, d.globalCompositeOperation = "lighten", d.drawImage(j(512, 512, 77, 4, 3, 1.5), 0, 0), d.globalAlpha = 1, d.globalCompositeOperation = "source-over", { map: t, normal: pe(p, 1.5), rough: f };
  }
  function Fe(s, a) {
    const t = a || {}, e = 512, r = 512, l = E(e, r), n = l.getContext("2d"), p = E(e, r), i = p.getContext("2d"), f = E(e, r), d = f.getContext("2d"), c = _(s || 3), S = t.base || [30, 23, 19];
    n.fillStyle = ae(S[0], S[1], S[2]), n.fillRect(0, 0, e, r), i.fillStyle = "#808080", i.fillRect(0, 0, e, r), d.fillStyle = t.rough || "#d6d6d6", d.fillRect(0, 0, e, r);
    const y = t.boards === void 0 ? 7 : t.boards, M = [0];
    if (y > 0) {
      const g = [];
      let x = 0;
      for (let m = 0; m < y; m++) {
        const u = 0.7 + c() * 0.6;
        g.push(u), x += u;
      }
      let h = 0;
      g.forEach((m) => {
        h += m / x * e, M.push(h);
      });
    } else M.push(e);
    const C = (g, x, h, m) => {
      if (!(g.length < 2)) {
        x.beginPath(), x.moveTo(g[0][0], g[0][1]);
        for (let u = 1; u < g.length; u++) x.lineTo(g[u][0], g[u][1]);
        x.strokeStyle = h, x.lineWidth = m, x.lineCap = "round", x.stroke();
      }
    };
    for (let g = 0; g < M.length - 1; g++) {
      const x = M[g], h = M[g + 1], m = h - x, u = 0.8 + c() * 0.44, v = x + m * (c() * 2.8 - 0.9), w = m * (0.12 + c() * 1.7), b = m * (0.1 + c() * 0.4), A = 1 + (c() * 2 | 0), P = c() * H, G = (R) => w + Math.sin(R / r * H * A + P) * b, F = 2.4 + c() * 5;
      [n, i, d].forEach((R) => {
        R.save(), R.beginPath(), R.rect(x, 0, m, r), R.clip();
      }), n.fillStyle = ae(S[0] * u, S[1] * u, S[2] * u), n.fillRect(x, 0, m, r);
      for (let R = 1; R * F < m * 3.4 + w + b; R++) {
        const I = R * F * (0.88 + c() * 0.24), U = 0.42 + c() * 0.38, N = 0.8 + c() * 1.9;
        for (const X of [-1, 1]) {
          let Z = [];
          const J = () => {
            C(Z, n, "rgba(0,0,0," + U.toFixed(2) + ")", N), C(Z, i, "rgba(0,0,0," + (U * 0.8).toFixed(2) + ")", N), C(
              Z.map((ne) => [ne[0] + X * (N + 0.6), ne[1]]),
              n,
              "rgba(150,120,96," + (U * 0.3).toFixed(2) + ")",
              N * 0.7
            ), Z = [];
          };
          for (let ne = -3; ne <= r + 3; ne += 3) {
            const be = G(ne), we = I * I - be * be;
            if (we <= 0) {
              J();
              continue;
            }
            Z.push([v + X * Math.sqrt(we), ne]);
          }
          J();
        }
      }
      for (let R = 0; R < 220; R++) {
        const I = x + c() * m, U = c() * r, N = 1.5 + c() * 6;
        n.fillStyle = "rgba(0,0,0," + (0.1 + c() * 0.22) + ")", n.fillRect(I, U, 0.7 + c() * 0.7, N), i.fillStyle = "rgba(0,0,0,.22)", i.fillRect(I, U, 0.8, N);
      }
      if (c() > 0.55) {
        const R = x + m * (0.2 + c() * 0.6), I = c() * r, U = 2.5 + c() * 5;
        for (let N = 5; N >= 1; N--) {
          const X = N / 5;
          n.strokeStyle = "rgba(0,0,0," + (0.5 - X * 0.25).toFixed(2) + ")", n.lineWidth = 1.1, n.beginPath(), n.ellipse(R, I, U * X * 1.5, U * X * 2.4, 0, 0, H), n.stroke(), i.strokeStyle = "rgba(0,0,0,.30)", i.lineWidth = 1.1, i.beginPath(), i.ellipse(R, I, U * X * 1.5, U * X * 2.4, 0, 0, H), i.stroke();
        }
      }
      for (let R = 0; R < 5; R++) {
        const I = x + c() * m, U = c() * r, N = 20 + c() * 120, X = [];
        for (let Z = U; Z < U + N; Z += 6) X.push([I + Math.sin(Z * 0.07) * 1.4, Z]);
        C(X, n, "rgba(0,0,0,.62)", 0.7 + c() * 1.2), C(X, i, "rgba(0,0,0,.55)", 0.7 + c() * 1.2);
      }
      [n, i, d].forEach((R) => R.restore()), y > 0 && (n.fillStyle = "rgba(0,0,0,.80)", n.fillRect(h - 1.1, 0, 2.2, r), n.fillStyle = "rgba(158,130,106,.14)", n.fillRect(h + 1.1, 0, 1.1, r), i.fillStyle = "rgba(0,0,0,.85)", i.fillRect(h - 1.3, 0, 2.6, r), i.fillStyle = "rgba(255,255,255,.35)", i.fillRect(h + 1.3, 0, 1.6, r), d.fillStyle = "rgba(255,255,255,.5)", d.fillRect(h - 1.6, 0, 3.2, r));
    }
    for (let g = 0; g < 90; g++) {
      const x = c() * e, h = c() * r, m = r * (0.15 + c() * 0.5), u = n.createLinearGradient(0, h, 0, h + m);
      u.addColorStop(0, "rgba(0,0,0,0)"), u.addColorStop(0.3, "rgba(0,0,0," + (0.1 + c() * 0.16) + ")"), u.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = u, n.fillRect(x, h, 0.8 + c() * 3.4, m);
    }
    return { map: l, normal: pe(p, t.relief || 2.4), rough: f };
  }
  function yt(s, a) {
    const t = {}, l = E(512, 512), n = l.getContext("2d"), p = E(512, 512), i = p.getContext("2d"), f = E(512, 512), d = f.getContext("2d"), c = _(s), S = t.base || [46, 51, 53];
    n.fillStyle = ae(S[0], S[1], S[2]), n.fillRect(0, 0, 512, 512), i.fillStyle = "#808080", i.fillRect(0, 0, 512, 512), d.fillStyle = "#e8e8e8", d.fillRect(0, 0, 512, 512);
    const y = (h, m, u, v, w) => {
      for (let b = 0; b < h; b++) {
        const A = u + c() * (v - u), P = c() * 512, G = c() * 512;
        n.fillStyle = m(c), n.beginPath(), n.ellipse(P, G, A, A * (0.55 + c() * 0.85), c() * H, 0, H), n.fill(), w && (i.fillStyle = w, i.beginPath(), i.ellipse(P, G, A, A * 0.8, 0, 0, H), i.fill());
      }
    };
    y(3400, (h) => "rgba(206,210,204," + (0.06 + h() * 0.2) + ")", 0.6, 2.8, "rgba(255,255,255,.13)"), y(2e3, (h) => "rgba(126,136,134," + (0.07 + h() * 0.2) + ")", 0.8, 3.4, null), y(1300, (h) => "rgba(8,10,12," + (0.14 + h() * 0.38) + ")", 0.5, 2.4, "rgba(0,0,0,.16)");
    for (let h = 0; h < 220; h++) {
      const m = c() * 512, u = c() * 512, v = 5 + c() * 24, w = -0.26 + c() * 0.52;
      [[n, "rgba(0,0,0,.22)", "rgba(210,216,212,.08)"], [i, "rgba(0,0,0,.34)", "rgba(255,255,255,.26)"]].forEach(([b, A, P]) => {
        b.save(), b.translate(u, m), b.rotate(w), b.fillStyle = A, b.fillRect(0, 0, v, 1.5), b.fillStyle = P, b.fillRect(0, 1.5, v, 1), b.restore();
      });
    }
    for (let h = 0; h < 260; h++) {
      const m = c() * 512, u = c() * 512, v = 0.8 + c() * c() * 5, w = n.createRadialGradient(m - v * 0.3, u - v * 0.3, v * 0.1, m, u, v);
      w.addColorStop(0, "rgba(0,0,0,.42)"), w.addColorStop(0.7, "rgba(0,0,0,.16)"), w.addColorStop(1, "rgba(198,204,198,.10)"), n.fillStyle = w, n.beginPath(), n.arc(m, u, v, 0, H), n.fill(), i.fillStyle = "rgba(0,0,0,.40)", i.beginPath(), i.arc(m, u, v * 0.8, 0, H), i.fill();
    }
    for (let h = 0; h < 16; h++) {
      let m = c() * 512, u = c() * 512, v = c() * H;
      const w = [[m, u]];
      for (let b = 0; b < 24; b++)
        v += (c() - 0.5) * 0.9, m += Math.cos(v) * 9, u += Math.sin(v) * 9, w.push([m, u]);
      [[n, "rgba(0,0,0,.46)"], [i, "rgba(0,0,0,.55)"]].forEach(([b, A]) => {
        b.beginPath(), b.moveTo(w[0][0], w[0][1]), w.forEach((P) => b.lineTo(P[0], P[1])), b.strokeStyle = A, b.lineWidth = 0.7 + c() * 0.9, b.stroke();
      });
    }
    const M = i.getImageData(0, 0, 512, 512).data, C = n.getImageData(0, 0, 512, 512), g = d.getImageData(0, 0, 512, 512), x = t.moss === void 0 ? 1 : t.moss;
    for (let h = 0; h < 512 * 512; h++) {
      const m = $((0.5 - M[h * 4] / 255) * 4.2, 0, 1) * x;
      if (m <= 0) continue;
      const u = h * 4;
      C.data[u] = oe(C.data[u], 30, m * 0.75), C.data[u + 1] = oe(C.data[u + 1], 44, m * 0.95), C.data[u + 2] = oe(C.data[u + 2], 28, m * 0.85), g.data[u] = g.data[u + 1] = g.data[u + 2] = oe(g.data[u], 255, m * 0.5);
    }
    return n.putImageData(C, 0, 0), d.putImageData(g, 0, 0), { map: l, normal: pe(p, t.relief || 3.2), rough: f };
  }
  function xt() {
    const t = Fe(131, { base: [34, 22, 17], boards: 0 }), e = E(512, 512), r = e.getContext("2d"), l = E(512, 512), n = l.getContext("2d"), p = E(512, 512), i = p.getContext("2d"), f = _(5);
    r.drawImage(t.map, 0, 0), n.fillStyle = "#808080", n.fillRect(0, 0, 512, 512), i.fillStyle = "#8c8c8c", i.fillRect(0, 0, 512, 512), r.globalAlpha = 0.8, r.fillStyle = "#7c1610", r.fillRect(0, 0, 512, 512), r.globalAlpha = 1, r.globalCompositeOperation = "multiply", r.globalAlpha = 0.42, r.drawImage(t.map, 0, 0), r.globalAlpha = 1, r.globalCompositeOperation = "source-over", r.globalCompositeOperation = "overlay", r.globalAlpha = 0.5, r.drawImage(j(512, 512, 313, 5, 3, 1), 0, 0), r.globalAlpha = 1, r.globalCompositeOperation = "source-over";
    for (let d = 0; d < 190; d++) {
      let c = f() * 512, S = f() * 512, y = f() * H;
      r.strokeStyle = "rgba(24,8,6," + (0.28 + f() * 0.4) + ")", n.strokeStyle = "rgba(0,0,0,.42)", r.lineWidth = n.lineWidth = 0.5 + f() * 0.7, r.beginPath(), n.beginPath(), r.moveTo(c, S), n.moveTo(c, S);
      for (let M = 0; M < 5 + f() * 9; M++)
        y += (f() - 0.5) * 1.5, c += Math.cos(y) * (5 + f() * 9), S += Math.sin(y) * (5 + f() * 9), r.lineTo(c, S), n.lineTo(c, S);
      r.stroke(), n.stroke();
    }
    for (let d = 0; d < 40; d++) {
      const c = f() * 512, S = f() * 512, y = 2 + f() * f() * 17, M = [];
      for (let g = 0; g < 9; g++) {
        const x = g / 9 * H, h = y * (0.55 + f() * 0.75);
        M.push([c + Math.cos(x) * h, S + Math.sin(x) * h]);
      }
      const C = (g) => {
        g.beginPath(), g.moveTo(M[0][0], M[0][1]);
        for (let x = 1; x < M.length; x++) {
          const h = M[x], m = M[(x + 1) % M.length];
          g.quadraticCurveTo(h[0], h[1], (h[0] + m[0]) / 2, (h[1] + m[1]) / 2);
        }
        g.closePath();
      };
      r.save(), C(r), r.clip(), r.drawImage(t.map, 0, 0), r.fillStyle = "rgba(0,0,0,.22)", r.fillRect(0, 0, 512, 512), r.restore(), C(r), r.strokeStyle = "rgba(196,110,76,.30)", r.lineWidth = 1.2, r.stroke(), C(n), n.fillStyle = "rgba(0,0,0,.34)", n.fill(), n.strokeStyle = "rgba(255,255,255,.30)", n.lineWidth = 1.6, n.stroke(), C(i), i.fillStyle = "rgba(240,240,240,.75)", i.fill();
    }
    for (let d = 0; d < 120; d++) {
      const c = f() * 512, S = 0.6 + f() * 2.6, y = f() * 512, M = 512 * (0.2 + f() * 0.6), C = r.createLinearGradient(0, y, 0, y + M);
      C.addColorStop(0, "rgba(0,0,0,0)"), C.addColorStop(0.3, f() > 0.5 ? "rgba(12,4,4,.24)" : "rgba(210,150,120,.05)"), C.addColorStop(1, "rgba(0,0,0,0)"), r.fillStyle = C, r.fillRect(c, y, S, M);
    }
    return i.globalAlpha = 0.6, i.globalCompositeOperation = "multiply", i.drawImage(j(512, 512, 401, 4, 6, 1.2), 0, 0), i.globalAlpha = 1, i.globalCompositeOperation = "source-over", { map: e, normal: pe(l, 2.2), rough: p };
  }
  function vt() {
    const t = E(1024, 768), e = t.getContext("2d");
    e.clearRect(0, 0, 1024, 768), e.fillStyle = "rgba(228,222,206,.055)", e.fillRect(0, 0, 1024, 768), e.strokeStyle = "rgba(10,8,7,.88)";
    const r = 12, l = 9;
    e.lineWidth = 5;
    for (let n = 1; n < r; n++)
      e.beginPath(), e.moveTo(1024 / r * n, 0), e.lineTo(1024 / r * n, 768), e.stroke();
    for (let n = 1; n < l; n++)
      e.beginPath(), e.moveTo(0, 768 / l * n), e.lineTo(1024, 768 / l * n), e.stroke();
    return e.lineWidth = 13, e.strokeStyle = "rgba(8,6,5,.95)", e.strokeRect(0, 0, 1024, 768), e.beginPath(), e.moveTo(1024 / 2, 0), e.lineTo(1024 / 2, 768), e.stroke(), t;
  }
  function Ie() {
    const a = E(128, 128), t = a.getContext("2d");
    t.translate(128 / 2, 128 * 0.92), t.scale(128 / 2.2, -128 / 2.2), t.beginPath();
    const e = 5, r = 1.9;
    for (let n = 0; n < e; n++) {
      const p = -r / 2 + r * (n / (e - 1)) + Math.PI / 2, i = n === 2 ? 0.96 : n === 1 || n === 3 ? 0.82 : 0.6, f = 0.17;
      t.moveTo(0, 0.02), t.lineTo(Math.cos(p - f) * i * 0.55, Math.sin(p - f) * i * 0.55), t.lineTo(Math.cos(p) * i, Math.sin(p) * i), t.lineTo(Math.cos(p + f) * i * 0.55, Math.sin(p + f) * i * 0.55), t.closePath();
    }
    t.fillStyle = "#fff", t.fill(), t.lineWidth = 0.05, t.strokeStyle = "#fff", t.stroke(), t.setTransform(1, 0, 0, 1, 0, 0), t.globalCompositeOperation = "destination-out";
    const l = _(3);
    for (let n = 0; n < 40; n++)
      t.beginPath(), t.arc(l() * 128, l() * 128, l() * 3, 0, H), t.fill();
    return a;
  }
  function Mt() {
    const t = E(512, 512), e = t.getContext("2d"), r = e.createLinearGradient(0, 0, 0, 512);
    r.addColorStop(0, "rgb(6,10,15)"), r.addColorStop(0.34, "rgb(13,22,31)"), r.addColorStop(0.66, "rgb(17,26,34)"), r.addColorStop(0.88, "rgb(24,35,42)"), r.addColorStop(1, "rgb(14,22,28)"), e.fillStyle = r, e.fillRect(0, 0, 512, 512), e.globalAlpha = 0.34, e.globalCompositeOperation = "overlay", e.drawImage(j(512, 512, 313, 5, 3, 0.9), 0, 0), e.globalAlpha = 1, e.globalCompositeOperation = "source-over";
    const l = e.createRadialGradient(512 * 0.68, 512 * 0.95, 4, 512 * 0.68, 512 * 0.95, 512 * 0.44);
    l.addColorStop(0, "rgba(150,66,26,.30)"), l.addColorStop(0.5, "rgba(96,44,22,.12)"), l.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = l, e.fillRect(0, 0, 512, 512);
    const n = _(881);
    for (let p = 0; p < 420; p++) {
      const i = n() * 512, f = n() * 512 * 0.78, d = 0.5 + n() * n() * 1.7;
      e.fillStyle = "rgba(214,232,240," + (0.12 + n() * 0.42) * (1 - f / 512) + ")", e.beginPath(), e.arc(i, f, d, 0, H), e.fill();
    }
    return t;
  }
  function Xe() {
    const t = E(2048, 512), e = t.getContext("2d"), r = We(1207), l = _(1207);
    e.beginPath(), e.moveTo(0, 512);
    for (let n = 0; n <= 2048; n += 4) {
      const p = n / 2048, i = 0.46 + 0.3 * (re(r, p * 2.4, 0.5, 4, 2.1, 0.55) * 0.5 + 0.5) + 0.16 * (re(r, p * 7.5, 3.1, 3, 2.2, 0.5) * 0.5 + 0.5);
      e.lineTo(n, 512 - i * 512 * 0.84);
    }
    e.lineTo(2048, 512), e.closePath(), e.fillStyle = "#050809", e.fill(), e.fillStyle = "#050809";
    for (let n = 0; n < 460; n++) {
      const p = l() * 2048, i = p / 2048, d = 512 - (0.46 + 0.3 * (re(r, i * 2.4, 0.5, 4, 2.1, 0.55) * 0.5 + 0.5) + 0.16 * (re(r, i * 7.5, 3.1, 3, 2.2, 0.5) * 0.5 + 0.5)) * 512 * 0.84, c = 8 + l() * 30, S = 3 + l() * 6;
      e.beginPath(), e.moveTo(p, d - c), e.lineTo(p + S, d + 4), e.lineTo(p - S, d + 4), e.closePath(), e.fill();
    }
    return t;
  }
  function Ct() {
    const t = E(512, 512), e = t.getContext("2d"), r = E(512, 512), l = r.getContext("2d");
    e.fillStyle = "#151c20", e.fillRect(0, 0, 512, 512), l.fillStyle = "#606060", l.fillRect(0, 0, 512, 512);
    const n = 14, p = 512 / n;
    for (let f = 0; f < n; f++) {
      const d = e.createLinearGradient(f * p, 0, (f + 1) * p, 0);
      d.addColorStop(0, "rgba(0,0,0,.62)"), d.addColorStop(0.3, "rgba(148,178,192,.13)"), d.addColorStop(0.66, "rgba(84,110,124,.05)"), d.addColorStop(1, "rgba(0,0,0,.62)"), e.fillStyle = d, e.fillRect(f * p, 0, p, 512), e.fillStyle = "rgba(0,0,0,.50)", e.fillRect(f * p - 3, 0, 6, 512), e.fillStyle = "rgba(168,196,208,.09)", e.fillRect(f * p - 1.2, 0, 1.6, 512);
      const c = l.createLinearGradient(f * p, 0, (f + 1) * p, 0);
      c.addColorStop(0, "#2c2c2c"), c.addColorStop(0.5, "#eaeaea"), c.addColorStop(1, "#2c2c2c"), l.fillStyle = c, l.fillRect(f * p, 0, p, 512);
    }
    const i = _(211);
    for (let f = 0; f < 512; f += 512 / 9) {
      e.fillStyle = "rgba(0,0,0,.34)", e.fillRect(0, f, 512, 3.5), l.fillStyle = "rgba(0,0,0,.55)", l.fillRect(0, f, 512, 3.5), l.fillStyle = "rgba(255,255,255,.28)", l.fillRect(0, f + 3.5, 512, 2);
      for (let d = 0; d < 26; d++)
        e.fillStyle = i() > 0.5 ? "rgba(0,0,0,.30)" : "rgba(96,116,92,.10)", e.fillRect(i() * 512, f + 1, 2 + i() * 9, 2 + i() * 3);
    }
    return e.globalCompositeOperation = "overlay", e.globalAlpha = 0.46, e.drawImage(j(256, 256, 211, 5, 3, 1), 0, 0, 512, 512), e.globalAlpha = 1, e.globalCompositeOperation = "source-over", l.globalAlpha = 0.3, l.drawImage(j(256, 256, 213, 4, 16, 1.2), 0, 0, 512, 512), l.globalAlpha = 1, { map: t, normal: pe(r, 2.2) };
  }
  function At() {
    const a = E(512, 512), t = a.getContext("2d"), e = 512 / 2 - 1, r = _(91), l = (C, g) => [512 / 2 + C * e, 512 / 2 + g * e];
    t.beginPath(), t.arc(512 / 2, 512 / 2, e, 0, H), t.closePath(), t.save(), t.clip();
    const n = t.createRadialGradient(512 * 0.46, 512 * 0.44, 512 * 0.05, 512 / 2, 512 / 2, e);
    n.addColorStop(0, "rgb(150,150,150)"), n.addColorStop(0.55, "rgb(158,158,158)"), n.addColorStop(0.86, "rgb(178,178,178)"), n.addColorStop(1, "rgb(196,196,196)"), t.fillStyle = n, t.fillRect(0, 0, 512, 512), t.globalCompositeOperation = "overlay", t.globalAlpha = 0.5, t.drawImage(j(256, 256, 517, 6, 4, 1.1), 0, 0, 512, 512), t.globalAlpha = 1, t.globalCompositeOperation = "source-over";
    const p = [
      [-0.52, -0.06, 0.46, 0.8],
      /* Oceanus Procellarum */
      [-0.26, -0.38, 0.31, 0.92],
      /* Imbrium             */
      [0.13, -0.31, 0.2, 0.88],
      /* Serenitatis         */
      [0.3, -0.08, 0.23, 0.84],
      /* Tranquillitatis     */
      [0.45, 0.12, 0.15, 0.78],
      /* Fecunditatis        */
      [0.27, 0.27, 0.12, 0.74],
      /* Nectaris            */
      [0.57, -0.3, 0.12, 0.95],
      /* Crisium, the one that stands on its own */
      [-0.27, 0.3, 0.19, 0.7],
      /* Nubium              */
      [-0.47, 0.25, 0.13, 0.72]
      /* Humorum             */
    ], i = E(512, 512), f = i.getContext("2d");
    p.forEach(([C, g, x, h]) => {
      for (let m = 0; m < 22; m++) {
        const u = r() * H, v = r() * x * 0.66, [w, b] = l(C + Math.cos(u) * v, g + Math.sin(u) * v * 0.8), A = x * e * (0.3 + r() * 0.46), P = f.createRadialGradient(w, b, A * 0.2, w, b, A);
        P.addColorStop(0, "rgba(0,0,0," + (h * 0.14).toFixed(3) + ")"), P.addColorStop(1, "rgba(0,0,0,0)"), f.fillStyle = P, f.beginPath(), f.arc(w, b, A, 0, H), f.fill();
      }
    }), t.save(), t.filter = "blur(9px)", t.globalAlpha = 0.9, t.drawImage(i, 0, 0), t.restore(), t.globalCompositeOperation = "overlay", t.globalAlpha = 0.18, t.drawImage(j(256, 256, 811, 4, 11, 1.2), 0, 0, 512, 512), t.globalAlpha = 1, t.globalCompositeOperation = "source-over";
    const d = E(512, 512), c = d.getContext("2d");
    [[-0.1, 0.54, 150, 1], [-0.28, -0.07, 80, 0.6], [-0.46, -0.04, 60, 0.45]].forEach(([C, g, x, h]) => {
      const [m, u] = l(C, g);
      for (let v = 0; v < x; v++) {
        const w = r() * H, b = e * (0.3 + r() * r() * 1.3), A = e * (0.08 + r() * 0.06), P = [m + Math.cos(w) * A, u + Math.sin(w) * A], G = [m + Math.cos(w) * b, u + Math.sin(w) * b], F = c.createLinearGradient(P[0], P[1], G[0], G[1]);
        F.addColorStop(0, "rgba(255,255,255," + (0.085 * h).toFixed(3) + ")"), F.addColorStop(0.4, "rgba(255,255,255," + (0.055 * h).toFixed(3) + ")"), F.addColorStop(1, "rgba(255,255,255,0)"), c.strokeStyle = F, c.lineWidth = 0.8 + r() * 2.4, c.lineCap = "round", c.beginPath(), c.moveTo(P[0], P[1]), c.quadraticCurveTo(
          m + Math.cos(w + 0.06) * b * 0.55,
          u + Math.sin(w + 0.06) * b * 0.55,
          G[0],
          G[1]
        ), c.stroke();
      }
    }), t.save(), t.filter = "blur(2.4px)", t.globalCompositeOperation = "lighter", t.globalAlpha = 0.62, t.drawImage(d, 0, 0), t.restore();
    const S = (C, g) => p.some(([x, h, m]) => Math.hypot(C - x, (g - h) * 1.15) < m * 0.82);
    for (let C = 0; C < 620; C++) {
      const g = r() * H, x = Math.sqrt(r()) * 0.97, h = Math.cos(g) * x, m = Math.sin(g) * x;
      if (S(h, m) && r() > 0.12) continue;
      const [u, v] = l(h, m), w = r() > 0.975, b = (1 + r() * r() * r() * (w ? 34 : 11)) * (512 / 512), A = 0.55 + 0.45 * Math.sqrt(Math.max(0, 1 - x * x)), P = Math.sqrt(Math.max(0, 1 - x * x)) * 0.72 + 0.28;
      t.save(), t.translate(u, v), t.rotate(Math.atan2(m, h)), t.scale(P, 1), t.rotate(-Math.atan2(m, h));
      const G = Math.max(0.8, b * 0.26), F = t.createLinearGradient(-b, -b, b, b);
      if (F.addColorStop(0, "rgba(255,255,255," + (0.34 * A).toFixed(3) + ")"), F.addColorStop(0.5, "rgba(255,255,255,0)"), F.addColorStop(1, "rgba(0,0,0," + (0.38 * A).toFixed(3) + ")"), t.strokeStyle = F, t.lineWidth = G, t.beginPath(), t.arc(0, 0, Math.max(0.6, b - G * 0.5), 0, H), t.stroke(), b > 3) {
        const R = t.createLinearGradient(-b, -b, b, b);
        R.addColorStop(0, "rgba(0,0,0," + (0.21 * A).toFixed(3) + ")"), R.addColorStop(1, "rgba(255,255,255," + (0.07 * A).toFixed(3) + ")"), t.fillStyle = R, t.beginPath(), t.arc(0, 0, b - G, 0, H), t.fill();
      }
      b > 13 && (t.fillStyle = "rgba(255,255,255," + (0.14 * A).toFixed(3) + ")", t.beginPath(), t.arc(-b * 0.04, -b * 0.04, b * 0.11, 0, H), t.fill()), t.restore();
    }
    t.globalCompositeOperation = "overlay", t.globalAlpha = 0.13, t.drawImage(j(512, 512, 977, 2, 210, 1.3), 0, 0, 512, 512), t.globalAlpha = 1, t.globalCompositeOperation = "source-over";
    const y = t.createRadialGradient(512 * 0.4, 512 * 0.38, 512 * 0.18, 512 * 0.52, 512 * 0.56, 512 * 0.72);
    y.addColorStop(0, "rgba(0,0,0,0)"), y.addColorStop(1, "rgba(0,0,0,.30)"), t.fillStyle = y, t.fillRect(0, 0, 512, 512), t.restore();
    const M = t.createRadialGradient(512 / 2, 512 / 2, e - 2.5, 512 / 2, 512 / 2, e);
    return M.addColorStop(0, "rgba(0,0,0,1)"), M.addColorStop(1, "rgba(0,0,0,0)"), t.globalCompositeOperation = "destination-in", t.fillStyle = M, t.fillRect(0, 0, 512, 512), t.globalCompositeOperation = "source-over", a;
  }
  function ue(s, a) {
    const e = E(256, 256), r = e.getContext("2d"), l = r.createRadialGradient(256 / 2, 256 / 2, 0, 256 / 2, 256 / 2, 256 / 2);
    return l.addColorStop(0, s || "rgba(255,255,255,1)"), l.addColorStop(0.28, a || "rgba(255,255,255,.36)"), l.addColorStop(0.62, "rgba(255,255,255,.07)"), l.addColorStop(1, "rgba(255,255,255,0)"), r.fillStyle = l, r.fillRect(0, 0, 256, 256), e;
  }
  function Wt() {
    const a = E(128, 128), t = a.getContext("2d"), e = t.createRadialGradient(128 / 2, 128 / 2, 0, 128 / 2, 128 / 2, 128 / 2);
    return e.addColorStop(0, "rgba(255,255,255,1)"), e.addColorStop(0.07, "rgba(236,250,250,.92)"), e.addColorStop(0.16, "rgba(190,230,238,.40)"), e.addColorStop(0.34, "rgba(132,192,212,.13)"), e.addColorStop(0.62, "rgba(88,146,172,.035)"), e.addColorStop(1, "rgba(70,120,142,0)"), t.fillStyle = e, t.fillRect(0, 0, 128, 128), a;
  }
  function ze(s, a) {
    a = a || {};
    const t = a.w || 2048, e = a.h || 1024, r = E(t, e), l = r.getContext("2d"), n = _(s), p = We(s * 13 + 5), i = a.crest !== void 0 ? a.crest : 0.46, f = a.peak !== void 0 ? a.peak : 0.6, d = a.wide !== void 0 ? a.wide : 0.4, c = new Float32Array(t);
    for (let v = 0; v < t; v++) {
      const w = v / t;
      let b = Math.exp(-Math.pow((w - i) / d, 2) * 2.1);
      b += 0.46 * Math.exp(-Math.pow((w - i - (a.crest2 || 0.4)) / (d * 0.62), 2) * 3.1), b += 0.3 * Math.exp(-Math.pow((w - i + (a.crest3 || 0.46)) / (d * 0.7), 2) * 3.4);
      const A = re(p, w * 4.2, 0.5, 4, 2.05, 0.52) * 0.5 + 0.5;
      c[v] = b * (0.8 + 0.38 * A);
    }
    let S = 0;
    for (let v = 0; v < t; v++) S = Math.max(S, c[v]);
    for (let v = 0; v < t; v++) c[v] *= e * f / S;
    const y = (v) => e - c[$(v | 0, 0, t - 1)];
    l.beginPath(), l.moveTo(0, e);
    for (let v = 0; v < t; v += 3) l.lineTo(v, y(v));
    l.lineTo(t, y(t - 1)), l.lineTo(t, e), l.closePath();
    const M = l.createLinearGradient(0, e - e * f, 0, e);
    M.addColorStop(0, "#1a2416"), M.addColorStop(0.38, "#0e150c"), M.addColorStop(1, "#040604"), l.fillStyle = M, l.fill(), l.save(), l.clip(), l.globalCompositeOperation = "overlay", l.globalAlpha = 0.5, l.drawImage(j(1024, 512, s + 3, 5, 3, 1), 0, 0, t, e), l.restore(), l.globalAlpha = 1, l.globalCompositeOperation = "source-over";
    const C = a.light || [-0.42, -0.91], g = a.blades || 15e3, x = [];
    for (let v = 0; v < g; v++) {
      const w = n() * t | 0, b = y(w), A = Math.pow(n(), 2.3), P = b + A * (e - b) + (n() - 0.5) * 6;
      P > e + 20 || x.push({ i: w, by: P, depth: A, r: n(), r2: n(), r3: n() });
    }
    x.sort((v, w) => v.by - w.by);
    const h = (a.len || 46) * (t / 2048);
    for (let v = 0; v < x.length; v++) {
      const w = x[v], b = w.i + (w.r - 0.5) * 5, A = 1 - 0.52 * w.depth, P = h * (0.36 + 1.05 * w.r2 * w.r2) * A;
      let G = (w.r3 - 0.5) * 1.5 + (a.wind || 0.16);
      const F = b + G * P * 0.95, R = w.by - P, I = b + G * P * 0.3, U = w.by - P * 0.62, N = (0.9 + 1.9 * w.r) * A * (t / 2048), X = F - b, Z = R - w.by, J = 1 / Math.hypot(X, Z), ne = Ee((-(X * J) * C[0] - Z * J * C[1]) * 0.5 + 0.5), be = Math.pow(1 - w.depth, 1.35);
      let we = 0.1 + 0.46 * be + 0.34 * ne * be;
      const Ue = Ee(be * 1.25 - 0.42) * (a.warm !== void 0 ? a.warm : 1), Yt = (10 + 78 * we + 44 * Ue) * (a.tintR || 1), Jt = (16 + 106 * we + 24 * Ue) * (a.tintG || 1), $t = (12 + 80 * we + 16 * Ue) * (a.tintB || 1);
      l.fillStyle = ae(Yt, Jt, $t), l.beginPath(), l.moveTo(b - N, w.by), l.quadraticCurveTo(I - N * 0.35, U, F, R), l.quadraticCurveTo(I + N * 0.35, U, b + N, w.by), l.closePath(), l.fill();
    }
    l.globalCompositeOperation = "source-atop";
    const m = l.createLinearGradient(a.bounceFrom || t, 0, a.bounceTo || 0, 0);
    m.addColorStop(0, "rgba(180,40,16,.24)"), m.addColorStop(0.55, "rgba(140,32,14,.07)"), m.addColorStop(1, "rgba(0,0,0,0)"), l.fillStyle = m, l.fillRect(0, 0, t, e);
    const u = l.createLinearGradient(0, e - e * f * 1.05, 0, e);
    return u.addColorStop(0, "rgba(146,182,180,.13)"), u.addColorStop(0.5, "rgba(0,0,0,0)"), u.addColorStop(1, "rgba(0,0,0,.70)"), l.fillStyle = u, l.fillRect(0, 0, t, e), l.globalCompositeOperation = "source-over", r;
  }
  function je(s, a) {
    a = a || {};
    const t = a.w || 1536, e = a.h || 1024, r = E(t, e), l = r.getContext("2d"), n = _(s), p = We(s * 7 + 11);
    (a.blobs || [[0.3, 0.7, 0.4, 0.34], [0.66, 0.82, 0.38, 0.28], [0.46, 0.96, 0.52, 0.34]]).forEach((d, c) => {
      const S = d[0] * t, y = d[1] * e, M = d[2] * t * 0.5, C = d[3] * e * 0.8;
      l.beginPath();
      for (let h = 0; h <= 128; h++) {
        const m = h / 128 * H, u = 1 + 0.17 * re(p, Math.cos(m) * 1.7 + c * 9, Math.sin(m) * 1.7, 4, 2.1, 0.55), v = S + Math.cos(m) * M * u, w = y + Math.sin(m) * C * u;
        h === 0 ? l.moveTo(v, w) : l.lineTo(v, w);
      }
      l.closePath();
      const g = l.createLinearGradient(S - M, y - C, S + M * 0.4, y + C), x = 1 - c * 0.16;
      g.addColorStop(0, ae(30 * x, 39 * x, 40 * x)), g.addColorStop(0.42, ae(14 * x, 19 * x, 20 * x)), g.addColorStop(1, ae(6, 9, 9)), l.fillStyle = g, l.fill(), l.save(), l.clip(), l.globalCompositeOperation = "overlay", l.globalAlpha = 0.62, l.drawImage(j(768, 512, s + c * 31, 6, 4, 1.1), 0, 0, t, e), l.globalAlpha = 1, l.globalCompositeOperation = "source-over";
      for (let h = 0; h < 26; h++) {
        l.beginPath();
        const m = S + (n() - 0.5) * M * 2, u = y + (n() - 0.5) * C * 1.6;
        l.moveTo(m, u);
        for (let v = 0; v < 3; v++) l.lineTo(m + (n() - 0.5) * M * 0.8, u + (n() - 0.5) * C * 0.6);
        l.closePath(), l.fillStyle = n() > 0.5 ? "rgba(255,255,255,.030)" : "rgba(0,0,0,.14)", l.fill();
      }
      l.lineWidth = 3 + n() * 4, l.strokeStyle = "rgba(178,206,206,.20)", l.beginPath();
      for (let h = 0; h <= 60; h++) {
        const m = Math.PI + h / 60 * Math.PI * 0.78, u = 1 + 0.17 * re(p, Math.cos(m) * 1.7 + c * 9, Math.sin(m) * 1.7, 4, 2.1, 0.55), v = S + Math.cos(m) * M * u * 0.97, w = y + Math.sin(m) * C * u * 0.97;
        h === 0 ? l.moveTo(v, w) : l.lineTo(v, w);
      }
      l.stroke(), l.restore();
    }), l.globalCompositeOperation = "source-atop";
    for (let d = 0; d < 2600; d++) {
      const c = n() * t, S = e - Math.pow(n(), 1.7) * e * 0.5;
      l.fillStyle = "rgba(" + (40 + n() * 40 | 0) + "," + (60 + n() * 46 | 0) + ",34," + (0.05 + n() * 0.22) + ")", l.fillRect(c, S, 1.6 + n() * 2.4, 3 + n() * 9);
    }
    const f = l.createLinearGradient(t, 0, 0, 0);
    return f.addColorStop(0, "rgba(190,48,22,.16)"), f.addColorStop(0.7, "rgba(0,0,0,0)"), l.fillStyle = f, l.fillRect(0, 0, t, e), l.globalCompositeOperation = "source-over", r;
  }
  function Pt(s) {
    const e = E(1536, 1024), r = e.getContext("2d"), l = _(s), n = [];
    function p(c, S, y, M, C, g) {
      let h = c, m = S, u = y;
      r.beginPath(), r.moveTo(h, m);
      for (let v = 0; v < 7; v++)
        u += (l() - 0.5) * 0.3, h += Math.cos(u) * M / 7, m += Math.sin(u) * M / 7, r.lineTo(h, m);
      if (r.lineCap = "round", r.lineWidth = C, r.strokeStyle = "rgba(" + (26 + g * 5 | 0) + "," + (22 + g * 4 | 0) + "," + (22 + g * 4 | 0) + ",1)", r.stroke(), g < 4 && M > 34) {
        const v = g === 0 ? 3 : 2;
        for (let w = 0; w < v; w++) p(h, m, u + (l() - 0.5) * 1.25, M * (0.58 + l() * 0.18), C * 0.58, g + 1);
      } else
        for (let v = 0; v < 9; v++)
          n.push([h + (l() - 0.5) * 78, m + (l() - 0.5) * 78, l() * H, 12 + l() * 20, l()]);
    }
    p(1536 * 1.02, 1024 * 0.06, Math.PI * 0.78, 420, 26, 0), p(1536 * 0.86, -1024 * 0.02, Math.PI * 0.62, 330, 18, 1);
    const i = Ie(), f = E(128, 128), d = f.getContext("2d");
    return n.forEach((c) => {
      d.clearRect(0, 0, 128, 128), d.drawImage(i, 0, 0), d.globalCompositeOperation = "source-in";
      const S = c[4];
      d.fillStyle = ae(96 + S * 96, 14 + S * 22, 16 + S * 18), d.fillRect(0, 0, 128, 128), d.globalCompositeOperation = "source-over", r.save(), r.translate(c[0], c[1]), r.rotate(c[2]), r.globalAlpha = 0.78 + S * 0.22, r.drawImage(f, -c[3], -c[3], c[3] * 2, c[3] * 2), r.restore();
    }), r.globalAlpha = 1, e;
  }
  const ve = () => Math.max(1, Be.clientWidth), se = () => Math.max(1, Be.clientHeight);
  let z, k, V, Ze = 1;
  const K = Se("q", qe ? "low" : "high") === "low", le = Se("post", "1") !== "0", Pe = Se("shadow", K ? "0" : "1") !== "0", Qe = mt("dpr", K ? 1.4 : 1.8), q = { scale: 1, acc: 0, n: 0, locked: Se("adapt", "1") === "0" };
  function Tt() {
    if (Se("nogl", "0") !== "0") throw new Error("webgl disabled");
    z = new o.WebGLRenderer({ canvas: Be, antialias: !le, alpha: !1, powerPreference: "high-performance" }), z.setPixelRatio(Math.min(devicePixelRatio || 1, Qe)), z.setSize(ve(), se(), !0), z.outputEncoding = le ? o.LinearEncoding : o.sRGBEncoding, z.toneMapping = le ? o.NoToneMapping : o.ACESFilmicToneMapping, z.toneMappingExposure = 1, z.setClearColor(329482, 1), Pe && (z.shadowMap.enabled = !0, z.shadowMap.type = o.PCFSoftShadowMap), Ze = z.capabilities.getMaxAnisotropy(), k = new o.Scene(), k.fog = new o.FogExp2(330254, 0.0168), k.background = new o.Color(395789), V = new o.PerspectiveCamera(36, ve() / se(), 0.35, 220), k.add(V);
  }
  function O(s, a) {
    a = a || {};
    const t = new o.CanvasTexture(s);
    return t.wrapS = t.wrapT = a.wrap || o.ClampToEdgeWrapping, a.repeat && t.repeat.set(a.repeat[0], a.repeat[1]), t.anisotropy = Math.min(a.aniso || 8, Ze), a.srgb !== !1 && (t.encoding = o.sRGBEncoding), t.needsUpdate = !0, t;
  }
  const Me = (s, a, t) => new o.Color().setRGB(s, a, t);
  function he(s, a, t) {
    t = t || {};
    const e = o.RepeatWrapping, r = t.aniso || 8, l = new o.MeshStandardMaterial({
      map: O(s.map, { wrap: e, repeat: a, aniso: r }),
      normalMap: O(s.normal, { wrap: e, repeat: a, srgb: !1, aniso: r }),
      normalScale: new o.Vector2(
        t.normal === void 0 ? 0.8 : t.normal,
        t.normal === void 0 ? 0.8 : t.normal
      ),
      color: t.color === void 0 ? 16777215 : t.color,
      roughness: t.roughness === void 0 ? 1 : t.roughness,
      metalness: t.metalness === void 0 ? 0.02 : t.metalness
    });
    return s.rough && (l.roughnessMap = O(s.rough, { wrap: e, repeat: a, srgb: !1 })), l;
  }
  const Ke = {}, ie = (s, a) => Ke[s] || (Ke[s] = a()), Rt = () => ie("wallWood", () => Fe(3, { boards: 7 })), Ye = () => ie("postWood", () => Fe(29, { boards: 0 }));
  function Oe(s, a) {
    const t = s.length, e = a.length, r = [], l = [], n = [], p = [], i = new o.Vector3(), f = new o.Vector3(), d = new o.Vector3(), c = new o.Vector3(0, 1, 0);
    for (let y = 0; y < t; y++) {
      const M = s[y], C = s[Math.max(0, y - 1)], g = s[Math.min(t - 1, y + 1)];
      i.subVectors(g, C).normalize(), d.crossVectors(i, c).normalize(), f.crossVectors(d, i).normalize();
      for (let x = 0; x < e; x++) {
        const h = a[x][0], m = a[x][1], u = Math.hypot(h, m) || 1;
        r.push(M.x + d.x * h + f.x * m, M.y + d.y * h + f.y * m, M.z + d.z * h + f.z * m), l.push(d.x * h / u + f.x * m / u, d.y * h / u + f.y * m / u, d.z * h / u + f.z * m / u), n.push(x / e, y / (t - 1));
      }
    }
    for (let y = 0; y < t - 1; y++) for (let M = 0; M < e; M++) {
      const C = (M + 1) % e, g = y * e + M, x = y * e + C, h = (y + 1) * e + C, m = (y + 1) * e + M;
      p.push(g, x, h, g, h, m);
    }
    [0, t - 1].forEach((y, M) => {
      const C = r.length / 3, g = s[y];
      r.push(g.x, g.y, g.z), l.push(0, 0, M ? 1 : -1), n.push(0.5, 0.5);
      for (let x = 0; x < e; x++) {
        const h = y * e + x, m = y * e + (x + 1) % e;
        M ? p.push(C, h, m) : p.push(C, m, h);
      }
    });
    const S = new o.BufferGeometry();
    return S.setAttribute("position", new o.Float32BufferAttribute(r, 3)), S.setAttribute("normal", new o.Float32BufferAttribute(l, 3)), S.setAttribute("uv", new o.Float32BufferAttribute(n, 2)), S.setIndex(p), S;
  }
  function De(s, a, t, e, r, l) {
    const i = l, f = 1e-3, d = (u, v) => {
      const w = Math.min(1, Math.abs(u) / s), b = Math.min(1, Math.abs(v) / a), A = Math.max(0, (Math.abs(u) - t) / Math.max(s - t, 1e-4)), P = Math.min(1, Math.max(A, b));
      return e * Math.pow(1 - P, 1.45) + i * e * ye(0.72, 1, P) * (0.52 + 0.68 * Math.min(w, b));
    }, c = [], S = [], y = [], M = [], C = new o.Vector3(), g = 1855;
    for (let u = 0; u < 2; u++) {
      for (let v = 0; v <= 34; v++) for (let w = 0; w <= 52; w++) {
        const b = -s + 2 * s * w / 52, A = -a + 2 * a * v / 34;
        C.set(
          -(d(b + f, A) - d(b - f, A)) / (2 * f),
          1,
          -(d(b, A + f) - d(b, A - f)) / (2 * f)
        ).normalize(), u && C.negate(), c.push(b, d(b, A) - (u ? r : 0), A), S.push(C.x, C.y, C.z), y.push(b * 0.14, A * 0.14);
      }
      for (let v = 0; v < 34; v++) for (let w = 0; w < 52; w++) {
        const b = u * g + v * 53 + w, A = b + 1, P = b + 52 + 2, G = b + 52 + 1;
        u ? M.push(b, P, A, b, G, P) : M.push(b, A, P, b, P, G);
      }
    }
    const x = [];
    for (let u = 0; u <= 52; u++) x.push([u, 0]);
    for (let u = 1; u <= 34; u++) x.push([52, u]);
    for (let u = 51; u >= 0; u--) x.push([u, 34]);
    for (let u = 33; u >= 1; u--) x.push([0, u]);
    const h = c.length / 3;
    x.forEach((u) => {
      const v = -s + 2 * s * u[0] / 52, w = -a + 2 * a * u[1] / 34, b = u[0] === 0 ? -1 : u[0] === 52 ? 1 : 0, A = u[1] === 0 ? -1 : u[1] === 34 ? 1 : 0, P = Math.hypot(b, A) || 1, G = d(v, w);
      c.push(v, G, w, v, G - r, w), S.push(b / P, 0, A / P, b / P, 0, A / P), y.push(0, 0, 0, 1);
    });
    for (let u = 0; u < x.length; u++) {
      const v = h + u * 2, w = v + 1, b = h + (u + 1) % x.length * 2, A = b + 1;
      M.push(v, w, A, v, A, b);
    }
    const m = new o.BufferGeometry();
    return m.setAttribute("position", new o.Float32BufferAttribute(c, 3)), m.setAttribute("normal", new o.Float32BufferAttribute(S, 3)), m.setAttribute("uv", new o.Float32BufferAttribute(y, 2)), m.setIndex(M), m;
  }
  function Te(s) {
    let a = 0, t = 0;
    s.forEach((d) => {
      a += d.attributes.position.count, t += d.index.count;
    });
    const e = new Float32Array(a * 3), r = new Float32Array(a * 3), l = new Float32Array(a * 2), n = a > 65535 ? new Uint32Array(t) : new Uint16Array(t);
    let p = 0, i = 0;
    s.forEach((d) => {
      e.set(d.attributes.position.array, p * 3), r.set(d.attributes.normal.array, p * 3), l.set(d.attributes.uv.array, p * 2);
      const c = d.index.array;
      for (let S = 0; S < c.length; S++) n[i + S] = c[S] + p;
      i += c.length, p += d.attributes.position.count, d.dispose();
    });
    const f = new o.BufferGeometry();
    return f.setAttribute("position", new o.BufferAttribute(e, 3)), f.setAttribute("normal", new o.BufferAttribute(r, 3)), f.setAttribute("uv", new o.BufferAttribute(l, 2)), f.setIndex(new o.BufferAttribute(n, 1)), f;
  }
  const W = {}, ee = 7, ce = 40, Je = -11, Re = 0.55, $e = 8.4, D = -44;
  function Gt() {
    const s = wt(), a = O(s.map, { wrap: o.RepeatWrapping, repeat: [4, 1.4] }), t = O(s.normal, { wrap: o.RepeatWrapping, repeat: [4, 1.4], srgb: !1 }), e = new o.MeshStandardMaterial({
      map: a,
      normalMap: t,
      normalScale: new o.Vector2(0.85, 0.85),
      roughness: 0.78,
      metalness: 0.05,
      color: 5397600
    }), r = new o.Mesh(
      new o.PlaneGeometry(360, 190),
      new o.MeshBasicMaterial({
        color: Me(0.6, 0.7, 0.8),
        map: O(Mt()),
        depthWrite: !1,
        fog: !1,
        toneMapped: !1
      })
    );
    r.position.set(0, 62, -108), r.renderOrder = 0, k.add(r), W.sky = r;
    const l = O(Xe(), { wrap: o.RepeatWrapping, repeat: [1.7, 1] });
    [[-90, 13, 300, 26, 0], [-63, 9.5, 210, 19, 16]].forEach((g, x) => {
      const h = new o.Mesh(
        new o.PlaneGeometry(g[2], g[3]),
        /* fog off: at a hundred metres it would lift a black silhouette to 80%
           of the fog colour, and the treeline came back as a *pale* band */
        new o.MeshBasicMaterial({
          map: x ? O(Xe()) : l,
          transparent: !0,
          color: x ? 659477 : 395533,
          depthWrite: !1,
          fog: !1
        })
      );
      h.position.set(g[4], g[1], g[0]), h.renderOrder = 1, k.add(h);
    });
    const n = St(), p = new o.MeshStandardMaterial({
      map: O(n.map, { wrap: o.RepeatWrapping, repeat: [7, 7], aniso: 16 }),
      normalMap: O(n.normal, { wrap: o.RepeatWrapping, repeat: [7, 7], srgb: !1, aniso: 16 }),
      roughnessMap: O(n.rough, { wrap: o.RepeatWrapping, repeat: [3.4, 3.4], srgb: !1 }),
      normalScale: new o.Vector2(0.3, 0.3),
      /* The court used to carry a planar mirror and this was tuned to feed it —
         near-polished, and metal enough to hold a reflection. With the mirror
         gone those numbers only made the paving read as sheet metal, so it goes
         back to being wet stone: rough, barely metallic, and lit rather than
         reflecting. */
      roughness: 0.74,
      metalness: 0.06,
      color: 6911354
    }), i = new o.Mesh(new o.PlaneGeometry(150, 150), p);
    i.rotation.x = -Math.PI / 2, i.position.set(0, 0, -18), i.receiveShadow = !0, k.add(i), W.floor = i, W.floorMat = p;
    const f = new o.MeshStandardMaterial({
      map: O(n.map, { wrap: o.RepeatWrapping, repeat: [3, 1.2], aniso: 16 }),
      normalMap: O(n.normal, { wrap: o.RepeatWrapping, repeat: [3, 1.2], srgb: !1, aniso: 16 }),
      normalScale: new o.Vector2(0.18, 0.18),
      roughness: 0.93,
      metalness: 0.02,
      color: 5792618
    }), d = new o.Mesh(new o.BoxGeometry(42, ee, 24), f);
    d.position.set(0, ee / 2, -45), d.receiveShadow = !0, d.castShadow = !0, k.add(d);
    const c = new o.Mesh(new o.BoxGeometry(43, 0.34, 25), e);
    c.position.set(0, ee - 0.17, -45), c.receiveShadow = !0, k.add(c);
    const S = [], y = [];
    for (let g = 0; g < ce; g++) {
      const x = (g + 1) * (ee / ce), h = Je - (g + 0.5) * Re, m = $e + (ce - g) * 0.052;
      S.push(new o.BoxGeometry(m, ee / ce + 0.04, Re + 0.04).translate(0, x - ee / ce / 2, h)), [-1, 1].forEach((u) => y.push(new o.BoxGeometry(0.9, 1.5, Re + 0.06).translate(u * (m / 2 + 0.45), x - 0.3, h)));
    }
    const M = new o.Mesh(Te(S), f);
    M.receiveShadow = !0, M.castShadow = !0, k.add(M);
    const C = new o.Mesh(Te(y), e);
    C.receiveShadow = !0, C.castShadow = !0, k.add(C);
  }
  function Ht() {
    const s = new o.Group(), a = he(Rt(), [4, 1.6], { color: 5656912, normal: 1.5 }), t = he(Ye(), [1.1, 1], { color: 9073773, normal: 1.05, metalness: 0.03 }), e = new o.MeshStandardMaterial({ color: 9400110, roughness: 0.38, metalness: 0.78 }), r = ie("roof", () => Ct()), l = he(r, [1, 1], { color: 2831418, roughness: 0.74, metalness: 0.1, normal: 1.4 }), n = new o.MeshBasicMaterial({ color: Me(1.06, 0.48, 0.18), fog: !0, toneMapped: !1 }), p = new o.MeshBasicMaterial({
      map: O(vt()),
      transparent: !0,
      depthWrite: !1,
      fog: !0
    });
    W.paper = n;
    function i(w, b, A, P, G) {
      const F = new o.Mesh(new o.PlaneGeometry(w, b), n);
      F.position.set(A, P, G), s.add(F);
      const R = new o.Mesh(new o.PlaneGeometry(w, b), p);
      R.position.set(A, P, G + 0.06), R.renderOrder = 3, s.add(R);
    }
    function f(w, b, A, P) {
      const G = [];
      for (let R = -w; R <= w + 1e-3; R += P)
        [-b, b].forEach((I) => {
          G.push(new o.BoxGeometry(0.34, 0.46, 0.34).translate(R, A, D + I)), G.push(new o.BoxGeometry(0.92, 0.17, 0.24).translate(R, A + 0.3, D + I));
        });
      for (let R = -b + P; R < b - 1e-3; R += P)
        [-w, w].forEach((I) => {
          G.push(new o.BoxGeometry(0.34, 0.46, 0.34).translate(I, A, D + R)), G.push(new o.BoxGeometry(0.24, 0.17, 0.92).translate(I, A + 0.3, D + R));
        });
      const F = new o.Mesh(Te(G), t);
      F.castShadow = !1, s.add(F);
    }
    const d = ee, c = new o.Mesh(new o.BoxGeometry(13.6, 5, 8.2), a);
    c.position.set(0, d + 2.5, D), c.castShadow = !0, s.add(c);
    for (let w = 0; w < 5; w++) {
      const b = -5.6 + w * 2.8;
      i(1.55, 2.5, b, d + 2.6, D + 4.16);
    }
    for (let w = 0; w < 6; w++) {
      const b = new o.Mesh(new o.CylinderGeometry(0.3, 0.34, 5, 14), t);
      b.position.set(-7 + w * 2.8, d + 2.5, D + 4.24), b.castShadow = !0, s.add(b);
    }
    const S = new o.Mesh(new o.BoxGeometry(14.6, 0.4, 8.9), t);
    S.position.set(0, d + 0.2, D), s.add(S), f(7, 4.4, d + 5.15, 1.4);
    const y = new o.Mesh(De(9.6, 6.4, 3.2, 2.9, 0.4, 0.26), l);
    y.position.set(0, d + 5.6, D), y.castShadow = !0, s.add(y);
    const M = new o.Mesh(new o.BoxGeometry(10, 3.4, 6), a);
    M.position.set(0, d + 9.4, D), M.castShadow = !0, s.add(M);
    const C = new o.Mesh(new o.BoxGeometry(12.4, 0.26, 8.4), t);
    C.position.set(0, d + 7.72, D), s.add(C), [0.1, 0.94].forEach((w) => [4.2, -4.2].forEach((b) => {
      const A = new o.Mesh(new o.BoxGeometry(12.4, 0.17, 0.17), t);
      A.position.set(0, d + 7.85 + w, D + b), s.add(A);
    }));
    for (let w = 0; w <= 16; w++) {
      const b = new o.Mesh(new o.BoxGeometry(0.1, 1.05, 0.1), t);
      b.position.set(-6.2 + w * 0.775, d + 8.42, D + 4.2), s.add(b);
    }
    for (let w = 0; w < 4; w++)
      i(1, 1.35, -4.5 + w * 3, d + 9.5, D + 3.06);
    const g = new o.Mesh(new o.BoxGeometry(1.9, 1.3, 0.16), e);
    g.position.set(0, d + 9.7, D + 3.12), s.add(g);
    const x = new o.Mesh(new o.BoxGeometry(1.52, 0.98, 0.18), a);
    x.position.set(0, d + 9.7, D + 3.16), s.add(x), f(5.2, 3.3, d + 11.2, 1.3);
    const h = new o.Mesh(De(10.8, 7.2, 3.6, 5.2, 0.48, 0.26), l);
    h.position.set(0, d + 11.7, D), h.castShadow = !0, s.add(h);
    const m = new o.Mesh(new o.BoxGeometry(7.6, 0.6, 1.05), l);
    m.position.set(0, d + 17.1, D), s.add(m), [-1, 1].forEach((w) => {
      const b = new o.Mesh(new o.ConeGeometry(0.46, 1.15, 4), l);
      b.position.set(w * 3.9, d + 17.6, D), b.rotation.y = Math.PI / 4, s.add(b);
    }), W.templeTop = d + 18.2, [-1, 1].forEach((w) => {
      const b = new o.Mesh(new o.BoxGeometry(7.6, 3.4, 5.2), a);
      b.position.set(w * 10.6, d + 1.7, D + 1.4), b.castShadow = !0, s.add(b);
      for (let P = 0; P < 3; P++)
        i(1.3, 1.6, w * 10.6 + (P - 1) * 2.4, d + 1.8, D + 4.06);
      const A = new o.Mesh(De(5, 4, 1.4, 1.9, 0.32, 0.26), l);
      A.position.set(w * 10.6, d + 3.4, D + 1.4), A.castShadow = !0, s.add(A);
    }), k.add(s), W.temple = s;
    const u = new o.Mesh(
      new o.PlaneGeometry(30, 16),
      new o.MeshBasicMaterial({
        map: O(ue("rgba(255,150,66,.80)", "rgba(240,96,26,.24)")),
        transparent: !0,
        blending: o.AdditiveBlending,
        depthWrite: !1,
        fog: !1,
        opacity: 0.3
      })
    );
    u.position.set(0, d + 3, D + 5.6), u.renderOrder = 2, k.add(u), W.hallHalo = u;
    const v = new o.Mesh(
      new o.PlaneGeometry(64, 20),
      new o.MeshBasicMaterial({
        map: O(ue("rgba(150,178,190,.62)", "rgba(104,138,154,.20)")),
        transparent: !0,
        blending: o.AdditiveBlending,
        depthWrite: !1,
        fog: !1,
        opacity: 0.17
      })
    );
    v.position.set(0, d - 1.4, D + 10), v.renderOrder = 2, k.add(v);
  }
  const Y = { x: 17.9, y: 31.9, z: -72, r: 8.6 };
  function kt() {
    const s = new o.Mesh(
      new o.PlaneGeometry(Y.r * 2, Y.r * 2),
      /* The whole blood-moon grade lives here, on a near-neutral albedo. The
         plate measures G/R ≈ B/R ≈ .48, but that is a *display* ratio: the map
         is decoded out of sRGB before this multiplies it, so the tint has to be
         written in linear, where the same look is ≈ .21. Reading the ratio
         straight off the reference is what left the moon a pale pink. */
      new o.MeshBasicMaterial({
        map: O(At()),
        color: Me(3.6, 0.64, 0.61),
        transparent: !0,
        depthWrite: !1,
        fog: !1,
        toneMapped: !1
      })
    );
    s.position.set(Y.x, Y.y, Y.z), s.renderOrder = 1, k.add(s), W.moon = s;
    const a = new o.Mesh(
      new o.PlaneGeometry(Y.r * 6.4, Y.r * 6.4),
      new o.MeshBasicMaterial({
        map: O(ue("rgba(255,124,112,.90)", "rgba(206,52,48,.26)")),
        transparent: !0,
        blending: o.AdditiveBlending,
        depthWrite: !1,
        fog: !1,
        opacity: 0.44
      })
    );
    a.position.set(Y.x, Y.y, Y.z - 0.3), a.renderOrder = 0, k.add(a), W.moonHalo = a;
  }
  function Bt() {
    if (!W.moon) return;
    const s = Y.x * (1 - 0.4 * dt());
    W.moon.position.x = s, W.moonHalo.position.x = s;
  }
  function Et() {
    const s = he(
      ie("lacquer", () => xt()),
      [2, 2],
      { color: Me(1.72, 1.02, 0.94), roughness: 0.92, metalness: 0.05, normal: 0.75 }
    ), a = new o.MeshStandardMaterial({ color: 8019242, roughness: 0.5, metalness: 0.6 }), t = new o.Group(), e = 0.78, r = 8.2, l = 3.55;
    [-1, 1].forEach((M) => {
      const C = new o.Mesh(new o.CylinderGeometry(0.3, 0.38, r, 26), s);
      C.position.set(M * l, e + r / 2, 0), C.castShadow = !0, t.add(C);
      const g = new o.Mesh(new o.CylinderGeometry(0.46, 0.5, 0.52, 26), a);
      g.position.set(M * l, e + 0.26, 0), g.castShadow = !0, t.add(g);
      const x = new o.Mesh(new o.CylinderGeometry(0.345, 0.345, 0.26, 26), a);
      x.position.set(M * l, e + r - 1.42, 0), t.add(x);
      const h = new o.Mesh(new o.BoxGeometry(0.86, 0.3, 0.86), a);
      h.position.set(M * l, e + r - 0.72, 0), t.add(h);
      const m = new o.Mesh(new o.BoxGeometry(0.6, 0.52, 0.6), a);
      m.position.set(M * l, e + r - 0.34, 0), t.add(m), [-1, 1].forEach((u) => {
        const v = new o.Mesh(new o.BoxGeometry(0.24, 0.7, 0.18), a);
        v.position.set(M * l + u * 0.4, e + r - 0.62, 0.3), t.add(v);
        const w = v.clone();
        w.position.z = -0.3, t.add(w);
      });
    });
    const n = new o.Mesh(new o.BoxGeometry(9.4, 0.52, 0.46), s);
    n.position.set(0, e + r - 2.15, 0), n.castShadow = !0, t.add(n);
    const p = new o.Mesh(new o.BoxGeometry(0.46, 1.22, 0.4), s);
    p.position.set(0, e + r + 0.1, 0), t.add(p);
    const i = new o.Mesh(new o.BoxGeometry(0.6, 0.18, 0.5), a);
    i.position.set(0, e + r + 0.68, 0), t.add(i);
    function f(M, C, g) {
      const x = [];
      for (let h = 0; h <= 26; h++) {
        const m = h / 26 * 2 - 1;
        x.push(new o.Vector3(m * M, Math.pow(Math.abs(m), g) * C, 0));
      }
      return x;
    }
    const d = new o.Mesh(Oe(
      f(5.05, 0.4, 2.6),
      [[-0.3, -0.19], [0.3, -0.19], [0.32, 0.06], [0.28, 0.21], [-0.28, 0.21], [-0.32, 0.06]]
    ), s);
    d.position.set(0, e + r - 0.52, 0), d.castShadow = !0, t.add(d);
    const c = new o.Mesh(Oe(
      f(5.85, 0.62, 2.4),
      [[-0.42, -0.24], [0.42, -0.24], [0.46, 0.04], [0.3, 0.28], [-0.3, 0.28], [-0.46, 0.04]]
    ), s);
    c.position.set(0, e + r + 0.96, 0), c.castShadow = !0, t.add(c);
    const S = new o.Mesh(
      Oe(
        f(5.95, 0.62, 2.4),
        [[-0.48, 0.22], [0.48, 0.22], [0.48, 0.34], [-0.48, 0.34]]
      ),
      new o.MeshStandardMaterial({ color: 1182732, roughness: 0.42, metalness: 0.14 })
    );
    S.position.set(0, e + r + 0.96, 0), t.add(S);
    const y = 0.72;
    t.position.set(0, -e * y, -8.6), t.scale.setScalar(y), k.add(t), W.torii = t;
  }
  function Ge(s, a, t, e) {
    const r = ie("lanternStone", () => he(
      ie("granite", () => yt(17)),
      [1.5, 1.5],
      { color: 10134949, metalness: 0, normal: 1.45 }
    )), l = ie("lanternDark", () => he(
      Ye(),
      [0.9, 0.9],
      { color: 14205622, metalness: 0.1, normal: 0.7 }
    )), n = new o.Group(), p = new o.Mesh(new o.CylinderGeometry(0.44, 0.52, 0.26, 20), r);
    p.position.y = 0.13, p.castShadow = !0, n.add(p);
    const i = new o.Mesh(new o.CylinderGeometry(0.15, 0.18, 1.02, 16), r);
    i.position.y = 0.77, i.castShadow = !0, n.add(i);
    const f = new o.Mesh(new o.CylinderGeometry(0.42, 0.34, 0.13, 20), r);
    f.position.y = 1.34, f.castShadow = !0, n.add(f);
    const d = new o.Mesh(new o.BoxGeometry(0.5, 0.5, 0.5), l);
    d.position.y = 1.66, d.castShadow = !0, n.add(d);
    const c = new o.MeshBasicMaterial({ color: Me(2.3, 0.3, 0.085), fog: !1, toneMapped: !1 });
    [[0, 0, 0.256, 0], [0, 0, -0.256, Math.PI], [0.256, 0, 0, Math.PI / 2], [-0.256, 0, 0, -Math.PI / 2]].forEach((h) => {
      const m = new o.Mesh(new o.PlaneGeometry(0.34, 0.34), c);
      m.position.set(h[0], 1.66, h[2]), m.rotation.y = h[3], n.add(m);
    }), W.lanternPane = W.lanternPane || c;
    const S = new o.Mesh(new o.CylinderGeometry(0.1, 0.62, 0.34, 4, 1), r);
    S.position.y = 2.06, S.rotation.y = Math.PI / 4, S.castShadow = !0, n.add(S);
    const y = new o.Mesh(new o.CylinderGeometry(0.66, 0.7, 0.07, 4, 1), r);
    y.position.y = 1.93, y.rotation.y = Math.PI / 4, n.add(y);
    const M = new o.Mesh(new o.SphereGeometry(0.09, 12, 10), r);
    M.position.y = 2.28, n.add(M);
    const C = new o.Mesh(new o.ConeGeometry(0.055, 0.16, 10), r);
    C.position.y = 2.4, n.add(C);
    const g = new o.Mesh(
      new o.PlaneGeometry(3.4, 3.4),
      new o.MeshBasicMaterial({
        map: O(ue("rgba(255,120,60,.9)", "rgba(255,60,24,.28)")),
        transparent: !0,
        blending: o.AdditiveBlending,
        depthWrite: !1,
        fog: !1,
        opacity: 0.5
      })
    );
    g.position.y = 1.66, g.renderOrder = 2, n.add(g), g.userData.billboard = !0;
    const x = new o.PointLight(16734756, 2.6, 9, 2);
    return x.position.set(0, 1.66, 0), n.add(x), W.lanternLights = W.lanternLights || [], W.lanternLights.push(x), W.lanternGlows = W.lanternGlows || [], W.lanternGlows.push(g), n.position.set(s, e || 0, a), n.scale.setScalar(t || 1), k.add(n), n;
  }
  function Ce(s, a, t, e) {
    const r = _(s), l = [], n = [], p = new o.Matrix4(), i = new o.Quaternion(), f = new o.Vector3(0, 1, 0), d = new o.Vector3(), c = new o.Vector3();
    function S(G, F, R, I) {
      d.subVectors(F, G);
      const U = d.length();
      d.normalize();
      const N = new o.CylinderGeometry(I, R, U, 6, 1, !0);
      i.setFromUnitVectors(f, d), c.addVectors(G, F).multiplyScalar(0.5), p.compose(c, i, new o.Vector3(1, 1, 1)), N.applyMatrix4(p), l.push(N);
    }
    function y(G, F, R, I, U) {
      const N = G.clone().addScaledVector(F, R);
      if (N.y += R * 0.1, S(G, N, I, I * 0.68), U >= 4 || R < 0.34) {
        n.push(N.clone());
        return;
      }
      const X = U < 2 ? 3 : 2;
      for (let Z = 0; Z < X; Z++) {
        const J = F.clone();
        J.x += (r() - 0.5) * 1.25, J.z += (r() - 0.5) * 1.25, J.y += 0.3 + r() * 0.5, J.normalize(), y(N, J, R * (0.62 + r() * 0.16), I * 0.66, U + 1);
      }
    }
    const M = new o.Vector3(0, 0, 0);
    S(M, new o.Vector3(0, 1.5, 0), 0.22, 0.16);
    for (let G = 0; G < 4; G++) {
      const F = G / 4 * H + r();
      y(new o.Vector3(0, 1.5, 0), new o.Vector3(Math.cos(F) * 0.8, 0.8, Math.sin(F) * 0.8).normalize(), 1.45, 0.155, 0);
    }
    const C = new o.Mesh(
      Te(l),
      new o.MeshStandardMaterial({ color: 1512467, roughness: 0.94, metalness: 0, side: o.DoubleSide })
    );
    C.castShadow = !0;
    const g = new o.PlaneGeometry(0.36, 0.36), x = new o.MeshStandardMaterial({
      map: O(Ie()),
      color: 2819078,
      alphaTest: 0.42,
      side: o.DoubleSide,
      roughness: 0.86,
      metalness: 0,
      emissive: 524288,
      emissiveIntensity: 0.12
    }), h = K ? 5 : 9, m = new o.InstancedMesh(g, x, n.length * h), u = new o.Matrix4(), v = new o.Euler(), w = new o.Quaternion(), b = new o.Vector3();
    let A = 0;
    n.forEach((G) => {
      for (let F = 0; F < h; F++) {
        const R = new o.Vector3(G.x + (r() - 0.5) * 0.95, G.y + (r() - 0.5) * 0.8, G.z + (r() - 0.5) * 0.95);
        v.set(r() * H, r() * H, r() * H), w.setFromEuler(v);
        const I = 0.7 + r() * 0.75;
        b.set(I, I, I), u.compose(R, w, b), m.setMatrixAt(A++, u);
      }
    }), m.instanceMatrix.needsUpdate = !0, m.castShadow = !1, m.frustumCulled = !1;
    const P = new o.Group();
    return P.add(C), P.add(m), P.position.set(a, 0, t), P.scale.setScalar(e || 1), P.rotation.y = r() * H, k.add(P), x.onBeforeCompile = (G) => {
      G.uniforms.uT = W.uT, G.vertexShader = `uniform float uT;
` + G.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
vec3 wp = (instanceMatrix * vec4(0.0,0.0,0.0,1.0)).xyz;
float ph = wp.x*1.7 + wp.z*1.3 + wp.y*.7;
transformed.x += sin(uT*1.35 + ph)*0.055;
transformed.z += cos(uT*1.05 + ph*1.3)*0.045;
`
      );
    }, P;
  }
  function Ft() {
    const s = new o.MeshStandardMaterial({ color: 1317404, roughness: 0.46, metalness: 0.1 }), a = _(404), t = We(88);
    [
      [-6.2, -5.4, 0.95],
      [-7.4, -2.1, 0.7],
      [6.6, -7.2, 0.8],
      [8, -4, 1.05],
      [-9, -8.4, 1.15],
      [9.6, -9.2, 0.9],
      [3.4, -7.8, 0.55],
      [-3.2, -8.6, 0.6]
    ].forEach((r, l) => {
      const n = new o.IcosahedronGeometry(r[2], 2), p = n.attributes.position;
      for (let f = 0; f < p.count; f++) {
        const d = p.getX(f), c = p.getY(f), S = p.getZ(f), y = 1 + 0.34 * re(t, d * 1.6 + l * 7, S * 1.6 + c, 3, 2.2, 0.5);
        p.setXYZ(f, d * y, c * y * 0.68, S * y);
      }
      n.computeVertexNormals();
      const i = new o.Mesh(n, s);
      i.position.set(r[0], r[2] * 0.3, r[1]), i.rotation.set(a(), a() * H, a() * 0.4), i.castShadow = !0, i.receiveShadow = !0, k.add(i);
    });
  }
  function It(s, a) {
    const t = new o.MeshBasicMaterial({
      map: O(s, { aniso: 16 }),
      transparent: !0,
      depthWrite: !0,
      alphaTest: 0.012,
      side: o.DoubleSide,
      fog: !0,
      color: 16777215
    });
    return t.onBeforeCompile = (e) => {
      e.uniforms.uT = W.uT, e.uniforms.uSway = { value: a || 0.07 }, e.vertexShader = `uniform float uT;
uniform float uSway;
` + e.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
float h = uv.y;
float ph = position.x*0.30 + float(gl_InstanceID)*0.0;
transformed.x += sin(uT*0.85 + ph)*uSway*h*h;
transformed.y += cos(uT*0.62 + ph*1.7)*uSway*0.35*h*h;
`
      ), e.fragmentShader = e.fragmentShader.replace(
        "#include <alphatest_fragment>",
        `float feX = smoothstep(0.0, 0.11, vUv.x) * (1.0 - smoothstep(0.89, 1.0, vUv.x));
float feY = smoothstep(0.0, 0.07, vUv.y);
diffuseColor.a *= feX * feY;
#include <alphatest_fragment>`
      );
    }, t;
  }
  function zt() {
    const s = [
      /* name        canvas                                                                     x     y     z     w     h   sway */
      [
        "grassFar",
        ze(101, { crest: 0.3, peak: 0.46, wide: 0.42, blades: 11e3, len: 34, warm: 0.7, crest2: 0.46, crest3: 0.4 }),
        -3.4,
        2.85,
        -0.4,
        24,
        12,
        0.04
      ],
      [
        "rockLeft",
        je(404, { blobs: [[0.24, 0.78, 0.48, 0.38], [0.58, 0.94, 0.46, 0.3], [0.84, 1.06, 0.42, 0.28]] }),
        -7.2,
        2.55,
        1.8,
        17,
        11.3,
        0.01
      ],
      [
        "grassMid",
        ze(202, { crest: 0.6, peak: 0.55, wide: 0.4, blades: 13e3, len: 40, warm: 0.95, crest2: -0.44, crest3: 0.34 }),
        3.9,
        2.86,
        3.6,
        15,
        7.5,
        0.062
      ],
      [
        "grassNear",
        ze(303, { crest: 0.42, peak: 0.62, wide: 0.48, blades: 16e3, len: 50, warm: 0.85, crest2: 0.42, crest3: 0.44 }),
        -1.9,
        2.92,
        5.6,
        12,
        6,
        0.092
      ],
      ["bough", Pt(505), 4.6, 2.95, 6.4, 13, 8.7, 0.045],
      [
        "rockNear",
        je(606, { blobs: [[0.18, 0.86, 0.54, 0.44], [0.54, 1.02, 0.5, 0.36], [0.86, 0.92, 0.4, 0.32]] }),
        -6.6,
        1.7,
        6,
        9,
        6,
        8e-3
      ]
    ];
    W.fg = [], s.forEach((a) => {
      const t = new o.Mesh(new o.PlaneGeometry(a[5], a[6], 12, 12), It(a[1], a[7]));
      t.position.set(a[2], a[3], a[4]), t.renderOrder = 20 + W.fg.length, t.name = a[0], t.frustumCulled = !1, k.add(t), W.fg.push(t);
    });
  }
  function Ot() {
    const s = O(ue("rgba(160,205,210,.55)", "rgba(110,165,175,.18)"));
    W.haze = [];
    const a = _(66);
    for (let c = 0; c < (K ? 4 : 6); c++) {
      const S = 12 + a() * 15, y = new o.Mesh(
        new o.PlaneGeometry(S, S * 0.55),
        new o.MeshBasicMaterial({
          map: s,
          transparent: !0,
          blending: o.AdditiveBlending,
          depthWrite: !1,
          fog: !1,
          opacity: 0.05 + a() * 0.07
        })
      );
      y.position.set((a() - 0.5) * 44, 1.5 + a() * 10, -38 + a() * 40), y.renderOrder = 4, y.userData = { sp: 0.06 + a() * 0.12, ph: a() * H, x0: y.position.x }, k.add(y), W.haze.push(y);
    }
    const t = K ? 220 : 460, e = new Float32Array(t * 3), r = new Float32Array(t);
    for (let c = 0; c < t; c++)
      e[c * 3] = (a() - 0.5) * 30, e[c * 3 + 1] = a() * 11, e[c * 3 + 2] = -26 + a() * 36, r[c] = a();
    const l = new o.BufferGeometry();
    l.setAttribute("position", new o.BufferAttribute(e, 3)), l.setAttribute("aSeed", new o.BufferAttribute(r, 1));
    const n = new o.Points(l, new o.ShaderMaterial({
      uniforms: {
        uT: W.uT,
        uTex: { value: O(ue("rgba(255,190,140,1)", "rgba(255,120,60,.35)")) },
        uSize: { value: se() * 0.5 }
      },
      transparent: !0,
      blending: o.AdditiveBlending,
      depthWrite: !1,
      vertexShader: `attribute float aSeed; uniform float uT; uniform float uSize; varying float vA;
void main(){ vec3 p=position;
 p.y = mod(p.y + uT*(0.14+aSeed*0.28), 11.5);
 p.x += sin(uT*0.36 + aSeed*22.0)*0.85;
 p.z += cos(uT*0.29 + aSeed*17.0)*0.7;
 vec4 mv = modelViewMatrix * vec4(p,1.0);
 vA = (0.25+aSeed*0.75) * smoothstep(11.5,7.0,p.y) * smoothstep(0.0,1.4,p.y);
 gl_PointSize = uSize*(0.010+aSeed*0.020)/max(-mv.z,0.6);
 gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uTex; varying float vA;
void main(){ vec4 t=texture2D(uTex, gl_PointCoord);
 gl_FragColor = vec4(t.rgb*vec3(1.6,0.78,0.42), t.a*vA*0.75); }`
    }));
    if (n.frustumCulled = !1, n.renderOrder = 5, k.add(n), W.embers = n, !K) {
      const S = new Float32Array(5400), y = new Float32Array(900 * 2), M = new Float32Array(900 * 2), C = new Float32Array(900 * 2);
      for (let h = 0; h < 900; h++) {
        const m = (a() - 0.5) * 40, u = -30 + a() * 34, v = a() * 17, w = 7 + a() * 9, b = 0.3 + a() * 0.55;
        for (let A = 0; A < 2; A++) {
          const P = (h * 2 + A) * 3;
          S[P] = m, S[P + 1] = v, S[P + 2] = u, y[h * 2 + A] = A, M[h * 2 + A] = w, C[h * 2 + A] = b;
        }
      }
      const g = new o.BufferGeometry();
      g.setAttribute("position", new o.BufferAttribute(S, 3)), g.setAttribute("aTop", new o.BufferAttribute(y, 1)), g.setAttribute("aSpeed", new o.BufferAttribute(M, 1)), g.setAttribute("aLen", new o.BufferAttribute(C, 1));
      const x = new o.LineSegments(g, new o.ShaderMaterial({
        uniforms: { uT: W.uT },
        transparent: !0,
        blending: o.AdditiveBlending,
        depthWrite: !1,
        vertexShader: `attribute float aTop; attribute float aSpeed; attribute float aLen; uniform float uT; varying float vA;
void main(){ vec3 p=position;
 float y = mod(p.y - uT*aSpeed, 17.0);
 p.y = y + aTop*aLen;
 vA = smoothstep(0.0,3.0,y)*smoothstep(17.0,11.0,y);
 gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,
        fragmentShader: `varying float vA;
void main(){ gl_FragColor = vec4(0.55,0.74,0.82, vA*0.024); }`
      }));
      x.frustumCulled = !1, x.renderOrder = 6, k.add(x), W.rain = x;
    }
    const p = E(256, 256), i = p.getContext("2d"), f = i.createRadialGradient(128, 128, 84, 128, 128, 128);
    f.addColorStop(0, "rgba(255,255,255,0)"), f.addColorStop(0.62, "rgba(255,255,255,.55)"), f.addColorStop(0.86, "rgba(255,255,255,.22)"), f.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = f, i.fillRect(0, 0, 256, 256);
    const d = O(p);
    W.ripples = [];
    for (let c = 0; c < (K ? 6 : 13); c++) {
      const S = new o.Mesh(
        new o.PlaneGeometry(1, 1),
        new o.MeshBasicMaterial({
          map: d,
          transparent: !0,
          blending: o.AdditiveBlending,
          depthWrite: !1,
          fog: !0,
          opacity: 0
        })
      );
      S.rotation.x = -Math.PI / 2, S.renderOrder = 7, S.userData = { t: a() * 4, x: (a() - 0.5) * 22, z: -8 + a() * 22, sp: 0.5 + a() * 0.5 }, k.add(S), W.ripples.push(S);
    }
  }
  const et = 11, Dt = 12, te = 30;
  function Lt() {
    const s = K ? 110 : 260, a = new o.MeshStandardMaterial({
      map: O(Ie()),
      alphaTest: 0.42,
      side: o.DoubleSide,
      color: 4196362,
      roughness: 0.84,
      metalness: 0,
      /* green and blue driven to nothing: the composite tone-maps at the end,
         and an emissive red with any green in it comes back out of that pink */
      emissive: 7864832,
      emissiveIntensity: 0.72
    }), t = new o.InstancedMesh(new o.PlaneGeometry(0.4, 0.4), a, s);
    t.frustumCulled = !1, t.renderOrder = 5, t.castShadow = t.receiveShadow = !1;
    const e = _(404), r = [];
    for (let l = 0; l < s; l++) r.push({
      x: (e() - 0.5) * 2 * te,
      z: (e() - 0.5) * 2 * te,
      y: e() * 26,
      fall: 0.5 + e() * 0.9,
      sway: 0.45 + e() * 1.5,
      swayPh: e() * H,
      swayAmp: 0.3 + e() * 0.95,
      spin: (e() - 0.5) * 2.6,
      roll: e() * H,
      rollSp: 0.5 + e() * 2,
      tilt: e() * H,
      s: 0.55 + e() * 0.9
    });
    k.add(t), W.leaves = { mesh: t, list: r };
  }
  const tt = new o.Matrix4(), ot = new o.Quaternion(), at = new o.Euler(), nt = new o.Vector3(), rt = new o.Vector3(), de = new o.Vector3();
  function Nt(s) {
    const a = W.leaves;
    if (!a) return;
    const t = V.position.y, e = a.list;
    V.getWorldDirection(de), de.y = 0, de.lengthSq() < 1e-6 ? de.set(0, 0, -1) : de.normalize();
    const r = V.position.x + de.x * et, l = V.position.z + de.z * et, n = !a.seeded;
    a.seeded = !0;
    for (let p = 0; p < e.length; p++) {
      const i = e[p];
      if (i.y -= i.fall * s, i.roll += i.rollSp * s, i.tilt += i.spin * s, n || i.y < t - 10) {
        i.y = n ? t - 10 + Math.random() * 26 : t + 16;
        const S = Math.random() * H, y = Math.sqrt(Math.random()) * Dt;
        i.x = r + Math.cos(S) * y, i.z = l + Math.sin(S) * y;
      }
      const f = V.position.x, d = V.position.z;
      i.x - f > te ? i.x -= 2 * te : i.x - f < -te && (i.x += 2 * te), i.z - d > te ? i.z -= 2 * te : i.z - d < -te && (i.z += 2 * te);
      const c = Math.sin(Q * i.sway + i.swayPh);
      nt.set(
        i.x + c * i.swayAmp,
        i.y,
        i.z + Math.cos(Q * i.sway * 0.7 + i.swayPh) * i.swayAmp * 0.6
      ), at.set(i.roll, i.tilt, c * 0.55), ot.setFromEuler(at), rt.setScalar(i.s), tt.compose(nt, ot, rt), a.mesh.setMatrixAt(p, tt);
    }
    a.mesh.instanceMatrix.needsUpdate = !0;
  }
  const st = 3.4, B = { list: [], i: 0, acc: 0, ex: 0, ey: 0, lx: 0, ly: 0, idle: 0, seen: !1 };
  function Vt() {
    if (qe) return;
    const s = K ? 90 : 190, a = new o.BufferGeometry();
    a.setAttribute("position", new o.BufferAttribute(new Float32Array(s * 3), 3)), a.setAttribute("aA", new o.BufferAttribute(new Float32Array(s), 1)), a.setAttribute("aS", new o.BufferAttribute(new Float32Array(s), 1));
    const t = new o.Points(a, new o.ShaderMaterial({
      uniforms: { uTex: { value: O(Wt()) }, uPx: { value: se() } },
      transparent: !0,
      blending: o.AdditiveBlending,
      depthWrite: !1,
      depthTest: !1,
      fog: !1,
      vertexShader: `attribute float aA; attribute float aS;
uniform float uPx; varying float vA;
void main(){ vA = aA;
 vec4 mv = modelViewMatrix * vec4(position,1.0);
 gl_PointSize = uPx * aS / max(-mv.z, 0.4);
 gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uTex; varying float vA;
void main(){ if (vA <= 0.0) discard;
 vec4 t = texture2D(uTex, gl_PointCoord);
 gl_FragColor = vec4(t.rgb, t.a * vA); }`
    }));
    t.frustumCulled = !1, t.renderOrder = 9, t.layers.set(1), V.add(t), B.mesh = t;
    for (let e = 0; e < s; e++) B.list.push({ life: 0, max: 1, vx: 0, vy: 0, sz: 0, ph: 0 });
  }
  function Ut(s, a) {
    const t = Math.tan(V.fov * Math.PI / 360) * st;
    return [s * t * V.aspect, a * t];
  }
  function _t(s) {
    if (!B.mesh) return;
    const a = B.mesh.geometry, t = a.attributes.position.array, e = a.attributes.aA.array, r = a.attributes.aS.array, l = B.list, n = l.length, p = Ut(L.tmx, L.tmy);
    B.seen || (B.ex = B.lx = p[0], B.ey = B.ly = p[1], B.seen = !0), B.ex = xe(B.ex, p[0], 16, s), B.ey = xe(B.ey, p[1], 16, s);
    const i = B.ex - B.lx, f = B.ey - B.ly, d = Math.hypot(i, f), c = d > 1e-5 ? Math.atan2(f, i) : 0, S = (C, g, x, h) => {
      const m = B.i;
      B.i = (m + 1) % n;
      const u = l[m], v = m * 3;
      t[v] = C + (Math.random() + Math.random() - 1) * 0.3, t[v + 1] = g + (Math.random() + Math.random() - 1) * 0.3, t[v + 2] = -st + (Math.random() - 0.5) * 0.9, u.life = 0, u.max = (h ? 2.1 : 1.45) + Math.random() * 1.3, u.vx = -Math.cos(x) * 0.09 + (Math.random() - 0.5) * 0.38, u.vy = -Math.sin(x) * 0.09 + (Math.random() - 0.5) * 0.32 + 0.02, u.sz = (h ? 0.018 : 0.024) + Math.random() * 0.026, u.ph = Math.random() * H;
    };
    B.acc += d;
    const y = 0.03;
    let M = 0;
    for (; B.acc >= y && M++ < 14; ) {
      B.acc -= y;
      const C = d > 1e-6 ? Math.min(1, M * y / d) : 0;
      S(B.lx + i * C, B.ly + f * C, c, !1);
    }
    B.idle += s, B.idle > 0.42 && (B.idle = 0, S(B.ex, B.ey, Math.random() * H, !0)), B.lx = B.ex, B.ly = B.ey;
    for (let C = 0; C < n; C++) {
      const g = l[C], x = C * 3;
      if (g.life >= g.max) {
        e[C] = 0;
        continue;
      }
      g.life += s;
      const h = g.life / g.max;
      t[x] += (g.vx + Math.sin(Q * 1.3 + g.ph) * 0.17) * s, t[x + 1] += (g.vy + Math.cos(Q * 1.1 + g.ph * 1.7) * 0.14) * s, g.vx *= 1 - 0.5 * s, g.vy = g.vy * (1 - 0.5 * s) + 0.022 * s, e[C] = ye(0, 0.12, h) * (1 - ye(0.22, 1, h)) * 0.9, r[C] = g.sz * (1 + h * 0.55);
    }
    a.attributes.position.needsUpdate = !0, a.attributes.aA.needsUpdate = !0, a.attributes.aS.needsUpdate = !0;
  }
  function qt() {
    k.add(new o.HemisphereLight(5473167, 395784, 0.13));
    const s = new o.DirectionalLight(11983844, 1.22);
    if (s.position.set(2.6, 21, 2.5), s.target.position.set(0, 2.2, -12.5), k.add(s.target), Pe) {
      s.castShadow = !0;
      const n = K ? 1024 : 2048;
      s.shadow.mapSize.set(n, n);
      const p = s.shadow.camera;
      p.left = -26, p.right = 26, p.top = 34, p.bottom = -16, p.near = 3, p.far = 78, s.shadow.bias = -12e-4, s.shadow.normalBias = 0.035, s.shadow.radius = 2.2;
    }
    k.add(s), W.key = s;
    const a = new o.DirectionalLight(16738882, 0.52);
    a.position.set(26, 30, -60), a.target.position.set(0, 8, -40), k.add(a.target), k.add(a);
    const t = new o.PointLight(16747046, 2.3, 15, 2);
    t.position.set(0, ee + 1.2, D + 8.6), k.add(t), W.hallLight = t, [-1, 1].forEach((n) => {
      const p = new o.PointLight(16745504, 2.2, 11, 2);
      p.position.set(n * 11.4, ee + 1.2, D + 5.6), k.add(p);
    });
    const e = new o.PointLight(16726556, 3, 46, 2);
    e.position.set(11, 17, -24), k.add(e), W.moonLight = e;
    const r = new o.PointLight(8832722, 0.95, 30, 2);
    r.position.set(-1, 13.5, -16), k.add(r);
    const l = new o.PointLight(16752713, 4.2, 17, 2);
    l.position.set(0, 7.6, -26), k.add(l);
  }
  const T = { levels: [] }, He = `varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4( position.xy, 0.0, 1.0 ); }`;
  function Xt() {
    if (T.cam = new o.OrthographicCamera(-1, 1, 1, -1, 0, 1), T.quad = new o.Mesh(new o.PlaneGeometry(2, 2), null), T.quad.frustumCulled = !1, T.qScene = new o.Scene(), T.qScene.add(T.quad), T.up = new o.ShaderMaterial({
      uniforms: { tS: { value: null }, uAmt: { value: 1 } },
      vertexShader: He,
      fragmentShader: `uniform sampler2D tS; uniform float uAmt; varying vec2 vUv;
void main(){ gl_FragColor = vec4(texture2D(tS,vUv).rgb*uAmt, 1.0); }`,
      blending: o.AdditiveBlending,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1
    }), !le) return;
    const s = z.domElement.width, a = z.domElement.height, t = { minFilter: o.LinearFilter, magFilter: o.LinearFilter, type: o.HalfFloatType, depthBuffer: !1, stencilBuffer: !1 };
    T.scene = new o.WebGLRenderTarget(s, a, Object.assign({}, t, { depthBuffer: !0, samples: K ? 0 : 2 }));
    let e = Math.max(2, s >> 1), r = Math.max(2, a >> 1);
    const l = 4;
    for (let n = 0; n < l; n++)
      T.levels.push({ a: new o.WebGLRenderTarget(e, r, t), b: new o.WebGLRenderTarget(e, r, t), w: e, h: r }), e = Math.max(2, e >> 1), r = Math.max(2, r >> 1);
    T.bright = new o.ShaderMaterial({
      uniforms: { tS: { value: null }, uThr: { value: 0.86 }, uKnee: { value: 0.5 } },
      vertexShader: He,
      fragmentShader: `uniform sampler2D tS; uniform float uThr; uniform float uKnee; varying vec2 vUv;
void main(){ vec3 c = texture2D(tS, vUv).rgb;
 float l = dot(c, vec3(0.2126,0.7152,0.0722));
 float k = smoothstep(uThr, uThr+uKnee, l);
 gl_FragColor = vec4(c*k, 1.0); }`
    }), T.blur = new o.ShaderMaterial({
      uniforms: { tS: { value: null }, uDir: { value: new o.Vector2(1, 0) } },
      vertexShader: He,
      fragmentShader: `uniform sampler2D tS; uniform vec2 uDir; varying vec2 vUv;
void main(){ vec3 c = texture2D(tS, vUv).rgb * 0.2270270270;
 c += texture2D(tS, vUv + uDir*1.3846153846).rgb * 0.3162162162;
 c += texture2D(tS, vUv - uDir*1.3846153846).rgb * 0.3162162162;
 c += texture2D(tS, vUv + uDir*3.2307692308).rgb * 0.0702702703;
 c += texture2D(tS, vUv - uDir*3.2307692308).rgb * 0.0702702703;
 gl_FragColor = vec4(c, 1.0); }`
    }), T.comp = new o.ShaderMaterial({
      uniforms: {
        tS: { value: null },
        tB: { value: null },
        uRes: { value: new o.Vector2(s, a) },
        uT: { value: 0 },
        uBloom: { value: 0.34 },
        uCA: { value: 1 },
        uGrain: { value: 0.02 },
        uVig: { value: 1 },
        uExp: { value: 0.62 },
        uFade: { value: 1 },
        uSat: { value: 1.05 }
      },
      vertexShader: He,
      fragmentShader: `uniform sampler2D tS; uniform sampler2D tB; uniform vec2 uRes;
uniform float uT, uBloom, uCA, uGrain, uVig, uExp, uFade, uSat;
varying vec2 vUv;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
void main(){
 vec2 d = vUv - 0.5; float r2 = dot(d,d);
 float ca = uCA * (0.30 + r2*2.6) * 0.0013;
 vec3 c;
 c.r = texture2D(tS, vUv + d*ca).r;
 c.g = texture2D(tS, vUv).g;
 c.b = texture2D(tS, vUv - d*ca).b;
 c += texture2D(tB, vUv).rgb * uBloom;
 c *= uExp;
 c = aces(c);
 float l = dot(c, vec3(0.2126,0.7152,0.0722));
 c = mix(vec3(l), c, uSat);
 c = mix(c, c*vec3(0.74,1.03,1.11), smoothstep(0.55,0.0,l)*0.80);
 c = mix(c, c*vec3(1.035,0.995,0.968), smoothstep(0.50,1.0,l)*0.26);
 float v = smoothstep(1.22, 0.26, length(d*vec2(1.0,0.94))*1.42);
 c *= mix(1.0, v, uVig);
 float g = fract(sin(dot(vUv*uRes + uT*137.0, vec2(12.9898,78.233)))*43758.5453);
 c += (g-0.5)*uGrain;
 c *= uFade;
 vec3 e = pow(max(c,0.0), vec3(1.0/2.2));
 e = clamp((e - 0.30) * 1.00 + 0.30, 0.0, 1.0);
 gl_FragColor = vec4( e, 1.0 );
}`
    });
  }
  function ge(s, a, t) {
    T.quad.material = s, z.setRenderTarget(a || null), t || z.clear(!0, !1, !1), z.render(T.qScene, T.cam);
  }
  function jt() {
    const s = T.levels;
    T.bright.uniforms.tS.value = T.scene.texture, ge(T.bright, s[0].a);
    for (let a = 0; a < s.length; a++)
      a > 0 && (T.up.blending = o.NoBlending, T.up.uniforms.uAmt.value = 1, T.up.uniforms.tS.value = s[a - 1].a, ge(T.up, s[a].a)), T.blur.uniforms.tS.value = s[a].a, T.blur.uniforms.uDir.value.set(1 / s[a].w, 0), ge(T.blur, s[a].b), T.blur.uniforms.tS.value = s[a].b, T.blur.uniforms.uDir.value.set(0, 1 / s[a].h), ge(T.blur, s[a].a);
    T.up.blending = o.AdditiveBlending, T.up.uniforms.uAmt.value = 0.52;
    for (let a = s.length - 1; a > 0; a--)
      T.up.uniforms.tS.value = s[a].a, ge(T.up, s[a - 1].a, !0);
    T.comp.uniforms.tS.value = T.scene.texture, T.comp.uniforms.tB.value = s[0].a, ge(T.comp, null);
  }
  const me = [
    { p: [0, 4.05, 13.6], t: [0, 6.6, -18], fov: 36 },
    /* 0 hero        */
    { p: [-5.6, 2.35, 11.6], t: [1.2, 5.6, -14], fov: 48 },
    /* 1 the sanmon  */
    { p: [1.2, 3.6, 2.2], t: [-0.6, 7.5, -22], fov: 40 },
    /* 2 gardens     */
    { p: [5.2, 2.1, -3.4], t: [-2.6, 7, -20], fov: 46 },
    /* 3 craft       */
    { p: [0, 7.6, -16], t: [0, 13, -40], fov: 42 },
    /* 4 afterlight  */
    { p: [0, 10.5, -20], t: [0, 3, -34], fov: 46 }
    /* 5 footer      */
  ], L = { prog: 0, smooth: 0, mx: 0, my: 0, tmx: 0, tmy: 0, intro: 0, focus: -1, focusAmt: 0 };
  let lt, it;
  function Zt() {
    lt = new o.CatmullRomCurve3(me.map((s) => new o.Vector3(s.p[0], s.p[1], s.p[2])), !1, "catmullrom", 0.42), it = new o.CatmullRomCurve3(me.map((s) => new o.Vector3(s.t[0], s.t[1], s.t[2])), !1, "catmullrom", 0.42), new o.PerspectiveCamera(me[0].fov, ve() / se(), 0.35, 220), V.layers.enable(1), V.layers.enable(2);
  }
  const fe = new o.Vector3(), Ae = new o.Vector3(), ct = new o.Vector3();
  function dt() {
    return $((1.62 - ve() / se()) / 1.05, 0, 1);
  }
  function Qt(s, a, t) {
    const e = dt();
    return e <= 0 ? t : (ct.subVectors(s, a).normalize(), s.addScaledVector(ct, e * 8.2), s.y += e * 1.1, t * (1 + e * 0.4));
  }
  function ft() {
    const s = me.length - 1, a = $(L.smooth / s, 0, 1);
    lt.getPoint(a, fe), it.getPoint(a, Ae);
    const t = $(Math.floor(L.smooth), 0, s - 1), e = $(L.smooth - t, 0, 1);
    let r = oe(me[t].fov, me[t + 1].fov, e);
    r = Qt(fe, Ae, r);
    const l = 1 - L.intro;
    fe.z += l * 5.6, fe.y += l * 0.65, r += l * 8;
    const n = 1 - ye(0, 1.6, L.smooth) * 0.55;
    fe.x += L.mx * 0.62 * n, fe.y += L.my * 0.34 * n, Ae.x -= L.mx * 0.2 * n, Ae.y -= L.my * 0.12 * n, V.position.copy(fe), V.lookAt(Ae), Math.abs(V.fov - r) > 1e-4 && (V.fov = r, V.updateProjectionMatrix());
  }
  function ke() {
    const s = ve(), a = se();
    z.setPixelRatio(Math.min(devicePixelRatio || 1, Qe) * q.scale), z.setSize(s, a, !0), V.aspect = s / a, V.updateProjectionMatrix();
    const t = z.domElement.width, e = z.domElement.height;
    if (le && T.scene) {
      T.scene.setSize(t, e), T.comp.uniforms.uRes.value.set(t, e);
      let r = Math.max(2, t >> 1), l = Math.max(2, e >> 1);
      T.levels.forEach((n) => {
        n.a.setSize(r, l), n.b.setSize(r, l), n.w = r, n.h = l, r = Math.max(2, r >> 1), l = Math.max(2, l >> 1);
      });
    }
    if (T.scene) {
      const r = !K && q.scale > 0.78 ? 2 : 0;
      T.scene.samples !== r && (T.scene.samples = r, T.scene.dispose());
    }
    Pe && W.key && (W.key.shadow.needsUpdate = !0), W.embers && (W.embers.material.uniforms.uSize.value = a * z.getPixelRatio() * 0.5), B.mesh && (B.mesh.material.uniforms.uPx.value = a * z.getPixelRatio()), Bt();
  }
  function pt(s) {
    W.uT.value = Q, L.focusAmt = xe(L.focusAmt, 0, 5, s);
    const a = Math.sin(Q * 1.9) * 0.5 + 0.5, t = L.focusAmt;
    W.hallHalo && (W.hallHalo.material.opacity = 0.3 + t * 0.14 + Math.sin(Q * 0.6) * 0.035), W.hallLight && (W.hallLight.intensity = 3.4 * (1 + t * 0.3) * (1 + Math.sin(Q * 0.43) * 0.045)), W.moonHalo && (W.moonHalo.material.opacity = 0.44 + t * 0.1 + Math.sin(Q * 0.34) * 0.05), W.lanternLights && W.lanternLights.forEach((e, r) => {
      e.intensity = 2.6 * (1 + t * 0.55) * (0.86 + 0.22 * Math.sin(Q * (2.3 + r * 0.7) + r * 2.1) + 0.1 * a);
    }), W.lanternGlows && W.lanternGlows.forEach((e) => {
      e.quaternion.copy(V.quaternion);
    }), W.haze && W.haze.forEach((e) => {
      e.position.x = e.userData.x0 + Math.sin(Q * e.userData.sp + e.userData.ph) * 5.5, e.quaternion.copy(V.quaternion);
    }), W.ripples && W.ripples.forEach((e) => {
      const r = e.userData;
      r.t += s * r.sp, r.t > 4 && (r.t = 0, r.x = (Math.random() - 0.5) * 22, r.z = -8 + Math.random() * 22);
      const l = r.t / 4, n = 0.3 + l * 4.2;
      e.scale.set(n, n, 1), e.position.set(r.x, 0.02, r.z), e.material.opacity = Math.sin(l * Math.PI) * 0.16;
    }), W.fg && W.fg.forEach((e) => {
      const r = ye(0.9, 4.6, V.position.z - e.position.z);
      e.material.opacity = r, e.visible = r > 6e-3;
    }), Nt(s), _t(s);
  }
  function ut() {
    z.setRenderTarget(le ? T.scene : null), z.clear(!0, !0, !1), z.render(k, V), z.setRenderTarget(null), le && (T.comp.uniforms.uT.value = Q, T.comp.uniforms.uFade.value = Ve, jt());
  }
  let Le = !1, Ne = 0, Q = 0, Ve = 1;
  function Kt(s) {
    if (Le) return;
    const a = Ne ? (s - Ne) / 1e3 : 0, t = Math.min(a, 0.05);
    if (Ne = s, Q += t, Ve = 1, !q.locked && Q > 2.2 && (q.acc += a, q.n++, q.n >= 40 || q.acc > 0.9)) {
      const e = q.acc / q.n;
      q.acc = 0, q.n = 0, e > 0.023 && q.scale > 0.55 ? (q.scale = Math.max(0.55, q.scale * (e > 0.05 ? 0.64 : 0.85)), ke()) : e < 0.0138 && q.scale < 1 && (q.scale = Math.min(1, q.scale + 0.08), ke());
    }
    L.prog = 0, L.smooth = 0, L.intro = 1, L.mx = xe(L.mx, L.tmx, 2.6, t), L.my = xe(L.my, L.tmy, 2.6, t), ft(), pt(t), ut();
  }
  function ht(s, a) {
    for (const t of Object.values(s))
      t?.isTexture && a.add(t);
    for (const t of Object.values(s.uniforms || {})) {
      const e = t?.value;
      e?.isTexture && a.add(e);
    }
    s.dispose?.();
  }
  function gt() {
    if (Le) return;
    Le = !0;
    const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
    k?.traverse((e) => {
      e.geometry && s.add(e.geometry), (Array.isArray(e.material) ? e.material : e.material ? [e.material] : []).forEach((l) => a.add(l));
    });
    for (const e of s) e.dispose?.();
    for (const e of a) ht(e, t);
    for (const e of [T.up, T.bright, T.blur, T.comp])
      e && !a.has(e) && ht(e, t);
    T.quad?.geometry?.dispose?.(), T.scene?.dispose?.(), T.levels.forEach((e) => {
      e.a.dispose(), e.b.dispose();
    });
    for (const e of t) e.dispose?.();
    z?.dispose?.();
  }
  try {
    Tt(), W.uT = { value: 0 }, Zt(), qt(), Gt(), Ht(), kt(), Et(), Ft(), Ge(7.4, -7, 1.15), Ge(-7.6, -5.2, 1);
    const s = (e) => Math.max(0, (Je - e) / Re - 0.5), a = (e) => (s(e) + 1) * (ee / ce) + 0.45, t = (e) => ($e + (ce - s(e)) * 0.052) / 2 + 0.45;
    [-14.4, -23.5].forEach((e, r) => {
      const l = r ? 0.95 : 0.9;
      Ge(t(e), e, l, a(e)), Ge(-t(e), e, l, a(e));
    }), Ce(71, 12.6, -13, 1.05), Ce(72, -11.8, -9.4, 0.95), Ce(73, 9.2, -19, 0.82), Ce(74, -14.5, -17.5, 1), Ce(75, 16.5, -6, 0.88), zt(), Ot(), Lt(), Vt(), Xt(), W.fg.forEach((e) => e.layers.set(1)), W.rain && W.rain.layers.set(1), W.leaves && W.leaves.mesh.layers.set(1), W.ripples.forEach((e) => e.layers.set(1)), Pe && W.key && (W.key.shadow.autoUpdate = !1, W.key.shadow.needsUpdate = !0), L.intro = 1, Ve = 1, ke(), ft(), pt(0), ut();
  } catch (s) {
    throw console.error("Kage world could not create its Three.js renderer.", s), gt(), s;
  }
  return {
    render: Kt,
    resize: ke,
    reducedMotion: bt,
    setPointer(s, a, t = !0) {
      L.tmx = t ? $(s, -1, 1) : 0, L.tmy = t ? $(a, -1, 1) : 0;
    },
    dispose: gt
  };
}
export {
  to as createTempleNightRenderer
};
