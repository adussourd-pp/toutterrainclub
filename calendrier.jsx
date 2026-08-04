// Espace membre — Le calendrier de la meute.
// Agenda partagé des sorties & events du club, façon "shared calendar" social.
// - Les runs hebdo (jeudi soir + sortie longue du dimanche) sont générés sur
//   les prochaines semaines à partir d'aujourd'hui.
// - Les temps forts (Trail to Techno, Gelas, socials…) sont posés en dur.
// - "Je viens" et "Proposer une sortie" sont stockés localement (prototype
//   sans backend) et se partagent d'un clic sur WhatsApp — là où vit la meute.

const CAL_RSVP_KEY = "ttc_cal_rsvp_v1";
const CAL_PROPS_KEY = "ttc_cal_props_v1";

// ---- Types de sortie ------------------------------------------------------
const TYPES = {
  hebdo:   { label: "Run hebdo",     dot: "var(--green-3)", cls: "t-hebdo" },
  longue:  { label: "Sortie longue", dot: "var(--green)",   cls: "t-longue" },
  event:   { label: "Event",         dot: "var(--fire)",    cls: "t-event" },
  course:  { label: "Course",        dot: "#b06bff",        cls: "t-course" },
  social:  { label: "Social",        dot: "#3aa0ff",        cls: "t-social" },
  montagne:{ label: "Montagne",      dot: "#7a7a72",        cls: "t-montagne" },
};

const MONTHS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const WEEKDAYS = ["lun","mar","mer","jeu","ven","sam","dim"];
const WEEKDAYS_LONG = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

// yyyy-mm-dd (clé stable, locale-safe)
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// index lundi=0 … dimanche=6
const wdMon = (d) => (d.getDay() + 6) % 7;

// ---- Générateur d'events --------------------------------------------------
// Renvoie la prochaine occurrence (>= from) d'un jour de semaine donné.
const nextWeekday = (from, targetMon) => {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const diff = (targetMon - wdMon(d) + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
};

const buildEvents = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const events = [];

  // -- Runs hebdo générés sur ~10 semaines --
  const WEEKS = 10;
  const jeudi = nextWeekday(start, 3);   // jeudi
  for (let i = 0; i < WEEKS; i++) {
    const d = new Date(jeudi); d.setDate(jeudi.getDate() + i * 7);
    events.push({
      id: `hebdo-${iso(d)}`, date: iso(d), time: "19:00", type: "hebdo",
      title: "Run du jeudi", place: "RDV Quai des États-Unis, Nice",
      dist: "≈ 8–10 km", detail: "Allure conviviale, tous niveaux mélangés. On attend tout le monde en haut.",
      base: 12 + ((i * 3) % 9),
    });
  }
  const dim = nextWeekday(start, 6);     // dimanche
  const LONG_SPOTS = [
    { p: "RDV Parking de l'Observatoire, Mont Gros", d: "≈ 18 km · 700 D+", t: "Boucle arrière-pays, rythme sortie longue." },
    { p: "RDV Gare de Nice, direction Peille", d: "≈ 24 km · 1100 D+", t: "Sortie montagne engagée, prévoir eau + barres." },
    { p: "RDV Colline du Château", d: "≈ 15 km · 500 D+", t: "Vallon obscur, sentiers techniques et vues mer." },
    { p: "RDV La Turbie", d: "≈ 22 km · 950 D+", t: "Crêtes et Grande Corniche, panorama garanti." },
  ];
  for (let i = 0; i < WEEKS; i++) {
    const d = new Date(dim); d.setDate(dim.getDate() + i * 7);
    const s = LONG_SPOTS[i % LONG_SPOTS.length];
    events.push({
      id: `longue-${iso(d)}`, date: iso(d), time: "08:45", type: "longue",
      title: "Sortie longue du dimanche", place: s.p, dist: s.d, detail: s.t,
      base: 6 + ((i * 2) % 6),
    });
  }

  // -- Temps forts (dates absolues, saison 2026) --
  const FIXED = [
    { id: "t2t-warmup", date: "2026-08-06", time: "19:30", type: "social",
      title: "Trail to Techno · Warm-up Nice", place: "Nice · lieu communiqué sur le groupe",
      dist: "Apéro + shakeout", detail: "Lancement du week-end : petit run décontracté puis premier verre de la meute.", base: 34 },
    { id: "t2t-mercantour", date: "2026-08-08", time: "08:00", type: "event",
      title: "Trail to Techno · Édition Mercantour", place: "Vallée de la Gordolasque · Parc du Mercantour",
      dist: "Week-end · 8–9 août", detail: "Le grand week-end : trail, refuge du Relais des Merveilles, brunch et after au sommet de l'été.",
      base: 58, link: "trail-to-techno.html" },
    { id: "gelas", date: "2026-08-08", time: "05:30", type: "montagne",
      title: "Ascension · Cime du Gelas (3 143 m)", place: "Départ Relais des Merveilles",
      dist: "≈ 14 km A/R · 1 330 D+", detail: "Le Balcon du Gelas : raide et panoramique, le point culminant du week-end.",
      base: 22, link: "expedition-gelas.html" },
    { id: "afterrun-qg", date: "2026-08-27", time: "20:00", type: "social",
      title: "After-run · apéro de la meute", place: "QG à confirmer · Nice",
      dist: "0 km, 100 % social", detail: "On se pose après le run du jeudi. Point de retrouvailles, tarifs partenaires en test.", base: 28 },
    { id: "team-course", date: "2026-09-13", time: "09:00", type: "course",
      title: "Team TTC · course locale", place: "Objectif commun · dossards groupés",
      dist: "10 km / semi", detail: "On aligne une équipe aux couleurs du club. Inscriptions et co-voiturage coordonnés sur le groupe.", base: 17 },
  ];
  FIXED.forEach((e) => events.push(e));

  return events;
};

