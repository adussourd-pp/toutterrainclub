// Trail to Techno — Édition Mont Chauve (l'origine · genèse)

const MC = () => window.MONTCHAUVE;

const MCPartners = () => (
  <div className="t2t-partners">
    <span className="t2t-partner">NOLT</span>
    <span style={{ color: "rgba(244,239,255,0.4)" }}>×</span>
    <span className="t2t-partner"><span className="r">tout</span> terrain club</span>
    <span style={{ color: "rgba(244,239,255,0.4)" }}>×</span>
    <span className="t2t-partner">Resonance Musics</span>
  </div>
);

const MCHero = () => (
  <section className="t2t-hero-photo" style={{ minHeight: "90vh" }}>
    <div className="bg" style={{ backgroundImage: "url('img/mc-hero.jpg')" }}></div>
    <div className="wrap">
      <div className="t2t-hero-meta">
        <span>Édition #00 · l'origine</span>
        <span>{MC().when} · {MC().where}</span>
      </div>
      <div style={{ marginBottom: 18 }}>
        <span className="rac-badge">◍ Là où tout a commencé</span>
      </div>
      <h1 className="t2t-hero-title" style={{ fontSize: "clamp(52px, 10vw, 170px)" }}>
        <span className="l1">Mont</span>
        <span className="l2"><span className="techno">Chauve.</span></span>
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 30 }}>
        <div>
          <p className="t2t-hero-lede" style={{ fontSize: 17, marginBottom: 20 }}>{MC().intro}</p>
          <MCPartners />
        </div>
        <div className="t2t-hero-cta" style={{ flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href="#video" className="btn btn-uv">▶ Le DJ set & le clip</a>
          <a href="edition-mercantour.html" className="btn btn-line-light">Aujourd'hui →</a>
        </div>
      </div>
    </div>
  </section>
);

const MCMetabar = () => (
  <div className="wrap">
    <div className="t2t-metabar">
      <div className="m"><div className="mk">Quand</div><div className="mv">{MC().when}</div></div>
      <div className="m"><div className="mk">Départ</div><div className="mv">Promenade des Anglais</div></div>
      <div className="m"><div className="mk">Sommet</div><div className="mv">Mont Chauve · 854 m</div></div>
      <div className="m"><div className="mk">Le format</div><div className="mv">Filmé comme un clip</div></div>
    </div>
  </div>
);

const MCProfile = () => {
  const e = MC().expo;
  const area = e.profile + " L1000 260 L0 260 Z";
  return (
    <section className="t2t-sec">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ La trace fondatrice</div>
            <h2 className="t2t-h2">De la mer<br/>au <span className="uv">Mont Chauve</span></h2>
          </div>
          <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            Le patron du concept, déjà là : partir en bas, finir en haut, et transformer le sommet en scène.
          </p>
        </div>
        <div className="t2t-expo-grid">
          <div>
            <div className="t2t-expo-stats">
              <div className="t2t-expo-stat"><div className="n">{e.km}<span className="u"> km</span></div><div className="l">Distance</div></div>
              <div className="t2t-expo-stat"><div className="n">{e.dplus}<span className="u"> m</span></div><div className="l">Dénivelé positif</div></div>
              <div className="t2t-expo-stat"><div className="n">0 → 854<span className="u"> m</span></div><div className="l">De la mer au sommet</div></div>
              <div className="t2t-expo-stat"><div className="n">1</div><div className="l">Concept né</div></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a href="edition-raclette.html" className="btn btn-uv">Édition suivante · Raclette →</a>
            </div>
          </div>
          <div className="t2t-profile-card">
            <div className="t2t-profile-head">
              <span><span className="sea">◆ Nice · mer</span> → Mont Chauve · 854 m</span>
              <span>Profil réel · GPX</span>
            </div>
            <div className="t2t-profile">
              <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-label="Profil Mont Chauve">
                <defs>
                  <linearGradient id="mcprof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--green)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--green)" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#mcprof)" />
                <path d={e.profile} fill="none" stroke="var(--green)" strokeWidth="2.2" />
                <circle cx="0" cy="250" r="5" fill="var(--green)" />
                <circle cx="1000" cy="8" r="5" fill="#fff" stroke="var(--green)" strokeWidth="2" />
              </svg>
            </div>
            <div className="t2t-profile-axis">
              <span className="t2t-daychip">◆ Promenade</span>
              <span style={{ alignSelf: "center" }}>13,7 km de montée continue</span>
              <span className="t2t-daychip">Sommet ▲</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MCVideo = () => (
  <section className="t2t-sec" id="video">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le clip · avec Resonance Musics</div>
          <h2 className="t2t-h2">Le son de<br/>l'<span className="uv">origine</span>.</h2>
        </div>
        <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Un DJ set enregistré au sommet, un clip monté avec Resonance Musics. Tout est en ligne.
        </p>
      </div>
      <div className="t2t-commu" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {MC().links.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener" className="t2t-commu-card join" style={{ minHeight: 160 }}>
            <div className="cc-top">
              <span className="cc-name">▶ {l.label}</span>
            </div>
            <span className="cc-tag">{l.sub}</span>
            <span className="cc-foot cc-live" style={{ marginTop: "auto" }}>● Regarder →</span>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 28 }}>
        <div className="t2t-eyebrow" style={{ marginBottom: 16 }}>♪ La playlist de l'édition</div>
        <iframe
          title="Playlist Spotify · Mont Chauve"
          style={{ borderRadius: 12, border: 0 }}
          src={`https://open.spotify.com/embed/playlist/${MC().playlist}?utm_source=generator`}
          width="100%" height="352" frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"></iframe>
      </div>
    </div>
  </section>
);

const MCGallery = () => (
  <section className="t2t-sec">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ En images</div>
          <h2 className="t2t-h2">La <span className="uv">genèse</span>.</h2>
        </div>
      </div>
      <div className="rac-gallery">
        {MC().gallery.map((g, i) => (
          <figure key={i} className={`g${i}`}>
            <img src={g.img} alt={g.cap} loading="lazy" />
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const MCOutro = () => (
  <section className="t2t-final">
    <div className="glow"></div>
    <div className="wrap">
      <div className="sub">Édition #00 · Mont Chauve · Octobre 2025</div>
      <h2>Et ce<br/><span className="uv">n'était que</span> le début.</h2>
      <div className="t2t-final-cta">
        <a href="edition-mercantour.html" className="btn btn-uv">L'édition en cours →</a>
        <a href="trail-to-techno.html" className="btn btn-line-light">← Le concept</a>
      </div>
    </div>
  </section>
);

window.MCH = { MCHero, MCMetabar, MCProfile, MCVideo, MCGallery, MCOutro };
