// Espace orga — Accès & codes. Toi (bureau) génères des codes d'accès uniques,
// tu vois qui est actif, tu peux révoquer. Protégé par un mot de passe admin
// (secret Cloudflare ADMIN_SECRET), séparé du reste.

const ADMIN_KEY = "ttc_admin";
const getSecret = () => { try { return sessionStorage.getItem(ADMIN_KEY) || ""; } catch (e) { return ""; } };

function waMessage(name, display) {
  const who = name ? name.split(" ")[0] : "";
  return `Salut${who ? " " + who : ""} ! Voici ton code d'accès perso à l'espace membre du Tout Terrain Club : ${display}\n\nVa sur toutterrainclub.com → Espace membre, entre ton code, et remplis ta carte de coureur. À la meute 🐗`;
}

const Badge = ({ inv }) => {
  if (inv.revoked) return <span className="ac-badge rev">Révoqué</span>;
  if (inv.used_at) return <span className="ac-badge act">Actif{inv.member ? " · " + inv.member : ""}</span>;
  return <span className="ac-badge new">Pas encore utilisé</span>;
};

const CodeRow = ({ inv, onRevoke, onCopy, copied }) => (
  <tr className={inv.revoked ? "ac-off" : ""}>
    <td className="ac-code-c"><code>{inv.display}</code></td>
    <td className="ac-note-c">{inv.note || <em className="pf-hint">—</em>}</td>
    <td><Badge inv={inv} /></td>
    <td className="ac-act-c">
      <button className="btn btn-sm" onClick={() => onCopy(inv)}>{copied === inv.code ? "✓ Copié" : "Copier le message"}</button>
      {!inv.revoked && <button className="ac-revoke" title="Révoquer" onClick={() => onRevoke(inv.code)}>Révoquer</button>}
    </td>
  </tr>
);

