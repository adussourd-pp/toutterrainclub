// Trail to Techno — CONCEPT page (générique)

const T2THeroPhoto = () => (
  <section className="t2t-hero-photo">
    <div className="bg" style={{ backgroundImage: "url('img/ttc-flags.jpg')", backgroundPosition: "center 60%" }}></div>
    <div className="wrap">
      <h1 className="t2t-hero-title">
        <span className="l1">Trail</span>
        <span className="l2"><span className="to">to</span><span className="techno">Techno</span></span>
      </h1>
      <div className="t2t-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 36 }}>
        <p className="t2t-hero-lede" style={{ fontSize: 18 }}>
          Un but à atteindre ensemble. Une sortie trail en pleine nature,
          chacun à son rythme, prolongée par une soirée qui vient la célébrer.
        </p>
        <div className="t2t-hero-cta" style={{ flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href="edition-mercantour.html" className="btn btn-uv">Voir l'édition Mercantour →</a>
        </div>
      </div>
    </div>
  </section>
);

const T2TMetabar = () => (
  <div className="wrap">
    <div className="t2t-metabar">
      <div className="m"><div className="mk">Le principe</div><div className="mv">Un but, ensemble</div></div>
      <div className="m"><div className="mk">Le terrain</div><div className="mv">La nature, en off</div></div>
      <div className="m"><div className="mk">La bande</div><div className="mv">Chacun son rythme</div></div>
      <div className="m"><div className="mk">L'esprit</div><div className="mv">Nature &amp; soirée festive</div></div>
    </div>
  </div>
);

const T2TManifesto = () => (
  <section className="t2t-sec" id="concept">
    <div className="wrap">
      <div className="t2t-eyebrow">★ Le concept</div>
      <p className="t2t-manifesto">
        Ce n'est pas une course. C'est bien plus qu'une <span className="uv">expédition</span>.
        <span className="dim"> C'est d'abord quelque chose à vivre — et à partager.</span>
      </p>
    </div>
  </section>
);

const T2TPillars = () => (
  <section className="t2t-sec">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Comment ça marche</div>
          <h2 className="t2t-h2">Un week-end,<br/><span className="uv">trois temps</span>.</h2>
        </div>
      </div>
      <div className="t2t-pillars">
        {window.T2T_PILLARS.map((p) => (
          <div key={p.n} className="t2t-pillar">
            <div className="t2t-pillar-media">
              <img src={p.img} alt={p.k} loading="lazy" />
            </div>
            <div className="t2t-pillar-body">
              <span className="pn">{p.n}</span>
              <span className="pk">{p.k}</span>
              <h3 className="ph">{p.h}</h3>
              <p className="pe">{p.ex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const T2TIncludes = () => (
  <section className="t2t-sec">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Dans chaque édition</div>
          <h2 className="t2t-h2">Ce qu'il y a<br/>dans le <span className="uv">sac</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Chaque édition change de massif et de refuge. L'ADN, lui, ne bouge pas.
        </p>
      </div>
      <div className="t2t-includes">
        {window.T2T_INCLUDES.map((it, i) => (
          <div key={i} className="t2t-include">
            <div className="ik">{it.k}</div>
            <div className="iv">{it.v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const T2TEditions = () => (
  <section className="t2t-sec" id="editions">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Les éditions</div>
          <h2 className="t2t-h2">Une édition en<br/>amène une <span className="uv">autre</span>.</h2>
        </div>
        <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Ça a commencé sur le Mont Chauve, filmé comme un clip avec NOLT &amp; Resonance Musics. Depuis, chaque édition écrit sa propre nuit.
        </p>
      </div>
      <div className="t2t-editions t2t-editions--stamps">
        <a href="edition-mercantour.html" className="t2t-edition stamped current" style={{ "--ed": "#e23a2a" }}>
          <div className="em"><window.Tampons.TamponMercantour /></div>
          <div className="eb">
            <span className="est"><b className="ed-pill">Ouvert</b> · Août 2026</span>
            <span className="eh">Édition Mercantour</span>
            <span className="ee">De la mer au sommet. Nice → Cime du Gelas, 3 143 m. Refuge : le Relais des Merveilles.</span>
            <span className="go">Découvrir le week-end →</span>
          </div>
        </a>
        <a href="edition-raclette.html" className="t2t-edition stamped locked" data-ed="raclette" style={{ "--ed": "#e2892e" }} onClick={() => window.unlockEdition && window.unlockEdition("raclette")}>
          <div className="em"><window.Tampons.TamponRaclette /></div>
          <div className="eb">
            <span className="est">◍ Archive · Janvier 2026</span>
            <span className="eh">Édition Raclette</span>
            <span className="ee">Chalet Albarea, Peira Cava. Neige fraîche, traversée jusqu'au refuge, raclette qui finit en dancefloor.</span>
            <span className="go">Revivre l'édition →</span>
          </div>
        </a>
        <a href="edition-mont-chauve.html" className="t2t-edition stamped locked" data-ed="montchauve" style={{ "--ed": "#7ddf64" }} onClick={() => window.unlockEdition && window.unlockEdition("montchauve")}>
          <div className="em"><window.Tampons.TamponMontChauve /></div>
          <div className="eb">
            <span className="est">◍ L'origine · Octobre 2025</span>
            <span className="eh">Édition Mont Chauve</span>
            <span className="ee">Là où tout a commencé. Nice → Mont Chauve, filmé comme un clip avec NOLT &amp; Resonance Musics.</span>
            <span className="go">Revoir la genèse →</span>
          </div>
        </a>
      </div>
    </div>
  </section>
);

const T2TFinal = () => (
  <section className="t2t-final">
    <div className="glow"></div>
    <div className="wrap">
      <div className="sub">Trail to Techno · un format Tout Terrain Club</div>
      <h2>Grimper le jour,<br/><span className="uv">Danser</span> la nuit.</h2>
    </div>
  </section>
);

const T2TVision = () => (
  <section className="t2t-sec" id="projet">
    <div className="wrap">
      <div className="t2t-eyebrow">★ Le projet · vision</div>
      <p className="t2t-manifesto" style={{ marginBottom: 40 }}>
        Et si le prochain sommet,<br/>c'était un <span className="uv">festival</span> ?
      </p>
      <p style={{ maxWidth: "62ch", color: "rgba(244,239,255,0.72)", fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>
        Trail to Techno a commencé à quelques potes et un fumigène sur le Mont Chauve. Aujourd'hui c'est
        des week-ends complets en refuge. Demain — on ne se l'interdit pas — un vrai festival de montagne :
        plusieurs jours, plusieurs sommets, plusieurs scènes. On le construit édition après édition,
        avec la meute. Pas de date. Juste une direction.
      </p>
      <div className="t2t-commu">
        <div className="t2t-commu-card">
          <div className="cc-top"><span className="cc-name">Le mode clip</span><span className="cc-km">01</span></div>
          <span className="cc-tag">Test du concept</span>
          <p className="cc-ex">Mont Chauve, filmé comme un clip. L'idée grandeur nature : grimper le jour, danser la nuit.</p>
          <span className="cc-foot cc-live">● Testé · Mont Chauve</span>
        </div>
        <div className="t2t-commu-card join">
          <div className="cc-top"><span className="cc-name">Les week-ends</span><span className="cc-km">02</span></div>
          <span className="cc-tag">Preuve du concept</span>
          <p className="cc-ex">Raclette puis Mercantour : le format prend, la meute grandit. Un but, un refuge, une nuit.</p>
          <span className="cc-foot cc-live">● En cours</span>
        </div>
        <div className="t2t-commu-card">
          <div className="cc-top"><span className="cc-name">Le festival</span><span className="cc-km">03</span></div>
          <span className="cc-tag">L'horizon</span>
          <p className="cc-ex">Plusieurs jours, plusieurs scènes, un massif entier qui vibre.</p>
          <span className="cc-foot cc-soon">◷ Horizon 2027</span>
        </div>
      </div>
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", borderTop: "1px solid rgba(244,239,255,0.14)", paddingTop: 32 }}>
        <p style={{ maxWidth: "48ch", color: "rgba(244,239,255,0.8)", fontSize: 16, lineHeight: 1.55, margin: 0 }}>
          <span className="uv" style={{ fontWeight: 700 }}>On cherche des partenaires</span> pour écrire la suite — marques,
          refuges, artistes, prod son &amp; image. Envie de bâtir le festival avec nous ?
        </p>
        <a href="mailto:toutterrainclub@gmail.com?subject=Partenariat%20Trail%20to%20Techno" className="btn btn-uv">Devenir partenaire →</a>
      </div>
    </div>
  </section>
);

const T2TName = () => (
  <section className="t2t-sec" id="mot-a-mot">
    <div className="wrap">
      <div className="t2t-name-grid">
        <div className="t2t-word trail">
          <div className="w">Trail</div>
          <div className="wsub">☀ Le jour</div>
          <div className="wdef">Le sommet, l'effort, la sueur partagée. On part en bas, on vise le haut — du 10 km au grand raid, tous niveaux confondus.</div>
        </div>
        <div className="t2t-word to">
          <div className="w">TO</div>
          <div className="wsub">→ Le passage</div>
          <div className="wdef">Le trait d'union. Ce moment précis où les jambes s'arrêtent et où le son démarre. Du refuge au dancefloor.</div>
        </div>
        <div className="t2t-word techno">
          <div className="w">Techno</div>
          <div className="wsub">☾ La nuit</div>
          <div className="wdef">Le refuge devient scène. Un DJ set, une meute, la montagne pour dancefloor. On célèbre ce qu'on vient de grimper.</div>
        </div>
      </div>
    </div>
  </section>
);

window.T2T = { T2THeroPhoto, T2TMetabar, T2TManifesto, T2TName, T2TPillars, T2TIncludes, T2TEditions, T2TVision, T2TFinal };
