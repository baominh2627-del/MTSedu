import { jsx as w } from "react/jsx-runtime";
import { useMemo as A, useRef as F, useEffect as H } from "react";
import O from "./sources/aetheris-labs.html.js";
import $ from "./sources/audio-wordmark.html.js";
import U from "./sources/dot-border-button.html.js";
import z from "./sources/creator-studio-intro.html.js";
import K from "./sources/epilude-footer.html.js";
import X from "./sources/digital-expanse.html.js";
import Y from "./sources/floating-dots-cta.html.js";
import q from "./sources/gallery-heading.html.js";
import J from "./sources/generate-button.html.js";
import V from "./sources/glassmorphism-cta.html.js";
import Z from "./sources/gradient-beam-cta.html.js";
import j from "./sources/gradient-cta.html.js";
import Q from "./sources/gradient-pill-button.html.js";
import ee from "./sources/ignition-terminal.html.js";
import te from "./sources/launch-button.html.js";
import re from "./sources/imaginie-starfield.html.js";
import oe from "./sources/nexus-tactile.html.js";
import ae from "./sources/nexus-topology.html.js";
import ne from "./sources/sliding-text-cta.html.js";
import ie from "./sources/spinning-border-button.html.js";
import le from "./sources/thinking-button.html.js";
import x from "./sources/performance-gauges.html.js";
import se from "./sources/platform-core.html.js";
import ce from "./sources/strata-cloud.html.js";
import de from "./sources/valence-core.html.js";
import ue from "./sources/vanguard-dimensional.html.js";
import fe from "./sources/vertex-9.html.js";
import pe from "./sources/void-protocol.html.js";
const ge = `<svg viewBox="0 0 512 512" aria-hidden="true">
  <defs>
    <mask id="threeui-intro-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
      <rect width="512" height="512" fill="#000"/>
      <circle cx="256" cy="256" r="208" fill="#fff"/>
      <g fill="none" stroke="#000" stroke-linecap="round" stroke-width="28">
        <path d="M36 178C112 252 184 264 260 196C336 128 404 114 482 180"/>
        <path d="M36 292C112 366 184 378 260 310C336 242 404 228 482 294"/>
      </g>
    </mask>
  </defs>
  <rect width="512" height="512" fill="#f5f5f7" mask="url(#threeui-intro-cut)"/>
</svg>`, he = `<svg width="1600" height="300" viewBox="0 0 1600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="800" y="235" text-anchor="middle" fill="#F4F4F0" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="240" font-weight="900" letter-spacing="-8">SHADERS</text>
</svg>`, k = {
  mode: "dark",
  hue: 0,
  saturation: 1,
  brightness: 1
}, T = {
  /* matte — museum colours under one soft rise of noise, a light sans on
     wide tracking, and a ring that is sprung rather than eased */
  "rising-diagonal": {
    title: "Twelve Works in Slow Orbit",
    headline: ["TWELVE WORKS", "IN SLOW ORBIT"],
    headlineWidths: [1846, 2e3],
    axis: 25.5,
    phase: 93,
    direction: 1,
    field: "matte",
    palette: [
      "#e9e5dd",
      "#20232a",
      "#c25a43",
      "#2f5b4e",
      "#d6cfc2",
      "#3a4763",
      "#dda45c",
      "#14161a",
      "#a7b3a4",
      "#f3f1ec",
      "#5a6670",
      "#8c4b3f"
    ],
    /* headline ink: [muted line, emphasis line, offset plate] */
    ink: { dark: ["#8d949c", "#ffffff", "#20232a"], light: ["#6b7280", "#111827", "#e9e5dd"] },
    type: { font: "sans", weight: "400", headlineSize: 1.15, tracking: 0.1 },
    motion: { spring: !0, ease: 0.42 }
  },
  /* glitch — broadcast colours torn into flat blocks, rows out of register,
     and a bold sans that breaks up with them */
  "falling-diagonal": {
    title: "Signal Lost, Image Holding",
    headline: ["SIGNAL LOST", "IMAGE HOLDING"],
    headlineWidths: [1622, 1917],
    axis: -25.5,
    phase: 87,
    direction: -1,
    field: "glitch",
    palette: [
      "#0b0b12",
      "#ff2f6d",
      "#00e6ff",
      "#13f28a",
      "#f2f2f8",
      "#7a1bff",
      "#101018",
      "#ff7a1a",
      "#141a2e",
      "#e01f52",
      "#1a1a26",
      "#0ac2d8"
    ],
    /* headline ink: [muted line, emphasis line, offset plate] */
    ink: { dark: ["#ff2f6d", "#f2f2f8", "#0b0b12"], light: ["#c81049", "#111827", "#f2f2f8"] },
    type: { font: "sans", weight: "700", headlineSize: 1.2, tracking: 0 },
    motion: { spring: !1, ease: 0.12 }
  },
  /* riso — print colours dithered to three tones over a lit corner, set in
     an old-style serif with a hard offset plate behind it */
  "horizontal-sweep": {
    title: "Prints from the Flat Files",
    headline: ["PRINTS FROM", "THE FLAT FILES"],
    headlineWidths: [1506, 1917],
    axis: 0,
    phase: 90,
    direction: 1,
    field: "riso",
    palette: [
      "#e0b64a",
      "#b1512a",
      "#6d7638",
      "#ecdfc2",
      "#2f6b66",
      "#8a3a2b",
      "#d69b3e",
      "#3c4630",
      "#c06e3a",
      "#e6d3a8",
      "#546d76",
      "#7a4726"
    ],
    /* headline ink: [muted line, emphasis line, offset plate] */
    ink: { dark: ["#e0b64a", "#f4e9d2", "#6d2a16"], light: ["#8a3a2b", "#2b2018", "#e0b64a"] },
    type: { font: "oldstyle", weight: "700", headlineSize: 1.2, tracking: 0.03 },
    motion: { spring: !1, ease: 0.9 }
  },
  /* halftone — one ink on one stock, shaded only by dot size, under a high
     contrast didone */
  "vertical-loop": {
    title: "One Wall, Twelve Plates",
    headline: ["ONE WALL", "TWELVE PLATES"],
    headlineWidths: [1132, 1840],
    axis: 90,
    phase: 0,
    direction: -1,
    field: "halftone",
    palette: [
      "#12110f",
      "#f2efe8",
      "#1c1b18",
      "#e4e0d7",
      "#2b2a26",
      "#d6d1c6",
      "#0a0a09",
      "#faf8f3",
      "#1f1e1a",
      "#eae6dd",
      "#161513",
      "#c0402c"
    ],
    /* headline ink: [muted line, emphasis line, offset plate] */
    ink: { dark: ["#c0402c", "#f2efe8", "#12110f"], light: ["#c0402c", "#12110f", "#e4e0d7"] },
    type: { font: "didone", weight: "400", headlineSize: 1.25, tracking: 0.06 },
    motion: { spring: !1, ease: 0.55 }
  }
}, B = {
  serif: '"Times New Roman",Times,"Liberation Serif","Nimbus Roman",serif',
  didone: 'Didot,"Bodoni 72","Bodoni MT","Playfair Display",Georgia,serif',
  oldstyle: '"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif',
  sans: '"Helvetica Neue",Helvetica,"Inter",Arial,system-ui,sans-serif'
}, me = ["400", "700"], R = {
  variant: "rising-diagonal"
};
function be(e, r) {
  const t = r === "light" ? "#f4f7fb" : "#111318", n = r === "light" ? ["#60a5fa", "#3b82f6", "#2563eb"] : ["#2563eb", "#1d4ed8", "#1e40af"];
  return e.replace("<title>Uploading — glowing border microinteraction</title>", "<title>Thinking — glowing border microinteraction</title>").replace("<style>", `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet">
<style>`).replaceAll("#1d1d1d", t).replace("var word = 'Uploading'", "var word = 'Thinking'").replace(
    `var FONT = '300 100px -apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Inter, system-ui, "Segoe UI", Roboto, sans-serif';`,
    `var FONT = '300 100px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';`
  ).replace(
    `      if(glyphs[i].ch === 'g') doubleStoreyG(c);
      else{`,
    "      {"
  ).replace("grd.addColorStop(0, '#2e3242');", `grd.addColorStop(0, '${n[0]}');`).replace("grd.addColorStop(0.55, '#2b2f3c');", `grd.addColorStop(0.55, '${n[1]}');`).replace("grd.addColorStop(1, '#272c36');", `grd.addColorStop(1, '${n[2]}');`).replaceAll("rgb(83,92,135)", "rgb(219,234,254)").replaceAll("rgb(97,106,150)", "rgb(239,246,255)").replace("rgb(133,141,189)", "rgb(255,255,255)").replace(
    "  var CX = 1024 - 22, CY = 1024 + 11.5;   /* button centre in the source recording */",
    `  var SCL = 0.49;                          /* hero button -> normal button */
  var CX = (1024 - 22)/SCL, CY = (1024 + 11.5)/SCL;`
  ).replace("    k = S*dpr/REF;", "    k = S*dpr/REF*SCL;").replace("  var PW = 976, PH = 345, PR = 100;", "  var PW = 1010, PH = 345, PR = 100;").replace(
    "  var TXT_W = 778, TXT_CAP = 120, TXT_BASE = 1093;",
    `  var TXT_W = 450, TXT_CAP = 79, TXT_BASE = CY + 38;
  var BR_R = 13, BR_SP = 40, BR_GAP = 78;   /* braille dot radius, cell pitch, gap to label */
  var BR_W = BR_SP + 2*BR_R, BR_SHIFT = (BR_W + BR_GAP)/2;
  /* the terminal 'dots' spinner, as raised-dot masks: bit 0..2 = left column top->bottom, 3..5 = right */
  var BRAILLE = [0x0B,0x19,0x39,0x38,0x3C,0x34,0x26,0x27,0x07,0x0F];
  var BR_STEPS = 30;                        /* three full spinner cycles per lap, so the loop still joins */`
  ).replace(
    "  var glyphs = [], fontPx = 169, tracking = 0, textX = 0;",
    "  var glyphs = [], fontPx = 169, tracking = 0, textX = 0, brailleX = 0;"
  ).replace(
    "    textX = (CX + 4)*k - TXT_W*k/2 + lead;",
    `    textX = (CX + 4)*k - TXT_W*k/2 + lead + BR_SHIFT*k;
    brailleX = (CX + 4)*k - (BR_W + BR_GAP + TXT_W)*k/2 + BR_R*k;`
  ).replace(
    "  function label(c, ph){",
    `  /* the spinner is drawn as dots rather than braille glyphs, so it never depends
     on a system face carrying the U+28xx block */
  function braille(c, ph){
    var mask = BRAILLE[Math.floor(ph*BR_STEPS) % BRAILLE.length];
    var cy = (CY - 1.5)*k, r = BR_R*k, sp = BR_SP*k;
    for(var b=0;b<6;b++){
      var on = (mask >> b) & 1;
      c.beginPath();
      c.arc(brailleX + (b < 3 ? 0 : sp), cy + ((b % 3) - 1)*sp, on ? r : r*0.7, 0, Math.PI*2);
      c.fillStyle = on ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.16)';
      c.fill();
    }
  }

  function label(c, ph){`
  ).replace(`    plate(ctx);
    label(ctx, ph);`, `    plate(ctx);
    braille(ctx, ph);
    label(ctx, ph);`);
}
function ve(e, r) {
  return r !== "dark" ? e : e.replace("from-black/10 via-black/20 to-black/10", "from-white/[0.16] via-white/[0.07] to-white/[0.16]").replace("text-black/60", "text-white/70").replace("text-slate-600", "text-slate-200").replace('stroke="#666"', 'stroke="#e5e7eb"').replace("hover:bg-slate-50", "hover:bg-white/10");
}
function xe(e, r) {
  return r !== "light" ? e : e.replaceAll("#fffa", "#111a").replaceAll("#fffd", "#111d").replaceAll("#fff4", "#1114").replaceAll("#fff3", "#1113").replaceAll("#fff2", "#1112");
}
const ke = /function buildLabels\(\)\{[\s\S]*?\n\}\n\nfunction resize/, Se = /function buildHead\(\)\{[\s\S]*?\n\}\n\nfunction buildLabels/, we = /function lin\(x,x0,y0,x1,y1,stops\)\{[\s\S]*?\n\];\n\nfunction roundRectPath/, ye = /    \/\* film grain \*\/\n[\s\S]*?\n    x\.restore\(\);\n    front\.push\(c\);/, Ee = /var t0 = performance\.now\(\), tNow = 0, playing = true;[\s\S]*?window\.__play = function\(\)\{ t0 = performance\.now\(\) - tNow\*1000; playing = true; \};/, Ae = `function buildHead(){
  headLayer = mkc(Math.max(1,W), Math.max(1,H));
  var x = headLayer.getContext('2d');
  if (x.letterSpacing !== undefined) x.letterSpacing = (HEAD_TRACK*HEAD_CAP*HEAD_SIZE*K).toFixed(2)+'px';
  if (HEAD_STYLE === 'riso'){
    var off = 0.055*HEAD_CAP*HEAD_SIZE*K;
    headPass(x, off, off, HEAD_SHADOW);
  }
  headPass(x, 0, 0, null);
  if (HEAD_STYLE === 'glitch') headGlitch(x);
}

/* one setting of the two headline lines, optionally displaced and forced to
   a single colour, so a style can stack passes into its treatment */
function headPass(x, dx, dy, tint){
  for (var i=0;i<HEAD.length;i++){
    var h = HEAD[i];
    fitText(x, h.s, SANS, HEAD_WEIGHT, HEAD_CAP*HEAD_SIZE*K, d2sx(1481) + dx,
            d2sy(HEAD_MID + (h.top - HEAD_MID)*HEAD_SIZE) + dy, h.w*HEAD_SIZE*K, tint || h.fill);
  }
}

/* the headline as a picture that lost its signal: a few rows slip sideways
   and two colour channels sit out of register behind the letterforms */
function headGlitch(x){
  var w = headLayer.width, h = headLayer.height, i;
  var snap = mkc(w,h);
  snap.getContext('2d').drawImage(headLayer,0,0);
  var r = rng(0x2E51);
  var top = d2sy(HEAD_MID) - HEAD_CAP*HEAD_SIZE*K*2.1, span = HEAD_CAP*HEAD_SIZE*K*4.2;
  for (i=0;i<7;i++){
    var sy = Math.round(top + r()*span);
    var sh = Math.round((0.03 + r()*0.11)*HEAD_CAP*HEAD_SIZE*K);
    var dx = Math.round((r()-0.5)*0.08*w);
    x.clearRect(0,sy,w,sh);
    x.drawImage(snap, 0,sy,w,sh, dx,sy,w,sh);
  }
  var ghost = function(color){
    var g = mkc(w,h), gx = g.getContext('2d');
    gx.drawImage(snap,0,0);
    gx.globalCompositeOperation = 'source-in';
    gx.fillStyle = color; gx.fillRect(0,0,w,h);
    return g;
  };
  var off = 0.05*HEAD_CAP*HEAD_SIZE*K;
  x.save();
  /* the ghosts go under the letterforms, so the headline stays readable */
  x.globalCompositeOperation = 'destination-over';
  x.globalAlpha = 0.9;
  x.drawImage(ghost(HEAD_GHOST[0]), -off, 0);
  x.drawImage(ghost(HEAD_GHOST[1]), off, 0);
  x.restore();
}

function buildLabels`, Te = `function fill(x,style){ x.fillStyle = style; x.fillRect(0,0,TS,TS); }

function rgbOf(hex){
  var v = parseInt(hex.slice(1),16);
  return [(v>>16)&255,(v>>8)&255,v&255];
}
function mixRGB(a,b,t){
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
}
function cssRGB(c){
  return 'rgb('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+')';
}
function luma(c){ return (c[0]*0.299 + c[1]*0.587 + c[2]*0.114)/255; }

/* value noise on a 64x64 lattice, smoothstep-interpolated and wrapped */
function noiseField(seed){
  var g = new Float32Array(4096), r = rng(seed), i;
  for (i=0;i<4096;i++) g[i] = r();
  return function(x,y){
    var x0 = Math.floor(x), y0 = Math.floor(y);
    var fx = x - x0, fy = y - y0;
    fx = fx*fx*(3-2*fx); fy = fy*fy*(3-2*fy);
    var ra = (y0 & 63)*64, rb = ((y0+1) & 63)*64, ca = x0 & 63, cb = (x0+1) & 63;
    var a = g[ra+ca], b = g[ra+cb], c = g[rb+ca], d = g[rb+cb];
    return a + (b-a)*fx + (c-a)*fy + (a-b-c+d)*fx*fy;
  };
}
function fbm(n,x,y,oct){
  var v = 0, amp = 0.5, f = 1, tot = 0, i;
  for (i=0;i<oct;i++){ v += amp*n(x*f,y*f); tot += amp; amp *= 0.5; f *= 2; }
  return v/tot;
}
function grain(x, alpha){
  x.save();
  x.globalCompositeOperation = 'overlay';
  x.globalAlpha = alpha;
  x.fillStyle = x.createPattern(grainTile,'repeat');
  x.fillRect(0,0,TS,TS);
  x.restore();
}

/* paint a low-resolution field, then blow it up over the whole tile: smooth
   for a matte plate, nearest wherever the noise has to keep its edges */
function fieldBuffer(N, shade){
  var buf = mkc(N,N), bx = buf.getContext('2d'), d = bx.createImageData(N,N), px, py, o, c;
  for (py=0;py<N;py++){
    for (px=0;px<N;px++){
      c = shade((px+0.5)/N, (py+0.5)/N, px, py);
      o = (py*N+px)*4;
      d.data[o] = c[0]|0; d.data[o+1] = c[1]|0; d.data[o+2] = c[2]|0;
      d.data[o+3] = c.length > 3 ? c[3]|0 : 255;
    }
  }
  bx.putImageData(d,0,0);
  return buf;
}
function blowUp(x, buf, smooth, alpha){
  x.save();
  x.imageSmoothingEnabled = smooth;
  if (alpha !== undefined) x.globalAlpha = alpha;
  x.drawImage(buf, 0, 0, TS, TS);
  x.restore();
}

/* matte — a museum plate: flat colour, one slow rise of noise across it,
   and grain fine enough to read as the surface rather than as an effect */
function paintMatte(x, base, i){
  var n = noiseField(0x2C41 + i*9176);
  var hi = mixRGB(base,[255,255,255],0.13), lo = mixRGB(base,[0,0,0],0.15);
  blowUp(x, fieldBuffer(160, function(u,v){
    var s = 0.5 + (fbm(n, u*6.5, v*6.5, 5) - 0.5)*1.9 + (v - 0.5)*0.07;
    s = s < 0 ? 0 : s > 1 ? 1 : s;
    return s < 0.5 ? mixRGB(lo, base, s*2) : mixRGB(base, hi, (s-0.5)*2);
  }), true);
  grain(x, 0.1);
}

/* glitch — a plate that lost the signal: flat blocks torn out of the
   neighbouring colours, rows slipped sideways, two channels off register */
function paintGlitch(x, base, i){
  var r = rng(0x51B7 + i*30011), k;
  fill(x, cssRGB(base));
  for (k=0;k<4;k++){
    x.fillStyle = cssRGB(rgbOf(PLATES[(i + 1 + ((r()*5)|0)) % PLATES.length]));
    x.fillRect(Math.round((r()-0.2)*TS), Math.round(r()*TS),
               Math.round((0.2 + r()*0.55)*TS), Math.round((0.04 + r()*0.2)*TS));
  }
  blowUp(x, fieldBuffer(64, function(){
    var w = r() < 0.5 ? 250 : 6;
    return [w,w,w, r() < 0.2 ? 200 : 0];
  }), false, 0.5);
  /* rows slip sideways, each one wrapped so no edge is ever left empty */
  var snap = mkc(TS,TS);
  snap.getContext('2d').drawImage(x.canvas,0,0);
  for (k=0;k<11;k++){
    var y0 = Math.round(r()*TS), h = Math.round((0.01 + r()*0.06)*TS);
    var dx = Math.round((r()-0.5)*0.36*TS);
    x.clearRect(0,y0,TS,h);
    x.drawImage(snap, 0,y0,TS,h, dx,y0,TS,h);
    x.drawImage(snap, 0,y0,TS,h, dx + (dx < 0 ? TS : -TS),y0,TS,h);
  }
  var channel = function(color){
    var g = mkc(TS,TS), gx = g.getContext('2d');
    gx.drawImage(x.canvas,0,0);
    gx.globalCompositeOperation = 'multiply';
    gx.fillStyle = color; gx.fillRect(0,0,TS,TS);
    return g;
  };
  var red = channel('#ff3050'), cyan = channel('#30e0ff');
  x.save();
  x.globalCompositeOperation = 'lighter';
  x.globalAlpha = 0.3;
  x.drawImage(red, -0.022*TS, 0);
  x.drawImage(cyan, 0.022*TS, 0);
  x.restore();
  x.save();
  x.fillStyle = 'rgba(0,0,0,0.22)';
  for (k=0;k<TS;k+=4) x.fillRect(0,k,TS,1);
  x.restore();
  grain(x, 0.24);
}

/* riso — the printed plate: a lit corner and a noise field quantised to
   three tones through an ordered dither, then scanlines and heavy grain */
var BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function paintRiso(x, base, i){
  var n = noiseField(0x77A3 + i*15731), k;
  var lo = mixRGB(base,[24,14,6],0.66), hi = mixRGB(base,[255,238,196],0.5);
  var cx = 0.22 + (i % 3)*0.28, cy = 0.2 + ((i/3)|0)*0.2;
  blowUp(x, fieldBuffer(100, function(u,v,px,py){
    var d = Math.sqrt((u-cx)*(u-cx) + (v-cy)*(v-cy));
    var s = (1 - d*1.25)*0.72 + fbm(n, u*3.2, v*3.2, 3)*0.52 - 0.1;
    var band = Math.floor(s*2.4 + (BAYER[(py & 3)*4 + (px & 3)] + 0.5)/16);
    return band <= 0 ? lo : band === 1 ? base : hi;
  }), false);
  x.save();
  x.fillStyle = 'rgba(28,14,4,0.18)';
  for (k=0;k<TS;k+=6) x.fillRect(0,k,TS,2);
  x.restore();
  grain(x, 0.22);
}

/* halftone — one ink on one stock, shaded only by the size of the dots on
   a screen rotated a few degrees further for every tile */
function paintHalftone(x, base, i){
  var n = noiseField(0x3F19 + i*21467), gx, gy;
  fill(x, cssRGB(base));
  var dot = luma(base) > 0.5 ? mixRGB(base,[0,0,0],0.88) : mixRGB(base,[255,255,255],0.9);
  var pitch = TS/30, a = (17 + (i % 4)*9)*Math.PI/180;
  var ca = Math.cos(a), sa = Math.sin(a), span = Math.ceil(TS/pitch);
  x.save();
  x.fillStyle = cssRGB(dot);
  x.translate(TS/2, TS/2);
  x.rotate(a);
  for (gy=-span;gy<=span;gy++){
    for (gx=-span;gx<=span;gx++){
      var wx = gx*pitch, wy = gy*pitch;
      var u = (wx*ca - wy*sa)/TS + 0.5, v = (wx*sa + wy*ca)/TS + 0.5;
      if (u < -0.1 || u > 1.1 || v < -0.1 || v > 1.1) continue;
      var s = fbm(n, u*2.7, v*2.7, 4)*0.95 + (0.55 - v)*0.5;
      var rad = pitch*0.66*(s < 0 ? 0 : s > 1 ? 1 : s);
      if (rad < 0.4) continue;
      x.beginPath(); x.arc(wx, wy, rad, 0, Math.PI*2); x.fill();
    }
  }
  x.restore();
  grain(x, 0.12);
}

var PAINTERS = { matte: paintMatte, glitch: paintGlitch, riso: paintRiso, halftone: paintHalftone };
var ART = (function(){
  var painter = PAINTERS[FIELD] || paintMatte, list = [], i;
  for (i=0;i<PLATES.length;i++){
    list.push((function(index){
      return function(x){ painter(x, rgbOf(PLATES[index]), index); };
    })(i));
  }
  return list;
})();

function roundRectPath`, Be = `var tNow = 0, playing = true, hovering = false, rate = 0, vel = 0, settled = false, last = performance.now();

function setHover(state){
  if (hovering === state) return;
  hovering = state; settled = false;
  /* the host cannot see the pointer arrive over this frame, so tell it — it is
     the one that will see the pointer leave again */
  if (state && window.parent !== window){
    try { window.parent.postMessage({ threeuiPointerOver: true }, '*'); } catch (error) {}
  }
}
var root = document.documentElement;
root.addEventListener('pointerenter', function(){ setHover(true); });
root.addEventListener('pointermove',  function(){ setHover(true); });
root.addEventListener('pointerdown',  function(){ setHover(true); });
root.addEventListener('pointerleave', function(){ setHover(false); });
root.addEventListener('pointercancel',function(){ setHover(false); });
window.addEventListener('blur', function(){ setHover(false); });

function frame(now){
  var dt = Math.min(0.05, Math.max(0, (now - last)/1000));
  last = now;
  if (playing){
    if (SPRING){
      vel += (((hovering ? 1 : 0) - rate)*SPRING_K - vel*SPRING_D)*dt;
      rate += vel*dt;
    } else {
      rate += ((hovering ? 1 : 0) - rate) * (1 - Math.exp(-dt/EASE));
    }
    if (Math.abs(rate) > 0.0004 || Math.abs(vel) > 0.0004){
      tNow = ((tNow + dt*rate) % DUR + DUR) % DUR;
      render(tNow); settled = false;
    } else if (!settled){
      rate = 0; vel = 0; render(tNow); settled = true;
    }
  }
  requestAnimationFrame(frame);
}

/* font family, weight, and headline size arrive live so a control tick never
   rebuilds the document and repaints the twelve tile textures */
window.addEventListener('message', function(event){
  var runtime = event.data && event.data.threeuiRuntime;
  if (!runtime) return;
  if (typeof runtime.font === 'string') SANS = runtime.font;
  if (typeof runtime.weight === 'string') HEAD_WEIGHT = runtime.weight;
  if (typeof runtime.headlineSize === 'number' && runtime.headlineSize > 0){
    HEAD_SIZE = Math.max(0.6, Math.min(1.8, runtime.headlineSize));
  }
  if (typeof runtime.hover === 'number') setHover(runtime.hover > 0);
  buildHead(); settled = false; render(tNow);
});

window.addEventListener('resize', function(){ resize(); settled = false; render(tNow); });
resize();
render(tNow);
requestAnimationFrame(frame);

window.__DUR = DUR;
window.__seek = function(t){
  tNow = ((t % DUR) + DUR) % DUR;
  playing = false;
  render(tNow);
};
window.__play = function(){ last = performance.now(); playing = true; settled = false; };`;
function M(e, r, t) {
  const n = r === "light" ? "#f4f7fb" : "#000000", l = r === "light" ? t.ink.light : t.ink.dark, i = B[t.type.font];
  return e.replace("<title>New Grainient Collection Added — motion</title>", `<title>${t.title} — motion</title>`).replace("html,body{margin:0;height:100%;background:#000;overflow:hidden}", `html,body{margin:0;height:100%;background:${n};overflow:hidden}`).replace("axis: 25.5,", `axis: ${t.axis},`).replace("phase: 93", `phase: ${t.phase}`).replace(
    "  tile: 346,            /* tile side in ring units (R = a)               */",
    `  tile: 346,            /* tile width in ring units (R = a)              */
  aspect: 0.75,         /* tile height / width — a 4:3 landscape crop    */`
  ).replace(
    "  roundRectPath(ctx, TS, TS, TS*RING.radius);",
    "  roundRectPath(ctx, TS, TS*RING.aspect, TS*RING.aspect*RING.radius);"
  ).replace(
    `var CAP = 142;          /* headline cap height */
var SMALL = 22;         /* small-label cap height */`,
    `var HEAD_CAP = 142;     /* authored headline cap height */
var HEAD_MID = 1093;    /* authored vertical centre of the two-line block */
var HEAD_SIZE = ${t.type.headlineSize};   /* headline size multiplier */
var HEAD_WEIGHT = '${t.type.weight}'; /* headline weight */
var HEAD_TRACK = ${t.type.tracking};   /* headline tracking, in cap heights */
var HEAD_STYLE = '${t.field}';
var HEAD_SHADOW = '${l[2]}';  /* riso: the plate under the ink */
var HEAD_GHOST = ['#ff2f6d','#00e6ff'];  /* glitch: the two channel ghosts */
var PLATES = ${JSON.stringify(t.palette)};
var FIELD = '${t.field}';       /* which painter shades the plates */
var EASE = ${t.motion.ease};        /* seconds for the orbit to reach hover speed */
var SPRING = ${t.motion.spring ? 1 : 0}, SPRING_K = 26, SPRING_D = 5.7;`
  ).replace(
    `var SANS = '"Helvetica Neue",Helvetica,"Inter",Arial,system-ui,sans-serif';`,
    `var SANS = '${i}';`
  ).replace("{ s:'NEW GRAINIENT',    top:930,  w:1370, fill:'#d0d0d0' }", `{ s:'${t.headline[0]}', top:930,  w:${t.headlineWidths[0]}, fill:'${l[0]}' }`).replace("{ s:'COLLECTION ADDED', top:1114, w:1775, fill:'#ffffff' }", `{ s:'${t.headline[1]}', top:1114, w:${t.headlineWidths[1]}, fill:'${l[1]}' }`).replace(' * Tile artwork — eleven grainy gradient "wallpapers"', " * Tile artwork — twelve flat plates under a procedural noise field").replace(we, Te).replace(ye, `    /* each field painter lays its own grain, at the weight its style wants */
    front.push(c);`).replace("y.fillStyle = 'rgba(6,8,18,0.75)';", "y.fillStyle = 'rgba(10,12,24,0.45)';").replace(Se, Ae).replace(
    ke,
    `function buildLabels(){
  /* the launch poster's corner marks and flanking notes are dropped; the
     layer stays so the compositing order below is untouched */
  labelLayer = mkc(1,1);
}

function resize`
  ).replace("var spin = (t/DUR)*Math.PI*2;", `var spin = (t/DUR)*Math.PI*2*${t.direction};`).replace(`ctx.fillStyle = '#000';
  ctx.fillRect(0,0,W,H);`, `ctx.fillStyle = '${n}';
  ctx.fillRect(0,0,W,H);`).replace(Ee, Be);
}
function Re(e, r) {
  const t = r === "light" ? "[[8, 10, 15], [40, 48, 62], [85, 96, 116]]" : "[[255, 255, 255], [226, 232, 240], [191, 205, 225]]";
  return e.replace("<title>Epilude — Footer</title>", "<title>Shaders Particle Wordmark</title>").replace("aspect-ratio: 8.541554959785524;", "aspect-ratio: 5.333333333333333;").replace(/var WORDMARK =[\s\S]*?"<\/svg>";/, `var WORDMARK = ${JSON.stringify(he)};`).replace("var PALETTE = [[255, 255, 255], [226, 232, 240], [191, 205, 225]];", `var PALETTE = ${t};`).replace("a: 0.04 + 0.95 * band * Math.pow(flake, 1.8)", "a: 0.14 + 0.86 * band * Math.pow(flake, 1.8)");
}
function Le(e, r) {
  const t = r === "light" ? "#f4f7fb" : "#000", n = r === "light" ? "#172033" : "#E8EEE9", l = r === "light" ? "#536076" : "#c9d4cc", i = r === "light" ? "#315efb" : "#7080ff";
  return e.replace("<title>Supreme Radio — Graphic Identity</title>", "<title>ThreeUI — Audio Wordmark</title>").replaceAll("supreme radio", "ThreeUI").replaceAll("#EA3927", i).replaceAll("#E8EEE9", n).replaceAll("#E3EDE5", n).replaceAll("#c9d4cc", l).replaceAll("#000", t).replace("var DUR = 20;", "var DUR = 4.7;");
}
const o = {
  expanse: {
    title: "Expanse Field shader background",
    source: X,
    background: "#07080b",
    targets: [{ selector: "#glcanvas", role: "background" }]
  },
  starfield: {
    title: "Imaginie star portal",
    source: re,
    background: "#0d0a12",
    theme: {
      nativeMode: "dark",
      lightBackground: "#f4f7fb",
      darkBackground: "#0d0a12",
      invertBackground: !0
    },
    targets: [
      { selector: "#ambient-starfield", role: "background" },
      { selector: "#portal-stars", role: "background" },
      { selector: ".holo-btn", role: "button" }
    ]
  },
  performanceGaugesTachometer: {
    title: "Tachometer diagnostic gauge",
    source: x,
    background: "#000000",
    targets: [{ selector: "#gauge-tachometer", role: "visual", fit: "contain-square" }]
  },
  performanceGaugesSpeedometer: {
    title: "Speedometer diagnostic gauge",
    source: x,
    background: "#000000",
    targets: [{ selector: "#gauge-speedometer", role: "visual", fit: "contain-square" }]
  },
  performanceGaugesBoost: {
    title: "Turbo boost diagnostic gauge",
    source: x,
    background: "#000000",
    targets: [{ selector: "#gauge-boost", role: "visual", fit: "contain-square" }]
  },
  performanceGaugesPower: {
    title: "EV power diagnostic gauge",
    source: x,
    background: "#000000",
    targets: [{ selector: "#gauge-power", role: "visual", fit: "contain-square" }]
  },
  logicCore: {
    title: "Logic Core isometric field",
    source: se,
    background: "#050505",
    targets: [{ selector: "#three-canvas-container", role: "background" }]
  },
  ignition: {
    title: "Ignition Button shader button",
    source: ee,
    background: "#f0ede7",
    theme: {
      nativeMode: "light",
      lightBackground: "#f0ede7",
      darkBackground: "#121316",
      invertBackground: !0
    },
    targets: [
      { selector: "#bg-gl", role: "background" },
      { selector: "#btn", role: "button" }
    ]
  },
  induction: {
    title: "Induction Button kinetic button",
    source: de,
    background: "#050505",
    theme: {
      nativeMode: "dark",
      lightBackground: "#f4f7fb",
      darkBackground: "#050505",
      invertBackground: !0
    },
    targets: [
      { selector: "#bg-canvas", role: "background" },
      { selector: "#btn", role: "button" }
    ]
  },
  aetherisLabs: {
    title: "Aetheris Labs plasma button",
    source: O,
    background: "#020614",
    theme: {
      nativeMode: "dark",
      lightBackground: "#f4f7fb",
      darkBackground: "#020614",
      invertBackground: !0
    },
    targets: [
      { selector: "#bg-gl", role: "background" },
      { selector: "#btn", role: "button" }
    ]
  },
  tactile: {
    title: "Nexus tactile fluidics button",
    source: oe,
    background: "#03090d",
    theme: {
      nativeMode: "dark",
      lightBackground: "#f4f7fb",
      darkBackground: "#03090d",
      invertBackground: !0
    },
    targets: [
      { selector: "#bg-canvas", role: "background" },
      { selector: "#btn", role: "button" }
    ]
  },
  thinking: {
    title: "Thinking Button canvas animation",
    source: le,
    background: "#111318",
    theme: {
      lightBackground: "#f4f7fb",
      darkBackground: "#111318"
    },
    transformSource: be,
    targets: [{ selector: "#stage", role: "button" }]
  },
  slidingTextCta: {
    title: "Sliding Text CTA button",
    source: ne,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  floatingDotsCta: {
    title: "Floating Dots CTA button",
    source: Y,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  launchButton: {
    title: "Gradient Launch button",
    source: te,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  dotBorderButton: {
    title: "Dot Border button",
    source: U,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    transformSource: xe,
    targets: [{ selector: ".component-wrapper .btn-wrapper", role: "button", preserveTransform: !0 }]
  },
  gradientCta: {
    title: "Gradient CTA button",
    source: j,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  spinningBorderButton: {
    title: "Spinning Border button",
    source: ie,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  glassmorphismCta: {
    title: "Glassmorphism CTA button",
    source: V,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper a", role: "button", preserveTransform: !0 }]
  },
  generateButton: {
    title: "Generate button",
    source: J,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper .btn-wrapper", role: "button", preserveTransform: !0 }]
  },
  gradientPillButton: {
    title: "Gradient Pill button",
    source: Q,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    transformSource: ve,
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  gradientBeamCta: {
    title: "Gradient Beam CTA button",
    source: Z,
    background: "#111318",
    theme: { lightBackground: "#f4f7fb", darkBackground: "#111318" },
    targets: [{ selector: ".component-wrapper button", role: "button", preserveTransform: !0 }]
  },
  threeUIIntro: {
    title: "ThreeUI chromatic wordmark intro",
    source: z,
    background: "#000000",
    theme: {
      nativeMode: "dark",
      lightBackground: "#f4f7fb",
      darkBackground: "#000000",
      invertBackground: !0
    },
    targets: [{ selector: "#stage", role: "background" }],
    hiddenTargets: [".sr"],
    introWordmark: {
      sceneSelector: "#comp .scene:first-child",
      text: "ThreeUI",
      fontSize: 130,
      endTime: 1.7,
      holdTime: 1.1,
      logoSvg: ge
    }
  },
  particleWordmark: {
    title: "Shaders particle wordmark",
    source: K,
    background: "#0c0c0d",
    theme: {
      lightBackground: "#f4f7fb",
      darkBackground: "#0c0c0d"
    },
    transformSource: Re,
    targets: [{ selector: "#storm", role: "visual", fit: "wide-wordmark" }]
  },
  audioWordmark: {
    title: "ThreeUI audio wordmark",
    source: $,
    background: "#000000",
    theme: {
      lightBackground: "#f4f7fb",
      darkBackground: "#000000"
    },
    transformSource: Le,
    targets: [{ selector: "#stage", role: "visual", fit: "portrait-stage", preserveTransform: !0 }]
  },
  galleryHeading: {
    title: "Gallery Heading canvas animation",
    source: q,
    background: "#000000",
    theme: {
      lightBackground: "#f4f7fb",
      darkBackground: "#000000"
    },
    transformSource: (e, r) => M(e, r, T[R.variant]),
    targets: [{ selector: "#stage", role: "background" }]
  },
  dimensional: {
    title: "Vanguard dimensional architecture",
    source: ue,
    background: "#050608",
    targets: [{ selector: "#webgl-canvas", role: "background" }]
  },
  cloud: {
    title: "Strata cloud migration field",
    source: ce,
    background: "#071010",
    targets: [{ selector: "#c", role: "background" }]
  },
  vertex9: {
    title: "Vertex 9 global data field",
    source: fe,
    background: "#050505",
    targets: [{ selector: "#webgl-canvas", role: "background" }]
  },
  topology: {
    title: "Nexus topology field",
    source: ae,
    background: "#070707",
    targets: [{ selector: "#animationCanvas", role: "background" }]
  },
  voidField: {
    title: "Void Field shader background",
    source: pe,
    background: "#030305",
    targets: [{ selector: "#webgl-canvas", role: "background" }]
  }
};
function S(e, r, t) {
  return Math.min(t, Math.max(r, e));
}
function P(e, r) {
  return e.theme?.[`${r}Background`] ?? e.background;
}
function Ie(e, r) {
  const t = P(e, r), n = e.theme?.invertBackground === !0 && e.theme.nativeMode !== r, l = e.transformSource?.(e.source, r) ?? e.source, i = JSON.stringify(e.targets).replace(/</g, "\\u003c"), g = JSON.stringify(e.hiddenTargets ?? []).replace(/</g, "\\u003c"), m = JSON.stringify(e.introWordmark ?? null).replace(/</g, "\\u003c"), c = JSON.stringify(r), d = n ? "filter: invert(1) hue-rotate(180deg) saturate(.92) brightness(1.02) !important;" : "", h = e.introWordmark ? `${e.introWordmark.sceneSelector} .tx { font-size: ${e.introWordmark.fontSize}px !important; }` : "", y = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${t} !important; color-scheme: ${r} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-hidden] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; ${d} }
[data-threeui-role="background"][data-threeui-fit="contain-square"] { position: absolute !important; top: 50% !important; right: auto !important; bottom: auto !important; left: 50% !important; width: min(100vw, 100vh) !important; height: min(100vw, 100vh) !important; aspect-ratio: 1 / 1 !important; transform: translate(-50%, -50%) !important; }
[data-threeui-role="button"] { position: relative !important; z-index: 2 !important; opacity: 1 !important; flex: none !important; }
[data-threeui-role="button"]:not([data-threeui-preserve-transform]) { transform: none !important; }
[data-threeui-role="visual"] { position: relative !important; z-index: 1 !important; width: min(100%, 1040px) !important; max-width: 1040px !important; max-height: 100% !important; margin: auto !important; padding: 24px !important; overflow: auto !important; opacity: 1 !important; filter: none !important; }
[data-threeui-role="visual"]:not([data-threeui-preserve-transform]) { transform: none !important; }
[data-threeui-role="visual"][data-threeui-fit="contain-square"] { flex: none !important; width: min(calc(100vw - 32px), calc(100vh - 32px)) !important; max-width: none !important; height: min(calc(100vw - 32px), calc(100vh - 32px)) !important; max-height: none !important; aspect-ratio: 1 / 1 !important; padding: 0 !important; overflow: hidden !important; }
[data-threeui-role="visual"][data-threeui-fit="wide-wordmark"] { width: min(calc(100vw - 48px), 1180px) !important; max-width: calc(100vw - 48px) !important; height: auto !important; max-height: none !important; aspect-ratio: 16 / 3 !important; padding: 0 !important; overflow: hidden !important; }
[data-threeui-role="visual"][data-threeui-fit="portrait-stage"] { position: absolute !important; top: 50% !important; right: auto !important; bottom: auto !important; left: 50% !important; width: 1080px !important; max-width: none !important; height: 1350px !important; max-height: none !important; padding: 0 !important; overflow: hidden !important; transform-origin: center !important; }
${h}
</style>`, b = `<script data-threeui-focus>
(function () {
  document.documentElement.dataset.sfMode = ${c};
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${i};
    var hiddenSelectors = ${g};
    var introWordmark = ${m};
    var roots = [];
    hiddenSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.setAttribute('data-threeui-hidden', '');
        element.setAttribute('aria-hidden', 'true');
        if ('inert' in element) element.inert = true;
      });
    });
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.fit) element.setAttribute('data-threeui-fit', spec.fit);
      if (spec.preserveTransform) element.setAttribute('data-threeui-preserve-transform', '');
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (introWordmark) {
      var introScene = document.querySelector(introWordmark.sceneSelector);
      var introText = introScene && introScene.querySelector('.tx');
      var introMark = introText && introText.querySelector('.mark');
      if (introText && introMark) {
        introMark.innerHTML = introWordmark.logoSvg;
        var introCharacters = Array.from(introText.children).filter(function (element) { return element !== introMark; });
        introCharacters.forEach(function (element, index) {
          element.textContent = introWordmark.text[index] === ' ' ? ' ' : (introWordmark.text[index] || '');
          element.style.display = index < introWordmark.text.length ? 'inline-block' : 'none';
        });
      }
      var introReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var introStartedAt = performance.now();
      function renderIntroWordmark(now) {
        if (typeof window.__seek !== 'function') return;
        if (introReducedMotion) {
          window.__seek(introWordmark.endTime);
          return;
        }
        var introCycle = introWordmark.endTime + introWordmark.holdTime;
        var introTime = ((now - introStartedAt) / 1000) % introCycle;
        window.__seek(Math.min(introTime, introWordmark.endTime));
        requestAnimationFrame(renderIntroWordmark);
      }
      requestAnimationFrame(renderIntroWordmark);
    }
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) {
      var placeholderLink = root.matches('a[href="#"]') ? root : root.querySelector('a[href="#"]');
      if (placeholderLink) placeholderLink.addEventListener('click', function (event) { event.preventDefault(); });
      document.body.appendChild(root);
    });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
