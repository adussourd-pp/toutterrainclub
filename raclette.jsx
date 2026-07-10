// Trail to Techno — Édition Raclette (recap · archive)

const R = () => window.RACLETTE;

const RacHero = () => (
  <section className="t2t-hero-photo" style={{ minHeight: "88vh" }}>
    <div className="bg" style={{ backgroundImage: "url('img/rac-climb.jpg')" }}></div>
    <div className="wrap">
      <div className="t2t-hero-meta">
        <span>Vol. 1 · l'archive</span>
        <span>{R().when} · {R().where}</span>
      </div>
      <div style={{ marginBottom: 30 }}>
        <span className="rac-badge">◍ Édition passée</span>
      </div>
      <h1 className="t2t-hero-title" style={{ fontSize: "clamp(56px, 11vw, 190px)" }}>
        <span className="l1">Édition</span>
        <span className="l2"><span className="techno">Raclette.</span></span>
      </h1>
      <div className="t2t-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 32 }}>
        <p className="t2t-hero-lede" style={{ fontSize: 17 }}>{R().intro}</p>
        <div className="t2t-hero-cta" style={{ flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href="edition-mercantour.html" className="btn btn-uv">La prochaine édition →</a>
          <a href="#teams" className="btn btn-line-light">Le récit</a>
        </div>
      </div>
    </div>
  </section>
);

const RacMetabar = () => (
  <div className="wrap">
    <div className="t2t-metabar">
      <div className="m"><div className="mk">Quand</div><div className="mv">{R().when}</div></div>
      <div className="m"><div className="mk">Camp de base</div><div className="mv">{R().base}</div></div>
      <div className="m"><div className="mk">Massif</div><div className="mv">Peira Cava</div></div>
      <div className="m"><div className="mk">Ambiance</div><div className="mv">Neige &amp; fromage</div></div>
    </div>
  </div>
);

const RacTeams = () => (
  <section className="t2t-sec" id="teams">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le principe, déjà là</div>
          <h2 className="t2t-h2">Quatre manières<br/>d'y <span className="uv">arriver</span>.</h2>
        </div>
        <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Chacun sa distance, chacun son moyen. Tout le monde se retrouve au chalet pour la raclette.
        </p>
      </div>
      <div className="t2t-commu">
        {R().teams.map((t) => (
          <div key={t.n} className={`t2t-commu-card ${t.n === "01" ? "join" : ""}`}>
            <div className="cc-top">
              <span className="cc-name">{t.name}</span>
              <span className="cc-km">{t.n}</span>
            </div>
            <span className="cc-tag">{t.tag}</span>
            <p className="cc-ex">{t.ex}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RacProfile = () => {
  const e = R().expo;
  const area = e.profile + " L1000 260 L0 260 Z";
  return (
    <section className="t2t-sec">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ La trace de la Team Expé</div>
            <h2 className="t2t-h2">La <span className="uv">traversée</span></h2>
          </div>
        </div>
        <div className="t2t-expo-grid">
          <div>
            <div className="t2t-expo-stats">
              <div className="t2t-expo-stat"><div className="n">{e.km}<span className="u"> km</span></div><div className="l">Distance</div></div>
              <div className="t2t-expo-stat"><div className="n">{e.dplus}<span className="u"> m</span></div><div className="l">Dénivelé positif</div></div>
              <div className="t2t-expo-stat"><div className="n">{e.maxE}<span className="u"> m</span></div><div className="l">Point haut</div></div>
              <div className="t2t-expo-stat"><div className="n">1</div><div className="l">Raclette méritée</div></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a href="edition-mercantour.html" className="btn btn-uv">Voir l'édition Mercantour →</a>
            </div>
          </div>
          <div className="t2t-profile-card">
            <div className="t2t-profile-head">
              <span>Trace GPX · Team Expé</span>
              <span>Janvier 2026</span>
            </div>
            <div className="t2t-profile">
              <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-label="Profil de la traversée raclette">
                <defs>
                  <linearGradient id="racprof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--green)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--green)" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#racprof)" />
                <path d={e.profile} fill="none" stroke="var(--green)" strokeWidth="2.2" />
              </svg>
            </div>
            <div className="t2t-profile-axis">
              <span className="t2t-daychip">◆ Départ</span>
              <span style={{ alignSelf: "center" }}>45,7 km · Chalet Albarea</span>
              <span className="t2t-daychip">Chalet ▲</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RacGallery = () => (
  <section className="t2t-sec">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ En images</div>
          <h2 className="t2t-h2">Ce qu'il <span className="uv">reste</span>.</h2>
        </div>
        <p style={{ maxWidth: "30ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          De la poudreuse au fromage fondu : le premier chapitre de Trail to Techno.
        </p>
      </div>
      <div className="rac-gallery">
        {R().gallery.map((g, i) => (
          <figure key={i} className={`g${i}`}>
            <img src={g.img} alt={g.cap} loading="lazy" />
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div style={{ marginTop: 28 }}>
        <div className="t2t-eyebrow" style={{ marginBottom: 16 }}>♪ La playlist de l'édition</div>
        <iframe
          title="Playlist Spotify · Édition Raclette"
          style={{ borderRadius: 12, border: 0 }}
          src={`https://open.spotify.com/embed/playlist/${R().playlist}?utm_source=generator`}
          width="100%" height="352" frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"></iframe>
      </div>
    </div>
  </section>
);

const RacOutro = () => (
  <section className="t2t-final">
    <div className="glow"></div>
    <div className="wrap">
      <div className="t2t-final-stamp"><window.Tampons.TamponRaclette /></div>
      <div className="sub">Vol. 1 · Raclette · Janvier 2026</div>
      <h2>Un chapitre<br/><span className="uv">de plus</span>.</h2>
      <div className="t2t-final-cta">
        <a href="edition-mercantour.html" className="btn btn-uv">Cap sur le Mercantour →</a>
        <a href="trail-to-techno.html" className="btn btn-line-light">← Le concept</a>
      </div>
    </div>
  </section>
);

window.RAC = { RacHero, RacMetabar, RacTeams, RacProfile, RacGallery, RacOutro };
