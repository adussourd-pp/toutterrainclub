// TTC — Sections : next race, battle teaser, articles, projects, directions, join

const NextRace = () => (
  <section className="next-race">
    <div className="wrap">
      <div className="race-grid">
        <div>
          <div className="race-eyebrow">
            <span className="pulse"></span>
            <span className="eyebrow">★ Prochaine sortie club</span>
          </div>
          <h2 className="race-title">Trail des<br/>Aiguilles Rouges</h2>
          <div className="race-meta">
            <span>Sam. 14 juin 2026</span>
            <span className="sep">·</span>
            <span>Chamonix</span>
            <span className="sep">·</span>
            <span>32 km</span>
            <span className="sep">·</span>
            <span>2 400 D+</span>
          </div>
          <div className="elev-row">
            <ElevSparkline />
            <div className="race-chips">
              <span className="chip">12 inscrits du club</span>
              <span className="chip" style={{ background: "var(--paper)", borderColor: "var(--rule)", color: "var(--ink)" }}>3 covoit. dispo</span>
              <span className="chip dark">M+30 J avant départ</span>
            </div>
          </div>
          <div className="avatars">
            {window.TTC_MEMBERS.slice(0, 5).map((m, i) => (
              <span key={i} className={`avatar ${i === 0 ? "green" : ""}`} title={m.n}>{m.i}</span>
            ))}
            <span className="avatar dark">+7</span>
          </div>
          <div className="race-cta">
            <a href="#" className="btn btn-primary">Je m'inscris ✓</a>
            <a href="#" className="btn btn-ghost" style={{ border: "none" }}>Détails du parcours →</a>
          </div>
        </div>
        <MapPlaceholder />
      </div>
    </div>
  </section>
);

const BracketCell = ({ stage, label, num, status, time, alive, fin }) => (
  <div className={`bracket-cell ${alive ? "alive" : ""} ${fin ? "fin" : ""}`}>
    <div className="bc-eb">{label}</div>
    <div className="bc-num">{num}</div>
    <div className="bc-st">{status}</div>
    <div className="bc-time">{time}</div>
  </div>
);

