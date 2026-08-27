import * as i from "three128";
const k = ["streaks", "letters", "keycaps", "hyperspace"], G = { variant: "streaks", speed: 15, streakOpacity: 0.6, tileOpacity: 0.9, fov: 75, brightness: 1, hue: 0, saturation: 1 }, v = 200, C = 110, E = -1200, P = 140, b = -1300, S = -1800, L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", _ = { streaks: 1, letters: 0.5, keycaps: 0.7, hyperspace: 2.4 }, A = { streaks: 132106, letters: 132106, keycaps: 198412, hyperspace: 66058 };
function B(h, s, c) {
  const a = new i.BufferGeometry(), o = new Float32Array(s.count * 6), d = new Float32Array(s.count * 6), p = s.palette.map((t) => new i.Color(t));
  for (let t = 0; t < s.count; t += 1) {
    const r = Math.random() * Math.PI * 2, u = Math.random() * s.radiusSpread + s.radiusMin, y = Math.cos(r) * u, g = Math.sin(r) * u, f = (Math.random() - 0.5) * 2e3, m = Math.random() * s.lengthSpread + s.lengthMin;
    o[t * 6] = y, o[t * 6 + 1] = g, o[t * 6 + 2] = f, o[t * 6 + 3] = y, o[t * 6 + 4] = g, o[t * 6 + 5] = f + m;
    const M = p[Math.floor(Math.random() * p.length)];
    d[t * 6] = M.r, d[t * 6 + 1] = M.g, d[t * 6 + 2] = M.b, d[t * 6 + 3] = M.r, d[t * 6 + 4] = M.g, d[t * 6 + 5] = M.b;
  }
  a.setAttribute("position", new i.BufferAttribute(o, 3)), a.setAttribute("color", new i.BufferAttribute(d, 3));
  const e = new i.LineBasicMaterial({ vertexColors: !0, transparent: !0, opacity: c * s.opacityScale, blending: i.AdditiveBlending }), n = new i.LineSegments(a, e);
  h.add(n);
  const l = a.attributes.position;
  return {
    update(t) {
      for (let r = 0; r < s.count; r += 1)
        if (o[r * 6 + 2] += t, o[r * 6 + 5] += t, o[r * 6 + 2] > v) {
          const u = o[r * 6 + 5] - o[r * 6 + 2];
          o[r * 6 + 2] = S, o[r * 6 + 5] = S + u;
        }
      l.needsUpdate = !0;
    },
    setOpacity(t) {
      const r = t * s.opacityScale;
      e.opacity !== r && (e.opacity = r);
    },
    dispose() {
      a.dispose(), e.dispose();
    }
  };
}
function I(h, s) {
  const c = new i.PlaneGeometry(8, 20), a = new i.MeshBasicMaterial({ color: 16777215, transparent: !0, opacity: s, side: i.DoubleSide }), o = [];
  let d = s;
  for (let p = 0; p < 40; p += 1) {
    const e = a.clone();
    e.color.setHex(Math.random() > 0.6 ? 11006928 : Math.random() > 0.5 ? 13761253 : 16777215);
    const n = new i.Mesh(c, e), l = Math.random() * Math.PI * 2, t = Math.random() * 400 + 100;
    n.position.x = Math.cos(l) * t, n.position.y = Math.sin(l) * t, n.position.z = (Math.random() - 0.5) * 2e3, n.lookAt(0, 0, n.position.z + 100);
    const r = Math.random() * 1.5 + 0.5;
    n.scale.set(r, r, r), h.add(n), o.push(n);
  }
  return {
    update(p) {
      o.forEach((e) => {
        e.position.z += p, e.position.z > v && (e.position.z = S);
      });
    },
    setOpacity(p, e) {
      d !== e && (o.forEach((n) => {
        n.material.opacity = e;
      }), d = e);
    },
    dispose() {
      c.dispose(), a.dispose(), o.forEach((p) => p.material.dispose());
    }
  };
}
function R(h) {
  const o = document.createElement("canvas");
  o.width = 768, o.height = 768;
  const d = o.getContext("2d");
  d && (d.fillStyle = h, d.font = `700 ${Math.round(128 * 0.68)}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`, d.textAlign = "center", d.textBaseline = "middle", L.split("").forEach((e, n) => {
    const l = n % 6, t = Math.floor(n / 6);
    d.fillText(e, l * 128 + 128 / 2, t * 128 + 128 * 0.54);
  }));
  const p = new i.CanvasTexture(o);
  return p.minFilter = i.LinearFilter, { texture: p, columns: 6, rows: 6 };
}
function T(h) {
  return L.split("").map((s, c) => {
    const a = new i.PlaneGeometry(1, 1), o = c % h.columns, d = Math.floor(c / h.columns), p = o / h.columns, e = 1 - (d + 1) / h.rows, n = a.attributes.uv;
    for (let l = 0; l < n.count; l += 1)
      n.setXY(l, p + n.getX(l) / h.columns, e + n.getY(l) / h.rows);
    return n.needsUpdate = !0, a;
  });
}
function Y(h, s) {
  const c = R("#ffffff"), a = T(c), o = [16777215, 11006928, 3462041].map((e) => new i.MeshBasicMaterial({
    map: c.texture,
    color: e,
    transparent: !0,
    opacity: s,
    depthWrite: !1,
    side: i.DoubleSide
  })), d = [];
  let p = s;
  for (let e = 0; e < 260; e += 1) {
    const n = new i.Mesh(a[Math.floor(Math.random() * a.length)], o[Math.floor(Math.random() * o.length)]), l = Math.random() * Math.PI * 2, t = Math.random() * 430 + 60;
    n.position.set(Math.cos(l) * t, Math.sin(l) * t, b + Math.random() * (P - b));
    const r = Math.random() * 30 + 24;
    n.scale.set(r, r, r), h.add(n), d.push({ mesh: n, spin: (Math.random() - 0.5) * 0.02, swayX: Math.random() * 0.5 + 0.2, swayY: Math.random() * 0.6 + 0.2, phase: Math.random() * Math.PI * 2, drift: Math.random() * 0.9 + 0.2, radius: t });
  }
  return {
    update(e, n) {
      d.forEach((l) => {
        const { mesh: t } = l;
        t.position.z += e;
        const r = n * l.drift + l.phase;
        if (t.position.x += Math.cos(r) * l.drift * 0.9, t.position.y += Math.sin(r * 0.8) * l.drift * 0.9, t.rotation.z += l.spin, t.rotation.x = Math.sin(r * 0.6) * l.swayX, t.rotation.y = Math.cos(r * 0.5) * l.swayY, t.position.z > P) {
          const u = Math.random() * Math.PI * 2, y = Math.random() * 430 + 60;
          t.position.set(Math.cos(u) * y, Math.sin(u) * y, b);
        }
      });
    },
    setOpacity(e, n) {
      p !== n && (o.forEach((l) => {
        l.opacity = n;
      }), p = n);
    },
    dispose() {
      a.forEach((e) => e.dispose()), o.forEach((e) => e.dispose()), c.texture.dispose();
    }
  };
}
function F(h, s, c) {
  const a = new i.BoxGeometry(h, s, c), o = a.attributes.position;
  for (let d = 0; d < o.count; d += 1)
    o.getY(d) > 0 && o.setXYZ(d, o.getX(d) * 0.78, o.getY(d), o.getZ(d) * 0.78);
  return o.needsUpdate = !0, a.computeVertexNormals(), a;
}
function O() {
  const s = document.createElement("canvas");
  s.width = 64, s.height = 64;
  const c = s.getContext("2d");
  if (c) {
    const a = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    a.addColorStop(0, "rgba(255,255,255,1)"), a.addColorStop(0.4, "rgba(255,255,255,0.5)"), a.addColorStop(1, "rgba(255,255,255,0)"), c.fillStyle = a, c.fillRect(0, 0, 64, 64);
  }
  return new i.CanvasTexture(s);
}
function W(h, s, c, a, o, d) {
  const p = new i.BufferGeometry(), e = new Float32Array(s * 3);
  for (let u = 0; u < s; u += 1) {
    const y = Math.random() * Math.PI * 2, g = Math.random() * d + 20;
    e[u * 3] = Math.cos(y) * g, e[u * 3 + 1] = Math.sin(y) * g, e[u * 3 + 2] = (Math.random() - 0.5) * 2e3;
  }
  p.setAttribute("position", new i.BufferAttribute(e, 3));
  const n = O(), l = new i.PointsMaterial({ map: n, color: a, size: c, transparent: !0, opacity: o, blending: i.AdditiveBlending, depthWrite: !1, sizeAttenuation: !0 }), t = new i.Points(p, l);
  h.add(t);
  const r = p.attributes.position;
  return {
    positions: e,
    count: s,
    material: l,
    update(u) {
      for (let y = 0; y < s; y += 1)
        e[y * 3 + 2] += u, e[y * 3 + 2] > v && (e[y * 3 + 2] = S);
      r.needsUpdate = !0;
    },
    dispose() {
      p.dispose(), l.dispose(), n.dispose();
    }
  };
}
function D(h, s, c) {
  const a = R("#ffffff"), o = T(a), d = F(26, 14, 26), p = [4016196, 5266519, 2831409].map((f) => new i.MeshLambertMaterial({ color: f, emissive: 200971, transparent: !0, opacity: c })), e = [10352079, 16777215].map((f) => new i.MeshBasicMaterial({
    map: a.texture,
    color: f,
    transparent: !0,
    opacity: c,
    depthWrite: !1,
    side: i.DoubleSide
  })), n = new i.AmbientLight(989719, 1), l = new i.DirectionalLight(16056315, 1.9);
  l.position.set(0.4, 1, 0.7);
  const t = new i.DirectionalLight(3462041, 0.45);
  t.position.set(-0.7, -0.4, 0.5);
  const r = new i.PointLight(1096065, 0.8, 900);
  r.position.set(0, 0, 140), h.add(n, l, t, r);
  const u = [];
  let y = c;
  for (let f = 0; f < 95; f += 1) {
    const m = new i.Mesh(d, p[Math.floor(Math.random() * p.length)]), M = new i.Mesh(o[Math.floor(Math.random() * o.length)], e[Math.floor(Math.random() * e.length)]);
    M.scale.set(15, 15, 15), M.position.y = 7.2, M.rotation.x = -Math.PI / 2, m.add(M);
    const w = Math.random() * Math.PI * 2, x = Math.random() * 430 + 130;
    m.position.set(Math.cos(w) * x, Math.sin(w) * x, E + Math.random() * (C - E)), m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    const z = Math.random() * 1.15 + 0.8;
    m.scale.set(z, z, z), s.add(m), u.push({ mesh: m, spin: (Math.random() - 0.5) * 0.03, swayX: (Math.random() - 0.5) * 0.026, swayY: (Math.random() - 0.5) * 0.03, phase: 0, drift: 0, radius: x });
  }
  const g = W(s, 750, 7, 7268279, c, 620);
  return {
    update(f) {
      u.forEach((m) => {
        if (m.mesh.position.z += f, m.mesh.rotation.x += m.swayX, m.mesh.rotation.y += m.swayY, m.mesh.rotation.z += m.spin, m.mesh.position.z > C) {
          const M = Math.random() * Math.PI * 2, w = Math.random() * 430 + 130;
          m.mesh.position.set(Math.cos(M) * w, Math.sin(M) * w, E);
        }
      }), g.update(f * 1.35);
    },
    setOpacity(f, m) {
      g.material.opacity !== f && (g.material.opacity = f), y !== m && (p.forEach((M) => {
        M.opacity = m;
      }), e.forEach((M) => {
        M.opacity = m;
      }), y = m);
    },
    dispose() {
      d.dispose(), o.forEach((f) => f.dispose()), p.forEach((f) => f.dispose()), e.forEach((f) => f.dispose()), a.texture.dispose(), g.dispose(), h.remove(n, l, t, r);
    }
  };
}
function X() {
  const s = document.createElement("canvas");
  s.width = 512, s.height = 512;
  const c = s.getContext("2d");
  if (c) {
    c.fillStyle = "#000000", c.fillRect(0, 0, 512, 512);
    for (let o = 0; o < 240; o += 1) {
      const d = Math.random() * 512, p = Math.random() * 3 + 0.6, e = Math.random() * 320 + 90, n = Math.random() * 512, l = (Math.random() * 0.45 + 0.08).toFixed(3);
      for (const t of [-512, 0, 512]) {
        const r = c.createLinearGradient(0, n + t, 0, n + t + e);
        r.addColorStop(0, "rgba(191,219,254,0)"), r.addColorStop(0.5, `rgba(224,238,255,${l})`), r.addColorStop(1, "rgba(147,197,253,0)"), c.fillStyle = r, c.fillRect(d, n + t, p, e);
      }
    }
  }
  const a = new i.CanvasTexture(s);
  return a.wrapS = i.RepeatWrapping, a.wrapT = i.RepeatWrapping, a.repeat.set(4, 2), a;
}
function Z() {
  const s = document.createElement("canvas");
  s.width = 256, s.height = 256;
  const c = s.getContext("2d");
  if (c) {
    const a = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    a.addColorStop(0, "rgba(255,255,255,1)"), a.addColorStop(0.18, "rgba(219,234,254,0.55)"), a.addColorStop(0.45, "rgba(96,165,250,0.16)"), a.addColorStop(1, "rgba(2,6,23,0)"), c.fillStyle = a, c.fillRect(0, 0, 256, 256);
  }
  return new i.CanvasTexture(s);
}
function U(h, s) {
  const c = X(), a = new i.CylinderGeometry(900, 240, 3e3, 64, 1, !0);
  a.rotateX(Math.PI / 2);
  const o = new i.MeshBasicMaterial({ map: c, side: i.BackSide, transparent: !0, opacity: s * 0.6, blending: i.AdditiveBlending, depthWrite: !1 }), d = new i.Mesh(a, o);
  d.position.z = -1400, h.add(d);
  const p = Z(), e = new i.SpriteMaterial({ map: p, transparent: !0, opacity: s, blending: i.AdditiveBlending, depthWrite: !1 }), n = new i.Sprite(e);
  n.position.z = -900, n.scale.set(760, 760, 1), h.add(n);
  let l = s;
  return {
    update(t, r) {
      c.offset.y -= t * 16e-4, d.rotation.z += 16e-4;
      const u = 1 + Math.sin(r * 1.6) * 0.06;
      n.scale.set(760 * u, 760 * u, 1);
    },
    setOpacity(t, r) {
      l !== r && (o.opacity = r * 0.6, e.opacity = r, l = r);
    },
    dispose() {
      a.dispose(), o.dispose(), c.dispose(), e.dispose(), p.dispose();
    }
  };
}
const H = {
  streaks: { count: 400, radiusMin: 20, radiusSpread: 800, lengthMin: 50, lengthSpread: 150, palette: [1096065, 366185, 3462041, 16777215], opacityScale: 1 },
  letters: { count: 260, radiusMin: 20, radiusSpread: 800, lengthMin: 40, lengthSpread: 120, palette: [1096065, 366185, 3462041, 16777215], opacityScale: 1 },
  keycaps: { count: 220, radiusMin: 20, radiusSpread: 800, lengthMin: 40, lengthSpread: 140, palette: [1096065, 3462041, 11006928, 16777215], opacityScale: 1 },
  hyperspace: { count: 1200, radiusMin: 6, radiusSpread: 760, lengthMin: 170, lengthSpread: 420, palette: [16777215, 14412542, 9684477, 6333946, 13095678], opacityScale: 1.45 }
};
function K(h, s) {
  const c = s(), a = k.includes(c.variant) ? c.variant : G.variant, o = new i.Scene();
  o.background = new i.Color(A[a]), o.fog = new i.FogExp2(A[a], 1e-3);
  const d = new i.PerspectiveCamera(75, 1, 0.1, 2e3);
  d.position.z = 0;
  const p = new i.WebGLRenderer({ canvas: h, alpha: !0, antialias: !0, powerPreference: "high-performance" });
  p.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const e = new i.Group();
  o.add(e);
  const n = [B(e, H[a], c.streakOpacity)];
  a === "streaks" && n.push(I(e, c.tileOpacity)), a === "letters" && n.push(Y(e, c.tileOpacity)), a === "keycaps" && n.push(D(o, e, c.tileOpacity)), a === "hyperspace" && n.push(U(e, c.tileOpacity));
  let l = 0;
  return {
    resize(t, r) {
      d.aspect = t / Math.max(1, r), d.updateProjectionMatrix(), p.setSize(t, r, !1);
    },
    render() {
      const t = s();
      d.fov !== t.fov && (d.fov = t.fov, d.updateProjectionMatrix()), l += 1 / 60;
      const r = t.speed * _[a];
      n.forEach((u) => {
        u.setOpacity?.(t.streakOpacity, t.tileOpacity), u.update?.(r, l);
      }), p.render(o, d);
    },
    dispose() {
      n.forEach((t) => t.dispose()), p.dispose();
    }
  };
}
export {
  G as WARP_FIELD_DEFAULTS,
  k as WARP_FIELD_VARIANTS,
  K as createWarpFieldRenderer
};
