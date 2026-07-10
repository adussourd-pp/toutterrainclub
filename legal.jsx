// TTC — Mentions légales

const LEGAL_ROWS = [
  { k: "Dénomination", v: "Tout Terrain Club (TTC)" },
  { k: "Forme juridique", v: "Association loi 1901 ou assimilé" },
  { k: "SIREN", v: "100 729 995" },
  { k: "SIRET (siège social)", v: "100 729 995 00017" },
  { k: "Numéro de TVA", v: "FR77100729995" },
  { k: "Activité (NAF / APE)", v: "9312Z · Activités de clubs de sports" },
  { k: "Date de création", v: "29 janvier 2026" },
  { k: "Siège social", v: "3 avenue de la République, 06300 Nice" },
  { k: "Contact", v: "toutterrainclub@gmail.com", href: "mailto:toutterrainclub@gmail.com" },
];

const LegalHero = () => (
  <section className="legal-hero">
    <div className="wrap">
      <div className="legal-eyebrow">Informations légales</div>
      <h1 className="legal-title">Mentions<br/><span className="mk">légales</span></h1>
      <p className="legal-lede">
        Tout Terrain Club, association sportive basée à Nice. Voici les informations
        légales relatives à l'association et à ce site.
      </p>
    </div>
  </section>
);

const LegalBody = () => (
  <section className="legal-sec">
    <div className="wrap">
      <div className="legal-grid">
        <div className="legal-block">
          <h2>L'association</h2>
          <dl className="legal-dl">
            {LEGAL_ROWS.map((r, i) => (
              <div className="legal-row" key={i}>
                <dt>{r.k}</dt>
                <dd>{r.href ? <a href={r.href}>{r.v}</a> : r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="legal-block">
          <h2>Le site</h2>
          <div className="legal-note">
            <h3>Directeur de la publication</h3>
            <p>Le président de l'association Tout Terrain Club.</p>
          </div>
          <div className="legal-note">
            <h3>Hébergement</h3>
            <p>Site hébergé par l'hébergeur du club. Coordonnées disponibles sur demande à <a href="mailto:toutterrainclub@gmail.com">toutterrainclub@gmail.com</a>.</p>
          </div>
          <div className="legal-note">
            <h3>Propriété intellectuelle</h3>
            <p>L'ensemble des contenus (textes, photographies, logos, tracés) est la propriété du Tout Terrain Club et de ses partenaires. Toute reproduction sans autorisation est interdite.</p>
          </div>
          <div className="legal-note">
            <h3>Données personnelles</h3>
            <p>Les informations collectées via les formulaires servent uniquement à la gestion des adhésions et des inscriptions. Vous disposez d'un droit d'accès, de rectification et de suppression en écrivant à <a href="mailto:toutterrainclub@gmail.com">toutterrainclub@gmail.com</a>.</p>
          </div>
          <p className="legal-source">Sources &amp; mise à jour le 07/07/2026 · Insee</p>
        </div>
      </div>
    </div>
  </section>
);

window.Legal = { LegalHero, LegalBody };