// ---- Persistance ----------------------------------------------------------
const loadJSON = (k, fallback) => {
  try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fallback; } catch (e) { return fallback; }
};
const saveJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

// ---- Utilitaires date d'affichage ----------------------------------------
const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const fmtDay = (s) => { const d = parseISO(s); return { num: d.getDate(), mon: MONTHS[d.getMonth()].slice(0, 4), wd: WEEKDAYS_LONG[wdMon(d)] }; };

// ---- .ics (ajout agenda perso) -------------------------------------------
const downloadICS = (e) => {
  const d = parseISO(e.date);
  const [h, mi] = (e.time || "08:00").split(":").map(Number);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi);
  const end = new Date(start.getTime() + 2 * 3600 * 1000);
  const z = (n) => String(n).padStart(2, "0");
  const stamp = (x) => `${x.getFullYear()}${z(x.getMonth() + 1)}${z(x.getDate())}T${z(x.getHours())}${z(x.getMinutes())}00`;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TTC//Calendrier//FR", "BEGIN:VEVENT",
    `UID:${e.id}@toutterrainclub`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${e.title}`, `LOCATION:${(e.place || "").replace(/,/g, "\\,")}`,
    `DESCRIPTION:${(e.detail || "").replace(/,/g, "\\,")}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `ttc-${e.id}.ics`; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
};

const waShare = (e) => {
  const f = fmtDay(e.date);
  const txt = `🏃 ${e.title}\n📅 ${f.wd} ${f.num} ${MONTHS[parseISO(e.date).getMonth()]} · ${e.time}\n📍 ${e.place}\n${e.dist ? "📏 " + e.dist + "\n" : ""}${e.detail}\n\nQui vient ? (via le calendrier TTC)`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
};

// ---- Avatars "qui vient" --------------------------------------------------
const SEED_NAMES = ["AL","MC","PL","FG","LO","GT","JB","SO","TH","EM","NA","VP"];
const Attendees = ({ count, mine }) => {
  const shown = Math.min(count, 5);
  return (
    <div className="cal-att">
      <div className="cal-att-av">
        {Array.from({ length: shown }).map((_, i) => (
          <span key={i} className="cal-face" style={{ zIndex: shown - i }}>{SEED_NAMES[i % SEED_NAMES.length]}</span>
        ))}
        {mine && <span className="cal-face me" style={{ zIndex: 20 }}>toi</span>}
      </div>
      <span className="cal-att-n">{count}{mine ? " dont toi" : ""} inscrit·es</span>
    </div>
  );
};

