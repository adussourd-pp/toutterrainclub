// Espace membre — Tous les membres. Les cartes de coureur publiées.
// Live via l'API ; en démo, affiche ta carte locale + invite à publier.

function localProfile() {
  try { const p = JSON.parse(localStorage.getItem("ttc_profile_v1") || "null"); return p && (p.prenom || p.pseudo) ? p : null; } catch (e) { return null; }
}

const MemberCard = ({ m }) => (
  <div className="ms-mcard">
    <div className="ms-mcard-top">
      <span className="ms-mcard-av">{m.avatar || "🐗"}</span>
      <div>
        <div className="ms-mcard-name">{m.prenom || m.pseudo || "Coureur"}{m.pseudo && m.prenom ? ` · ${m.pseudo}` : ""}</div>
        <div className="ms-mcard-sub">{[m.ville, m.niveau].filter(Boolean).join(" · ")}</div>
      </div>
    </div>
    {m.objectif && <div className="ms-mcard-obj">🎯 {m.objectif}</div>}
    {(m.distances || []).length > 0 && <div className="ms-dist-chips">{m.distances.map((d, i) => <span key={i} className="ms-dist-chip">{d}</span>)}</div>}
    <div className="ms-mcard-soc">
      {m.adhesion && <span className="ms-chip">{m.adhesion}</span>}
      {m.strava && <a href={m.strava} target="_blank" rel="noopener">🟠 Strava</a>}
      {m.insta && <a href={m.insta} target="_blank" rel="noopener">📸 Insta</a>}
    </div>
  </div>
);

const MembresPage = () => {
  const { items, state, reload } = window.MS.useCollection("/api/members", "ttc_members_demo_unused");
  const live = window.ttcConfigured();
  const mine = localProfile();
  const [pub, setPub] = React.useState("");

  const publish = async () => {
    if (!mine) { window.location.href = "profil.html"; return; }
    if (!live) { setPub("demo"); return; }
    try { await window.ttcApi("/api/members", { method: "POST", body: { id: "me-" + (mine.pseudo || mine.prenom || Date.now()), ...mine } }); setPub("ok"); await reload(); }
    catch (e) { setPub("err"); }
  };

  const list = live ? items : (mine ? [mine] : []);

  return (
    <React.Fragment>
      <window.MS.MSSubnav active="membres" />
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace membre · la meute</span>
          <h1>Tous les <span className="marker">membres</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">Les cartes de coureur de la meute. Crée la tienne, publie-la, et retrouve qui court quoi.</p>
            <div className="adh-hero-cta">
              <a className="btn" href="profil.html">Ma carte</a>
              <button className="btn btn-primary" onClick={publish}>{mine ? "Publier ma carte" : "Créer ma carte →"}</button>
            </div>
          </div>
          {pub === "ok" && <div className="ms-lock-hint" style={{ color: "var(--green-3)" }}>Carte publiée ✓</div>}
          {pub === "demo" && <div className="ms-lock-hint">Mode démo : ta carte n'est visible que par toi tant que le backend n'est pas branché.</div>}
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <window.MS.MSDemo what="La liste des membres" />}
          {list.length === 0 && state !== "loading" && <div className="ms-empty">Pas encore de carte. <a className="btn btn-sm btn-primary" href="profil.html">Crée la tienne →</a></div>}
          <div className="ms-members">
            {list.map((m, i) => <MemberCard key={m.id || i} m={m} />)}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

window.MEMBRES = { MembresPage };
