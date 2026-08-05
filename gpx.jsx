// Espace membre — Partage de traces GPX.
// Upload d'un fichier .gpx → parse (distance, D+, profil) → catégorie UTMB +
// difficulté → stockage (backend Cloudflare) → profil visuel + téléchargement.
// Le fichier brut est embarqué dans le champ `url` (JSON) : aucun changement de
// base nécessaire. Fonctionne en démo (localStorage) sinon.

const T = () => window.TTC_TRAIL;

// --- Profil altimétrique (SVG) ---------------------------------------------
const ElevProfile = ({ profile, eleMin, eleMax, h = 90 }) => {
  if (!profile || profile.length < 2) return null;
  const W = 480;
  const ds = profile.map((p) => p.d), es = profile.map((p) => p.e);
  const dMax = Math.max.apply(null, ds) || 1;
  const lo = eleMin != null ? eleMin : Math.min.apply(null, es);
  const hi = eleMax != null ? eleMax : Math.max.apply(null, es);
  const span = Math.max(1, hi - lo);
  const x = (d) => (d / dMax) * W;
  const y = (e) => h - ((e - lo) / span) * (h - 10) - 4;
  let line = "";
  profile.forEach((p, i) => { line += (i ? " L" : "M") + x(p.d).toFixed(1) + " " + y(p.e).toFixed(1); });
  const area = line + ` L${W} ${h} L0 ${h} Z`;
  return (
    <svg className="ms-elev" viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={area} className="ms-elev-fill" />
      <path d={line} className="ms-elev-line" fill="none" />
    </svg>
  );
};

const Diff = ({ km, dplus }) => {
  const d = T().difficulty(km, dplus);
  const cat = T().utmbCategory(km, dplus);
  return (
    <span className="ms-diff-wrap">
      <span className={`ms-diff ${d.cls}`}>{d.label}</span>
      {cat.code !== "—" && <span className="ms-cat" title={cat.full}>{cat.code}</span>}
    </span>
  );
};

// parse le champ url : soit un JSON {gpx,profile,link}, soit un lien simple (ancien)
function unpack(g) {
  let data = {};
  try { data = JSON.parse(g.url || "{}"); } catch (e) { data = { link: g.url }; }
  return data;
}
function downloadGpx(g) {
  const data = unpack(g);
  if (!data.gpx) { if (data.link) window.open(data.link, "_blank", "noopener"); return; }
  const blob = new Blob([data.gpx], { type: "application/gpx+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (g.name || "trace").replace(/[^\w\-]+/g, "_") + ".gpx";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

const GpxForm = ({ onAdd, onClose }) => {
  const [f, setF] = React.useState({ name: "", region: "", start_point: "", type: "Boucle", link: "" });
  const [parsed, setParsed] = React.useState(null); // {km,dplus,eleMin,eleMax,profile,gpx}
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setErr("Fichier trop lourd (max 3 Mo)."); return; }
    setBusy(true); setErr("");
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const r = T().parseGPX(text);
        setParsed({ ...r, gpx: text });
        setF((s) => ({ ...s, name: s.name || file.name.replace(/\.gpx$/i, "").replace(/[_-]+/g, " ") }));
      } catch (x) { setErr("Fichier GPX illisible."); }
      setBusy(false);
    };
    reader.readAsText(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !parsed) { setErr("Ajoute un fichier GPX et un nom."); return; }
    onAdd({
      name: f.name, region: f.region, start_point: f.start_point, type: f.type,
      distance_km: parsed.km, denivele_m: parsed.dplus,
      url: JSON.stringify({ gpx: parsed.gpx, profile: parsed.profile, eleMin: parsed.eleMin, eleMax: parsed.eleMax, link: f.link || "" }),
    });
  };

  return (
    <form className="ms-form" onSubmit={submit}>
      <label className="ms-gpx-drop">
        <input type="file" accept=".gpx,application/gpx+xml" onChange={onFile} style={{ display: "none" }} />
        <span className="em">⛰️</span>
        <span>{busy ? "Lecture…" : parsed ? "✓ GPX chargé — remplace" : "Choisir un fichier .gpx"}</span>
      </label>
      {err && <div className="ms-lock-err" style={{ marginTop: 8 }}>{err}</div>}

      {parsed && (
        <div className="ms-gpx-preview">
          <div className="ms-gpx-stats">
            <span><b>{parsed.km}</b> km</span>
            <span><b>{parsed.dplus}</b> m D+</span>
            {parsed.eleMin != null && <span>{parsed.eleMin}–{parsed.eleMax} m</span>}
            <span>km-effort <b>{T().kmEffort(parsed.km, parsed.dplus)}</b></span>
            <Diff km={parsed.km} dplus={parsed.dplus} />
          </div>
          <ElevProfile profile={parsed.profile} eleMin={parsed.eleMin} eleMax={parsed.eleMax} />
        </div>
      )}

      <div className="ms-form-grid" style={{ marginTop: 14 }}>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Nom de la trace</span>
          <input className="pf-input" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Boucle du Gelas" /></label>
        <label className="pf-field"><span className="pf-label">Région</span>
          <input className="pf-input" value={f.region} onChange={(e) => set("region", e.target.value)} placeholder="Mercantour" /></label>
        <label className="pf-field"><span className="pf-label">Lieu de départ</span>
          <input className="pf-input" value={f.start_point} onChange={(e) => set("start_point", e.target.value)} placeholder="Refuge de Nice" /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {["Boucle", "Aller-retour", "Point à point", "Trace libre"].map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
        <label className="pf-field"><span className="pf-label">Lien Strava/Komoot <em className="pf-hint">optionnel</em></span>
          <input type="url" className="pf-input" value={f.link} onChange={(e) => set("link", e.target.value)} placeholder="https://…" /></label>
      </div>
      <div className="ms-form-actions">
        <button type="button" className="btn" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn btn-primary" disabled={!parsed}>Publier la trace →</button>
      </div>
    </form>
  );
};

