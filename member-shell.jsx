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
  const [mode, setMode] = React.useState("login"); // "login" | "signup"
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const signup = mode === "signup";

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!window.ttcConfigured || !window.ttcConfigured()) { setErr("Espace en cours de préparation — réessaie bientôt."); return; }
    if (!email.trim() || pw.length < 4) { setErr("E-mail + mot de passe (4 caractères min)."); return; }
    if (signup && code.trim() !== (window.TTC_CLUB_CODE || "")) { setErr("Code du club incorrect — demande-le sur le groupe WhatsApp."); return; }
    setBusy(true);
    try {
      const d = await window.ttcApi("/api/auth", { method: "POST", body: { email: email.trim(), password: pw, mode } });
      window.ttcAuth.set({ token: d.token, id: d.id, email: d.email });
      onDone(window.ttcAuth.get());
    } catch (x) {
      const s = String((x && x.message) || "");
      if (signup && s.indexOf("409") >= 0) { setErr("Un compte existe déjà avec cet e-mail — connecte-toi."); setMode("login"); }
      else if (!signup && s.indexOf("401") >= 0) setErr("E-mail ou mot de passe incorrect.");
      else if (s.indexOf("400") >= 0) setErr("E-mail invalide ou mot de passe trop court.");
      else setErr("Connexion au serveur impossible — réessaie dans un instant.");
    }
    setBusy(false);
  };

  return (
    <section className="adh-hero ms-lock">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Espace membre · la meute</span>
        <h1>{signup ? <span>Rejoins la <span className="marker">meute</span>.</span> : <span>Content de te <span className="marker">revoir</span>.</span>}</h1>
        <div className="ms-lock-grid">
          <p className="adh-hero-lede">
            {signup
              ? <span>Un compte, et c'est tout : ta carte de coureur, les membres, le calendrier des courses, les traces GPX. Tu le retrouves sur <strong>tous tes appareils</strong>.</span>
              : <span>Entre avec ton compte. Tu retrouves ta carte et tout l'espace, <strong>où que tu sois</strong>.</span>}
          </p>
          <form className="ms-lock-card" onSubmit={submit}>
            <div className="ms-auth-tabs">
              <button type="button" className={!signup ? "on" : ""} onClick={() => { setMode("login"); setErr(""); }}>Se connecter</button>
              <button type="button" className={signup ? "on" : ""} onClick={() => { setMode("signup"); setErr(""); }}>Créer un compte</button>
            </div>
            <label className="ms-lock-label" htmlFor="ms-email">E-mail</label>
            <input id="ms-email" type="email" className="ms-lock-input" value={email} autoComplete="email" autoFocus
              placeholder="prenom@email.fr" onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
            <label className="ms-lock-label" htmlFor="ms-pw" style={{ marginTop: 10 }}>Mot de passe</label>
            <input id="ms-pw" type="password" className="ms-lock-input" value={pw} autoComplete={signup ? "new-password" : "current-password"}
              placeholder="••••••••" onChange={(e) => { setPw(e.target.value); setErr(""); }} />
            {signup && (
              <React.Fragment>
                <label className="ms-lock-label" htmlFor="ms-code" style={{ marginTop: 10 }}>Code du club <em className="pf-hint">· une seule fois</em></label>
                <input id="ms-code" type="text" className="ms-lock-input" value={code} autoComplete="off"
                  placeholder="Le code partagé sur le groupe" onChange={(e) => { setCode(e.target.value); setErr(""); }} />
              </React.Fragment>
            )}
            {err && <div className="ms-lock-err">{err}</div>}
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "…" : signup ? "Créer mon compte →" : "Entrer dans l'espace →"}</button>
            <div className="ms-lock-hint">
              {signup
                ? <span>Déjà un compte ? <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); setErr(""); }}>Se connecter</a></span>
                : <span>Pas encore de compte ? <a href="#" onClick={(e) => { e.preventDefault(); setMode("signup"); setErr(""); }}>En créer un</a></span>}
            </div>
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