const Countdown = () => {
  const [t, setT] = React.useState({ d: 128, h: 7, m: 42, s: 19 });
  React.useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { d, h, m, s } = p;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        if (d < 0) { d = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="countdown">
      <div className="wrap">
        <div className="countdown-inner">
          <div className="cd-cell"><div className="cd-num">{pad(t.d)}</div><div className="cd-lab">Jours</div></div>
          <div className="cd-cell"><div className="cd-num">{pad(t.h)}</div><div className="cd-lab">Heures</div></div>
          <div className="cd-cell"><div className="cd-num">{pad(t.m)}</div><div className="cd-lab">Minutes</div></div>
          <div className="cd-cell"><div className="cd-num">{pad(t.s)}</div><div className="cd-lab">Secondes</div></div>
          <div className="cd-tagline">
            <div className="a">★ Compte à rebours</div>
            <div className="b">Battle Royale 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BattleTeaser = () => {
  const cells = [
    { label: "Départ", num: 50, status: "en piste", time: "00:00", alive: true },
    { label: "Tour 1", num: 49, status: "-1 OUT", time: "06:24", alive: true },
    { label: "Tour 5", num: 25, status: "-25 OUT", time: "32:12", alive: true },
    { label: "Tour 10", num: 12, status: "-38 OUT", time: "1h12", alive: true },
    { label: "Tour 15", num: 6, status: "-44 OUT", time: "1h58" },
    { label: "Tour 18", num: 3, status: "-47 OUT", time: "2h32" },
    { label: "Fin", num: 1, status: "Le dernier", time: "FINISH", fin: true },
  ];
  return (
    <section className="battle">
      {/* topo lines bg */}
      <svg className="topo" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${500 - i * 22} C 240 ${480 - i * 22}, 480 ${520 - i * 18}, 720 ${480 - i * 22} S 1200 ${500 - i * 18}, 1440 ${480 - i * 22}`}
            stroke="rgba(125,223,100,0.22)"
            strokeWidth="0.8"
            fill="none"
          />
        ))}
      </svg>

      <div className="wrap battle-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div className="battle-tag">
            <span className="live"></span>
            <span>1ère édition · organisée par le TTC</span>
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".18em", color: "rgba(250,250,247,0.6)" }}>
            06.08.2026 · NICE
          </div>
        </div>

        <h2 className="battle-title">
          BATTLE<br/>
          <span className="green">ROYALE</span>
        </h2>

        <div className="battle-grid">
          <div>
            <div className="hand" style={{ color: "var(--green)", fontSize: 26, marginBottom: 14 }}>
              ☞ on part 50, on revient 1.
            </div>
            <p className="battle-lede">
              Une course inspirée des battle royale gaming. Boucle de 5 km en forêt du Mercantour. À chaque tour,
              le dernier est éliminé. Le vainqueur est le dernier en piste.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#" className="btn btn-primary">+ M'inscrire (37/50)</a>
              <a href="#" className="btn btn-dark" style={{ background: "transparent", color: "var(--paper)", borderColor: "rgba(255,255,255,0.3)" }}>Règlement</a>
              <a href="#" className="btn btn-dark" style={{ background: "transparent", color: "var(--paper)", borderColor: "rgba(255,255,255,0.3)" }}>★ Le parcours</a>
            </div>
          </div>
          <div className="battle-numbers">
            <div>
              <div className="num">50</div>
              <div className="lab">Partants</div>
            </div>
            <div>
              <div className="num green">1</div>
              <div className="lab">Survivant</div>
            </div>
            <div>
              <div className="num">2k€</div>
              <div className="lab">Dotation</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 56, marginBottom: 20 }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(250,250,247,0.6)" }}>Déroulé de la course</div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 36, letterSpacing: "-.03em", marginTop: 6 }}>
              50 → 25 → 12 → 6 → 3 → <span style={{ color: "var(--green)" }}>1</span>
            </div>
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".18em", color: "rgba(250,250,247,0.6)", border: "1px solid rgba(255,255,255,0.18)", padding: "8px 14px", borderRadius: 999 }}>
            ~4h30 de course estimée
          </div>
        </div>

        <div className="bracket">
          {cells.map((c, i) => <BracketCell key={i} {...c} />)}
        </div>
      </div>
    </section>
  );
};

const Articles = () => (
  <section className="articles">
    <div className="wrap">
      <div className="articles-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ Le journal</div>
          <h2 className="articles-h2">Récits, conseils, retours de course.</h2>
        </div>
        <a href="#" className="btn">Tous les articles →</a>
      </div>
      <div className="articles-grid">
        {window.ARTICLES.map((a, i) => (
          <a key={i} className={`art-card ${a.tone === "feature" ? "feature" : ""}`} href="#">
            <div className="img hatch">
              <div className="hatch-label">{a.tone === "feature" ? "photo terrain · 5/4" : "photo terrain · 4/3"}</div>
            </div>
            <div className="meta">
              <span>{a.cat}</span>
              <span style={{ color: "var(--rule)" }}>·</span>
              <span>{a.date}</span>
              <span style={{ color: "var(--rule)" }}>·</span>
              <span>{a.read}</span>
            </div>
            <h3 className="h">{a.title}</h3>
            <p className="ex">{a.excerpt}</p>
            <div className="meta" style={{ marginTop: -8 }}>
              <span>par {a.author}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="projects">
    <div className="wrap">
      <div className="projects-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ Les chantiers</div>
          <h2 className="articles-h2" style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>Quatre projets, un seul club.</h2>
        </div>
        <a href="#" className="btn">Tous les projets →</a>
      </div>
      <div className="projects-grid">
        {window.PROJECTS.map((p, i) => (
          <a key={i} href="#" className={`proj-card ${p.flavor === "battle" ? "battle" : ""}`}>
            <div>
              <div className="num">{p.n}</div>
              <h3 className="h">{p.title}</h3>
              <p className="ex">{p.desc}</p>
            </div>
            <div className="foot">
              <span>{p.tag}</span>
              <span>{p.state} →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Directions = () => (
  <section className="directions">
    <div className="wrap">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        <div className="eyebrow">★ Quatre directions</div>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: ".06em" }}>
          ce qu'on fait, ce qu'on partage, ce qu'on défend
        </div>
      </div>
      <div className="directions-grid">
        {window.DIRECTIONS.map((d) => (
          <div className="dir-cell" key={d.n}>
            <div className="num">{d.n}</div>
            <h3 className="h">{d.h}</h3>
            <p className="ex">{d.ex}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const JoinCta = () => (
  <section className="join">
    <svg className="topo" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${320 - i * 24} C 240 ${300 - i * 24}, 480 ${340 - i * 20}, 720 ${300 - i * 24} S 1200 ${320 - i * 20}, 1440 ${300 - i * 24}`}
          stroke="rgba(125,223,100,0.18)"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
    <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
      <div className="join-grid">
        <div>
          <div className="eyebrow" style={{ color: "var(--green)" }}>★ Rejoindre la meute</div>
          <h2 className="join-h" style={{ marginTop: 14 }}>
            Tu cours déjà,<br/>
            Tu cours <span style={{ color: "var(--green)" }}>mieux</span> à plusieurs.
          </h2>
          <p className="join-lede">
            Les sorties du club sont <strong style={{ color: "var(--paper)" }}>gratuites</strong> et ouvertes à tous,
            postées chaque semaine sur Strava. L'adhésion, elle, ajoute les à-côtés :
            infos en prio, réducs sur les events, ressources pour progresser et soirées.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 260 }}>
          <a href="adhesion-2027.html" className="btn btn-primary">Adhérer →</a>
          <a href="#" className="btn btn-dark" style={{ background: "transparent", color: "var(--paper)", borderColor: "rgba(255,255,255,0.3)" }}>Nos sorties sur Strava</a>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".06em", color: "rgba(250,250,247,0.5)", textTransform: "uppercase", marginTop: 8 }}>
            Sorties gratuites · départ Nice
          </div>
        </div>
      </div>
    </div>
  </section>
);

