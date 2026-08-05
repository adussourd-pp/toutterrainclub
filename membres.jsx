// Espace membre — Tous les membres. Les cartes de coureur publiées.
// Live via l'API ; en démo, affiche ta carte locale + invite à publier.

function localProfile() {
  try { const p = JSON.parse(localStorage.getItem("ttc_profile_v1") || "null"); return p && (p.prenom || p.pseudo) ? p : null; } catch (e) { return null; }
}
function myId() { try { return localStorage.getItem("ttc_member_id") || ""; } catch (e) { return ""; } }
// terrains peut être un tableau (local) ou un objet {t,photo,role} (API)
function ext(m) {
  const t = m.terrains;
  const o = (t && !Array.isArray(t) && typeof t === "object") ? t : {};
  return { photo: m.photo || o.photo || "", role: m.role || o.role || "" };
}

const MemberCard = ({ m, me }) => {
  const e = ext(m);
  const dists = Array.isArray(m.distances) ? m.distances : [];
  return (
    <div className={`ms-mcard ${me ? "me" : ""}`}>
      {me && <span className="ms-mcard-you">C'est toi</span>}
      {e.role && <div className="ms-mcard-role">★ {e.role}</div>}
      <div className="ms-mcard-top">
        {e.photo
          ? <span className="ms-mcard-av ms-mcard-photo"><img src={e.photo} alt="" /><i>{m.avatar || "🐗"}</i></span>
          : <span className="ms-mcard-av">{m.avatar || "🐗"}</span>}
        <div>
          <div className="ms-mcard-name">{m.prenom || m.pseudo || "Coureur"}{m.pseudo && m.prenom ? ` · ${m.pseudo}` : ""}</div>
          <div className="ms-mcard-sub">{[m.ville, m.niveau].filter(Boolean).join(" · ")}</div>
        </div>
      </div>
      {m.objectif && <div className="ms-mcard-obj">🎯 {m.objectif}</div>}
      {dists.length > 0 && <div className="ms-dist-chips">{dists.map((d, i) => <span key={i} className="ms-dist-chip">{typeof d === "string" ? d : (d.km + " km")}</span>)}</div>}
      <div className="ms-mcard-soc">
        {m.adhesion && <span className="ms-chip">{m.adhesion}</span>}
        {m.strava && <a href={m.strava} target="_blank" rel="noopener">🟠 Strava</a>}
        {m.insta && <a href={m.insta} target="_blank" rel="noopener">📸 Insta</a>}
      </div>
    </div>
  );
};

const MembresPage = () => {
  const { items, state, reload } = window.MS.useCollection("/api/members", "ttc_members_demo_unused");
  const live = window.ttcConfigured();
  const mine = localProfile();

  const list = live ? items : (mine ? [{ ...mine, id: myId() }] : []);

  return (
    <React.Fragment>
      <window.MS.MSSubnav active="membres" />
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · la meute</span>
          <h1>La <span className="marker">meute</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">Les cartes de coureur de la meute. Crée / modifie la tienne — elle se met à jour ici pour tout le monde.</p>
            <div className="adh-hero-cta">
              <a className="btn btn-primary" href="profil.html">{mine ? "Modifier ma carte" : "Créer ma carte →"}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <window.MS.MSDemo what="La liste des membres" />}
          {list.length === 0 && state !== "loading" && <div className="ms-empty">Pas encore de carte. <a className="btn btn-sm btn-primary" href="profil.html">Crée la tienne →</a></div>}
          <div className="ms-members">
            {list.map((m, i) => <MemberCard key={m.id || i} m={m} me={!!m.id && m.id === myId()} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.MEMBRES = { MembresPage };
