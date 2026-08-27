import { jsx as r } from "react/jsx-runtime";
import { useState as s, useMemo as i } from "react";
import { createSketchbookDocument as n } from "./sketchbookDocument.js";
function u({
  assetBaseUrl: o = "/sketchbook/",
  className: e = ""
}) {
  const [t, a] = s(!1), c = i(() => n(o), [o]);
  return /* @__PURE__ */ r("div", { className: `sketchbook${e ? ` ${e}` : ""}`, "data-state": t ? "ready" : "loading", children: /* @__PURE__ */ r(
    "iframe",
    {
      className: `sketchbook__frame${t ? " is-ready" : ""}`,
      title: "Interactive Singapore sketchbook",
      srcDoc: c,
      sandbox: "allow-scripts",
      loading: "eager",
      onLoad: () => a(!0)
    }
  ) });
}
export {
  u as Sketchbook
};
