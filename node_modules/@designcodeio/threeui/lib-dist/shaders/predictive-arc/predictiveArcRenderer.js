const T = {
  mode: "dark",
  speed: 1,
  spacing: 5,
  dotSize: 6,
  archHeight: 0.7,
  thickness: 1,
  brightness: 1,
  hue: 0,
  saturation: 1
};
function z(n) {
  return n === "light" || n === 1 || n === "1" ? "light" : "dark";
}
function A(n, w) {
  const o = n.getContext("2d", { alpha: !1 });
  if (!o) return null;
  let c = 1, l = 1, f = 0;
  return { resize: (e, g) => {
    c = Math.max(1, e), l = Math.max(1, g);
    const i = Math.min(window.devicePixelRatio || 1, 2);
    n.width = Math.round(c * i), n.height = Math.round(l * i), o.setTransform(i, 0, 0, i, 0, 0);
  }, render: () => {
    const e = w(), i = z(e.mode) === "light";
    o.fillStyle = i ? "#eef1f6" : "#030303", o.fillRect(0, 0, c, l), f += 0.015 * e.speed;
    const b = c / 2, x = l * 0.35, v = c * 1.5, R = l * e.archHeight;
    o.globalCompositeOperation = i ? "source-over" : "lighter";
    for (let M = 0; M < c; M += e.spacing) {
      const m = (M - b) / (v / 2), k = x + m * m * R;
      for (let d = 0; d < l; d += e.spacing) {
        const p = Math.abs(d - k), u = (140 + (1 - Math.abs(m)) * 80) * e.thickness;
        if (p >= u) continue;
        let t = 1 - p / u;
        const C = Math.sin(M * 0.015 + f), S = Math.cos(d * 0.02 + f);
        if (t = t * 0.7 + C * S * 0.3 * t, t *= Math.max(0, 1 - Math.pow(Math.abs(m), 2.5)), t <= 0.02) continue;
        let a, h, s;
        if (i) {
          if (a = Math.min(255, 48 * t + 70 * Math.pow(t, 3)), h = Math.min(255, 28 * t + 45 * Math.pow(t, 4)), s = Math.min(255, 120 * t + 110 * Math.pow(t, 2)), t > 0.7) {
            const r = (t - 0.7) * 3.3;
            a = Math.min(255, a + 90 * r), h = Math.min(255, h + 70 * r), s = Math.min(255, s + 110 * r);
          }
        } else if (a = Math.min(255, 60 * t + 100 * Math.pow(t, 3)), h = Math.min(255, 20 * t + 60 * Math.pow(t, 4)), s = Math.min(255, 120 * t + 135 * Math.pow(t, 2)), t > 0.7) {
          const r = (t - 0.7) * 3.3;
          a = Math.min(255, a + 150 * r), h = Math.min(255, h + 150 * r), s = Math.min(255, s + 150 * r);
        }
        o.fillStyle = `rgb(${Math.floor(a * e.brightness)}, ${Math.floor(h * e.brightness)}, ${Math.floor(s * e.brightness)})`, o.fillRect(M, d, e.dotSize * t, e.dotSize * t);
      }
    }
    o.globalCompositeOperation = "source-over";
  } };
}
export {
  T as PREDICTIVE_ARC_DEFAULTS,
  A as createPredictiveArcRenderer
};
