// Espace membre — Ma carte de coureur.
// Un profil que le membre remplit lui-même. Aperçu live à droite, sauvegardé
// dans le navigateur (localStorage, prototype sans backend), exportable en un
// clic pour le coller sur le groupe WhatsApp. Aucune donnée ne quitte le poste.

const PF_KEY = "ttc_profile_v1";

const AVATARS = ["🐗", "🏔️", "🐺", "🦌", "🏃", "🎧", "⚡", "🔥", "🌲", "🌙", "🦅", "☀️"];

const NIVEAUX = [
  { v: "Découverte", d: "Je débute / je progresse tranquille" },
  { v: "Progression", d: "À l'aise, je monte en distance" },
  { v: "Performance", d: "Je vise des chronos, courses régulières" },
  { v: "Ultra", d: "Longues distances, gros dénivelés" },
];

const DISTANCES = ["5–10 km", "10–20 km", "Trail court (<25)", "Trail long (25–45)", "Ultra (45+)", "Route", "Piste / fractionné"];
const TERRAINS = ["Sentier", "Montagne", "Technique", "Route", "Bord de mer", "Nuit / aube"];
const JOURS = [["L","Lundi"],["M","Mardi"],["Me","Mercredi"],["J","Jeudi"],["V","Vendredi"],["S","Samedi"],["D","Dimanche"]];
const MOMENTS = ["Tôt le matin", "Pause midi", "Après le taf", "Week-end"];
const TECHNO = [
  { v: "Curieux", e: "🎧" },
  { v: "Amateur", e: "🔊" },
  { v: "Habitué", e: "🪩" },
  { v: "Résident", e: "👑" },
];
const ADHESION = ["Sympathisant", "Don de soutien", "Adhérent", "Adhérent + Licence FFA"];

const EMPTY = {
  prenom: "", pseudo: "", ville: "Nice", avatar: "🐗", photo: "", role: "", email: "",
  niveau: "Progression", allure: "", distances: [], terrains: [],
  jours: [], moments: [], objectif: "", courses: "", bio: "",
  strava: "", insta: "", techno: "Amateur", adhesion: "Adhérent",
};

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PF_KEY);
    if (!raw) return { ...EMPTY };
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch (e) { return { ...EMPTY }; }
};

// Identité stable du membre (pour que les MAJ écrasent la même fiche partout).
function memberId() {
  try {
    let id = localStorage.getItem("ttc_member_id");
    if (!id) { id = "m" + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("ttc_member_id", id); }
    return id;
  } catch (e) { return "m" + Date.now(); }
}
const isOrga = () => { try { return sessionStorage.getItem("ttc_orga_ok") === "1"; } catch (e) { return false; } };

// Identité stable : l'e-mail sert de clé (même e-mail = même carte, partout).
function idFor(p) {
  const e = (p.email || "").trim().toLowerCase();
  if (e) { try { localStorage.setItem("ttc_member_id", "e-" + e); } catch (x) {} return "e-" + e; }
  return memberId();
}
// Reconstruit une carte à partir d'un enregistrement serveur.
function fromServer(m) {
  const t = (m.terrains && typeof m.terrains === "object" && !Array.isArray(m.terrains)) ? m.terrains : {};
  return {
    ...EMPTY,
    prenom: m.prenom || "", pseudo: m.pseudo || "", ville: m.ville || "", avatar: m.avatar || "🐗",
    niveau: m.niveau || "Progression", objectif: m.objectif || "", strava: m.strava || "", insta: m.insta || "",
    techno: m.techno || "Amateur", adhesion: m.adhesion || "Adhérent",
    distances: Array.isArray(m.distances) ? m.distances : [],
    terrains: Array.isArray(t.t) ? t.t : [], photo: t.photo || "", role: t.role || "",
    courses: t.courses || "", bio: t.bio || "", email: t.email || "",
  };
}

