// Charte bénévole — réservée à l'espace membre (derrière la porte MSGate).

const BENEVOLE_SECTIONS = [
  {
    n: "1",
    title: "Esprit de l'implication bénévole",
    blocks: [
      { p: "S'impliquer bénévolement au sein de TTC signifie :" },
      { list: [
        "contribuer à un projet collectif,",
        "agir dans l'intérêt de la communauté,",
        "respecter le cadre associatif et les règles de sécurité,",
        "transmettre l'esprit TTC sans recherche de pouvoir ou de statut.",
      ] },
      { p: "L'implication est volontaire, libre et non obligatoire." },
    ],
  },
  {
    n: "2",
    title: "Formes d'implication possibles",
    blocks: [
      { p: "L'implication bénévole peut notamment consister à :" },
      { list: [
        "aider à l'organisation ou à l'animation de sorties associatives,",
        "proposer ou co-organiser des formats validés par l'association,",
        "accueillir et orienter les nouveaux membres,",
        "participer à des projets spécifiques (sécurité, logistique, événements, communication),",
        "être relais de l'esprit TTC sur le terrain.",
      ] },
      { p: "Chaque forme d'implication est ponctuelle ou régulière, selon la disponibilité de chacun." },
    ],
  },
  {
    n: "3",
    title: "Cadre associatif et rôle du bénévole",
    blocks: [
      { p: "Le bénévole agit dans le cadre de l'association Tout Terrain Club, et dans le respect :" },
      { list: [
        "des statuts de l'association,",
        "de la charte des membres TTC,",
        "des consignes de sécurité communiquées par l'association.",
      ] },
      { p: "Le bénévole :" },
      { list: [
        "n'est pas un professionnel de l'encadrement sportif,",
        "n'agit pas en tant que guide, moniteur ou accompagnateur diplômé,",
        "n'a pas vocation à se substituer à la responsabilité individuelle des participants.",
      ] },
      { p: "Le bénévole contribue à la coordination et à l'animation, sans obligation de résultat ni rôle d'encadrement technique." },
    ],
  },
  {
    n: "4",
    title: "Sécurité et responsabilité individuelle des participants",
    blocks: [
      { p: "La pratique du trail et des activités outdoor comporte des risques inhérents au milieu naturel." },
      { p: "Chaque participant à une activité TTC, qu'elle soit :" },
      { list: [
        "organisée par l'association,",
        "proposée dans un cadre collectif,",
        "ou partagée via les canaux de communication (WhatsApp, Strava, etc.),",
      ] },
      { p: "participe sous sa propre responsabilité." },
      { p: "Il appartient à chaque participant :" },
      { list: [
        "d'évaluer son niveau et sa condition physique,",
        "de s'équiper de manière adaptée,",
        "de disposer d'une assurance personnelle couvrant la pratique,",
        "de respecter les consignes de sécurité et le bon sens collectif.",
      ] },
      { p: "La responsabilité individuelle prime en toutes circonstances." },
    ],
  },
  {
    n: "5",
    title: "Protection du bénévole",
    blocks: [
      { p: "Le bénévole ne peut en aucun cas être tenu personnellement responsable :" },
      { list: [
        "des choix individuels des participants,",
        "du niveau, du matériel ou de la préparation des autres membres,",
        "des incidents survenus lors d'activités informelles ou non encadrées,",
        "des comportements individuels contraires aux règles de sécurité.",
      ] },
      { p: "Le bénévole agit dans un cadre associatif, sans obligation de surveillance permanente ni de contrôle individuel." },
      { p: "L'association Tout Terrain Club veille à :" },
      { list: [
        "définir un cadre clair,",
        "souscrire les assurances nécessaires,",
        "rappeler les règles de sécurité aux membres.",
      ] },
    ],
  },
  {
    n: "6",
    title: "Sorties informelles et espaces communautaires",
    blocks: [
      { p: "Les espaces communautaires (WhatsApp, Strava, etc.) ont pour objectif de mettre en relation les membres." },
      { p: "Les sorties informelles, notamment celles partagées via ces canaux (trail, ski, vélo ou toute autre activité outdoor), sont réalisées :" },
      { list: [
        "à l'initiative des participants,",
        "sous leur responsabilité exclusive,",
        "en dehors de toute organisation ou encadrement de l'association.",
      ] },
      { p: "Ni l'association, ni les bénévoles ne peuvent être tenus responsables du déroulement de ces activités informelles." },
    ],
  },
  {
    n: "7",
    title: "Bienveillance, respect et comportement",
    blocks: [
      { p: "Tout bénévole s'engage à adopter un comportement respectueux, bienveillant et responsable." },
      { p: "Aucun comportement de type :" },
      { list: [
        "harcèlement,",
        "intimidation,",
        "discrimination,",
        "abus d'autorité,",
        "mise en danger volontaire,",
      ] },
      { p: "ne sera toléré." },
      { p: "Tout manquement grave pourra entraîner la fin immédiate de l'implication bénévole et, le cas échéant, des mesures disciplinaires." },
    ],
  },
  {
    n: "8",
    title: "Liberté, évolution et fin de l'implication",
    blocks: [
      { p: "L'implication bénévole :" },
      { list: [
        "est libre et sans obligation de durée,",
        "peut évoluer dans le temps,",
        "peut être interrompue à tout moment, sans justification.",
      ] },
      { p: "Aucune sanction ou préjudice ne peut découler de l'arrêt d'une implication bénévole." },
    ],
  },
];

const CharteBenevoleHero = () => (
  <section className="legal-hero">
    <div className="wrap">
      <div className="legal-eyebrow">★ Espace membre · bénévoles</div>
      <h1 className="legal-title">Charte<br/><span className="mk">bénévole</span></h1>
      <p className="legal-lede">
        Tout Terrain Club s'appuie sur l'énergie de bénévoles qui contribuent, à leur
        manière, à faire vivre la communauté et les projets TTC.
      </p>
    </div>
  </section>
);

const CharteBenevoleBody = () => (
  <section className="legal-sec">
    <div className="wrap">
      <div className="charte-block">
        <div className="legal-note">
          <h3>Préambule</h3>
          <p>
            Tout Terrain Club (TTC) est une association qui a pour vocation de rassembler
            des passionnés de trail et d'activités outdoor autour de valeurs de partage,
            de sécurité, de bienveillance et de liberté.
          </p>
          <p style={{ marginTop: 12 }}>
            La présente charte définit le cadre de l'implication bénévole, en complément
            des statuts de l'association Tout Terrain Club et de la charte des membres TTC.
            Elle vise à protéger à la fois les bénévoles, les participants et l'association.
          </p>
        </div>

        {BENEVOLE_SECTIONS.map((s) => (
          <div className="charte-sec" key={s.n}>
            <h2><span className="charte-num">{s.n}.</span> {s.title}</h2>
            {s.blocks.map((b, i) => {
              if (b.h) return <h3 className="charte-sub" key={i}>{b.h}</h3>;
              if (b.list) return (
                <ul className="charte-list" key={i}>
                  {b.list.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              );
              return <p key={i}>{b.p}</p>;
            })}
          </div>
        ))}

        <p className="legal-source">Charte bénévole · Tout Terrain Club · réservée aux membres</p>
      </div>
    </div>
  </section>
);

window.CharteBenevole = { CharteBenevoleHero, CharteBenevoleBody };
