import { useMemo as z } from "react";
const M = (t) => Math.min(1, Math.max(0, t));
function L(t, n) {
  if (typeof t != "string") return n;
  const e = t.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!e) return n;
  const o = e[1].toLowerCase();
  return `#${o.length === 3 ? o.replace(/./g, (r) => r + r) : o}`;
}
function $(t) {
  const [n, e, o] = [1, 3, 5].map((l) => Number.parseInt(t.slice(l, l + 2), 16) / 255), r = Math.max(n, e, o), s = Math.min(n, e, o), h = (r + s) / 2, i = r - s;
  if (i === 0) return { h: 0, s: 0, l: h };
  const g = i / (1 - Math.abs(2 * h - 1));
  return { h: ((r === n ? (e - o) / i % 6 : r === e ? (o - n) / i + 2 : (n - e) / i + 4) * 60 + 360) % 360, s: g, l: h };
}
function B({ h: t, s: n, l: e }) {
  const o = (1 - Math.abs(2 * e - 1)) * n, r = o * (1 - Math.abs(t / 60 % 2 - 1)), s = e - o / 2, [h, i, g] = t < 60 ? [o, r, 0] : t < 120 ? [r, o, 0] : t < 180 ? [0, o, r] : t < 240 ? [0, r, o] : t < 300 ? [r, 0, o] : [o, 0, r];
  return [h + s, i + s, g + s].map((d) => Math.round(M(d) * 255));
}
function D(t) {
  return `#${B(t).map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}
function H(t, n) {
  const e = $(t), o = $(n);
  return {
    hue: o.h - e.h,
    saturation: e.s > 0.01 ? Math.min(3, o.s / e.s) : 1,
    lightness: e.l > 0.01 ? Math.min(3, o.l / e.l) : 1
  };
}
function T(t, n) {
  return n.find((e) => e.value === t) ?? n[0];
}
function E(t, n, e) {
  return n.includes(t) ? t : e;
}
function b(t, [n, e, o]) {
  return Number.isFinite(t) ? Math.min(o, Math.max(n, t)) : e;
}
function P(t) {
  const n = [...new Set(t.map((e) => e.google).filter((e) => !!e))];
  if (n.length)
    return `https://fonts.googleapis.com/css2?${n.map((e) => `family=${e}`).join("&")}&display=swap`;
}
function R(t) {
  const { headingFont: n, bodyFont: e, headingWeight: o, bodyWeight: r, primaryColor: s, headingSize: h, bodySize: i, headingLetterSpacing: g, ...d } = t;
  return [{
    headingFont: n,
    bodyFont: e,
    headingWeight: o,
    bodyWeight: r,
    primaryColor: s,
    headingSize: h,
    bodySize: i,
    headingLetterSpacing: g
  }, d];
}
function _(t, n) {
  const { headingFont: e, bodyFont: o, headingWeight: r, bodyWeight: s, primaryColor: h, headingSize: i, bodySize: g, headingLetterSpacing: d } = n;
  return z(() => {
    const l = T(e, t.headingFonts), x = T(o, t.bodyFonts), f = L(h, t.primaryColor), m = f === t.primaryColor, y = H(t.primaryColor, f), p = (c) => {
      if (m) return c;
      const a = $(L(c, c));
      return D({
        h: (a.h + y.hue + 360) % 360,
        s: M(a.s * y.saturation),
        l: M(a.l * y.lightness)
      });
    }, j = (c) => {
      if (m) return c;
      const a = c.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i);
      if (!a) return c;
      const v = `#${[a[1], a[2], a[3]].map((u) => Math.round(Number(u)).toString(16).padStart(2, "0")).join("")}`, [W, C, I] = [1, 3, 5].map((u) => Number.parseInt(p(v).slice(u, u + 2), 16));
      return a[4] === void 0 ? `rgb(${W}, ${C}, ${I})` : `rgba(${W}, ${C}, ${I}, ${a[4]})`;
    }, k = (c = t.primaryColor) => {
      if (m) return "none";
      const a = H(c, p(c));
      return [
        `hue-rotate(${a.hue.toFixed(2)}deg)`,
        `saturate(${Math.max(0, a.saturation).toFixed(3)})`,
        `brightness(${Math.min(2, Math.max(0.2, a.lightness)).toFixed(3)})`
      ].join(" ");
    }, F = {
      heading: l.stack,
      body: x.stack,
      headingWeight: E(r, t.headingWeights, t.headingWeight),
      bodyWeight: E(s, t.bodyWeights, t.bodyWeight),
      primary: f,
      headingSize: b(i, t.headingSize),
      bodySize: b(g, t.bodySize),
      headingLetterSpacing: b(d, t.headingLetterSpacing),
      retone: p,
      retoneRgba: j,
      filter: k
    };
    return { css: t.css(F), fontHref: P([l, x]), inlineStyles: t.inlineStyles?.(F) };
  }, [t, e, o, r, s, h, i, g, d]);
}
const S = "threeui-page-typography", N = "threeui-page-typography-fonts";
function A(t, n) {
  const e = t?.contentDocument;
  if (!e?.head) return;
  const o = e.getElementById(N);
  if (n?.fontHref) {
    const s = o ?? e.createElement("link");
    s.id = N, s.rel = "stylesheet", s.getAttribute("href") !== n.fontHref && (s.href = n.fontHref), o || e.head.append(s);
  } else
    o?.remove();
  if (!n?.css) {
    e.getElementById(S)?.remove();
    return;
  }
  const r = e.getElementById(S) ?? e.createElement("style");
  r.id = S, r.textContent !== n.css && (r.textContent = n.css), e.head.append(r);
  for (const s of n.inlineStyles ?? [])
    for (const h of e.querySelectorAll(s.selector))
      for (const [i, g] of Object.entries(s.styles)) h.style.setProperty(i, g);
}
export {
  A as applyPageCustomization,
  R as splitTypographyProps,
  _ as usePageTypography
};
