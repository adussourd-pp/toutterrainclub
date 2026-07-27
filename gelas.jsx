// Trail to Techno — Édition Mercantour · sous-page Expédition Gelas (roadbook)

const GEL = {};

const GEL_DATA = {
  // Groupes issus du tableau d'inscription (absents omis)
  formats: [
    { name: "Full Expé", km: "96 km", dplus: "7 000 D+", tag: "Nice → Gelas · J1 + J2 · 8 au départ",
      team: ["Alexandre", "Adrien", "Nico", "Damien", "FF", "Fabien", "Fanny", "Gaby"], hero: true },
    { name: "Nice → Madone", km: "80 km", dplus: "5 800 D+", tag: "Le J1 · 12 au départ",
      team: ["Alexandre", "Adrien", "Nico", "Damien", "FF", "Fabien", "Fanny", "Gaby", "Manon", "Quentin", "Hugo", "Maxime T"] },
    { name: "Summit only", km: "14 km", dplus: "1 200 D+", tag: "Le J2 · 9 au départ de la Madone",
      team: ["Alexandre", "Adrien", "Nico", "Damien", "FF", "Fabien", "Fanny", "Gaby", "Manon"],
      confirm: ["Lorna", "Pierre"] },
  ],
  roadbook: [
    {
      title: "J1", route: "Nice → Madone de Fenestre", date: "Jeudi 19:00 → vendredi ≈ 14:30",
      stats: "80,8 km · 5 850 D+ · Plan A", gpx: "gpx/expe-j1.gpx", gpxLabel: "Trace GPX J1 + ravitos",
      rows: [
        { t: "19:00", h: "Nice · Promenade des Anglais", s: "km 0 · départ", kind: "trail" },
        { t: "≈ 20:15", h: "Aire St-Michel", s: "km 6,6 · 314 m · 1er point assistance", kind: "trail" },
        { t: "≈ 21:45", h: "Aspremont", s: "km 13,1 · 497 m · ravito selon conditions", kind: "trail", soft: true },
        { t: "≈ 23:45", h: "Levens", s: "km 21,9 · 543 m · ravito ✓", kind: "night" },
        { t: "≈ 03:15", h: "Utelle", s: "km 36,5 · 813 m · ravito ✓", kind: "night" },
        { t: "≈ 07:00", h: "Granges de la Brasque", s: "km 50,4 · 1 683 m · ravito ✓", kind: "trail" },
        { t: "≈ 10:15", h: "Saint-Martin-Vésubie", s: "km 66,9 · 984 m · ravito ✓", kind: "trail" },
        { t: "≈ 14:30", h: "Madone de Fenestre · 1 904 m", s: "km 80,8 · arrivée J1 — repas & nuit sur place", kind: "trail" },
      ],
    },
    {
      title: "J2", route: "Madone → Gelas → Relais", date: "Samedi · départ 05:00",
      stats: "16 km · 1 200 D+ puis la descente", gpx: "gpx/expe-j2.gpx", gpxLabel: "Trace GPX J2",
      rows: [
        { t: "05:00", h: "Départ de la Madone", s: "frontales — la team Summit only embarque ici", kind: "night" },
        { t: "≈ 08:30", h: "Cime du Gelas · 3 143 m", s: "km ≈ 5,5 · le toit du week-end", kind: "trail" },
        { t: "≈ 10:30", h: "Refuge de Nice", s: "ravito — la Jonction vient à notre rencontre", kind: "trail" },
        { t: "≈ 15:00", h: "Relais des Merveilles", s: "km 16 · arrivée — la meute accueille", kind: "trail" },
      ],
    },
  ],
  ravitos: [
    { name: "Levens", ok: true },
    { name: "Utelle", ok: true },
    { name: "Granges de la Brasque", ok: true },
    { name: "Saint-Martin-Vésubie", ok: true },
    { name: "Aspremont", ok: false },
    { name: "Cros d'Utelle", ok: false },
  ],
};

