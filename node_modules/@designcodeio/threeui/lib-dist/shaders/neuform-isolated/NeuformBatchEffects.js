import { jsx as $ } from "react/jsx-runtime";
import { useRef as J, useMemo as X, useEffect as D, useState as K } from "react";
import Q from "./sources/constellation-field.html.js";
import Z from "./sources/particle-drift.html.js";
import ee from "./sources/particle-network.html.js";
import te from "./sources/flux-vortex.html.js";
import re from "./sources/portal-field.html.js";
import oe from "./sources/flow-field.html.js";
import ae from "./sources/amber-halftone.html.js";
import F from "./sources/diagnostics-panel.html.js";
import ie from "./sources/signal-particles.html.js";
import ne from "./sources/skeuomorphic-toggle.html.js";
import le from "./sources/matrix-field.html.js";
import ce from "./sources/gateway-flow.html.js";
import se from "./sources/connectivity-graph.html.js";
import pe from "./sources/interface-lines.html.js";
import de from "./sources/wireframe-forms.html.js";
import ue from "./sources/defense-lines.html.js";
import me from "./sources/override-grid.html.js";
import ge from "./sources/topo-field.html.js";
const p = {
  mode: "dark",
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1
}, d = "#eef1f6";
function m(e, t, r) {
  return Math.min(r, Math.max(t, e));
}
function s(e, t, r = 1) {
  return Math.max(r, Math.round(e * t));
}
function he(e) {
  return e === "cylinders" || e === "sphere" ? e : "cube";
}
function g(e, t = 3) {
  const r = Number(e).toFixed(t);
  return r.includes(".") ? r : `${r}.0`;
}
function fe(e, t = "dark") {
  return e == null ? t : e === "light" || e === 1 || e === "1" ? "light" : "dark";
}
function P() {
  if (typeof document > "u" || typeof window > "u") return "dark";
  const e = document.documentElement, t = e.dataset.scheme ?? e.dataset.theme;
  return t === "light" || t === "dark" ? t : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function we(e) {
  const [t, r] = K(P);
  return D(() => {
    if (!e || typeof document > "u" || typeof window > "u") return;
    const o = document.documentElement, i = window.matchMedia("(prefers-color-scheme: dark)"), a = () => r(P()), n = new MutationObserver(a);
    return n.observe(o, { attributes: !0, attributeFilter: ["data-scheme", "data-theme"] }), i.addEventListener("change", a), a(), () => {
      n.disconnect(), i.removeEventListener("change", a);
    };
  }, [e]), t;
}
function z(e, t) {
  return typeof e == "function" ? e(t) : e;
}
const O = `
[data-threeui-role="ui"].flex-grow {
  flex: none !important;
  width: min(calc(100% - 32px), var(--threeui-target-width, 360px)) !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: calc(100% - 32px) !important;
  aspect-ratio: 1 / 1 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
[data-threeui-role="ui"] > canvas {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
`;
function C(e, { mode: t }) {
  let r = e.replaceAll(
    "time += 0.015;",
    "time += 0.015 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);"
  );
  return t === "light" && (r = r.replaceAll("ctx.fillStyle = '#020804';", `ctx.fillStyle = '${d}';`).replaceAll("rgba(52,211,153,", "rgba(4,120,87,")), r;
}
const l = {
  constellationField: {
    title: "Constellation Field",
    source: Q,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#070914",
    targets: [{ selector: "#constellationCanvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, strokeWidth: i, mode: a }) {
      let n = e.replace("const LINK = 160;", `const LINK = ${Math.round(160 * r)};`).replace(
        "const MAX_NODES = window.innerWidth < 768 ? 40 : 85;",
        `const MAX_NODES = window.innerWidth < 768 ? ${s(40, o, 8)} : ${s(85, o, 12)};`
      ).replace(
        "radius: Math.random() * 2.4 + 1.8",
        `radius: (Math.random() * 2.4 + 1.8) * ${t}`
      ).replace("ctx.lineWidth = 1;", `ctx.lineWidth = ${Number(Math.max(0.25, i).toFixed(2))};`).replace("node.x += node.vx;", "node.x += node.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("node.y += node.vy;", "node.y += node.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
      return a === "light" && (n = n.replace("ctx.strokeStyle = '#E6C879';", "ctx.strokeStyle = '#8B6914';").replace("ctx.fillStyle = '#E6C879';", "ctx.fillStyle = '#8B6914';")), n;
    }
  },
  particleDrift: {
    title: "Particle Drift",
    source: Z,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#030509",
    targets: [{ selector: "#particle-canvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      const a = Math.round(120 * r), n = i === "light" ? 0.22 : 0.15;
      let u = e.replace("Array.from({ length: 90 })", `Array.from({ length: ${s(90, o, 12)} })`).replace("Array.from({ length: 25 })", `Array.from({ length: ${s(25, o, 4)} })`).replace("length: Math.random() * 100 + 50,", `length: (Math.random() * 100 + 50) * ${r},`).replace("n.y += n.vy; // Slow drift", "n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift").replace("b.y -= b.speed;", "b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("if(d < 120) {", `if(d < ${a}) {`).replace("0.15 * (1 - d/120)", `${n} * (1 - d/${a})`).replace("ctx.lineWidth = 1.5;", `ctx.lineWidth = ${Number((1.5 * t).toFixed(2))};`);
      return i === "light" && (u = u.replaceAll("rgba(96, 165, 250,", "rgba(37, 99, 235,").replaceAll("rgba(156, 163, 175,", "rgba(36, 48, 68,").replace("ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(36, 48, 68, 0.4)';", "ctx.fillStyle = dist < 180 ? '#2563EB' : 'rgba(36, 48, 68, 0.55)';")), u;
    }
  },
  particleNetwork: {
    title: "Particle Network",
    source: ee,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#05070d",
    targets: [{ selector: "#particle-canvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      let a = e.replace("const particleCount = 200;", `const particleCount = ${s(200, o, 40)};`).replace("this.length = Math.random() * 2 + 0.5;", `this.length = (Math.random() * 2 + 0.5) * ${r};`).replace("this.z -= this.speed;", "this.z -= this.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("const fov = 300;", `const fov = ${Math.round(300 / Math.max(0.4, t))};`);
      return i === "light" && (a = a.replace("ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';", "ctx.fillStyle = 'rgba(238, 241, 246, 0.55)';").replace(
        "const hue = Math.random() > 0.5 ? '200, 220, 255' : '106, 157, 237';",
        "const hue = Math.random() > 0.5 ? '36, 48, 68' : '37, 99, 235';"
      )), a;
    }
  },
  fluxVortex: {
    title: "Flux Vortex",
    source: te,
    background: "#050505",
    targets: [{ selector: "#webgl-canvas", role: "background" }],
    patch(e, { size: t, density: r }) {
      return e.replace("const vortexCount = 9500;", `const vortexCount = ${s(9500, r, 1200)};`).replace("const particlesCount = 300;", `const particlesCount = ${s(300, r, 40)};`).replace("size: 0.006, // Smaller dots requested", `size: ${Number((6e-3 * t).toFixed(4))}, // Smaller dots requested`).replace("size: 0.008,", `size: ${Number((8e-3 * t).toFixed(4))},`);
    }
  },
  portalField: {
    title: "Portal Field",
    source: re,
    background: "#05060a",
    targets: [{ selector: "#webgl-container", role: "background" }],
    patch(e, { size: t, length: r }) {
      return e.replace(
        "float d1 = sdArc(st, center, 0.6, 0.02, 0.15);",
        `float d1 = sdArc(st, center, ${g(0.6 * r, 3)}, ${g(0.02 * t, 4)}, 0.15);`
      ).replace(
        "float d2 = sdArc(st, center, 0.65, 0.06, 0.2);",
        `float d2 = sdArc(st, center, ${g(0.65 * r, 3)}, ${g(0.06 * t, 4)}, 0.2);`
      );
    }
  },
  flowField: {
    title: "Flow Field",
    source: oe,
    background: "#0a0a0a",
    targets: [{ selector: "#canvas", role: "background" }],
    patch(e, { size: t, length: r, density: o }) {
      return e.replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^>]*><\/script>/, "").replace("const PARTICLE_COUNT = 2500;", `const PARTICLE_COUNT = ${s(2500, o, 300)};`).replace("let NOISE_SCALE = 0.0025;", `let NOISE_SCALE = ${Number((25e-4 / r).toFixed(6))};`).replace("time += 0.0008;", "time += 0.0008 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);").replace(
        "let vx = Math.cos(angle) * p.speed * SPEED;",
        "let vx = Math.cos(angle) * p.speed * SPEED * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);"
      ).replace(
        "let vy = Math.sin(angle) * p.speed * SPEED;",
        "let vy = Math.sin(angle) * p.speed * SPEED * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);"
      ).replace("ctx.lineWidth = p.size;", `ctx.lineWidth = p.size * ${Number(t.toFixed(3))};`);
    }
  },
  amberHalftone: {
    title: "Amber Halftone",
    source: ae,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#0A0A0A",
    targets: [{ selector: "#webgl-halftone", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      const a = Number((0.085 / Math.max(0.25, o)).toFixed(4)), n = Math.max(12, Math.ceil(2.8 / a)), u = Number((9 * t).toFixed(2)), f = Number((6 * r).toFixed(2));
      let h = e.replace("const gridSize = 20;", `const gridSize = ${n};`).replace("positions.push(x * 0.15, y * 0.15, 0);", `positions.push(x * ${a}, y * ${a}, 0);`).replace(
        "float animatedScale = scale * (sin(dist * 6.0 - time * 2.5) * 0.5 + 0.5);",
        `float animatedScale = scale * (sin(dist * ${g(f, 2)} - time * 2.5) * 0.5 + 0.5);`
      ).replace("gl_PointSize = animatedScale * 5.0;", `gl_PointSize = animatedScale * ${g(u, 2)};`).replace(
        "material.uniforms.time.value = clock.getElapsedTime();",
        "material.uniforms.time.value = clock.getElapsedTime() * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);"
      );
      return i === "light" && (h = h.replace("renderer.setClearColor(0x0A0A0A, 1);", "renderer.setClearColor(0xeef1f6, 1);").replace("color1: { value: new THREE.Color(0xFBBF24) },", "color1: { value: new THREE.Color(0xB45309) },").replace("color2: { value: new THREE.Color(0xFFFFFF) }", "color2: { value: new THREE.Color(0x1a1f2a) }")), h;
    }
  },
  diagnosticsLayers: {
    title: "Layered Planes",
    source: F,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#020804",
    targets: [{ selector: "#main-container article:nth-of-type(1) .flex-grow", role: "ui", width: "360px" }],
    focusCss: O,
    patch: C
  },
  diagnosticsNodes: {
    title: "Node Cubes",
    source: F,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#020804",
    targets: [{ selector: "#main-container article:nth-of-type(2) .flex-grow", role: "ui", width: "360px" }],
    focusCss: O,
    patch: C
  },
  diagnosticsFlow: {
    title: "Flowing Mesh",
    source: F,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#020804",
    targets: [{ selector: "#main-container article:nth-of-type(3) .flex-grow", role: "ui", width: "360px" }],
    focusCss: O,
    patch: C
  },
  signalParticles: {
    title: "Signal Particles",
    source: ie,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#0a0a0a",
    targets: [{ selector: "#particle-canvas", role: "background" }],
    patch(e, { size: t, length: r, mode: o }) {
      let i = e.replace("const spacing = 16;", `const spacing = ${Math.max(6, Math.round(16 / Math.max(0.35, r)))};`).replace("const dotRadius = 1.5;", `const dotRadius = ${Number((1.5 * t).toFixed(2))};`).replace("time += 0.02;", "time += 0.02 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
      return o === "light" && (i = i.replace("ctx.fillStyle = '#3b82f6'; // Blue highlight", "ctx.fillStyle = '#1d4ed8'; // Blue highlight").replace("ctx.fillStyle = '#8b5cf6'; // Purple highlight", "ctx.fillStyle = '#5b21b6'; // Purple highlight").replace("ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;", "ctx.fillStyle = `rgba(36, 48, 68, ${alpha})`;")), i;
    }
  },
  skeuomorphicToggle: {
    title: "Skeuomorphic Toggle",
    source: ne,
    supportsMode: !0,
    defaultMode: "auto",
    background: (e) => e === "light" ? "#f8fafc" : "#0b1220",
    targets: [{ selector: "#skeuomorphic-toggle", role: "ui", width: "192px" }],
    focusCss: `
#skeuomorphic-toggle {
  width: 12rem !important;
  height: 4rem !important;
  margin: auto !important;
  overflow: visible !important;
  max-height: none !important;
}
`,
    patch(e, { mode: t }) {
      return t !== "dark" ? e : e.replace(
        "var ON_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%)';",
        "var ON_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.035) 2px, rgba(255,255,255,0.035) 4px), linear-gradient(180deg, #1e3a8a 0%, #172554 100%)';"
      ).replace(
        "var OFF_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)';",
        "var OFF_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px), linear-gradient(180deg, #1e293b 0%, #0f172a 100%)';"
      ).replace(
        "var ON_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.7), 0 0 0 6px rgba(239, 246, 255, 0.8), 0 0 25px 5px rgba(96, 165, 250, 0.4)';",
        "var ON_SHADOW = 'inset 0 5px 10px rgba(0,0,0,0.52), inset 0 -2px 4px rgba(147,197,253,0.24), 0 0 0 6px rgba(15,23,42,0.96), 0 0 26px 5px rgba(59,130,246,0.42)';"
      ).replace(
        "var OFF_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(255,255,255,0.55), 0 0 0 6px rgba(241, 245, 249, 0.9), 0 0 18px 2px rgba(148, 163, 184, 0.25)';",
        "var OFF_SHADOW = 'inset 0 5px 10px rgba(0,0,0,0.56), inset 0 -2px 4px rgba(148,163,184,0.12), 0 0 0 6px rgba(15,23,42,0.96), 0 0 18px 2px rgba(30,64,175,0.2)';"
      ).replace("var ON_BORDER = '#60a5fa';", "var ON_BORDER = '#3b82f6';").replace("var OFF_BORDER = '#94a3b8';", "var OFF_BORDER = '#334155';").replace(
        "background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%);",
        "background: linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%);"
      ).replace("border: 1px solid #e0edfa;", "border: 1px solid #64748b;");
    }
  },
  matrixField: {
    title: "Matrix Field",
    source: le,
    background: "#000000",
    targets: [{ selector: "#glcanvas", role: "background" }],
    patch(e, { size: t, length: r }) {
      return e.replace(
        "float intensity = 0.006;",
        `float intensity = ${g(6e-3 * t * r, 5)};`
      );
    }
  },
  gatewayFlow: {
    title: "Gateway Flow",
    source: ce,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#000000",
    targets: [{ selector: "#flow-canvas", role: "background" }],
    patch(e, { size: t, density: r, mode: o }) {
      let i = e.replace("const numPaths = 80;", `const numPaths = ${s(80, r, 12)};`).replace("p.t += p.speed;", "p.t += p.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("ctx.lineWidth = 1.2;", `ctx.lineWidth = ${Number((1.2 * t).toFixed(2))};`);
      return o === "light" && (i = i.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';", "ctx.strokeStyle = 'rgba(26, 31, 42, 0.4)';").replace("ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;", "ctx.fillStyle = `rgba(26, 31, 42, 0.75)`;")), i;
    }
  },
  connectivityGraph: {
    title: "Connectivity Graph",
    source: se,
    supportsMode: !0,
    defaultMode: "light",
    background: (e) => e === "light" ? "#c4d9ef" : "#0a1220",
    targets: [{ selector: "#networkCanvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      let a = e.replace(
        "const particleCount = window.innerWidth < 768 ? 150 : 400;",
        `const particleCount = window.innerWidth < 768 ? ${s(150, o, 30)} : ${s(400, o, 60)};`
      ).replace("this.maxLength = 20 + Math.random() * 180;", `this.maxLength = (20 + Math.random() * 180) * ${r};`).replace("this.distance += this.speed;", "this.distance += this.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("ctx.lineWidth = 0.5 + (distRatio * 2);", `ctx.lineWidth = (0.5 + (distRatio * 2)) * ${t};`);
      return i === "dark" && (a = a.replace("const lightness = 15 + (distRatio * 35);", "const lightness = 58 + (distRatio * 28);").replace(
        "const tailColor = `hsla(${hue}, 90%, ${Math.max(5, lightness - 15)}%, ${this.alpha * 0.05})`;",
        "const tailColor = `hsla(${hue}, 90%, ${Math.max(40, lightness - 15)}%, ${this.alpha * 0.08})`;"
      )), a;
    }
  },
  interfaceLines: {
    title: "Interface Lines",
    source: pe,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#050505",
    targets: [{ selector: "#bg-canvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      const a = Math.round(120 * r);
      let n = e.replace(
        "const numParticles = window.innerWidth < 640 ? 30 : 70;",
        `const numParticles = window.innerWidth < 640 ? ${s(30, o, 8)} : ${s(70, o, 12)};`
      ).replace("p.x += p.vx;", "p.x += p.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("p.y += p.vy;", "p.y += p.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("if (dist < 120)", `if (dist < ${a})`).replace("ctx.lineWidth = 1;", `ctx.lineWidth = ${Number((1 * t).toFixed(2))};`);
      return i === "light" ? n = n.replace(
        "ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / 120) * 0.42})`;",
        `ctx.strokeStyle = \`rgba(26, 31, 42, \${0.28 + (1 - dist / ${a}) * 0.42})\`;`
      ).replace("ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';", "ctx.fillStyle = 'rgba(26, 31, 42, 0.85)';") : n = n.replace(
        "ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / 120) * 0.42})`;",
        `ctx.strokeStyle = \`rgba(255, 255, 255, \${0.28 + (1 - dist / ${a}) * 0.42})\`;`
      ), n;
    }
  },
  wireframeForms: {
    title: "Wireframe Forms",
    source: de,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#050505",
    targets: [{ selector: "main", role: "ui", width: "1040px" }],
    focusCss: `
main {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: clamp(1rem, 3vw, 2.5rem) !important;
  height: auto !important;
  min-height: 0 !important;
  padding: 1.5rem !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  grid-template-columns: none !important;
}
main > .absolute { display: none !important; }
main > .group {
  height: auto !important;
  min-height: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
  background: transparent !important;
  flex: 0 0 auto !important;
  width: min(72vw, 480px) !important;
}
main > .group:not([data-wireframe-selected]) { display: none !important; }
main > .group > :not([data-wireframe-visual]) { display: none !important; }
main > .group > [data-wireframe-visual] {
  padding: 0 !important;
  flex-grow: 0 !important;
  width: 100% !important;
  aspect-ratio: 1 !important;
}
main > .group > [data-wireframe-visual] > :not(canvas) { display: none !important; }
#canvas1, #canvas2, #canvas3 {
  width: 100% !important;
  max-width: none !important;
  height: 100% !important;
  opacity: 1 !important;
  mix-blend-mode: normal !important;
}
`,
    patch(e, { variant: t, size: r, length: o, mode: i }) {
      const a = he(t), n = {
        cube: "<!-- Section 01: Hypercube -->",
        cylinders: "<!-- Section 02: Logic Cylinders -->",
        sphere: "<!-- Section 03: Esoteric Sphere -->"
      }[a];
      let u = e.replace(
        `${n}
        <div class="group`,
        `${n}
        <div data-wireframe-selected="${a}" class="group`
      ).replace("this.angleY += 0.005;", "this.angleY += 0.005 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("this.angleX += 0.002;", "this.angleX += 0.002 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("const s = 80;", `const s = ${Math.round(80 * o)};`).replace("const r = 70;", `const r = ${Math.round(70 * o)};`).replace("const s = 50; ", `const s = ${Math.round(50 * o)}; `).replace("this.ctx.lineWidth = 0.8;", `this.ctx.lineWidth = ${Number((0.8 * r).toFixed(2))};`);
      return i === "light" && (u = u.replace(
        "this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;",
        "this.ctx.strokeStyle = `rgba(26, 31, 42, ${alpha * 0.45})`;"
      ).replace(
        "this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;",
        "this.ctx.fillStyle = `rgba(26, 31, 42, ${alpha})`;"
      )), u;
    }
  },
  defenseLines: {
    title: "Defense Lines",
    source: ue,
    supportsMode: !0,
    background: (e) => e === "light" ? "#f4ecec" : "#120303",
    targets: [{ selector: "#bg-canvas", role: "background" }],
    patch(e, { size: t, length: r, density: o, mode: i }) {
      let a = e.replace(
        "const particleCount = window.innerWidth < 768 ? 40 : 100;",
        `const particleCount = window.innerWidth < 768 ? ${s(40, o, 8)} : ${s(100, o, 16)};`
      ).replace("baseLength: Math.random() * 80 + 20,", `baseLength: (Math.random() * 80 + 20) * ${r},`).replace(
        "p.y -= p.speedY * 1.5 * (1 + centerProximity * 0.5);",
        "p.y -= p.speedY * 1.5 * (1 + centerProximity * 0.5) * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);"
      ).replace("ctx.lineWidth = 0.5;", `ctx.lineWidth = ${Number((0.5 * t).toFixed(2))};`);
      return i === "light" && (a = a.replaceAll("rgba(220, 38, 38, 0)", "rgba(153, 27, 27, 0)").replace("grad.addColorStop(0.5, `rgba(255, ${38 + brightness}, ${38 + brightness}, ${currentOpacity})`);", "grad.addColorStop(0.5, `rgba(185, ${20 + brightness * 0.55}, ${20 + brightness * 0.55}, ${currentOpacity})`);")), a;
    }
  },
  overrideGrid: {
    title: "Override Grid",
    source: me,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#050505",
    targets: [{ selector: "#grid-canvas", role: "background" }],
    patch(e, { size: t, gap: r, mode: o }) {
      const i = Math.max(8, Math.round(t)), a = Math.max(0, Math.round(r));
      let n = e.replace("const blockSize = 48;", `const blockSize = ${i};`).replace("const blockGap = 2;", `const blockGap = ${a};`).replace("time += 0.04;", "time += 0.04 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
      return o === "light" && (n = n.replace(
        "ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;",
        "ctx.fillStyle = `rgba(194, 65, 12, ${alpha * 1.35})`;"
      )), n;
    }
  },
  topoField: {
    title: "Topo Field",
    source: ge,
    supportsMode: !0,
    background: (e) => e === "light" ? d : "#000000",
    targets: [{ selector: "#topo-canvas", role: "background" }],
    patch(e, { length: t, density: r, mode: o }) {
      let i = e.replace("float noiseScale = 1.4;", `float noiseScale = ${g(1.4 * t, 3)};`).replace("float numBands = 10.0;", `float numBands = ${g(10 * r, 2)};`);
      return o === "light" && (i = i.replace("gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;", "gridLines = clamp(gridLines, 0.0, 1.0) * 0.55;").replace(
        "float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;",
        "float topoLines = smoothstep(0.03, 0.00, triangleWave) * 0.95;"
      ).replace(
        `vec3 color = vec3(0.0);
                    color += vec3(1.0) * gridLines;
                    color += vec3(1.0) * topoLines;`,
        `vec3 paper = vec3(0.933, 0.945, 0.965);
                    vec3 ink = vec3(0.12, 0.14, 0.18);
                    float lines = clamp(gridLines + topoLines, 0.0, 1.0);
                    vec3 color = mix(paper, ink, lines);`
      )), i;
    }
  }
};
function xe(e, t) {
  const r = t.mode, o = z(e.background, r), i = JSON.stringify(e.targets).replace(/</g, "\\u003c"), a = JSON.stringify({
    mode: r,
    speed: t.speed,
    size: t.size,
    gap: t.gap,
    length: t.length,
    density: t.density,
    strokeWidth: t.strokeWidth,
    opacity: t.opacity
  }).replace(/</g, "\\u003c"), n = e.patch ? e.patch(e.source, {
    variant: t.variant,
    size: t.size,
    gap: t.gap,
    length: t.length,
    density: t.density,
    strokeWidth: t.strokeWidth,
    mode: r
  }) : e.source, u = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${o} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
${e.focusCss ?? ""}
</style>`, f = `<script data-threeui-controls>
(function () {
  var controls = ${a};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
<\/script>`, h = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${i};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
<\/script>`;
  return n.replace(/<head([^>]*)>/i, `<head$1>${f}${u}`).replace(/<\/body>/i, `${h}</body>`);
}
function G({
  definition: e,
  variant: t = "cube",
  mode: r,
  speed: o = p.speed,
  size: i = p.size,
  gap: a = p.gap,
  length: n = p.length,
  density: u = p.density,
  strokeWidth: f = p.strokeWidth,
  opacity: h = p.opacity,
  hue: B = p.hue,
  saturation: I = p.saturation,
  brightness: H = p.brightness,
  className: V,
  style: q
}) {
  const N = J(null), v = r ?? e.defaultMode ?? p.mode, Y = we(v === "auto"), w = v === "auto" ? Y : fe(v, p.mode), U = z(e.background, w), k = m(o, 0, 3), x = m(i, 0.05, 200), S = m(a, 0, 64), b = m(n, 0.35, 2.5), y = m(u, 0.25, 2.5), _ = m(f, 0.25, 8), L = m(h, 0.05, 1), M = m(B, -180, 180), T = m(I, 0, 2), R = m(H, 0.35, 1.65), A = X(
    () => xe(e, {
      variant: t,
      mode: w,
      speed: p.speed,
      size: x,
      gap: S,
      length: b,
      density: y,
      strokeWidth: _,
      opacity: p.opacity
    }),
    [e, w, y, S, b, x, _, t]
  );
  D(() => {
    const E = N.current?.contentWindow;
    E && E.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: w,
          speed: k,
          size: x,
          gap: S,
          length: b,
          density: y,
          strokeWidth: _,
          opacity: L
        }
      },
      "*"
    );
  }, [w, y, S, b, L, x, k, _, A]);
  const j = M === 0 && T === 1 && R === 1 ? void 0 : `hue-rotate(${M}deg) saturate(${T}) brightness(${R})`;
  return /* @__PURE__ */ $(
    "iframe",
    {
      ref: N,
      className: V,
      title: e.title,
      srcDoc: A,
      sandbox: "allow-scripts",
      loading: "eager",
      style: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: U,
        filter: j,
        ...q
      }
    }
  );
}
function c(e) {
  return function(r) {
    return /* @__PURE__ */ $(G, { ...r, definition: e });
  };
}
const Ge = c(l.constellationField), Be = c(l.particleDrift), Ie = c(l.particleNetwork), He = c(l.fluxVortex), Ve = c(l.portalField), qe = c(l.flowField), Ye = c(l.amberHalftone), W = {
  layers: l.diagnosticsLayers,
  nodes: l.diagnosticsNodes,
  flow: l.diagnosticsFlow
}, Se = {
  variant: "layers"
};
function Ue({
  variant: e = Se.variant,
  ...t
}) {
  const r = W[e] ?? W.layers;
  return /* @__PURE__ */ $(G, { ...t, definition: r });
}
const je = c(l.signalParticles), Je = c(l.skeuomorphicToggle), Xe = c(l.matrixField), Ke = c(l.gatewayFlow), Qe = c(l.connectivityGraph), Ze = c(l.interfaceLines), et = c(l.wireframeForms), tt = c(l.defenseLines), rt = c(l.overrideGrid), ot = c(l.topoField);
export {
  Ye as AmberHalftone,
  Qe as ConnectivityGraph,
  Ge as ConstellationField,
  Se as DIAGNOSTICS_PANEL_DEFAULTS,
  tt as DefenseLines,
  Ue as DiagnosticsPanel,
  qe as FlowField,
  He as FluxVortex,
  Ke as GatewayFlow,
  Ze as InterfaceLines,
  Xe as MatrixField,
  p as NEUFORM_BATCH_DEFAULTS,
  rt as OverrideGrid,
  Be as ParticleDrift,
  Ie as ParticleNetwork,
  Ve as PortalField,
  je as SignalParticles,
  Je as SkeuomorphicToggle,
  ot as TopoField,
  et as WireframeForms
};