<\/script>`;
  return l.replace(/<\/head>/i, `${y}</head>`).replace(/<\/body>/i, `${b}</body>`);
}
function L({
  definition: e,
  mode: r = k.mode,
  hue: t = k.hue,
  saturation: n = k.saturation,
  brightness: l = k.brightness,
  runtime: i,
  trackPointerHover: g,
  className: m,
  style: c
}) {
  const d = F(null), h = r === "light" ? "light" : "dark", y = P(e, h), b = A(() => Ie(e, h), [e, h]), I = S(t, -180, 180), _ = S(n, 0, 2), D = S(l, 0.35, 1.65), W = I === 0 && _ === 1 && D === 1 ? void 0 : `hue-rotate(${I}deg) saturate(${_}) brightness(${D})`;
  H(() => {
    const s = d.current;
    if (!g || !s) return;
    let u = !1;
    const f = () => {
      u && (u = !1, s.contentWindow?.postMessage({ threeuiRuntime: { hover: 0 } }, "*"));
    }, C = (p) => {
      p.source === s.contentWindow && p.data?.threeuiPointerOver && (u = !0);
    }, G = (p) => {
      if (!u) return;
      const v = s.getBoundingClientRect();
      (p.clientX < v.left || p.clientX > v.right || p.clientY < v.top || p.clientY > v.bottom) && f();
    };
    return window.addEventListener("message", C), window.addEventListener("pointermove", G, !0), s.addEventListener("pointerleave", f), document.addEventListener("mouseleave", f), window.addEventListener("blur", f), () => {
      window.removeEventListener("message", C), window.removeEventListener("pointermove", G, !0), s.removeEventListener("pointerleave", f), document.removeEventListener("mouseleave", f), window.removeEventListener("blur", f);
    };
  }, [g]);
  const E = i ? JSON.stringify(i) : null;
  return H(() => {
    const s = d.current;
    if (!s || !E) return;
    const u = () => s.contentWindow?.postMessage({ threeuiRuntime: JSON.parse(E) }, "*");
    return u(), s.addEventListener("load", u), () => s.removeEventListener("load", u);
  }, [E, b]), /* @__PURE__ */ w(
    "iframe",
    {
      ref: d,
      className: m,
      "data-mode": h,
      title: e.title,
      srcDoc: b,
      sandbox: "allow-scripts",
      loading: "eager",
      style: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: y,
        filter: W,
        ...c
      }
    }
  );
}
function a(e) {
  return function(t) {
    return /* @__PURE__ */ w(L, { ...t, definition: e });
  };
}
const ct = a(o.expanse), dt = a(o.starfield), N = {
  tachometer: o.performanceGaugesTachometer,
  speedometer: o.performanceGaugesSpeedometer,
  boost: o.performanceGaugesBoost,
  power: o.performanceGaugesPower
}, _e = {
  variant: "tachometer"
};
function ut({ variant: e = _e.variant, ...r }) {
  const t = N[e] ?? N.tachometer;
  return /* @__PURE__ */ w(L, { ...r, definition: t });
}
const ft = a(o.logicCore), pt = a(o.ignition), gt = a(o.induction), ht = a(o.aetherisLabs), mt = a(o.tactile), bt = a(o.thinking), vt = a(o.slidingTextCta), xt = a(o.floatingDotsCta), kt = a(o.launchButton), St = a(o.dotBorderButton), wt = a(o.gradientCta), yt = a(o.spinningBorderButton), Et = a(o.glassmorphismCta), At = a(o.generateButton), Tt = a(o.gradientPillButton), Bt = a(o.gradientBeamCta), Rt = a(o.threeUIIntro), Lt = a(o.particleWordmark), It = a(o.audioWordmark);
function _t({
  variant: e = R.variant,
  font: r,
  weight: t,
  headlineSize: n,
  ...l
}) {
  const i = T[e] ?? T[R.variant], g = A(() => ({
    ...o.galleryHeading,
    title: `${i.title} canvas animation`,
    transformSource: (c, d) => M(c, d, i)
  }), [i]), m = A(() => {
    const c = i.type, d = t && me.includes(t) ? t : c.weight;
    return {
      font: (r && B[r]) ?? B[c.font],
      weight: d,
      headlineSize: S(n ?? c.headlineSize, 0.6, 1.8)
    };
  }, [i, r, n, t]);
  return /* @__PURE__ */ w(L, { ...l, definition: g, runtime: m, trackPointerHover: !0 });
}
const Dt = a(o.dimensional), Ct = a(o.cloud), Gt = a(o.vertex9), Ht = a(o.topology), Nt = a(o.voidField);
export {
  It as AudioWordmark,
  Ct as CloudField,
  Gt as DataField,
  Dt as DimensionalField,
  St as DotBorderButton,
  ct as ExpanseField,
  xt as FloatingDotsCta,
  R as GALLERY_HEADING_DEFAULTS,
  B as GALLERY_HEADING_FONTS,
  T as GALLERY_HEADING_VARIANTS,
  me as GALLERY_HEADING_WEIGHTS,
  _t as GalleryHeading,
  At as GenerateButton,
  Et as GlassmorphismCta,
  Bt as GradientBeamCta,
  wt as GradientCta,
  Tt as GradientPillButton,
  pt as IgnitionButton,
  gt as InductionButton,
  kt as LaunchButton,
  ft as LogicCoreField,
  k as NEUFORM_ISOLATED_DEFAULTS,
  _e as PERFORMANCE_GAUGES_DEFAULTS,
  Lt as ParticleWordmark,
  ut as PerformanceGauges,
  ht as PlasmaButton,
  vt as SlidingTextCta,
  yt as SpinningBorderButton,
  dt as StarPortal,
  mt as TactileButton,
  bt as ThinkingButton,
  Rt as ThreeUIIntro,
  Ht as TopologyField,
  Nt as VoidField
};