GEL.Hero = () => (
  <section className="t2t-hero-photo" style={{ minHeight: "72vh" }}>
    <div className="bg" style={{ backgroundImage: "url('img/gelas-summit.jpg')" }}></div>
    <div className="wrap">
      <div className="t2t-hero-meta">
        <span>Édition Mercantour · l'expédition · roadbook</span>
        <span>Jeudi 6 → samedi 8 août 2026</span>
      </div>
      <h1 className="t2t-hero-title" style={{ fontSize: "clamp(52px, 10vw, 160px)" }}>
        <span className="l1">De la mer</span>
        <span className="l2"><span className="techno">au Gelas.</span></span>
      </h1>
      <div className="t2t-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 30 }}>
        <p className="t2t-hero-lede" style={{ fontSize: 17 }}>
          96 km · 7 000 D+ · 2 jours. Tout le plan est ici : horaires,
          temps de passage, ravitos, traces GPX, assistance.
        </p>
        <div className="t2t-hero-cta" style={{ flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href="https://wa.me/33668681188" target="_blank" rel="noopener" className="btn btn-uv">Candidater à l'expé →</a>
          <a href="edition-mercantour.html" className="btn btn-line-light">← L'édition Mercantour</a>
        </div>
      </div>
    </div>
  </section>
);

GEL.Metabar = () => (
  <div className="wrap">
    <div className="t2t-metabar">
      <div className="m"><div className="mk">Départ</div><div className="mv">Jeudi 6 août · 19:00 · Nice</div></div>
      <div className="m"><div className="mk">Sommet</div><div className="mv">Cime du Gelas · 3 143 m</div></div>
      <div className="m"><div className="mk">Arrivée</div><div className="mv">Relais des Merveilles · sam. ≈ 15h</div></div>
      <div className="m"><div className="mk">Team</div><div className="mv">Sur sélection · assistance suivie</div></div>
    </div>
  </div>
);

GEL.Roadbook = () => (
  <section className="t2t-sec" id="roadbook">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le roadbook · temps de passage</div>
          <h2 className="t2t-h2">J1 / <span className="uv">J2</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          La feuille de route commune coureurs + assistance : chacun sait où être
          et quand. Km et altitudes issus de la trace Plan A, horaires estimés
          sur 19–20 h de course. La voiture suit chaque point du J1, drop bags à bord.
        </p>
      </div>
      <div className="t2t-program" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {GEL_DATA.roadbook.map((day) => (
          <div key={day.title} className={`t2t-day ${day.title === "J2" ? "peak" : ""}`}>
            <div className="t2t-day-head">
              <span className="d">{day.title} · {day.route}</span>
              <span className="dt">{day.date}</span>
            </div>
            <div className="t2t-slot" style={{ gridTemplateColumns: "1fr auto", alignItems: "center" }}>
              <span className="h" style={{ fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 500 }}>{day.stats}</span>
              <a className="cc-foot cc-live" href={day.gpx} download style={{ textDecoration: "none" }}>⤓ {day.gpxLabel}</a>
            </div>
            {day.rows.map((it, i) => (
              <div key={i} className={`t2t-slot ${it.kind}`} style={{ gridTemplateColumns: "68px 1fr", opacity: it.soft ? 0.6 : 1 }}>
                <span className="time">{it.t}</span>
                <span>
                  <span className="h">{it.h}</span>
                  <span className="s">{it.s}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="t2t-finetext" style={{ marginTop: 14 }}>
        ✓ = ravito confirmé · « selon conditions » = Aspremont et Cros d'Utelle restent à confirmer · horaires ≈ estimés
      </p>
    </div>
  </section>
);

GEL.Profile = () => {
  const e = window.MERCANTOUR.expo;
  const area = e.profile + " L1000 260 L0 260 Z";
  return (
    <section className="t2t-sec" id="profil">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ Le profil complet</div>
            <h2 className="t2t-h2">96 km · <span className="uv">7 000 D+</span></h2>
          </div>
        </div>
        <div className="t2t-profile-card">
          <div className="t2t-profile-head">
            <span><span className="sea">◆ Nice · 0 m</span> → Cime du Gelas · 3 143 m → Relais des Merveilles</span>
            <span>Profil réel · GPX</span>
          </div>
          <div className="t2t-profile">
            <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-label="Profil altimétrique de l'expédition">
              <defs>
                <linearGradient id="gelprof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--green)" stopOpacity="0.42" />
                  <stop offset="1" stopColor="var(--green)" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#gelprof)" />
              <line x1={e.splitX} y1="0" x2={e.splitX} y2="260" stroke="rgba(244,239,255,0.35)" strokeWidth="1" strokeDasharray="4 4" />
              <path d={e.profile} fill="none" stroke="var(--green)" strokeWidth="2.2" />
              <circle cx="0" cy="251" r="5" fill="var(--green)" />
              <circle cx="886" cy="14" r="5" fill="#fff" stroke="var(--green)" strokeWidth="2" />
            </svg>
          </div>
          <div className="t2t-profile-axis">
            <span className="t2t-daychip">◆ J1 · Nice → Madone</span>
            <span style={{ alignSelf: "center" }}>la ligne ne redescend jamais vraiment</span>
            <span className="t2t-daychip">J2 · Madone → Gelas → Relais ▲</span>
          </div>
        </div>
      </div>
    </section>
  );
};

GEL.Formats = () => (
  <section className="t2t-sec" id="groupes">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Les groupes</div>
          <h2 className="t2t-h2">Qui fait <span className="uv">quoi</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Trois façons de vivre l'expé : l'intégrale, le J1 jusqu'à la Madone,
          ou le sommet seul au départ de la Madone.
        </p>
      </div>
      <div className="t2t-commu">
        {GEL_DATA.formats.map((f) => (
          <div key={f.name} className={`t2t-commu-card ${f.hero ? "join" : ""}`}>
            <div className="cc-top">
              <span className="cc-name">{f.name}</span>
              <span className="cc-km">{f.km}</span>
            </div>
            <span className="cc-tag">{f.tag}</span>
            <p className="cc-ex" style={{ flex: "none", margin: 0 }}>{f.dplus}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
              {f.team.map((n) => <span key={n} className="t2t-daychip">{n}</span>)}
              {(f.confirm || []).map((n) => <span key={n} className="t2t-daychip" style={{ opacity: 0.55 }}>◷ {n}</span>)}
            </div>
          </div>
        ))}
      </div>
      <p className="t2t-finetext" style={{ marginTop: 14 }}>◷ = à confirmer</p>
    </div>
  </section>
);

GEL.Logistics = () => (
  <section className="t2t-sec" id="logistique">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Assistance & drop bag</div>
          <h2 className="t2t-h2">On ne vous<br/>lâche <span className="uv">pas</span>.</h2>
        </div>
      </div>
      <div className="t2t-location">
        <div>
          <div className="t2t-loc-list">
            <div className="t2t-loc-row">
              <span className="k">Ravitos ✅</span>
              <span className="v"><b>Levens · Utelle · Granges de la Brasque · Saint-Martin-Vésubie.</b> Temps de passage estimés dans le roadbook ci-dessus.</span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">À confirmer</span>
              <span className="v"><b>Aspremont</b> et <b>Cros d'Utelle</b> pourront s'ajouter selon les conditions.</span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">Drop bag</span>
              <span className="v">
                Mets un <b>sac dans la voiture d'assistance</b> : elle te suit partout
                jusqu'à la Madone de Fenestre, puis tu la retrouves le samedi au Relais des Merveilles.
              </span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">Assistance</span>
              <span className="v">Voiture d'assistance sur tout le J1 — <b>Gautier</b> au volant (Fanny G à confirmer). Matériel, ravito perso, sécurité.</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {GEL_DATA.ravitos.map((r) => (
              <span key={r.name} className="t2t-daychip" style={r.ok ? undefined : { opacity: 0.55 }}>
                {r.ok ? "✓" : "◷"} {r.name}
              </span>
            ))}
          </div>
          <div className="t2t-photo" style={{ minHeight: 260 }}>
            <img src="img/runner-climb.jpg" alt="En montée vers la Madone" loading="lazy"
                 style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          </div>
        </div>
      </div>
      <div className="t2t-warning" style={{ marginTop: 28 }}>
        <b>⚠️ Important :</b> l'expédition est une sortie libre et non encadrée, réservée à des
        coureurs autonomes sélectionnés. Le TTC ne fournit aucun encadrement sportif et ne saurait
        être tenu responsable en cas d'accident ou de blessure. Chaque participant s'engage sous sa
        propre responsabilité : les assurances (responsabilité civile, individuelle accident) sont à la charge de chacun.
      </div>
    </div>
  </section>
);

GEL.Final = () => (
  <section className="t2t-final">
    <div className="glow"></div>
    <div className="wrap">
      <div className="sub">L'expédition · jeudi 6 → samedi 8 août 2026 · sur sélection</div>
      <h2>La mer, la nuit,<br/><span className="uv">le sommet</span>.</h2>
      <div className="t2t-final-cta">
        <a href="https://wa.me/33668681188" target="_blank" rel="noopener" className="btn btn-uv">Candidater à l'expé →</a>
        <a href="edition-mercantour.html#tarifs" className="btn btn-line-light">Le week-end & les tarifs</a>
      </div>
    </div>
  </section>
);

window.GEL = GEL;
