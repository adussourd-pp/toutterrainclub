# Tout Terrain Club — conventions

Design system d'un club de trail (Nice / Mercantour), esprit « Trail to Techno » :
outdoor le jour, techno la nuit. Direct, minuscules, chaleureux.

## Mise en place (setup)

**Aucun provider React n'est nécessaire.** Les composants sont des fonctions React
autonomes qui s'appuient sur des **classes CSS globales** et des **tokens** définis dans
`styles.css` (chargé via la closure `@import` du design system). Il suffit que `styles.css`
soit présent — ce qui est le cas pour tout design construit avec ce système.

**Mode sombre « Techno » :** ajoute la classe `mode-techno` sur un ancêtre (souvent
`<body>`) — elle réassigne les tokens vers la palette néon/nuit. Pas de toggle JS requis.

## Idiome de style

Système **classes globales + tokens CSS**. On style via `className="…"` (classes de
`styles.css`) et via `var(--token)`. Pas de props de style, pas de CSS-in-JS.

**Tokens couleur** (extrait) :
`--ink` `--ink-2` `--ink-3` (encre) · `--paper` `--paper-2` `--paper-3` (craie) ·
`--rule` (filets) · `--muted` `--muted-2` (texte secondaire) ·
`--green` `--green-2` `--green-3` `--green-soft` `--green-tint` (verts) · `--fire` (accent feu).

**Tokens typo :** `--f-display` (Inter Tight, titres/corps) · `--f-mono` (JetBrains Mono,
eyebrows/labels) · `--f-hand` (Caveat, accents manuscrits).

**Tokens layout :** `--max` (largeur max) · `--gutter` · `--radius` `--radius-lg`
`--radius-pill`.

**Classes utilitaires clés :**
- Layout : `wrap` (conteneur centré max-width), `rule` (filet horizontal)
- Label : `eyebrow` (sur-titre mono, uppercase, tracking large)
- Boutons : `btn`, `btn-primary` (plein vert), `btn-sm` (compact)
- Pastilles : `chip`, `chip muted` (chip discrète)
- Marque : `brand` (wordmark), `dot` (point ● du bandeau)

## Où est la vérité

Lis `styles.css` (tokens en tête dans `:root`, puis composants) avant de styliser quoi que
ce soit — c'est la source unique. La doc par composant est dans chaque
`components/<groupe>/<Nom>/<Nom>.prompt.md`.

## Exemple idiomatique

```jsx
import { HeaderPublic, PromoStrip, PartnersBand, FooterPublic } from 'ttc-design-system';

function Page() {
  return (
    <div>
      <PromoStrip />
      <HeaderPublic active="Accueil" />
      <main className="wrap" style={{ paddingBlock: 'var(--section-py, 96px)' }}>
        <span className="eyebrow">Édition · Mercantour</span>
        <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 800 }}>Trail to Techno</h1>
        <a href="#" className="btn btn-primary">S'inscrire</a>
      </main>
      <PartnersBand />
      <FooterPublic />
    </div>
  );
}
```
