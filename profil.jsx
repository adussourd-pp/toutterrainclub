// Espace membre — Ma carte de coureur.
// Grille de niveaux « L'aventure de la meute TTC » : progression trail (animaux)
// + progression Trail to Techno (grades). Le TOTEM découle du niveau trail.
// Aperçu de la carte collant à droite (suit au scroll). Sauvegarde compte + serveur.

const PF_KEY = "ttc_profile_v1";

// --- L'aventure de la meute : niveaux trail (animaux) ----------------------
const TRAIL_RANKS = [
  { lvl: 1, e: "🐣", v: "Poussin des sentiers", d: "Sortie d'œuf ! Tu découvres le grand air." },
  { lvl: 5, e: "🐰", v: "Lapin de garenne", d: "L'agilité arrive, tu cavales sur les sentiers." },
  { lvl: 10, e: "🦊", v: "Renard rusé", d: "Tu connais les bons coins et les meilleures traces GPX." },
  { lvl: 15, e: "🐺", v: "Loup arpenteur", d: "Un pilier du clan, tu mènes la meute." },
  { lvl: 25, e: "🐗", v: "Vrai Sanglier", d: "Détermination brute. Le totem du club !" },
  { lvl: 40, e: "🦌", v: "Grand Cerf Majestueux", d: "La classe sauvage, puissant et rapide." },
  { lvl: 70, e: "🐐", v: "Chamois bondissant", d: "Plus c'est raide, plus tu aimes ça." },
  { lvl: 85, e: "🐻", v: "Grizzly des sommets", d: "Le patron, puissant et respecté." },
  { lvl: 100, e: "🦅", v: "Aigle Royal", d: "L'élite. Une légende vivante qui survole les cimes." },
];
// --- Niveaux Trail to Techno (grades) --------------------------------------
const MUSIC_RANKS = [
  { lvl: 1, e: "👟", v: "Petit tapeur de pied", d: "Tu bouges discrètement au fond." },
  { lvl: 5, e: "🕺", v: "Danseur de buffet", d: "Là pour le lien social (et le ravito)." },
  { lvl: 10, e: "🎧", v: "Amateur de BPM", d: "Toujours à la recherche du bon set." },
  { lvl: 15, e: "🔊", v: "Chasseur de caissons", d: "On te trouve collé aux enceintes." },
  { lvl: 25, e: "🔥", v: "Maxi Teufeur", d: "Le moteur de l'ambiance du club." },
  { lvl: 40, e: "🔨", v: "Briseur de semelles", d: "Tes chaussures de trail sur le dancefloor." },
  { lvl: 70, e: "🔋", v: "Machine à Techno", d: "Infatigable, du départ à l'aube." },
  { lvl: 85, e: "🧙", v: "Chaman des platines", d: "Le gardien du bon son." },
  { lvl: 95, e: "🌅", v: "Légende de l'After", d: "Le dernier debout, toujours avec le sourire." },
  { lvl: 100, e: "👑", v: "Dieu de la Rave", d: "Le grade ultime des nuits T2T." },
];
const trailRank = (name) => TRAIL_RANKS.find((r) => r.v === name) || TRAIL_RANKS[0];
const musicRank = (name) => MUSIC_RANKS.find((r) => r.v === name) || MUSIC_RANKS[0];

// Questionnaire d'affinités → rôles affichés sur la carte (réponds « oui »).
const AFFINITES = [
  { role: "Ultra trailer", e: "🏃", q: "Ultra trailer ?" },
  { role: "Cycliste / gravel", e: "🚴", q: "Cycliste / gravel ?" },
  { role: "Skieur / Snow", e: "🎿", q: "Ski · Snow ?" },
  { role: "Teufeur", e: "🪩", q: "Teuf ?" },
  { role: "Grimpeur", e: "🧗", q: "Grimpe / escalade ?" },
  { role: "Nageur / eau libre", e: "🏊", q: "Nage / eau libre ?" },
];
const affinite = (role) => AFFINITES.find((a) => a.role === role);
const ACTIVITES = ["⛰️ Trail", "🚴 Vélo-gravel", "🥾 Rando", "🤝 Rencontrer du monde", "💬 Partager des conseils", "🌍 Événements de la commu"];
// Les formats du club qui comptent le plus pour toi (plusieurs choix).
const FORMATS = ["Lundi trail", "Jeudi trail", "Happy trail", "La Pause", "Partage ta sortie", "Team Course", "Les Challenges", "Événements Trail to Techno", "Collabs / testing matériel", "Sorties longues du week-end"];

