// Coquille partagée des pages de l'espace membre (hub, courses, GPX, membres).
// Porte d'accès (mémorise le mot de passe pour les écritures API) + sous-nav +
// petits utilitaires. Réutilisée par membre.html, courses.html, gpx.html, membres.html.

// Porte unique de l'espace membre = TON COMPTE.
// • Se connecter : e-mail + mot de passe.
// • Créer un compte : + le code du club (invitation, demandé une seule fois).
// Une fois entré, tout l'espace est ouvert — plus jamais de second mot de passe.
const MSGate = ({ children }) => {
  const [auth, setAuth] = React.useState(() => window.ttcAuth.get());
  if (auth) return children;
  return <MSAuth onDone={(a) => setAuth(a)} />;
};

const MSAuth = ({ onDone }) => {
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!window.ttcConfigured || !window.ttcConfigured()) { setErr("Espace en cours de préparation — réessaie bientôt."); return; }
    if (!code.trim()) { setErr("Entre ton code d'accès."); return; }
    setBusy(true);
    try {
      const d = await window.ttcApi("/api/auth", { method: "POST", body: { code: code.trim() } });
      window.ttcAuth.set({ token: d.token, id: d.id, code: d.code });
      onDone(window.ttcAuth.get());
    } catch (x) {
      const s = String((x && x.message) || "");
      if (s.indexOf("401") >= 0) setErr("Code invalide ou révoqué — demande le tien à l'orga.");
      else setErr("Connexion au serveur impossible — réessaie dans un instant.");
    }
    setBusy(false);
  };

  return (
    <section className="adh-hero ms-lock">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Espace membre · la meute</span>
        <h1>La <span className="marker">meute</span>,<br/>ton espace.</h1>
        <div className="ms-lock-grid">
          <p className="adh-hero-lede">
            Ton <strong>code d'accès perso</strong> te donne toute la meute : ta carte de coureur,
            les membres, le calendrier des courses, les traces GPX. Un seul code, rien à retenir
            d'autre, et il te suit sur <strong>tous tes appareils</strong>.
          </p>
          <form className="ms-lock-card" onSubmit={submit}>
            <label className="ms-lock-label" htmlFor="ms-code">Ton code d'accès</label>
            <input id="ms-code" type="text" className="ms-lock-input" value={code} autoComplete="off" autoFocus
              placeholder="XXXX-XXXX" onChange={(e) => { setCode(e.target.value); setErr(""); }} />
            {err && <div className="ms-lock-err">{err}</div>}
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "…" : "Entrer dans l'espace →"}</button>
            <div className="ms-lock-hint">Pas de code ? Demande le tien à un membre de l'orga (il est perso et unique).</div>
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
  { key: "calendrier", label: "Calendrier & courses", href: "calendrier.html" },
  { key: "gpx", label: "Traces GPX", href: "gpx.html" },
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