const GpxCard = ({ g }) => {
  const data = unpack(g);
  return (
    <div className="ms-gpx-card">
      <div className="ms-gpx-card-h">
        <div>
          <div className="ms-gpx-name">{g.name}</div>
          <div className="ms-gpx-meta">{[g.region, g.start_point, g.type].filter(Boolean).join(" · ")}</div>
        </div>
        <Diff km={g.distance_km} dplus={g.denivele_m} />
      </div>
      <ElevProfile profile={data.profile} eleMin={data.eleMin} eleMax={data.eleMax} />
      <div className="ms-gpx-card-f">
        <span className="ms-gpx-stats">
          <span><b>{g.distance_km}</b> km</span>
          <span><b>{g.denivele_m}</b> m D+</span>
          <span>km-eff. <b>{T().kmEffort(g.distance_km, g.denivele_m)}</b></span>
        </span>
        <span className="ms-gpx-actions">
          {data.link && <a className="ms-promo-link" href={data.link} target="_blank" rel="noopener">Strava ↗</a>}
          <button className="btn btn-sm btn-primary" onClick={() => downloadGpx(g)}>⬇ Télécharger</button>
        </span>
      </div>
    </div>
  );
};

const GpxPage = () => {
  const { items, setItems, state, reload, saveLocal } = window.MS.useCollection("/api/gpx", "ttc_gpx_demo");
  const [adding, setAdding] = React.useState(false);
  const [q, setQ] = React.useState("");
  const live = window.ttcConfigured();

  const add = async (g) => {
    if (live) { try { await window.ttcApi("/api/gpx", { method: "POST", body: g }); await reload(); } catch (e) { alert("Erreur (droits ?). Reconnecte-toi."); } }
    else { const next = [{ ...g, id: "loc" + Date.now(), created_at: new Date().toISOString() }, ...items]; setItems(next); saveLocal(next); }
    setAdding(false);
  };
  const filtered = items.filter((g) => !q || (g.name || "").toLowerCase().includes(q.toLowerCase()) || (g.region || "").toLowerCase().includes(q.toLowerCase()));

  return (
    <React.Fragment>
      <window.MS.MSSubnav active="gpx" />
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · traces</span>
          <h1>Les <span className="marker">traces</span> du club.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">Dépose ton fichier <strong>.gpx</strong> : on en tire le profil, le dénivelé et la catégorie. Les autres peuvent le <strong>télécharger</strong> et le charger dans leur montre.</p>
            <div className="adh-hero-cta"><button className="btn btn-primary" onClick={() => setAdding((v) => !v)}>+ Ajouter une trace</button></div>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <window.MS.MSDemo what="Le partage de GPX" />}
          {adding && <GpxForm onAdd={add} onClose={() => setAdding(false)} />}
          <div className="ms-gpx-toolbar">
            <input className="pf-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une trace…" />
          </div>
          {filtered.length === 0 && state !== "loading" && <div className="ms-empty">Aucune trace {q ? "trouvée" : "pour l'instant"}. <button className="btn btn-sm btn-primary" onClick={() => setAdding(true)}>Ajoute la première →</button></div>}
          <div className="ms-gpx-grid">
            {filtered.map((g, i) => <GpxCard key={g.id || i} g={g} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.GPX = { GpxPage };