// ---- Compte (session) -----------------------------------------------------
function getAuth() { try { return JSON.parse(localStorage.getItem("ttc_auth") || "null"); } catch (e) { return null; } }
function setAuth(a) { try { localStorage.setItem("ttc_auth", JSON.stringify(a)); localStorage.setItem("ttc_member_id", a.id); } catch (e) {} }
function logoutAuth() { try { localStorage.removeItem("ttc_auth"); } catch (e) {} }

const AuthGate = ({ onAuth }) => {
  const [mode, setMode] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!window.ttcConfigured || !window.ttcConfigured()) { setErr("Backend non configuré."); return; }
    setBusy(true); setErr("");
    try {
      const d = await window.ttcApi("/api/auth", { method: "POST", body: { email: email.trim(), password: pw, mode } });
      setAuth({ token: d.token, id: d.id, email: d.email });
      onAuth();
    } catch (x) {
      const s = String((x && x.message) || "");
      if (mode === "signup" && s.indexOf("409") >= 0) setErr("Un compte existe déjà — connecte-toi.");
      else if (mode === "login" && s.indexOf("401") >= 0) setErr("E-mail ou mot de passe incorrect.");
      else if (s.indexOf("400") >= 0) setErr("E-mail invalide ou mot de passe trop court (4 caractères min).");
      else setErr("Comptes pas encore activés côté serveur (mise à jour Cloudflare requise).");
    }
    setBusy(false);
  };
  return (
    <section className="adh-hero ms-lock">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Ma carte · mon compte</span>
        <h1>{mode === "login" ? <span>Connecte-<span className="marker">toi</span>.</span> : <span>Crée ton <span className="marker">compte</span>.</span>}</h1>
        <div className="ms-lock-grid">
          <p className="adh-hero-lede">Ton compte relie ta carte de coureur à toi. Tu la retrouves et la modifies depuis <strong>n'importe quel appareil</strong>, et elle se met à jour pour toute la meute.</p>
          <form className="ms-lock-card" onSubmit={submit}>
            <label className="ms-lock-label" htmlFor="au-mail">E-mail</label>
            <input id="au-mail" type="email" className="pf-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom@email.fr" autoFocus />
            <label className="ms-lock-label" htmlFor="au-pw" style={{ marginTop: 4 }}>Mot de passe</label>
            <input id="au-pw" type="password" className="pf-input" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
            {err && <div className="ms-lock-err">{err}</div>}
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "…" : mode === "login" ? "Se connecter →" : "Créer mon compte →"}</button>
            <div className="ms-lock-hint">
              {mode === "login"
                ? <span>Pas encore de compte ? <a href="#" onClick={(e) => { e.preventDefault(); setMode("signup"); setErr(""); }}>Créer un compte</a></span>
                : <span>Déjà un compte ? <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); setErr(""); }}>Se connecter</a></span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Redimensionne une image (max 320px) → data URI léger pour la stocker.
function resizeImage(file, cb) {
  const rd = new FileReader();
  rd.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 320, s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      try { cb(c.toDataURL("image/jpeg", 0.82)); } catch (e) { cb(""); }
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}

// ---- Petits contrôles réutilisables --------------------------------------
const Field = ({ label, hint, children }) => (
  <label className="pf-field">
    <span className="pf-label">{label}{hint && <em className="pf-hint"> · {hint}</em>}</span>
    {children}
  </label>
);

const ChipToggle = ({ options, value, onToggle, getKey, getLabel }) => (
  <div className="pf-chips">
    {options.map((o) => {
      const k = getKey ? getKey(o) : o;
      const on = value.includes(k);
      return (
        <button
          type="button"
          key={k}
          className={`pf-chip ${on ? "on" : ""}`}
          aria-pressed={on}
          onClick={() => onToggle(k)}
        >
          {getLabel ? getLabel(o) : o}
        </button>
      );
    })}
  </div>
);

