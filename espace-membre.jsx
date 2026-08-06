// Espace membre — Analyse du sondage 2026 (accès protégé)
// Réservé : porte par mot de passe côté client (soft gate, pas une vraie
// sécurité — le mot de passe reste visible dans la source du site).

// ⬇️ Mot de passe ORGA (bureau) — DIFFÉRENT du mot de passe membre (T2Tfestival).
//    Change-le ici quand tu veux (soft gate, visible dans la source).
const ORGA_PW = "T2Tfestival";

// ---- Porte d'accès ORGA (séparée de l'espace membre) ----------------------
const OrgaGate = ({ children }) => {
  const [ok, setOk] = React.useState(() => {
    try { return sessionStorage.getItem("ttc_orga_ok") === "1"; } catch (e) { return false; }
  });
  const [val, setVal] = React.useState("");
  const [err, setErr] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (val.trim() === ORGA_PW) {
      try { sessionStorage.setItem("ttc_orga_ok", "1"); } catch (e) {}
      setOk(true);
    } else {
      setErr(true);
    }
  };

  if (ok) return children;

  return (
    <section className="adh-hero ms-lock">
      <HeroWaves />
      <div className="wrap">
        <span className="adh-hero-eyebrow">★ Espace orga · accès restreint</span>
        <h1>Côté <span className="marker">orga</span>.</h1>
        <div className="ms-lock-grid">
          <p className="adh-hero-lede">
            Espace réservé au <strong>bureau</strong> : analyse du sondage et stratégie. Rien à voir
            ici pour les adhérents — l'espace membre, c'est <a href="membre.html">par là</a>.
          </p>
          <form className="ms-lock-card" onSubmit={submit}>
            <label className="ms-lock-label" htmlFor="ms-pw">Mot de passe orga</label>
            <input
              id="ms-pw"
              type="password"
              className={`ms-lock-input ${err ? "err" : ""}`}
              value={val}
              autoComplete="off"
              autoFocus
              placeholder="••••••••••"
              onChange={(e) => { setVal(e.target.value); setErr(false); }}
            />
            {err && <div className="ms-lock-err">Mot de passe incorrect.</div>}
            <button type="submit" className="btn btn-primary">Entrer côté orga →</button>
            <div className="ms-lock-hint">Réservé au bureau de l'asso.</div>
          </form>
        </div>
      </div>
    </section>
  );
};

// ---- Sous-navigation ORGA -------------------------------------------------
const OrgaSubnav = ({ active }) => (
  <div className="wrap">
    <nav className="ms-subnav">
      <a href="espace-membre.html" className={active === "analyse" ? "active" : ""}>◆ Analyse du sondage</a>
      <a href="strategie-buzz.html" className={active === "strategie" ? "active" : ""}>◆ Stratégie · buzz &amp; QG</a>
      <a href="acces.html" className={active === "acces" ? "active" : ""}>◆ Accès &amp; codes</a>
    </nav>
  </div>
);

// ---- Briques d'affichage --------------------------------------------------
const Bar = ({ label, pct, val, tone = "green", scale }) => (
  <div className={`ms-bar ${tone}`}>
    <div className="ms-bar-l">
      <span>{label}</span>
      <span className="ms-bar-n">{val != null ? val : pct + " %"}</span>
    </div>
    <div className="ms-bar-track">
      <div className="ms-bar-fill" style={{ width: (scale != null ? scale : pct) + "%" }} />
    </div>
  </div>
);

const Row = ({ topic, status, statusLabel, plan, planLabel = "Ce qu'on veut", realLabel, children, takeaway, takeLabel = "À retenir" }) => (
  <div className={`ms-row ${status}`}>
    <div className="ms-row-top">
      <span className="ms-topic">{topic}</span>
      <span className={`ms-badge ${status}`}>{statusLabel}</span>
    </div>
    <div className="ms-row-body">
      <div className="ms-cell plan">
        <div className="ms-clabel">{planLabel}</div>
        {plan}
      </div>
      <div className="ms-cell">
        <div className="ms-clabel">{realLabel}</div>
        {children}
      </div>
    </div>
    <div className="ms-take"><b>{takeLabel}</b>{takeaway}</div>
  </div>
);