const DISTANCES = ["5–10 km", "10–20 km", "Trail court (<25)", "Trail long (25–45)", "Ultra (45+)", "Route", "Piste / fractionné"];
const TERRAINS = ["Sentier", "Montagne", "Technique", "Route", "Bord de mer", "Nuit / aube"];
const JOURS = [["L","Lundi"],["M","Mardi"],["Me","Mercredi"],["J","Jeudi"],["V","Vendredi"],["S","Samedi"],["D","Dimanche"]];
const MOMENTS = ["Tôt le matin", "Pause midi", "Après le taf", "Week-end"];
const ADHESION = ["Sympathisant", "Don de soutien", "Adhérent", "Adhérent + Licence FFA"];

const EMPTY = {
  prenom: "", pseudo: "", ville: "Nice", avatar: "🐣", photo: "", photoConsent: false, role: "", email: "", tel: "",
  showEmail: false, showTel: false,
  niveau: "Poussin des sentiers", distances: [], terrains: [],
  tags: [], activites: [], formats: [], objectif: "", courses: "", bio: "",
  strava: "", insta: "", techno: "Petit tapeur de pied", adhesion: "Adhérent",
};

// Le totem découle toujours du niveau trail. On nettoie aussi les rôles :
// migration d'anciens noms + dédoublonnage + on ne garde que les rôles valides.
function normalize(p) {
  p.avatar = trailRank(p.niveau).e;
  if (Array.isArray(p.tags)) {
    // on ne garde QUE les rôles valides (les anciens tags, ex. « Teuffeur », disparaissent)
    const valid = AFFINITES.map((a) => a.role);
    p.tags = [...new Set(p.tags.filter((t) => valid.includes(t)))];
  }
  return p;
}

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PF_KEY);
    if (!raw) return { ...EMPTY };
    return normalize({ ...EMPTY, ...JSON.parse(raw) });
  } catch (e) { return { ...EMPTY }; }
};

const isOrga = () => { try { return sessionStorage.getItem("ttc_orga_ok") === "1"; } catch (e) { return false; } };

// Reconstruit une carte à partir d'un enregistrement serveur.
function fromServer(m) {
  const t = (m.terrains && typeof m.terrains === "object" && !Array.isArray(m.terrains)) ? m.terrains : {};
  // Contact (tél/mail) : envoyé à part par le serveur (present seulement si visible,
  // ou complet quand c'est ta propre fiche). Les interrupteurs peuvent être absents.
  const c = (m.contact && typeof m.contact === "object") ? m.contact : {};
  return normalize({
    ...EMPTY,
    prenom: m.prenom || "", pseudo: m.pseudo || "", ville: m.ville || "",
    niveau: m.niveau || "Poussin des sentiers", objectif: m.objectif || "", strava: m.strava || "", insta: m.insta || "",
    techno: m.techno || "Petit tapeur de pied", adhesion: m.adhesion || "Adhérent",
    distances: Array.isArray(m.distances) ? m.distances : [],
    terrains: Array.isArray(t.t) ? t.t : [], photo: t.photo || "", photoConsent: !!t.photoConsent, role: t.role || "",
    courses: t.courses || "", bio: t.bio || "",
    tel: c.tel || "", email: c.email || "",
    showTel: c.showTel !== undefined ? !!c.showTel : !!c.tel,
    showEmail: c.showEmail !== undefined ? !!c.showEmail : !!c.email,
    tags: Array.isArray(t.tags) ? t.tags : [], activites: Array.isArray(t.activites) ? t.activites : [], formats: Array.isArray(t.formats) ? t.formats : [],
  });
}

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
        <button type="button" key={k} className={`pf-chip ${on ? "on" : ""}`} aria-pressed={on} onClick={() => onToggle(k)}>
          {getLabel ? getLabel(o) : o}
        </button>
      );
    })}
  </div>
);

