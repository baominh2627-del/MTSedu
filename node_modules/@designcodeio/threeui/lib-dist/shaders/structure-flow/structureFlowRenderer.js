import * as t from "three128";
const w = { speed: 1, pointSize: 0.08, opacity: 0.4, maskStart: 0.2, maskSolid: 0.5 };
function f(M, h) {
  const l = new t.Scene(), o = new t.PerspectiveCamera(60, 1, 0.1, 1e3);
  o.position.z = 30, o.position.y = 5;
  const n = new t.WebGLRenderer({ canvas: M, alpha: !0, antialias: !0 });
  n.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const a = new t.BufferGeometry(), u = 15e3, i = new Float32Array(u * 3), r = 25;
  for (let e = 0; e < u; e += 1) {
    const m = Math.random() * 2 * Math.PI, d = Math.acos(Math.random() * 0.8 + 0.2);
    i[e * 3] = r * Math.sin(d) * Math.cos(m), i[e * 3 + 1] = r * Math.cos(d) - 20, i[e * 3 + 2] = r * Math.sin(d) * Math.sin(m);
  }
  a.setAttribute("position", new t.BufferAttribute(i, 3));
  const s = new t.PointsMaterial({ size: 0.08, color: 16777215, transparent: !0, opacity: 0.4, blending: t.AdditiveBlending, depthWrite: !1 }), c = new t.Points(a, s);
  return l.add(c), {
    resize(e, p) {
      o.aspect = e / Math.max(1, p), o.updateProjectionMatrix(), n.setSize(e, p, !1);
    },
    render() {
      const e = h();
      c.rotation.y += 8e-4 * e.speed, c.rotation.z += 2e-4 * e.speed, s.size = e.pointSize, s.opacity = e.opacity, n.render(l, o);
    },
    dispose() {
      a.dispose(), s.dispose(), n.dispose();
    }
  };
}
export {
  w as STRUCTURE_FLOW_DEFAULTS,
  f as createStructureFlowRenderer
};
