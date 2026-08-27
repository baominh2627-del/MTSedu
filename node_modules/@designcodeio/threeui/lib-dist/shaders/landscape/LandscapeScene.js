import { jsx as c } from "react/jsx-runtime";
import { useState as u, useMemo as w, useEffect as f } from "react";
const m = {
  sunrise: { time: "morning", weather: "clear", label: "sunrise" },
  noon: { time: "noon", weather: "clear", label: "noon" },
  sunset: { time: "sunset", weather: "clear", label: "sunset" },
  night: { time: "night", weather: "clear", label: "night" },
  rain: { time: "noon", weather: "rain", label: "rain" },
  storm: { time: "sunset", weather: "storm", label: "storm" },
  snow: { time: "noon", weather: "snow", label: "snow" }
};
function $({
  className: s = "",
  sourceUrl: a = "/landscape.html",
  variant: e = "sunrise"
}) {
  const [n, o] = u(!1), r = w(() => {
    const l = m[e], t = a.indexOf("#"), i = t >= 0 ? a.slice(0, t) : a, d = t >= 0 ? a.slice(t) : "", h = i.includes("?") ? "&" : "?";
    return `${i}${h}variant=${e}&time=${l.time}&weather=${l.weather}${d}`;
  }, [a, e]);
  return f(() => o(!1), [r]), /* @__PURE__ */ c(
    "div",
    {
      className: `landscape-scene${s ? ` ${s}` : ""}`,
      "data-state": n ? "ready" : "loading",
      "data-variant": e,
      children: /* @__PURE__ */ c(
        "iframe",
        {
          className: `landscape-scene__frame${n ? " is-ready" : ""}`,
          title: `Procedural landscape at ${m[e].label}`,
          src: r,
          sandbox: "allow-scripts",
          loading: "eager",
          onLoad: () => o(!0)
        },
        e
      )
    }
  );
}
export {
  $ as LandscapeScene
};
