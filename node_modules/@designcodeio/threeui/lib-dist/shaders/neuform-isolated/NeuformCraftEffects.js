import { jsx as g } from "react/jsx-runtime";
import { useMemo as k } from "react";
import w from "./sources/aeonix-ember-storm.html.js";
import E from "./sources/aura-ui-fluid.html.js";
import S from "./sources/glassblown-neon.html.js";
import W from "./sources/julian-vance-nebula.html.js";
import T from "./sources/kinetic-lathe-certificate.html.js";
import C from "./sources/lumina-weavers-cloth.html.js";
import N from "./sources/nexus-unified-flow.html.js";
const u = {
  hue: 0,
  saturation: 1,
  brightness: 1
}, n = {
  neon: {
    title: "Animated neon typography",
    source: S,
    background: (e) => e === "light" ? "#f4f4f2" : "#090909",
    targets: [{ selector: "#board", role: "ui", width: "1040px" }],
    presentation: "animated-typography"
  },
  luminaWeaversCloth: {
    title: "Woven Cloth kinetic textile",
    source: C,
    background: "#16090b",
    targets: [{ selector: "body > div.fixed.inset-0.overflow-hidden.z-0", role: "background" }],
    presentation: "woven-cloth-label"
  },
  julianVanceNebula: {
    title: "Julian Vance nebula background",
    source: W,
    background: "#09090b",
    targets: [{ selector: "#bg-canvas", role: "background" }]
  },
  fluid: {
    title: "Aura UI fluid background",
    source: E,
    background: "#030306",
    targets: [{ selector: "#bg-canvas", role: "background" }]
  },
  nexusUnifiedFlow: {
    title: "Nexus unified halftone flow",
    source: N,
    background: "#000000",
    targets: [{ selector: "#glcanvas", role: "background" }]
  },
  emberStorm: {
    title: "Aeonix ember storm",
    source: w,
    background: "#080503",
    targets: [{ selector: "#gl", role: "background" }]
  },
  engravedCertificate: {
    title: "Kinetic Lathe certificate",
    source: T,
    background: "#ded6c2",
    targets: [{ selector: "#cert", role: "ui", width: "720px" }]
  }
};
function d(e, t, o) {
  return Math.min(o, Math.max(t, e));
}
function b(e, t, o) {
  if (!e.includes(t))
    throw new Error(`Neuform source adapter could not find: ${t}`);
  return e.replace(t, o);
}
function A(e) {
  return [
    [
      "return { t0: after + 5.6 + frnd() * 7.2, dur: total, segs: segs };",
      "return { t0: after + 1.25 + frnd() * 1.75, dur: total, segs: segs };"
    ],
    ["if (!ev) ev = nextEvent(4.2);", "if (!ev) ev = nextEvent(0.55);"],
    [
      "cap = Math.min((W - W * 0.12) / blockW, (H - H * 0.18) / blockH);",
      "cap = Math.min((W - W * 0.20) / blockW, (H - H * 0.28) / blockH);"
    ],
    ["var y0 = (H - blockH * cap) * 0.48;", "var y0 = (H - blockH * cap) / 2;"]
  ].reduce(
    (t, [o, r]) => b(t, o, r),
    e
  );
}
function F(e) {
  return [
    ["x.fillText('L W', W/2, 190);", "x.fillText('W C', W/2, 190);"],
    ["x.fillText('· KYOTO ·', W/2, 246);", "x.fillText('· WOVEN CLOTH ·', W/2, 246);"],
    ["x.fillText('LUMINA', W/2, 400);", "x.fillText('WOVEN', W/2, 400);"],
    ["x.fillText('WEAVERS', W/2, 520);", "x.fillText('CLOTH', W/2, 520);"],
    [
      "x.fillText('K I N E T I C   T E X T I L E S   ·   2 0 2 4', W/2, 626);",
      "x.fillText('T E X T I L E   S I M U L A T I O N', W/2, 626);"
    ]
  ].reduce(
    (t, [o, r]) => b(t, o, r),
    e
  );
}
function y(e, t) {
  return typeof e.background == "function" ? e.background(t) : e.background;
}
function H(e, t) {
  const o = JSON.stringify(e.targets).replace(/</g, "\\u003c"), r = y(e, t), c = t === "light" ? "grayscale(1) invert(1) contrast(1.08)" : "grayscale(1) contrast(1.08)", s = e.presentation === "animated-typography" ? `
@keyframes sf-neon-type-breathe {
  0%, 100% { transform: translate3d(0, 3px, 0) scale(0.988); opacity: 0.88; }
  45% { transform: translate3d(0, -3px, 0) scale(1); opacity: 1; }
  68% { transform: translate3d(0, 0, 0) scale(0.996); opacity: 0.96; }
}
#board { overflow: visible !important; }
#neon {
  transform-origin: 50% 52%;
  animation: sf-neon-type-breathe 5.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  filter: ${c};
  will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
  #neon { animation: none !important; transform: none !important; opacity: 1 !important; }
}
` : "", l = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${r} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
${s}
</style>`, i = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${o};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
<\/script>`;
  return (e.presentation === "animated-typography" ? A(e.source) : e.presentation === "woven-cloth-label" ? F(e.source) : e.source).replace(/<\/head>/i, `${l}</head>`).replace(/<\/body>/i, `${i}</body>`);
}
function L({
  definition: e,
  mode: t = "dark",
  hue: o = u.hue,
  saturation: r = u.saturation,
  brightness: c = u.brightness,
  className: s,
  style: l
}) {
  const i = t === "light" ? "light" : "dark", m = y(e, i), x = k(() => H(e, i), [e, i]), p = d(o, -180, 180), f = d(r, 0, 2), h = d(c, 0.35, 1.65), v = p === 0 && f === 1 && h === 1 ? void 0 : `hue-rotate(${p}deg) saturate(${f}) brightness(${h})`;
  return /* @__PURE__ */ g(
    "iframe",
    {
      className: s,
      "data-mode": i,
      title: e.title,
      srcDoc: x,
      sandbox: "allow-scripts",
      loading: "eager",
      style: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: m,
        filter: v,
        ...l
      }
    }
  );
}
function a(e) {
  return function(o) {
    return /* @__PURE__ */ g(L, { ...o, definition: e });
  };
}
const D = a(n.neon), R = a(n.luminaWeaversCloth), q = a(n.julianVanceNebula), J = a(n.fluid), K = a(n.nexusUnifiedFlow), X = a(n.emberStorm), _ = a(n.engravedCertificate);
export {
  X as EmberStorm,
  _ as EngravedCertificate,
  J as FluidFieldBackground,
  K as HalftoneFlow,
  u as NEUFORM_CRAFT_DEFAULTS,
  q as NebulaBackground,
  D as NeonTypography,
  R as WovenCloth
};
