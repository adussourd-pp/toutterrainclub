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
async function downloadGpx(g) {
  const data = unpack(g);
  let text = data.gpx;
  // traces récentes : GPX gzippé en base64 (data.gpxz) → on décompresse
  if (!text && data.gpxz) { try { text = await T().gunzipFromB64(data.gpxz); } catch (e) { text = ""; } }
  if (!text) { if (data.link) window.open(data.link, "_blank", "noopener"); return; }
  const blob = new Blob([text], { type: "application/gpx+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (g.name || "trace").replace(/[^\w\-]+/g, "_") + ".gpx";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

// --- Petites aides ---------------------------------------------------------
const MOODS = ["✅", "🔥", "💪", "🥵", "😍", "🥶", "🏔️"]; // « je l'ai fait » + humeur
function timeAgo(iso) {
  const t = Date.parse(iso); if (!isFinite(t)) return "";
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  if (s < 60) return "à l'instant";
  const m = Math.round(s / 60); if (m < 60) return "il y a " + m + " min";
  const h = Math.round(m / 60); if (h < 24) return "il y a " + h + " h";
  const j = Math.round(h / 24); if (j < 31) return "il y a " + j + " j";
  return new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}
function shortPlace(s) {
  const a = s.address || {};
  const main = s.name || String(s.display_name || "").split(",")[0];
  const area = a.state || a.county || a.region || a.country || "";
  return area && area !== main ? main + " (" + area + ")" : main;
}
function mapsLink(g, data) {
  const p = data && data.place;
  if (p && p.lat != null && p.lon != null) return "https://www.google.com/maps/search/?api=1&query=" + p.lat + "," + p.lon;
  const q = [g.start_point, g.region].filter(Boolean).join(" ");
  return q ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q) : "";
}

// Recherche de lieu « type Maps » : autocomplétion OpenStreetMap / Nominatim
// (gratuit, sans clé). Débounce + résultats limités ; on récupère les
// coordonnées pour proposer ensuite un lien Google Maps.
const PlaceAutocomplete = ({ value, onChange, onPick, placeholder }) => {
  const [sugg, setSugg] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef(null);
  const seq = React.useRef(0);
  const search = (q) => {
    if (timer.current) clearTimeout(timer.current);
    if (!q || q.trim().length < 3) { setSugg([]); setOpen(false); setLoading(false); return; }
    const my = ++seq.current;
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&accept-language=fr&q=" + encodeURIComponent(q));
        const d = await r.json();
        if (my === seq.current) { setSugg(Array.isArray(d) ? d : []); setOpen(true); }
      } catch (e) { if (my === seq.current) setSugg([]); }
      if (my === seq.current) setLoading(false);
    }, 350);
  };
  return (
    <div className="ms-geo">
      <input className="pf-input" value={value} placeholder={placeholder || "Tape un lieu…"} autoComplete="off"
        onChange={(e) => { onChange(e.target.value); search(e.target.value); }}
        onFocus={() => { if (sugg.length) setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 160)} />
      {loading && <span className="ms-geo-spin" aria-hidden="true">⏳</span>}
      {open && sugg.length > 0 && (
        <ul className="ms-geo-list">
          {sugg.map((s) => (
            <li key={s.place_id} onMouseDown={(e) => { e.preventDefault(); const label = shortPlace(s); onChange(label); if (onPick) onPick({ lat: +s.lat, lon: +s.lon, label }); setOpen(false); }}>
              <span className="ms-geo-pin">📍</span>
              <span className="ms-geo-txt"><b>{shortPlace(s)}</b><em>{s.display_name}</em></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const GpxForm = ({ onAdd, onClose }) => {
  const [f, setF] = React.useState({ name: "", region: "", start_point: "", type: "Boucle", link: "", official: false, notes: "", place: null });
  const [parsed, setParsed] = React.useState(null); // {km,dplus,eleMin,eleMax,profile,gpx}
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Les exports Strava embarquent fréquence cardiaque, cadence, puissance,
    // horodatage… et pèsent parfois 20 Mo+. On lit le brut, on garde TOUS les
    // points du tracé (aucune perte), puis on compresse pour le stockage.
    if (file.size > 100 * 1024 * 1024) { setErr("Fichier trop lourd (max 100 Mo)."); return; }
    setBusy(true); setErr("");
    const guessName = file.name.replace(/\.gpx$/i, "").replace(/[_-]+/g, " ");
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const text = String(reader.result);
        const r = T().parseGPX(text); // stats (km, D+, profil) sur le fichier complet
        const packed = await T().packGPX(text, f.name.trim() || guessName);
        setParsed({ ...r, ...packed });
        setF((s) => ({ ...s, name: s.name || guessName }));
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
      url: JSON.stringify({ gpxz: parsed.gpxz, gpx: parsed.gpxz ? undefined : parsed.gpx, profile: parsed.profile, eleMin: parsed.eleMin, eleMax: parsed.eleMax, link: f.link || "", official: !!f.official, notes: f.notes || "", place: f.place || null }),
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
          {parsed.srcBytes && (
            <div className="ms-gpx-note">
              {parsed.full
                ? <>Trace optimisée : {(parsed.srcBytes / 1048576).toFixed(1)} Mo → {(parsed.storedBytes / 1048576).toFixed(2)} Mo. <b>Tous les points ({parsed.points}) sont conservés</b> — seules les données superflues (fréquence cardiaque, cadence, horodatage) ont été retirées, puis le tracé est compressé.</>
                : <>Fichier très volumineux : ramené à {parsed.points} points pour tenir dans la limite ({(parsed.storedBytes / 1048576).toFixed(2)} Mo stockés).</>}
            </div>
          )}
        </div>
      )}

      <div className="ms-form-grid" style={{ marginTop: 14 }}>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Nom de la trace</span>
          <input className="pf-input" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Boucle du Gelas" /></label>
        <label className="pf-field"><span className="pf-label">Région / lieu <em className="pf-hint">recherche carte</em></span>
          <PlaceAutocomplete value={f.region} placeholder="Tape un massif, une ville…"
            onChange={(v) => setF((s) => ({ ...s, region: v, place: null }))}
            onPick={(p) => setF((s) => ({ ...s, region: p.label, place: p }))} /></label>
        <label className="pf-field"><span className="pf-label">Lieu de départ</span>
          <input className="pf-input" value={f.start_point} onChange={(e) => set("start_point", e.target.value)} placeholder="Refuge de Nice" /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {["Boucle", "Aller-retour", "Point à point", "Trace libre"].map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
        <label className="pf-field"><span className="pf-label">Lien Strava/Komoot <em className="pf-hint">optionnel</em></span>
          <input type="url" className="pf-input" value={f.link} onChange={(e) => set("link", e.target.value)} placeholder="https://…" /></label>
        <label className="pf-check" style={{ gridColumn: "1 / -1" }}>
          <input type="checkbox" checked={f.official} onChange={(e) => set("official", e.target.checked)} />
          <span>🏁 <b>Course officielle</b> — cette trace correspond au parcours d'une course</span>
        </label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Infos en plus <em className="pf-hint">optionnel</em></span>
          <textarea className="pf-input" rows={3} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Ravito, points d'eau, passages techniques, meilleure saison…" /></label>
      </div>
      <div className="ms-form-actions">
        <button type="button" className="btn" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn btn-primary" disabled={!parsed}>Publier la trace →</button>
      </div>
    </form>
  );
};

// --- Formulaire d'édition d'une trace (métadonnées + infos en plus) --------
const GpxEdit = ({ g, data, onSave, onCancel }) => {
  const [d, setD] = React.useState({
    name: g.name || "", region: g.region || "", start_point: g.start_point || "", type: g.type || "Boucle",
    link: data.link || "", official: !!data.official, notes: data.notes || "", place: data.place || null,
  });
  const [busy, setBusy] = React.useState(false);
  const set = (k, v) => setD((s) => ({ ...s, [k]: v }));
  const save = async (e) => { e.preventDefault(); setBusy(true); try { await onSave(d); } catch (x) {} setBusy(false); };
  return (
    <form className="ms-gpx-edit" onSubmit={save}>
      <div className="ms-form-grid">
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Nom</span>
          <input className="pf-input" value={d.name} onChange={(e) => set("name", e.target.value)} /></label>
        <label className="pf-field"><span className="pf-label">Région / lieu <em className="pf-hint">recherche carte</em></span>
          <PlaceAutocomplete value={d.region} onChange={(v) => setD((s) => ({ ...s, region: v, place: null }))} onPick={(p) => setD((s) => ({ ...s, region: p.label, place: p }))} /></label>
        <label className="pf-field"><span className="pf-label">Lieu de départ</span>
          <input className="pf-input" value={d.start_point} onChange={(e) => set("start_point", e.target.value)} /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={d.type} onChange={(e) => set("type", e.target.value)}>
            {["Boucle", "Aller-retour", "Point à point", "Trace libre"].map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
        <label className="pf-field"><span className="pf-label">Lien Strava/Komoot <em className="pf-hint">optionnel</em></span>
          <input type="url" className="pf-input" value={d.link} onChange={(e) => set("link", e.target.value)} placeholder="https://…" /></label>
        <label className="pf-check" style={{ gridColumn: "1 / -1" }}>
          <input type="checkbox" checked={d.official} onChange={(e) => set("official", e.target.checked)} />
          <span>🏁 <b>Course officielle</b></span>
        </label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Infos en plus</span>
          <textarea className="pf-input" rows={3} value={d.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Ravito, points d'eau, passages techniques, meilleure saison…" /></label>
      </div>
      <div className="ms-form-actions">
        <button type="button" className="btn btn-sm" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn btn-sm btn-primary" disabled={busy}>{busy ? "…" : "Enregistrer"}</button>
      </div>
    </form>
  );
};

const GpxCard = ({ g, me, live, onEdit, onDone, onComment, onDeleteComment, onDelete }) => {
  const data = unpack(g);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [mood, setMood] = React.useState(false);
  const [ctext, setCtext] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const done = g.done || [];
  const mine = g.done_me || "";
  const comments = g.comments || [];
  const maps = mapsLink(g, data);

  const toggleDone = () => { if (mine) onDone(g.id, null); else setMood((v) => !v); };
  const pickMood = (e) => { setMood(false); onDone(g.id, e); };
  const sendComment = async (e) => { e.preventDefault(); const t = ctext.trim(); if (!t) return; setSending(true); try { await onComment(g.id, t); setCtext(""); } catch (x) {} setSending(false); };
  const saveEdit = async (patch) => { await onEdit(g.id, patch); setEditing(false); };

  return (
    <div className="ms-gpx-card">
      <div className="ms-gpx-card-h">
        <div>
          <div className="ms-gpx-name">{data.official && <span className="ms-official">🏁 Course officielle</span>}{g.name}</div>
          <div className="ms-gpx-meta">{[g.region, g.start_point, g.type].filter(Boolean).join(" · ")}</div>
        </div>
        <div className="ms-gpx-right">
          <Diff km={g.distance_km} dplus={g.denivele_m} />
          <div className="ms-race-actions">
            <button className="ms-race-edit" title="Modifier la trace" onClick={() => setEditing(true)}>✏️</button>
            {onDelete && <button className="ms-race-del" title="Supprimer la trace" onClick={() => onDelete(g)}>🗑</button>}
          </div>
        </div>
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

      {/* Barre sociale : « je l'ai fait » + accès commentaires / édition */}
      <div className="ms-social">
        <div className="ms-done">
          <button className={"ms-done-btn" + (mine ? " on" : "")} onClick={toggleDone} title={mine ? "Annuler" : "Marquer comme fait"}>
            <span className="ms-done-em">{mine || "✅"}</span>{mine ? "Je l'ai fait" : "Je l'ai fait ?"}
          </button>
          {done.length > 0 && (
            <span className="ms-done-people">
              <span className="ms-done-avatars">{done.slice(0, 6).map((d, i) => <span key={i} className="ms-done-av" title={d.name + (d.emoji ? " " + d.emoji : "")}>{d.avatar}</span>)}</span>
              <b>{g.done_count || done.length}</b> {(g.done_count || done.length) > 1 ? "l'ont fait" : "l'a fait"}
            </span>
          )}
          {mood && <div className="ms-mood">{MOODS.map((e) => <button key={e} type="button" onClick={() => pickMood(e)}>{e}</button>)}</div>}
        </div>
        <div className="ms-social-links">
          {maps && <a className="ms-social-link" href={maps} target="_blank" rel="noopener">📍 Maps</a>}
          <button className="ms-social-link" onClick={() => setOpen((v) => !v)}>💬 {comments.length || ""} {open ? "▲" : "▼"}</button>
        </div>
      </div>

      {editing && (
        <div className="me-backdrop" onClick={() => setEditing(false)}>
          <div className="me-modal me-modal-wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="me-close" onClick={() => setEditing(false)} aria-label="Fermer">×</button>
            <div className="ms-race-edit-h">Modifier « {g.name} »</div>
            <GpxEdit g={g} data={data} onSave={saveEdit} onCancel={() => setEditing(false)} />
          </div>
        </div>
      )}

      {open && (
        <div className="ms-gpx-detail">
          {data.notes && <div className="ms-gpx-notes">{data.notes}</div>}

          <div className="ms-cmts">
            {comments.length === 0 && <div className="ms-cmts-empty">Sois le premier à laisser un mot 👋</div>}
            {comments.map((c) => (
              <div className="ms-cmt" key={c.id}>
                <span className="ms-cmt-av">{c.avatar}</span>
                <div className="ms-cmt-body">
                  <div className="ms-cmt-head"><b>{c.name}</b><span className="ms-cmt-time">{timeAgo(c.created_at)}</span>{c.mine && <button className="ms-cmt-del" title="Supprimer" onClick={() => onDeleteComment(g.id, c.id)}>✕</button>}</div>
                  <div className="ms-cmt-txt">{c.text}</div>
                </div>
              </div>
            ))}
            <form className="ms-cmt-form" onSubmit={sendComment}>
              <span className="ms-cmt-av">{me.avatar}</span>
              <input className="pf-input" value={ctext} maxLength={1000} onChange={(e) => setCtext(e.target.value)} placeholder="Ajoute un commentaire…" />
              <button className="btn btn-sm btn-primary" disabled={sending || !ctext.trim()}>{sending ? "…" : "Envoyer"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const DIST_BANDS = [["", "Toutes distances"], ["<10", "Moins de 10 km"], ["10-25", "10 – 25 km"], ["25-45", "25 – 45 km"], ["45+", "45 km et +"]];
const DIFFS = ["Facile", "Modéré", "Soutenu", "Difficile", "Extrême"];
function inBand(km, band) {
  km = Number(km) || 0;
  if (band === "<10") return km < 10;
  if (band === "10-25") return km >= 10 && km < 25;
  if (band === "25-45") return km >= 25 && km < 45;
  if (band === "45+") return km >= 45;
  return true;
}

const GpxPage = () => {
  const { items, setItems, state, reload, saveLocal } = window.MS.useCollection("/api/gpx", "ttc_gpx_demo");
  const [adding, setAdding] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [dist, setDist] = React.useState("");
  const [diff, setDiff] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [officialOnly, setOfficialOnly] = React.useState(false);
  const live = window.ttcConfigured();
  const [me, setMe] = React.useState({ id: "local", name: "Toi", avatar: "🙂" });

  React.useEffect(() => {
    if (!live) return;
    const a = window.ttcAuth.get();
    if (!a || !a.id) return;
    window.ttcApi("/api/members?id=" + encodeURIComponent(a.id))
      .then((d) => { const m = d.member || {}; setMe({ id: a.id, name: m.prenom || m.pseudo || "Toi", avatar: m.avatar || "🙂" }); })
      .catch(() => setMe({ id: a.id, name: "Toi", avatar: "🙂" }));
  }, [live]);

  const add = async (g) => {
    if (live) { try { await window.ttcApi("/api/gpx", { method: "POST", body: g }); await reload(); } catch (e) { alert(apiErr(e)); } }
    else { const next = [{ ...g, id: "loc" + Date.now(), created_at: new Date().toISOString() }, ...items]; setItems(next); saveLocal(next); }
    setAdding(false);
  };

  // Actions sociales — live via l'API, sinon mutation locale (mode démo).
  const apiErr = (e) => {
    const code = e && e.message ? e.message : "inconnu";
    if (code.indexOf("404") >= 0) return "Action impossible — le serveur n'est pas encore à jour.\nLe Worker Cloudflare doit être redéployé (colle backend/src/index.js dans le dashboard → Deploy).";
    if (code.indexOf("401") >= 0) return "Session expirée — reconnecte-toi.";
    return "Action impossible — code : " + code;
  };
  const post = async (path, body) => { try { await window.ttcApi(path, { method: "POST", body: body || {} }); await reload(); } catch (e) { alert(apiErr(e)); } };
  const mutate = (id, fn) => { const next = items.map((g) => (g.id === id ? fn({ ...g }) : g)); setItems(next); saveLocal(next); };

  const onEdit = (id, patch) => live ? post("/api/gpx/" + id + "/edit", patch) : mutate(id, (g) => {
    const nd = { ...unpack(g) };
    if (patch.link !== undefined) nd.link = patch.link;
    if (patch.official !== undefined) nd.official = patch.official;
    if (patch.notes !== undefined) nd.notes = patch.notes;
    if (patch.place !== undefined) nd.place = patch.place;
    return { ...g, name: patch.name != null ? patch.name : g.name, region: patch.region != null ? patch.region : g.region, start_point: patch.start_point != null ? patch.start_point : g.start_point, type: patch.type != null ? patch.type : g.type, url: JSON.stringify(nd) };
  });
  const onDone = (id, emoji) => live ? post("/api/gpx/" + id + "/done", emoji ? { done: true, emoji } : { done: false }) : mutate(id, (g) => {
    let done = (g.done || []).filter((d) => d.member_id !== me.id);
    if (emoji) done = [...done, { member_id: me.id, emoji, name: me.name, avatar: me.avatar }];
    return { ...g, done, done_count: done.length, done_me: emoji || "" };
  });
  const onComment = (id, text) => live ? post("/api/gpx/" + id + "/comment", { text }) : mutate(id, (g) => ({ ...g, comments: [...(g.comments || []), { id: "lc" + Date.now(), member_id: me.id, text, created_at: new Date().toISOString(), name: me.name, avatar: me.avatar, mine: true }] }));
  const onDeleteComment = (id, cid) => live ? post("/api/gpx/" + id + "/comment/" + cid + "/delete", {}) : mutate(id, (g) => ({ ...g, comments: (g.comments || []).filter((c) => c.id !== cid) }));
  const onDelete = async (g) => {
    if (!window.confirm(`Supprimer la trace « ${g.name} » ? C'est définitif.`)) return;
    if (live) { try { await window.ttcApi("/api/gpx/" + g.id + "/delete", { method: "POST", body: {} }); await reload(); } catch (e) { alert(apiErr(e)); } }
    else { const next = items.filter((x) => x.id !== g.id); setItems(next); saveLocal(next); }
  };

  const regions = [...new Set(items.map((g) => (g.region || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr"));
  const filtered = items.filter((g) => {
    const okQ = !q || (g.name || "").toLowerCase().includes(q.toLowerCase()) || (g.region || "").toLowerCase().includes(q.toLowerCase());
    const okDist = inBand(g.distance_km, dist);
    const okDiff = !diff || T().difficulty(g.distance_km, g.denivele_m).label === diff;
    const okReg = !region || (g.region || "").trim() === region;
    const okOff = !officialOnly || unpack(g).official;
    return okQ && okDist && okDiff && okReg && okOff;
  });
  const anyFilter = q || dist || diff || region || officialOnly;
  const clearFilters = () => { setQ(""); setDist(""); setDiff(""); setRegion(""); setOfficialOnly(false); };

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
            <input className="pf-input ms-gpx-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une trace…" />
            <select className="pf-input" value={dist} onChange={(e) => setDist(e.target.value)}>
              {DIST_BANDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select className="pf-input" value={diff} onChange={(e) => setDiff(e.target.value)}>
              <option value="">Toutes difficultés</option>
              {DIFFS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="pf-input" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Toutes régions</option>
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button type="button" className={`btn btn-sm ms-off-toggle ${officialOnly ? "on" : ""}`} onClick={() => setOfficialOnly((v) => !v)}>🏁 Officielles</button>
            {anyFilter && <button type="button" className="btn btn-sm" onClick={clearFilters}>✕ Filtres</button>}
          </div>
          {(anyFilter || filtered.length > 0) && <div className="ms-gpx-count">{filtered.length} trace{filtered.length > 1 ? "s" : ""}{anyFilter ? " · filtré" : ""}</div>}
          {filtered.length === 0 && state !== "loading" && <div className="ms-empty">Aucune trace {anyFilter ? "ne correspond aux filtres" : "pour l'instant"}. {anyFilter ? <button className="btn btn-sm" onClick={clearFilters}>Réinitialiser</button> : <button className="btn btn-sm btn-primary" onClick={() => setAdding(true)}>Ajoute la première →</button>}</div>}
          <div className="ms-gpx-grid">
            {filtered.map((g, i) => <GpxCard key={g.id || i} g={g} me={me} live={live} onEdit={onEdit} onDone={onDone} onComment={onComment} onDeleteComment={onDeleteComment} onDelete={onDelete} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.GPX = { GpxPage };
