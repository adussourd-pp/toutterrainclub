// Espace membre — Ma carte de coureur.
// Un profil que le membre remplit lui-même. Aperçu live à droite, sauvegardé
// dans le navigateur (localStorage, prototype sans backend), exportable en un
// clic pour le coller sur le groupe WhatsApp. Aucune donnée ne quitte le poste.

const PF_KEY = "ttc_profile_v1";
const AVATARS = ["🐗", "🏔️", "🐺", "🦌", "🏃", "🎧", "⚡", "🔥", "🌲", "🌙", "🦅", "☀️"];
const NIVEAUX = [{
  v: "Découverte",
  d: "Je débute / je progresse tranquille"
}, {
  v: "Progression",
  d: "À l'aise, je monte en distance"
}, {
  v: "Performance",
  d: "Je vise des chronos, courses régulières"
}, {
  v: "Ultra",
  d: "Longues distances, gros dénivelés"
}];
const DISTANCES = ["5–10 km", "10–20 km", "Trail court (<25)", "Trail long (25–45)", "Ultra (45+)", "Route", "Piste / fractionné"];
const TERRAINS = ["Sentier", "Montagne", "Technique", "Route", "Bord de mer", "Nuit / aube"];
const JOURS = [["L", "Lundi"], ["M", "Mardi"], ["Me", "Mercredi"], ["J", "Jeudi"], ["V", "Vendredi"], ["S", "Samedi"], ["D", "Dimanche"]];
const MOMENTS = ["Tôt le matin", "Pause midi", "Après le taf", "Week-end"];
const TECHNO = [{
  v: "Curieux",
  e: "🎧"
}, {
  v: "Amateur",
  e: "🔊"
}, {
  v: "Habitué",
  e: "🪩"
}, {
  v: "Résident",
  e: "👑"
}];
const ADHESION = ["Sympathisant", "Don de soutien", "Adhérent", "Adhérent + Licence FFA"];
const EMPTY = {
  prenom: "",
  pseudo: "",
  ville: "Nice",
  avatar: "🐗",
  photo: "",
  role: "",
  niveau: "Progression",
  allure: "",
  distances: [],
  terrains: [],
  jours: [],
  moments: [],
  objectif: "",
  courses: "",
  bio: "",
  strava: "",
  insta: "",
  techno: "Amateur",
  adhesion: "Adhérent"
};
const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PF_KEY);
    if (!raw) return {
      ...EMPTY
    };
    return {
      ...EMPTY,
      ...JSON.parse(raw)
    };
  } catch (e) {
    return {
      ...EMPTY
    };
  }
};

// Identité stable du membre (pour que les MAJ écrasent la même fiche partout).
function memberId() {
  try {
    let id = localStorage.getItem("ttc_member_id");
    if (!id) {
      id = "m" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("ttc_member_id", id);
    }
    return id;
  } catch (e) {
    return "m" + Date.now();
  }
}
const isOrga = () => {
  try {
    return sessionStorage.getItem("ttc_orga_ok") === "1";
  } catch (e) {
    return false;
  }
};

// Redimensionne une image (max 320px) → data URI léger pour la stocker.
function resizeImage(file, cb) {
  const rd = new FileReader();
  rd.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 320,
        s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s);
      c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      try {
        cb(c.toDataURL("image/jpeg", 0.82));
      } catch (e) {
        cb("");
      }
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}

// ---- Petits contrôles réutilisables --------------------------------------
const Field = ({
  label,
  hint,
  children
}) => /*#__PURE__*/React.createElement("label", {
  className: "pf-field"
}, /*#__PURE__*/React.createElement("span", {
  className: "pf-label"
}, label, hint && /*#__PURE__*/React.createElement("em", {
  className: "pf-hint"
}, " · ", hint)), children);
const ChipToggle = ({
  options,
  value,
  onToggle,
  getKey,
  getLabel
}) => /*#__PURE__*/React.createElement("div", {
  className: "pf-chips"
}, options.map(o => {
  const k = getKey ? getKey(o) : o;
  const on = value.includes(k);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: k,
    className: `pf-chip ${on ? "on" : ""}`,
    "aria-pressed": on,
    onClick: () => onToggle(k)
  }, getLabel ? getLabel(o) : o);
}));