// ---- La page --------------------------------------------------------------
const MemberHero = () => (
  <section className="adh-hero">
    <HeroWaves />
    <div className="wrap">
      <span className="adh-hero-eyebrow">★ Feedback 2026 → saison 2027</span>
      <h1>TTC <span className="marker">Feedback 2026</span>.</h1>
      <div className="adh-hero-grid">
        <p className="adh-hero-lede">
          Ce que le passage en asso prévoit, confronté ligne à ligne à ce que
          <strong> 54 membres</strong> viennent de répondre. Là où ça colle, là où ça frotte,
          et ce qu'on n'avait pas vu venir.
        </p>
      </div>
      <div className="hero-stats ms-stats">
        {[
          { n: "54", l: "réponses complètes" },
          { n: "+9", l: "depuis la vague précédente" },
          { n: "~18 %", l: "de la commu (300+)" },
          { n: "96 %", l: "favorables à l'asso" },
          { n: "83 %", l: "prêts à adhérer" },
        ].map((s, i) => (
          <div key={i} className="stat ms-stat">
            <div className="num">{s.n}</div>
            <div className="lab">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="ms-caveat">
        <b>À lire avec ça en tête.</b> 54 retours (+9 depuis la vague précédente) = un signal solide, pas un référendum.
        L'échantillon reste orienté <b>engagés</b> : 53 % viennent au moins 2–3×/mois,
        69 % se classent « Performance » ou « Ultra ». Les freins <b>prix</b> et <b>« deux catégories »</b> restent
        donc plutôt <b>sous-estimés</b> ici que surestimés.
      </div>
    </div>
  </section>
);

const MemberVerdict = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Le verdict<br/>en 10 <span className="g">secondes</span>.</h2>
        <p className="ms-sec-lede">Trois piles : ce qui est validé, ce qui frotte, ce qu'on avait laissé de côté.</p>
      </div>
      <div className="ms-verdict">
        <div className="ms-vcard ok">
          <span className="ms-vtag">✓ Feu vert</span>
          <h3>Le cap est le bon</h3>
          <ul>
            <li><b>96 %</b> favorables au passage en asso</li>
            <li><b>83 %</b> adhèrent (dont 50 % sans hésiter)</li>
            <li><b>52 %</b> veulent une licence FFA — la formule « en réflexion » est en fait attendue</li>
            <li>Un <b>vivier de 16 membres</b> (30 %) prêts à s'impliquer activement</li>
          </ul>
        </div>
        <div className="ms-vcard warn">
          <span className="ms-vtag">▲ Ça frotte</span>
          <h3>Trois points à border</h3>
          <ul>
            <li><b>Prix 60 €</b> (valeur dans le code) : 37 % le jugeraient déjà trop cher</li>
            <li><b>Discord</b> : 44 % disent non, 65 % trouvent WhatsApp « parfait »</li>
            <li>Le <b>prix</b> devient le 1ᵉʳ frein concret (20 %), devant le « deux catégories » (11 %)</li>
          </ul>
        </div>
        <div className="ms-vcard gap">
          <span className="ms-vtag">＋ Angles morts</span>
          <h3>Demandé, pas au plan</h3>
          <ul>
            <li>Un <b>QG / lieu de retrouvailles</b> avec tarifs partenaires</li>
            <li>Des <b>stages multi-jours</b> dans d'autres massifs</li>
            <li><b>Structurer l'info</b> : 35 % se perdent dans le fil</li>
            <li>Une <b>envie d'expansion géo</b> (arrière-pays, Vence…)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const MemberConfront = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">La confrontation,<br/>point par <span className="g">point</span>.</h2>
        <p className="ms-sec-lede">Gauche : ce que la page adhésion / le code prévoient. Droite : ce que disent les 54.</p>
      </div>

      <div className="ms-conf">
        <Row topic="Passer en association" status="ok" statusLabel="Validé"
          plan={<p>Transformer le collectif en asso structurée pour la rentrée 2026, saison 2027.</p>}
          realLabel="Ce que dit la meute"
          takeaway="Aucune opposition. Le mandat est là — on peut avancer sans tester le terrain plus longtemps.">
          <div className="ms-bars">
            <Bar label="Très positif" pct={69} />
            <Bar label="Plutôt positif" pct={28} />
            <Bar label="Neutre" pct={4} tone="dim" />
          </div>
        </Row>

        <Row topic="Une adhésion payante" status="ok" statusLabel="Validé"
          plan={<p>Une adhésion annuelle, welcome pack aux couleurs TTC, tout en gardant les runs gratuits.</p>}
          realLabel="« Si l'adhésion existait, tu… »"
          takeaway={<span>83 % de oui, stable malgré +9 réponses. Les 13 % « j'attends de voir » se convertissent avec des avantages <b>concrets et lisibles</b> — un enjeu de présentation, pas d'appétence.</span>}>
          <div className="ms-bars">
            <Bar label="J'adhère sans hésiter" pct={50} />
            <Bar label="J'adhère probablement" pct={33} />
            <Bar label="J'attends de voir le contenu" pct={13} tone="warn" />
            <Bar label="Non / probablement pas" pct={4} tone="dim" />
          </div>
        </Row>

        <Row topic="Le tarif à 60 €" status="warn" statusLabel="Friction" takeLabel="Reco"
          plan={<React.Fragment>
            <p>La page affiche « tarif à venir », mais le code porte une valeur de travail à <b>60 € / an</b>.</p>
            <p>Question : « à partir de quel montant l'adhésion te paraîtrait <b>clairement trop chère</b> ? »</p>
          </React.Fragment>}
          realLabel="Seuil de « trop cher »"
          takeaway={<span>Viser <b>40–50 €</b> pour le socle « Adhérent », et faire porter la valeur perçue par le welcome pack + les réducs events. Réserver 60 €+ à la formule Licence FFA, où le prix « n'est pas le sujet » pour les compétiteurs.</span>}>
          <div className="ms-split">
            <span className="s-no" style={{ flex: 13 }}>30 € · 13%</span>
            <span className="s-mid" style={{ flex: 24 }}>50 € · 24%</span>
            <span className="s-ok" style={{ flex: 31 }}>70 € · 31%</span>
            <span className="s-ok" style={{ flex: 13 }}>90 € · 13%</span>
            <span className="s-ok" style={{ flex: 19 }}>peu importe · 19%</span>
          </div>
          <div className="ms-split-key">
            <span><i className="k-no" />60 € = trop cher</span>
            <span><i className="k-ok" />60 € = ok</span>
          </div>
          <p className="ms-note-strong">À <b>60 €</b>, <b>37 %</b> décrochent. À <b>~40–50 €</b>, seuls 13 % décrochent.</p>
        </Row>

        <Row topic="La formule Licence FFA" status="ok" statusLabel="Validé — à confirmer"
          plan={<p>Formule « Adhérent + Licence FFA » marquée <b>« en réflexion, selon vos retours »</b> — la plus incertaine des trois.</p>}
          realLabel="Intérêt pour une licence via le club"
          takeaway={<span>52 % d'intéressés + « une équipe TTC sur les courses » demandée par 46 %, et 24 % de plus veulent juste « en savoir plus » : à peine 22 % de vrais « non ». Cette formule n'est pas un pari — on peut la <b>sortir du conditionnel</b>, en expliquant ce que la licence change.</span>}>
          <div className="ms-bars">
            <Bar label="Oui · Compétition" pct={52} />
            <Bar label="Je veux en savoir plus" pct={24} tone="warn" />
            <Bar label="Non, pas besoin" pct={22} tone="gap" />
            <Bar label="Oui · Running (loisir)" pct={2} tone="dim" />
          </div>
        </Row>

        <Row topic="Migrer WhatsApp → Discord" status="warn" statusLabel="Friction" takeLabel="Reco"
          plan={<p>Le code lie l'affichage des niveaux gamifiés à un passage sur Discord (flag <code className="ms-code">showLevels</code> ↔ plateforme commu).</p>}
          realLabel="Vécu WhatsApp aujourd'hui"
          takeaway={<span>44 % de blocage + un canal jugé « parfait » par 65 % : une bascule sèche est risquée. Le vrai besoin des 35 % qui se perdent, c'est de <b>structurer l'info</b> (canaux clairs, annonces séparées du bavardage). Faisable sans quitter WhatsApp, ou via un Discord <b>en plus</b> et non « à la place ». Les niveaux réels (débutant→ultra) n'ont pas besoin de Discord.</span>}>
          <div className="ms-bars">
            <Bar label="« C'est parfait comme ça »" pct={65} tone="gap" />
            <Bar label="« Parfois je m'y perds »" pct={20} tone="warn" />
            <Bar label="« Souvent le chaos »" pct={15} tone="warn" />
          </div>
          <p className="ms-note-strong">Prêts à basculer sur Discord : <b>oui 55 % / non 44 %</b> — un quasi 50/50.</p>
        </Row>

        <Row topic="Les niveaux « façon jeu »" status="warn" statusLabel="Signal faible" takeLabel="Reco"
          plan={<p>Deux échelles gamifiées sur la page : niveau trail (🌱→🏔️) <b>et</b> un « style Trail to Techno » (🎧 Curieux → 👑 Résident).</p>}
          realLabel="Demande réelle"
          takeaway={<span>Garder les 4 niveaux trail comme <b>repères utiles</b> (orienter débutants/confirmés), mais pas comme système de points. Ranger l'échelle « style techno » : jolie idée, aucun signal, et elle nourrit la peur du « deux catégories ».</span>}>
          <p className="ms-real-p">Personne ne réclame de gamification. « Des groupes de niveaux sur les runs » n'est demandé que par <b>19 %</b> — et plusieurs verbatims défendent au contraire le <b>mix des niveaux</b> pour l'aspect social run.</p>
          <p className="ms-real-p">Le « style techno » gamifié : <b>zéro mention</b> spontanée.</p>
        </Row>

        <Row topic="Espace membre & events réservés" status="ok" statusLabel="Validé"
          plan={<p>Avantages adhérent : espace & outils trail, priorité events, stages, soirées meute, réducs partenaires.</p>}
          realLabel="Top de ce qu'ils veulent « en plus »"
          takeaway={<span>Les 4 demandes phares sont exactement le cœur de la formule « Adhérent ». L'offre est <b>alignée</b> — reste à la rendre lisible dès la page.</span>}>
          <div className="ms-bars">
            <Bar label="Week-ends & stages trail" pct={57} />
            <Bar label="Événements sociaux (after-run…)" pct={48} />
            <Bar label="Équipe TTC sur les courses" pct={46} />
            <Bar label="Sorties montagne engagées" pct={43} />
          </div>
        </Row>

        <Row topic="Les freins à l'adhésion" status="gap" statusLabel="Vigilance" takeLabel="Reco"
          plan={<p>Un modèle « base gratuite pour tous + extras payants » — déjà le discours central de la page adhésion.</p>}
          realLabel="Freins cités (hors « rien »)"
          takeaway={<span>Le <b>prix</b> passe n°1 des freins concrets (20 %) → conforte le tarif 40–50 €. La <b>peur du « deux catégories »</b> reflue (11 %) mais reste à désamorcer : garder les <b>runs 100 % gratuits</b> et le <b>mix des niveaux</b> comme engagement écrit. C'est l'ADN cité (« convivial », « accessible à tous », « social run ») — l'adhésion = un <b>soutien</b>, pas un péage.</span>}>
          <div className="ms-bars">
            <Bar label="« Rien, je suis partant »" pct={46} scale={100} />
            <Bar label="Le prix" pct={20} scale={43} tone="warn" />
            <Bar label="Peur de 2 catégories de membres" pct={11} scale={24} tone="gap" />
          </div>
          <p className="ms-note-muted">Barres à l'échelle du frein max pour la lisibilité.</p>
        </Row>
      </div>
    </div>
  </section>
);

const MemberProfile = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Qui a <span className="g">parlé</span>.</h2>
        <p className="ms-sec-lede">Le profil des 54 — pour lire les chiffres au bon niveau.</p>
      </div>
      <div className="ms-grid2">
        <div className="ms-panel">
          <h3>Un noyau actif</h3>
          <div className="ms-panel-sub">Fréquence de participation</div>
          <div className="ms-bars">
            <Bar label="Toutes les semaines" pct={31} />
            <Bar label="2 à 3× / mois" pct={22} />
            <Bar label="Quelques fois / an" pct={20} tone="dim" />
            <Bar label="1× / mois" pct={19} tone="dim" />
            <Bar label="Jamais encore" pct={7} tone="dim" />
          </div>
        </div>
        <div className="ms-panel">
          <h3>Plutôt costauds</h3>
          <div className="ms-panel-sub">Niveau trail auto-déclaré</div>
          <div className="ms-bars">
            <Bar label="Performance" pct={39} />
            <Bar label="Ultra" pct={30} />
            <Bar label="Progression" pct={28} tone="dim" />
            <Bar label="Découverte" pct={4} tone="dim" />
          </div>
        </div>
        <div className="ms-panel">
          <h3>Le bouche-à-oreille domine</h3>
          <div className="ms-panel-sub">Comment ils ont connu TTC</div>
          <div className="ms-bars">
            <Bar label="Par un(e) ami(e)" pct={43} />
            <Bar label="Instagram" pct={28} />
            <Bar label="Strava" pct={20} tone="dim" />
            <Bar label="Autre" pct={9} tone="dim" />
          </div>
        </div>
        <div className="ms-panel">
          <h3>Une commu jeune</h3>
          <div className="ms-panel-sub">Depuis combien de temps avec TTC</div>
          <div className="ms-bars">
            <Bar label="6 à 12 mois" pct={31} />
            <Bar label="Plus d'un an" pct={28} />
            <Bar label="Moins de 6 mois" pct={20} tone="dim" />
            <Bar label="Depuis les débuts" pct={15} tone="dim" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CLOUD = [
  ["convivialité", 1], ["partage", 2], ["fun", 2], ["ambiance", 3], ["social", 3],
  ["motivation", 3], ["équipe", 3], ["rencontre", 3], ["du kiff", 4], ["dépassement", 4],
  ["trail", 4], ["cool", 4], ["bienveillance", 4], ["amitié", 5], ["détente", 5],
  ["sanglier", 5], ["solidarité", 5], ["découverte", 5], ["passion", 5], ["aventure", 5],
];

const MemberDna = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">L'ADN,<br/>en trois <span className="g">mots</span>.</h2>
        <p className="ms-sec-lede">Les mots qui viennent spontanément (agrégés). Taille = fréquence.</p>
      </div>
      <div className="ms-cloud">
        {CLOUD.map(([w, r], i) => <span key={i} className={`w${r}`}>{w}</span>)}
      </div>
      <p className="ms-dna-note">
        Le message est limpide : ce qui fait TTC, c'est <b>le lien humain</b> (« lien social » ~80 %,
        « ambiance/fun/convivialité » ~74 %), bien avant la performance.
        <b> Toute décision de structuration doit protéger ça en premier.</b>
      </p>
    </div>
  </section>
);

const QUOTES = [
  { t: "green", q: "Organisation et ambiance incroyable… surtout ne pas changer cette convivialité.", c: "sur ce qu'il faut préserver" },
  { t: "warn", q: "Sur l'idée du Discord, je suis mitigé : c'est niche si on n'a pas la culture gaming. Je pense que c'est presque un frein au développement de communauté.", c: "Alain, sur la bascule Discord" },
  { t: "warn", q: "Continuer de mixer les niveaux pour l'aspect « social run ». · Accessible à tous.", c: "plusieurs, sur la peur des catégories" },
  { t: "gap", q: "Avoir un QG avec des prix préférentiels : after-run, after sorties longues, point de retrouvailles…", c: "angle mort : un lieu à soi" },
  { t: "gap", q: "Si le TTC veut s'exporter dans le bassin Roquefort / La Colle / Vence, ce sera plus simple pour moi de participer.", c: "Mathieu, sur l'expansion géo" },
  { t: "green", q: "Je suis chaud d'aider sur à peu près tous les sujets, et aussi pour organiser une course.", c: "l'un des 16 volontaires actifs" },
];

const MemberQuotes = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Ce qu'ils nous <span className="g">disent</span>.</h2>
        <p className="ms-sec-lede">Verbatims des trois tensions (prénoms seuls, contacts retirés).</p>
      </div>
      <div className="ms-quotes">
        {QUOTES.map((q, i) => (
          <div key={i} className={`ms-quote ${q.t}`}>
            <p>« {q.q} »</p>
            <cite>— {q.c}</cite>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MemberVolunteers = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Le vivier<br/><span className="g">bénévole</span>.</h2>
        <p className="ms-sec-lede">« T'impliquer davantage t'intéresse ? » — un capital humain à activer maintenant.</p>
      </div>
      <div className="ms-grid2">
        <div className="ms-panel">
          <h3>74 % ouverts à aider</h3>
          <div className="ms-panel-sub">Envie de s'impliquer</div>
          <div className="ms-bars">
            <Bar label="Oui, activement" pct={30} />
            <Bar label="Peut-être, selon mon temps" pct={44} tone="warn" />
            <Bar label="Non / pas maintenant" pct={26} tone="dim" />
          </div>
        </div>
        <div className="ms-panel">
          <h3>Sur quoi ils veulent aider</h3>
          <div className="ms-panel-sub">Domaines (sur les 34 qui ont répondu)</div>
          <div className="ms-bars">
            <Bar label="Organiser les sorties hebdo" pct={31} scale={100} />
            <Bar label="Développer les week-ends" pct={30} scale={97} />
            <Bar label="Créer une course officielle" pct={28} scale={90} />
            <Bar label="Développer les Pauses" pct={20} scale={65} tone="dim" />
            <Bar label="Partenariats marques / shop" pct={19} scale={61} tone="dim" />
          </div>
          <p className="ms-note-muted">% sur les 54 · barres à l'échelle du domaine max.</p>
        </div>
      </div>
      <p className="ms-dna-note">
        Un dev web propose même de <b>bâtir les outils</b> de la commu et offre des réductions ;
        d'autres proposent partenariats et création de contenu.
        <b> Bureau d'asso + commissions (events, courses, accueil, partenariats) : les candidats existent déjà.</b>
      </p>
    </div>
  </section>
);

const STEPS = [
  { t: "Lancer l'asso — sans hésiter", d: "96 % favorables, 83 % prêts à adhérer (stable sur 54 réponses). Le mandat est acquis, on passe à l'exécution.", pri: "Cap confirmé", now: false },
  { t: "Caler le socle « Adhérent » à 40–50 €", d: "À 60 €, 37 % décrochent ; à 45 €, seuls 13 %. Le prix est désormais le 1ᵉʳ frein — faire porter la valeur par le welcome pack et les réducs events.", pri: "À trancher", now: true },
  { t: "Sortir la Licence FFA du conditionnel", d: "52 % d'intéressés + équipe sur les courses (46 %), et à peine 22 % de « non ». Ajouter un mini-explicatif « ce que la licence change ».", pri: "À trancher", now: true },
  { t: "Ne pas imposer Discord — structurer l'info", d: "44 % contre, WhatsApp jugé « parfait » par 65 %. Le vrai besoin : séparer annonces et bavardage. Discord « en plus », jamais « à la place ».", pri: "À arbitrer", now: true },
  { t: "Graver « runs gratuits + mix des niveaux »", d: "Désamorce la peur du « deux catégories ». Ranger la gamification « style techno » (zéro signal). Activer les 16 volontaires actifs dès la constitution du bureau.", pri: "Garde-fou", now: false },
];

const MemberReco = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Ce que je ferais<br/><span className="g">maintenant</span>.</h2>
        <p className="ms-sec-lede">Cinq décisions, tirées directement des 54 retours.</p>
      </div>
      <div className="ms-reco">
        {STEPS.map((s, i) => (
          <div key={i} className="ms-step">
            <span className="ms-step-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="ms-step-t">{s.t}</div>
              <div className="ms-step-d">{s.d}</div>
            </div>
            <span className={`ms-pri ${s.now ? "now" : ""}`}>{s.pri}</span>
          </div>
        ))}
      </div>
      <p className="ms-foot-note">
        Analyse à visée interne · 54 réponses (3ᵉ vague, août 2026) · verbatims anonymisés, contacts non inclus.
        Chiffres arrondis ; questions à choix multiples, total &gt; 100 %.
      </p>
    </div>
  </section>
);

const MemberAnalysis = () => (
  <React.Fragment>
    <OrgaSubnav active="analyse" />
    <MemberHero />
    <MemberVerdict />
    <MemberConfront />
    <MemberProfile />
    <MemberDna />
    <MemberQuotes />
    <MemberVolunteers />
    <MemberReco />
  </React.Fragment>
);

window.MEMBER = { OrgaGate, MemberAnalysis, OrgaSubnav, Bar, Row };
