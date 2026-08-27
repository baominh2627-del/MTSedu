import { jsx as o } from "react/jsx-runtime";
import { useState as a } from "react";
import d from "./uplink-loader.html.js";
function p({ className: e = "", style: r }) {
  const [t, i] = a(!1);
  return /* @__PURE__ */ o(
    "div",
    {
      className: `uplink-loader${e ? ` ${e}` : ""}`,
      "data-state": t ? "ready" : "loading",
      style: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#030806",
        ...r
      },
      children: /* @__PURE__ */ o(
        "iframe",
        {
          title: "SYS.LINK uplink progress loader",
          srcDoc: d,
          sandbox: "allow-scripts",
          loading: "eager",
          onLoad: () => i(!0),
          style: {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#030806"
          }
        }
      )
    }
  );
}
export {
  p as UplinkLoader
};
