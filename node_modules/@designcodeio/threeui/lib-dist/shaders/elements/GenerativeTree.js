import { jsx as h } from "react/jsx-runtime";
import { useRef as y, useState as _, useMemo as A, useCallback as S, useEffect as l } from "react";
import k from "./sources/generative-tree.html.js";
const e = {
  speed: 1,
  size: 1,
  particleAmount: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1
};
function t(a, n, r) {
  return Math.min(r, Math.max(n, a));
}
function L(a, n) {
  const r = Math.max(0, Math.round(50 * t(n, 0, 2))), o = 1 / t(a, 0.65, 1.5);
  return k.replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "").replace("</head>", `<style data-generative-tree-focus>
html, body, canvas { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #0a0a0a; }
.label { display: none !important; }
</style><script data-generative-tree-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { last: null, time: null };
  window.__GENERATIVE_TREE_CONTROLS = { speed: 1, paused: false };
  window.requestAnimationFrame = function (callback) {
    return nativeFrame(function (realTime) {
      var state = window.__GENERATIVE_TREE_CONTROLS;
      if (clock.last === null) {
        clock.last = realTime;
        clock.time = realTime;
      } else {
        if (!state.paused) clock.time += (realTime - clock.last) * state.speed;
        clock.last = realTime;
      }
      callback(clock.time);
    });
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'generative-tree-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) {
      window.__GENERATIVE_TREE_CONTROLS.speed = Math.max(0, Math.min(3, next.speed));
    }
    window.__GENERATIVE_TREE_CONTROLS.paused = Boolean(next.paused);
  });
})();
<\/script></head>`).replace("const PARTICLE_COUNT = 50;", `const PARTICLE_COUNT = ${r};`).replace(
    "const _pad = parseFloat(new URLSearchParams(location.search).get('p')) || 1;",
    `const _pad = ${o.toFixed(4)};`
  ).replace(
    `function frame(time) {
    // Decay shake`,
    `function frame(time) {
    if (window.__GENERATIVE_TREE_CONTROLS.paused) { requestAnimationFrame(frame); return; }

    // Decay shake`
  ).replace(
    "b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed);",
    "b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed * window.__GENERATIVE_TREE_CONTROLS.speed);"
  ).replace("holdTimer++;", "holdTimer += window.__GENERATIVE_TREE_CONTROLS.speed;").replace("fadeTimer++;", "fadeTimer += window.__GENERATIVE_TREE_CONTROLS.speed;").replace("waitTimer++;", "waitTimer += window.__GENERATIVE_TREE_CONTROLS.speed;").replace(
    `  createTree();
  requestAnimationFrame(frame);`,
    `  function startTreeWhenSized() {
    resize();
    if (W <= 0 || H <= 0) {
      requestAnimationFrame(startTreeWhenSized);
      return;
    }
    createTree();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(startTreeWhenSized);`
  );
}
function V({
  speed: a = e.speed,
  size: n = e.size,
  particleAmount: r = e.particleAmount,
  opacity: o = e.opacity,
  hue: u = e.hue,
  saturation: m = e.saturation,
  brightness: w = e.brightness,
  className: p = "",
  style: b
}) {
  const s = y(null), [g, v] = _(!0), [R, N] = _(() => typeof document > "u" || !document.hidden), c = t(a, 0, 3), E = !g || !R || c === 0, T = A(() => L(n, r), [r, n]), d = S(() => {
    s.current?.contentWindow?.postMessage({
      type: "generative-tree-controls",
      controls: { speed: c, paused: E }
    }, "*");
  }, [E, c]);
  return l(() => {
    const i = s.current;
    if (!i || typeof IntersectionObserver > "u") return;
    const f = new IntersectionObserver(([O]) => v(O?.isIntersecting ?? !0));
    return f.observe(i), () => f.disconnect();
  }, []), l(() => {
    if (typeof document > "u") return;
    const i = () => N(!document.hidden);
    return document.addEventListener("visibilitychange", i), () => document.removeEventListener("visibilitychange", i);
  }, []), l(() => {
    d();
  }, [d, T]), /* @__PURE__ */ h(
    "div",
    {
      className: `threeui-background generative-tree${p ? ` ${p}` : ""}`,
      style: { background: "#0a0a0a", pointerEvents: "auto", ...b },
      children: /* @__PURE__ */ h(
        "iframe",
        {
          ref: s,
          title: "Generative Tree background",
          srcDoc: T,
          sandbox: "allow-scripts",
          onLoad: d,
          "aria-hidden": "true",
          tabIndex: -1,
          style: {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#0a0a0a",
            opacity: t(o, 0.05, 1),
            filter: `hue-rotate(${t(u, -180, 180)}deg) saturate(${t(m, 0, 2)}) brightness(${t(w, 0.35, 1.8)})`
          }
        }
      )
    }
  );
}
export {
  e as GENERATIVE_TREE_DEFAULTS,
  V as GenerativeTree
};
