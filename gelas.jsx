// Trail to Techno — Édition Mercantour · sous-page Expédition Gelas

const GEL = {};

const GEL_DATA = {
  formats: [
    { name: "Full Expé", km: "96 km", dplus: "7 000 D+", tag: "Nice → Cime du Gelas · J1 + J2", note: "L'intégrale : départ des galets de Nice le jeudi soir, sommet du Gelas le samedi matin, arrivée au Relais des Merveilles.", hero: true },
    { name: "Nice → Madone", km: "80 km", dplus: "5 800 D+", tag: "Le J1 seulement", note: "Toute la traversée de nuit et de jour jusqu'à la Madone de Fenestre. On dort là-haut, et libre à toi de redescendre tranquille le samedi." },
    { name: "Summit only", km: "14 km", dplus: "1 200 D+", tag: "Le J2 seulement", note: "Rendez-vous à la Madone de Fenestre le vendredi soir : nuit sur place, départ 5h avec la team pour le sommet, puis bascule vers le Relais." },
  ],
  program: [
    {
      day: "Jeudi 6", date: "Nice · le départ", items: [
        { t: "19:00", h: "Départ de Nice", s: "Les pieds dans la mer, cap sur la Madone de Fenestre — la nuit de course commence", kind: "trail" },
        { t: "Nuit", h: "On avale la nuit", s: "Aspremont, Levens, Utelle… les ravitos s'enchaînent, la voiture d'assistance suit", kind: "night" },
      ],
    },
    {
      day: "Vendredi 7", date: "Madone de Fenestre", items: [
        { t: "Journée", h: "La montée continue", s: "Granges de la Brasque, Saint-Martin-Vésubie — dernières bosses vers la Madone", kind: "trail" },
        { t: "≈ 14–15h", h: "Arrivée à la Madone de Fenestre", s: "80 km et 5 800 D+ avalés en 19–20 h de course", kind: "trail" },
        { t: "Soir", h: "Repas & nuit à la Madone", s: "On recharge : la team Summit only nous rejoint sur place", kind: "night" },
      ],
    },
    {
      day: "Samedi 8", date: "Le sommet · le Relais", items: [
        { t: "05:00", h: "Lever & départ pour le sommet", s: "Frontales et premières lueurs — 14 km et 1 200 D+ vers le toit du week-end", kind: "trail" },
        { t: "≈ 08:30", h: "Cime du Gelas · 3 143 m", s: "Le gardien du Mercantour — photo, frissons, et on bascule (horaire estimé)", kind: "trail" },
        { t: "≈ 10:30", h: "Passage au refuge de Nice", s: "Ravito — c'est ici que la Jonction vient à notre rencontre (horaire estimé)", kind: "trail" },
        { t: "≈ 15:00", h: "Arrivée au Relais des Merveilles", s: "La meute accueille l'expé — l'aventure est bouclée, place à la soirée", kind: "night" },
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
  <section className="t2t-hero-photo" style={{ minHeight: "80vh" }}>
    <div className="bg" style={{ backgroundImage: "url('img/gelas-summit.jpg')" }}></div>
    <div className="wrap">
      <div className="t2t-hero-meta">
        <span>Trail to Techno · Édition Mercantour · l'expédition</span>
        <span>Jeudi 6 → samedi 8 août 2026</span>
      </div>
      <h1 className="t2t-hero-title" style={{ fontSize: "clamp(52px, 10vw, 160px)" }}>
        <span className="l1">De la mer</span>
        <span className="l2"><span className="techno">au Gelas.</span></span>
      </h1>
      <div className="t2t-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 30 }}>
        <p className="t2t-hero-lede" style={{ fontSize: 17 }}>
          96 km, 7 000 m de dénivelé, deux jours et une nuit de course pour relier
          la Méditerranée à la Cime du Gelas. Voici le plan complet : horaires,
          formats, ravitos, assistance.
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

GEL.Profile = () => {
  const e = window.MERCANTOUR.expo;
  const area = e.profile + " L1000 260 L0 260 Z";
  return (
    <section className="t2t-sec" id="profil">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ La ligne · J1 + J2</div>
            <h2 className="t2t-h2">Une ligne qui ne<br/>redescend <span className="uv">jamais</span>.</h2>
          </div>
          <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            J1 : Nice → Madone de Fenestre (80 km · 5 800 D+).
            J2 : Madone → Gelas → Relais des Merveilles (14 km · 1 200 D+, puis la descente).
          </p>
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
            <span style={{ alignSelf: "center" }}>96 km · 7 000 D+ au total</span>
            <span className="t2t-daychip">J2 · Madone → Gelas → Relais ▲</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginTop: 18 }}>
          <a className="cc-foot cc-live" href="gpx/expe-j1.gpx" download style={{ textDecoration: "none" }}>⤓ Trace GPX J1 · Nice → Madone</a>
          <a className="cc-foot cc-live" href="gpx/expe-j2.gpx" download style={{ textDecoration: "none" }}>⤓ Trace GPX J2 · Madone → Gelas → Relais</a>
        </div>
      </div>
    </section>
  );
};

GEL.Program = () => (
  <section className="t2t-sec" id="deroule">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le déroulé heure par heure</div>
          <h2 className="t2t-h2">Du jeudi 19h<br/>au samedi <span className="uv">15h</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          19 à 20 heures de course jusqu'à la Madone, une nuit là-haut,
          et un réveil à l'aube pour le sommet. Les horaires du samedi sont estimés.
        </p>
      </div>
      <div className="t2t-program">
        {GEL_DATA.program.map((day) => (
          <div key={day.day} className={`t2t-day ${day.day === "Samedi 8" ? "peak" : ""}`}>
            <div className="t2t-day-head">
              <span className="d">{day.day}</span>
              <span className="dt">{day.date}</span>
            </div>
            {day.items.map((it, i) => (
              <div key={i} className={`t2t-slot ${it.kind}`}>
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
    </div>
  </section>
);

GEL.Formats = () => (
  <section className="t2t-sec" id="formats-expe">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Trois façons de la vivre</div>
          <h2 className="t2t-h2">Pas obligé de<br/>tout <span className="uv">faire</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          L'expé se découpe : l'intégrale, le J1 jusqu'à la Madone, ou
          le sommet seul au départ de la Madone. Même team, même sommet, même fête.
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
            <p className="cc-ex">{f.dplus}</p>
            <p className="cc-note">{f.note}</p>
          </div>
        ))}
      </div>
      <p className="t2t-finetext" style={{ marginTop: 16 }}>
        Les nuits (Madone de Fenestre le vendredi, Relais des Merveilles le samedi) se réservent selon ton format.
      </p>
    </div>
  </section>
);

GEL.Logistics = () => (
  <section className="t2t-sec" id="logistique">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Ravitos & assistance</div>
          <h2 className="t2t-h2">On ne vous<br/>lâche <span className="uv">pas</span>.</h2>
        </div>
      </div>
      <div className="t2t-location">
        <div>
          <div className="t2t-loc-list">
            <div className="t2t-loc-row">
              <span className="k">Ravitos ✅</span>
              <span className="v">
                <b>Levens · Utelle · Granges de la Brasque · Saint-Martin-Vésubie.</b> De
                quoi remplir les flasques et le moral tout au long du J1.
              </span>
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
              <span className="v">Une voiture d'assistance accompagne la team sur tout le J1 — matériel, ravito perso, sécurité.</span>
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
            <img src="img/runner-climb.jpg" alt="En montée vers la Madone" loading="lazy" style={{ objectPosition: "center 40%" }} />
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
