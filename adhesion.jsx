// Adhésion 2027 — page club (thème clair)

const A = () => window.ADHESION;

const AdhHero = () => (
  <section className="adh-hero">
    <HeroWaves />
    <div className="wrap">
      <span className="adh-hero-eyebrow">★ Adhésion · bientôt</span>
      <h1>Rejoins<br/>la <span className="marker">meute</span>.</h1>
      <div className="adh-hero-grid">
        <p className="adh-hero-lede">
          L'adhésion au Tout Terrain Club ouvre à la <strong>rentrée de septembre 2026</strong>, avec
          une <strong>tenue complète aux couleurs du TTC</strong> — nouveau design — à la clé. Mais adhérer, c'est avant tout
          <strong> soutenir le projet</strong>, faire grandir la communauté et nous aider à monter des events toujours plus grands et plus fous.
        </p>
        <div className="adh-hero-cta">
          <a href="#adherer" className="btn btn-primary">Rejoindre la liste d'attente</a>
          <a href="#communaute" className="btn">La communauté &amp; les niveaux</a>
        </div>
      </div>
    </div>
  </section>
);

const AdhBenefits = () => (
  <section className="adh-sec" id="avantages">
    <div className="wrap">
      <div className="adh-sec-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ Ce que ça comprend</div>
          <h2 className="adh-h2">Quatre bonnes<br/>raisons d'<span className="g">adhérer</span>.</h2>
        </div>
      </div>
      <div className="adh-benefits">
        {A().benefits.map((b) => (
          <div key={b.n} className="adh-benefit" style={{ gridColumn: b.wide ? "1 / -1" : "auto", background: b.wide ? "var(--green-tint)" : undefined, borderColor: b.wide ? "var(--green-3)" : undefined }}>
            <span className="bn">{b.n}</span>
            <span className="bk">{b.k}</span>
            <span className="bv">{b.v}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdhDiscord = () => (
  <section className="adh-sec" id="communaute">
    <div className="wrap">
      <div className="adh-sec-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ Bien plus qu'un social run</div>
          <h2 className="adh-h2">Une communauté<br/>qui a des <span className="g">niveaux</span>.</h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>
          TTC c'est une meute avant tout. Les <strong>runs officiels</strong> et la <strong>commu WhatsApp</strong> restent gratuits — on ne ferme la porte à personne. L'adhésion, elle, ajoute des extras et une progression ludique, du Poussin à l'Aigle Royal.
        </p>
      </div>

      <div style={{ marginBottom: 12, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green-3)" }}>
        ★ L'aventure de la meute · plus tu cours, plus tu montes
      </div>
      <div className="adh-levels">
        {A().levels.map((l, i) => (
          <div key={i} className={`adh-level ${i === A().levels.length - 1 ? "top" : ""}`}>
            <div className="em">{l.em}</div>
            <div className="lv">NIV {l.niv}</div>
            <div className="an">{l.an}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "26px 0 12px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green-3)" }}>
        ★ Choisis ton style Trail to Techno · côté soirée
      </div>
      <div className="adh-levels">
        {A().stylesLevels.map((l, i) => (
          <div key={i} className={`adh-level ${i === A().stylesLevels.length - 1 ? "top" : ""}`}>
            <div className="em">{l.em}</div>
            <div className="lv">NIV {l.niv}</div>
            <div className="an">{l.an}</div>
          </div>
        ))}
      </div>

      <div className="adh-discord" style={{ marginTop: 32 }}>
        <span className="adh-dc-badge">La base reste gratuite</span>
        <span className="dc-eyebrow">✦ Gratuit pour tous · extras pour les membres</span>
        <h3>Les runs restent<br/>gratuits. Toujours.</h3>
        <p className="dc-lede">
          Les sorties officielles et la communauté WhatsApp ne coûteront jamais rien. <strong>Adhérer, c'est en plus</strong> : des ressources pour progresser et des events trail réservés aux membres.
        </p>
        <div className="adh-discord-grid">
          {A().community.map((d, i) => (
            <div key={i} className="adh-dc-item">
              <div className="k">{d.free ? "○ Gratuit · " : "★ Membre · "}{d.k}</div>
              <div className="v">{d.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AdhCard = () => (
  <section className="adh-sec" id="adherer">
    <div className="wrap">
      <div className="adh-card-wrap">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ Prêt·e ?</div>
          <h2 className="adh-h2">Une adhésion,<br/>toute la <span className="g">saison</span>.</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55, marginTop: 18, maxWidth: "42ch" }}>
            Ouverture à la rentrée de septembre 2026, avec une tenue complète aux couleurs du TTC — nouveau design.
            Le tarif sera annoncé au lancement. Tous niveaux : la meute attend, la meute pousse.
          </p>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: ".06em", color: "var(--muted)", textTransform: "uppercase", marginTop: 22 }}>
            Ouverture · rentrée septembre 2026
          </div>
        </div>
        <div className="adh-card">
          <div className="tier">Liste d'attente</div>
          <div className="price" style={{ fontSize: "clamp(28px, 3.2vw, 44px)", letterSpacing: "-0.01em" }}>À&nbsp;venir<span className="per"> · rentrée 2026</span></div>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: "2px 0 20px" }}>
            Laisse-nous ton mail : tu seras <strong>prévenu·e en priorité</strong> à l'ouverture des adhésions, avant tout le monde. En attendant, la <strong>commu WhatsApp et les runs officiels restent gratuits</strong>.
          </p>
          <ul>
            <li><span className="ck">✓</span><span>Prévenu·e en avant-première à l'ouverture</span></li>
            <li><span className="ck">✓</span><span>Tarif de lancement réservé aux inscrits</span></li>
            <li><span className="ck">✓</span><span>Zéro engagement — juste une place sur la liste</span></li>
          </ul>
          <a href="mailto:toutterrainclub@gmail.com?subject=Liste%20d'attente%20adh%C3%A9sion%20TTC" className="btn btn-primary">M'inscrire sur la liste d'attente →</a>
        </div>
      </div>
    </div>
  </section>
);

window.ADH = { AdhHero, AdhBenefits, AdhDiscord, AdhCard };
