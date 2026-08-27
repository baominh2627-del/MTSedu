import { jsxs as o, jsx as e } from "react/jsx-runtime";
import { useRef as f, useState as v, useEffect as m } from "react";
import { createBookshelfRenderer as y } from "./bookshelfRenderer.js";
function w({ className: l = "" }) {
  const c = f(null), p = f(null), [s, n] = v("loading"), [h, r] = v("");
  return m(() => {
    const d = c.current, u = p.current;
    if (!d || !u) return;
    let a = !1, i;
    try {
      i = y(d, u, {
        onReady: () => {
          a || n("ready");
        },
        onError: (t) => {
          a || (r(t), n("unavailable"));
        }
      }), i.ready.catch((t) => {
        a || (r(t instanceof Error ? t.message : "Unknown renderer error"), n("unavailable"));
      });
    } catch (t) {
      r(t instanceof Error ? t.message : "Unknown renderer error"), n("unavailable");
      return;
    }
    const b = new ResizeObserver(() => i.resize());
    return b.observe(d), () => {
      a = !0, b.disconnect(), i.dispose();
    };
  }, []), /* @__PURE__ */ o(
    "div",
    {
      className: `bookshelf${l ? ` ${l}` : ""}`,
      ref: c,
      "data-state": s,
      tabIndex: 0,
      children: [
        /* @__PURE__ */ e(
          "canvas",
          {
            ref: p,
            className: `bookshelf__canvas${s === "ready" ? " is-ready" : ""}`,
            "aria-label": "Interactive Bookshelf collection"
          }
        ),
        /* @__PURE__ */ o("div", { className: "bookshelf__source-controls", "aria-hidden": "true", children: [
          /* @__PURE__ */ e("div", { id: "loading", hidden: !0 }),
          /* @__PURE__ */ e("p", { id: "fallback-status" }),
          /* @__PURE__ */ e("section", { id: "browse-ui" }),
          /* @__PURE__ */ e("aside", { id: "detail-panel", children: /* @__PURE__ */ e("div", { className: "detail-controls", children: /* @__PURE__ */ e("p", { className: "microcopy" }) }) }),
          /* @__PURE__ */ e("span", { id: "selection-title" }),
          /* @__PURE__ */ e("span", { id: "selection-note" }),
          /* @__PURE__ */ e("span", { id: "counter" }),
          /* @__PURE__ */ e("span", { id: "palette-label" }),
          /* @__PURE__ */ e("div", { id: "markers" }),
          /* @__PURE__ */ e("button", { id: "previous", type: "button" }),
          /* @__PURE__ */ e("button", { id: "next", type: "button" }),
          /* @__PURE__ */ e("button", { id: "inspect", type: "button" }),
          /* @__PURE__ */ e("button", { id: "close-detail", type: "button" }),
          /* @__PURE__ */ e("button", { id: "reset-view", type: "button" }),
          /* @__PURE__ */ e("button", { id: "toggle-book", type: "button" }),
          /* @__PURE__ */ e("button", { id: "previous-page", type: "button" }),
          /* @__PURE__ */ e("button", { id: "next-page", type: "button" }),
          /* @__PURE__ */ e("span", { id: "page-label" }),
          /* @__PURE__ */ e("span", { id: "page-counter" }),
          /* @__PURE__ */ e("span", { id: "detail-eyebrow" }),
          /* @__PURE__ */ e("span", { id: "detail-title" }),
          /* @__PURE__ */ e("span", { id: "detail-deck" }),
          /* @__PURE__ */ e("span", { id: "detail-binding" }),
          /* @__PURE__ */ e("span", { id: "detail-format" }),
          /* @__PURE__ */ e("span", { id: "detail-theme" }),
          /* @__PURE__ */ e("span", { id: "detail-motif" }),
          /* @__PURE__ */ e("span", { id: "live-region" }),
          /* @__PURE__ */ o("span", { id: "pointer-label", children: [
            /* @__PURE__ */ e("span", { id: "pointer-label-index" }),
            /* @__PURE__ */ e("span", { id: "pointer-label-title" })
          ] })
        ] }),
        s === "unavailable" ? /* @__PURE__ */ o("p", { className: "bookshelf__unavailable", role: "status", children: [
          "WebGL is unavailable: ",
          h || "unsupported context",
          "."
        ] }) : null
      ]
    }
  );
}
export {
  w as BookshelfScene
};
