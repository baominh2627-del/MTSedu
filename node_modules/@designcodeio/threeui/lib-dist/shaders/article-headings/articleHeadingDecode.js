const h = "#%&@$/\\<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789", A = (i, n, o) => Math.max(n, Math.min(o, i)), O = (i) => 1 - Math.pow(1 - i, 2);
function F(i, n) {
  const o = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Map(), N = window.matchMedia("(prefers-reduced-motion: reduce)").matches, D = (d, s) => {
    if (N) return;
    const m = [], M = (a) => {
      for (const t of a.childNodes)
        if (t.nodeType === Node.TEXT_NODE && t.textContent?.trim()) {
          const r = t, e = r.textContent ?? "";
          E.set(r, e), m.push({ node: r, original: e });
        } else t.nodeType === Node.ELEMENT_NODE && M(t);
    };
    M(d);
    const T = m.reduce((a, t) => a + t.original.length, 0), x = performance.now() + s, g = (a) => {
      const t = A((a - x) / Math.max(1, n.duration), 0, 1);
      if (a < x) {
        const e = requestAnimationFrame(g);
        o.add(e);
        return;
      }
      let r = Math.floor(O(t) * T);
      for (const e of m) {
        const f = e.original.length, c = A(r, 0, f);
        if (r -= c, c >= f) {
          e.node.textContent = e.original;
          continue;
        }
        let u = e.original.slice(0, c);
        const C = Math.min(f - c, Math.round(n.scrambleLength));
        for (let l = 0; l < C; l += 1) {
          const p = e.original[c + l];
          u += p === " " || Math.random() < n.preserveChance ? p : h[Math.random() * h.length | 0];
        }
        u += e.original.slice(c + C).replace(/\S/g, (l) => Math.random() < n.tailChance ? h[Math.random() * h.length | 0] : l), e.node.textContent = u;
      }
      if (t < 1) {
        const e = requestAnimationFrame(g);
        o.add(e);
      }
    }, w = requestAnimationFrame(g);
    o.add(w);
  };
  return i.querySelectorAll("[data-article-heading]").forEach((d, s) => {
    D(d, s * n.stagger);
  }), () => {
    o.forEach(cancelAnimationFrame), E.forEach((d, s) => {
      s.textContent = d;
    });
  };
}
export {
  h as ARTICLE_HEADING_DECODE_POOL,
  F as startArticleHeadingDecode
};