// ---- Carte event ----------------------------------------------------------
const EventCard = ({ e, mine, onRsvp }) => {
  const f = fmtDay(e.date);
  const t = TYPES[e.type];
  const count = (e.base || 0) + (mine ? 1 : 0) + (e.propBy ? 1 : 0);
  return (
    <article className={`cal-ev ${t.cls} ${e.propBy ? "is-prop" : ""}`}>
      <div className="cal-ev-date">
        <span className="cal-ev-wd">{f.wd.slice(0, 3)}</span>
        <span className="cal-ev-num">{f.num}</span>
        <span className="cal-ev-mon">{f.mon}</span>
      </div>
      <div className="cal-ev-body">
        <div className="cal-ev-top">
          <span className="cal-type" style={{ "--dot": t.dot }}>{t.label}</span>
          <span className="cal-ev-time">{e.time}</span>
          {e.propBy && <span className="cal-prop-tag">Proposé par toi</span>}
        </div>
        <h3 className="cal-ev-title">{e.link ? <a href={e.link}>{e.title} ↗</a> : e.title}</h3>
        <div className="cal-ev-meta">
          <span>📍 {e.place}</span>
          {e.dist && <span>· {e.dist}</span>}
        </div>
        {e.detail && <p className="cal-ev-detail">{e.detail}</p>}
        <div className="cal-ev-foot">
          <Attendees count={count} mine={mine} />
          <div className="cal-ev-actions">
            <button type="button" className={`cal-join ${mine ? "on" : ""}`} onClick={() => onRsvp(e.id)}>
              {mine ? "✓ Je viens" : "Je viens"}
            </button>
            <button type="button" className="cal-ico" title="Ajouter à mon agenda" onClick={() => downloadICS(e)}>Agenda</button>
            <button type="button" className="cal-ico" title="Partager sur WhatsApp" onClick={() => waShare(e)}>WhatsApp</button>
          </div>
        </div>
      </div>
    </article>
  );
};

