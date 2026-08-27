import { Scene as S, BoxGeometry as y, MeshStandardMaterial as b, BackSide as B, PointLight as E, Mesh as s, MeshBasicMaterial as L } from "three165";
class R extends S {
  constructor(e = null) {
    super();
    const t = new y();
    t.deleteAttribute("uv");
    const v = new b({ side: B }), o = new b(), M = new E(16777215, 900, 28, 2);
    M.position.set(0.418, 16.199, 0.3), this.add(M);
    const h = new s(t, v);
    h.position.set(-0.757, 13.219, 0.717), h.scale.set(31.713, 28.305, 28.591), this.add(h);
    const n = new s(t, o);
    n.position.set(-10.906, 2.009, 1.846), n.rotation.set(0, -0.195, 0), n.scale.set(2.328, 7.905, 4.651), this.add(n);
    const a = new s(t, o);
    a.position.set(-5.607, -0.754, -0.758), a.rotation.set(0, 0.994, 0), a.scale.set(1.97, 1.534, 3.955), this.add(a);
    const c = new s(t, o);
    c.position.set(6.167, 0.857, 7.803), c.rotation.set(0, 0.561, 0), c.scale.set(3.927, 6.285, 3.687), this.add(c);
    const r = new s(t, o);
    r.position.set(-2.017, 0.018, 6.124), r.rotation.set(0, 0.333, 0), r.scale.set(2.002, 4.566, 2.064), this.add(r);
    const d = new s(t, o);
    d.position.set(2.291, -0.756, -2.621), d.rotation.set(0, -0.286, 0), d.scale.set(1.546, 1.552, 1.496), this.add(d);
    const l = new s(t, o);
    l.position.set(-2.193, -0.369, -5.547), l.rotation.set(0, 0.516, 0), l.scale.set(3.875, 3.487, 2.986), this.add(l);
    const p = new s(t, i(50));
    p.position.set(-16.116, 14.37, 8.208), p.scale.set(0.1, 2.428, 2.739), this.add(p);
    const w = new s(t, i(50));
    w.position.set(-16.109, 18.021, -8.207), w.scale.set(0.1, 2.425, 2.751), this.add(w);
    const m = new s(t, i(17));
    m.position.set(14.904, 12.198, -1.832), m.scale.set(0.15, 4.265, 6.331), this.add(m);
    const f = new s(t, i(43));
    f.position.set(-0.462, 8.89, 14.52), f.scale.set(4.38, 5.441, 0.088), this.add(f);
    const g = new s(t, i(20));
    g.position.set(3.235, 11.486, -12.541), g.scale.set(2.5, 2, 0.1), this.add(g);
    const x = new s(t, i(100));
    x.position.set(0, 20, 0), x.scale.set(1, 0.1, 1), this.add(x);
  }
  dispose() {
    const e = /* @__PURE__ */ new Set();
    this.traverse((t) => {
      t.isMesh && (e.add(t.geometry), e.add(t.material));
    });
    for (const t of e)
      t.dispose();
  }
}
function i(u) {
  const e = new L();
  return e.color.setScalar(u), e;
}
const P = R;
export {
  P as RoomEnvironment
};
