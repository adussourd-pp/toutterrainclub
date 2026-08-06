// Onboarding — tour guidé de la première connexion à l'espace membre.
// • S'affiche UNE fois automatiquement (drapeau localStorage) après l'entrée dans le hub.
// • Modale de bienvenue → spotlight sur les cartes du hub (carte de coureur, meute,
//   courses, GPX) → écran de fin.
// • Rejouable à tout moment via le bouton flottant « ? » (ou window.ttcOnboarding.start()).
// Vanilla React, aucune dépendance externe — cohérent avec le reste du site (no-build).

const ONB_KEY = "ttc_onboarding_done_v1";

// Les étapes du tour. Édite librement : `sel` = l'élément visé (voir data-tour dans membre.jsx).
const ONB_STEPS = [
  {
    type: "welcome",
    em: "🐺",
    titre: "Bienvenue dans la meute.",
    texte: "Ton espace, tout au même endroit : ta carte de coureur, les membres du club, les courses où l'on se retrouve et les traces GPX. Petit tour du propriétaire ?",
  },
  {
    sel: '[data-tour="carte"]',
    em: "🪪",
    titre: "Commence par ta carte de coureur",
    texte: "C'est ta présentation dans la meute : niveau, objectifs, réseaux. Les autres te repèrent grâce à elle — c'est le premier truc à remplir.",
    cta: { label: "Créer ma carte →", href: "profil.html" },
  },
  {
    sel: '[data-tour="meute"]',
    em: "🐺",
    titre: "La meute",
    texte: "Qui court quoi, à quel niveau. De quoi trouver des partenaires d'entraînement à ta pointure.",
  },
  {
    sel: '[data-tour="courses"]',
    em: "📅",
    titre: "Calendrier & courses",
    texte: "L'agenda du club. Crée une course ou inscris-toi en un clic — on se retrouve sur les dossards.",
  },
  {
    sel: '[data-tour="gpx"]',
    em: "🗺️",
    titre: "Traces GPX",
    texte: "Partage tes parcours et récupère ceux de la meute pour ta prochaine sortie.",
  },
  {
    type: "end",
    em: "🐗",
    titre: "C'est parti !",
    texte: "Tu peux revoir ce guide quand tu veux via le bouton « ? » en bas à droite. Bonne course, et à très vite sur les sentiers.",
  },
];

const Onboarding = () => {
  const [active, setActive] = React.useState(false);
  const [i, setI] = React.useState(0);
  const [rect, setRect] = React.useState(null);
  const step = ONB_STEPS[i] || null;

  const start = React.useCallback(() => { setI(0); setRect(null); setActive(true); }, []);
  const finish = React.useCallback(() => {
    setActive(false);
    try { localStorage.setItem(ONB_KEY, "1"); } catch (e) {}
  }, []);
  const next = React.useCallback(() => {
    setI((n) => {
      if (n >= ONB_STEPS.length - 1) { finish(); return n; }
      return n + 1;
    });
  }, [finish]);
  const prev = React.useCallback(() => setI((n) => Math.max(0, n - 1)), []);

  // Exposition globale + auto-démarrage à la toute première visite.
  React.useEffect(() => {
    window.ttcOnboarding = {
      start,
      reset: () => { try { localStorage.removeItem(ONB_KEY); } catch (e) {} },
    };
    let done = false;
    try { done = localStorage.getItem(ONB_KEY) === "1"; } catch (e) {}
    if (!done) {
      try { localStorage.setItem(ONB_KEY, "1"); } catch (e) {} // une seule fois en auto
      const t = setTimeout(start, 650); // laisse le hub s'afficher
      return () => clearTimeout(t);
    }
  }, [start]);

  // Échap ferme le tour.
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") finish();
      else if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, finish, next, prev]);

  // Mesure de l'élément visé (spotlight). Recalcule pendant le scroll doux + au resize.
  React.useLayoutEffect(() => {
    if (!active || !step || !step.sel) { setRect(null); return; }
    const el = document.querySelector(step.sel);
    if (!el) { setRect(null); return; }
    try { el.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    const id = setInterval(measure, 80);       // suit le scroll doux…
    const stop = setTimeout(() => clearInterval(id), 800); // …le temps qu'il se termine
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearInterval(id); clearTimeout(stop);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, i, step]);

  // Bouton flottant toujours dispo (hors tour) pour relancer le guide.
  if (!active) {
    return (
      <button type="button" className="onb-launch" onClick={start}
        aria-label="Revoir le guide de démarrage" title="Revoir le tuto">?</button>
    );
  }

  const total = ONB_STEPS.length;
  const isLast = i >= total - 1;
  const centered = step && (step.type === "welcome" || step.type === "end");

  const Foot = () => (
    <div className="onb-foot">
      <div className="onb-dots" aria-hidden="true">
        {ONB_STEPS.map((_, k) => <span key={k} className={"onb-dot" + (k === i ? " on" : "")} />)}
      </div>
      <button type="button" className="onb-skip" onClick={finish}>Passer</button>
      <div className="onb-actions">
        {i > 0 && <button type="button" className="btn btn-sm" onClick={prev}>← Retour</button>}
        {step && step.cta && (
          <a className="btn btn-sm btn-primary" href={step.cta.href} onClick={finish}>{step.cta.label}</a>
        )}
        <button type="button" className="btn btn-sm btn-primary" onClick={next}>
          {isLast ? "Terminer" : (i === 0 ? "C'est parti →" : "Suivant →")}
        </button>
      </div>
    </div>
  );

  // Écran centré (bienvenue / fin).
  if (centered) {
    return (
      <React.Fragment>
        <div className="onb-catch onb-dim" onClick={finish} />
        <div className="onb-center">
          <div className="onb-card" role="dialog" aria-modal="true" aria-label={step.titre}>
            <button type="button" className="me-close onb-x" onClick={finish} aria-label="Fermer">×</button>
            <div className="onb-big">{step.em}</div>
            <h2>{step.titre}</h2>
            <p>{step.texte}</p>
            <Foot />
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Étape ancrée : catcher (bloque la page) + trou lumineux + bulle.
  const P = 8;
  let holeStyle = null, bubbleStyle = null, place = "below";
  if (rect) {
    holeStyle = { top: rect.top - P, left: rect.left - P, width: rect.width + 2 * P, height: rect.height + 2 * P };
    const vw = window.innerWidth, vh = window.innerHeight;
    const bw = Math.min(340, vw - 24);
    place = (vh - (rect.top + rect.height)) > 250 ? "below" : "above";
    let left = rect.left + rect.width / 2 - bw / 2;
    left = Math.max(12, Math.min(left, vw - bw - 12));
    bubbleStyle = { width: bw, left };
    if (place === "below") bubbleStyle.top = rect.top + rect.height + P + 14;
    else bubbleStyle.bottom = vh - (rect.top - P) + 14;
  }

  return (
    <React.Fragment>
      <div className="onb-catch" onClick={finish} />
      {rect && <div className="onb-hole" style={holeStyle} />}
      <div className={"onb-bubble onb-" + place} style={bubbleStyle || { visibility: "hidden" }}
        role="dialog" aria-modal="true" aria-label={step.titre}>
        <span className="onb-em">{step.em}</span>
        <h3>{step.titre}</h3>
        <p>{step.texte}</p>
        <Foot />
      </div>
    </React.Fragment>
  );
};

window.ONB = { Onboarding };
