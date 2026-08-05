// Espace membre — Courses. Qui fait quoi sur les dossards (pas les runs hebdo).
// Chaque membre peut créer une course ou s'inscrire. Live via l'API Cloudflare,
// sinon mode démo (localStorage).

const RACE_TYPES = [["trail", "Trail"], ["route", "Route"], ["off", "Off / aventure (plusieurs jours)"], ["autre", "Autre"]];
const STATUSES = [["inscrit", "✅ Inscrit"], ["chaud", "🔥 Chaud"]];

// Nom d'affichage par défaut : depuis la carte de coureur si elle existe.
function myName() {
  try {
    const p = JSON.parse(localStorage.getItem("ttc_profile_v1") || "{}");
    return p.prenom || p.pseudo || "";
  } catch (e) { return ""; }
}
function mySocials() {
  try { const p = JSON.parse(localStorage.getItem("ttc_profile_v1") || "{}"); return { strava: p.strava || "", insta: p.insta || "" }; }
  catch (e) { return { strava: "", insta: "" }; }
}

// Commentaire + lien groupe WhatsApp de la course : rangés dans la colonne
// existante `created_by` (JSON) → persiste sans changer le Worker.
function raceMeta(race) {
  if (!race) return { commentaire: "", whatsapp: "" };
  if (race.commentaire != null || race.whatsapp != null) return { commentaire: race.commentaire || "", whatsapp: race.whatsapp || "" };
  try { const m = JSON.parse(race.created_by || "{}"); return { commentaire: m.commentaire || "", whatsapp: m.whatsapp || "" }; }
  catch (e) { return { commentaire: "", whatsapp: "" }; }
}

// Une distance est un objet {km, dplus}. (compat : anciennes valeurs = string)
function distLabel(d) { return typeof d === "string" ? d : `${d.km} km · ${d.dplus || 0} D+`; }
function distCat(d) { return typeof d === "string" ? null : window.TTC_TRAIL.utmbCategory(d.km, d.dplus).code; }
const Chips = ({ items, gpxList, onGpx }) => (
  <span className="ms-dist-chips">{(items || []).map((d, i) => {
    const c = distCat(d);
    const g = d && d.gpx_id ? (gpxList || []).find((x) => x.id === d.gpx_id) : null;
    return (
      <span key={i} className={`ms-dist-chip ${g ? "has-gpx" : ""}`}>
        {distLabel(d)}{c && c !== "—" ? <b className="ms-dist-cat"> {c}</b> : null}
        {g && onGpx && <button type="button" className="ms-dist-gpx" title="Profil & téléchargement du GPX" onClick={() => onGpx(g)}>🗺️</button>}
      </span>
    );
  })}</span>
);

