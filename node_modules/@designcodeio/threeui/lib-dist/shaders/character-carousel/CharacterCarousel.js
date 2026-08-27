import { jsx as n } from "react/jsx-runtime";
import { useRef as F, useState as w, useMemo as T, useCallback as O, useEffect as d } from "react";
import L from "./sources/character-filmstrip.html.js";
import M from "./sources/character-wave.html.js";
const t = {
  variant: "filmstrip",
  speed: 1,
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1
}, $ = {
  filmstrip: L,
  wave: M
};
function r(e, a, o) {
  return Math.min(o, Math.max(a, e));
}
function I(e) {
  return $[e].replaceAll("performance.now()", "window.__CHARACTER_CAROUSEL_NOW()").replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "").replace("</head>", `<style data-character-carousel-focus>
:root { --character-carousel-scale: 1; }
html, body, .stage { width: 100%; height: 100%; margin: 0; overflow: hidden; }
.stage { min-height: 0 !important; }
.deck { transform: scale(var(--character-carousel-scale)); transform-origin: 50% 50%; }
</style><script data-character-carousel-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { real: null, virtual: null };
  var controls = window.__CHARACTER_CAROUSEL_CONTROLS = { speed: 1, scale: 1, paused: false };
  window.__CHARACTER_CAROUSEL_NOW = function () {
    return clock.virtual === null ? performance.now() : clock.virtual;
  };
  window.requestAnimationFrame = function (callback) {
    function tick(realTime) {
      if (clock.real === null) {
        clock.real = realTime;
        clock.virtual = realTime;
      } else {
        if (!controls.paused) clock.virtual += (realTime - clock.real) * controls.speed;
        clock.real = realTime;
      }
      if (controls.paused) {
        return nativeFrame(tick);
      }
      callback(clock.virtual);
    }
    return nativeFrame(tick);
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'character-carousel-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) controls.speed = Math.max(0, Math.min(2.5, next.speed));
    if (Number.isFinite(next.scale)) controls.scale = Math.max(0.7, Math.min(1.3, next.scale));
    controls.paused = Boolean(next.paused);
    document.documentElement.style.setProperty('--character-carousel-scale', String(controls.scale));
  });
})();
<\/script></head>`);
}
function g({
  variant: e = t.variant,
  speed: a = t.speed,
  scale: o = t.scale,
  opacity: m = t.opacity,
  hue: k = t.hue,
  saturation: y = t.saturation,
  brightness: C = t.brightness,
  className: f = "",
  style: A
}) {
  const s = F(null), [R, S] = w(!0), [E, _] = w(() => typeof document > "u" || !document.hidden), i = r(a, 0, 2.5), p = r(o, 0.7, 1.3), h = !R || !E || i === 0, v = T(() => I(e), [e]), l = O(() => {
    s.current?.contentWindow?.postMessage({
      type: "character-carousel-controls",
      controls: { speed: i, scale: p, paused: h }
    }, "*");
  }, [h, p, i]);
  d(() => {
    const c = s.current;
    if (!c || typeof IntersectionObserver > "u") return;
    const b = new IntersectionObserver(([x]) => S(x?.isIntersecting ?? !0));
    return b.observe(c), () => b.disconnect();
  }, []), d(() => {
    if (typeof document > "u") return;
    const c = () => _(!document.hidden);
    return document.addEventListener("visibilitychange", c), () => document.removeEventListener("visibilitychange", c);
  }, []), d(() => {
    l();
  }, [l, v]);
  const u = e === "filmstrip";
  return /* @__PURE__ */ n(
    "div",
    {
      className: `threeui-background character-carousel character-carousel--${e}${f ? ` ${f}` : ""}`,
      style: { background: u ? "#d8c9ad" : "#121212", pointerEvents: "auto", ...A },
      children: /* @__PURE__ */ n(
        "iframe",
        {
          ref: s,
          title: u ? "Interactive character filmstrip" : "Interactive character wave",
          srcDoc: v,
          sandbox: "allow-scripts",
          onLoad: l,
          style: {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: u ? "#d8c9ad" : "#121212",
            opacity: r(m, 0.05, 1),
            filter: `hue-rotate(${r(k, -180, 180)}deg) saturate(${r(y, 0, 2)}) brightness(${r(C, 0.35, 1.65)})`
          }
        }
      )
    }
  );
}
function W(e) {
  return /* @__PURE__ */ n(g, { ...e, variant: "filmstrip" });
}
function D(e) {
  return /* @__PURE__ */ n(g, { ...e, variant: "wave" });
}
export {
  t as CHARACTER_CAROUSEL_DEFAULTS,
  g as CharacterCarousel,
  W as CharacterFilmstrip,
  D as CharacterWave
};