const AccesPage = () => {
  const live = window.ttcConfigured();
  const [secret, setSecret] = React.useState(getSecret);
  const [invites, setInvites] = React.useState(null); // null = pas encore chargé
  const [note, setNote] = React.useState("");
  const [count, setCount] = React.useState(1);
  const [made, setMade] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [tryPw, setTryPw] = React.useState("");
  const [copied, setCopied] = React.useState("");

  const load = React.useCallback(async (sec) => {
    try {
      const d = await window.ttcApi("/api/invites", { headers: { "x-ttc-admin": sec } });
      setInvites(d.invites || []); setErr(""); return true;
    } catch (e) {
      const s = String((e && e.message) || "");
      if (s.indexOf("403") >= 0) setErr("Mot de passe admin incorrect.");
      else setErr("Chargement impossible — réessaie.");
      return false;
    }
  }, []);

  React.useEffect(() => { if (secret && live) load(secret); /* eslint-disable-next-line */ }, []);

  const unlock = async (e) => {
    e.preventDefault();
    if (!tryPw.trim()) return;
    setBusy(true);
    const ok = await load(tryPw.trim());
    if (ok) { try { sessionStorage.setItem(ADMIN_KEY, tryPw.trim()); } catch (x) {} setSecret(tryPw.trim()); }
    setBusy(false);
  };

  const generate = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const d = await window.ttcApi("/api/invites", { method: "POST", headers: { "x-ttc-admin": secret }, body: { note, count: Number(count) || 1 } });
      setMade(d.created || []); setNote(""); setCount(1);
      await load(secret);
    } catch (x) { setErr("Génération impossible."); }
    setBusy(false);
  };

  const revoke = async (code) => {
    if (!window.confirm("Révoquer ce code ? La personne ne pourra plus entrer avec.")) return;
    try { await window.ttcApi("/api/invites/revoke", { method: "POST", headers: { "x-ttc-admin": secret }, body: { code } }); await load(secret); }
    catch (x) { setErr("Révocation impossible."); }
  };

  const copyMsg = async (inv) => {
    const txt = waMessage(inv.note, inv.display);
    try { await navigator.clipboard.writeText(txt); } catch (e) { window.prompt("Copie le message :", txt); }
    setCopied(inv.code); window.setTimeout(() => setCopied(""), 2200);
  };

  const unlocked = invites !== null;

  return (
    <React.Fragment>
      <window.MEMBER.OrgaSubnav active="acces" />
      <section className="adh-hero">
        <HeroWaves />
        <div className="wrap">
          <span className="adh-hero-eyebrow">★ Espace orga · accès</span>
          <h1>Accès &amp; <span className="marker">codes</span>.</h1>
          <div className="adh-hero-grid">
            <p className="adh-hero-lede">
              Chaque membre entre dans l'espace avec <strong>son code perso unique</strong>. Ici tu en
              génères, tu vois qui est actif, et tu peux <strong>révoquer</strong> à tout moment. Un code
              = une personne. C'est ça qui empêche les fraudes.
            </p>
          </div>
        </div>
      </section>

      <section className="adh-sec">
        <div className="wrap">
          {!live && <div className="ms-demo"><b>Backend non branché.</b> Colle l'URL du Worker dans <code>member-config.js</code> pour activer la génération de codes.</div>}

          {!unlocked ? (
            <form className="ms-lock-card ac-unlock" onSubmit={unlock}>
              <label className="ms-lock-label" htmlFor="ac-pw">Mot de passe admin</label>
              <input id="ac-pw" type="password" className="ms-lock-input" value={tryPw} autoFocus autoComplete="off"
                placeholder="••••••••••" onChange={(e) => { setTryPw(e.target.value); setErr(""); }} />
              {err && <div className="ms-lock-err">{err}</div>}
              <button type="submit" className="btn btn-primary" disabled={busy || !live}>{busy ? "…" : "Déverrouiller la gestion des codes →"}</button>
              <div className="ms-lock-hint">Ce mot de passe (secret <code>ADMIN_SECRET</code> côté Cloudflare) n'est connu que de toi.</div>
            </form>
          ) : (
            <React.Fragment>
              <form className="ms-form ac-gen" onSubmit={generate}>
                <div className="ms-form-grid">
                  <label className="pf-field" style={{ gridColumn: "1 / -1" }}><span className="pf-label">Pour qui ? <em className="pf-hint">nom / téléphone — pour t'y retrouver</em></span>
                    <input className="pf-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex : Julien (cave à vin)" /></label>
                  <label className="pf-field"><span className="pf-label">Combien de codes</span>
                    <input type="number" min="1" max="50" className="pf-input" value={count} onChange={(e) => setCount(e.target.value)} /></label>
                </div>
                <div className="ms-form-actions">
                  <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "…" : "＋ Générer le(s) code(s)"}</button>
                </div>
              </form>

              {made.length > 0 && (
                <div className="ac-made">
                  <div className="ac-made-h">✓ {made.length > 1 ? made.length + " codes créés" : "Code créé"} — envoie-le à la personne :</div>
                  <div className="ac-made-codes">
                    {made.map((c) => <code key={c.code} className="ac-made-code">{c.display}</code>)}
                  </div>
                </div>
              )}

              {err && <div className="ms-lock-err" style={{ margin: "10px 0" }}>{err}</div>}

              <div className="ac-table-wrap">
                <table className="ac-table">
                  <thead><tr><th>Code</th><th>Pour qui</th><th>Statut</th><th></th></tr></thead>
                  <tbody>
                    {(invites || []).map((inv) => <CodeRow key={inv.code} inv={inv} onRevoke={revoke} onCopy={copyMsg} copied={copied} />)}
                  </tbody>
                </table>
                {invites && invites.length === 0 && <div className="ms-empty">Aucun code pour l'instant. Génère le premier ci-dessus 🐗</div>}
              </div>
              <p className="pf-note" style={{ marginTop: 18 }}>
                <b>Astuce.</b> « Copier le message » met dans ton presse-papier un texte prêt à coller sur WhatsApp,
                avec le code et les instructions. La personne va sur <b>Espace membre</b>, entre son code, et c'est parti.
              </p>
            </React.Fragment>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

window.ACCES = { AccesPage };
