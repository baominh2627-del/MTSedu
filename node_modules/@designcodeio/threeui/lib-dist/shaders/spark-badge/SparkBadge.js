import { jsx as c } from "react/jsx-runtime";
import { useRef as u, useState as l, useEffect as f } from "react";
function y({ className: r = "", sourceUrl: m = "/spark-badge.html" }) {
  const n = u(null), s = u(!0), [e, g] = l(!0), [a, i] = l(!1);
  return f(() => {
    const o = n.current;
    if (!o) return;
    const t = () => g(s.current && document.visibilityState !== "hidden"), d = new IntersectionObserver(([b]) => {
      s.current = b.isIntersecting, t();
    }, { rootMargin: "80px" });
    return d.observe(o), document.addEventListener("visibilitychange", t), () => {
      d.disconnect(), document.removeEventListener("visibilitychange", t);
    };
  }, []), f(() => {
    e || i(!1);
  }, [e]), /* @__PURE__ */ c("div", { ref: n, className: `spark-badge${r ? ` ${r}` : ""}`, "data-state": e ? a ? "ready" : "loading" : "paused", "data-variant": "badge", children: e ? /* @__PURE__ */ c("iframe", { className: `spark-badge__frame${a ? " is-ready" : ""}`, title: "Animated credential badge in rain", src: m, sandbox: "allow-scripts", loading: "eager", onLoad: () => i(!0) }) : null });
}
export {
  y as SparkBadge
};