// ---- Aperçu : la carte de coureur ----------------------------------------
const RunnerCard = ({ p }) => {
  const name = p.prenom || p.pseudo || "Ton prénom";
  const handle = p.pseudo && p.prenom ? `« ${p.pseudo} »` : null;
  const techno = TECHNO.find((t) => t.v === p.techno);
  return (
    <div className="pf-card">
      {p.role && <div className="pf-card-role">★ {p.role}</div>}
      <div className="pf-card-top">
        {p.photo
          ? <div className="pf-avatar pf-avatar-photo"><img src={p.photo} alt="" /><span className="pf-totem">{p.avatar}</span></div>
          : <div className="pf-avatar">{p.avatar}</div>}
        <div className="pf-card-id">
          <div className="pf-card-name">{name} {handle && <span className="pf-card-handle">{handle}</span>}</div>
          <div className="pf-card-meta">
            <span>📍 {p.ville || "—"}</span>
            <span className="pf-badge-lvl">{p.niveau}</span>
          </div>
        </div>
      </div>

      {p.bio && <p className="pf-card-bio">« {p.bio} »</p>}

      <div className="pf-card-stats">
        <div className="pf-stat">
          <div className="pf-stat-k">Trail to Techno</div>
          <div className="pf-stat-v">{techno ? `${techno.e} ${techno.v}` : "—"}</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-k">Adhésion</div>
          <div className="pf-stat-v pf-stat-sm">{p.adhesion}</div>
        </div>
      </div>

      {p.distances.length > 0 && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Distances</div>
          <div className="pf-card-tags">{p.distances.map((d) => <span key={d}>{d}</span>)}</div>
        </div>
      )}
      {p.terrains.length > 0 && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Terrains</div>
          <div className="pf-card-tags">{p.terrains.map((d) => <span key={d} className="alt">{d}</span>)}</div>
        </div>
      )}
      {(p.jours.length > 0 || p.moments.length > 0) && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Dispos</div>
          <div className="pf-card-dispo">
            {p.jours.length > 0 && <span>{p.jours.join(" · ")}</span>}
            {p.moments.length > 0 && <span className="pf-card-moments">{p.moments.join(" / ")}</span>}
          </div>
        </div>
      )}
      {(p.objectif || p.courses) && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Objectif 2027</div>
          {p.objectif && <p className="pf-card-obj">{p.objectif}</p>}
          {p.courses && <p className="pf-card-obj muted">🎯 {p.courses}</p>}
        </div>
      )}

      {(p.strava || p.insta) && (
        <div className="pf-card-links">
          {p.strava && <a href={p.strava} target="_blank" rel="noopener" className="chip muted">Strava ↗</a>}
          {p.insta && <a href={p.insta} target="_blank" rel="noopener" className="chip muted">Instagram ↗</a>}
        </div>
      )}
    </div>
  );
};

