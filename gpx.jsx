// Espace membre — Partage de traces GPX. Liste + ajout (lien vers la trace).
// Live via l'API Cloudflare, sinon mode démo (localStorage).

const GPX_TYPES = ["Boucle", "Aller-retour", "Point à point", "Trace libre"];

const GpxForm = ({ onAdd, onClose }) => {
  const [f, setF] = React.useState({ name: "", distance_km: "", denivele_m: "", region: "", start_point: "", type: "Boucle", url: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e) => { e.preventDefault(); if (!f.name.trim()) return; onAdd(f); };
  return (
    <form className="ms-form" onSubmit={submit}>
      <div className="ms-form-grid">
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Nom de la trace</span>
          <input className="pf-input" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Nice → Mont Chauve" autoFocus /></label>
        <label className="pf-field"><span className="pf-label">Distance (km)</span>
          <input type="number" className="pf-input" value={f.distance_km} onChange={(e) => set("distance_km", e.target.value)} placeholder="18" /></label>
        <label className="pf-field"><span className="pf-label">Dénivelé D+ (m)</span>
          <input type="number" className="pf-input" value={f.denivele_m} onChange={(e) => set("denivele_m", e.target.value)} placeholder="750" /></label>
        <label className="pf-field"><span className="pf-label">Région</span>
          <input className="pf-input" value={f.region} onChange={(e) => set("region", e.target.value)} placeholder="Alpes-Maritimes" /></label>
        <label className="pf-field"><span className="pf-label">Lieu de départ</span>
          <input className="pf-input" value={f.start_point} onChange={(e) => set("start_point", e.target.value)} placeholder="Port Lympia, Nice" /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {GPX_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
        <label className="pf-field"><span className="pf-label">Lien de la trace <em className="pf-hint">Strava, Komoot, GPX…</em></span>
          <input type="url" className="pf-input" value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://…" /></label>
      </div>
      <div className="ms-form-actions">
        <button type="button" className="btn" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn btn-primary">Ajouter la trace →</button>
      </div>
    </form>
  );
};

const GpxPage = () => {
  const { items, setItems, state, reload, saveLocal } = window.MS.useCollection("/api/gpx", "ttc_gpx_demo");
  const [adding, setAdding] = React.useState(false);
  const [q, setQ] = React.useState("");
  const live = window.ttcConfigured();

  const add = async (g) => {
    if (live) { try { await window.ttcApi("/api/gpx", { method: "POST", body: g }); await reload(); } catch (e) { alert("Erreur (droits ?)."); } }
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
            <p className="adh-hero-lede">Partage tes plus beaux parcours, retrouve ceux de la meute. Chaque trace pointe vers Strava / Komoot / un fichier GPX.</p>
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
          {filtered.length > 0 && (
            <div className="ms-cmp-wrap">
              <table className="ms-cmp ms-gpx-table">
                <thead><tr><th>Nom</th><th>Distance</th><th>D+</th><th>Région</th><th>Départ</th><th>Type</th><th></th></tr></thead>
                <tbody>
                  {filtered.map((g, i) => (
                    <tr key={g.id || i}>
                      <td className="dim" style={{ textTransform: "none" }}>{g.name}</td>
                      <td>{g.distance_km ? g.distance_km + " km" : "—"}</td>
                      <td>{g.denivele_m ? g.denivele_m + " m" : "—"}</td>
                      <td>{g.region || "—"}</td>
                      <td>{g.start_point || "—"}</td>
                      <td><span className="ms-dist-chip">{g.type || "Boucle"}</span></td>
                      <td>{g.url && <a className="ms-promo-link" href={g.url} target="_blank" rel="noopener">ouvrir ↗</a>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

window.GPX = { GpxPage };
