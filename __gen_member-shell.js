// Coquille partagée des pages de l'espace membre (hub, courses, GPX, membres).
// Porte d'accès (mémorise le mot de passe pour les écritures API) + sous-nav +
// petits utilitaires. Réutilisée par membre.html, courses.html, gpx.html, membres.html.

const MEMBER_PW = "T2Tfestival";
const MSGate = ({
  children
}) => {
  const [ok, setOk] = React.useState(() => {
    try {
      return sessionStorage.getItem("ttc_member_ok") === "1";
    } catch (e) {
      return false;
    }
  });
  const [val, setVal] = React.useState("");
  const [err, setErr] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (val.trim() === MEMBER_PW) {
      try {
        sessionStorage.setItem("ttc_member_ok", "1");
        sessionStorage.setItem("ttc_pass", val.trim()); // pour les écritures API
      } catch (e) {}
      setOk(true);
    } else {
      setErr(true);
    }
  };
  if (ok) return children;
  return /*#__PURE__*/React.createElement("section", {
    className: "adh-hero ms-lock"
  }, /*#__PURE__*/React.createElement(HeroWaves, null), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adh-hero-eyebrow"
  }, "★ Espace membre · accès réservé"), /*#__PURE__*/React.createElement("h1", null, "La ", /*#__PURE__*/React.createElement("span", {
    className: "marker"
  }, "meute"), ",", /*#__PURE__*/React.createElement("br", null), "ton espace."), /*#__PURE__*/React.createElement("div", {
    className: "ms-lock-grid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "adh-hero-lede"
  }, "L'espace des adhérents : ta carte de coureur, les membres, les courses du club, le partage de traces. Entre le mot de passe partagé sur le groupe."), /*#__PURE__*/React.createElement("form", {
    className: "ms-lock-card",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("label", {
    className: "ms-lock-label",
    htmlFor: "ms-pw"
  }, "Mot de passe"), /*#__PURE__*/React.createElement("input", {
    id: "ms-pw",
    type: "password",
    className: `ms-lock-input ${err ? "err" : ""}`,
    value: val,
    autoComplete: "off",
    autoFocus: true,
    placeholder: "••••••••••",
    onChange: e => {
      setVal(e.target.value);
      setErr(false);
    }
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "ms-lock-err"
  }, "Mot de passe incorrect — redemande-le sur le groupe."), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Entrer dans l'espace →"), /*#__PURE__*/React.createElement("div", {
    className: "ms-lock-hint"
  }, "Pas encore membre ? La commu et les runs restent gratuits.")))));
};
const MS_LINKS = [{
  key: "hub",
  label: "Espace membre",
  href: "membre.html"
}, {
  key: "carte",
  label: "Ma carte",
  href: "profil.html"
}, {
  key: "membres",
  label: "Les membres",
  href: "membres.html"
}, {
  key: "calendrier",
  label: "Calendrier & courses",
  href: "calendrier.html"
}, {
  key: "gpx",
  label: "Traces GPX",
  href: "gpx.html"
}];
const MSSubnav = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("nav", {
  className: "ms-subnav"
}, MS_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
  key: l.key,
  href: l.href,
  className: active === l.key ? "active" : ""
}, "◆ ", l.label))));

// Bandeau affiché quand le backend n'est pas encore branché (mode démo).
const MSDemo = ({
  what
}) => /*#__PURE__*/React.createElement("div", {
  className: "ms-demo"
}, /*#__PURE__*/React.createElement("b", null, "Mode démo."), " ", what, " sera live dès que le backend Cloudflare sera branché (colle l'URL du Worker dans ", /*#__PURE__*/React.createElement("code", null, "member-config.js"), " — voir ", /*#__PURE__*/React.createElement("code", null, "backend/DEPLOY.md"), "). En attendant, ce que tu crées reste local à ton navigateur.");

// Petit hook de chargement API avec repli local (localStorage) en mode démo.
function useCollection(path, localKey) {
  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState("loading");
  const load = React.useCallback(async () => {
    if (window.ttcConfigured()) {
      try {
        const data = await window.ttcApi(path);
        const key = Object.keys(data)[0];
        setItems(data[key] || []);
        setState("live");
        return;
      } catch (e) {
        setState("error");
        return;
      }
    }
    // démo : localStorage
    try {
      setItems(JSON.parse(localStorage.getItem(localKey) || "[]"));
    } catch (e) {
      setItems([]);
    }
    setState("demo");
  }, [path, localKey]);
  React.useEffect(() => {
    load();
  }, [load]);
  const saveLocal = arr => {
    try {
      localStorage.setItem(localKey, JSON.stringify(arr));
    } catch (e) {}
  };
  return {
    items,
    setItems,
    state,
    reload: load,
    saveLocal
  };
}
window.MS = {
  MSGate,
  MSSubnav,
  MSDemo,
  MS_LINKS,
  useCollection
};