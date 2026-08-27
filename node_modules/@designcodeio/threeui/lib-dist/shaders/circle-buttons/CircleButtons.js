import { jsxs as r, jsx as t } from "react/jsx-runtime";
/* empty css                   */
const e = {
  variant: "play",
  mode: "dark",
  hue: 0,
  saturation: 1,
  brightness: 1
}, f = {
  play: "Play",
  plus: "Add",
  mail: "Send mail"
};
function s(a, n, c) {
  return Math.min(c, Math.max(n, a));
}
function v({ variant: a }) {
  return a === "play" ? /* @__PURE__ */ t("svg", { viewBox: "0 0 32 32", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { d: "M11.75 8.7c0-1.28 1.4-2.08 2.5-1.43l12 7.3a1.66 1.66 0 0 1 0 2.86l-12 7.3a1.66 1.66 0 0 1-2.5-1.43V8.7Z" }) }) : a === "plus" ? /* @__PURE__ */ t("svg", { viewBox: "0 0 32 32", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { d: "M16 7v18M7 16h18" }) }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 32 32", "aria-hidden": "true", children: [
    /* @__PURE__ */ t("rect", { x: "5.25", y: "7.5", width: "21.5", height: "17", rx: "3.25" }),
    /* @__PURE__ */ t("path", { d: "m7.25 10 7.35 5.72a2.26 2.26 0 0 0 2.8 0L24.75 10" })
  ] });
}
function N({
  variant: a = e.variant,
  mode: n = e.mode,
  hue: c = e.hue,
  saturation: u = e.saturation,
  brightness: o = e.brightness,
  ariaLabel: h,
  disabled: b = !1,
  type: m = "button",
  onClick: p,
  className: l,
  style: _
}) {
  const i = a === "plus" || a === "mail" ? a : "play", d = n === "light" ? "light" : "dark", g = {
    "--circle-button-hue": `${s(c, -180, 180)}deg`,
    "--circle-button-saturation": s(u, 0, 2),
    "--circle-button-brightness": s(o, 0.35, 1.65),
    ..._
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: `circle-buttons circle-buttons--${i} circle-buttons--${d}${l ? ` ${l}` : ""}`,
      "data-mode": d,
      "data-variant": i,
      style: g,
      children: [
        /* @__PURE__ */ t("div", { className: "circle-buttons__atmosphere", "aria-hidden": "true" }),
        /* @__PURE__ */ r(
          "button",
          {
            className: "circle-button",
            type: m,
            "aria-label": h ?? f[i],
            disabled: b,
            onClick: p,
            children: [
              /* @__PURE__ */ t("span", { className: "circle-button__aura", "aria-hidden": "true" }),
              /* @__PURE__ */ t("span", { className: "circle-button__rim", "aria-hidden": "true" }),
              /* @__PURE__ */ t("span", { className: "circle-button__face", "aria-hidden": "true" }),
              /* @__PURE__ */ r("span", { className: "circle-button__details", "aria-hidden": "true", children: [
                /* @__PURE__ */ t("i", {}),
                /* @__PURE__ */ t("i", {}),
                /* @__PURE__ */ t("i", {}),
                /* @__PURE__ */ t("i", {}),
                /* @__PURE__ */ t("b", {}),
                /* @__PURE__ */ t("b", {}),
                /* @__PURE__ */ t("b", {}),
                /* @__PURE__ */ t("b", {})
              ] }),
              /* @__PURE__ */ t("span", { className: "circle-button__icon", children: /* @__PURE__ */ t(v, { variant: i }) })
            ]
          }
        )
      ]
    }
  );
}
export {
  e as CIRCLE_BUTTON_DEFAULTS,
  N as CircleButtons
};
