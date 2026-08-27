import { jsx as a } from "react/jsx-runtime";
import { useMemo as M } from "react";
import w from "./sources/text-on-a-path.html.js";
import m from "./sources/text-on-a-path-ii.html.js";
const o = {
  mode: "dark",
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1
}, i = {
  globe: { source: m, index: 1, title: "Globe", layout: "figures" },
  outlineTypeflow: {
    source: m,
    index: 2,
    title: "Outline Typeflow",
    layout: "figures",
    renderDensity: { minimum: 2, maximum: 2.5 }
  },
  morphingGlyphCloud: {
    source: m,
    index: 3,
    title: "Morphing Glyph Cloud",
    layout: "figures",
    renderDensity: { minimum: 2, maximum: 2.5 }
  },
  cloth: { source: m, index: 6, title: "Cloth", layout: "figures" },
  ripple: {
    source: w,
    index: 2,
    title: "Ripple",
    layout: "cards",
    presentation: "dark-frameless"
  },
  ball: {
    source: w,
    index: 3,
    title: "Ball",
    layout: "cards",
    presentation: "dark-frameless"
  }
}, z = {
  "globe-study": i.globe,
  "outline-typeflow": i.outlineTypeflow,
  "morphing-glyph-cloud": i.morphingGlyphCloud,
  "cloth-study": i.cloth,
  "ripple-study": i.ripple,
  "ball-study": i.ball
};
function p(t, e, r) {
  return Math.min(r, Math.max(e, t));
}
function D(t, e) {
  const r = t.index, n = e === "light" ? "#f3f5f8" : "#08090a", l = e === "light" ? `
      :root {
        color-scheme: light;
        --bg: #f3f5f8;
        --line: rgba(20, 24, 32, .055);
        --line-strong: rgba(20, 24, 32, .10);
        --fig: rgba(20, 24, 32, .42);
        --title: #171922;
        --copy: rgba(20, 24, 32, .62);
      }
    ` : ":root { color-scheme: dark; }", d = t.presentation === "dark-frameless" ? `
      .stage, .row {
        background: ${n} !important;
        overflow: visible !important;
      }
      .card:nth-child(${r}) {
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: auto !important;
        border-radius: 0 !important;
        overflow: visible !important;
        background: transparent !important;
        isolation: auto !important;
      }
    ` : `
      .card:nth-child(${r}) {
        width: min(100cqw, 100cqh) !important;
        height: min(100cqw, 100cqh) !important;
      }
    `, u = t.layout === "figures" ? `
      .grid {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      .fig { display: none !important; }
      .fig:nth-child(${r}) {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
      }
      .fig::before, .fig::after, .fignum, .fig h3, .fig p { display: none !important; }
      .art {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .plate {
        width: min(100cqw, 100cqh) !important;
        height: min(100cqw, 100cqh) !important;
      }
    ` : `
      .stage {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        overflow: hidden !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .row {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .card { display: none !important; }
      .card:nth-child(${r}) {
        display: block !important;
      }
      .card figcaption { display: none !important; }
      ${d}
    `;
  return `<style id="threeui-study-focus">
    ${l}
    html, body, .frame {
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    body { margin: 0 !important; background: ${n} !important; }
    .frame { padding: 0 !important; background: ${n} !important; }
    header { display: none !important; }
    ${u}
  </style>`;
}
const k = "var dpr = Math.min(1.5, window.devicePixelRatio || 1);", v = "var INK  = '20,19,16';", C = "var INK  = '226,228,233';";
function b(t, e, r) {
  if (!t.includes(e))
    throw new Error(`Text path source adapter could not find: ${e}`);
  return t.replace(e, r);
}
function E(t, e) {
  return [
    [v, e === "light" ? v : "var INK  = '238,240,244';"],
    [
      `      var cell = s.w * 0.02860;
      var fs   = cell * 1.10;`,
      `      var size = Math.min(s.w, s.h);
      var cell = size * 0.02860;
      var fs   = cell * 1.10;`
    ],
    ["      var speed = s.w * 1.20;", "      var speed = size * 1.20;"],
    [
      `      var fs = s.w*FS;
      var now = performance.now();
      var hitR = s.w*0.055, hit = hitR*hitR;`,
      `      var size = Math.min(s.w, s.h);
      var fs = size*FS;
      var now = performance.now();
      var hitR = size*0.055, hit = hitR*hitR;`
    ],
    [
      `          vx: (dx/d)*s.w*(0.10 + Math.random()*0.16) + (Math.random()-0.5)*s.w*0.05,
          vy: (dy/d)*s.w*0.08 - s.w*(0.04 + Math.random()*0.10),`,
      `          vx: (dx/d)*size*(0.10 + Math.random()*0.16) + (Math.random()-0.5)*size*0.05,
          vy: (dy/d)*size*0.08 - size*(0.04 + Math.random()*0.10),`
    ],
    [
      `      var cx = s.w/2, cy = s.h/2 + s.w*CYOFF;
      var R  = s.w*RR;
      var fs = s.w*FS;`,
      `      var size = Math.min(s.w, s.h);
      var cx = s.w/2, cy = s.h/2 + size*CYOFF;
      var R  = size*RR;
      var fs = size*FS;`
    ],
    ["      var g = s.w*0.80;", "      var g = size*0.80;"]
  ].reduce(
    (n, [l, d]) => b(n, l, d),
    t
  );
}
function F(t, e) {
  const r = t.presentation === "dark-frameless" ? E(t.source, e) : e === "light" ? b(t.source, C, "var INK  = '38,40,48';") : t.source;
  return (t.renderDensity ? r.replace(
    k,
    `var dpr = Math.min(${t.renderDensity.maximum}, Math.max(${t.renderDensity.minimum}, window.devicePixelRatio || 1));`
  ) : r).replace(/<title>[\s\S]*?<\/title>/i, `<title>${t.title} — ThreeUI</title>`).replace("</head>", `${D(t, e)}
</head>`);
}
function s({
  definition: t,
  mode: e = o.mode,
  scale: r = o.scale,
  opacity: n = o.opacity,
  hue: l = o.hue,
  saturation: d = o.saturation,
  brightness: u = o.brightness,
  className: x,
  style: S
}) {
  const c = e === "light" ? "light" : "dark", R = M(() => F(t, c), [t, c]), h = p(r, 0.65, 1.5), T = p(n, 0.1, 1), f = p(l, -180, 180), y = p(d, 0, 2), g = p(u, 0.4, 1.8), $ = f === 0 && y === 1 && g === 1 ? void 0 : `hue-rotate(${f}deg) saturate(${y}) brightness(${g})`;
  return /* @__PURE__ */ a(
    "div",
    {
      className: ["text-path-study", `text-path-study--${c}`, x].filter(Boolean).join(" "),
      "data-mode": c,
      style: { opacity: T, filter: $, ...S },
      children: /* @__PURE__ */ a(
        "iframe",
        {
          className: "text-path-study-frame",
          "data-mode": c,
          title: `${t.title} interactive canvas study`,
          sandbox: "allow-scripts",
          srcDoc: R,
          style: { transform: h === 1 ? void 0 : `scale(${h})` }
        }
      )
    }
  );
}
function q({ variant: t = "globe-study", ...e } = {}) {
  return /* @__PURE__ */ a(s, { definition: z[t], ...e });
}
function U(t = {}) {
  return /* @__PURE__ */ a(s, { definition: i.outlineTypeflow, ...t });
}
function O(t = {}) {
  return /* @__PURE__ */ a(s, { definition: i.morphingGlyphCloud, ...t });
}
function G(t = {}) {
  return /* @__PURE__ */ a(s, { definition: i.cloth, ...t });
}
function P(t = {}) {
  return /* @__PURE__ */ a(s, { definition: i.ripple, ...t });
}
function H(t = {}) {
  return /* @__PURE__ */ a(s, { definition: i.ball, ...t });
}
export {
  H as BallStudy,
  G as ClothStudy,
  O as MorphingGlyphCloud,
  U as OutlineTypeflow,
  P as RippleStudy,
  o as TEXT_PATH_STUDY_DEFAULTS,
  q as TextPathStudies
};
