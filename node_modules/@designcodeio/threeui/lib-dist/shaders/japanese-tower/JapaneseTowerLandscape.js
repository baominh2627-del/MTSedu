import { jsx as r } from "react/jsx-runtime";
import { useState as c, useMemo as m, useEffect as l } from "react";
const h = {
  japan: "Japanese tenshu",
  china: "Chinese pagoda",
  vietnam: "Vietnamese tháp",
  thailand: "Thai prang",
  cambodia: "Khmer prasat",
  turkey: "Ottoman mosque"
};
function u({
  className: n = "",
  sourceUrl: a = "/japanese-tower.html",
  country: e = "japan"
}) {
  const [t, i] = c(!1), o = m(() => {
    const s = a.indexOf("#"), d = s >= 0 ? a.slice(0, s) : a, p = s >= 0 ? a.slice(s) : "";
    return `${d}${d.includes("?") ? "&" : "?"}country=${e}${p}`;
  }, [e, a]);
  return l(() => i(!1), [o]), /* @__PURE__ */ r(
    "div",
    {
      className: `japanese-tower-landscape${n ? ` ${n}` : ""}`,
      "data-state": t ? "ready" : "loading",
      children: /* @__PURE__ */ r(
        "iframe",
        {
          className: `japanese-tower-landscape__frame${t ? " is-ready" : ""}`,
          title: `${h[e]} in a procedural landscape`,
          src: o,
          sandbox: "allow-scripts",
          loading: "eager",
          onLoad: () => i(!0)
        },
        e
      )
    }
  );
}
export {
  u as JapaneseTowerLandscape
};