// ---- Vue mois -------------------------------------------------------------
const MonthGrid = ({ monthDate, byDay, selected, onSelect }) => {
  const y = monthDate.getFullYear(), m = monthDate.getMonth();
  const first = new Date(y, m, 1);
  const lead = wdMon(first);
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const todayIso = iso(new Date());

  return (
    <div className="cal-month">
      <div className="cal-month-head">
        {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-cell empty" />;
          const key = iso(d);
          const evs = byDay[key] || [];
          const isSel = selected === key;
          return (
            <button
              type="button"
              key={i}
              className={`cal-cell ${evs.length ? "has" : ""} ${isSel ? "sel" : ""} ${key === todayIso ? "today" : ""}`}
              onClick={() => onSelect(evs.length ? (isSel ? null : key) : null)}
              disabled={!evs.length}
            >
              <span className="cal-cell-n">{d.getDate()}</span>
              <span className="cal-cell-dots">
                {evs.slice(0, 4).map((e, j) => <i key={j} style={{ background: TYPES[e.type].dot }} />)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---- Formulaire "proposer une sortie" ------------------------------------
const ProposeForm = ({ onAdd }) => {
  const [open, setOpen] = React.useState(false);
  const [f, setF] = React.useState({ title: "", date: "", time: "19:00", place: "", dist: "", type: "longue", detail: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!f.title || !f.date) return;
    onAdd({ ...f, id: `prop-${f.date}-${f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20)}`, base: 0, propBy: true });
    setF({ title: "", date: "", time: "19:00", place: "", dist: "", type: "longue", detail: "" });
    setOpen(false);
  };
  if (!open) {
    return (
      <div className="cal-propose-cta">
        <div>
          <h3>Une envie de sortie ?</h3>
          <p>Propose une date, un lieu, une distance. On l'ajoute au calendrier et tu la balances sur le groupe en un clic.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>+ Proposer une sortie</button>
      </div>
    );
  }
  return (
    <form className="cal-propose-form" onSubmit={submit}>
      <div className="cal-pf-head"><h3>Proposer une sortie</h3><button type="button" className="cal-pf-x" onClick={() => setOpen(false)}>✕</button></div>
      <div className="cal-pf-grid">
        <label className="pf-field cal-pf-wide"><span className="pf-label">Titre</span>
          <input className="pf-input" value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Sortie longue Peille, fractionné piste…" required /></label>
        <label className="pf-field"><span className="pf-label">Date</span>
          <input type="date" className="pf-input" value={f.date} onChange={(e) => set("date", e.target.value)} required /></label>
        <label className="pf-field"><span className="pf-label">Heure</span>
          <input type="time" className="pf-input" value={f.time} onChange={(e) => set("time", e.target.value)} /></label>
        <label className="pf-field"><span className="pf-label">Type</span>
          <select className="pf-input" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {Object.keys(TYPES).map((k) => <option key={k} value={k}>{TYPES[k].label}</option>)}
          </select></label>
        <label className="pf-field"><span className="pf-label">Distance / D+</span>
          <input className="pf-input" value={f.dist} onChange={(e) => set("dist", e.target.value)} placeholder="≈ 20 km · 800 D+" /></label>
        <label className="pf-field cal-pf-wide"><span className="pf-label">Lieu / RDV</span>
          <input className="pf-input" value={f.place} onChange={(e) => set("place", e.target.value)} placeholder="RDV Colline du Château, 8h45" /></label>
        <label className="pf-field cal-pf-wide"><span className="pf-label">Détail</span>
          <input className="pf-input" value={f.detail} onChange={(e) => set("detail", e.target.value)} placeholder="Rythme, ambiance, ce qu'il faut prévoir…" /></label>
      </div>
      <div className="cal-pf-actions">
        <button type="submit" className="btn btn-primary">Ajouter au calendrier</button>
        <span className="pf-note" style={{ margin: 0 }}>Enregistré sur cet appareil · pense à la partager sur WhatsApp depuis sa carte.</span>
      </div>
    </form>
  );
};

// ---- La page --------------------------------------------------------------
const CalendrierPage = () => {
  const seed = React.useMemo(buildEvents, []);
  const [props, setProps] = React.useState(() => loadJSON(CAL_PROPS_KEY, []));
  const [rsvp, setRsvp] = React.useState(() => loadJSON(CAL_RSVP_KEY, {}));
  const [view, setView] = React.useState("liste");
  const [filter, setFilter] = React.useState("tous");
  const [selected, setSelected] = React.useState(null);
  const [monthOff, setMonthOff] = React.useState(0);

  const all = React.useMemo(
    () => [...seed, ...props].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [seed, props]
  );

  const toggleRsvp = (id) => setRsvp((r) => { const n = { ...r, [id]: !r[id] }; saveJSON(CAL_RSVP_KEY, n); return n; });
  const addProp = (p) => setProps((ps) => { const n = [...ps, p]; saveJSON(CAL_PROPS_KEY, n); return n; });

  const filtered = all.filter((e) => filter === "tous" || e.type === filter);

  // Regroupé par mois pour la liste
  const groups = [];
  filtered.forEach((e) => {
    const d = parseISO(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    let g = groups.find((x) => x.key === key);
    if (!g) { g = { key, label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`, items: [] }; groups.push(g); }
    g.items.push(e);
  });

  // Index jour -> events pour la grille mois
  const byDay = {};
  filtered.forEach((e) => { (byDay[e.date] = byDay[e.date] || []).push(e); });

  const today = new Date();
  const monthDate = new Date(today.getFullYear(), today.getMonth() + monthOff, 1);

  const listItems = selected ? filtered.filter((e) => e.date === selected) : filtered;

  const counts = Object.keys(TYPES).reduce((acc, k) => { acc[k] = all.filter((e) => e.type === k).length; return acc; }, {});
  const mineCount = all.filter((e) => rsvp[e.id]).length;

  return (
    <React.Fragment>
      <window.MEMBER.MemberSubnav active="calendrier" />

      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · agenda partagé</span>
          <h1>Le calendrier<br/>de la <span className="marker">meute</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">
              Toutes les sorties au même endroit : les runs du jeudi, les longues du dimanche,
              les temps forts comme <strong>Trail to Techno</strong> et les socials. Tu dis
              <strong> « je viens »</strong>, tu l'ajoutes à ton agenda, tu proposes ta propre sortie.
              Le reste de la discussion continue sur WhatsApp — le calendrier n'est là que pour
              <strong> y voir clair</strong>.
            </p>
          </div>
          <div className="hero-stats ms-stats cal-stats">
            <div className="stat ms-stat"><div className="num">{all.length}</div><div className="lab">rendez-vous à venir</div></div>
            <div className="stat ms-stat"><div className="num">2×</div><div className="lab">runs / semaine</div></div>
            <div className="stat ms-stat"><div className="num">{mineCount}</div><div className="lab">où tu es inscrit·e</div></div>
            <div className="stat ms-stat"><div className="num">100%</div><div className="lab">runs gratuits</div></div>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {/* Barre d'outils */}
          <div className="cal-toolbar">
            <div className="cal-views">
              <button type="button" className={view === "liste" ? "on" : ""} onClick={() => setView("liste")}>Agenda</button>
              <button type="button" className={view === "mois" ? "on" : ""} onClick={() => setView("mois")}>Mois</button>
            </div>
            <div className="cal-filters">
              <button type="button" className={`cal-filter ${filter === "tous" ? "on" : ""}`} onClick={() => { setFilter("tous"); setSelected(null); }}>Tous</button>
              {Object.keys(TYPES).map((k) => (
                <button type="button" key={k} className={`cal-filter ${filter === k ? "on" : ""}`} onClick={() => { setFilter(k); setSelected(null); }} style={{ "--dot": TYPES[k].dot }}>
                  <i className="cal-filter-dot" /> {TYPES[k].label} <em>{counts[k]}</em>
                </button>
              ))}
            </div>
          </div>

          {view === "mois" && (
            <div className="cal-month-wrap">
              <div className="cal-month-nav">
                <button type="button" onClick={() => setMonthOff((o) => o - 1)}>←</button>
                <span className="cal-month-title">{MONTHS[monthDate.getMonth()]} {monthDate.getFullYear()}</span>
                <button type="button" onClick={() => setMonthOff((o) => o + 1)}>→</button>
              </div>
              <MonthGrid monthDate={monthDate} byDay={byDay} selected={selected} onSelect={setSelected} />
              <div className="cal-legend">
                {Object.keys(TYPES).map((k) => <span key={k}><i style={{ background: TYPES[k].dot }} />{TYPES[k].label}</span>)}
              </div>
              {selected && <p className="cal-selnote">Sélection : <b>{fmtDay(selected).wd} {fmtDay(selected).num} {MONTHS[parseISO(selected).getMonth()]}</b> · <button type="button" className="cal-clear" onClick={() => setSelected(null)}>tout revoir</button></p>}
            </div>
          )}

          {/* Liste (toujours affichée sous la grille en vue mois filtrée par jour) */}
          {view === "liste" ? (
            groups.map((g) => (
              <div key={g.key} className="cal-group">
                <h2 className="cal-group-h">{g.label}</h2>
                <div className="cal-list">
                  {g.items.map((e) => <EventCard key={e.id} e={e} mine={!!rsvp[e.id]} onRsvp={toggleRsvp} />)}
                </div>
              </div>
            ))
          ) : (
            <div className="cal-list cal-list-sel">
              {listItems.map((e) => <EventCard key={e.id} e={e} mine={!!rsvp[e.id]} onRsvp={toggleRsvp} />)}
            </div>
          )}

          <ProposeForm onAdd={addProp} />

          <p className="ms-foot-note">
            Prototype d'agenda · les runs hebdo sont générés automatiquement, les temps forts posés
            à la main. « Je viens » et tes propositions sont stockés sur cet appareil uniquement —
            la coordination réelle reste sur le groupe WhatsApp. Runs officiels toujours gratuits,
            tous niveaux mélangés.
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

window.CALENDRIER = { CalendrierPage };