const T2TTeaser = () => (
  <section className="t2t-teaser">
    <div className="t2t-glow"></div>
    <svg className="topo" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${500 - i * 24} C 240 ${480 - i * 24}, 480 ${520 - i * 20}, 720 ${480 - i * 24} S 1200 ${500 - i * 20}, 1440 ${480 - i * 24}`}
          stroke="rgba(177,108,255,0.18)"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
    <div className="wrap">
      <div className="t2t-teaser-top">
        <div className="t2t-kicker">
          <span className="beat"></span>
          <span>Un concept unique signé Tout Terrain Club</span>
        </div>
      </div>

      <h2 className="t2t-lockup">
        <span className="trail">Trail</span>
        <span className="to">to</span>
        <span className="techno">Techno</span>
      </h2>

      <div className="t2t-teaser-grid">
        <p className="t2t-teaser-lede">
          Un sommet à gravir le jour, un refuge de montagne pour camp de base,
          et une nuit qui dure jusqu'à ce que le soleil repasse la crête.
          Ce n'est pas une course — c'est à vivre, et à partager.
        </p>
        <div className="t2t-daynight">
          <div className="cell day">
            <div className="eb">☀ Le jour</div>
            <div className="big">On grimpe</div>
            <div className="sm">De la simple rando à une vraie expédition.</div>
          </div>
          <div className="cell night">
            <div className="eb">☾ La nuit</div>
            <div className="big">On partage</div>
            <div className="sm">Repas de refuge + DJ set jusqu'au bout de la nuit.</div>
          </div>
        </div>
      </div>

      <div className="t2t-teaser-cta">
        <a href="trail-to-techno.html" className="btn btn-uv">Découvrir le concept →</a>
        <a href="edition-mercantour.html" className="btn btn-line-light">Voir l'édition Mercantour</a>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", color: "var(--acid)", textTransform: "uppercase", marginLeft: "auto", border: "1px solid color-mix(in oklab, var(--acid) 45%, transparent)", borderRadius: "var(--radius-pill)", padding: "6px 12px", alignSelf: "center" }}>
          ● Inscriptions ouvertes
        </span>
      </div>
    </div>
  </section>
);

const WeeklyRuns = () => {
  const runs = [
    { day: "Lundi", name: "Happy Trail", emoji: "🌞", desc: "Plus court, plus accessible. La porte d'entrée du club — et ça prend de l'ampleur.", meta: "Format découverte", tag: "Tous niveaux" },
    { day: "Lundi", name: "La Boucle", emoji: "⛰️", desc: "Le grand tour hebdo. Ça grimpe, mais ça reste convivial — le rendez-vous des jambes qui veulent du D+.", meta: "12 km · 500 D+", tag: "Intermédiaire" },
    { day: "Jeudi", name: "Jeudi à l'aventure", emoji: "🧭", desc: "Le parcours change chaque semaine. Exploration, surprise, terrain nouveau à chaque fois.", meta: "Surprise hebdo", tag: "Variable" },
  ];
  return (
    <section className="next-race">
      <div className="wrap">
        <div className="race-eyebrow">
          <span className="pulse"></span>
          <span className="eyebrow">★ Nos rendez-vous hebdo</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
          <h2 className="race-title" style={{ margin: 0 }}>On court<br/>ensemble.</h2>
          <div style={{ maxWidth: "36ch" }}>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              Tous les lundis et jeudis, au départ de Nice. Sorties officielles gratuites, ouvertes à tous les niveaux.
            </p>
            <a href="https://www.strava.com/clubs/toutterrainclub" target="_blank" rel="noopener" className="chip" style={{ marginTop: 14, textDecoration: "none" }}>● Postées chaque semaine sur Strava →</a>
          </div>
        </div>
        <div className="mini-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {runs.map((r, i) => (
            <a key={i} href="#" className="proj-card">
              <span style={{ position: "absolute", top: 18, right: 18, fontSize: 22, lineHeight: 1 }} aria-hidden="true">{r.emoji}</span>
              <div>
                <div className="num">{r.day}</div>
                <h3 className="h">{r.name}</h3>
                <p className="ex">{r.desc}</p>
              </div>
              <div className="foot">
                <span>{r.meta}</span>
                <span>{r.tag} →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Sections = { NextRace, WeeklyRuns, BattleTeaser, Countdown, T2TTeaser, Articles, Projects, Directions, JoinCta };
