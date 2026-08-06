// Espace membre — le hub (accueil des adhérents).
// Cartes vers les outils + sections statiques (events, codes promo, agenda, sisyf).

const HUB_TOOLS = [
  { em: "🪪", t: "Ma carte de coureur", d: "Crée / mets à jour ta carte : niveau, objectifs, réseaux.", href: "profil.html" },
  { em: "🐺", t: "La meute", d: "Découvre la meute : qui court quoi, à quel niveau.", href: "membres.html" },
  { em: "📅", t: "Calendrier & courses", d: "L'agenda du club + les courses : crée-en une, inscris-toi. On se retrouve sur les dossards.", href: "calendrier.html", hot: true },
  { em: "🗺️", t: "Traces GPX", d: "Partage et retrouve les parcours du club.", href: "gpx.html" },
  { em: "👕", t: "Le merch", d: "La boutique TTC — tenues & goodies aux couleurs du club.", href: "https://toutterrainclub.sumupstore.com/", ext: true },
  { em: "🧰", t: "Préparer une course", d: "L'outil de prépa maison arrive (Noah).", soon: true },
];

// Éditable : nos prochains week-ends & events.
const NEXT_EVENTS = [
  { tag: "Trail to Techno", t: "Édition Mercantour", when: "8–9 août 2026", where: "Vallée de la Gordolasque", href: "edition-mercantour.html" },
  { tag: "À venir", t: "Édition Raclette · Volume 2", when: "Fin janvier 2027", where: "Montagne", href: "edition-raclette.html" },
];

// Éditable : codes promo partenaires (remplace les codes par les vrais).
// Remplace les codes par les vrais quand tu les as (placeholders pour l'instant).
const PROMOS = [
  { name: "Näak", role: "Nutrition trail", code: "TTC-NAAK", url: "https://www.naak.com/fr" },
  { name: "Nutripure", role: "Compléments & nutrition", code: "TTC-NUTRIPURE", url: "https://www.nutripure.fr/" },
  { name: "RunMotion", role: "Coaching running & trail", code: "TTC-RUNMOTION", url: "https://runmotioncoach.com/" },
  { name: "Strava", role: "Suivi & club TTC", code: "Sur demande", url: "https://www.strava.com/clubs/toutterrainclub" },
];

const MUSIC_EMOJI = {
  "Petit tapeur de pied": "👟", "Danseur de buffet": "🕺", "Amateur de BPM": "🎧",
  "Chasseur de caissons": "🔊", "Maxi Teufeur": "🔥", "Briseur de semelles": "🔨",
  "Machine à Techno": "🔋", "Chaman des platines": "🧙", "Légende de l'After": "🌅", "Dieu de la Rave": "👑",
};

function myProfile() {
  try {
    const raw = JSON.parse(localStorage.getItem("ttc_profile_v1") || "null");
    if (!raw || !(raw.prenom || raw.pseudo)) return null;
    // même forme que la carte (tableaux garantis) pour réutiliser RunnerCard.
    return Object.assign({ distances: [], terrains: [], tags: [], activites: [], formats: [], niveau: "", techno: "", avatar: "🐗" }, raw);
  } catch (e) { return null; }
}

const MeBadge = () => {
  const p = myProfile();
  if (!p) return (
    <div className="ms-mebadge empty">
      <span>Tu n'as pas encore de carte de coureur.</span>
      <a className="btn btn-sm btn-primary" href="profil.html">Créer ma carte →</a>
    </div>
  );
  return (
    <div className="ms-thinbadge">
      {p.photo ? <span className="ms-tb-av"><img src={p.photo} alt="" /></span> : <span className="ms-tb-av emoji">{p.avatar || "🐗"}</span>}
      <div className="ms-tb-txt">
        <div className="ms-tb-name">Salut <b>{p.prenom || p.pseudo}</b>{p.role ? <span className="ms-tb-role"> · ★ {p.role}</span> : null}</div>
        <div className="ms-tb-totems">
          <span className="ms-tb-pill">{p.avatar || "🐗"} {p.niveau || "—"}</span>
          <span className="ms-tb-pill">{MUSIC_EMOJI[p.techno] || "🎶"} {p.techno || "—"}</span>
        </div>
      </div>
      <a className="btn btn-sm" href="profil.html">Ma carte</a>
    </div>
  );
};

