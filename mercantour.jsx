// Trail to Techno — Édition Mercantour (page de vente du week-end)

const M = () => window.MERCANTOUR;

const PartnerRow = () => (
  <div className="t2t-partners">
    <span className="t2t-partner">tout terrain club</span>
    <span style={{ color: "rgba(244,239,255,0.4)" }}>×</span>
    <span className="t2t-partner"><span className="r">Relais</span> des Merveilles</span>
    <span style={{ color: "rgba(244,239,255,0.4)" }}>×</span>
    <span className="t2t-partner">Näak</span>
  </div>
);

const MercHero = () => (
  <section className="t2t-hero-photo" style={{ minHeight: "94vh" }}>
    <div className="bg" style={{ backgroundImage: "url('img/lake.jpg')" }}></div>
    <div className="wrap">
      <div className="t2t-hero-meta">
        <span>Trail to Techno™ · Vol. 2 · Mercantour</span>
        <span>{M().when} · {M().where}</span>
      </div>
      <h1 className="t2t-hero-title" style={{ fontSize: "clamp(56px, 11vw, 180px)" }}>
        <span className="l1">De la mer</span>
        <span className="l2"><span className="techno">au sommet</span><span style={{ color: "#fff" }}>.</span></span>
      </h1>
      <div className="t2t-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginTop: 34 }}>
        <div>
          <p className="t2t-hero-lede" style={{ fontSize: 17, marginBottom: 22 }}>
            Deux jours pour relier Nice à la Cime du Gelas (3 143 m), un refuge posé au cœur
            de la Vallée des Merveilles, et une nuit qu'on n'oubliera pas. Course au choix,
            tous niveaux. Le reste, on le partage.
          </p>
        </div>
        <div className="t2t-hero-cta" style={{ flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href="#reserver" className="btn btn-uv">Réserver ma place →</a>
        </div>
      </div>
    </div>
  </section>
);

const MercMetabar = () => (
  <div className="wrap">
    <div className="t2t-metabar">
      <div className="m"><div className="mk">Quand</div><div className="mv">{M().when}</div></div>
      <div className="m"><div className="mk">Où</div><div className="mv">Vallée des Merveilles</div></div>
      <div className="m"><div className="mk">Camp de base</div><div className="mv">{M().base}</div></div>
      <div className="m"><div className="mk">Format phare</div><div className="mv">L'expédition · mer → sommet</div></div>
    </div>
  </div>
);

const MercExpo = () => {
  const e = M().expo;
  const area = e.profile + " L1000 260 L0 260 Z";
  return (
    <section className="t2t-sec" id="traversee">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ Le grand format · sur sélection</div>
            <h2 className="t2t-h2">L'<span className="uv">expédition</span></h2>
          </div>
          <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            Les pieds dans la Méditerranée au départ. La neige des 3 000 à l'arrivée.
            Une équipe de {e.team}, deux jours, une ligne qui ne redescend jamais vraiment.
          </p>
        </div>

        <div className="t2t-expo-grid">
          <div>
            <div className="t2t-expo-stats">
              <div className="t2t-expo-stat"><div className="n">{e.km}<span className="u"> km</span></div><div className="l">Distance · 2 jours</div></div>
              <div className="t2t-expo-stat"><div className="n">{e.dplus}<span className="u"> m</span></div><div className="l">Dénivelé positif</div></div>
              <div className="t2t-expo-stat"><div className="n">0 → 3 143<span className="u"> m</span></div><div className="l">De la mer au sommet</div></div>
              <div className="t2t-expo-stat"><div className="n">{e.team}</div><div className="l">Team expédition</div></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a href="https://wa.me/33668681188" target="_blank" rel="noopener" className="btn btn-uv">Candidater à l'expédition →</a>
              <a href="#formats" className="btn btn-line-light">Autres formats</a>
            </div>
          </div>

          <div className="t2t-profile-card">
            <div className="t2t-profile-head">
              <span><span className="sea">◆ Nice · 10 m</span> → Cime du Gelas · 3 143 m</span>
              <span>Profil réel · GPX</span>
            </div>
            <div className="t2t-profile">
              <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-label="Profil altimétrique de la traversée">
                <defs>
                  <linearGradient id="prof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--green)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--green)" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#prof)" />
                <line x1={e.splitX} y1="0" x2={e.splitX} y2="260" stroke="rgba(244,239,255,0.35)" strokeWidth="1" strokeDasharray="4 4" />
                <path d={e.profile} fill="none" stroke="var(--green)" strokeWidth="2.2" />
                <circle cx="0" cy="251" r="5" fill="var(--green)" />
                <circle cx="886" cy="14" r="5" fill="#fff" stroke="var(--green)" strokeWidth="2" />
              </svg>
            </div>
            <div className="t2t-profile-axis">
              <span className="t2t-daychip">◆ Départ Nice</span>
              <span style={{ alignSelf: "center" }}>Jour 1 · 80 km — refuge</span>
              <span className="t2t-daychip">Jour 2 · sommet ▲</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MercFormats = () => {
  const c = M().commu;
  return (
    <section className="t2t-sec" id="formats">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">☀ Du plus dur au plus chill</div>
            <h2 className="t2t-h2">Choisis ta<br/><span className="uv">distance</span>.</h2>
          </div>
          <p style={{ maxWidth: "32ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            De l'expédition mer → sommet au refuge sans chrono. Même vallée, même soirée,
            même bande. Traces GPX dévoilées bientôt.
          </p>
        </div>
        <div className="t2t-commu">
          {M().formats.map((f, i) => (
            <div key={i} className={`t2t-commu-card ${f.hero ? "join" : ""}`}>
              <div className="cc-top">
                <span className="cc-name">{f.name}</span>
                <span className="cc-km">{f.km}</span>
              </div>
              <span className="cc-tag">{f.tag}</span>
              <p className="cc-ex">{f.dplus}</p>
              <span className={`cc-foot ${f.soon ? "cc-soon" : "cc-live"}`}>
                {f.soon ? "◷ Trace bientôt" : `● ${f.foot || "Ouvert"}`}
              </span>
            </div>
          ))}
        </div>

        <div className="t2t-authion">
          <div className="aday">Dimanche</div>
          <div>
            <div className="ah">{c.sunday.title}</div>
            <div className="ax">{c.sunday.ex}</div>
          </div>
          <div className="abadge">Testing Näak · sans chrono</div>
        </div>
      </div>
    </section>
  );
};

const MercLocation = () => (
  <section className="t2t-sec" id="lieu">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le camp de base</div>
          <h2 className="t2t-h2">Relais des<br/><span className="uv">Merveilles</span></h2>
        </div>
        <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
          Un refuge de pierre et de bois au bord des lacs, à deux pas des gravures rupestres.
          Notre QG pour le week-end : on y dort, on y mange, on y danse.
        </p>
      </div>
      <div className="t2t-locgrid">
        <div className="cell a"><img src="img/refuge-relais.jpg" alt="Le Relais des Merveilles" loading="lazy" /><span className="cap">Le Relais des Merveilles</span></div>
        <div className="cell"><img src="img/chalet.jpg" alt="Le refuge" loading="lazy" /><span className="cap">Refuge · pierre &amp; bois</span></div>
        <div className="cell"><img src="img/terrace.jpg" alt="Terrasse" loading="lazy" /><span className="cap">Terrasse plein sud</span></div>
      </div>
    </div>
  </section>
);

const MercNight = () => (
  <section className="t2t-sec">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">☾ Le soir</div>
          <h2 className="t2t-h2">Repas &amp; <span className="uv">DJ set</span></h2>
        </div>
      </div>
      <div className="t2t-location">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="t2t-photo" style={{ minHeight: 260 }}>
            <img src="img/dj.jpg" alt="DJ set au refuge" loading="lazy" style={{ objectPosition: "center 35%" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="t2t-photo" style={{ minHeight: 220 }}>
              <img src="img/repas-refuge.jpg" alt="Repas de refuge" loading="lazy" style={{ objectPosition: "center 55%" }} />
            </div>
            <div className="t2t-photo" style={{ minHeight: 220 }}>
              <img src="img/naak.jpg" alt="Näak · nutrition trail" loading="lazy" style={{ objectPosition: "center 20%" }} />
            </div>
          </div>
        </div>
        <div>
          <div className="t2t-loc-list">
            <div className="t2t-loc-row">
              <span className="k">Le repas</span>
              <span className="v"><b>Dîner de refuge</b> — produits du coin, grande tablée, zéro chichi. On récupère et on trinque.</span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">Le set</span>
              <span className="v"><b>DJ set jusqu'au bout de la nuit.</b> Une platine, la montagne pour décor, et la piste qui se remplit.</span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">Le testing</span>
              <span className="v">Espace <b>Näak</b> : on teste la nutrition en conditions réelles, avant et après l'effort.</span>
            </div>
            <div className="t2t-loc-row">
              <span className="k">L'option</span>
              <span className="v"><b>Repas d'après course</b> — brunch &amp; pique-nique servis au retour du sommet.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MercProgram = () => (
  <section className="t2t-sec" id="programme">
    <div className="wrap">
      <div className="t2t-sec-head">
        <div>
          <div className="t2t-eyebrow">★ Le déroulé</div>
          <h2 className="t2t-h2">Du jeudi soir<br/>au <span className="uv">dimanche</span>.</h2>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <span className="t2t-kindchip trail">● Montagne</span>
          <span className="t2t-kindchip night">● Refuge / nuit</span>
        </div>
      </div>
      <div className="t2t-program" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {M().program.map((day) => (
          <div key={day.day} className={`t2t-day ${day.phase === "peak" ? "peak" : ""}`}>
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
                  <span className={`t2t-kindchip ${it.kind}`}>{it.kind === "trail" ? "Montagne" : "Refuge"}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MercReserve = () => (
  <section className="t2t-final" id="reserver">
    <div className="glow"></div>
    <div className="wrap">
      <div className="t2t-final-stamp"><window.Tampons.TamponMercantour /></div>
      <div className="sub">Édition Mercantour · {M().when} · places limitées</div>
      <h2>Prends ta<br/><span className="uv">place</span>.</h2>
      <div className="t2t-final-cta">
        <a href="https://tally.so/r/b5GkPg" target="_blank" rel="noopener" className="btn btn-uv">Réserver le week-end →</a>
      </div>
    </div>
  </section>
);

const MercCommu = () => {
  const c = M().commu;
  return (
    <section className="t2t-sec" id="commu">
      <div className="wrap">
        <div className="t2t-sec-head">
          <div>
            <div className="t2t-eyebrow">★ Rejoindre la bande · Samedi</div>
            <h2 className="t2t-h2">Les itinéraires<br/><span className="uv">bis</span>.</h2>
          </div>
          <p style={{ maxWidth: "34ch", color: "rgba(244,239,255,0.7)", fontSize: 15, lineHeight: 1.55 }}>
            Pas besoin de faire les 3 000 m. On t'invite à monter le samedi et à choisir
            ta manière de vivre le week-end. Traces GPX dévoilées bientôt.
          </p>
        </div>
        <div className="t2t-commu">
          {c.saturday.map((r, i) => (
            <div key={i} className={`t2t-commu-card ${r.soon ? "" : "join"}`}>
              <div className="cc-top">
                <span className="cc-name">{r.name}</span>
                <span className="cc-km">{r.km}</span>
              </div>
              <span className="cc-tag">{r.tag}</span>
              <p className="cc-ex">{r.ex}</p>
              <span className={`cc-foot ${r.soon ? "cc-soon" : "cc-live"}`}>
                {r.soon ? "◷ Trace bientôt" : "● On t'attend là-haut"}
              </span>
            </div>
          ))}
        </div>

        <div className="t2t-authion">
          <div className="aday">Dimanche</div>
          <div>
            <div className="ah">{c.sunday.title}</div>
            <div className="ax">{c.sunday.ex}</div>
          </div>
          <div className="abadge">Testing Näak · sans chrono</div>
        </div>
      </div>
    </section>
  );
};

window.MERC = { MercHero, MercMetabar, MercExpo, MercFormats, MercCommu, MercLocation, MercNight, MercProgram, MercReserve };
