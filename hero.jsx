// TTC — Hero (3 variants)

const HeroEditorial = () => (
  <section className="hero">
    <HeroWaves />
    <HandArrow />
    <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
      <div className="hero-meta">
        <span className="eyebrow">Saison 2026 · Nice</span>
        <span className="eyebrow">Nice · 43.695° N · 7.265° E</span>
      </div>
      <h1 className="hero-title">
        Le bitume,<br/>
        c'est pour <span className="marker">aller</span><br/>
        au sentier.
      </h1>
      <div className="hero-bottom">
        <p className="hero-lede">
          On traîne nos guêtres dans le Mercantour,
          sur le Mont Chauve et plus loin si affinités. Trail, ski-alpi, cordées de mentorat.
          Le club tient sur quatre directions et une seule meute. Bienvenue.
        </p>
        <div className="hero-stats">
          <div className="stat"><div className="num">2027</div><div className="lab">Nouvelle saison</div></div>
          <div className="stat"><div className="num">142</div><div className="lab">Courses 2026</div></div>
          <div className="stat"><div className="num">38<span style={{ fontSize: 22 }}>k</span></div><div className="lab">Cumul club·km</div></div>
          <div className="stat"><div className="num">2,1<span style={{ fontSize: 22 }}>M</span></div><div className="lab">Vertical D+</div></div>
        </div>
        <div className="hero-cta">
          <a href="#" className="btn btn-primary">Voir les courses →</a>
          <a href="https://www.strava.com/clubs/toutterrainclub" target="_blank" rel="noopener" className="btn">Rejoindre</a>
        </div>
      </div>
    </div>
  </section>
);

const HeroSplit = () => (
  <section className="hero">
    <div className="wrap">
      <div className="split-2col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "end" }}>
        <h1 className="hero-title" style={{ fontSize: "clamp(56px, 8vw, 116px)" }}>
          Tout terrain<br/>
          <span className="marker">Tous</span> ensemble.
        </h1>
        <div style={{ aspectRatio: "4/3", borderRadius: 14, overflow: "hidden" }}>
          <img src={(window.__resources && window.__resources.mercantourSunset) || "img/mercantour-sunset.jpg"} alt="Deux coureurs sur un sommet au-dessus de la mer au coucher du soleil — Mercantour"
               style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 58%" }} />
        </div>
      </div>
      <div className="hero-bottom" style={{ marginTop: 56, gridTemplateColumns: "1.1fr 1.4fr 0.7fr" }}>
        <p className="hero-lede">
          Social trail run, born in Nice, techno lovers.
        </p>
        <div className="mini-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {window.DIRECTIONS.slice(0, 3).map((d) => (
            <div key={d.n}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".16em", color: "var(--muted)" }}>{d.n}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6, letterSpacing: "-.02em" }}>{d.h}</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{d.ex}</div>
            </div>
          ))}
        </div>
        <div className="hero-cta">
          <a href="https://www.strava.com/clubs/toutterrainclub" target="_blank" rel="noopener" className="btn btn-primary">Rejoindre →</a>
        </div>
      </div>
    </div>
  </section>
);

const HeroDossard = () => (
  <section className="hero" style={{ background: "var(--paper-2)" }}>
    <div className="wrap">
      <div className="hero-meta">
        <span className="eyebrow">DOSSARD #014 · TTC · NICE</span>
        <span className="eyebrow">SAISON 2026 → 2027</span>
      </div>
      <div className="dossard-grid" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center" }}>
        <div style={{
          width: 220, height: 280,
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          borderRadius: 8,
          padding: 24,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: "8px 8px 0 var(--green)"
        }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".16em" }}>TTC · #014</div>
          <div style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 124, lineHeight: 0.9, letterSpacing: "-.04em" }}>27</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: ".16em", color: "var(--muted)" }}>SAISON 2027 · NICE</div>
        </div>
        <div>
          <h1 className="hero-title" style={{ fontSize: "clamp(56px, 8vw, 124px)" }}>
            On épingle.<br/>
            On <span className="marker">part</span>.
          </h1>
          <p className="hero-lede" style={{ marginTop: 32, maxWidth: "44ch" }}>
            Pas de classement interne, pas de coach payant, pas de sponsor.
            Juste 87 dossards qui se passent les bonnes adresses, les bons gels et les bons sentiers.
          </p>
          <div className="hero-cta" style={{ justifyContent: "flex-start", marginTop: 24 }}>
            <a href="#" className="btn btn-primary">Voir les courses →</a>
            <a href="#" className="btn">Le club</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

window.Hero = { HeroEditorial, HeroSplit, HeroDossard };
