// TTC — shared atoms (logo, header, footer, decorative SVGs)

const TtcLogo = ({
  size = 28
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 64 48",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 44 L18 22 L26 30 L34 14 L46 32 L52 24 L62 44 Z",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "44",
  cy: "10",
  r: "3.2",
  fill: "currentColor"
}));
const Brand = ({
  to = "/"
}) => /*#__PURE__*/React.createElement("a", {
  href: to,
  className: "brand",
  "aria-label": "Tout Terrain Club — accueil"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontWeight: 800
  }
}, "tout terrain club")));

// Lit compte + carte (forme sûre pour RunnerCard) depuis le navigateur.
function readMe() {
  let auth = null,
    raw = null;
  try {
    auth = JSON.parse(localStorage.getItem("ttc_auth") || "null");
  } catch (e) {}
  try {
    raw = JSON.parse(localStorage.getItem("ttc_profile_v1") || "null");
  } catch (e) {}
  const card = raw ? Object.assign({
    distances: [],
    terrains: [],
    tags: [],
    activites: [],
    formats: [],
    niveau: "",
    techno: "",
    avatar: "🐗"
  }, raw) : null;
  return {
    auth,
    card
  };
}

// Ta carte en popup (ouverte depuis l'avatar du header, espace membre).
const HeaderCardModal = ({
  card,
  onClose
}) => {
  React.useEffect(() => {
    const k = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const hasCard = card && (card.prenom || card.pseudo);
  const logout = () => {
    try {
      localStorage.removeItem("ttc_auth");
      sessionStorage.removeItem("ttc_member_ok");
    } catch (e) {}
    window.location.href = "index.html";
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "me-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-modal me-modal-card",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "me-close",
    onClick: onClose,
    "aria-label": "Fermer"
  }, "×"), hasCard && window.PROFIL && window.PROFIL.RunnerCard ? /*#__PURE__*/React.createElement(window.PROFIL.RunnerCard, {
    p: card
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pf-card",
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", null, "Tu n'as pas encore rempli ta carte de coureur.")), /*#__PURE__*/React.createElement("div", {
    className: "me-modal-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-sm btn-primary",
    href: "profil.html"
  }, hasCard ? "Modifier ma carte →" : "Créer ma carte →"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm",
    onClick: logout
  }, "Déconnexion"))));
};
const HeaderPublic = ({
  active = "Accueil"
}) => {
  // Le menu « espace membre » n'apparaît QUE sur les pages de l'espace membre
  // (celles qui chargent member-shell → window.MS). Le site public garde
  // toujours son menu public, connecté ou pas.
  const member = !!(typeof window !== "undefined" && window.MS);
  const publicItems = [{
    label: "Accueil",
    href: "index.html"
  }, {
    label: "Trail to Techno",
    href: "trail-to-techno.html"
  }, {
    label: "Saison 2027",
    href: "adhesion-2027.html"
  }, {
    label: "Espace membre",
    href: "membre.html"
  }, {
    label: "Contact",
    href: "mailto:toutterrainclub@gmail.com"
  }];
  const memberItems = [{
    label: "Espace membre",
    href: "membre.html"
  }, {
    label: "Ma carte",
    href: "profil.html"
  }, {
    label: "La meute",
    href: "membres.html"
  }, {
    label: "Calendrier & courses",
    href: "calendrier.html"
  }, {
    label: "Traces GPX",
    href: "gpx.html"
  }];
  const items = member ? memberItems : publicItems;
  const me = readMe();
  const [meOpen, setMeOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap header-inner"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.label,
    href: it.href,
    className: it.label === active ? "active" : ""
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, member ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "btn btn-sm"
  }, "← Revenir au site"), me.auth && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hdr-ava",
    onClick: () => setMeOpen(true),
    title: "Ma carte"
  }, me.card && me.card.photo ? /*#__PURE__*/React.createElement("img", {
    src: me.card.photo,
    alt: "Ma carte"
  }) : /*#__PURE__*/React.createElement("span", null, me.card && me.card.avatar || "🐗"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "adhesion-2027.html",
    className: "btn btn-sm btn-primary"
  }, "Saison 2027 →"), /*#__PURE__*/React.createElement("a", {
    href: "membre.html",
    className: "btn btn-sm"
  }, "Espace membre")))), meOpen && /*#__PURE__*/React.createElement(HeaderCardModal, {
    card: me.card,
    onClose: () => setMeOpen(false)
  }));
};
const PromoStrip = () => /*#__PURE__*/React.createElement("div", {
  className: "promo-strip"
}, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "●"), " Trail to Techno · Édition Mercantour · 8–9 août 2026 · Vallée de la Gordolasque"), /*#__PURE__*/React.createElement("span", {
  style: {
    opacity: 0.4
  }
}, "·"), /*#__PURE__*/React.createElement("span", null, "Depuis Nice · Saison 2026"), /*#__PURE__*/React.createElement("span", {
  style: {
    opacity: 0.4
  }
}, "·"), /*#__PURE__*/React.createElement("span", null, "Nice · Alpes-Maritimes · 06"));
const HeroWaves = () => /*#__PURE__*/React.createElement("svg", {
  className: "hero-waves",
  viewBox: "0 0 600 320",
  fill: "none",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, [0, 22, 44, 66, 88, 110, 132, 154].map((y, i) => /*#__PURE__*/React.createElement("path", {
  key: i,
  d: `M0 ${60 + y} C 120 ${30 + y}, 240 ${90 + y}, 360 ${50 + y} S 600 ${20 + y}, 720 ${60 + y}`,
  stroke: "currentColor",
  strokeWidth: "1",
  opacity: 0.45 - i * 0.04
})));
const ElevSparkline = ({
  stroke = "var(--ink)",
  fill = "var(--green-soft)"
}) => /*#__PURE__*/React.createElement("svg", {
  className: "elev-svg",
  viewBox: "0 0 480 130",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
  id: "hatch-elev",
  patternUnits: "userSpaceOnUse",
  width: "6",
  height: "6",
  patternTransform: "rotate(-45)"
}, /*#__PURE__*/React.createElement("line", {
  x1: "0",
  y1: "0",
  x2: "0",
  y2: "6",
  stroke: "var(--green-3)",
  strokeWidth: "1",
  opacity: "0.55"
}))), /*#__PURE__*/React.createElement("path", {
  d: "M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90 L480 130 L0 130 Z",
  fill: "url(#hatch-elev)",
  opacity: "0.7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90",
  stroke: stroke,
  strokeWidth: "1.6",
  fill: "none"
}), /*#__PURE__*/React.createElement("line", {
  x1: "0",
  y1: "125",
  x2: "480",
  y2: "125",
  stroke: "var(--rule)",
  strokeWidth: "0.6"
}));
const MapPlaceholder = () => /*#__PURE__*/React.createElement("div", {
  className: "map-card hatch",
  style: {
    minHeight: 320
  }
}, /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 600 360",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": "true",
  style: {
    position: "absolute",
    inset: 0
  }
}, Array.from({
  length: 14
}).map((_, i) => {
  const off = i * 14;
  return /*#__PURE__*/React.createElement("path", {
    key: i,
    d: `M${-20 + off * 0.3} ${320 - off * 0.6} C ${120} ${260 - off * 0.4}, ${260} ${300 - off * 0.55}, ${380} ${240 - off * 0.5} S ${560} ${290 - off * 0.45}, ${640} ${260 - off * 0.5}`,
    stroke: "var(--green-3)",
    strokeWidth: "0.8",
    opacity: "0.35",
    fill: "none"
  });
}), /*#__PURE__*/React.createElement("path", {
  d: "M40 280 C 120 240, 180 200, 230 220 S 320 290, 380 230 S 460 140, 520 180",
  stroke: "var(--ink)",
  strokeWidth: "2.5",
  fill: "none",
  strokeDasharray: "0"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "40",
  cy: "280",
  r: "6",
  fill: "var(--green)",
  stroke: "var(--ink)",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "520",
  cy: "180",
  r: "6",
  fill: "var(--ink)"
}), /*#__PURE__*/React.createElement("text", {
  x: "50",
  y: "298",
  fontFamily: "var(--f-mono)",
  fontSize: "10",
  fill: "var(--ink)"
}, "DÉPART"), /*#__PURE__*/React.createElement("text", {
  x: "488",
  y: "170",
  fontFamily: "var(--f-mono)",
  fontSize: "10",
  fill: "var(--ink)"
}, "SOMMET")), /*#__PURE__*/React.createElement("div", {
  className: "hatch-label",
  style: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 16
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    background: "var(--paper)",
    padding: "6px 10px",
    border: "1px solid var(--rule)",
    borderRadius: 4
  }
}, "carte topo · parcours")));
const HandArrow = () => /*#__PURE__*/React.createElement("div", {
  className: "hand-arrow"
}, /*#__PURE__*/React.createElement("span", {
  className: "hand"
}, "→ logo + meute"), /*#__PURE__*/React.createElement("svg", {
  width: "44",
  height: "22",
  viewBox: "0 0 44 22",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 11 C 14 4, 24 18, 38 11",
  stroke: "var(--fire)",
  strokeWidth: "1.6",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 4 L40 11 L30 18",
  stroke: "var(--fire)",
  strokeWidth: "1.6",
  fill: "none"
})));
const PARTNERS = [{
  name: "Chalet Albarea",
  role: "Refuge · Peira Cava",
  url: "https://www.albarea.com/"
}, {
  name: "Relais des Merveilles",
  role: "Refuge · Mercantour",
  url: "https://relaisdesmerveilles.com/"
}, {
  name: "Näak",
  role: "Nutrition officielle",
  url: "https://www.naak.com/fr"
}];
const PartnersBand = () => /*#__PURE__*/React.createElement("section", {
  className: "partners"
}, /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  className: "partners-head"
}, /*#__PURE__*/React.createElement("span", {
  className: "eyebrow"
}, "★ Nos partenaires")), /*#__PURE__*/React.createElement("div", {
  className: "partners-grid"
}, PARTNERS.map(p => {
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "p-name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "p-role"
  }, p.role));
  return p.url ? /*#__PURE__*/React.createElement("a", {
    className: "partner",
    key: p.name,
    href: p.url,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      color: "inherit"
    }
  }, inner) : /*#__PURE__*/React.createElement("div", {
    className: "partner",
    key: p.name
  }, inner);
}))));
const FooterPublic = () => /*#__PURE__*/React.createElement("footer", {
  className: "footer"
}, /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("p", {
  style: {
    color: "var(--muted)",
    maxWidth: "32ch",
    marginTop: 14,
    lineHeight: 1.55
  }
}, "Social trail run, born in Nice, techno lovers."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    gap: 8,
    marginTop: 26
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "https://www.strava.com/clubs/toutterrainclub",
  target: "_blank",
  rel: "noopener",
  className: "chip muted"
}, "Strava"), /*#__PURE__*/React.createElement("a", {
  href: "https://www.instagram.com/toutterrainclub/",
  target: "_blank",
  rel: "noopener",
  className: "chip muted"
}, "Instagram"), /*#__PURE__*/React.createElement("span", {
  className: "chip muted"
}, "Communauté")), /*#__PURE__*/React.createElement("a", {
  href: "mailto:toutterrainclub@gmail.com",
  style: {
    display: "inline-block",
    marginTop: 22,
    color: "var(--muted)"
  }
}, "toutterrainclub@gmail.com")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h4", null, "Le club"), /*#__PURE__*/React.createElement("a", {
  href: "charte-des-valeurs.html"
}, "Charte des valeurs"), /*#__PURE__*/React.createElement("a", {
  href: "espace-membre.html"
}, "Espace orga")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h4", null, "Légal"), /*#__PURE__*/React.createElement("a", {
  href: "mentions-legales.html"
}, "Mentions légales"), /*#__PURE__*/React.createElement("a", {
  href: "confidentialite.html"
}, "Confidentialité · RGPD")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h4", null, "Plan du site"), /*#__PURE__*/React.createElement("a", {
  href: "index.html"
}, "Accueil"), /*#__PURE__*/React.createElement("a", {
  href: "trail-to-techno.html"
}, "Trail to Techno"), /*#__PURE__*/React.createElement("a", {
  href: "membre.html"
}, "Espace membre"))), /*#__PURE__*/React.createElement("div", {
  className: "footer-base"
}, /*#__PURE__*/React.createElement("span", null, "© 2026 Tout Terrain Club · Nice · Côte d'Azur"))));
Object.assign(window, {
  TtcLogo,
  Brand,
  HeaderPublic,
  PromoStrip,
  HeroWaves,
  ElevSparkline,
  MapPlaceholder,
  HandArrow,
  PartnersBand,
  FooterPublic
});