// Grille de niveaux (l'aventure de la meute).
const RankGrid = ({ ranks, value, onPick }) => (
  <div className="pf-ranks">
    {ranks.map((r) => (
      <button type="button" key={r.v} className={`pf-rank ${value === r.v ? "on" : ""}`} onClick={() => onPick(r)} title={r.d}>
        <span className="pf-rank-e">{r.e}</span>
        <span className="pf-rank-v">{r.v}</span>
      </button>
    ))}
  </div>
);

// ---- Aperçu : la carte de coureur ----------------------------------------
const RunnerCard = ({ p, collapsed }) => {
  const name = p.prenom || p.pseudo || "Ton prénom";
  const handle = p.pseudo && p.prenom ? `« ${p.pseudo} »` : null;
  const tr = trailRank(p.niveau), mr = musicRank(p.techno);
  // Tél/mail : visibles si l'interrupteur est ON (éditeur) ou absent mais valeur
  // présente (la meute n'envoie déjà que ce qui est public).
  const telShown = p.tel && (p.showTel === undefined || p.showTel);
  const emailShown = p.email && (p.showEmail === undefined || p.showEmail);
  return (
    <div className="pf-card">
      {p.role && <div className="pf-card-role">★ {p.role}</div>}
      <div className="pf-card-top">
        {p.photo
          ? <div className="pf-avatar pf-avatar-photo"><img src={p.photo} alt="" /></div>
          : <div className="pf-avatar">{tr.e}</div>}
        <div className="pf-card-id">
          <div className="pf-card-name">{name} {handle && <span className="pf-card-handle">{handle}</span>}</div>
          <div className="pf-card-meta">
            <span>📍 {p.ville || "—"}</span>
          </div>
        </div>
      </div>

      {p.bio && <p className="pf-card-bio">« {p.bio} »</p>}

      <div className="pf-card-totems">
        <div className="pf-stat"><div className="pf-stat-k">Totem trail</div><div className="pf-stat-v pf-stat-sm">{tr.e} {tr.v}</div></div>
        <div className="pf-stat"><div className="pf-stat-k">Trail to Techno</div><div className="pf-stat-v pf-stat-sm">{mr.e} {mr.v}</div></div>
      </div>

      {p.tags.length > 0 && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Rôles / affinités</div>
          <div className="pf-card-tags">{p.tags.map((t) => { const a = affinite(t); return <span key={t} className="role">{a ? a.e + " " : ""}{t}</span>; })}</div>
        </div>
      )}
      {!collapsed && <React.Fragment>
      {p.activites.length > 0 && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Ses envies</div>
          <div className="pf-card-tags">{p.activites.map((d) => <span key={d} className="alt">{d}</span>)}</div>
        </div>
      )}

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
      {p.formats.length > 0 && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Formats préférés</div>
          <div className="pf-card-tags">{p.formats.map((d) => <span key={d}>{d}</span>)}</div>
        </div>
      )}
      {(p.objectif || p.courses) && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Objectif 2027</div>
          {p.objectif && <p className="pf-card-obj">{p.objectif}</p>}
          {p.courses && <p className="pf-card-obj muted">🎯 {p.courses}</p>}
        </div>
      )}

      {(telShown || emailShown) && (
        <div className="pf-card-block">
          <div className="pf-card-bk">Contact</div>
          <div className="pf-card-links">
            {telShown && <a href={`tel:${p.tel}`} className="chip muted">📞 {p.tel}</a>}
            {emailShown && <a href={`mailto:${p.email}`} className="chip muted">✉️ {p.email}</a>}
          </div>
        </div>
      )}

      {(p.strava || p.insta) && (
        <div className="pf-card-links">
          {p.strava && <a href={p.strava} target="_blank" rel="noopener" className="chip muted">Strava ↗</a>}
          {p.insta && <a href={p.insta} target="_blank" rel="noopener" className="chip muted">Instagram ↗</a>}
        </div>
      )}
      </React.Fragment>}
    </div>
  );
};

