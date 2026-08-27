const a = (e) => Number(e.toFixed(3)), i = (e) => `${a(e)}px`, t = (e) => `calc(${a(e)} * var(--u))`;
function n(e, r) {
  const [l, o, g] = [1, 3, 5].map((s) => Number.parseInt(e.slice(s, s + 2), 16));
  return `rgba(${l}, ${o}, ${g}, ${r})`;
}
const d = {
  headingFonts: [
    {
      value: "onest",
      label: "Onest",
      stack: "'Onest', system-ui, -apple-system, 'Helvetica Neue', sans-serif"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    }
  ],
  bodyFonts: [
    {
      value: "onest",
      label: "Onest",
      stack: "'Onest', system-ui, -apple-system, 'Helvetica Neue', sans-serif"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    }
  ],
  headingWeights: [
    "400",
    "500",
    "600",
    "700"
  ],
  headingWeight: "400",
  bodyWeights: [
    "300",
    "400",
    "500",
    "600"
  ],
  bodyWeight: "300",
  primaryColor: "#e0231c",
  headingSize: [
    30,
    46,
    72
  ],
  bodySize: [
    13,
    17,
    24
  ],
  headingLetterSpacing: [
    -0.06,
    -0.012,
    0.12
  ],
  css: (e) => `
:root {
  --vermilion: ${e.primary};
  --ember: ${e.retone("#ff5a3c")};
}
body { font-family: ${e.body}; }
body, .body, .body-lg, .num { font-weight: ${e.bodyWeight}; }
h1:not(.jp), h2:not(.jp), h3:not(.jp), .display:not(.jp) {
  font-family: ${e.heading};
  font-weight: ${e.headingWeight};
}
.display { letter-spacing: ${e.headingLetterSpacing}em; }
.h-hero { font-size: clamp(26px, 3.05vw, ${i(e.headingSize)}); }
.h-sec { font-size: clamp(30px, 4vw, ${i(e.headingSize * 60 / 46)}); }
.body-lg { font-size: clamp(14px, 1.02vw, ${i(e.bodySize)}); }
.body { font-size: ${i(Math.max(11, e.bodySize - 3))}; }
`
}, h = {
  headingFonts: [
    {
      value: "lexend",
      label: "Lexend",
      stack: "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    }
  ],
  bodyFonts: [
    {
      value: "lexend",
      label: "Lexend",
      stack: "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    }
  ],
  headingWeights: [
    "200",
    "300",
    "400",
    "500",
    "600"
  ],
  headingWeight: "300",
  bodyWeights: [
    "200",
    "300",
    "400",
    "500"
  ],
  bodyWeight: "300",
  primaryColor: "#ffffff",
  headingSize: [
    40,
    63,
    92
  ],
  bodySize: [
    12,
    16.5,
    24
  ],
  headingLetterSpacing: [
    -0.06,
    -6e-3,
    0.12
  ],
  css: (e) => `
:root {
  --ink: ${e.primary};
  --ink-soft: ${n(e.primary, 0.62)};
  --ink-faint: ${n(e.primary, 0.44)};
}
body { font-family: ${e.body}; font-weight: ${e.bodyWeight}; }
.headline, .ghost {
  font-family: ${e.heading};
}
.headline {
  font-weight: ${e.headingWeight};
  font-size: ${t(e.headingSize)};
  line-height: ${t(e.headingSize * 65 / 63)};
  letter-spacing: ${e.headingLetterSpacing}em;
}
.lede {
  font-weight: ${e.bodyWeight};
  font-size: ${t(e.bodySize)};
  line-height: ${t(e.bodySize * 22 / 16.5)};
}
@media (max-width: 900px) {
  .headline {
    font-size: ${t(e.headingSize * 62 / 63)};
    line-height: ${t(e.headingSize * 66 / 63)};
  }
  .lede {
    font-size: ${t(e.bodySize * 19 / 16.5)};
    line-height: ${t(e.bodySize * 27 / 16.5)};
  }
}
`
}, f = {
  headingFonts: [
    {
      value: "iowan-old-style",
      label: "Iowan Old Style",
      stack: '"Iowan Old Style", Baskerville, "Times New Roman", serif'
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    }
  ],
  bodyFonts: [
    {
      value: "inter",
      label: "Inter",
      stack: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    }
  ],
  headingWeights: [
    "400",
    "500",
    "600"
  ],
  headingWeight: "400",
  bodyWeights: [
    "400",
    "500",
    "600"
  ],
  bodyWeight: "400",
  primaryColor: "#c87046",
  headingSize: [
    32,
    60,
    88
  ],
  bodySize: [
    10,
    12,
    18
  ],
  headingLetterSpacing: [
    -0.1,
    -0.055,
    0.08
  ],
  css: (e) => `
:root { --accent: ${e.primary}; }
body { font-family: ${e.body}; font-weight: ${e.bodyWeight}; }
.selection__title, .detail-title, .editorial-identity strong, .page-status strong {
  font-family: ${e.heading};
  font-weight: ${e.headingWeight};
}
.selection__title {
  font-size: clamp(32px, 3.4vw, ${i(e.headingSize)});
  letter-spacing: ${e.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(56px, 6.3vw, ${i(e.headingSize * 107.2 / 60)});
  letter-spacing: ${a(e.headingLetterSpacing - 0.01)}em;
}
.selection__note { font-size: ${i(e.bodySize)}; font-weight: ${e.bodyWeight}; }
.detail-deck { font-family: ${e.body}; font-weight: ${e.bodyWeight}; }
@media (max-width: 880px) {
  .selection__title { font-size: clamp(32px, 9vw, ${i(e.headingSize * 56 / 60)}); }
  .detail-title { font-size: clamp(48px, 14vw, ${i(e.headingSize * 80 / 60)}); }
}
@media (max-width: 560px) {
  .selection__title { font-size: ${i(e.headingSize * 32 / 60)}; }
}
`
}, m = {
  headingFonts: [
    {
      value: "iowan-old-style",
      label: "Iowan Old Style",
      stack: '"Iowan Old Style", Baskerville, "Times New Roman", serif'
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    }
  ],
  bodyFonts: [
    {
      value: "iowan-old-style",
      label: "Iowan Old Style",
      stack: '"Iowan Old Style", Baskerville, "Times New Roman", serif'
    },
    {
      value: "geist",
      label: "Geist",
      stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      google: "Geist:wght@100..900"
    },
    {
      value: "newsreader",
      label: "Newsreader",
      stack: '"Newsreader", Georgia, serif',
      google: "Newsreader:wght@200..700"
    },
    {
      value: "instrument-serif",
      label: "Instrument Serif",
      stack: '"Instrument Serif", Georgia, serif',
      google: "Instrument+Serif"
    }
  ],
  headingWeights: [
    "400",
    "500",
    "600",
    "700"
  ],
  headingWeight: "500",
  bodyWeights: [
    "400",
    "500",
    "600",
    "700"
  ],
  bodyWeight: "400",
  primaryColor: "#c3a47b",
  headingSize: [
    184,
    325,
    420
  ],
  bodySize: [
    12,
    17,
    24
  ],
  headingLetterSpacing: [
    -0.12,
    -0.085,
    0.08
  ],
  css: (e) => `
:root {
  --pink: ${e.primary};
  --pink-bright: ${e.retone("#dbc39c")};
  --periwinkle: ${e.retone("#b7976c")};
}
body { font-family: ${e.body}; font-weight: ${e.bodyWeight}; }
.brand, .hero-word, .detail-title, .cover-title {
  font-family: ${e.heading};
  font-weight: ${e.headingWeight};
}
.hero-word {
  font-size: clamp(184px, 22vw, ${i(e.headingSize)});
  letter-spacing: ${e.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(52px, 5.7vw, ${i(e.headingSize * 82 / 325)});
  letter-spacing: ${a(e.headingLetterSpacing + 0.03)}em;
}
.detail-description { font-size: clamp(12px, 1.28vw, ${i(e.bodySize)}); font-weight: ${e.bodyWeight}; }
@media (max-width: 900px) {
  .hero-word { font-size: clamp(128px, 28vw, ${i(e.headingSize * 230 / 325)}); }
  .detail-title { font-size: clamp(48px, 10vw, ${i(e.headingSize * 70 / 325)}); }
}
@media (max-width: 560px) {
  .hero-word { font-size: calc(${a(e.headingSize / 325)} * 38vw); }
}
`
};
export {
  m as BESTSELLERS_TYPOGRAPHY,
  f as COMPLETE_SHELF_TYPOGRAPHY,
  d as KAGE_TYPOGRAPHY,
  h as SYLVA_TYPOGRAPHY
};
