import { jsx as u, jsxs as _ } from "react/jsx-runtime";
/* empty css              */
const t = {
  variant: "primary",
  mode: "dark",
  label: "Get your card",
  ring: !0,
  hue: 0,
  saturation: 1,
  brightness: 1
};
function r(a, n, e) {
  return Math.min(e, Math.max(n, a));
}
function $({
  variant: a = t.variant,
  mode: n = t.mode,
  label: e = t.label,
  ring: o = t.ring,
  hue: l = t.hue,
  saturation: m = t.saturation,
  brightness: c = t.brightness,
  disabled: h = !1,
  type: d = "button",
  onClick: g,
  className: i = "",
  style: b
}) {
  const s = a === "ghost" ? "ghost" : "primary";
  return /* @__PURE__ */ u(
    "div",
    {
      className: `lumen-cta lumen-cta--${n === "light" ? "light" : "dark"}${i ? ` ${i}` : ""}`,
      "data-variant": s,
      style: {
        "--lumen-cta-hue": `${r(l, -180, 180)}deg`,
        "--lumen-cta-saturation": r(m, 0, 2),
        "--lumen-cta-brightness": r(c, 0.35, 1.65),
        ...b
      },
      children: /* @__PURE__ */ _(
        "button",
        {
          className: `lumen-cta__button${s === "ghost" ? " lumen-cta__button--ghost" : ""}`,
          type: d,
          disabled: h,
          onClick: g,
          children: [
            e,
            o ? /* @__PURE__ */ u("i", { className: "lumen-cta__ring", "aria-hidden": "true" }) : null
          ]
        }
      )
    }
  );
}
export {
  t as LUMEN_CTA_DEFAULTS,
  $ as LumenCta
};
