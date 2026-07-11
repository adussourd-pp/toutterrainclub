// TTC — shared atoms (logo, header, footer, decorative SVGs)

const TtcLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 48" fill="none" aria-hidden="true">
    <path d="M2 44 L18 22 L26 30 L34 14 L46 32 L52 24 L62 44 Z" fill="currentColor"/>
    <circle cx="44" cy="10" r="3.2" fill="currentColor"/>
  </svg>
);

const Brand = ({ to = "/" }) => (
  <a href={to} className="brand" aria-label="Tout Terrain Club — accueil">
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontWeight: 800 }}>tout terrain club</span>
    </span>
  </a>
);

const HeaderPublic = ({ active = "Accueil" }) => {
  const items = [
    { label: "Accueil", href: "index.html" },
    { label: "Trail to Techno", href: "trail-to-techno.html" },
    { label: "Contact", href: "mailto:toutterrainclub@gmail.com" },
  ];
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Brand />
        <nav className="nav">
          {items.map((it) => (
            <a key={it.label} href={it.href} className={it.label === active ? "active" : ""}>{it.label}</a>
          ))}
        </nav>
        <div className="header-right">
          <a href="adhesion-2027.html" className="btn btn-sm btn-primary">Saison 2027 →</a>
          <a href="#" className="btn btn-sm">Espace membre</a>
        </div>
      </div>
    </header>
  );
};

const PromoStrip = () => (
  <div className="promo-strip">
    <span><span className="dot">●</span> Trail to Techno · Édition Mercantour · Août 2026 · Vallée de la Gordolasque</span>
    <span style={{ opacity: 0.4 }}>·</span>
    <span>Depuis Nice · Saison 2026</span>
    <span style={{ opacity: 0.4 }}>·</span>
    <span>Nice · Alpes-Maritimes · 06</span>
  </div>
);

const HeroWaves = () => (
  <svg className="hero-waves" viewBox="0 0 600 320" fill="none" preserveAspectRatio="none" aria-hidden="true">
    {[0, 22, 44, 66, 88, 110, 132, 154].map((y, i) => (
      <path
        key={i}
        d={`M0 ${60 + y} C 120 ${30 + y}, 240 ${90 + y}, 360 ${50 + y} S 600 ${20 + y}, 720 ${60 + y}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.45 - i * 0.04}
      />
    ))}
  </svg>
);

const ElevSparkline = ({ stroke = "var(--ink)", fill = "var(--green-soft)" }) => (
  <svg className="elev-svg" viewBox="0 0 480 130" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <pattern id="hatch-elev" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="var(--green-3)" strokeWidth="1" opacity="0.55"/>
      </pattern>
    </defs>
    <path
      d="M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90 L480 130 L0 130 Z"
      fill="url(#hatch-elev)"
      opacity="0.7"
    />
    <path
      d="M0 110 L20 100 L48 84 L72 92 L100 70 L128 78 L160 50 L188 60 L220 32 L248 48 L280 22 L308 36 L342 60 L372 56 L404 78 L440 90 L470 84 L480 90"
      stroke={stroke}
      strokeWidth="1.6"
      fill="none"
    />
    {/* axis ticks */}
    <line x1="0" y1="125" x2="480" y2="125" stroke="var(--rule)" strokeWidth="0.6"/>
  </svg>
);

const MapPlaceholder = () => (
  <div className="map-card hatch" style={{ minHeight: 320 }}>
    <svg viewBox="0 0 600 360" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
      {/* contour-ish lines */}
      {Array.from({ length: 14 }).map((_, i) => {
        const off = i * 14;
        return (
          <path
            key={i}
            d={`M${-20 + off * 0.3} ${320 - off * 0.6} C ${120} ${260 - off * 0.4}, ${260} ${300 - off * 0.55}, ${380} ${240 - off * 0.5} S ${560} ${290 - off * 0.45}, ${640} ${260 - off * 0.5}`}
            stroke="var(--green-3)"
            strokeWidth="0.8"
            opacity="0.35"
            fill="none"
          />
        );
      })}
      {/* trace */}
      <path
        d="M40 280 C 120 240, 180 200, 230 220 S 320 290, 380 230 S 460 140, 520 180"
        stroke="var(--ink)"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="0"
      />
      <circle cx="40" cy="280" r="6" fill="var(--green)" stroke="var(--ink)" strokeWidth="2"/>
      <circle cx="520" cy="180" r="6" fill="var(--ink)"/>
      <text x="50" y="298" fontFamily="var(--f-mono)" fontSize="10" fill="var(--ink)">DÉPART</text>
      <text x="488" y="170" fontFamily="var(--f-mono)" fontSize="10" fill="var(--ink)">SOMMET</text>
    </svg>
    <div className="hatch-label" style={{ alignItems: "flex-end", justifyContent: "flex-end", padding: 16 }}>
      <span style={{ background: "var(--paper)", padding: "6px 10px", border: "1px solid var(--rule)", borderRadius: 4 }}>
        carte topo · parcours
      </span>
    </div>
  </div>
);

const HandArrow = () => (
  <div className="hand-arrow">
    <span className="hand">→ logo + meute</span>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" aria-hidden="true">
      <path d="M2 11 C 14 4, 24 18, 38 11" stroke="var(--fire)" strokeWidth="1.6" fill="none"/>
      <path d="M30 4 L40 11 L30 18" stroke="var(--fire)" strokeWidth="1.6" fill="none"/>
    </svg>
  </div>
);

const PARTNERS = [
  { name: "Chalet Albarea", role: "Refuge · Peira Cava", url: "https://www.albarea.com/" },
  { name: "Relais des Merveilles", role: "Refuge · Mercantour", url: "https://relaisdesmerveilles.com/" },
  { name: "Näak", role: "Nutrition officielle", url: "https://www.naak.com/fr" },
];

const PartnersBand = () => (
  <section className="partners">
    <div className="wrap">
      <div className="partners-head">
        <span className="eyebrow">★ Nos partenaires</span>
      </div>
      <div className="partners-grid">
        {PARTNERS.map((p) => {
          const inner = (<><div className="p-name">{p.name}</div><div className="p-role">{p.role}</div></>);
          return p.url
            ? <a className="partner" key={p.name} href={p.url} target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit" }}>{inner}</a>
            : <div className="partner" key={p.name}>{inner}</div>;
        })}
      </div>
    </div>
  </section>
);

const FooterPublic = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="footer-col">
          <Brand />
          <p style={{ color: "var(--muted)", maxWidth: "32ch", marginTop: 14, lineHeight: 1.55 }}>
            Social trail run, born in Nice, techno lovers.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 26 }}>
            <a href="https://www.strava.com/clubs/toutterrainclub" target="_blank" rel="noopener" className="chip muted">Strava</a>
            <a href="https://www.instagram.com/toutterrainclub/" target="_blank" rel="noopener" className="chip muted">Instagram</a>
            <span className="chip muted">Communauté</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Le club</h4>
          <a href="#">Charte des valeurs</a>
          <a href="mentions-legales.html">Mentions légales</a>
          <a href="mailto:toutterrainclub@gmail.com">toutterrainclub@gmail.com</a>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Tout Terrain Club · Nice · Côte d'Azur</span>
        <span>Saison 2026 · Mise à jour 12.05.2026 · 04:42</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  TtcLogo, Brand, HeaderPublic, PromoStrip,
  HeroWaves, ElevSparkline, MapPlaceholder, HandArrow,
  PartnersBand, FooterPublic,
});
