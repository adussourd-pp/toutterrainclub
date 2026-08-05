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

// Une distance est un objet {km, dplus}. (compat : anciennes valeurs = string)
function distLabel(d) { return typeof d === "string" ? d : `${d.km} km · ${d.dplus || 0} D+`; }
function distCat(d) { return typeof d === "string" ? null : window.TTC_TRAIL.utmbCategory(d.km, d.dplus).code; }
const Chips = ({ items }) => (
  <span className="ms-dist-chips">{(items || []).map((d, i) => {
    const c = distCat(d);
    return <span key={i} className="ms-dist-chip">{distLabel(d)}{c && c !== "—" ? <b className="ms-dist-cat"> {c}</b> : null}</span>;
  })}</span>
);

const RaceForm = ({ onAdd, onClose }) => {
  const [f, setF] = React.useState({ name: "", date_start: "", date_end: "", location: "", type: "trail", site_url: "" });
  const [dists, setDists] = React.useState([{ km: "", dplus: "" }]);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const setD = (i, k, v) => setDists((a) => a.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const addD = () => setDists((a) => [...a, { km: "", dplus: "" }]);
  const rmD = (i) => setDists((a) => a.filter((_, j) => j !== i));
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    const distances = dists
      .filter((d) => String(d.km).trim() !== "")
      .map((d) => ({ km: Number(d.km) || 0, dplus: Number(d.dplus) || 0 }));
    onAdd({ ...f, distances });
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
          <input className="pf-input" value={f.location} onChange={(e) => set("location", e.target.value)} placeholder="Nice, Alpes-Maritimes" /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {RACE_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Site officiel</span>
          <input type="url" className="pf-input" value={f.site_url} onChange={(e) => set("site_url", e.target.value)} placeholder="https://…" /></label>
      </div>

      <div className="ms-dist-editor">
        <div className="pf-label">Distances proposées <em className="pf-hint">km + D+ → catégorie UTMB auto</em></div>
        {dists.map((d, i) => {
          const cat = window.TTC_TRAIL.utmbCategory(d.km, d.dplus);
          return (
            <div className="ms-dist-row" key={i}>
              <input type="number" className="pf-input" value={d.km} onChange={(e) => setD(i, "km", e.target.value)} placeholder="km" />
              <input type="number" className="pf-input" value={d.dplus} onChange={(e) => setD(i, "dplus", e.target.value)} placeholder="D+ (m)" />
              <span className={`ms-cat ${cat.code === "—" ? "muted" : ""}`} title={cat.full}>{d.km ? cat.code : "—"}</span>
              {dists.length > 1 && <button type="button" className="ms-dist-rm" onClick={() => rmD(i)}>×</button>}
            </div>
          );
        })}
        <button type="button" className="btn btn-sm" onClick={addD}>+ Ajouter une distance</button>
      </div>

      <div className="ms-form-actions">
        <button type="button" className="btn" onClick={onClose}>Annuler</button>
        <button type="submit" className="btn btn-primary">Ajouter la course →</button>
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

const RaceCard = ({ race, onJoin, onLeave }) => {
  const [open, setOpen] = React.useState(false);
  const parts = race.participants || [];
  return (
    <div className="ms-race">
      <div className="ms-race-top">
        <div>
          <div className="ms-race-name">{race.name}</div>
          <div className="ms-race-meta">
            {fmtDate(race.date_start, race.date_end)}{race.location ? " · " + race.location : ""}
          </div>
        </div>
        <div className="ms-race-right">
          <Chips items={race.distances} />
          {race.site_url && <a className="ms-promo-link" href={race.site_url} target="_blank" rel="noopener">site ↗</a>}
        </div>
      </div>

      <div className="ms-race-parts">
        <div className="ms-race-parts-h">
          <span>{parts.length} participant{parts.length > 1 ? "s" : ""}</span>
          {!open && <button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>Je participe ✋</button>}
        </div>
        {open && <JoinForm race={race} onClose={() => setOpen(false)} onJoin={(f) => { onJoin(race, f); setOpen(false); }} />}
        {parts.length > 0 && (
          <table className="ms-part-table">
            <tbody>
              {parts.map((p, i) => (
                <tr key={p.id || i}>
                  <td className="ms-part-name">{p.member}</td>
                  <td className="ms-part-dist">{p.distance}</td>
                  <td><span className={`ms-part-status ${p.status}`}>{p.status === "chaud" ? "🔥 Chaud" : "✅ Inscrit"}</span></td>
                  <td className="ms-part-soc">
                    {p.strava && <a href={p.strava} target="_blank" rel="noopener" title="Strava">🟠</a>}
                    {p.insta && <a href={p.insta} target="_blank" rel="noopener" title="Insta">📸</a>}
                  </td>
                  <td className="ms-part-x"><button title="Retirer" onClick={() => onLeave(race, p)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
  const [adding, setAdding] = React.useState(false);
  const live = window.ttcConfigured();

  const addRace = async (r) => {
    if (live) { try { await window.ttcApi("/api/races", { method: "POST", body: r }); await reload(); } catch (e) { alert("Erreur (droits ?). Reconnecte-toi."); } }
    else { const next = [...races, { ...r, id: "loc" + Date.now(), participants: [] }]; setItems(next); saveLocal(next); }
    setAdding(false);
  };
  const joinRace = async (race, f) => {
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/join`, { method: "POST", body: f }); await reload(); } catch (e) { alert("Erreur d'inscription."); } }
    else { const next = races.map((r) => r.id === race.id ? { ...r, participants: [...(r.participants || []), { ...f, id: "p" + Date.now() }] } : r); setItems(next); saveLocal(next); }
  };
  const leaveRace = async (race, p) => {
    if (live) { try { await window.ttcApi(`/api/races/${race.id}/leave`, { method: "POST", body: { participation_id: p.id, member: p.member } }); await reload(); } catch (e) {} }
    else { const next = races.map((r) => r.id === race.id ? { ...r, participants: (r.participants || []).filter((x) => x !== p) } : r); setItems(next); saveLocal(next); }
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
          {adding && <RaceForm onAdd={addRace} onClose={() => setAdding(false)} />}
          {state === "loading" && <p className="ms-note-muted">Chargement…</p>}
          {races.length === 0 && state !== "loading" && (
            <div className="ms-empty">Aucune course pour l'instant. <button className="btn btn-sm btn-primary" onClick={() => setAdding(true)}>Ajoute la première →</button></div>
          )}
          <div className="ms-races">
            {races.map((r) => <RaceCard key={r.id} race={r} onJoin={joinRace} onLeave={leaveRace} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.COURSES = { CoursesPage };
