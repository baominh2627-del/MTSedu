import { jsx as m } from "react/jsx-runtime";
import { useRef as w, useState as a, useEffect as c, useMemo as E } from "react";
import d from "./sources/inner-green-3d.html.js";
import S from "./sources/inner-green-assets/three.min.js";
const L = '<main class="hero" id="hero"><canvas id="scene" role="img" aria-label="Sylva Living Green"></canvas><div class="stage" id="stage" aria-hidden="true"></div></main>', k = "<style data-threeui-sylva-scene>html,body{width:100%!important;height:100%!important;min-height:0!important;margin:0!important;overflow:hidden!important}body{position:relative!important;background:#4a4d44!important}.hero{height:100%!important;min-height:0!important}#scene{pointer-events:auto!important}</style>";
function R(o) {
  const n = d.indexOf('<main class="hero" id="hero">'), t = d.indexOf('<script src="inner-green-assets/three.min.js"><\/script>');
  if (n < 0 || t < 0 || t <= n) throw new Error("Sylva scene adapter could not isolate the authored Three.js scene.");
  let i = `${d.slice(0, n)}${L}

${d.slice(t)}`.replace("</head>", `${k}</head>`).replace('<script src="inner-green-assets/three.min.js"><\/script>', `<script data-threeui-three-runtime>${S}<\/script>`);
  return o && (i = i.replace("(function loop() { requestAnimationFrame(loop); tick(); })();", "(function loop() { if (!REDUCED) requestAnimationFrame(loop); tick(); })();")), i;
}
function D({ className: o = "", style: n }) {
  const t = w(null), [i, h] = a(!0), [p, f] = a(() => typeof document > "u" || !document.hidden), [s, v] = a(() => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches), [g, u] = a(!1);
  c(() => {
    const e = t.current;
    if (!e || typeof IntersectionObserver > "u") return;
    const r = new IntersectionObserver(([y]) => h(y?.isIntersecting ?? !0));
    return r.observe(e), () => r.disconnect();
  }, []), c(() => {
    if (typeof document > "u") return;
    const e = () => f(!document.hidden);
    return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
  }, []), c(() => {
    const e = window.matchMedia("(prefers-reduced-motion: reduce)"), r = () => v(e.matches);
    return e.addEventListener("change", r), () => e.removeEventListener("change", r);
  }, []);
  const b = E(() => R(s), [s]), l = i && p;
  return c(() => u(!1), [l, s]), /* @__PURE__ */ m("div", { ref: t, className: `threeui-background sylva-living-world-scene${o ? ` ${o}` : ""}`, role: "img", "aria-label": "Sylva Living Green with ferns, flowers, pollen, and a butterfly", "data-variant": "living-green", "data-state": g ? "ready" : "loading", style: { background: "#4a4d44", pointerEvents: "auto", ...n }, children: l ? /* @__PURE__ */ m("iframe", { title: "Sylva Living Green", srcDoc: b, sandbox: "allow-scripts", loading: "eager", onLoad: () => u(!0), style: { position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", border: 0, background: "#4a4d44" } }, s ? "reduced" : "motion") : null });
}
export {
  D as SylvaLivingWorldScene
};
