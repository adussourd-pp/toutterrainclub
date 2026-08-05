// Espace membre — La meute. Aperçu compact repliable ; « Voir la carte » déroule
// EXACTEMENT la même carte que « Ma carte » (window.PROFIL.RunnerCard).
// Live via l'API ; en démo, affiche ta carte locale.

const MUSIC_EMOJI = {
  "Petit tapeur de pied": "👟", "Danseur de buffet": "🕺", "Amateur de BPM": "🎧",
  "Chasseur de caissons": "🔊", "Maxi Teufeur": "🔥", "Briseur de semelles": "🔨",
  "Machine à Techno": "🔋", "Chaman des platines": "🧙", "Légende de l'After": "🌅", "Dieu de la Rave": "👑",
};

function localProfile() {
  try { const p = JSON.parse(localStorage.getItem("ttc_profile_v1") || "null"); return p && (p.prenom || p.pseudo) ? p : null; } catch (e) { return null; }
}
function myId() { try { return localStorage.getItem("ttc_member_id") || ""; } catch (e) { return ""; } }

// Convertit un membre serveur en objet carte (même forme que « Ma carte »).
function toCard(m, live) {
  if (!live) return m; // en démo, m est déjà au format carte (localStorage)
  try { return window.PROFIL.fromServer(m); } catch (e) { return m; }
}

const MeuteCard = ({ m, me, live }) => {
  const p = toCard(m, live);
  const [open, setOpen] = React.useState(false);
  const trE = p.avatar || "🐗";
  const muE = MUSIC_EMOJI[p.techno] || "🎶";
  const tags = Array.isArray(p.tags) ? p.tags : [];
  return (
    <div className={`ms-mcard-wrap ${me ? "me" : ""} ${open ? "open" : ""}`}>
      {me && <span className="ms-mcard-you">C'est toi</span>}
      {!open ? (
        <div className="ms-mini">
          {p.role && <div className="ms-mcard-role">★ {p.role}</div>}
          <div className="ms-mini-top">
            {p.photo
              ? <span className="ms-mcard-av ms-mcard-photo"><img src={p.photo} alt="" /><i>{trE}</i></span>
              : <span className="ms-mcard-av">{trE}</span>}
            <div>
              <div className="ms-mcard-name">{p.prenom || p.pseudo || "Coureur"}{p.pseudo && p.prenom ? ` · ${p.pseudo}` : ""}</div>
              <div className="ms-mcard-sub">📍 {p.ville || "—"}</div>
            </div>
          </div>
          <div className="ms-mcard-totems">
            <div className="ms-totem-line"><span className="ms-totem-k">Totem trail</span><span className="ms-totem-v">{trE} {p.niveau || "—"}</span></div>
            <div className="ms-totem-line"><span className="ms-totem-k">Trail to Techno</span><span className="ms-totem-v">{muE} {p.techno || "—"}</span></div>
          </div>
          {tags.length > 0 && <div className="ms-mcard-tags">{tags.slice(0, 4).map((t) => <span key={t} className="ms-role-chip">{t}</span>)}</div>}
          <button type="button" className="btn btn-sm ms-see" onClick={() => setOpen(true)}>Voir la carte ▾</button>
        </div>
      ) : (
        <div className="ms-full">
          <window.PROFIL.RunnerCard p={p} />
          <button type="button" className="btn btn-sm ms-see" onClick={() => setOpen(false)}>Réduire ▴</button>
        </div>
      )}
    </div>
  );
};

const MembresPage = () => {
  const { items, state } = window.MS.useCollection("/api/members", "ttc_members_demo_unused");
  const live = window.ttcConfigured();
  const mine = localProfile();

  const list = live ? items : (mine ? [{ ...mine, id: myId() }] : []);

  return (
    <React.Fragment>
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · la meute</span>
          <h1>La <span className="marker">meute</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">Toute la meute en un coup d'œil — déroule une carte pour voir le détail (la même que la tienne). Modifie la tienne, elle se met à jour ici pour tout le monde.</p>
            <div className="adh-hero-cta">
              <a className="btn btn-primary" href="profil.html">{mine ? "Modifier ma carte" : "Créer ma carte →"}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <window.MS.MSDemo what="La liste de la meute" />}
          {state === "loading" && <p className="ms-note-muted">Chargement…</p>}
          {list.length === 0 && state !== "loading" && <div className="ms-empty">Pas encore de carte. <a className="btn btn-sm btn-primary" href="profil.html">Crée la tienne →</a></div>}
          <div className="ms-members">
            {list.map((m, i) => <MeuteCard key={m.id || i} m={m} me={!!m.id && m.id === myId()} live={live} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.MEMBRES = { MembresPage };
