// TTC — Politique de confidentialité (RGPD)

const CONF_CONTACT = "toutterrainclub@gmail.com";

// Données collectées : quoi · pourquoi · base légale.
const CONF_DATA = [
  { k: "Photo de profil", v: "Illustrer ta carte de coureur auprès des autres membres", b: "Consentement (case à cocher, retirable à tout moment)" },
  { k: "Prénom, surnom, ville / secteur", v: "T'identifier dans la meute et l'espace membre", b: "Consentement / vie associative" },
  { k: "E-mail", v: "Te contacter (adhésion, infos du club)", b: "Consentement / exécution de l'adhésion" },
  { k: "Liens Strava / Instagram", v: "Relier ton profil sportif si tu le souhaites", b: "Consentement (champs optionnels)" },
  { k: "Bio, objectifs, niveau, distances, formats", v: "Personnaliser ta carte et la vie du club", b: "Consentement" },
  { k: "Réactions et commentaires (traces GPX)", v: "Vie sociale de l'espace membre", b: "Consentement / intérêt légitime" },
  { k: "Code d'accès et journal de connexion", v: "Sécuriser l'accès à l'espace membre", b: "Intérêt légitime (sécurité)" },
];

const CONF_RIGHTS = [
  ["Accès", "Savoir quelles données te concernant nous détenons."],
  ["Rectification", "Corriger tes données — directement depuis ta carte de coureur."],
  ["Effacement / oubli", "Supprimer ton compte et tes données via le bouton « Supprimer mon compte » de ta carte, ou par e-mail."],
  ["Retrait du consentement", "Retirer ta photo ou tes infos à tout moment, sans justification."],
  ["Opposition & limitation", "T'opposer à un traitement ou en demander la limitation."],
  ["Portabilité", "Récupérer tes données dans un format réutilisable."],
];

const ConfHero = () => (
  <section className="legal-hero">
    <div className="wrap">
      <div className="legal-eyebrow">Protection des données · RGPD</div>
      <h1 className="legal-title">Politique de<br/><span className="mk">confidentialité</span></h1>
      <p className="legal-lede">
        Le Tout Terrain Club collecte quelques données pour faire vivre l'espace membre.
        Voici lesquelles, pourquoi, combien de temps, et comment garder la main dessus.
      </p>
    </div>
  </section>
);

const ConfBody = () => (
  <section className="legal-sec">
    <div className="wrap">
      <div className="legal-grid">
        <div className="legal-block">
          <h2>Responsable du traitement</h2>
          <div className="legal-note">
            <p>
              Les données sont traitées par l'association <strong>Tout Terrain Club</strong> (loi 1901),
              3 avenue de la République, 06300 Nice. Pour toute question relative à tes données :
              {" "}<a href={"mailto:" + CONF_CONTACT}>{CONF_CONTACT}</a>.
            </p>
          </div>

          <h2>Données collectées &amp; pourquoi</h2>
          <dl className="legal-dl">
            {CONF_DATA.map((r, i) => (
              <div className="legal-row" key={i}>
                <dt>{r.k}</dt>
                <dd>{r.v}<br/><em style={{ color: "var(--muted)" }}>Base légale : {r.b}</em></dd>
              </div>
            ))}
          </dl>
          <p className="legal-source">
            Nous appliquons le principe de <strong>minimisation</strong> : seuls les champs utiles à la vie du
            club sont demandés, et la plupart sont facultatifs.
          </p>
        </div>

        <div className="legal-block">
          <h2>Qui voit tes données ?</h2>
          <div className="legal-note">
            <p>
              Ta carte (photo comprise) est visible par les <strong>autres membres connectés</strong> à l'espace
              membre — pas par le public : les pages membres sont en <code>noindex</code> et protégées par un code d'accès.
              Le bureau de l'association y a également accès pour la gestion. Nous ne vendons ni ne cédons
              aucune donnée à des tiers à des fins commerciales.
            </p>
          </div>

          <div className="legal-note">
            <h3>Hébergement &amp; sécurité</h3>
            <p>
              L'espace membre et sa base de données sont hébergés via <strong>Cloudflare</strong> (Workers &amp; D1).
              L'accès se fait par un <strong>code personnel</strong> ; le partage de ton code donne accès à ton compte,
              garde-le confidentiel. Les échanges sont chiffrés (HTTPS).
            </p>
          </div>

          <div className="legal-note">
            <h3>Durée de conservation</h3>
            <p>
              Tes données sont conservées tant que ton compte est actif. Elles sont supprimées lorsque tu
              supprimes ton compte, ou après une période d'inactivité prolongée, ou sur simple demande.
            </p>
          </div>

          <h2>Tes droits</h2>
          <dl className="legal-dl">
            {CONF_RIGHTS.map((r, i) => (
              <div className="legal-row" key={i}>
                <dt>{r[0]}</dt>
                <dd>{r[1]}</dd>
              </div>
            ))}
          </dl>
          <div className="legal-note">
            <p>
              Pour exercer ces droits : <a href="profil.html">ta carte de coureur</a> (modification / suppression en
              autonomie) ou <a href={"mailto:" + CONF_CONTACT}>{CONF_CONTACT}</a>. Tu peux aussi introduire une
              réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener">CNIL</a>.
            </p>
          </div>
          <p className="legal-source">Dernière mise à jour : 06/08/2026</p>
        </div>
      </div>
    </div>
  </section>
);

window.Conf = { ConfHero, ConfBody };
