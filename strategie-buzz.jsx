// Espace membre — Stratégie : buzz, influence, partenariats & le QG
// Benchmark Jolie Foulée + plan de rayonnement + modèles de lieu de
// rassemblement. Réutilise la porte et la sous-nav de espace-membre.jsx.

const StratHero = () => (
  <section className="adh-hero">
    <HeroWaves />
    <div className="wrap">
      <span className="adh-hero-eyebrow">★ Stratégie · rayonnement 2027</span>
      <h1>Faire <span className="marker">buzzer</span> TTC,<br/>sans perdre son ADN.</h1>
      <div className="adh-hero-grid">
        <p className="adh-hero-lede">
          Comment gagner en visibilité, en abonnés et en poids pour les partenariats marques —
          en s'inspirant de <strong>Jolie Foulée</strong> (le collectif running français le plus malin
          côté commu), tout en restant <strong>100 % TTC</strong> : trail, techno, Nice, convivialité.
        </p>
      </div>
      <div className="ms-caveat">
        <b>Le pari.</b> Les marques 2025-2026 ne cherchent plus la taille : elles cherchent
        l'<b>engagement</b> et le <b>contenu authentique (UGC)</b>. Une micro-communauté soudée
        vaut plus qu'un compte gonflé. C'est exactement le terrain de TTC — à condition de le
        <b> mettre en scène</b>.
      </div>
    </div>
  </section>
);

const INGREDIENTS = [
  { n: "01", t: "Média avant tout", d: "Depuis 2013, ~27K abonnés. Ils ne font pas que courir : ils racontent la course « à leur façon » parce que personne ne le faisait. Le contenu est le produit." },
  { n: "02", t: "Ton anti-perf assumé", d: "« Untalented runners » : certains s'entraînent, la plupart non, tout le monde fait la fête. Le second degré désacralise et rend accessible." },
  { n: "03", t: "Strava comme moteur", d: "Challenges réguliers + curation des plus belles photos de la commu, republiées. La communauté produit le contenu, eux l'amplifient." },
  { n: "04", t: "Collabs marques premium", d: "HOKA (lancement Cielo X1), BUFF (run club Montmartre), Garmin, activations UTMB. Des partenariats longs et alignés, pas transactionnels." },
  { n: "05", t: "Identité visuelle forte", d: "Couleurs qui clashent, humour, univers reconnaissable au premier coup d'œil. On sait que c'est eux sans lire le nom." },
  { n: "06", t: "Merch & monétisation", d: "Une ligne de vêtements vendue en boutiques (Distance, Hardloop). La marque devient un objet qu'on porte, donc un média ambulant." },
];

