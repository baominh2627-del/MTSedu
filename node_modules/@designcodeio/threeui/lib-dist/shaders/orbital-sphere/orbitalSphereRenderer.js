import * as t from "three128";
const L = { speed: 1, particleSize: 0.015, particleOpacity: 0.8, orbitOpacity: 0.25, scale: 1, haloOpacity: 0.2, hue: 0 };
function F(R, G) {
  const P = new t.Scene(), h = new t.PerspectiveCamera(45, 1, 0.1, 1e3), u = new t.WebGLRenderer({ canvas: R, alpha: !0, antialias: !0 });
  u.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const a = new t.Group();
  P.add(a);
  const f = 2.2, M = 15e3, y = new Float32Array(M * 3), w = new Float32Array(M * 3), I = new t.Color(10980346), O = new t.Color(7346805);
  let n = 0;
  for (let e = 0; e < M; e += 1) {
    const o = Math.acos(-1 + 2 * e / M), r = Math.sqrt(M * Math.PI) * o, c = f * Math.cos(r) * Math.sin(o), l = f * Math.sin(r) * Math.sin(o), s = f * Math.cos(o), i = Math.sin(c * 3.5) * Math.cos(l * 3.5) * Math.sin(s * 3.5) + Math.cos(c * 6) * 0.4;
    if (i <= -0.1) continue;
    const p = 1 + i * 0.1;
    y[n * 3] = c * p, y[n * 3 + 1] = l * p, y[n * 3 + 2] = s * p;
    const d = O.clone().lerp(I, i > 0.5 ? 1 : 0.3);
    w[n * 3] = d.r, w[n * 3 + 1] = d.g, w[n * 3 + 2] = d.b, n += 1;
  }
  const m = new t.BufferGeometry();
  m.setAttribute("position", new t.BufferAttribute(y.slice(0, n * 3), 3)), m.setAttribute("color", new t.BufferAttribute(w.slice(0, n * 3), 3));
  const b = new t.PointsMaterial({ size: 0.015, vertexColors: !0, transparent: !0, opacity: 0.8, blending: t.AdditiveBlending, depthWrite: !1 });
  a.add(new t.Points(m, b));
  const A = new t.LineBasicMaterial({ color: 9133302, transparent: !0, opacity: 0.25, blending: t.AdditiveBlending }), S = [], z = [], E = [], g = [];
  let x = 1;
  for (let e = 0; e < 6; e += 1) {
    const o = new t.BufferGeometry(), r = [], c = f * (1.08 + Math.random() * 0.2);
    for (let s = 0; s <= 90; s += 1) {
      const i = s / 90 * Math.PI * 2;
      r.push(Math.cos(i) * c, Math.sin(i) * c, Math.sin(i * 4) * 0.1);
    }
    o.setAttribute("position", new t.Float32BufferAttribute(r, 3)), S.push(o);
    const l = new t.Line(o, A);
    if (l.rotation.x = Math.random() * Math.PI * 2, l.rotation.y = Math.random() * Math.PI * 2, a.add(l), e % 2 !== 0) {
      const s = new t.SphereGeometry(0.025, 16, 16), i = new t.MeshBasicMaterial({ color: 14239471 }), p = new t.Mesh(s, i), d = Math.random() * Math.PI * 2;
      p.position.set(Math.cos(d) * c, Math.sin(d) * c, 0), l.add(p);
      const v = new t.SphereGeometry(0.08, 16, 16), B = new t.MeshBasicMaterial({ color: 12616956, transparent: !0, opacity: 0.2, blending: t.AdditiveBlending }), C = new t.Mesh(v, B);
      p.add(C), z.push(s, v), E.push(i, B), g.push(B);
    }
  }
  return {
    resize(e, o) {
      h.aspect = e / Math.max(1, o), h.updateProjectionMatrix(), u.setSize(e, o, !1);
      const r = G();
      e >= 1024 ? (a.position.set(2.5, 0, -2), x = 1.15, h.position.z = 5.5) : (a.position.set(0, -1, -3), x = 1, h.position.z = 6.5), a.scale.setScalar(x * r.scale);
    },
    render() {
      const e = G();
      b.size = e.particleSize, b.opacity = e.particleOpacity, A.opacity = e.orbitOpacity, g.forEach((o) => o.opacity = e.haloOpacity), a.scale.setScalar(x * e.scale), a.rotation.y += 8e-4 * e.speed, a.rotation.x += 3e-4 * e.speed, a.children.forEach((o, r) => {
        o.type === "Line" && (o.rotation.z += 4e-4 * e.speed * (r % 2 === 0 ? 1 : -1));
      }), u.render(P, h);
    },
    dispose() {
      m.dispose(), b.dispose(), A.dispose(), S.forEach((e) => e.dispose()), z.forEach((e) => e.dispose()), E.forEach((e) => e.dispose()), u.dispose();
    }
  };
}
export {
  L as ORBITAL_SPHERE_DEFAULTS,
  F as createOrbitalSphereRenderer
};
