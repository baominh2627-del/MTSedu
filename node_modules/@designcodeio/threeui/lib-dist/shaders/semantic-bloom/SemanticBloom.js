import { jsx as h } from "react/jsx-runtime";
import { useRef as E, useState as _, useMemo as M, useCallback as S, useEffect as u } from "react";
import A from "./sources/design-f0ebbe02-7d8a-41fd-9041-a1124185c27b.html.js";
const o = {
  text: "Codex",
  mode: "dark",
  size: 1,
  opacity: 1
};
function w(t, e, n) {
  return Math.min(n, Math.max(e, t));
}
function O(t) {
  const e = t === "light", n = e ? "#f4f4f2" : "#030303", i = e ? "#989894" : "#555555", c = e ? "#151515" : "#e0e0e0", l = e ? "rgba(28, 28, 28, 0.78)" : "rgba(200, 200, 200, 0.8)", r = e ? "rgba(48, 48, 46, 0.14)" : "rgba(120, 120, 120, 0.15)", d = `<style data-semantic-bloom-focus>
:root {
  --bg-color: ${n};
  --text-color: ${i};
  --highlight-color: ${c};
  --sf-semantic-size: 1;
}
html, body { background: ${n}; }
.query-container, .status-hud { display: none !important; }
.interface-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 8vw, 8rem);
}
.journal-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  overflow: visible;
  color: ${i};
  font-size: clamp(4rem, calc(12vw * var(--sf-semantic-size)), 11rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.065em;
  text-align: center;
  white-space: pre-wrap;
  caret-color: transparent;
}
.journal-area .word { display: inline-block; color: ${i}; }
#cursor-follower { display: none; border-color: ${e ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.3)"}; }
@media (max-width: 640px) {
  .interface-layer { padding: 1.5rem; }
  .journal-area { font-size: clamp(3rem, calc(19vw * var(--sf-semantic-size)), 7rem); }
}
</style>`;
  return A.replace('<title vid="4">Organic Semantic Explorer</title>', '<title vid="4">Semantic Bloom</title>').replace("</head>", `${d}</head>`).replace("ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';", `ctx.fillStyle = '${l}';`).replace("ctx.strokeStyle = 'rgba(120, 120, 120, 0.15)';", `ctx.strokeStyle = '${r}';`).replace(
    `function animate() {
            
            ctx.clearRect(0, 0, width, height);`,
    `function animate() {
            window.__SEMANTIC_BLOOM_FRAME_PENDING = false;
            ctx.clearRect(0, 0, width, height);`
  ).replace(
    "requestAnimationFrame(animate);",
    "if (!window.__SEMANTIC_BLOOM_PAUSED) { window.__SEMANTIC_BLOOM_FRAME_PENDING = true; requestAnimationFrame(animate); }"
  ).replace("</body>", `<script data-semantic-bloom-controls>
(function () {
  window.__SEMANTIC_BLOOM_PAUSED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.__SEMANTIC_BLOOM_FRAME_PENDING = false;

  function setText(value) {
    var next = typeof value === 'string' && value.trim() ? value.slice(0, 72) : 'Codex';
    editor.textContent = next;
    editor.dataset.processed = 'false';
    editor.setAttribute('contenteditable', 'false');
    scanText();
  }

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'semantic-bloom-controls') return;
    var next = event.data.controls || {};
    if (typeof next.text === 'string') setText(next.text);
    if (Number.isFinite(next.size)) {
      document.documentElement.style.setProperty('--sf-semantic-size', String(Math.max(0.55, Math.min(1.6, next.size))));
      updateWordCoords();
    }
    var wasPaused = window.__SEMANTIC_BLOOM_PAUSED;
    window.__SEMANTIC_BLOOM_PAUSED = Boolean(next.paused);
    if (wasPaused && !window.__SEMANTIC_BLOOM_PAUSED && !window.__SEMANTIC_BLOOM_FRAME_PENDING && typeof animate === 'function') animate();
  });
})();
<\/script></body>`);
}
function T({
  text: t = o.text,
  mode: e = o.mode,
  size: n = o.size,
  opacity: i = o.opacity,
  className: c = "",
  style: l
}) {
  const r = E(null), [d, f] = _(!0), [x, y] = _(() => typeof document > "u" || !document.hidden), a = e === "light" ? "light" : "dark", p = M(() => O(a), [a]), b = !d || !x, m = S(() => {
    r.current?.contentWindow?.postMessage({
      type: "semantic-bloom-controls",
      controls: {
        text: t.trim() || o.text,
        size: w(n, 0.55, 1.6),
        paused: b
      }
    }, "*");
  }, [b, n, t]);
  return u(() => {
    const s = r.current;
    if (!s || typeof IntersectionObserver > "u") return;
    const g = new IntersectionObserver(([v]) => f(v?.isIntersecting ?? !0));
    return g.observe(s), () => g.disconnect();
  }, []), u(() => {
    if (typeof document > "u") return;
    const s = () => y(!document.hidden);
    return document.addEventListener("visibilitychange", s), () => document.removeEventListener("visibilitychange", s);
  }, []), u(() => {
    m();
  }, [m, p]), /* @__PURE__ */ h(
    "div",
    {
      className: `threeui-background semantic-bloom semantic-bloom--${a}${c ? ` ${c}` : ""}`,
      "data-mode": a,
      style: { background: a === "light" ? "#f4f4f2" : "#030303", pointerEvents: "auto", ...l },
      children: /* @__PURE__ */ h(
        "iframe",
        {
          ref: r,
          title: `Semantic Bloom: ${t.trim() || o.text}`,
          srcDoc: p,
          sandbox: "allow-scripts",
          onLoad: m,
          style: {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "transparent",
            opacity: w(i, 0.1, 1)
          }
        }
      )
    }
  );
}
export {
  o as SEMANTIC_BLOOM_DEFAULTS,
  T as SemanticBloom
};