const MemberHub = () => (
  <React.Fragment>
    <section className="adh-hero">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Espace membre · adhérents</span>
        <h1>Ton espace,<br/>la <span className="marker">meute</span>.</h1>
        <div className="adh-hero-grid">
          <p className="adh-hero-lede">
            Tout au même endroit : ta carte de coureur, les membres du club, les courses
            où l'on se retrouve, les traces GPX et l'agenda partagé. Les runs hebdo, eux,
            restent sur WhatsApp.
          </p>
        </div>
      </div>
    </section>

    <section className="adh-sec">
      <div className="wrap">
        <div className="ms-hub-grid">
          {HUB_TOOLS.map((c, i) => (
            <a key={i} className={`ms-hub-card ${c.hot ? "hot" : ""} ${c.soon ? "soon" : ""}`} href={c.href || "#"}
               target={c.ext ? "_blank" : undefined} rel={c.ext ? "noopener" : undefined}
               onClick={c.soon ? (e) => e.preventDefault() : undefined}>
              <span className="em">{c.em}</span>
              <span className="t">{c.t}{c.ext ? " ↗" : ""}</span>
              <span className="d">{c.d}</span>
              {c.hot && <span className="ms-hub-badge">★ le nouveau</span>}
              {c.soon && <span className="ms-hub-badge" style={{ color: "var(--muted)" }}>bientôt</span>}
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="adh-sec ms-sec-alt">
      <div className="wrap">
        <div className="adh-sec-head">
          <h2 className="adh-h2">Nos prochains<br/><span className="g">week-ends & events</span>.</h2>
          <p className="ms-sec-lede">Les temps forts du club. Les courses « qui fait quoi », c'est l'onglet Courses.</p>
        </div>
        <div className="ms-events">
          {NEXT_EVENTS.map((e, i) => (
            <a key={i} className="ms-event" href={e.href || "#"}>
              <span className="ms-event-tag">{e.tag}</span>
              <span className="ms-event-t">{e.t}</span>
              <span className="ms-event-meta">{e.when} · {e.where}</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="adh-sec">
      <div className="wrap">
        <div className="adh-sec-head">
          <h2 className="adh-h2">Codes promo<br/><span className="g">partenaires</span>.</h2>
          <p className="ms-sec-lede">Réservés aux adhérents. Présente ta carte de coureur.</p>
        </div>
        <div className="ms-promos">
          {PROMOS.map((p, i) => (
            <div key={i} className="ms-promo">
              <div className="ms-promo-head">
                <span className="ms-promo-name">{p.name}</span>
                <a className="ms-promo-link" href={p.url} target="_blank" rel="noopener">site ↗</a>
              </div>
              <div className="ms-promo-role">{p.role}</div>
              <div className="ms-promo-code">{p.code}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="adh-sec ms-sec-alt">
      <div className="wrap">
        <div className="adh-sec-head">
          <h2 className="adh-h2">Le calendrier<br/><span className="g">partagé</span>.</h2>
          <p className="ms-sec-lede">L'agenda Google du club — sorties, week-ends, events.</p>
        </div>
        {window.TTC_AGENDA_EMBED ? (
          <div className="ms-agenda">
            <iframe title="Agenda TTC" src={window.TTC_AGENDA_EMBED} style={{ border: 0, width: "100%", height: 620 }} />
          </div>
        ) : (
          <div className="ms-demo">
            <b>Agenda à brancher.</b> Colle l'URL d'intégration de ton Google Agenda public dans
            <code> member-config.js</code> (variable <code>TTC_AGENDA_EMBED</code>). En attendant, la page
            <a href="calendrier.html"> Calendrier</a> reste dispo.
          </div>
        )}
      </div>
    </section>

    <div className="wrap">
      <div className="ms-orga-foot">
        <a href="charte-benevole.html">📜 Charte bénévole — le cadre de l'implication →</a>
        <a href="espace-membre.html">🔒 Espace orga (bureau) — analyse &amp; stratégie →</a>
        <span>accès réservé, mot de passe séparé</span>
      </div>
    </div>
  </React.Fragment>
);

window.HUB = { MemberHub };