const StratDecrypt = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Le modèle Jolie&nbsp;Foulée,<br/><span className="g">décrypté</span>.</h2>
        <p className="ms-sec-lede">Six ingrédients qui les ont fait passer de bande de potes à média running de référence.</p>
      </div>
      <div className="ms-ingr">
        {INGREDIENTS.map((x) => (
          <div key={x.n} className="ms-ing">
            <span className="n">{x.n}</span>
            <h4>{x.t}</h4>
            <p>{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CMP = [
  ["Positionnement", "« Le club le moins doué de Paris » — running lifestyle, anti-perf, urbain.", <span><b>Social trail run niçois</b> : convivial mais vrai effort, de la mer au sommet.</span>],
  ["Terrain de jeu", "Route & ville (Paris, Montmartre).", <span>Trail & montagne : <b>Nice, Mercantour, Gelas</b>. Décor premium.</span>],
  ["Ton", "Humour, second degré, « on picole tous ».", <span>« <b>Sérieux sans se prendre au sérieux</b> », convivial, bienveillant, tous niveaux.</span>],
  ["Plateforme reine", "Instagram + Strava (challenges).", <span>Instagram + Strava + WhatsApp — <b>Strava sous-exploité</b>, à réactiver.</span>],
  ["Contenu signature", "Photos décalées, rallyes, memes.", <span>Reels mer→sommet, <b>Trail to Techno</b>, expés off type Gelas.</span>],
  ["Collabs marques", "HOKA, BUFF, Garmin, UTMB — nationales.", <span>Refuges (Albarea, Merveilles), Näak — <b>locales, à faire monter en gamme</b>.</span>],
  ["Monétisation", "Merch apparel + collabs média.", <span>Adhésion + events Trail to Techno + (à venir) <b>merch & QG</b>.</span>],
  ["Atout unique", "La marque « fun anti-perf ».", <span>Le croisement <b>Trail × Techno</b> + le décor + l'ancrage Nice/UTMB.</span>],
];

const StratCompare = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">TTC <span className="ms-x">×</span> Jolie&nbsp;Foulée,<br/>le <span className="g">comparatif</span>.</h2>
        <p className="ms-sec-lede">On partage déjà 80 % de leur ADN gagnant. Le reste, c'est ce qui nous rend uniques.</p>
      </div>
      <div className="ms-cmp-wrap">
        <table className="ms-cmp">
          <thead>
            <tr>
              <th>Dimension</th>
              <th className="jf">Jolie Foulée</th>
              <th className="ttc">Tout Terrain Club</th>
            </tr>
          </thead>
          <tbody>
            {CMP.map((r, i) => (
              <tr key={i}>
                <td className="dim">{r[0]}</td>
                <td className="jf">{r[1]}</td>
                <td className="ttc">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const POWERS = [
  { em: "🎧", t: "Trail to Techno", d: <span>Un <b>concept-contenu unique</b> que personne d'autre n'a. Aimant naturel à collabs (son, boisson, mode) et ultra-partageable. Jolie Foulée a l'humour ; TTC a un vrai <b>univers crossover</b> sport + musique.</span> },
  { em: "🏔️", t: "Le décor mer→sommet", d: <span>Nice, la Méditerranée, le Mercantour, le Gelas. Un <b>feed cinématographique</b> que le bitume parisien n'aura jamais. Le trail est visuellement premium — chaque sortie est une carte postale.</span> },
  { em: "📍", t: "L'écosystème Nice / UTMB", d: <span>La proximité de <b>Nice Côte d'Azur by UTMB</b>, des refuges partenaires, un terrain de jeu mondial du trail. Angle « team sur les courses » + destination qui fait rêver hors région.</span> },
];

const StratPowers = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Les 3 super-pouvoirs<br/><span className="g">que TTC seul a</span>.</h2>
        <p className="ms-sec-lede">Ce qu'il ne faut surtout pas gommer en copiant les autres — c'est là qu'est le buzz.</p>
      </div>
      <div className="ms-powers">
        {POWERS.map((p, i) => (
          <div key={i} className="ms-power">
            <div className="em">{p.em}</div>
            <h4>{p.t}</h4>
            <p>{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StratPlan = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Le plan de <span className="g">buzz</span>.</h2>
        <p className="ms-sec-lede">Des leviers concrets, classés par horizon. Chacun garde l'ADN — on amplifie ce qui existe déjà.</p>
      </div>
      <div className="ms-lanes">
        <div className="ms-lane">
          <div className="ms-lane-head"><span className="t">Quick wins</span><span className="when">0–3 mois</span></div>
          <ul>
            <li>Un <b>Reel signature récurrent</b> : le lever de soleil du lundi, le drop techno de l'after, la traversée mer→sommet.
              <span className="adn"><b>ADN safe</b> — vous le vivez déjà, il suffit de le filmer.</span></li>
            <li><b>Rituels visuels hebdo = machine à UGC</b> : un hashtag unique (#trailtotechno), un template dossard/tenue (le nouveau design est déjà prévu).
              <span className="adn"><b>ADN safe</b> — met en avant le groupe, pas les ego.</span></li>
            <li><b>Réactiver Strava</b> : un challenge mensuel + curation des plus belles photos de la commu, republiées.
              <span className="adn"><b>ADN safe</b> — la commu au centre, repris du meilleur de Jolie Foulée.</span></li>
          </ul>
        </div>
        <div className="ms-lane mid">
          <div className="ms-lane-head"><span className="t">Moyen terme</span><span className="when">3–9 mois</span></div>
          <ul>
            <li><b>Activer les 11 bénévoles</b> « com / contenu » sortis du sondage : une mini-équipe média, une cadence tenue.
              <span className="adn"><b>ADN safe</b> — l'implication est déjà demandée.</span></li>
            <li><b>Collabs micro d'abord</b> : faire monter les partenaires actuels (refuges, Näak) et viser des marques trail (On, HOKA, Salomon). Pitch = commu engagée + UGC + Trail to Techno.
              <span className="adn"><b>ADN safe</b> — partenaires alignés, longs, pas transactionnels.</span></li>
            <li>Faire du <b>Trail to Techno l'événement signature média</b> (comme les rallyes Jolie Foulée) : le rendez-vous que les marques veulent sponsoriser.
              <span className="adn"><b>ADN safe</b> — c'est déjà votre pépite.</span></li>
          </ul>
        </div>
        <div className="ms-lane">
          <div className="ms-lane-head"><span className="t">Structurant</span><span className="when">9 mois +</span></div>
          <ul>
            <li>Le <b>QG</b> (voir ci-dessous) comme actif média et lieu de tournage permanent.
              <span className="adn"><b>ADN safe</b> — un lieu à la commu, demandé au sondage.</span></li>
            <li>Une <b>charte éditoriale</b> (ton, identité visuelle) pour grandir sans se diluer.
              <span className="adn"><b>ADN safe</b> — fige ce qui fait « le TTC spirit ».</span></li>
            <li>Piloter sur l'<b>engagement, pas la taille</b> : une micro-commu génère 2–3× plus d'engagement — exactement ce que les marques paient.
              <span className="adn"><b>ADN safe</b> — la qualité de lien avant les chiffres.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const MODELS = [
  {
    tag: "Modèle A · recommandé pour démarrer", reco: true, name: "Réseau d'adresses labellisées TTC",
    desc: "TTC ne possède rien. Il labellise des lieux partenaires — la cave de Julien, un café run, un bar d'after — comme « adresses TTC » avec avantages membres. Plusieurs adresses complémentaires.",
    pros: ["Zéro capital, zéro risque financier", "Pas de monopole → désamorce les guéguerres", "Rapide à lancer, s'appuie sur des projets déjà là"],
    cons: ["TTC ne capte pas la marge", "Dépend de la bonne volonté des lieux"],
  },
  {
    tag: "Modèle B · ambition long terme", reco: false, name: "Le QG porté par l'asso",
    desc: "L'association loue et exploite un local. Propriété collective via l'asso : 1 membre = 1 voix. C'est LE lieu TTC, qui appartient vraiment à la meute.",
    pros: ["Appartient réellement à la communauté", "Actif fort, source de revenus & de contenu"],
    cons: ["Lourd : capital, bail, gestion, risque", "Demande beaucoup de bénévolat et de trésorerie"],
  },
  {
    tag: "Modèle C · partenariat capitalistique", reco: false, name: "Co-entreprise avec un membre",
    desc: "Julien crée sa cave à vin ; TTC entre comme partenaire via une convention (part de la commu, events, visibilité contre avantages).",
    pros: ["Concret et rapide via un porteur motivé", "Un lieu identitaire tout de suite"],
    cons: ["Mélange business perso ↔ asso = terrain à guéguerres si mal cadré", "Qui décide ? qui profite ? à écrire noir sur blanc"],
  },
];

const RULES = [
  { t: "Séparer la marque de la propriété", d: <span>L'<b>asso possède le label « TTC »</b> et ses critères ; les lieux restent privés. Personne ne « possède » TTC parce qu'il a un commerce.</span> },
  { t: "Un réseau, pas un lieu unique", d: <span>Plusieurs adresses <b>complémentaires</b> : la cave = l'after longue sortie ; le café = le matin / after-run. Chacun sa niche → pas de gagnant unique.</span> },
  { t: "Une charte « adresse TTC » écrite", d: <span>Critères clairs (accueille les runs, avantages membres, héberge X events/an, respecte les valeurs). <b>N'importe quel membre-commerçant peut candidater</b> — objectif et transparent.</span> },
  { t: "Une commission « lieux & partenariats »", d: <span>Portée par l'asso (les bénévoles existent), elle décide des labels <b>collégialement</b> — jamais une décision perso dans un coin.</span> },
  { t: "Soutien commu ≠ chèque en blanc", d: <span>TTC apporte <b>trafic, events, visibilité</b>. Il ne met pas d'argent dans un business privé — sauf via l'asso, avec une convention écrite.</span> },
  { t: "Pas d'exclusivité bloquante", d: <span>Labelliser un lieu <b>n'interdit pas</b> d'en labelliser d'autres. On évite le sentiment de passe-droit qui crée les tensions.</span> },
];

const StratQG = () => (
  <section className="adh-sec">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Le QG<br/>de la <span className="g">meute</span>.</h2>
        <p className="ms-sec-lede">Un lieu de rassemblement (café / cave / shop) — demandé au sondage. La vraie question n'est pas « où », c'est « à qui » et « comment sans se fâcher ».</p>
      </div>

      <div className="ms-caveat" style={{ marginTop: 0, marginBottom: 34 }}>
        <b>Déjà validé.</b> Plusieurs membres ont réclamé « un QG avec des prix préférentiels : after-run,
        after sorties longues, point de retrouvailles ». Julien veut monter sa cave à vin, d'autres un café run.
        <b> L'énergie est là — il faut juste un cadre qui évite les guéguerres.</b>
      </div>

      <div style={{ margin: "0 0 16px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green-3)" }}>★ Trois façons de le faire</div>
      <div className="ms-models">
        {MODELS.map((m, i) => (
          <div key={i} className={`ms-model ${m.reco ? "reco" : ""}`}>
            <span className="tag">{m.tag}</span>
            <h4>{m.name}</h4>
            <p className="desc">{m.desc}</p>
            <div className="pc">
              {m.pros.map((p, j) => <span key={"p" + j} className="p">{p}</span>)}
              {m.cons.map((c, j) => <span key={"c" + j} className="c">{c}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: "40px 0 16px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green-3)" }}>★ Les 6 règles anti-guéguerre</div>
      <div className="ms-rules">
        {RULES.map((r, i) => (
          <div key={i} className="ms-rule">
            <h4>{r.t}</h4>
            <p>{r.d}</p>
          </div>
        ))}
      </div>

      <div className="ms-step" style={{ marginTop: 22 }}>
        <span className="ms-step-n">→</span>
        <div>
          <div className="ms-step-t">La reco : commencer par le réseau, viser le QG</div>
          <div className="ms-step-d">Lancer <b>Modèle A</b> tout de suite (labelliser la cave de Julien + un café comme premières « adresses TTC », charte + commission). Ça crée de la valeur pour la commu sans capital ni conflit. Si une adresse cartonne et que l'asso a les reins solides, <b>évoluer vers le Modèle B</b> plus tard. Le Modèle C uniquement avec une convention béton.</div>
        </div>
        <span className="ms-pri now">À cadrer</span>
      </div>
    </div>
  </section>
);

const StratKeepDrop = () => (
  <section className="adh-sec ms-sec-alt">
    <div className="wrap">
      <div className="adh-sec-head">
        <h2 className="adh-h2">Garder <span className="g">l'ADN</span>.</h2>
        <p className="ms-sec-lede">S'inspirer de Jolie Foulée, oui. Devenir Jolie Foulée, non. Ce qu'on prend, ce qu'on laisse.</p>
      </div>
      <div className="ms-avoid">
        <div className="ms-avoid-col keep">
          <h3>On prend</h3>
          <div className="lead">✓ Ce qui matche déjà TTC</div>
          <ul>
            <li>Le <b>fun d'abord</b> et la communauté au centre</li>
            <li>L'<b>anti-élitisme</b> : accueillir tous les niveaux, du premier trail à l'ultra</li>
            <li>Le <b>second degré</b> et l'autodérision</li>
            <li><b>Strava</b> comme moteur de contenu et de lien</li>
            <li>Des <b>collabs marques alignées</b> et durables, pas transactionnelles</li>
          </ul>
        </div>
        <div className="ms-avoid-col drop">
          <h3>On laisse</h3>
          <div className="lead">✕ Ce qui n'est pas nous</div>
          <ul>
            <li>L'humour <b>purement « parisien » anti-perf</b> — TTC assume le vrai effort trail <em>et</em> le fun</li>
            <li><b>Renier la performance</b> — nos ultras et compétiteurs font partie de l'identité</li>
            <li>Copier leur <b>identité visuelle</b> — la nôtre, c'est trail + techno + Nice</li>
            <li>Le <b>tout-route / tout-Paris</b> — notre force, c'est la montagne et la mer</li>
          </ul>
        </div>
      </div>
      <p className="ms-foot-note">
        Benchmark au 4 août 2026 · sources : Jolie Foulée (Instagram, joliefoulee.fr, article BUFF communauté),
        HypeAuditor (croissance IG running 2025), u-Trail, tendances UGC & partenariats marques 2025-2026.
        Le compte d'abonnés Jolie Foulée (~27K) et les collabs citées (HOKA, BUFF, Garmin, UTMB) sont issus de ces sources publiques.
      </p>
    </div>
  </section>
);

const StrategiePage = () => (
  <React.Fragment>
    <window.MEMBER.MemberSubnav active="strategie" />
    <StratHero />
    <StratDecrypt />
    <StratCompare />
    <StratPowers />
    <StratPlan />
    <StratQG />
    <StratKeepDrop />
  </React.Fragment>
);

window.STRATEGIE = { StrategiePage };
