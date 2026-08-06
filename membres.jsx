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

const MeuteModal = ({ p, onClose }) => {
  React.useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="me-backdrop" onClick={onClose}>
      <div className="me-modal me-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="me-close" onClick={onClose} aria-label="Fermer">×</button>
        <window.PROFIL.RunnerCard p={p} />
      </div>
    </div>
  );
};

// Carte « en attente » : membre logué mais fiche pas encore remplie.
const PendingCard = ({ me }) => (
  <div className="pf-card pf-card-pending">
    <div className="pf-card-top">
      <div className="pf-avatar">🐣</div>
      <div className="pf-card-id">
        <div className="pf-card-name">Nouveau·elle membre</div>
        <div className="pf-card-meta"><span className="pf-pending-badge">⏳ Profil à compléter</span></div>
      </div>
    </div>
    {me
      ? <p className="pf-card-bio">C'est toi ! <a href="profil.html">Complète ta carte →</a></p>
      : <p className="pf-card-bio">Vient de rejoindre la meute — sa carte arrive bientôt.</p>}
  </div>
);

const MeuteCard = ({ m, me, live }) => {
  const p = toCard(m, live);
  const incomplete = !(p.prenom || p.pseudo);
  const [open, setOpen] = React.useState(false);
  if (incomplete) {
    return (
      <div className={`ms-mcard-wrap pending ${me ? "me" : ""}`}>
        {me && <span className="ms-mcard-you">C'est toi</span>}
        <PendingCard me={me} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className={`ms-mcard-wrap clickable ${me ? "me" : ""}`} role="button" tabIndex={0}
           onClick={() => setOpen(true)}
           onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}>
        {me && <span className="ms-mcard-you">C'est toi</span>}
        <window.PROFIL.RunnerCard p={p} collapsed={true} />
      </div>
      {open && <MeuteModal p={p} onClose={() => setOpen(false)} />}
    </React.Fragment>
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
