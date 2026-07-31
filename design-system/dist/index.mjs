// src/index.jsx
import React from "react";
var TtcLogo = ({ size = 28 }) => /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 64 48", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M2 44 L18 22 L26 30 L34 14 L46 32 L52 24 L62 44 Z", fill: "currentColor" }), /* @__PURE__ */ React.createElement("circle", { cx: "44", cy: "10", r: "3.2", fill: "currentColor" }));
var Brand = ({ to = "/" }) => /* @__PURE__ */ React.createElement("a", { href: to, className: "brand", "aria-label": "Tout Terrain Club \u2014 accueil" }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800 } }, "tout terrain club")));
var HeaderPublic = ({ active = "Accueil" }) => {
  const items = [
    { label: "Accueil", href: "index.html" },
    { label: "Trail to Techno", href: "trail-to-techno.html" },
    { label: "Contact", href: "mailto:toutterrainclub@gmail.com" }
  ];
  return /* @__PURE__ */ React.createElement("header", { className: "header" }, /* @__PURE__ */ React.createElement("div", { className: "wrap header-inner" }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement("nav", { className: "nav" }, items.map((it) => /* @__PURE__ */ React.createElement("a", { key: it.label, href: it.href, className: it.label === active ? "active" : "" }, it.label))), /* @__PURE__ */ React.createElement("div", { className: "header-right" }, /* @__PURE__ */ React.createElement("a", { href: "adhesion-2027.html", className: "btn btn-sm btn-primary" }, "Saison 2027 \u2192"), /* @__PURE__ */ React.createElement("a", { href: "#", className: "btn btn-sm" }, "Espace membre"))));
};
var PromoStrip = () => /* @__PURE__ */ React.createElement("div", { className: "promo-strip" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "dot" }, "\u25CF"), " Trail to Techno \xB7 \xC9dition Mercantour \xB7 8\u20139 ao\xFBt 2026 \xB7 Vall\xE9e de la Gordolasque"), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.4 } }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, "Depuis Nice \xB7 Saison 2026"), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.4 } }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, "Nice \xB7 Alpes-Maritimes \xB7 06"));
var HeroWaves = () => /* @__PURE__ */ React.createElement("svg", { className: "hero-waves", viewBox: "0 0 600 320", fill: "none", preserveAspectRatio: "none", "aria-hidden": "true" }, [0, 22, 44, 66, 88, 110, 132, 154].map((y, i) => /* @__PURE__ */ React.createElement(
  "path",
  {
    key: i,
    d: `M0 ${60 + y} C 120 ${30 + y}, 240 ${90 + y}, 360 ${50 + y} S 600 ${20 + y}, 720 ${60 + y}`,
    stroke: "currentColor",
    strokeWidth: "1",
    opacity: 0.45 - i * 0.04
  }
)));
var ElevSparkline = ({ stroke = "var(--ink)", fill = "var(--green-soft)" }) => /* @__PURE__ */ React.createElement("svg", { className: "elev-svg", viewBox: "0 0 480 130", preserveAspectRatio: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("pattern", { id: "hatch-elev", patternUnits: "userSpaceOnUse", width: "6", height: "6", patternTransform: "rotate(-45)" }, /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "0", x2: "0", y2: "6", stroke: "var(--green-3)", strokeWidth: "1", opacity: "0.55" }))), /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90 L480 130 L0 130 Z",
    fill: "url(#hatch-elev)",
    opacity: "0.7"
  }
), /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90",
    stroke,
    strokeWidth: "1.6",
    fill: "none"
  }
), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "125", x2: "480", y2: "125", stroke: "var(--rule)", strokeWidth: "0.6" }));
var MapPlaceholder = () => /* @__PURE__ */ React.createElement("div", { className: "map-card hatch", style: { minHeight: 320 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 600 360", width: "100%", height: "100%", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true", style: { position: "absolute", inset: 0 } }, Array.from({ length: 14 }).map((_, i) => {
  const off = i * 14;
  return /* @__PURE__ */ React.createElement(
    "path",
    {
      key: i,
      d: `M${-20 + off * 0.3} ${320 - off * 0.6} C ${120} ${260 - off * 0.4}, ${260} ${300 - off * 0.55}, ${380} ${240 - off * 0.5} S ${560} ${290 - off * 0.45}, ${640} ${260 - off * 0.5}`,
      stroke: "var(--green-3)",
      strokeWidth: "0.8",
      opacity: "0.35",
      fill: "none"
    }
  );
}), /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M40 280 C 120 240, 180 200, 230 220 S 320 290, 380 230 S 460 140, 520 180",
    stroke: "var(--ink)",
    strokeWidth: "2.5",
    fill: "none",
    strokeDasharray: "0"
  }
), /* @__PURE__ */ React.createElement("circle", { cx: "40", cy: "280", r: "6", fill: "var(--green)", stroke: "var(--ink)", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "520", cy: "180", r: "6", fill: "var(--ink)" }), /* @__PURE__ */ React.createElement("text", { x: "50", y: "298", fontFamily: "var(--f-mono)", fontSize: "10", fill: "var(--ink)" }, "D\xC9PART"), /* @__PURE__ */ React.createElement("text", { x: "488", y: "170", fontFamily: "var(--f-mono)", fontSize: "10", fill: "var(--ink)" }, "SOMMET")), /* @__PURE__ */ React.createElement("div", { className: "hatch-label", style: { alignItems: "flex-end", justifyContent: "flex-end", padding: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { background: "var(--paper)", padding: "6px 10px", border: "1px solid var(--rule)", borderRadius: 4 } }, "carte topo \xB7 parcours")));
var HandArrow = () => /* @__PURE__ */ React.createElement("div", { className: "hand-arrow" }, /* @__PURE__ */ React.createElement("span", { className: "hand" }, "\u2192 logo + meute"), /* @__PURE__ */ React.createElement("svg", { width: "44", height: "22", viewBox: "0 0 44 22", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M2 11 C 14 4, 24 18, 38 11", stroke: "var(--fire)", strokeWidth: "1.6", fill: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M30 4 L40 11 L30 18", stroke: "var(--fire)", strokeWidth: "1.6", fill: "none" })));
var PARTNERS = [
  { name: "Chalet Albarea", role: "Refuge \xB7 Peira Cava", url: "https://www.albarea.com/" },
  { name: "Relais des Merveilles", role: "Refuge \xB7 Mercantour", url: "https://relaisdesmerveilles.com/" },
  { name: "N\xE4ak", role: "Nutrition officielle", url: "https://www.naak.com/fr" }
];
var PartnersBand = () => /* @__PURE__ */ React.createElement("section", { className: "partners" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "partners-head" }, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "\u2605 Nos partenaires")), /* @__PURE__ */ React.createElement("div", { className: "partners-grid" }, PARTNERS.map((p) => {
  const inner = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "p-name" }, p.name), /* @__PURE__ */ React.createElement("div", { className: "p-role" }, p.role));
  return p.url ? /* @__PURE__ */ React.createElement("a", { className: "partner", key: p.name, href: p.url, target: "_blank", rel: "noopener", style: { textDecoration: "none", color: "inherit" } }, inner) : /* @__PURE__ */ React.createElement("div", { className: "partner", key: p.name }, inner);
}))));
var FooterPublic = () => /* @__PURE__ */ React.createElement("footer", { className: "footer" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "footer-grid", style: { gridTemplateColumns: "1.6fr 1fr" } }, /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--muted)", maxWidth: "32ch", marginTop: 14, lineHeight: 1.55 } }, "Social trail run, born in Nice, techno lovers."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 26 } }, /* @__PURE__ */ React.createElement("a", { href: "https://www.strava.com/clubs/toutterrainclub", target: "_blank", rel: "noopener", className: "chip muted" }, "Strava"), /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/toutterrainclub/", target: "_blank", rel: "noopener", className: "chip muted" }, "Instagram"), /* @__PURE__ */ React.createElement("span", { className: "chip muted" }, "Communaut\xE9"))), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Le club"), /* @__PURE__ */ React.createElement("a", { href: "#" }, "Charte des valeurs"), /* @__PURE__ */ React.createElement("a", { href: "mentions-legales.html" }, "Mentions l\xE9gales"), /* @__PURE__ */ React.createElement("a", { href: "mailto:toutterrainclub@gmail.com" }, "toutterrainclub@gmail.com"))), /* @__PURE__ */ React.createElement("div", { className: "footer-base" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 Tout Terrain Club \xB7 Nice \xB7 C\xF4te d'Azur"), /* @__PURE__ */ React.createElement("span", null, "Saison 2026 \xB7 Mise \xE0 jour 12.05.2026 \xB7 04:42"))));
export {
  Brand,
  ElevSparkline,
  FooterPublic,
  HandArrow,
  HeaderPublic,
  HeroWaves,
  MapPlaceholder,
  PartnersBand,
  PromoStrip,
  TtcLogo
};
