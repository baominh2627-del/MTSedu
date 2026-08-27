import { jsx as t } from "react/jsx-runtime";
import { useState as r } from "react";
const s = "/synthralos-halftone.html";
function l({ className: e = "", style: a }) {
  const [o, i] = r(!1);
  return /* @__PURE__ */ t(
    "div",
    {
      className: `threeui-background koi-studies${e ? ` ${e}` : ""}`,
      "aria-label": "Interactive stack of three Japanese koi studies",
      "data-state": o ? "ready" : "loading",
      style: {
        position: "relative",
        overflow: "hidden",
        background: "#10100e",
        pointerEvents: "auto",
        ...a
      },
      children: /* @__PURE__ */ t(
        "iframe",
        {
          title: "Koi Studies — Interactive Card Stack",
          src: s,
          sandbox: "allow-scripts",
          allow: "autoplay",
          loading: "eager",
          onLoad: () => i(!0),
          style: {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#10100e"
          }
        }
      )
    }
  );
}
export {
  l as KoiStudies
};
