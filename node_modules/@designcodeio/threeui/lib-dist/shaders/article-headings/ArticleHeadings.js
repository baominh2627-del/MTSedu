import { jsxs as a, jsx as e } from "react/jsx-runtime";
import { useRef as l, useEffect as h } from "react";
import { startArticleHeadingDecode as m } from "./articleHeadingDecode.js";
const s = {
  mode: "dark",
  duration: 560,
  stagger: 140,
  scrambleLength: 10,
  preserveChance: 0.3,
  tailChance: 0.18
};
function u({ mode: o = s.mode, className: t = "", ...d }) {
  const r = l(null), i = o === "light" ? "light" : "dark", n = { ...s, ...d };
  return h(() => {
    const c = r.current;
    if (c)
      return m(c, n);
  }, [n.duration, n.preserveChance, n.scrambleLength, n.stagger, n.tailChance]), /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      className: `article-headings-component article-headings-component--${i}${t ? ` ${t}` : ""}`,
      "data-mode": i,
      children: [
        /* @__PURE__ */ a("div", { className: "article-headings-component__header", children: [
          /* @__PURE__ */ e("span", { children: "FIELD NOTES" }),
          /* @__PURE__ */ e("span", { children: "02 ENTRIES" })
        ] }),
        /* @__PURE__ */ a("article", { className: "article-headings-component__entry", children: [
          /* @__PURE__ */ e("span", { className: "article-headings-component__index", children: "01" }),
          /* @__PURE__ */ e("h2", { "data-article-heading": !0, children: "Context Is Infrastructure, Not a Prompt" }),
          /* @__PURE__ */ e("span", { className: "article-headings-component__meta", children: "SYSTEMS NOTE · 8 MIN" })
        ] }),
        /* @__PURE__ */ a("article", { className: "article-headings-component__entry", children: [
          /* @__PURE__ */ e("span", { className: "article-headings-component__index", children: "02" }),
          /* @__PURE__ */ e("h2", { "data-article-heading": !0, children: "The Last Mile Is Verification" }),
          /* @__PURE__ */ e("span", { className: "article-headings-component__meta", children: "FIELD GUIDE · 11 MIN" })
        ] })
      ]
    }
  );
}
export {
  s as ARTICLE_HEADINGS_DEFAULTS,
  u as ArticleHeadings
};