// ---- Aperçu : la carte de coureur ----------------------------------------
const RunnerCard = ({
  p
}) => {
  const name = p.prenom || p.pseudo || "Ton prénom";
  const handle = p.pseudo && p.prenom ? `« ${p.pseudo} »` : null;
  const techno = TECHNO.find(t => t.v === p.techno);
  return /*#__PURE__*/React.createElement("div", {
    className: "pf-card"
  }, p.role && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-role"
  }, "★ ", p.role), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-top"
  }, p.photo ? /*#__PURE__*/React.createElement("div", {
    className: "pf-avatar pf-avatar-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.photo,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "pf-totem"
  }, p.avatar)) : /*#__PURE__*/React.createElement("div", {
    className: "pf-avatar"
  }, p.avatar), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-card-name"
  }, name, " ", handle && /*#__PURE__*/React.createElement("span", {
    className: "pf-card-handle"
  }, handle)), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-meta"
  }, /*#__PURE__*/React.createElement("span", null, "📍 ", p.ville || "—"), /*#__PURE__*/React.createElement("span", {
    className: "pf-badge-lvl"
  }, p.niveau)))), p.bio && /*#__PURE__*/React.createElement("p", {
    className: "pf-card-bio"
  }, "« ", p.bio, " »"), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-k"
  }, "Allure repère"), /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-v"
  }, p.allure ? p.allure : "—", /*#__PURE__*/React.createElement("span", null, " /km"))), /*#__PURE__*/React.createElement("div", {
    className: "pf-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-k"
  }, "Trail to Techno"), /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-v"
  }, techno ? `${techno.e} ${techno.v}` : "—")), /*#__PURE__*/React.createElement("div", {
    className: "pf-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-k"
  }, "Adhésion"), /*#__PURE__*/React.createElement("div", {
    className: "pf-stat-v pf-stat-sm"
  }, p.adhesion))), p.distances.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-card-bk"
  }, "Distances"), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-tags"
  }, p.distances.map(d => /*#__PURE__*/React.createElement("span", {
    key: d
  }, d)))), p.terrains.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-card-bk"
  }, "Terrains"), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-tags"
  }, p.terrains.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    className: "alt"
  }, d)))), (p.jours.length > 0 || p.moments.length > 0) && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-card-bk"
  }, "Dispos"), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-dispo"
  }, p.jours.length > 0 && /*#__PURE__*/React.createElement("span", null, p.jours.join(" · ")), p.moments.length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "pf-card-moments"
  }, p.moments.join(" / ")))), (p.objectif || p.courses) && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-card-bk"
  }, "Objectif 2027"), p.objectif && /*#__PURE__*/React.createElement("p", {
    className: "pf-card-obj"
  }, p.objectif), p.courses && /*#__PURE__*/React.createElement("p", {
    className: "pf-card-obj muted"
  }, "🎯 ", p.courses)), (p.strava || p.insta) && /*#__PURE__*/React.createElement("div", {
    className: "pf-card-links"
  }, p.strava && /*#__PURE__*/React.createElement("a", {
    href: p.strava,
    target: "_blank",
    rel: "noopener",
    className: "chip muted"
  }, "Strava ↗"), p.insta && /*#__PURE__*/React.createElement("a", {
    href: p.insta,
    target: "_blank",
    rel: "noopener",
    className: "chip muted"
  }, "Instagram ↗")));
};