// Champ « Lieu » avec autocomplétion d'adresse via OpenStreetMap (Photon).
// Gratuit, sans clé. On tape ≥ 3 lettres → suggestions ; on clique pour choisir.
function fmtPlace(p) {
  const parts = [p.name, [p.postcode, p.city].filter(Boolean).join(" "), p.state, p.country].filter(Boolean);
  return parts.filter((x, i) => parts.indexOf(x) === i).join(", ");
}
const LocationInput = ({ value, onChange, placeholder }) => {
  const [q, setQ] = React.useState(value || "");
  const [sugg, setSugg] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const boxRef = React.useRef(null);
  const tRef = React.useRef(null);
  React.useEffect(() => { setQ(value || ""); }, [value]);
  React.useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const search = (text) => {
    if (tRef.current) clearTimeout(tRef.current);
    if (!text || text.trim().length < 3) { setSugg([]); setOpen(false); return; }
    tRef.current = setTimeout(async () => {
      try {
        const res = await fetch("https://photon.komoot.io/api/?lang=fr&limit=5&q=" + encodeURIComponent(text));
        const data = await res.json();
        const items = (data.features || []).map((ft) => fmtPlace(ft.properties || {})).filter(Boolean);
        const uniq = items.filter((v, i) => items.indexOf(v) === i);
        setSugg(uniq); setOpen(uniq.length > 0); setActive(-1);
      } catch (e) { setSugg([]); setOpen(false); }
    }, 250);
  };
  const pick = (s) => { setQ(s); onChange(s); setOpen(false); setSugg([]); };
  const onKey = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, sugg.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (active >= 0) pick(sugg[active]); }
    else if (e.key === "Escape") { setOpen(false); }
  };
  return (
    <div className="ms-loc" ref={boxRef}>
      <input className="pf-input" value={q} placeholder={placeholder} autoComplete="off"
        onChange={(e) => { const v = e.target.value; setQ(v); onChange(v); search(v); }}
        onFocus={() => { if (sugg.length) setOpen(true); }} onKeyDown={onKey} />
      {open && (
        <ul className="ms-loc-list">
          {sugg.map((s, i) => (
            <li key={i} className={`ms-loc-item ${i === active ? "active" : ""}`}
                onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                onMouseEnter={() => setActive(i)}>📍 {s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Télécharge le .gpx d'une trace de la banque (par id) — même logique que la page GPX.
async function downloadGpxById(gpxList, id) {
  const g = (gpxList || []).find((x) => x.id === id);
  if (!g) return;
  let data = {}; try { data = JSON.parse(g.url || "{}"); } catch (e) { data = { link: g.url }; }
  let text = data.gpx;
  if (!text && data.gpxz) { try { text = await window.TTC_TRAIL.gunzipFromB64(data.gpxz); } catch (e) { text = ""; } }
  if (!text) { if (data.link) window.open(data.link, "_blank", "noopener"); return; }
  const blob = new Blob([text], { type: "application/gpx+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (g.name || "trace").replace(/[^\w\-]+/g, "_") + ".gpx";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

// Profil altimétrique (SVG) — mini version, comme la page GPX.
function ElevSVG({ profile, eleMin, eleMax, h = 92 }) {
  if (!profile || profile.length < 2) return null;
  const W = 480;
  const es = profile.map((p) => p.e), ds = profile.map((p) => p.d);
  const dMax = Math.max.apply(null, ds) || 1;
  const lo = eleMin != null ? eleMin : Math.min.apply(null, es);
  const hi = eleMax != null ? eleMax : Math.max.apply(null, es);
  const span = Math.max(1, hi - lo);
  const x = (d) => (d / dMax) * W, y = (e) => h - ((e - lo) / span) * (h - 10) - 4;
  let line = ""; profile.forEach((p, i) => { line += (i ? " L" : "M") + x(p.d).toFixed(1) + " " + y(p.e).toFixed(1); });
  const area = line + ` L${W} ${h} L0 ${h} Z`;
  return (
    <svg className="ms-elev" viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={area} className="ms-elev-fill" />
      <path d={line} className="ms-elev-line" fill="none" />
    </svg>
  );
}

// Popup profil d'un parcours (avec téléchargement du .gpx).
const GpxPopup = ({ gpx, onClose }) => {
  React.useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  let data = {}; try { data = JSON.parse(gpx.url || "{}"); } catch (e) {}
  const cat = window.TTC_TRAIL.utmbCategory(gpx.distance_km, gpx.denivele_m);
  const diff = window.TTC_TRAIL.difficulty(gpx.distance_km, gpx.denivele_m);
  return (
    <div className="me-backdrop" onClick={onClose}>
      <div className="me-modal me-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="me-close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="pf-card ms-gpx-pop">
          <div className="ms-gpx-name">⛰️ {gpx.name || "Parcours"}</div>
          <div className="ms-gpx-meta">
            <span><b>{gpx.distance_km}</b> km</span>
            <span><b>{gpx.denivele_m}</b> m D+</span>
            <span className={`ms-diff ${diff.cls}`}>{diff.label}</span>
            {cat.code !== "—" && <span className="ms-cat" title={cat.full}>{cat.code}</span>}
          </div>
          <ElevSVG profile={data.profile} eleMin={data.eleMin} eleMax={data.eleMax} />
          <div className="ms-gpx-pop-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => downloadGpxById([gpx], gpx.id)}>⬇ Télécharger le GPX</button>
            {data.link && <a className="btn btn-sm" href={data.link} target="_blank" rel="noopener">Strava/Komoot ↗</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contrôle par distance : associer une trace de la banque OU en uploader une.
// L'upload crée la trace dans la banque GPX (marquée « course officielle ») via
// l'endpoint /api/gpx existant — donc elle apparaît toute seule dans les Traces.
const DistGpxControl = ({ dist, raceName, gpxList, onSet, onUpload }) => {
  const [mode, setMode] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const current = dist.gpx_id ? (dist.gpx_name || ((gpxList || []).find((g) => g.id === dist.gpx_id) || {}).name || "trace") : "";

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) { setErr("Fichier trop lourd (max 100 Mo)."); return; }
    setBusy(true); setErr("");
    const guess = file.name.replace(/\.gpx$/i, "").replace(/[_-]+/g, " ");
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const text = String(reader.result);
        const r = window.TTC_TRAIL.parseGPX(text);
        const packed = await window.TTC_TRAIL.packGPX(text, guess);
        const name = (raceName ? raceName + " — " : "") + (dist.km ? dist.km + " km" : guess);
        const payload = {
          name, region: "", start_point: "", type: "Point à point",
          distance_km: r.km, denivele_m: r.dplus,
          url: JSON.stringify({ gpxz: packed.gpxz, gpx: packed.gpxz ? undefined : packed.gpx, profile: r.profile, eleMin: r.eleMin, eleMax: r.eleMax, link: "", official: true, notes: "", place: null, race: raceName || "" }),
        };
        const id = onUpload ? await onUpload(payload) : null;
        if (id) { onSet({ gpx_id: id, gpx_name: name }); setMode(""); }
        else setErr("Envoi impossible (reconnecte-toi ?).");
      } catch (x) { setErr("Fichier GPX illisible."); }
      setBusy(false);
    };
    reader.readAsText(file);
  };

  if (current) {
    return (
      <div className="ms-distgpx has">
        <span className="ms-distgpx-tag">⛰️ {current}</span>
        <button type="button" className="ms-distgpx-x" title="Retirer la trace" onClick={() => onSet({ gpx_id: "", gpx_name: "" })}>×</button>
      </div>
    );
  }
  return (
    <div className="ms-distgpx">
      {mode === "" && (
        <React.Fragment>
          {(gpxList || []).length > 0 && <button type="button" className="ms-distgpx-btn" onClick={() => setMode("pick")}>⛰️ Associer une trace</button>}
          <label className="ms-distgpx-btn">⬆ Uploader un GPX
            <input type="file" accept=".gpx,application/gpx+xml" onChange={onFile} style={{ display: "none" }} /></label>
        </React.Fragment>
      )}
      {mode === "pick" && (
        <React.Fragment>
          <select className="pf-input" defaultValue="" onChange={(e) => { const g = (gpxList || []).find((x) => x.id === e.target.value); if (g) { onSet({ gpx_id: g.id, gpx_name: g.name }); setMode(""); } }}>
            <option value="" disabled>Choisir dans la banque…</option>
            {(gpxList || []).map((g) => <option key={g.id} value={g.id}>{g.name} · {g.distance_km} km</option>)}
          </select>
          <button type="button" className="ms-distgpx-x" onClick={() => setMode("")}>×</button>
        </React.Fragment>
      )}
      {busy && <span className="ms-distgpx-busy">Lecture du GPX…</span>}
      {err && <span className="ms-distgpx-err">{err}</span>}
    </div>
  );
};

const RaceForm = ({ initial, gpxList, onUploadGpx, onSubmit, onClose }) => {
  const editing = !!(initial && initial.id);
  const meta0 = raceMeta(initial);
  const [f, setF] = React.useState({
    name: (initial && initial.name) || "",
    date_start: (initial && initial.date_start) || "",
    date_end: (initial && initial.date_end) || "",
    location: (initial && initial.location) || "",
    type: (initial && initial.type) || "trail",
    site_url: (initial && initial.site_url) || "",
    commentaire: meta0.commentaire,
    whatsapp: meta0.whatsapp,
  });
  const [dists, setDists] = React.useState(
    initial && Array.isArray(initial.distances) && initial.distances.length
      ? initial.distances.map((d) => (typeof d === "string" ? { km: "", dplus: "" } : { km: d.km, dplus: d.dplus, gpx_id: d.gpx_id || "", gpx_name: d.gpx_name || "" }))
      : [{ km: "", dplus: "" }]
  );
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const setD = (i, k, v) => setDists((a) => a.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const addD = () => setDists((a) => [...a, { km: "", dplus: "" }]);
  const rmD = (i) => setDists((a) => a.filter((_, j) => j !== i));
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    const distances = dists
      .filter((d) => String(d.km).trim() !== "")
      .map((d) => ({ km: Number(d.km) || 0, dplus: Number(d.dplus) || 0, ...(d.gpx_id ? { gpx_id: d.gpx_id, gpx_name: d.gpx_name || "" } : {}) }));
    const created_by = JSON.stringify({ commentaire: f.commentaire || "", whatsapp: f.whatsapp || "" });
    onSubmit({ name: f.name, date_start: f.date_start, date_end: f.date_end, location: f.location, type: f.type, site_url: f.site_url, distances, created_by, commentaire: f.commentaire || "", whatsapp: f.whatsapp || "" });
  };
  return (
    <form className="ms-form" onSubmit={submit}>
      <div className="ms-form-grid">
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Nom de la course</span>
          <input className="pf-input" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Nice by UTMB" autoFocus /></label>
        <label className="pf-field"><span className="pf-label">Date (début)</span>
          <input type="date" className="pf-input" value={f.date_start} onChange={(e) => set("date_start", e.target.value)} /></label>
        <label className="pf-field"><span className="pf-label">Date (fin, option)</span>
          <input type="date" className="pf-input" value={f.date_end} onChange={(e) => set("date_end", e.target.value)} /></label>
        <label className="pf-field"><span className="pf-label">Lieu</span>
          <LocationInput value={f.location} onChange={(v) => set("location", v)} placeholder="Tape une ville / lieu…" /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {RACE_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Site officiel</span>
          <input type="url" className="pf-input" value={f.site_url} onChange={(e) => set("site_url", e.target.value)} placeholder="https://…" /></label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Lien groupe WhatsApp <em className="pf-hint">team course</em></span>
          <input type="url" className="pf-input" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="https://chat.whatsapp.com/…" /></label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Commentaire <em className="pf-hint">infos, logistique, covoit…</em></span>
          <textarea className="pf-input pf-textarea" value={f.commentaire} onChange={(e) => set("commentaire", e.target.value)} placeholder="Ex : départ 6h, covoit depuis Nice, on dort au refuge la veille…" /></label>
      </div>

      <div className="ms-dist-editor">
        <div className="pf-label">Distances proposées <em className="pf-hint">km + D+ → catégorie UTMB auto</em></div>
        {dists.map((d, i) => {
          const cat = window.TTC_TRAIL.utmbCategory(d.km, d.dplus);
          return (
            <div className="ms-dist-block" key={i}>
              <div className="ms-dist-row">
                <input type="number" className="pf-input" value={d.km} onChange={(e) => setD(i, "km", e.target.value)} placeholder="km" />
                <input type="number" className="pf-input" value={d.dplus} onChange={(e) => setD(i, "dplus", e.target.value)} placeholder="D+ (m)" />
                <span className={`ms-cat ${cat.code === "—" ? "muted" : ""}`} title={cat.full}>{d.km ? cat.code : "—"}</span>
                {dists.length > 1 && <button type="button" className="ms-dist-rm" onClick={() => rmD(i)}>×</button>}
              </div>
              <DistGpxControl dist={d} raceName={f.name} gpxList={gpxList} onUpload={onUploadGpx}
                onSet={(patch) => setDists((a) => a.map((x, j) => (j === i ? { ...x, ...patch } : x)))} />
            </div>
          );
        })}
        <button type="button" className="btn btn-sm" onClick={addD}>+ Ajouter une distance</button>
      </div>

      <div className="ms-form-actions">
        <button type="button" className="btn" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn btn-primary">{editing ? "Enregistrer les modifications →" : "Ajouter la course →"}</button>
      </div>
    </form>
  );
};

const JoinForm = ({ race, onJoin, onClose }) => {
  const soc = mySocials();
  const first = (race.distances || [])[0];
  const [f, setF] = React.useState({ member: myName(), distance: first ? distLabel(first) : "", status: "inscrit", strava: soc.strava, insta: soc.insta });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e) => { e.preventDefault(); if (!f.member.trim()) return; onJoin(f); };
  return (
    <form className="ms-join" onSubmit={submit}>
      <input className="pf-input" value={f.member} onChange={(e) => set("member", e.target.value)} placeholder="Ton prénom" />
      {(race.distances || []).length > 0 && (
        <select className="pf-input" value={f.distance} onChange={(e) => set("distance", e.target.value)}>
          {(race.distances || []).map((d, i) => { const l = distLabel(d); const c = distCat(d); return <option key={i} value={l}>{l}{c && c !== "—" ? " · " + c : ""}</option>; })}
        </select>
      )}
      <select className="pf-input" value={f.status} onChange={(e) => set("status", e.target.value)}>
        {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
      <button type="submit" className="btn btn-primary btn-sm">Je participe</button>
      <button type="button" className="btn btn-sm" onClick={onClose}>×</button>
    </form>
  );
};

// Retrouve la carte de coureur d'un participant (match par prénom / pseudo).
function findMember(members, name) {
  const n = String(name || "").trim().toLowerCase();
  if (!n) return null;
  return (members || []).find((m) =>
    String(m.prenom || "").trim().toLowerCase() === n ||
    String(m.pseudo || "").trim().toLowerCase() === n
  ) || null;
}
// photo + rôle, que terrains soit un tableau (local) ou un objet {photo,role} (API).
function memberExt(m) {
  const t = m.terrains;
  const o = (t && !Array.isArray(t) && typeof t === "object") ? t : {};
  return { photo: m.photo || o.photo || "", role: m.role || o.role || "" };
}
// Popup : la carte de coureur — EXACTEMENT la même que dans la meute
// (window.PROFIL.RunnerCard dans le modal me-modal-card). Ouverte au clic sur une bulle.
const MemberPopup = ({ member, fallback, onClose }) => {
  React.useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  let p = null;
  if (member) {
    try { p = (window.PROFIL && window.PROFIL.fromServer) ? window.PROFIL.fromServer(member) : member; }
    catch (e) { p = member; }
  }
  const hasCard = !!(p && window.PROFIL && window.PROFIL.RunnerCard);
  return (
    <div className="me-backdrop" onClick={onClose}>
      <div className="me-modal me-modal-card" onClick={(ev) => ev.stopPropagation()}>
        <button type="button" className="me-close" onClick={onClose} aria-label="Fermer">×</button>
        {hasCard
          ? <window.PROFIL.RunnerCard p={p} />
          : (
            <div className="ms-mcard">
              <div className="ms-mcard-top">
                <span className="ms-mcard-av">🐗</span>
                <div>
                  <div className="ms-mcard-name">{(fallback && fallback.member) || "Coureur"}</div>
                  <div className="ms-mcard-sub">Pas encore de carte de coureur</div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

const RaceCard = ({ race, members, gpxList, onUploadGpx, onJoin, onLeave, onEdit, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  const [cardOf, setCardOf] = React.useState(null);
  const [gpxOf, setGpxOf] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const parts = race.participants || [];
  return (
    <div className="ms-race">
      <div className="ms-race-top">
        <div>
          <div className="ms-race-name">{race.name}</div>
          <div className="ms-race-meta">
            {fmtDate(race.date_start, race.date_end)}{race.location ? " · " + race.location : ""}
          </div>
          <div className="ms-race-links">
            {race.site_url && <a className="ms-race-site" href={race.site_url} target="_blank" rel="noopener">🔗 Site officiel <span aria-hidden="true">↗</span></a>}
            {raceMeta(race).whatsapp && <a className="ms-race-wa" href={raceMeta(race).whatsapp} target="_blank" rel="noopener">💬 Groupe WhatsApp <span aria-hidden="true">↗</span></a>}
          </div>
          {raceMeta(race).commentaire && <p className="ms-race-comment">{raceMeta(race).commentaire}</p>}
        </div>
        <div className="ms-race-right">
          <div className="ms-race-actions">
            {onEdit && <button className="ms-race-edit" title="Modifier la course" onClick={() => setEditing((v) => !v)}>✏️</button>}
            {onDelete && <button className="ms-race-del" title="Supprimer la course" onClick={() => onDelete(race)}>🗑</button>}
          </div>
        </div>
      </div>

      {(race.distances || []).length > 0 && (
        <div className="ms-race-parcours">
          <span className="ms-race-traces-h">⛰️ Parcours</span>
          <Chips items={race.distances} gpxList={gpxList} onGpx={setGpxOf} />
        </div>
      )}

      {editing && (
        <div className="ms-race-edit-wrap">
          <div className="ms-race-edit-h">Modifier « {race.name} »</div>
          <RaceForm initial={race} gpxList={gpxList} onUploadGpx={onUploadGpx} onClose={() => setEditing(false)} onSubmit={(data) => { onEdit(race, data); setEditing(false); }} />
        </div>
      )}

      <div className="ms-race-parts">
        <div className="ms-race-parts-h">
          <span>{parts.length} participant{parts.length > 1 ? "s" : ""}</span>
          {!open && <button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>Je participe ✋</button>}
        </div>
        {open && <JoinForm race={race} onClose={() => setOpen(false)} onJoin={(f) => { onJoin(race, f); setOpen(false); }} />}
        {parts.length > 0 && (
          <table className="ms-part-table">
            <tbody>
              {parts.map((p, i) => {
                const pm = findMember(members, p.member);
                const photo = pm ? memberExt(pm).photo : "";
                const av = (pm && pm.avatar) || "🐗";
                return (
                <tr key={p.id || i}>
                  <td className="ms-part-av">
                    <button className="ms-part-bubble" title={`${p.member} — voir la carte`} onClick={() => setCardOf(p)}>
                      {photo ? <img src={photo} alt={p.member} /> : <span>{av}</span>}
                    </button>
                  </td>
                  <td className="ms-part-dist">{p.distance}</td>
                  <td><span className={`ms-part-status ${p.status}`}>{p.status === "chaud" ? "🔥 Chaud" : "✅ Inscrit"}</span></td>
                  <td className="ms-part-x"><button title="Retirer" onClick={() => onLeave(race, p)}>×</button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {cardOf && <MemberPopup member={findMember(members, cardOf.member)} fallback={cardOf} onClose={() => setCardOf(null)} />}
      {gpxOf && <GpxPopup gpx={gpxOf} onClose={() => setGpxOf(null)} />}
    </div>
  );
};

function fmtDate(a, b) {
  if (!a) return "Date à venir";
  const f = (s) => { try { return new Date(s + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return s; } };
  return b && b !== a ? `${f(a)} → ${f(b)}` : f(a);
}

const CoursesPage = () => {
  const { items: races, setItems, state, reload, saveLocal } = window.MS.useCollection("/api/races", "ttc_races_demo");
  const { items: members } = window.MS.useCollection("/api/members", "ttc_members_demo_unused");
  const { items: gpxList, reload: reloadGpx } = window.MS.useCollection("/api/gpx", "ttc_gpx_demo");
  const [adding, setAdding] = React.useState(false);
  const live = window.ttcConfigured();

  // Upload d'un GPX depuis une course → crée la trace dans la banque et renvoie son id.
  const uploadGpx = async (payload) => {
    if (!live) return null;
    try { const r = await window.ttcApi("/api/gpx", { method: "POST", body: payload }); await reloadGpx(); return r && r.id; }
    catch (e) { console.error("upload gpx:", e); return null; }
  };

  const addRace = async (r) => {
    if (live) { try { await window.ttcApi("/api/races", { method: "POST", body: r }); await reload(); } catch (e) { alert("Erreur (droits ?). Reconnecte-toi."); } }
    else { const next = [...races, { ...r, id: "loc" + Date.now(), participants: [] }]; setItems(next); saveLocal(next); }
    setAdding(false);
  };
  const editRace = async (race, data) => {
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/update`, { method: "POST", body: data }); await reload(); } catch (e) { console.error("update race:", e); alert("Modification impossible — code : " + (e && e.message ? e.message : "inconnu") + "\n(api-404 = route /update absente sur le Worker · api-401 = pas connecté)"); } }
    else { const next = races.map((r) => r.id === race.id ? { ...r, ...data } : r); setItems(next); saveLocal(next); }
  };
  const joinRace = async (race, f) => {
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/join`, { method: "POST", body: f }); await reload(); } catch (e) { alert("Erreur d'inscription."); } }
    else { const next = races.map((r) => r.id === race.id ? { ...r, participants: [...(r.participants || []), { ...f, id: "p" + Date.now() }] } : r); setItems(next); saveLocal(next); }
  };
  const leaveRace = async (race, p) => {
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/leave`, { method: "POST", body: { participation_id: p.id, member: p.member } }); await reload(); } catch (e) {} }
    else { const next = races.map((r) => r.id === race.id ? { ...r, participants: (r.participants || []).filter((x) => x !== p) } : r); setItems(next); saveLocal(next); }
  };
  const deleteRace = async (race) => {
    if (!window.confirm(`Supprimer la course « ${race.name} » ? C'est définitif.`)) return;
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/delete`, { method: "POST", body: {} }); await reload(); } catch (e) { console.error("delete race:", e); alert("Suppression impossible — code : " + (e && e.message ? e.message : "inconnu") + "\n(api-404 = route absente sur le Worker · api-401 = pas connecté · api-500 = erreur serveur)"); } }
    else { const next = races.filter((r) => r.id !== race.id); setItems(next); saveLocal(next); }
  };

  return (
    <React.Fragment>
      <window.MS.MSSubnav active="calendrier" />
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · calendrier</span>
          <h1>Le <span className="marker">calendrier</span><br/>des courses.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">
              Les <strong>courses</strong> où l'on se retrouve — pas les runs hebdo (ceux-là restent sur WhatsApp).
              Crée une course, inscris-toi, vois qui est chaud. On fait bloc sur les dossards.
            </p>
            <div className="adh-hero-cta">
              <button className="btn btn-primary" onClick={() => setAdding((v) => !v)}>+ Ajouter une course</button>
            </div>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <window.MS.MSDemo what="Le suivi des courses" />}
          {adding && <RaceForm gpxList={gpxList} onUploadGpx={uploadGpx} onSubmit={addRace} onClose={() => setAdding(false)} />}
          {state === "loading" && <p className="ms-note-muted">Chargement…</p>}
          {races.length === 0 && state !== "loading" && (
            <div className="ms-empty">Aucune course pour l'instant. <button className="btn btn-sm btn-primary" onClick={() => setAdding(true)}>Ajoute la première →</button></div>
          )}
          <div className="ms-races">
            {races.map((r) => <RaceCard key={r.id} race={r} members={members} gpxList={gpxList} onUploadGpx={uploadGpx} onJoin={joinRace} onLeave={leaveRace} onEdit={editRace} onDelete={deleteRace} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.COURSES = { CoursesPage };
