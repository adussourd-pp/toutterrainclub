// Coquille partagée des pages de l'espace membre (hub, courses, GPX, membres).
// Porte d'accès (mémorise le mot de passe pour les écritures API) + sous-nav +
// petits utilitaires. Réutilisée par membre.html, courses.html, gpx.html, membres.html.

const MEMBER_PW = "T2Tfestival";

const MSGate = ({ children }) => {
  const [ok, setOk] = React.useState(() => {
    try { return sessionStorage.getItem("ttc_member_ok") === "1"; } catch (e) { return false; }
  });
  const [val, setVal] = React.useState("");
  const [err, setErr] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (val.trim() === MEMBER_PW) {
      try {
        sessionStorage.setItem("ttc_member_ok", "1");
        sessionStorage.setItem("ttc_pass", val.trim()); // pour les écritures API
      } catch (e) {}
      setOk(true);
    } else { setErr(true); }
  };

  if (ok) return children;

  return (
    <section className="adh-hero ms-lock">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Espace membre · accès réservé</span>
        <h1>La <span className="marker">meute</span>,<br/>ton espace.</h1>
        <div className="ms-lock-grid">
          <p className="adh-hero-lede">
            L'espace des adhérents : ta carte de coureur, les membres, les courses du club,
            le partage de traces. Entre le mot de passe partagé sur le groupe.
          </p>
          <form className="ms-lock-card" onSubmit={submit}>
            <label className="ms-lock-label" htmlFor="ms-pw">Mot de passe</label>
            <input id="ms-pw" type="password" className={`ms-lock-input ${err ? "err" : ""}`}
              value={val} autoComplete="off" autoFocus placeholder="••••••••••"
              onChange={(e) => { setVal(e.target.value); setErr(false); }} />
            {err && <div className="ms-lock-err">Mot de passe incorrect — redemande-le sur le groupe.</div>}
            <button type="submit" className="btn btn-primary">Entrer dans l'espace →</button>
            <div className="ms-lock-hint">Pas encore membre ? La commu et les runs restent gratuits.</div>
          </form>
        </div>
      </div>
    </section>
  );
};

const MS_LINKS = [
  { key: "hub", label: "Espace membre", href: "membre.html" },
  { key: "carte", label: "Ma carte", href: "profil.html" },
  { key: "membres", label: "Les membres", href: "membres.html" },
  { key: "courses", label: "Courses", href: "courses.html" },
  { key: "gpx", label: "Traces GPX", href: "gpx.html" },
  { key: "calendrier", label: "Calendrier", href: "calendrier.html" },
];

const MSSubnav = ({ active }) => (
  <div className="wrap">
    <nav className="ms-subnav">
      {MS_LINKS.map((l) => (
        <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>◆ {l.label}</a>
      ))}
    </nav>
  </div>
);

// Bandeau affiché quand le backend n'est pas encore branché (mode démo).
const MSDemo = ({ what }) => (
  <div className="ms-demo">
    <b>Mode démo.</b> {what} sera live dès que le backend Cloudflare sera branché
    (colle l'URL du Worker dans <code>member-config.js</code> — voir <code>backend/DEPLOY.md</code>).
    En attendant, ce que tu crées reste local à ton navigateur.
  </div>
);

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
      } catch (e) { setState("error"); return; }
    }
    // démo : localStorage
    try { setItems(JSON.parse(localStorage.getItem(localKey) || "[]")); } catch (e) { setItems([]); }
    setState("demo");
  }, [path, localKey]);
  React.useEffect(() => { load(); }, [load]);
  const saveLocal = (arr) => { try { localStorage.setItem(localKey, JSON.stringify(arr)); } catch (e) {} };
  return { items, setItems, state, reload: load, saveLocal };
}

window.MS = { MSGate, MSSubnav, MSDemo, MS_LINKS, useCollection };
