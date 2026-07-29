// Trail to Techno — Édition Mercantour · sous-page Expédition Gelas (roadbook)

const GEL = {};

const GEL_DATA = {
  // Tableau des groupes (absents omis) — 1 = oui, 2 = à confirmer
  riders: [
    { n: "Alexandre", full: 1, madone: 1, summit: 1 },
    { n: "Adrien", full: 1, madone: 1, summit: 1 },
    { n: "Nico", full: 1, madone: 1, summit: 1 },
    { n: "Damien", full: 1, madone: 1, summit: 1 },
    { n: "FF", full: 1, madone: 1, summit: 1 },
    { n: "Fabien", full: 1, madone: 1, summit: 1 },
    { n: "Fanny B", full: 1, madone: 1, summit: 1 },
    { n: "Gaby", full: 1, madone: 1, summit: 1 },
    { n: "Manon", madone: 1, summit: 1 },
    { n: "Quentin", madone: 1 },
    { n: "Hugo", madone: 1 },
    { n: "Maxime T", madone: 1 },
    { n: "Lorna", summit: 2 },
    { n: "Pierre", summit: 2 },
    { n: "Gautier", assist: 1 },
    { n: "Fanny G", assist: 2 },
  ],
  roadbook: [
    {
      title: "J1", route: "Nice → Madone de Fenestre", date: "Jeudi 19:00 → vendredi ≈ 14:30",
      stats: "80,8 km · 5 850 D+ · Plan A", gpx: "gpx/expe-j1.gpx", gpxLabel: "Trace GPX J1 + ravitos",
      profile: "M0.0 244.0 L8.3 243.7 L16.7 242.7 L25.0 241.2 L33.3 240.2 L41.7 239.4 L50.0 237.6 L58.3 229.3 L66.7 223.4 L75.0 216.5 L83.3 208.5 L91.7 202.2 L100.0 193.6 L108.3 190.1 L116.7 183.4 L125.0 176.4 L133.3 171.9 L141.7 173.5 L150.0 184.3 L158.3 191.4 L166.7 185.5 L175.0 174.2 L183.3 170.3 L191.7 168.1 L200.0 165.3 L208.3 171.1 L216.7 179.6 L225.0 184.8 L233.3 186.5 L241.7 188.5 L250.0 189.1 L258.3 188.0 L266.7 183.3 L275.0 185.2 L283.3 186.7 L291.7 189.9 L300.0 187.3 L308.3 187.8 L316.7 191.3 L325.0 199.9 L333.3 211.9 L341.7 222.0 L350.0 219.8 L358.3 207.8 L366.7 197.9 L375.0 182.5 L383.3 180.1 L391.7 177.5 L400.0 171.6 L408.3 166.9 L416.7 165.1 L425.0 162.3 L433.3 159.2 L441.7 160.1 L450.0 154.9 L458.3 140.1 L466.7 128.6 L475.0 117.6 L483.3 110.9 L491.7 103.7 L500.0 97.2 L508.3 90.4 L516.7 82.3 L525.0 91.0 L533.3 92.4 L541.7 92.3 L550.0 92.0 L558.3 92.5 L566.7 94.9 L575.0 92.2 L583.3 81.9 L591.7 66.4 L600.0 64.2 L608.3 64.2 L616.7 62.8 L625.0 61.4 L633.3 53.5 L641.7 39.8 L650.0 31.3 L658.3 31.6 L666.7 33.4 L675.0 36.2 L683.3 33.9 L691.7 27.3 L700.0 30.7 L708.3 37.4 L716.7 37.8 L725.0 49.0 L733.3 56.8 L741.7 63.8 L750.0 74.1 L758.3 80.9 L766.7 81.8 L775.0 85.5 L783.3 92.9 L791.7 101.8 L800.0 114.7 L808.3 131.4 L816.7 135.2 L825.0 136.6 L833.3 134.6 L841.7 107.2 L850.0 90.4 L858.3 73.1 L866.7 57.9 L875.0 36.4 L883.3 21.1 L891.7 16.6 L900.0 23.9 L908.3 30.2 L916.7 34.4 L925.0 36.0 L933.3 39.0 L941.7 42.2 L950.0 47.8 L958.3 60.6 L966.7 52.2 L975.0 46.0 L983.3 47.5 L991.7 43.0 L1000.0 38.0",
      markers: [
        { n: 1, x: 0, y: 244 }, { n: 2, x: 81.3, y: 210.3 }, { n: 3, x: 161.6, y: 189.8 },
        { n: 4, x: 272, y: 184.9 }, { n: 5, x: 449.1, y: 156.5 }, { n: 6, x: 621.8, y: 62.3 },
        { n: 7, x: 828.9, y: 137.4 }, { n: 8, x: 1000, y: 38 },
      ],
      rows: [
        { n: 1, t: "19:00", h: "Port de Nice", km: "0", alt: "0 m", info: "Départ · event avec la commu" },
        { n: 2, t: "≈ 20:15", h: "Aire St-Michel", km: "6,6", alt: "314 m", info: "Eau · fontaine sur place" },
        { n: 3, t: "≈ 21:45", h: "Aspremont", km: "13,1", alt: "497 m", info: "Ravito selon conditions", soft: true },
        { n: 4, t: "≈ 23:45", h: "Levens", km: "21,9", alt: "543 m", info: "1er ravito assistance ✓" },
        { n: 5, t: "≈ 03:15", h: "Utelle", km: "36,5", alt: "813 m", info: "Ravito ✓" },
        { n: 6, t: "≈ 07:00", h: "Granges de la Brasque", km: "50,4", alt: "1 683 m", info: "Ravito ✓" },
        { n: 7, t: "≈ 10:15", h: "Saint-Martin-Vésubie", km: "66,9", alt: "984 m", info: "Ravito ✓" },
        { n: 8, t: "≈ 14:30", h: "Madone de Fenestre", km: "80,8", alt: "1 904 m", info: "Arrivée J1 · repas & nuit" },
      ],
    },
    {
      title: "J2", route: "Madone → Gelas → Relais", date: "Samedi · départ 05:00",
      stats: "16 km · 1 200 D+ puis la descente", gpx: "gpx/expe-j2.gpx", gpxLabel: "Trace GPX J2",
      profile: "M0.0 189.2 L8.3 186.9 L16.7 183.7 L25.0 180.2 L33.3 177.1 L41.7 173.1 L50.0 170.4 L58.3 167.9 L66.7 164.0 L75.0 161.5 L83.3 159.0 L91.7 155.4 L100.0 152.0 L108.3 147.9 L116.7 143.2 L125.0 140.8 L133.3 136.5 L141.7 129.1 L150.0 122.0 L158.3 117.5 L166.7 111.1 L175.0 105.3 L183.3 100.8 L191.7 94.8 L200.0 91.8 L208.3 88.1 L216.7 85.3 L225.0 80.7 L233.3 76.3 L241.7 70.8 L250.0 66.6 L258.3 61.1 L266.7 52.2 L275.0 48.2 L283.3 41.4 L291.7 30.2 L300.0 27.1 L308.3 24.6 L316.7 19.1 L325.0 16.2 L333.3 16.0 L341.7 16.2 L350.0 20.8 L358.3 23.8 L366.7 33.9 L375.0 42.3 L383.3 49.9 L391.7 56.5 L400.0 60.3 L408.3 66.6 L416.7 72.3 L425.0 75.5 L433.3 77.4 L441.7 80.9 L450.0 84.7 L458.3 87.7 L466.7 93.3 L475.0 104.2 L483.3 108.2 L491.7 114.6 L500.0 123.7 L508.3 131.7 L516.7 135.2 L525.0 140.0 L533.3 142.4 L541.7 143.5 L550.0 143.8 L558.3 143.2 L566.7 142.7 L575.0 140.4 L583.3 140.2 L591.7 142.6 L600.0 142.8 L608.3 142.7 L616.7 142.6 L625.0 142.5 L633.3 142.7 L641.7 144.4 L650.0 148.0 L658.3 151.2 L666.7 153.4 L675.0 154.0 L683.3 154.4 L691.7 154.4 L700.0 154.3 L708.3 155.2 L716.7 159.4 L725.0 166.6 L733.3 171.8 L741.7 173.2 L750.0 174.4 L758.3 179.3 L766.7 185.7 L775.0 191.4 L783.3 196.6 L791.7 199.8 L800.0 204.3 L808.3 209.2 L816.7 211.1 L825.0 213.0 L833.3 215.9 L841.7 218.8 L850.0 221.3 L858.3 222.6 L866.7 224.3 L875.0 225.2 L883.3 225.6 L891.7 226.9 L900.0 227.5 L908.3 228.5 L916.7 229.7 L925.0 231.8 L933.3 233.9 L941.7 235.1 L950.0 238.3 L958.3 240.1 L966.7 240.9 L975.0 242.3 L983.3 243.0 L991.7 243.4 L1000.0 244.0",
      markers: [
        { n: 1, x: 0, y: 189.2 }, { n: 2, x: 332.4, y: 16 }, { n: 3, x: 531, y: 142.5 }, { n: 4, x: 1000, y: 244 },
      ],
      rows: [
        { n: 1, t: "05:00", h: "Départ de la Madone", km: "0", alt: "1 904 m", info: "Départ · frontales" },
        { n: 2, t: "≈ 08:30", h: "Cime du Gelas", km: "5,5", alt: "3 143 m", info: "Sommet" },
        { n: 3, t: "≈ 10:30", h: "Refuge de Nice", km: "8,55", alt: "2 232 m", info: "Ravito · rendez-vous Jonction" },
        { n: 4, t: "≈ 15:00", h: "Relais des Merveilles", km: "16", alt: "1 580 m", info: "Arrivée" },
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
        <span className="l1">Prom'</span>
        <span className="l2"><span className="techno">Gelas.</span></span>
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
      <div className="m"><div className="mk">Départ</div><div className="mv">Jeudi 6 août · 19:00 · Port de Nice</div></div>
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
          Km et altitudes issus de la trace Plan A ; horaires estimés sur une base
          de 19–20 h de course. La voiture d'assistance passe à chaque point du J1.
        </p>
      </div>
      {GEL_DATA.roadbook.map((day) => (
        <div key={day.title} style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <h3 className="gel-dayh"><span className="uv">{day.title}</span> · {day.route}</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span className="t2t-daychip">{day.date}</span>
              <span className="t2t-daychip">{day.stats}</span>
              <a className="cc-foot cc-live" href={day.gpx} download style={{ textDecoration: "none" }}>⤓ {day.gpxLabel}</a>
            </div>
          </div>
          <div className="t2t-profile-card">
            <div className="gel-profwrap">
              <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true" style={{ width: "100%", height: 190, display: "block" }}>
                <path d={`${day.profile} L1000 260 L0 260 Z`} fill="var(--uv)" opacity="0.12" />
                <path d={day.profile} fill="none" stroke="var(--uv)" strokeWidth="2" />
              </svg>
              {day.markers.map((m) => (
                <span key={m.n} className="gel-mark" style={{ left: `${m.x / 10}%`, top: `${m.y / 2.6}%` }}>{m.n}</span>
              ))}
            </div>
          </div>
          <div className="gel-table-wrap" style={{ marginTop: 12 }}>
            <table className="gel-table gel-table--left">
              <thead>
                <tr><th>N°</th><th>Heure ≈</th><th>Point</th><th>Km</th><th>Alt</th><th>Ravito / rôle</th></tr>
              </thead>
              <tbody>
                {day.rows.map((r) => (
                  <tr key={r.n} style={{ opacity: r.soft ? 0.6 : 1 }}>
                    <td><span className="gel-num">{r.n}</span></td>
                    <td className="mono">{r.t}</td>
                    <td><b>{r.h}</b></td>
                    <td className="mono">{r.km}</td>
                    <td className="mono">{r.alt}</td>
                    <td>{r.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="t2t-finetext">
        ✓ = ravito confirmé · Aspremont et Cros d'Utelle selon conditions · horaires ≈ estimés (base 19–20 h de course sur le J1)
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
            <span className="t2t-daychip">◆ J1 · Nice → Madone · 80,8 km</span>
            <span style={{ alignSelf: "center" }}>96 km · 7 000 D+ au total</span>
            <span className="t2t-daychip">J2 · Madone → Gelas → Relais · 16 km ▲</span>
          </div>
        </div>
      </div>
    </section>
  );
};

GEL.Formats = () => {
  const cell = (v) => v === 1 ? <span className="ok">✓</span> : v === 2 ? <span className="tbc">à conf.</span> : <span className="no">—</span>;
  const count = (k) => GEL_DATA.riders.filter((r) => r[k] === 1).length;
  return (
    <section className="t2t-sec" id="groupes">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ Les groupes</div>
            <h2 className="t2t-h2">Qui fait <span className="uv">quoi</span>.</h2>
          </div>
        </div>
        <div className="gel-table-wrap">
          <table className="gel-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Full Expé<br/><span className="thsub">96 km · 7 000 D+</span></th>
                <th>Nice → Madone<br/><span className="thsub">80 km · 5 800 D+</span></th>
                <th>Summit only<br/><span className="thsub">14 km · 1 200 D+</span></th>
                <th>Assistance</th>
              </tr>
            </thead>
            <tbody>
              {GEL_DATA.riders.map((r) => (
                <tr key={r.n}>
                  <td>{r.n}</td>
                  <td>{cell(r.full)}</td>
                  <td>{cell(r.madone)}</td>
                  <td>{cell(r.summit)}</td>
                  <td>{cell(r.assist)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total confirmés</td>
                <td>{count("full")}</td>
                <td>{count("madone")}</td>
                <td>{count("summit")}</td>
                <td>{count("assist")}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

GEL.Gear = () => {
  const lists = [
    {
      name: "Matos J1", tag: "Obligatoire · sur soi de Nice à la Madone", km: "obligatoire",
      items: [
        "Frontale + batterie / piles de rechange",
        "Réserve d'eau 1,5 L minimum",
        "Réserve alimentaire entre les ravitos",
        "Veste imperméable",
        "Couverture de survie + sifflet",
        "Téléphone chargé + batterie externe",
        "Gobelet (zéro déchet aux ravitos)",
        "T-shirt manches longues en sous-couche (baselayer)",
        "Buff, gants, couche chaude selon météo",
      ],
    },
    {
      name: "Drop bag Madone", tag: "Confié à la team assistance · remis vendredi soir à la Madone", km: "vendredi soir",
      items: [
        "Change complet + chaussettes",
        "Doudoune pour la soirée en altitude",
        "Drap de sac (sac à viande) pour le refuge",
        "Nécessaire de toilette + boules Quies",
        "Chargeurs : téléphone, montre, frontale",
        "Tenue propre pour le J2",
        "Claquettes / sandales de récup",
      ],
    },
    {
      name: "Fourni par les Guides 06", tag: "Remis à la Madone pour la montée au Gelas", km: "J2 · fourni",
      items: [
        "Casque",
        "Baudrier",
        "Corde et encadrement technique de la montée",
      ],
    },
    {
      name: "Drop bag Relais", tag: "Confié à la team assistance · retrouvé samedi au Relais", km: "samedi",
      items: [
        "Tenue de soirée",
        "Affaires de nuit selon ta formule couchage",
        "Affaires de douche + serviette",
        "Tenue du dimanche : Boucle Autier & testing Näak",
        "Chargeurs",
      ],
    },
  ];
  return (
    <section className="t2t-sec" id="matos">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ Matos</div>
            <h2 className="t2t-h2">Quoi mettre <span className="uv">où</span>.</h2>
          </div>
          <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            Un sac sur le dos, deux drop bags dans la voiture d'assistance.
            Le matériel technique du sommet est fourni par les Guides 06.
          </p>
        </div>
        <div className="t2t-commu">
          {lists.map((l) => (
            <div key={l.name} className="t2t-commu-card">
              <div className="cc-top">
                <span className="cc-name" style={{ fontSize: 24 }}>{l.name}</span>
              </div>
              <span className="cc-tag">{l.tag}</span>
              <ul className="gel-check">
                {l.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="t2t-finetext" style={{ marginTop: 14 }}>
          Listes à ajuster selon la météo — briefing final sur le WhatsApp de l'expé.
        </p>
      </div>
    </section>
  );
};

GEL.Logistics = () => (
  <section className="t2t-sec" id="logistique">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Logistique</div>
          <h2 className="t2t-h2">Ravitos & <span className="uv">drop bag</span>.</h2>
        </div>
      </div>
      <div className="t2t-loc-list" style={{ maxWidth: 820 }}>
        <div className="t2t-loc-row">
          <span className="k">Ravitos ✓</span>
          <span className="v"><b>Levens · Utelle · Granges de la Brasque · Saint-Martin-Vésubie</b> — horaires dans le roadbook.</span>
        </div>
        <div className="t2t-loc-row">
          <span className="k">Selon conditions</span>
          <span className="v">Aspremont · Cros d'Utelle</span>
        </div>
        <div className="t2t-loc-row">
          <span className="k">Drop bags</span>
          <span className="v">Deux sacs par coureur, confiés à la <b>team assistance</b> : le drop bag Madone (remis vendredi soir à la Madone) et le drop bag Relais (retrouvé samedi au Relais des Merveilles).</span>
        </div>
        <div className="t2t-loc-row">
          <span className="k">Assistance</span>
          <span className="v">Responsable : <b>Gautier</b>.</span>
        </div>
      </div>
      <div className="t2t-warning" style={{ marginTop: 28 }}>
        <b>⚠️ Important :</b> sortie libre et non encadrée, réservée à des coureurs autonomes
        sélectionnés. Le TTC ne fournit aucun encadrement sportif et ne saurait être tenu
        responsable en cas d'accident ou de blessure. Assurances (responsabilité civile,
        individuelle accident) à la charge de chacun.
      </div>
    </div>
  </section>
);

window.GEL = GEL;
