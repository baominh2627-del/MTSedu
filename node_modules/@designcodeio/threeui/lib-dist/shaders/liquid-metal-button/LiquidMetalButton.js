import { jsx as L } from "react/jsx-runtime";
import { useRef as m, useState as W, useMemo as N, useCallback as E, useEffect as u } from "react";
import h from "./liquid-metal-button.html.js";
const v = `
<script id="liquid-metal-button-bridge">
  window.addEventListener('message', event => {
    if(event.source !== parent) return;
    const config = event.data && event.data.liquidMetalButton;
    if(!config) return;
    const text = typeof config.text === 'string' ? config.text.slice(0, 24) : '';
    const label = btn.querySelector('.lbl');
    if(label) label.textContent = text;
    btn.setAttribute('aria-label', text || 'Button');
    if(Number.isFinite(config.pillWidthUnits)) {
      stage.style.setProperty('--bw', 'calc(' + config.pillWidthUnits + ' * var(--u))');
    }
    document.body.style.background = config.embedded ? '#0e0f12' : '';
    stage.style.position = config.embedded ? 'absolute' : '';
    stage.style.top = config.embedded ? '50%' : '';
    stage.style.left = config.embedded ? '50%' : '';
    stage.style.transform = config.embedded ? 'translate(-50%, -50%)' : '';
  });

  btn.addEventListener('click', () => {
    parent.postMessage({ liquidMetalButton: { type: 'activate' } }, '*');
  });
<\/script>`, T = `
<style id="liquid-metal-circle-variant">
  body[data-shape="circle"] .stage {
    --h: clamp(56px, 10vmin, 72px);
    --bw: var(--h);
  }

  body[data-shape="circle"] .btn {
    gap: 0;
  }

  body[data-shape="circle"] .btn .ico {
    width: 28%;
    height: 28%;
  }

  body[data-shape="circle"] .btn .lbl {
    display: none;
  }
</style>`;
function $(e) {
  return e === "pill" ? h.replace("</body>", `${v}
</body>`) : h.replace("</head>", `${T}
</head>`).replace("<body>", '<body data-shape="circle">').replace(
    '<button class="btn" id="btn" type="button">',
    '<button class="btn" id="btn" type="button" aria-label="Add">'
  ).replace("</body>", `${v}
</body>`);
}
const U = h.replace(
  "--bw: calc(1407 * var(--u));",
  "--bw: var(--h);"
).replace(
  "</style>",
  `
  /* Circular play-button adapter. The renderer and interaction graph stay
     source-exact; only geometry, finish, outline, and accessible naming vary. */
  body{position:relative}
  .stage{
    --h:88px;
    position:absolute;top:50%;left:50%;
    transform:translate(-50%,-50%);
  }
  #fx{filter:none}
  .btn{flex-direction:column;gap:0}
  .btn:focus-visible{outline:2px solid rgba(255,255,255,.68);outline-offset:4px}
  .btn .ico{
    width:calc(var(--h) * .25);height:calc(var(--h) * .25);
    transform:translateX(calc(var(--h) * .018));
  }
</style>`
).replace(
  `<button class="btn" id="btn" type="button">
    <svg class="ico" viewBox="0 0 115 115" aria-hidden="true">
      <g stroke="currentColor" stroke-width="17" stroke-linecap="round">
        <path d="M57.5 8.5 V106.5"/>
        <path d="M8.5 57.5 H106.5"/>
      </g>
    </svg>
    <span class="lbl">Sign up</span>
  </button>`,
  `<button class="btn" id="btn" type="button" aria-label="Play">
    <svg class="ico" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="currentColor" d="M15.5 10.75a2.2 2.2 0 0 1 3.32-1.9l18.04 13.25a2.35 2.35 0 0 1 0 3.8L18.82 39.15a2.2 2.2 0 0 1-3.32-1.9v-26.5Z"/>
    </svg>
  </button>`
).replace(
  "let needResize = true;",
  `let needResize = true;
let playStrokeWidth = 3;`
).replace(
  "const bw = Math.max(1.5, 3.2 * (BH/516));      // stroke half-width, device px",
  "const bw = Math.max(0.5 * DPR, playStrokeWidth * DPR * 0.5); // configurable stroke half-width, device px"
).replace(
  "window.__seek   = v => { clock = v; drawn = null; };",
  `window.__seek   = v => { clock = v; drawn = null; };

window.addEventListener('message', event => {
  if(event.source !== parent) return;
  const config = event.data && event.data.liquidMetalPlayButton;
  if(!config) return;
  const diameter = Math.min(160, Math.max(72, Number(config.diameter) || 88));
  const strokeWidth = Math.min(8, Math.max(1, Number(config.strokeWidth) || 3));
  const text = typeof config.text === 'string' ? config.text.slice(0, 24) : 'Play';
  stage.style.setProperty('--h', diameter + 'px');
  playStrokeWidth = strokeWidth;
  btn.setAttribute('aria-label', text.trim() || 'Play');
  cv.style.filter = config.rendering === 'monotone' ? 'grayscale(1) contrast(1.04)' : 'none';
  needResize = true;
  drawn = null;
});`
).replace("</body>", `${v}
</body>`);
function P(e, i, b, p) {
  return Number.isFinite(e) ? Math.min(b, Math.max(i, e)) : p;
}
function F({
  className: e = "",
  variant: i = "pill",
  rendering: b = "colored",
  diameter: p = 88,
  strokeWidth: R = 3,
  text: S,
  embedded: x = !1,
  onClick: f
}) {
  const w = m(null), l = m(null), M = m(!0), [s, _] = W(!0), [c, k] = W(!1), t = i === "circle" || i === "play" ? i : "pill", a = t === "play", d = String(S ?? (t === "pill" ? "Sign up" : t === "circle" ? "Add" : "Play")).slice(0, 24), q = t === "pill" ? Math.min(3e3, Math.max(1407, 820 + d.length * 94)) : void 0, I = N(
    () => a ? U : $(t),
    [a, t]
  ), r = {
    diameter: P(p, 72, 160, 88),
    strokeWidth: P(R, 1, 8, 3),
    rendering: b,
    text: d
  }, g = E(() => {
    l.current?.contentWindow?.postMessage({
      liquidMetalButton: { text: d, pillWidthUnits: q, embedded: x }
    }, "*");
  }, [x, q, d]), y = E(() => {
    a && l.current?.contentWindow?.postMessage({ liquidMetalPlayButton: r }, "*");
  }, [a, r.diameter, r.rendering, r.strokeWidth, r.text]);
  return u(() => {
    const o = w.current;
    if (!o) return;
    const n = () => _(M.current && document.visibilityState !== "hidden"), B = new IntersectionObserver(([C]) => {
      M.current = C.isIntersecting, n();
    }, { rootMargin: "80px" });
    return B.observe(o), document.addEventListener("visibilitychange", n), () => {
      B.disconnect(), document.removeEventListener("visibilitychange", n);
    };
  }, []), u(() => {
    s || k(!1);
  }, [s]), u(() => {
    c && (g(), y());
  }, [c, g, y]), u(() => {
    if (!f) return;
    const o = (n) => {
      n.source === l.current?.contentWindow && n.data?.liquidMetalButton?.type === "activate" && f();
    };
    return window.addEventListener("message", o), () => window.removeEventListener("message", o);
  }, [f]), /* @__PURE__ */ L(
    "div",
    {
      ref: w,
      className: `liquid-metal-button${e ? ` ${e}` : ""}`,
      "data-state": s ? c ? "ready" : "loading" : "paused",
      "data-variant": t,
      children: s ? /* @__PURE__ */ L(
        "iframe",
        {
          ref: l,
          className: `liquid-metal-button__frame${c ? " is-ready" : ""}`,
          title: t === "circle" ? "Interactive liquid metal circle button" : a ? "Interactive liquid metal play button" : "Interactive liquid metal button",
          srcDoc: I,
          sandbox: "allow-scripts",
          loading: "eager",
          onLoad: () => {
            k(!0), g(), y();
          }
        },
        t
      ) : null
    }
  );
}
export {
  F as LiquidMetalButton
};