// ---- La page --------------------------------------------------------------
const ProfilPage = () => {
  const [p, setP] = React.useState(loadProfile);
  const [saved, setSaved] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const set = (k, v) => {
    setP(s => ({
      ...s,
      [k]: v
    }));
    setSaved(false);
  };
  const toggle = (k, v) => setP(s => {
    const cur = s[k];
    const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
    return {
      ...s,
      [k]: next
    };
  });
  const save = async () => {
    try {
      localStorage.setItem(PF_KEY, JSON.stringify(p));
    } catch (e) {}
    // Publie / met à jour la fiche dans la meute (même id → écrase partout).
    if (window.ttcConfigured && window.ttcConfigured()) {
      try {
        await window.ttcApi("/api/members", {
          method: "POST",
          body: {
            id: memberId(),
            prenom: p.prenom,
            pseudo: p.pseudo,
            ville: p.ville,
            avatar: p.avatar,
            niveau: p.niveau,
            objectif: p.objectif,
            strava: p.strava,
            insta: p.insta,
            techno: p.techno,
            adhesion: p.adhesion,
            distances: p.distances,
            // on emballe terrains + photo + rôle dans le champ terrains (JSON)
            terrains: {
              t: p.terrains,
              photo: p.photo,
              role: p.role,
              allure: p.allure,
              courses: p.courses,
              bio: p.bio
            }
          }
        });
      } catch (e) {/* hors-ligne : reste en local, resync au prochain save */}
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };
  const reset = () => {
    if (!window.confirm("Effacer ta carte et repartir de zéro ?")) return;
    try {
      localStorage.removeItem(PF_KEY);
    } catch (e) {}
    setP({
      ...EMPTY
    });
  };
  const asText = () => {
    const L = [];
    const name = [p.prenom, p.pseudo && `« ${p.pseudo} »`].filter(Boolean).join(" ");
    L.push(`${p.avatar} ${name || "—"} — carte TTC`);
    if (p.ville) L.push(`📍 ${p.ville}`);
    L.push(`Niveau : ${p.niveau}${p.allure ? ` · ${p.allure}/km` : ""}`);
    if (p.distances.length) L.push(`Distances : ${p.distances.join(", ")}`);
    if (p.terrains.length) L.push(`Terrains : ${p.terrains.join(", ")}`);
    if (p.jours.length || p.moments.length) L.push(`Dispos : ${[...p.jours, ...p.moments].join(", ")}`);
    if (p.objectif) L.push(`Objectif 2027 : ${p.objectif}`);
    if (p.courses) L.push(`🎯 Courses visées : ${p.courses}`);
    if (p.bio) L.push(`« ${p.bio} »`);
    L.push(`Trail to Techno : ${p.techno}`);
    if (p.strava) L.push(`Strava : ${p.strava}`);
    if (p.insta) L.push(`Insta : ${p.insta}`);
    return L.join("\n");
  };
  const copy = async () => {
    const txt = asText();
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch (e) {
      window.prompt("Copie ta carte (Ctrl/Cmd+C) :", txt);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.MS.MSSubnav, {
    active: "carte"
  }), /*#__PURE__*/React.createElement("section", {
    className: "adh-hero"
  }, /*#__PURE__*/React.createElement(HeroWaves, null), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adh-hero-eyebrow"
  }, "★ Espace membre · ta fiche"), /*#__PURE__*/React.createElement("h1", null, "Ta carte de ", /*#__PURE__*/React.createElement("span", {
    className: "marker"
  }, "coureur"), "."), /*#__PURE__*/React.createElement("div", {
    className: "adh-hero-grid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "adh-hero-lede"
  }, "Qui tu es, ton niveau, tes distances, quand tu cours. De quoi te retrouver sur les sorties, former des groupes d'allure et faire les bonnes rencontres — c'est ça, l'esprit ", /*#__PURE__*/React.createElement("strong", null, "social run"), ". Tu remplis, tu vois ta carte se construire à droite, tu l'enregistres. ", /*#__PURE__*/React.createElement("strong", null, "Rien ne quitte ton navigateur."))))), /*#__PURE__*/React.createElement("section", {
    className: "adh-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pf-group-h"
  }, "01 · Identité"), /*#__PURE__*/React.createElement("div", {
    className: "pf-row2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Prénom"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.prenom,
    onChange: e => set("prenom", e.target.value),
    placeholder: "Camille"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Surnom",
    hint: "optionnel"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.pseudo,
    onChange: e => set("pseudo", e.target.value),
    placeholder: "La Fusée"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pf-row2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Secteur / ville"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.ville,
    onChange: e => set("ville", e.target.value),
    placeholder: "Nice, Vieux-Nice…"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Adhésion"
  }, /*#__PURE__*/React.createElement("select", {
    className: "pf-input",
    value: p.adhesion,
    onChange: e => set("adhesion", e.target.value)
  }, ADHESION.map(a => /*#__PURE__*/React.createElement("option", {
    key: a,
    value: a
  }, a))))), /*#__PURE__*/React.createElement("div", {
    className: "pf-row2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Ta photo",
    hint: "optionnel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-photo-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: `pf-photo-prev ${p.photo ? "has" : ""}`
  }, p.photo ? /*#__PURE__*/React.createElement("img", {
    src: p.photo,
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", null, p.avatar)), /*#__PURE__*/React.createElement("div", {
    className: "pf-photo-btns"
  }, /*#__PURE__*/React.createElement("label", {
    className: "btn btn-sm"
  }, "Choisir…", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => {
      const f = e.target.files && e.target.files[0];
      if (f) resizeImage(f, d => set("photo", d));
    }
  })), p.photo && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pf-reset",
    onClick: () => set("photo", "")
  }, "Retirer")))), /*#__PURE__*/React.createElement(Field, {
    label: "Ton totem",
    hint: "ton symbole"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-avatars"
  }, AVATARS.map(a => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: a,
    className: `pf-av ${p.avatar === a ? "on" : ""}`,
    onClick: () => set("avatar", a)
  }, a))))), isOrga() ? /*#__PURE__*/React.createElement(Field, {
    label: "Rôle dans l'orga",
    hint: "réservé au bureau"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.role,
    onChange: e => set("role", e.target.value),
    placeholder: "Fondateur & Président, Trésorier·ère, Orga…"
  })) : p.role ? /*#__PURE__*/React.createElement(Field, {
    label: "Rôle dans l'orga"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-role-ro"
  }, "★ ", p.role, " ", /*#__PURE__*/React.createElement("em", null, "· modifiable en accès orga"))) : null), /*#__PURE__*/React.createElement("div", {
    className: "pf-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pf-group-h"
  }, "02 · Ton trail"), /*#__PURE__*/React.createElement(Field, {
    label: "Niveau"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-levels"
  }, NIVEAUX.map(n => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: n.v,
    className: `pf-level ${p.niveau === n.v ? "on" : ""}`,
    onClick: () => set("niveau", n.v)
  }, /*#__PURE__*/React.createElement("span", {
    className: "pf-level-v"
  }, n.v), /*#__PURE__*/React.createElement("span", {
    className: "pf-level-d"
  }, n.d))))), /*#__PURE__*/React.createElement(Field, {
    label: "Allure repère",
    hint: "ton rythme en sortie tranquille"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.allure,
    onChange: e => set("allure", e.target.value),
    placeholder: "5'30, 6'00…"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Distances préférées"
  }, /*#__PURE__*/React.createElement(ChipToggle, {
    options: DISTANCES,
    value: p.distances,
    onToggle: v => toggle("distances", v)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Terrains de jeu"
  }, /*#__PURE__*/React.createElement(ChipToggle, {
    options: TERRAINS,
    value: p.terrains,
    onToggle: v => toggle("terrains", v)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pf-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pf-group-h"
  }, "03 · Tes dispos"), /*#__PURE__*/React.createElement(Field, {
    label: "Jours où tu cours le plus"
  }, /*#__PURE__*/React.createElement(ChipToggle, {
    options: JOURS,
    value: p.jours,
    onToggle: v => toggle("jours", v),
    getKey: o => o[0],
    getLabel: o => o[1]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Moments"
  }, /*#__PURE__*/React.createElement(ChipToggle, {
    options: MOMENTS,
    value: p.moments,
    onToggle: v => toggle("moments", v)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pf-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pf-group-h"
  }, "04 · Objectifs & vibe"), /*#__PURE__*/React.createElement(Field, {
    label: "Ton objectif de la saison"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.objectif,
    onChange: e => set("objectif", e.target.value),
    placeholder: "Finir mon premier trail long, passer sous les 45' au 10k…"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Courses visées",
    hint: "optionnel"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.courses,
    onChange: e => set("courses", e.target.value),
    placeholder: "Marseille-Cassis, Trail du Mercantour…"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ta bio en une phrase"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "pf-input pf-textarea",
    value: p.bio,
    maxLength: 140,
    onChange: e => set("bio", e.target.value),
    placeholder: "Ce qui te fait courir, en 140 signes."
  }), /*#__PURE__*/React.createElement("span", {
    className: "pf-count"
  }, p.bio.length, "/140")), /*#__PURE__*/React.createElement(Field, {
    label: "Trail to Techno",
    hint: "ton rapport à l'after 🎶"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-techno"
  }, TECHNO.map(t => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: t.v,
    className: `pf-tk ${p.techno === t.v ? "on" : ""}`,
    onClick: () => set("techno", t.v)
  }, /*#__PURE__*/React.createElement("span", {
    className: "pf-tk-e"
  }, t.e), t.v))))), /*#__PURE__*/React.createElement("div", {
    className: "pf-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pf-group-h"
  }, "05 · Tes liens"), /*#__PURE__*/React.createElement("div", {
    className: "pf-row2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Strava",
    hint: "lien profil"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.strava,
    onChange: e => set("strava", e.target.value),
    placeholder: "https://strava.com/athletes/…"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Instagram"
  }, /*#__PURE__*/React.createElement("input", {
    className: "pf-input",
    value: p.insta,
    onChange: e => set("insta", e.target.value),
    placeholder: "https://instagram.com/…"
  }))))), /*#__PURE__*/React.createElement("aside", {
    className: "pf-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-aside-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-aside-lab"
  }, "Aperçu · ta carte"), /*#__PURE__*/React.createElement(RunnerCard, {
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    className: "pf-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: save
  }, saved ? "✓ Enregistré" : "Enregistrer ma carte"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm",
    onClick: copy
  }, copied ? "✓ Copié" : "Copier pour WhatsApp"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pf-reset",
    onClick: reset
  }, "Réinitialiser")), /*#__PURE__*/React.createElement("p", {
    className: "pf-note"
  }, "En cliquant ", /*#__PURE__*/React.createElement("b", null, "Enregistrer"), ", ta carte apparaît dans ", /*#__PURE__*/React.createElement("b", null, "Les membres"), " et se met à jour ", /*#__PURE__*/React.createElement("b", null, "pour toute la meute"), ". Reviens la modifier quand tu veux : ça resynchronise.")))))));
};
window.PROFIL = {
  ProfilPage,
  RunnerCard
};