// ---- La page --------------------------------------------------------------
const ProfilPage = () => {
  const auth = window.ttcAuth.get(); // garanti par MSGate (porte unique = le compte)
  const [p, setP] = React.useState(loadProfile);
  const [saved, setSaved] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [sync, setSync] = React.useState("");

  const loadMine = React.useCallback(async (a) => {
    if (!a || !(window.ttcConfigured && window.ttcConfigured())) return;
    try {
      const d = await window.ttcApi("/api/members?id=" + encodeURIComponent(a.id));
      if (d && d.member) setP(fromServer(d.member));
    } catch (e) {}
  }, []);

  React.useEffect(() => { if (auth) loadMine(auth); /* eslint-disable-next-line */ }, []);

  const logout = () => { window.ttcAuth.logout(); try { localStorage.removeItem(PF_KEY); } catch (e) {} window.location.reload(); };

  const set = (k, v) => { setP((s) => ({ ...s, [k]: v })); setSaved(false); };
  const pickTrail = (r) => { setP((s) => ({ ...s, niveau: r.v, avatar: r.e })); setSaved(false); };
  const toggle = (k, v) => setP((s) => {
    const cur = s[k];
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    return { ...s, [k]: next };
  });

  const save = async () => {
    // RGPD : une photo n'est enregistrée/partagée que si le consentement est coché.
    if (p.photo && !p.photoConsent) {
      setSync("Pour enregistrer ta photo, coche la case de consentement — ou retire-la.");
      return;
    }
    try { localStorage.setItem(PF_KEY, JSON.stringify(p)); } catch (e) {}
    if (auth && window.ttcConfigured && window.ttcConfigured()) {
      setSync("Enregistrement…");
      try {
        await window.ttcApi("/api/members", { method: "POST", body: {
          prenom: p.prenom, pseudo: p.pseudo, ville: p.ville, avatar: p.avatar,
          niveau: p.niveau, objectif: p.objectif, strava: p.strava, insta: p.insta,
          techno: p.techno, adhesion: p.adhesion,
          distances: p.distances,
          terrains: { t: p.terrains, photo: p.photo, photoConsent: p.photoConsent, role: p.role, courses: p.courses, bio: p.bio, tags: p.tags, activites: p.activites, formats: p.formats, tel: p.tel, email: p.email, showTel: p.showTel, showEmail: p.showEmail },
        } });
        setSync("");
      } catch (e) { setSync("Échec de l'enregistrement en ligne (reconnecte-toi ?)."); }
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  // RGPD — droit à l'effacement : le membre supprime lui-même son compte.
  const deleteAccount = async () => {
    if (!window.confirm("Supprimer définitivement ton compte, ta carte et ta photo ? Cette action est irréversible et ton code d'accès sera désactivé.")) return;
    if (auth && window.ttcConfigured && window.ttcConfigured()) {
      setSync("Suppression en cours…");
      try {
        await window.ttcApi("/api/members/me/delete", { method: "POST", body: {} });
      } catch (e) { setSync("Échec de la suppression en ligne — écris à toutterrainclub@gmail.com."); return; }
    }
    try { localStorage.removeItem(PF_KEY); } catch (e) {}
    window.ttcAuth.logout();
    window.alert("Ton compte et tes données ont été supprimés. À bientôt !");
    window.location.href = "index.html";
  };

  const reset = () => {
    if (!window.confirm("Effacer ta carte et repartir de zéro ?")) return;
    try { localStorage.removeItem(PF_KEY); } catch (e) {}
    setP({ ...EMPTY });
  };

  const asText = () => {
    const L = [];
    const tr = trailRank(p.niveau), mr = musicRank(p.techno);
    const name = [p.prenom, p.pseudo && `« ${p.pseudo} »`].filter(Boolean).join(" ");
    L.push(`${tr.e} ${name || "—"} — carte TTC`);
    if (p.ville) L.push(`📍 ${p.ville}`);
    L.push(`Totem de meute : ${tr.v}`);
    if (p.distances.length) L.push(`Distances : ${p.distances.join(", ")}`);
    if (p.terrains.length) L.push(`Terrains : ${p.terrains.join(", ")}`);
    if (p.tags.length) L.push(`Rôles : ${p.tags.join(", ")}`);
    if (p.formats.length) L.push(`Formats : ${p.formats.join(", ")}`);
    if (p.objectif) L.push(`Objectif 2027 : ${p.objectif}`);
    if (p.courses) L.push(`🎯 Courses visées : ${p.courses}`);
    if (p.bio) L.push(`« ${p.bio} »`);
    L.push(`Trail to Techno : ${mr.e} ${mr.v}`);
    if (p.strava) L.push(`Strava : ${p.strava}`);
    if (p.insta) L.push(`Insta : ${p.insta}`);
    return L.join("\n");
  };

  const copy = async () => {
    const txt = asText();
    try { await navigator.clipboard.writeText(txt); setCopied(true); window.setTimeout(() => setCopied(false), 2600); }
    catch (e) { window.prompt("Copie ta carte (Ctrl/Cmd+C) :", txt); }
  };

  if (!auth) return null; // MSGate garantit déjà la connexion

  return (
    <React.Fragment>
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · ta fiche</span>
          <h1>Ta carte de <span className="marker">coureur</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">
              Qui tu es, ton <strong>totem de meute</strong>, tes distances, ton style Trail to Techno.
              Choisis l'animal qui te ressemble — c'est ton <strong>totem</strong>. Remplis à gauche, ta carte
              se construit à droite et te suit à l'écran, puis tu l'enregistres.
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
                <Field label="Secteur / ville"><input className="pf-input" value={p.ville} onChange={(e) => set("ville", e.target.value)} placeholder="Nice, Vieux-Nice…" /></Field>
                <Field label="Ta photo" hint="optionnel">
                  <div className="pf-photo-row">
                    <div className={`pf-photo-prev ${p.photo ? "has" : ""}`}>{p.photo ? <img src={p.photo} alt="" /> : <span>{trailRank(p.niveau).e}</span>}</div>
                    <div className="pf-photo-btns">
                      <label className="btn btn-sm">Choisir…<input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) resizeImage(f, (d) => set("photo", d)); }} /></label>
                      {p.photo && <button type="button" className="pf-reset" onClick={() => setP((s) => ({ ...s, photo: "", photoConsent: false }))}>Retirer</button>}
                    </div>
                  </div>
                  {p.photo && (
                    <label className="pf-consent">
                      <input type="checkbox" checked={p.photoConsent} onChange={(e) => set("photoConsent", e.target.checked)} />
                      <span>J'accepte que ma photo soit <strong>visible par les membres du club</strong> dans l'espace membre. Je peux la retirer à tout moment. <a href="confidentialite.html" target="_blank" rel="noopener">En savoir plus</a></span>
                    </label>
                  )}
                </Field>
                {isOrga() ? (
                  <Field label="Rôle dans l'orga" hint="réservé au bureau">
                    <input className="pf-input" value={p.role} onChange={(e) => set("role", e.target.value)} placeholder="Fondateur & Président, Trésorier·ère, Orga…" />
                  </Field>
                ) : p.role ? (
                  <Field label="Rôle dans l'orga"><div className="pf-role-ro">★ {p.role} <em>· modifiable en accès orga</em></div></Field>
                ) : null}
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">02 · Tes affinités <em className="pf-hint">réponds — ça t'attribue tes rôles</em></h3>
                <div className="pf-qs">
                  {AFFINITES.map((a) => {
                    const on = p.tags.includes(a.role);
                    return (
                      <button type="button" key={a.role} className={`pf-q ${on ? "on" : ""}`} onClick={() => toggle("tags", a.role)}>
                        <span className="pf-q-em">{a.e}</span>
                        <span className="pf-q-q">{a.q}</span>
                        <span className="pf-q-yes">{on ? "✓ Oui" : "Oui ?"}</span>
                      </button>
                    );
                  })}
                </div>
                <Field label="Ce que tu veux partager avec la meute"><ChipToggle options={ACTIVITES} value={p.activites} onToggle={(v) => toggle("activites", v)} /></Field>
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">03 · Ton totem de meute <em className="pf-hint">choisis ton animal — c'est ton totem sur la carte</em></h3>
                <RankGrid ranks={TRAIL_RANKS} value={p.niveau} onPick={pickTrail} />
                <Field label="Distances préférées"><ChipToggle options={DISTANCES} value={p.distances} onToggle={(v) => toggle("distances", v)} /></Field>
                <Field label="Terrains de jeu"><ChipToggle options={TERRAINS} value={p.terrains} onToggle={(v) => toggle("terrains", v)} /></Field>
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">04 · Ton style Trail to Techno <em className="pf-hint">côté soirée</em></h3>
                <RankGrid ranks={MUSIC_RANKS} value={p.techno} onPick={(r) => set("techno", r.v)} />
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">05 · Les formats qui comptent le plus <em className="pf-hint">plusieurs choix</em></h3>
                <ChipToggle options={FORMATS} value={p.formats} onToggle={(v) => toggle("formats", v)} />
              </div>

              <div className="pf-group">
                <h3 className="pf-group-h">06 · Objectifs &amp; liens</h3>
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
                <div className="pf-row2">
                  <Field label="Strava" hint="lien profil"><input className="pf-input" value={p.strava} onChange={(e) => set("strava", e.target.value)} placeholder="https://strava.com/athletes/…" /></Field>
                  <Field label="Instagram"><input className="pf-input" value={p.insta} onChange={(e) => set("insta", e.target.value)} placeholder="https://instagram.com/…" /></Field>
                </div>
                <div className="pf-row2">
                  <Field label="Téléphone" hint="optionnel">
                    <input className="pf-input" type="tel" value={p.tel} onChange={(e) => set("tel", e.target.value)} placeholder="06 12 34 56 78" />
                    <label className="pf-visib"><input type="checkbox" checked={p.showTel} onChange={(e) => set("showTel", e.target.checked)} /> Visible dans la meute</label>
                  </Field>
                  <Field label="E-mail" hint="optionnel">
                    <input className="pf-input" type="email" value={p.email} onChange={(e) => set("email", e.target.value)} placeholder="prenom@mail.com" />
                    <label className="pf-visib"><input type="checkbox" checked={p.showEmail} onChange={(e) => set("showEmail", e.target.checked)} /> Visible dans la meute</label>
                  </Field>
                </div>
              </div>
            </div>

            {/* ---- Aperçu collant (suit au scroll) ---- */}
            <aside className="pf-aside">
              <div className="pf-aside-sticky">
                <div className="pf-aside-lab">Aperçu · ta carte</div>
                <RunnerCard p={p} />
                <div className="pf-actions">
                  <button type="button" className="btn btn-primary" onClick={save}>{saved ? "✓ Enregistré" : "Enregistrer ma carte"}</button>
                  <button type="button" className="btn btn-sm" onClick={copy}>{copied ? "✓ Copié" : "Copier pour WhatsApp"}</button>
                  <button type="button" className="pf-reset" onClick={reset}>Réinitialiser</button>
                </div>
                <div className="pf-acct-line">
                  <span>Accès : <b>{auth.code || "connecté·e"}</b></span>
                  <button type="button" className="btn btn-sm" onClick={logout}>Déconnexion</button>
                </div>
                {sync && <div className="pf-note">{sync}</div>}
                <p className="pf-note">Enregistre, et tu retrouves ta carte depuis <b>n'importe quel appareil</b>. Elle apparaît dans <b>la meute</b> et se met à jour pour tout le monde.</p>
                <div className="pf-danger">
                  <button type="button" className="pf-danger-btn" onClick={deleteAccount}>Supprimer mon compte et mes données</button>
                  <p className="pf-note">Effacement définitif de ta carte, ta photo et tes contributions (droit à l'oubli). Voir la <a href="confidentialite.html" target="_blank" rel="noopener">politique de confidentialité</a>.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.PROFIL = { ProfilPage, RunnerCard, TRAIL_RANKS, MUSIC_RANKS, fromServer };