// ---- La page --------------------------------------------------------------
const ProfilPage = () => {
  const [auth, setAuthState] = React.useState(getAuth);
  const [p, setP] = React.useState(loadProfile);
  const [saved, setSaved] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [sync, setSync] = React.useState("");

  // Charge MA fiche depuis le serveur (source de vérité de mon compte).
  const loadMine = React.useCallback(async (a) => {
    if (!a || !(window.ttcConfigured && window.ttcConfigured())) return;
    try {
      const d = await window.ttcApi("/api/members?id=" + encodeURIComponent(a.id));
      if (d && d.member) setP({ ...fromServer(d.member), email: a.email });
    } catch (e) {}
  }, []);

  React.useEffect(() => { if (auth) loadMine(auth); /* eslint-disable-next-line */ }, []);

  const onAuth = () => { const a = getAuth(); setAuthState(a); loadMine(a); };
  const logout = () => { logoutAuth(); setAuthState(null); setP({ ...EMPTY }); try { localStorage.removeItem(PF_KEY); } catch (e) {} };

  const set = (k, v) => { setP((s) => ({ ...s, [k]: v })); setSaved(false); };
  const toggle = (k, v) => setP((s) => {
    const cur = s[k];
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    return { ...s, [k]: next };
  });

  const save = async () => {
    try { localStorage.setItem(PF_KEY, JSON.stringify(p)); } catch (e) {}
    // Enregistre MA fiche sur le serveur (id dérivé du jeton de compte).
    if (auth && window.ttcConfigured && window.ttcConfigured()) {
      setSync("Enregistrement…");
      try {
        await window.ttcApi("/api/members", { method: "POST", body: {
          prenom: p.prenom, pseudo: p.pseudo, ville: p.ville, avatar: p.avatar,
          niveau: p.niveau, objectif: p.objectif, strava: p.strava, insta: p.insta,
          techno: p.techno, adhesion: p.adhesion,
          distances: p.distances,
          terrains: { t: p.terrains, photo: p.photo, role: p.role, courses: p.courses, bio: p.bio },
        } });
        setSync("");
      } catch (e) { setSync("Échec de l'enregistrement en ligne (reconnecte-toi ?)."); }
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const reset = () => {
    if (!window.confirm("Effacer ta carte et repartir de zéro ?")) return;
    try { localStorage.removeItem(PF_KEY); } catch (e) {}
    setP({ ...EMPTY });
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

  if (!auth) return <AuthGate onAuth={onAuth} />;

  return (
    <React.Fragment>
      <window.MS.MSSubnav active="carte" />

      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · ta fiche</span>
          <h1>Ta carte de <span className="marker">coureur</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">
              Qui tu es, ton niveau, tes distances, quand tu cours. De quoi te retrouver
              sur les sorties, former des groupes d'allure et faire les bonnes rencontres —
              c'est ça, l'esprit <strong>social run</strong>. Tu remplis, tu vois ta carte se
              construire à droite, tu l'enregistres — et tu la retrouves sur <strong>tous tes appareils</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          <div className="pf-layout">
            {/* ---- Formulaire ---- */}
            <div className="pf-form">
              <div className="pf-group">
                <h3 className="pf-group-h">01 · Identité</h3>
                <div className="pf-row2">
                  <Field label="Prénom"><input className="pf-input" value={p.prenom} onChange={(e) => set("prenom", e.target.value)} placeholder="Camille" /></Field>
                  <Field label="Surnom" hint="optionnel"><input className="pf-input" value={p.pseudo} onChange={(e) => set("pseudo", e.target.value)} placeholder="La Fusée" /></Field>
                </div>
                <div className="pf-row2">
                  <Field label="Secteur / ville"><input className="pf-input" value={p.ville} onChange={(e) => set("ville", e.target.value)} placeholder="Nice, Vieux-Nice…" /></Field>
                  <Field label="Adhésion">
                    <select className="pf-input" value={p.adhesion} onChange={(e) => set("adhesion", e.target.value)}>
                      {ADHESION.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Mon compte">
                  <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--muted)" }}>{auth.email}</span>
                    <button type="button" className="btn btn-sm" onClick={logout}>Déconnexion</button>
                  </div>
                  {sync && <div className="pf-note" style={{ marginTop: 6 }}>{sync}</div>}
                </Field>
                <div className="pf-row2">
                  <Field label="Ta photo" hint="optionnel">
                    <div className="pf-photo-row">
                      <div className={`pf-photo-prev ${p.photo ? "has" : ""}`}>{p.photo ? <img src={p.photo} alt="" /> : <span>{p.avatar}</span>}</div>
                      <div className="pf-photo-btns">
                        <label className="btn btn-sm">Choisir…<input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) resizeImage(f, (d) => set("photo", d)); }} /></label>
                        {p.photo && <button type="button" className="pf-reset" onClick={() => set("photo", "")}>Retirer</button>}
                      </div>
                    </div>
                  </Field>
                  <Field label="Ton totem" hint="ton symbole">
                    <div className="pf-avatars">
                      {AVATARS.map((a) => (
                        <button type="button" key={a} className={`pf-av ${p.avatar === a ? "on" : ""}`} onClick={() => set("avatar", a)}>{a}</button>
                      ))}
                    </div>
                  </Field>
                </div>
                {isOrga() ? (
                  <Field label="Rôle dans l'orga" hint="réservé au bureau">
                    <input className="pf-input" value={p.role} onChange={(e) => set("role", e.target.value)} placeholder="Fondateur & Président, Trésorier·ère, Orga…" />
                  </Field>
                ) : p.role ? (
                  <Field label="Rôle dans l'orga"><div className="pf-role-ro">★ {p.role} <em>· modifiable en accès orga</em></div></Field>
                ) : null}
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">02 · Ton trail</h3>
                <Field label="Niveau">
                  <div className="pf-levels">
                    {NIVEAUX.map((n) => (
                      <button type="button" key={n.v} className={`pf-level ${p.niveau === n.v ? "on" : ""}`} onClick={() => set("niveau", n.v)}>
                        <span className="pf-level-v">{n.v}</span>
                        <span className="pf-level-d">{n.d}</span>
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Distances préférées"><ChipToggle options={DISTANCES} value={p.distances} onToggle={(v) => toggle("distances", v)} /></Field>
                <Field label="Terrains de jeu"><ChipToggle options={TERRAINS} value={p.terrains} onToggle={(v) => toggle("terrains", v)} /></Field>
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">03 · Tes dispos</h3>
                <Field label="Jours où tu cours le plus">
                  <ChipToggle options={JOURS} value={p.jours} onToggle={(v) => toggle("jours", v)} getKey={(o) => o[0]} getLabel={(o) => o[1]} />
                </Field>
                <Field label="Moments"><ChipToggle options={MOMENTS} value={p.moments} onToggle={(v) => toggle("moments", v)} /></Field>
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">04 · Objectifs &amp; vibe</h3>
                <Field label="Ton objectif de la saison">
                  <input className="pf-input" value={p.objectif} onChange={(e) => set("objectif", e.target.value)} placeholder="Finir mon premier trail long, passer sous les 45' au 10k…" />
                </Field>
                <Field label="Courses visées" hint="optionnel">
                  <input className="pf-input" value={p.courses} onChange={(e) => set("courses", e.target.value)} placeholder="Marseille-Cassis, Trail du Mercantour…" />
                </Field>
                <Field label="Ta bio en une phrase">
                  <textarea className="pf-input pf-textarea" value={p.bio} maxLength={140} onChange={(e) => set("bio", e.target.value)} placeholder="Ce qui te fait courir, en 140 signes." />
                  <span className="pf-count">{p.bio.length}/140</span>
                </Field>
                <Field label="Trail to Techno" hint="ton rapport à l'after 🎶">
                  <div className="pf-techno">
                    {TECHNO.map((t) => (
                      <button type="button" key={t.v} className={`pf-tk ${p.techno === t.v ? "on" : ""}`} onClick={() => set("techno", t.v)}>
                        <span className="pf-tk-e">{t.e}</span>{t.v}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">05 · Tes liens</h3>
                <div className="pf-row2">
                  <Field label="Strava" hint="lien profil"><input className="pf-input" value={p.strava} onChange={(e) => set("strava", e.target.value)} placeholder="https://strava.com/athletes/…" /></Field>
                  <Field label="Instagram"><input className="pf-input" value={p.insta} onChange={(e) => set("insta", e.target.value)} placeholder="https://instagram.com/…" /></Field>
                </div>
              </div>
            </div>

            {/* ---- Aperçu collant ---- */}
            <aside className="pf-aside">
              <div className="pf-aside-sticky">
                <div className="pf-aside-lab">Aperçu · ta carte</div>
                <RunnerCard p={p} />
                <div className="pf-actions">
                  <button type="button" className="btn btn-primary" onClick={save}>{saved ? "✓ Enregistré" : "Enregistrer ma carte"}</button>
                  <button type="button" className="btn btn-sm" onClick={copy}>{copied ? "✓ Copié" : "Copier pour WhatsApp"}</button>
                  <button type="button" className="pf-reset" onClick={reset}>Réinitialiser</button>
                </div>
                <p className="pf-note">
                  Ta carte est reliée à <b>ton compte</b> : enregistre, et tu la retrouves (et la
                  modifies) depuis <b>n'importe quel appareil</b> en te connectant. Elle apparaît dans
                  <b> Les membres</b> et se met à jour pour toute la meute.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.PROFIL = { ProfilPage, RunnerCard };
